import React, { useState } from "react";
import Classes from "../dashboard/dash.module.css";
import clsx from "clsx";
import { TbProgressAlert } from "react-icons/tb";
import { LuClockAlert } from "react-icons/lu";
import {
  MdDelete,
  MdOutlineCelebration,
  MdOutlineFiberSmartRecord,
} from "react-icons/md";
import moment from "moment";
import { AiOutlineLoading } from "react-icons/ai";

const Notification = ({ data, loading, loadingDeleting, deleteHandler }) => {
  const [notification, setNotification] = useState([
    {
      type: "alert",
      body: {
        title: "Account Login",
        text: `New login from device`,
      },
    },
    {
      type: "info",
      body: {
        title: "Password Changed Successfully",
        text: "Your password was changed successfully. If you did not make this change, please reset your password immediately or contact support.",
      },
    },
    {
      type: "success",
      body: {
        title: "Password Changed Successfully",
        text: "Your password was changed successfully. If you did not make this change, please reset your password immediately or contact support.",
      },
    },
  ]);

  const mapNot = data?.map((v, i) => (
    <div
      key={i}
      style={{ borderBottom: "1px solid #e0dfef" }}
      className="relative flex gap-[17px] pb-[20px] mb-[20px]"
    >
      <div
        className="min-w-[35px] w-[35px] min-h-[35px] h-[35px] flex items-center justify-center rounded-[8px]"
        style={{
          backgroundColor:
            v?.type == "alert"
              ? "#fe9505"
              : v?.type == "info"
              ? "#6a02c9"
              : "#019d2f",
        }}
      >
        {v?.type == "alert" ? (
          <TbProgressAlert color="#fff" size={23} />
        ) : v?.type == "info" ? (
          <LuClockAlert color="#fff" size={23} />
        ) : (
          <MdOutlineCelebration color="#fff" size={23} />
        )}
      </div>
      <div>
        <div className="mb-0 gilroy-Semibold text-[14px] font-[500] text-[#3f405b] theme-tran r-f-20 text-uppercase">
          {v?.body?.title}
        </div>
        <div className="mb-0 gilroy-medium text-[#6a6b87] text-[14px] r-f-12 profile-header  tran-title">
          {v?.body?.text}
        </div>
      </div>

      <div className="absolute top-[-15px] right-[20px] text-[11px] text-[#85899b]">
        {moment(v?.date).format("lll")}
      </div>
    </div>
  ));

  return (
    <>
      <div
        className="main-containt"
        style={{ marginTop: "20px", fontFamily: "outfit" }}
      >
        <div className="text-center">
          <p className="mb-0 gilroy-Semibold text-[26px] font-[500] text-[#3f405b] theme-tran r-f-20 text-uppercase">
            Notification
          </p>
          <p className="mb-0 gilroy-medium text-[#6a6b87] text-[16px] r-f-12 profile-header  tran-title">
            notification list details here
          </p>
        </div>

        <div
          className={clsx([
            Classes.coverhereim,
            "profile-personal-information bg-[#f5f6fa] mt-4",
          ])}
        >
          <div className="flex flex-col p-[20px] rounded-[8px]">
            {loading ? (
              <div className="w-full h-[280px] flex items-center justify-center">
                <AiOutlineLoading
                  className="animate-spin "
                  color="#000"
                  size={"60px"}
                />
              </div>
            ) : (
              <>
                {mapNot?.length > 0 && (
                  <div onClick={deleteHandler} className="flex justify-between mb-4">
                    {loadingDeleting ? (
                      <AiOutlineLoading
                        className="animate-spin ml-[auto]"
                        color="#d00"
                        size={26}
                      />
                    ) : (
                      <MdDelete color="red" size={23} className="ml-[auto]" />
                    )}
                  </div>
                )}
                {mapNot?.length > 0 ? (
                  <div
                    style={{
                      height: mapNot?.length < 4 ? "404px" : "100%",
                      overflow: "hidden",
                    }}
                  >
                    {mapNot}
                  </div>
                ) : (
                  <div className="w-full h-[404px]">
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
                      No notification history yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
