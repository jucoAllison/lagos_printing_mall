import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import Notification from "./notification";
import Loading from "../../components/loading/loading";
import toast from "react-hot-toast";
import { MainContext } from "../../App";

const EventNotification = () => {
  const [data, setData] = useState(null);
  const CTX = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [loadingDeleting, setLoadingDeleting] = useState(false);

  const getHandler = async () => {
    setLoading(true);
    try {
      const fetched = await fetch(
        `${CTX.url}v1/account/all/notifications/0/87654`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${CTX.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const jsoned = await fetched.json();
      setLoading(false);
      if (jsoned?.m) {
        toast.error(jsoned?.m);
        return;
      }
      setData(jsoned?.data?.data);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  const deleteHandler = async () => {
    if (loadingDeleting) return;

    setLoadingDeleting(true);
    try {
      const ids = data?.map((n) => n._id);

      // console.log("ids =>> ", ids);

      const fetched = await fetch(`${CTX.url}v1/account/delete/notifications`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${CTX.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });

      const jsoned = await fetched.json();
      setLoading(false);
      if (jsoned?.m) {
        toast.error(jsoned?.m);
        return;
      }
      toast.success(jsoned?.data);
      getHandler();
    } catch (error) {
      setLoadingDeleting(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  return (
    <>
      <Nav />
      {/* <Loading /> */}
      <Notification
        data={data}
        loading={loading}
        loadingDeleting={loadingDeleting}
        deleteHandler={deleteHandler}
      />
      <Footer />
    </>
  );
};

export default EventNotification;
