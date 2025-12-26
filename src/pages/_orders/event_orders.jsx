import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import Orders from "./_orders";
import { MainContext } from "../../App";
import toast from "react-hot-toast";

const Event_orders = () => {
  const [orders, setOrders] = useState([]);
  const CTX = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  const getHandler = async () => {
    setLoading(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/su/all/account/orders/1/4000`, {
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

      setOrders(jsoned?.data);
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
      <Orders orders={orders} loading={loading} />
      <Footer />
    </>
  );
};

export default Event_orders;
