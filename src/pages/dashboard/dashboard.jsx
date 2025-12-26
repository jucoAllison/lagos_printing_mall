import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Classes from "./dash.module.css";
import {
  MdOutlineAccountBalance,
  MdOutlineCircleNotifications,
  MdOutlineContentCopy,
  MdOutlineFiberSmartRecord,
} from "react-icons/md";
import clsx from "clsx";
import { AiOutlineProduct } from "react-icons/ai";
import { RiNotification4Line, RiProfileLine } from "react-icons/ri";
import Fund from "./fund";
import { MainContext } from "../../App";
import toast from "react-hot-toast";

const Dashboard = ({ orders }) => {
  const CTX = useContext(MainContext)
  const [seeAll, setSeeAll] = useState(false);
  const walletRef = useRef()
  const [fund, setFund] = useState(false);
  const [header, setHeader] = useState([
    { key: "1", name: "Pending", active: true },
    // { key: "5", name: "Awaiting confirmation", active: true },
    // { key: "10", name: "Awaiting payment", active: false },
    { key: "2", name: "Completed", active: false },
    { key: "4", name: "Cancelled", active: false },
    { key: "4", name: "Refund", active: false },
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
      }}
    >
      {v.name}
    </div>
  ));

  const mappedOrders = orders?.map((v, i) => {
    const change = parseFloat(((v?.Bid - v?.Ask) / v?.Ask) * 100)?.toFixed(2);

    const isNegative = change.startsWith("-");

    return (
      <div
        key={i}
        className="flex items-center mt-2 rounded-[8px] px-[13px] py-[13px] bg-white"
      >
        <AiOutlineProduct />

        <div className="ml-2 w-[150px]">
          <p
            className="mb-0 f-14 text-dark leading-22 gilroy-Semibold text-[12px] cursor-pointer ellipsis"
            style={{ width: "100%" }}
          >
            {v?.InstrumentDisplayName}
          </p>

          {/* <p
            className="mb-0 f-14 text-dark leading-22 gilroy-bold  w-[100%] hover:text-blue-600 cursor-pointer ellipsis font-bold"
            style={{ fontSize: "13px", width: "max-content" }}
          >
            {v?.SymbolFull}
          </p> */}

          <div className="text-[#999] text-[13px]">{v?.SymbolFull}</div>
        </div>

        <div className="ml-auto">
          <p
            className="mb-0 f-14 text-dark leading-22 gilroy-Semibold w-break text-right ml-[auto]"
            style={{ width: "max-content" }}
          >
            ${parseFloat(v?.Ask?.toFixed(2)).toLocaleString()}
          </p>
          {/* {change && <div
            className=" text-[13px] text-right"
            style={{
              color: isNegative ? "red" : "green",
            }}
          >
            {change}%
          </div>} */}
        </div>
      </div>
    );
  });


  return (
    <>
      {fund && <Fund fund={fund} setFund={setFund} />}
      <div className={Classes.coverhereim}>
        <div
          style={{
            borderRadius: "10px",
            marginTop: "40px",
            height: "155px",
            padding: "13px 19px",
            boxShadow: "1px 1px 16px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="d-flex justify-content-between">
            <div className="wallet-left-box d-flex gap-[18px] items-center">
              <div className="w-[50px] h-[50px] rounded-[10px] d-flex align-items-center justify-content-center bg-[#f6f6f8]">
                <MdOutlineAccountBalance size={21} color="#3f405b" />
              </div>
              <div className="mt-n3p span-currency">
                <span
                  className="f-15 gilroy-medium text-[#9998a0]"
                  style={{ fontWeight: "400" }}
                >
                  Your Balance
                </span>
                <p className="mb-0 mt-6">
                  <span className="text-[28px] gilroy-Semibold font-[500] text-[#3f405b]">
                    ₦{CTX?.userObj?.balance?.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <div className="wallet-right-box mt-n3p span-currency text-end">
              <button
                onClick={() => {}}
                className="text3xlFontBoldUnderline"
                style={{
                  width: "max-content",
                  padding: "0px 11px",
                  display: "flex",
                  alignItems: "center",
                  margin: "auto",
                  height: "30px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <input
                  ref={walletRef}
                  value={CTX?.userObj?.referral_code}
                  readOnly
                  style={{
                    position: "absolute",
                    left: "-200px",
                    width: "71px",
                  }}
                />
                <span className="text-[12px]">{CTX?.userObj?.referral_code}</span>
                <MdOutlineContentCopy
                  size={14}
                  color="#fff"
                  style={{ marginLeft: "6px" }}
                  onClick={() => {
                    toast.success("Copied");
                    walletRef.current?.select();
                    walletRef.current?.focus();
                    document.execCommand("copy");
                  }}
                />
              </button>
            </div>
          </div>
          <div className={Classes.abcdef}>
            <div>
              <p className="text-[#9998a0] mb-0 text-[12px] gilroy-medium">
                ₦{CTX?.userObj?.bonusAmount?.toFixed(2)} -<span className="ml-1 text-dark">Referrals Earned</span>
              </p>

              <p className="text-[#9998a0] mb-0 text-[12px] gilroy-medium">
                ₦{CTX?.userObj?.commission?.toFixed(2)} -<span className="ml-1 text-dark">Commission Earned</span>
              </p>
            </div>

            <div className="dash-right-profile gap-[13px] d-flex align-items-end flex-wrap mt-[-20px]">
              <div
                className="flex flex-col items-center"
                onClick={() => setFund(true)}
              >
                <div
                  className="flex items-center justify-center text-[#fff] w-[35px] h-[35px] cursor-pointer
                  rounded-[40px] mt-2 bg-[#ee2490] hover:bg-[#822b58]"
                >
                  {/* <LuArrowDownLeft size={19} /> */}
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.40483 5H18.5952C19.0265 4.99999 19.3986 4.99997 19.705 5.02548C20.0285 5.05239 20.3502 5.11182 20.6598 5.27249C21.1216 5.51217 21.4971 5.89462 21.7325 6.36503C21.8902 6.68034 21.9486 7.00802 21.975 7.33748C22 7.64962 22 8.02858 22 8.46786V11.6667C22 12.1269 21.6337 12.5 21.1818 12.5C20.7299 12.5 20.3636 12.1269 20.3636 11.6667V10.8333H5.63637V14.8333C5.63637 15.3138 5.637 15.624 5.65594 15.8601C5.6741 16.0865 5.70493 16.1705 5.72554 16.2117C5.80398 16.3685 5.92915 16.4959 6.0831 16.5758C6.12355 16.5968 6.20596 16.6282 6.42823 16.6467C6.66005 16.666 6.96464 16.6667 7.43636 16.6667H13C13.4519 16.6667 13.8182 17.0398 13.8182 17.5C13.8182 17.9602 13.4519 18.3333 13 18.3333H7.40485C6.97354 18.3333 6.60145 18.3334 6.29498 18.3079C5.97151 18.2809 5.64979 18.2215 5.34021 18.0608C4.87835 17.8212 4.50286 17.4387 4.26753 16.9683C4.10979 16.653 4.05144 16.3253 4.02501 15.9959C3.99997 15.6837 3.99999 15.3047 4 14.8655V8.46788C3.99999 8.02859 3.99997 7.64962 4.02501 7.33748C4.05144 7.00802 4.10979 6.68034 4.26753 6.36503C4.50286 5.89462 4.87835 5.51217 5.34021 5.27249C5.64979 5.11182 5.97151 5.05239 6.29498 5.02548C6.60145 4.99997 6.97353 4.99999 7.40483 5ZM5.63637 9.16667H20.3636V8.5C20.3636 8.01954 20.363 7.70931 20.3441 7.4732C20.3259 7.24681 20.2951 7.16288 20.2745 7.12168C20.196 6.96488 20.0709 6.83739 19.9169 6.7575C19.8764 6.7365 19.794 6.7051 19.5718 6.68661C19.3399 6.66732 19.0354 6.66667 18.5636 6.66667H7.43637C6.96464 6.66667 6.66005 6.66732 6.42823 6.68661C6.20596 6.7051 6.12355 6.7365 6.0831 6.7575C5.92915 6.83739 5.80398 6.96487 5.72554 7.12168C5.70493 7.16288 5.6741 7.24681 5.65594 7.4732C5.637 7.70931 5.63637 8.01954 5.63637 8.5V9.16667ZM18.7273 13.3333C19.1791 13.3333 19.5455 13.7064 19.5455 14.1667V17.1548L20.6033 16.0774C20.9228 15.752 21.4408 15.752 21.7604 16.0774C22.0799 16.4028 22.0799 16.9305 21.7604 17.2559L19.3058 19.7559C18.9863 20.0814 18.4683 20.0814 18.1487 19.7559L15.6942 17.2559C15.3747 16.9305 15.3747 16.4028 15.6942 16.0774C16.0137 15.752 16.5317 15.752 16.8513 16.0774L17.9091 17.1548V14.1667C17.9091 13.7064 18.2754 13.3333 18.7273 13.3333Z"
                      fill="#fff"
                    ></path>
                  </svg>
                </div>

                <div className="font-[600] text-[12px] text-[#3f405b] mt-1">
                  Fund
                </div>
              </div>

              {/* <div
                className="flex flex-col items-center"
                // onClick={() => setShowWithdraw(true)}
              >
                <div
                  className="flex items-center justify-center text-[#fff] w-[35px] h-[35px] cursor-pointer
                  rounded-[40px] mt-2 bg-[#ee2490] hover:bg-[#822b58]"
                >

                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.40483 6H18.5952C19.0265 5.99999 19.3986 5.99997 19.705 6.02548C20.0285 6.05239 20.3502 6.11182 20.6598 6.27249C21.1216 6.51217 21.4971 6.89462 21.7325 7.36503C21.8902 7.68034 21.9486 8.00802 21.975 8.33748C22 8.64962 22 9.02858 22 9.46786V12.6667C22 13.1269 21.6337 13.5 21.1818 13.5C20.7299 13.5 20.3636 13.1269 20.3636 12.6667V11.8333H5.63637V15.8333C5.63637 16.3138 5.637 16.624 5.65594 16.8601C5.6741 17.0865 5.70493 17.1705 5.72554 17.2117C5.80398 17.3685 5.92915 17.4959 6.0831 17.5758C6.12355 17.5968 6.20596 17.6282 6.42823 17.6467C6.66005 17.666 6.96464 17.6667 7.43636 17.6667H13C13.4519 17.6667 13.8182 18.0398 13.8182 18.5C13.8182 18.9602 13.4519 19.3333 13 19.3333H7.40485C6.97354 19.3333 6.60145 19.3334 6.29498 19.3079C5.97151 19.2809 5.64979 19.2215 5.34021 19.0608C4.87835 18.8212 4.50286 18.4387 4.26753 17.9683C4.10979 17.653 4.05144 17.3253 4.02501 16.9959C3.99997 16.6837 3.99999 16.3047 4 15.8655V9.46788C3.99999 9.02859 3.99997 8.64962 4.02501 8.33748C4.05144 8.00802 4.10979 7.68034 4.26753 7.36503C4.50286 6.89462 4.87835 6.51217 5.34021 6.27249C5.64979 6.11182 5.97151 6.05239 6.29498 6.02548C6.60145 5.99997 6.97353 5.99999 7.40483 6ZM5.63637 10.1667H20.3636V9.5C20.3636 9.01954 20.363 8.70931 20.3441 8.4732C20.3259 8.24681 20.2951 8.16288 20.2745 8.12168C20.196 7.96488 20.0709 7.83739 19.9169 7.7575C19.8764 7.7365 19.794 7.7051 19.5718 7.68661C19.3399 7.66732 19.0354 7.66667 18.5636 7.66667H7.43637C6.96464 7.66667 6.66005 7.66732 6.42823 7.68661C6.20596 7.7051 6.12355 7.7365 6.0831 7.7575C5.92915 7.83739 5.80398 7.96487 5.72554 8.12168C5.70493 8.16288 5.6741 8.24681 5.65594 8.4732C5.637 8.70931 5.63637 9.01954 5.63637 9.5V10.1667ZM18.1487 14.5774C18.4683 14.252 18.9863 14.252 19.3058 14.5774L21.7604 17.0774C22.0799 17.4028 22.0799 17.9305 21.7604 18.2559C21.4408 18.5814 20.9228 18.5814 20.6033 18.2559L19.5455 17.1785V20.1667C19.5455 20.6269 19.1791 21 18.7273 21C18.2754 21 17.9091 20.6269 17.9091 20.1667V17.1785L16.8513 18.2559C16.5317 18.5814 16.0137 18.5814 15.6942 18.2559C15.3747 17.9305 15.3747 17.4028 15.6942 17.0774L18.1487 14.5774Z"
                      fill="#fff"
                    ></path>
                  </svg>
                </div>

                <div className="font-[600] text-[12px] text-[#3f405b] mt-1">
                  Withdraw
                </div>
              </div> */}

              <Link
                to={"/account/notification"}
                className="flex flex-col items-center"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="flex items-center justify-center text-[#fff] w-[35px] h-[35px] cursor-pointer
                  rounded-[40px] mt-2 bg-[#ee2490] hover:bg-[#822b58] relative"
                >
                 {CTX.userObj.unread_notification > 0 && <div className="text-[10px] font-bold bg-[#822b58] w-[17px] h-[17px] flex items-center justify-center text-[#fff] rounded-full absolute top-[-4px] right-[-4px]">{CTX.userObj.unread_notification}</div>}
                  <RiNotification4Line size={20} />
                  
                </div>

                <div
                  className="font-[600] text-[12px] text-[#3f405b] mt-1"
                  style={{ textDecoration: "none" }}
                >
                  Notifications
                </div>
              </Link>

              <Link
                to={"/account/profile"}
                className="flex flex-col items-center"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="flex items-center justify-center text-[#fff] w-[35px] h-[35px] cursor-pointer
                  rounded-[40px] mt-2 bg-[#ee2490] hover:bg-[#822b58]"
                >
                  <RiProfileLine size={21} />

                  {/* <LuRepeat size={16} /> */}
                  {/* <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="#000"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.21567 6H18.7843C19.1917 5.99999 19.5431 5.99997 19.8325 6.02378C20.138 6.0489 20.4419 6.10437 20.7343 6.25432C21.1704 6.47802 21.5251 6.83498 21.7473 7.27402C21.8963 7.56832 21.9514 7.87416 21.9764 8.18165C22 8.47298 22 8.82667 22 9.23667V10.2778C22 10.7073 21.654 11.0556 21.2273 11.0556C20.1604 11.0556 19.2955 11.9261 19.2955 13C19.2955 14.0739 20.1604 14.9444 21.2273 14.9444C21.654 14.9444 22 15.2927 22 15.7222V16.7633C22 17.1733 22 17.527 21.9764 17.8184C21.9514 18.1258 21.8963 18.4317 21.7473 18.726C21.5251 19.165 21.1704 19.522 20.7343 19.7457C20.4419 19.8956 20.138 19.9511 19.8325 19.9762C19.5431 20 19.1917 20 18.7843 20H8.21565C7.80832 20 7.45692 20 7.16748 19.9762C6.86199 19.9511 6.55813 19.8956 6.26575 19.7457C5.82956 19.522 5.47492 19.165 5.25267 18.726C5.10369 18.4317 5.04858 18.1258 5.02362 17.8184C4.99997 17.527 4.99999 17.1733 5 16.7633L5 15.7222C5 15.2927 5.34596 14.9444 5.77273 14.9444C6.83964 14.9444 7.70455 14.0739 7.70455 13C7.70455 11.9261 6.83964 11.0556 5.77273 11.0556C5.34596 11.0556 5 10.7073 5 10.2778L5 9.23669C4.99999 8.82668 4.99997 8.47298 5.02362 8.18165C5.04858 7.87416 5.10369 7.56832 5.25267 7.27402C5.47492 6.83498 5.82956 6.47802 6.26575 6.25432C6.55813 6.10437 6.86199 6.0489 7.16748 6.02378C7.45692 5.99997 7.80833 5.99999 8.21567 6ZM7.29333 7.57417C7.08341 7.59143 7.00558 7.62074 6.96737 7.64033C6.82197 7.7149 6.70376 7.83388 6.62968 7.98023C6.61021 8.01869 6.5811 8.09702 6.56395 8.30832C6.54606 8.52869 6.54546 8.81824 6.54546 9.26667V9.58673C8.09399 9.94041 9.25 11.3343 9.25 13C9.25 14.6657 8.09399 16.0596 6.54546 16.4133V16.7333C6.54546 17.1818 6.54606 17.4713 6.56395 17.6917C6.5811 17.903 6.61021 17.9813 6.62968 18.0198C6.70376 18.1661 6.82197 18.2851 6.96737 18.3597C7.00558 18.3793 7.08341 18.4086 7.29333 18.4258C7.51227 18.4438 7.79994 18.4444 8.24546 18.4444H18.7545C19.2001 18.4444 19.4877 18.4438 19.7067 18.4258C19.9166 18.4086 19.9944 18.3793 20.0326 18.3597C20.178 18.2851 20.2962 18.1661 20.3703 18.0198C20.3898 17.9813 20.4189 17.903 20.4361 17.6917C20.4539 17.4713 20.4545 17.1818 20.4545 16.7333V16.4133C18.906 16.0596 17.75 14.6657 17.75 13C17.75 11.3343 18.906 9.94041 20.4545 9.58673V9.26667C20.4545 8.81824 20.4539 8.52869 20.4361 8.30832C20.4189 8.09702 20.3898 8.01869 20.3703 7.98023C20.2962 7.83388 20.178 7.7149 20.0326 7.64033C19.9944 7.62074 19.9166 7.59143 19.7067 7.57417C19.4877 7.55616 19.2001 7.55556 18.7545 7.55556H8.24546C7.79994 7.55556 7.51227 7.55616 7.29333 7.57417ZM11.9545 8.33333C12.3813 8.33333 12.7273 8.68156 12.7273 9.11111V9.88889C12.7273 10.3184 12.3813 10.6667 11.9545 10.6667C11.5278 10.6667 11.1818 10.3184 11.1818 9.88889V9.11111C11.1818 8.68156 11.5278 8.33333 11.9545 8.33333ZM11.9545 11.8333C12.3813 11.8333 12.7273 12.1816 12.7273 12.6111V13.3889C12.7273 13.8184 12.3813 14.1667 11.9545 14.1667C11.5278 14.1667 11.1818 13.8184 11.1818 13.3889V12.6111C11.1818 12.1816 11.5278 11.8333 11.9545 11.8333ZM11.9545 15.3333C12.3813 15.3333 12.7273 15.6816 12.7273 16.1111V16.8889C12.7273 17.3184 12.3813 17.6667 11.9545 17.6667C11.5278 17.6667 11.1818 17.3184 11.1818 16.8889V16.1111C11.1818 15.6816 11.5278 15.3333 11.9545 15.3333Z"
                      fill="#fff"
                    ></path>
                  </svg> */}
                </div>

                <div
                  className="font-[600] text-[12px] text-[#3f405b] mt-1"
                  style={{ textDecoration: "none" }}
                >
                  Profile
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-[30px]">
          <div className="d-flex justify-content-between qr-icon">
            <div className={clsx([Classes.topHeaderNames, "no-scrollbar"])}>
              {headerMapped}
            </div>

            {mappedOrders.length > 0 && (
              <div
                href="#"
                onClick={() => setSeeAll(!seeAll)}
                className="text-blue-500 hover:text-blue-700 font-medium text-[14px] cursor-pointer"
              >
                {seeAll ? "See less" : "See all"}
              </div>
            )}
          </div>

          {mappedOrders.length < 1 ? (
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
