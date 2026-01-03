import React, { useContext, useEffect, useState } from "react";
import Track from "./track";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import { useParams } from "react-router-dom";
import { MainContext } from "../../App";
import toast from "react-hot-toast";
import moment from "moment";

const EventTrack = () => {
  const CTX = useContext(MainContext);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingPending, setLoadingPending] = useState(false);
  const [data, setData] = useState(null);
  const [inputs, setInputs] = useState({ send_email: true });
  const [updating, setUpdating] = useState(null);

  const getTrackDetails = async () => {
    setLoading(true);
    try {
      const fetched = await fetch(
        `${CTX.url}v1/account/track/order/${params.ID}`,
        {
          method: "GET",
        }
      );

      const jsoned = await fetched.json();
      setLoading(false);
      setData(jsoned?.data);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  useEffect(() => {
    getTrackDetails();
  }, [params]);

  const updateProgressHandler = async () => {
    if (loadingPending) return;
    setLoadingPending(true);
    // marge the old progress with the new and just replace the arr with the db own
    const progress = [...(data?.progress || [])];

    let newData;

    if (inputs?.new_progress?.length > 2) {
      newData = {
        doing: inputs?.new_progress,
        time: moment().format("MMM DD, HH:mm [GMT]Z"),
      };
      progress.unshift(newData);
    }

    try {
      const fetched = await fetch(
        `${CTX.url}v1/su/update/progress/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CTX.token}`,
          },
          body: JSON.stringify({
            progress,
          }),
        }
      );

      const jsoned = await fetched.json();
      setLoadingPending(false);

      if (jsoned?.m) {
        toast(jsoned?.m);
        return;
      }

      setUpdating(null);
      setData(jsoned?.data);
    } catch (error) {
      setLoadingPending(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  const changeStatusHandler = async () => {
    if (loadingPending) return;

    if (!inputs?.status) {
      return;
    }

    if (inputs?.status?.toLowerCase()?.includes("select")) {
      return;
    }

    setLoadingPending(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/su/update/status/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX.token}`,
        },
        body: JSON.stringify({
          send_email: inputs?.send_email,
          status: inputs?.status?.toLowerCase(),
        }),
      });

      const jsoned = await fetched.json();
      setLoadingPending(false);

      if (jsoned?.m) {
        toast(jsoned?.m);
        return;
      }

      setUpdating(null);
      setData(jsoned?.data);
    } catch (error) {
      setLoadingPending(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  return (
    <>
      <Nav />
      <Track
        params={params}
        data={data}
        loading={loading}
        setData={setData}
        loadingPending={loadingPending}
        updateProgressHandler={updateProgressHandler}
        inputs={inputs}
        setInputs={setInputs}
        updating={updating}
        setUpdating={setUpdating}
        changeStatusHandler={changeStatusHandler}
      />
      <Footer />
    </>
  );
};

export default EventTrack;
