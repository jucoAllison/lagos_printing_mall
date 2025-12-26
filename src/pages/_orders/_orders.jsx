import React, { useContext, useState } from "react";
import { MainContext } from "../../App";
import { FiCreditCard, FiDollarSign, FiShield, FiUsers } from "react-icons/fi";
import Classes from "./_orders.module.css";
import { MdOutlineFiberSmartRecord } from "react-icons/md";
import clsx from "clsx";
import { AiOutlineLoading, AiOutlineProduct } from "react-icons/ai";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Orders = ({ orders, loading }) => {
  const CTX = useContext(MainContext);
  const navigation = useNavigate();
  const [seeAll, setSeeAll] = useState(false);
  const [header, setHeader] = useState([
    {
      key: "5",
      name: "Awaiting_confirmation",
      active: false,
      value: "awaiting_confirmation",
      number:
        CTX?.userObj?.not_user?.stats_cards?.orders?.awaiting_confirmation?.toLocaleString() ||
        0,
    },
    {
      key: "1",
      name: "Pending",
      active: true,
      value: "pending",
      number:
        CTX?.userObj?.not_user?.stats_cards?.orders?.pending?.toLocaleString() ||
        0,
    },
    {
      key: "10",
      name: "Awaiting_payment",
      active: false,
      value: "awaiting_payment",
      number:
        CTX?.userObj?.not_user?.stats_cards?.orders?.awaiting_payment?.toLocaleString() ||
        0,
    },
    {
      key: "2",
      name: "Completed",
      active: false,
      value: "completed",
      number:
        CTX?.userObj?.not_user?.stats_cards?.orders?.completed?.toLocaleString() ||
        0,
    },
    {
      key: "4",
      name: "Cancelled",
      active: false,
      value: "cancelled",
      number:
        CTX?.userObj?.not_user?.stats_cards?.orders?.cancelled?.toLocaleString() ||
        0,
    },
    {
      key: "4",
      name: "Refund",
      active: false,
      value: "refund",
      number:
        CTX?.userObj?.not_user?.stats_cards?.orders?.cancelled?.toLocaleString() ||
        0,
    },
  ]);

  const onSwitchHandler = (name, index) => {
    const spread = [...header];
    setSeeAll(false);
    const remap = spread?.map((v) => {
      return { ...v, active: false };
    });

    remap[index].active = true;
    setHeader(remap);
  };

  const headerMapped = header?.map((v, i) => (
    <div
      onClick={() => onSwitchHandler(v.name, i)}
      className={Classes.eachHeader}
      key={v.name}
      style={{
        color: v.active && "#3f405b",
        borderBottom: v.active && "1px solid #3f405b",
        fontWeight: v.active && "500",
        fontFamily: "outfit",
      }}
    >
      {v.name}
      <div
        className="absolute rounded-full text-[#d00] top-[-2px] right-[8px] font-bold text-[12px]"
        style={{ zIndex: 10 }}
      >
        {v?.number}
      </div>
    </div>
  ));

  const mappedOrders = orders?.data
    ?.filter((v) => header?.filter((w) => w.active)[0]?.value == v.status)
    ?.map((v, i) => {
      const mappedProducts = v?.products?.map((a, b) => {
        return (
          <strong className="text-[#3f405b] " key={b}>
            {a?.name},
          </strong>
        );
      });

      return (
        <div
          key={i}
          className="flex items-center mt-2 rounded-[8px] px-[13px] py-[13px] bg-[#fff] hover:bg-[#f5f6fa] "
          style={{ fontFamily: "outfit" }}
          onClick={() => {
            navigation(`/account/track/${v?.track}`)
          }}
        >
          <AiOutlineProduct />

          <div className="ml-2 w-full">
            <p
              className="mb-0 f-14 text-dark  gilroy-Semibold text-[12px] cursor-pointer ellipsis"
              style={{ width: "100%" }}
            >
              {v?.track?.toUpperCase()}
            </p>

            {/* <p
                className="mb-0 f-14 text-dark  gilroy-bold  w-[100%] hover:text-blue-600 cursor-pointer ellipsis font-bold"
                style={{ fontSize: "13px", width: "max-content" }}
              >
                {v?.SymbolFull}
              </p> */}

            <div className="text-[#999] text-[13px]">{v?.details?.phone}</div>
            <div className="text-[#999] text-[13px]">{`${v?.details?.name?.first} ${v?.details?.name?.last}`}</div>
            <div className="text-[#999] text-[13px] flex flex-wrap gap-[5px]">
              <span>Products: </span> {mappedProducts}
            </div>
          </div>

          <div className="ml-auto">
            <p
              className="mb-0 f-14 text-dark gilroy-Semibold w-break text-right ml-[auto]"
              style={{ width: "max-content" }}
            >
              ₦{v?.amount?.toLocaleString()}
            </p>
            <div className=" text-[13px] text-right w-[90px]">
              {moment(v?.data).format("ll")}
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="p-6  min-h-screen">
      <div className="relative">
        <div className="px-1 pb-[10px] helper-size">
          <p className="mb-0 text-[26px] gilroy-Semibold text-uppercase font-[500] text-center text-[#3f405b]">
            Orders
          </p>
          <p className="mb-0 text-center text-[16px]  gilroy-medium text-[#6a6b87] dark-c dark-p mt-8">
            organize and manage orders details here.
          </p>
        </div>

        {/* Stats Cards */}
        <div
          className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8"
          style={{ fontFamily: "outfit" }}
        >
          {/* <div className="bg-[#f5f6fa] p-6 rounded-xl shadow-sm border border-gray-100">
                <div style={{textDecoration: "none"}} to="/management/users" className="flex justify-between">
                  <div>
                    <p className="text-gray-500">Orders</p>
    
                    <div className="flex items-center  pl-[20px] ">
                      <div
                        className="text-[13px] gilroy-medium  flex items-center"
                        style={{ color: "#3f405b" }}
                      >
                        <h2 className="text-2xl font-bold mt-2">
                          {CTX?.userObj?.not_user?.stats_cards?.users?.toLocaleString() ||
                            0}
                        </h2>
                        <span className="ml-3">Total</span>
                      </div>
                    </div>
    
                    <div className="flex items-center  pl-[20px]  ">
                      <div
                        className="text-[13px] gilroy-medium  flex items-center"
                        style={{ color: "#3f405b" }}
                      >
                        <h2 className="text-2xl font-bold mt-2">
                          {CTX?.userObj?.not_user?.stats_cards?.admins?.toLocaleString() ||
                            0}
                        </h2>
                        <span className="ml-3">Management</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiUsers className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div> */}

          <div className="bg-[#f5f6fa] p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <div className="flex justify-between" to="/account/backups">
              <div>
                <p className="text-gray-500">Total Orders</p>
                <h2 className="text-2xl font-bold mt-2">
                  {CTX?.userObj?.not_user?.stats_cards?.orders?.total_.toLocaleString() ||
                    0.0}
                </h2>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiCreditCard className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-[#f5f6fa] p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between" to="/account/orders/all">
              <div className="w-full">
                <p className="text-gray-500">Orders</p>
                <div
                  className="w-full"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(150px, 1fr))",
                  }}
                >
                  <div className="flex items-center  pl-[20px] h-fit">
                    <div
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <h2 className="text-2xl font-bold text-[#d00] mt-2">
                        {CTX?.userObj?.not_user?.stats_cards?.orders?.awaiting_confirmation?.toLocaleString() ||
                          0}
                      </h2>
                      <span className="ml-3 text-[#d00]">
                        awaiting confirmation
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center  pl-[20px] h-fit">
                    <div
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <h2 className="text-2xl font-bold mt-2 text-[#0d0]">
                        {CTX?.userObj?.not_user?.stats_cards?.orders?.awaiting_payment?.toLocaleString() ||
                          0}
                      </h2>
                      <span className="ml-3 text-[#0d0]">awaiting payment</span>
                    </div>
                  </div>

                  <div className="flex items-center  pl-[20px] h-fit">
                    <div
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <h2 className="text-2xl font-bold mt-2">
                        {CTX?.userObj?.not_user?.stats_cards?.orders?.pending?.toLocaleString() ||
                          0}
                      </h2>
                      <span className="ml-3">pending</span>
                    </div>
                  </div>

                  <div className="flex items-center  pl-[20px] h-fit">
                    <div
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <h2 className="text-2xl font-bold mt-2">
                        {CTX?.userObj?.not_user?.stats_cards?.orders?.cancelled?.toLocaleString() ||
                          0}
                      </h2>
                      <span className="ml-3">cancelled</span>
                    </div>
                  </div>

                  <div className="flex items-center  pl-[20px] h-fit">
                    <div
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <h2 className="text-2xl font-bold mt-2">
                        {CTX?.userObj?.not_user?.stats_cards?.orders?.refund?.toLocaleString() ||
                          0}
                      </h2>
                      <span className="ml-3">refund</span>
                    </div>
                  </div>

                  <div className="flex items-center  pl-[20px] h-fit">
                    <div
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <h2 className="text-2xl font-bold mt-2">
                        {CTX?.userObj?.not_user?.stats_cards?.orders?.completed?.toLocaleString() ||
                          0}
                      </h2>
                      <span className="ml-3">completed</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiDollarSign className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between" to="/account/trade">
                  <div>
                    <p className="text-gray-500">Trades</p>
                    <h2 className="text-2xl font-bold mt-2">
                      {parseInt(CTX?.store?.trades?.length).toLocaleString()}
                    </h2>
                    
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <FiShield className="text-red-600 text-xl" />
                  </div>
                </div>
              </div> */}
        </div>

        <div className="mt-[30px]">
          <div className="d-flex justify-content-between qr-icon">
            <div className={clsx([Classes.topHeaderNames, "no-scrollbar"])}>
              {headerMapped}
            </div>

            {/* {mappedOrders?.length > 0 && (
              <div
                href="#"
                onClick={() => setSeeAll(!seeAll)}
                className="text-blue-500 hover:text-blue-700 font-medium text-[14px] cursor-pointer"
              >
                {seeAll ? "See less" : "See all"}
              </div>
            )} */}
          </div>
          {loading ? (
            <div className="w-full h-[400px] flex flex-col items-center justify-center">
              <AiOutlineLoading
                size={44}
                className="animate-spin"
                color={"#3f405b"}
              />
            </div>
          ) : (
            <>
              {mappedOrders?.length < 1 ? (
                <>
                  <MdOutlineFiberSmartRecord
                    size={45}
                    className="flex items-center justify-center ml-auto mr-auto mt-[60px]"
                    color="#3f405b"
                  />

                  <p
                    className="mb-0 f-14 leading-22 text-[#3f405b] gilroy-medium w-break text-[12px] text-center mt-[20px] ml-auto mr-auto"
                    style={{ width: "100%", wordWrap: "break-word" }}
                  >
                    No orders placed yet. Booked products will show up here.
                  </p>
                </>
              ) : (
                mappedOrders
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
