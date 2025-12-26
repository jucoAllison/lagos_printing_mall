import React, { useContext, useEffect, useState } from "react";
import Track from "./track";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import { useParams } from "react-router-dom";
import { MainContext } from "../../App";
import toast from "react-hot-toast";

const EventTrack = () => {
  const CTX = useContext(MainContext);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

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

  return (
    <>
      <Nav />
      <Track params={params} data={data} loading={loading} />
      <Footer />
    </>
  );
};

export default EventTrack;
