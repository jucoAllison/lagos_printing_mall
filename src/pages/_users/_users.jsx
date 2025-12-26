import React, { useContext, useState } from "react";
import { MainContext } from "../../App";
import { FiEdit, FiRefreshCw, FiSearch, FiTrash2 } from "react-icons/fi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineFiberSmartRecord,
} from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import CraeteAdmin from "./craeteAdmin";
import { AiOutlineLoading } from "react-icons/ai";
import Action from "./action";
import { LuUserRoundCog } from "react-icons/lu";

const Users = ({ data, loading }) => {
  const CTX = useContext(MainContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [addAdmin, setAddAdmin] = useState(false);
  const [action, setAction] = useState(null);

  // Sample user data
  const users = [];

  const filteredUsers = data?.filter(
    (user) =>
      user?.name?.first?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.name?.last?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Active
          </span>
        );
      case "suspended":
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            Suspended
          </span>
        );
      case "inactive":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Inactive
          </span>
        );
      default:
        return (
          <span className="bg-[#ffbb28] text-gray-800 text-xs px-2 py-1 rounded-full">
            Pending
          </span>
        );
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
            <MdOutlineAdminPanelSettings className="mr-1" /> {` ${role}`}
          </span>
        );
      case "user":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            User
          </span>
        );
      default:
        return (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center w-fit">
            <MdOutlineAdminPanelSettings className="mr-1" /> {` ${role}`}
          </span>
          //   <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
          //     Customer
          //   </span>
        );
    }
  };

  const mappedUsers = filteredUsers
    ?.sort(
      (a, b) => b.total_awaiting_confirmation - a.total_awaiting_confirmation
    )
    ?.filter((v) => v.type == "user")
    ?.map((user) => {
      return (
        <tr key={user?._id} className="hover:bg-gray-50">
          {/* <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td> */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              {user?.image ? (
                <img
                  src={user?.image}
                  className="w-[35px] h-[35px] rounded-full"
                  alt="profile-photo"
                />
              ) : (
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {user?.name?.first?.charAt(0)?.toUpperCase()}
                  {user?.name?.last?.charAt(0)?.toUpperCase()}
                </div>
              )}
              {/* <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {user?.name?.first} {user?.name?.last}
                </div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div> */}

              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">
                  {user?.name?.first} {user?.name?.last}
                </div>
                <div className="text-[11px] mt-[-1px] text-gray-900">
                  {user?.email}
                </div>
                <div className="text-[11px] mt-[-1px] text-gray-900">
                  {user?.phone}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-xs tabular-nums">
            {/* {user?.total_orders > 0 ? ( */}
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full relative">
              {user?.total_orders}
              {user?.total_awaiting_confirmation > 0 && (
                <div className="w-[20px] h-[20px] text-[#fff] bg-[#d00] rounded-full absolute top-[1px] right-[0px] flex items-center justify-center">
                  {user?.total_awaiting_confirmation}
                </div>
              )}
            </div>
            {/* ) : (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {user?.total_orders}
                        </span>
                      )} */}

            {/* {user?.total_orders ? getStatusBadge(user?.status) : ""} */}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {getRoleBadge(user?.type)}
          </td>
          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user?.password?.raw}
                    </td> */}
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end space-x-2">
              <button
                className="text-blue-600 hover:text-blue-900 p-1"
                onClick={() => setAction({ action: "edit", user })}
              >
                <FiEdit />
              </button>
              <button
                className="text-gray-600 hover:text-gray-900 p-1"
                onClick={() => setAction({ action: "delete", user })}
              >
                <FiTrash2 />
              </button>
            </div>
          </td>
        </tr>
      );
    });

  // console.log("filteredUsers HERE =>> ", filteredUsers);

  const mappedAdmins = data
    ?.sort(
      (a, b) => b.total_awaiting_confirmation - a.total_awaiting_confirmation
    )
    ?.filter((v) => v.type != "user")
    ?.map((user) => {
      return (
        <tr key={user?._id} className="hover:bg-gray-50">
          {/* <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td> */}
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              {user?.image ? (
                <img
                  src={user?.image}
                  className="w-[35px] h-[35px] rounded-full"
                  alt="profile-photo"
                />
              ) : (
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  {user?.name?.first?.charAt(0)?.toUpperCase()}
                  {user?.name?.last?.charAt(0)?.toUpperCase()}
                </div>
              )}
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">
                  {user?.name?.first} {user?.name?.last}
                </div>
                <div className="text-[11px] mt-[-1px] text-gray-900">
                  {user?.email}
                </div>
                <div className="text-[11px] mt-[-1px] text-gray-900">
                  {user?.phone}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-xs tabular-nums">
            {/* {user?.total_orders > 0 ? ( */}
            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full relative">
              {user?.total_orders}
              {user?.total_awaiting_confirmation > 0 && (
                <div className="w-[20px] h-[20px] text-[#fff] bg-[#d00] rounded-full absolute top-[1px] right-[0px] flex items-center justify-center">
                  {user?.total_awaiting_confirmation}
                </div>
              )}
            </div>
            {/* ) : (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {user?.total_orders}
                        </span>
                      )} */}

            {/* {user?.total_orders ? getStatusBadge(user?.status) : ""} */}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {getRoleBadge(user?.type)}
          </td>
          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user?.password?.raw}
                    </td> */}
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end space-x-2">
              <button
                className="text-blue-600 hover:text-blue-900 p-1"
                onClick={() => setAction({ action: "edit", user })}
              >
                <FiEdit />
              </button>
              <button
                className="text-gray-600 hover:text-gray-900 p-1"
                onClick={() => setAction({ action: "delete", user })}
              >
                <FiTrash2 />
              </button>
            </div>
          </td>
        </tr>
      );
    });

  return (
    <>
      {addAdmin && (
        <CraeteAdmin password={addAdmin} setPassword={setAddAdmin} />
      )}

      {action && <Action password={action} setPassword={setAction} />}
      <div className="p-6  min-h-screen">
        <div className="relative">
          <div className="px-1 pb-[10px] helper-size">
            <p className="mb-0 text-[26px] gilroy-Semibold text-uppercase font-[500] text-center text-[#3f405b]">
              Management
            </p>
            <p className="mb-0 text-center text-[16px]  gilroy-medium text-[#6a6b87] dark-c dark-p mt-8">
              organize and manage management details here.
            </p>
          </div>

          <button
            onClick={() => setAddAdmin(true)}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 absolute  top-[10px] right-[0px]"
          >
            <LuUserRoundCog className="mr-2" /> Admin
          </button>
        </div>

        {/* Management Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-[40px]">
          <div className="overflow-x-auto">
            {mappedAdmins?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Management
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cards
                </th> */}
                    {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Passwords
                </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mappedAdmins}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-[400px] flex flex-col items-center justify-center">
                {loading ? (
                  <AiOutlineLoading
                    size={44}
                    className="animate-spin"
                    color={"#3f405b"}
                  />
                ) : (
                  <>
                    <MdOutlineFiberSmartRecord
                      size={45}
                      className="flex items-center justify-center ml-auto mr-auto mt-[35px]"
                      color="#3f405b"
                    />

                    <p
                      className="mb-0 f-14 leading-22 text-[#3f405b] gilroy-medium w-break text-[12px] text-center mt-[20px] ml-auto mr-auto"
                      style={{
                        width: "100%",
                        wordWrap: "break-word",
                      }}
                    >
                      No users yet. All users will show up here.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-1 pb-[10px] helper-size">
          <p className="mb-0 text-[26px] gilroy-Semibold text-uppercase font-[500] text-center text-[#3f405b]">
            Users
          </p>
          <p className="mb-0 text-center text-[16px]  gilroy-medium text-[#6a6b87] dark-c dark-p mt-8">
            organize and manage user section.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {mappedUsers?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Users
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Orders
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cards
                </th> */}
                    {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Passwords
                </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mappedUsers}
                </tbody>
              </table>
            ) : (
              <div className="w-full h-[400px] flex flex-col items-center justify-center">
                {loading ? (
                  <AiOutlineLoading
                    size={44}
                    className="animate-spin"
                    color={"#3f405b"}
                  />
                ) : (
                  <>
                    <MdOutlineFiberSmartRecord
                      size={45}
                      className="flex items-center justify-center ml-auto mr-auto mt-[35px]"
                      color="#3f405b"
                    />

                    <p
                      className="mb-0 f-14 leading-22 text-[#3f405b] gilroy-medium w-break text-[12px] text-center mt-[20px] ml-auto mr-auto"
                      style={{
                        width: "100%",
                        wordWrap: "break-word",
                      }}
                    >
                      No users yet. All users will show up here.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
