import React, { useContext, useState, useEffect } from "react";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import ReferEarn from "./refer&earn";
import { MainContext } from "../../App";
import toast from "react-hot-toast";
import Loading from "../../components/loading/loading";

const EventReferEarn = () => {
  const [data, setData] = useState(null);
  const CTX = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState(CTX?.userObj || {});

  const getHandler = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/account/referral/history`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${CTX.token}`,
          "Content-Type": "application/json",
        },
      });

      const jsoned = await fetched.json();
      setLoading(false);
      if (jsoned?.m) {
        toast.error(jsoned?.m);
        return;
      }
      setData(jsoned?.data);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  useEffect(() => {
    setInputs(CTX?.userObj);
  }, [CTX?.userObj]);

  return (
    <>
      <Nav />
      {loading && <Loading />}
      <ReferEarn
        inputs={inputs}
        setInputs={setInputs}
        data={data}
        loading={loading}
      />
      <Footer />
    </>
  );
};

export default EventReferEarn;
