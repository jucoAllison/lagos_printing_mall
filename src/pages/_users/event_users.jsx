import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import Users from "./_users";
import { MainContext } from "../../App";
import toast from "react-hot-toast";

const Event_users = () => {
  const [data, setData] = useState([]);
  const CTX = useContext(MainContext);
  const [loading, setLoading] = useState(false);

  const getHandler = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/su/all/account/users`, {
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

  return (
    <>
      <Nav />

      <Users data={data} loading={loading} />

      <Footer />
    </>
  );
};

export default Event_users;
