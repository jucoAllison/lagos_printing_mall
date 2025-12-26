import React, { useContext } from "react";
import { MainContext } from "../../App";
import {
  FiCreditCard,
  FiDollarSign,
  FiRefreshCw,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Legend,
  Line,
} from "recharts";
import { Link } from "react-router-dom";

const Portfolio = ({ data, orderStats, onChangeSelect }) => {
  const CTX = useContext(MainContext);

  return (
    <>
      <div className="p-6  min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {CTX?.userObj?.name?.first || "Administrator"}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <FiRefreshCw className="mr-2" /> Refresh
            </button>
            {/* <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8"
          style={{ fontFamily: "outfit" }}
        >
          <div className="bg-[#f5f6fa] p-6 rounded-xl shadow-sm border border-gray-100">
            <Link style={{textDecoration: "none"}} to="/management/users" className="flex justify-between">
              <div>
                <p className="text-gray-500">Users</p>

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
            </Link>
          </div>

          {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between" to="/account/backups">
              <div>
                <p className="text-gray-500">Backups</p>
                <h2 className="text-2xl font-bold mt-2">
                  {parseInt(CTX?.store?.backups).toLocaleString()}
                </h2>
               
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiCreditCard className="text-green-600 text-xl" />
              </div>
            </div>
          </div> */}

          <div className="bg-[#f5f6fa] p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between" to="/account/orders/all">
              <div className="w-full">
                <p className="text-gray-500">Orders</p>
                <div className="w-full" style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))"}}>
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 bg-[#f5f6fa] p-6 rounded-xl shadow-sm border border-gray-100 relative">
          <select
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm absolute top-[10px] right-[10px]"
            onChange={onChangeSelect}
          >
            <option value={new Date().getFullYear()}>
              {new Date().getFullYear()}
            </option>
            <option value={new Date().getFullYear() - 1}>
              {new Date().getFullYear() - 1}
            </option>
            <option value={new Date().getFullYear() - 2}>
              {new Date().getFullYear() - 2}
            </option>
          </select>

          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">User Growth</h3>
              {/* <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
                <option>{new Date().getFullYear()}</option>
                <option>{new Date().getFullYear() - 1}</option>
                <option>{new Date().getFullYear() - 2}</option>
              </select> */}
            </div>
            <div className="h-80">
              {data && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Order Details</h3>
              {/* <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
                <option>{new Date().getFullYear()}</option>
                <option>{new Date().getFullYear() - 1}</option>
                <option>{new Date().getFullYear() - 2}</option>
              </select> */}
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />

                  <YAxis yAxisId="left" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `₦${v / 1000}k`}
                  />

                  <Tooltip />

                  {/* <Tooltip
      formatter={(value, name) =>
        name === "revenue"
          ? [`$${value.toLocaleString()}`, "Revenue"]
          : [value, "Orders"]
      }
    /> */}
                  {/* <Legend /> */}

                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="orders"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Orders"
                  />

                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

{
  /* <ResponsiveContainer width="100%" height={320}>
  <LineChart data={orderStats}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis dataKey="name" />
    <YAxis yAxisId="left" />
<YAxis yAxisId="right" orientation="right" />
    <Tooltip />
    <Legend />

    <Line
      type="monotone"
      dataKey="orders"
      stroke="#3B82F6"
      strokeWidth={2}
      name="Total Orders"
    />

    
<Line yAxisId="left" dataKey="orders" stroke="#3B82F6" />
<Line yAxisId="right" dataKey="revenue" stroke="#10B981" />

  </LineChart>
</ResponsiveContainer> */
}
