import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import Portfolio from "./_portfolio";
import { MainContext } from "../../App";
import toast from "react-hot-toast";
import Loading from "../../components/loading/loading";

const Event_portfolio = () => {
  const [data, setData] = useState([]);
  const CTX = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [orderStats, setOrderStats] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const normalizeOrderStats = (data) => {
    const fullYear = Array.from({ length: 12 }, (_, i) => ({
      name: monthNames[i],
      orders: 0,
      revenue: 0,
    }));

    data.forEach((d) => {
      fullYear[d.month - 1].orders = d.orders;
      fullYear[d.month - 1].revenue = d.revenue;
    });

    return fullYear;
  };

  const getHandler = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/su/all/account/stats/${year}`, {
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
      // Fill missing months
      const fullYear = Array.from({ length: 12 }, (_, i) => ({
        name: monthNames[i],
        users: 0,
      }));

      jsoned?.data?.user.forEach((d) => {
        fullYear[d.month - 1].users = d.users;
      });

      setData(fullYear);

      const confir = normalizeOrderStats(jsoned?.data?.orders);

      setOrderStats(confir);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  useEffect(() => {
    getHandler();
  }, [year]);

  const onChangeSelect = (e) => {
    setYear(e.target.value);
  };

  return (
    <>
      <Nav />
      {loading && <Loading />}
      <Portfolio
        loading={loading}
        data={data}
        orderStats={orderStats}
        onChangeSelect={onChangeSelect}
      />
      <Footer />
    </>
  );
};

export default Event_portfolio;
