import React, { useContext } from "react";
import {
  MdOutlineAlternateEmail,
  MdOutlineKeyboardArrowRight,
  MdSupportAgent,
} from "react-icons/md";
import { RxSpeakerModerate } from "react-icons/rx";
import { GrShieldSecurity } from "react-icons/gr";
import { VscTools } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { TbListTree } from "react-icons/tb";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { BsChatLeftDots } from "react-icons/bs";
import { useState } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import Classes from "../dashboard/dash.module.css";
import { FaRegUser } from "react-icons/fa";
import { MainContext } from "../../App";
import Password from "./password";

const Profile = () => {
  const CTX = useContext(MainContext);
  const [isSupport, setIsSupport] = useState(false);
  const [password, setPassword] = useState(false);

  // dsg sdgasgas gsa gads gdasg sdfw eaf sfaew 

  return (
    <>
      {password && <Password password={password} setPassword={setPassword} />}
      <div className={Classes.coverhereim} style={{ marginTop: "60px" }}>
        <div className="containt-parent">
          <div className="main-containt">
            {/* <!-- main-containt --> */}
            <div className="text-center">
              {CTX?.userObj?.image ? (
                <img
                  src={CTX?.userObj?.image}
                  alt="Profile"
                  className="img-fluid"
                  style={{
                    width: "116px",
                    height: "116px",
                    objectFit: "cover",
                    borderRadius: "100%",
                    margin: "auto",
                  }}
                />
              ) : (
                <div className="w-[116px] mx-auto h-[116px] mb-2 rounded-full bg-[#e7e5ff] flex items-center justify-center">
                  <FaRegUser size={37} color="#3f405b" />
                </div>
              )}
              <p className="mb-0 gilroy-Semibold text-[24px] text-[#3f405b] theme-tran font-[500] r-f-20 text-capitalize">
                {CTX?.userObj?.name?.first +
                  " " +
                  CTX?.userObj?.name?.last}
              </p>
              <p className="mb-0 gilroy-medium text-[#6a6b87] f-16 r-f-12 profile-header text-[14px]">
                {CTX?.userObj?.email}
              </p>
            </div>
            <div className="row" id="profileUpdate">
              <div>
                <Link
                  to={"/refer-earn"}
                  className="d-flex items-center mt-[20px] hover:bg-[#f5f6fa] py-[10px] rounded-[12px] no-underline"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex justify-center items-center bg-[#f5f6fa] w-[44px] h-[44px] rounded-full">
                    <RxSpeakerModerate size={18} color="#3f405b" />
                  </div>

                  <div className="ml-2">
                    <p className="mb-0 gilroy-Semibold f-13 text-dark theme-tran r-f-20 text-capitalize font-[500]">
                      Refer & Earn
                    </p>
                    <p className="mb-0 gilroy-medium text-[#6a6b87] f-16 r-f-12 profile-header text-[14px]">
                      make some extra cash
                    </p>
                  </div>

                  <MdOutlineKeyboardArrowRight
                    size={23}
                    color="#3f405b"
                    className="ml-auto"
                  />
                </Link>

                <Link
                  to={"/profile/settings"}
                  className="d-flex items-center mt-[20px] hover:bg-[#f5f6fa] py-[10px] rounded-[12px]"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex justify-center items-center bg-[#f5f6fa] w-[44px] h-[44px] rounded-full">
                    <VscTools size={18} color="#3f405b" />
                  </div>

                  <div className="ml-2">
                    <p className="mb-0 gilroy-Semibold f-13 text-dark theme-tran r-f-20 text-capitalize font-[500]">
                      Settings
                    </p>
                    <p className="mb-0 gilroy-medium text-[#6a6b87] f-16 r-f-12 profile-header text-[14px]">
                      manage & modify your account
                    </p>
                  </div>

                  <MdOutlineKeyboardArrowRight
                    size={23}
                    color="#3f405b"
                    className="ml-auto"
                  />
                </Link>

                <div
                  onClick={() => setPassword(!password)}
                  className="d-flex items-center mt-[20px] hover:bg-[#f5f6fa] py-[10px] rounded-[12px]"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex justify-center items-center bg-[#f5f6fa] w-[44px] h-[44px] rounded-full">
                    <GrShieldSecurity size={18} color="#3f405b" />
                  </div>

                  <div className="ml-2">
                    <p className="mb-0 gilroy-Semibold f-13 text-dark theme-tran r-f-20 text-capitalize font-[500]">
                      Security & Password
                    </p>
                    <p className="mb-0 gilroy-medium  f-16 r-f-12 profile-header text-[14px] text-[#6a6b87]">
                      Change passcode and secure account
                    </p>
                  </div>

                  <MdOutlineKeyboardArrowRight
                    size={23}
                    color="#3f405b"
                    className="ml-auto"
                  />
                </div>

                {/* {CTX?.store?.user?.type === "user" && ( */}
                <div
                  onClick={() => setIsSupport(!isSupport)}
                  className="d-flex items-center mt-[20px] hover:bg-[#f5f6fa] py-[10px] rounded-[12px]"
                >
                  <div className="d-flex justify-center items-center bg-[#f5f6fa] w-[44px] h-[44px] rounded-full">
                    <MdSupportAgent size={18} color="#3f405b" />
                  </div>

                  <div className="ml-2">
                    <p className="mb-0 gilroy-Semibold f-13 text-dark theme-tran r-f-20 text-capitalize font-[500]">
                      Support
                    </p>
                    <p className="mb-0 gilroy-medium  f-16 r-f-12 profile-header text-[14px] text-[#6a6b87]">
                      Chat support for quick assistance
                    </p>
                  </div>

                  <MdOutlineKeyboardArrowRight
                    size={23}
                    color="#3f405b"
                    className="ml-auto"
                  />
                </div>
                {/* )} */}
                {/* {CTX?.store?.user?.type === "user" && ( */}
                <Link
                  to="/account/about"
                  className="d-flex items-center mt-[20px] hover:bg-[#f5f6fa] py-[10px] rounded-[12px]"
                  style={{ textDecoration: "none" }}
                >
                  <div className="d-flex justify-center items-center bg-[#f5f6fa] w-[44px] h-[44px] rounded-full">
                    <TbListTree size={18} color="#3f405b" />
                  </div>

                  <div className="ml-2">
                    <p className="mb-0 gilroy-Semibold f-13 text-dark theme-tran r-f-20 text-capitalize font-[500]">
                      About
                    </p>
                    <p className="mb-0 gilroy-medium text-[#6a6b87] f-16 r-f-12 profile-header text-[14px]">
                      Learn more about LAGOS PRINTING MALL
                    </p>
                  </div>

                  <MdOutlineKeyboardArrowRight
                    size={23}
                    color="#3f405b"
                    className="ml-auto"
                  />
                </Link>
                {/* )} */}
                <div
                  className="bg-[red] hover:bg-[#d00] cursor-pointer text-white text-center h-[40px] rounded-[26px] flex justify-center items-center font-bold my-8 mx-auto text-[14px]"
                  style={{ width: "230px", maxWidth: "100%" }}
                  onClick={() => CTX.logout_handler()}
                >
                  <span>Logout of this account</span>
                </div>
                {/* <!-- Profile Image Div --> */}
                {/* <ProfilePicture /> */}

                {/* <!-- Default Wallet Div --> */}
                {/* <DefaultWallet /> */}
              </div>
            </div>
            {/* <!-- Personal Information Div --> */}
            {/* <PersonalInformation /> */}

            {/* <!-- main-containt --> */}
          </div>
        </div>
      </div>

      {isSupport && (
        <>
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            style={{
              backdropFilter: "blur(0.3rem)",
              zIndex: "10",
              background: "rgba(33,33,33,.6)",
            }}
          ></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
              className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
              style={{ padding: "17px" }}
            >
              <div
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                style={{ width: "100%" }}
              >
                <div
                  className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 p-[300px]"
                  style={{ width: "100%", padding: "17px" }}
                >
                  <h1
                    style={{
                      fontSize: "28px",
                      fontWeight: "bold",
                      textAlign: "center",
                      fontFamily: "outfit",
                      marginTop: "-20px",
                      marginBottom: "10px",
                    }}
                  >
                    Support
                  </h1>

                  <a
                    href="tel:+2348062249993"
                    style={{ textDecoration: "none" }}
                    className="flex items-center mt-2 rounded-[8px] px-[13px] py-[13px] "
                  >
                    <div className="w-[40px] h-[40px] bg-[#00000033] rounded-full flex items-center justify-center">
                      <HiOutlinePhone color="#000" size={22} />
                    </div>

                    <div className="ml-2">
                      <p
                        className="mb-0 text-[#3f405b] gilroy-Semibold  text-[16px] font-[500]"
                        style={{
                          width: "max-content",
                          margin: "0px",
                          height: "30px",
                        }}
                      >
                        Call us now
                      </p>
                      <div className="text-[#999] text-[13px]">
                        active customer service
                      </div>
                    </div>

                    <div className="ml-auto">
                      <RiArrowRightSLine size={22} color="#000" />
                    </div>
                  </a>

                  <a
                    href="https://wa.me/2348062249993"
                    style={{ textDecoration: "none" }}
                    className="flex items-center mt-2 rounded-[8px] px-[13px] py-[13px] "
                  >
                    <div className="w-[40px] h-[40px] bg-[#00000033] rounded-full flex items-center justify-center">
                      <IoChatboxEllipsesOutline color="#000" size={22} />
                    </div>

                    <div className="ml-2">
                      <p
                        className="mb-0 text-[#3f405b] gilroy-Semibold  text-[16px] font-[500]"
                        style={{
                          width: "max-content",
                          margin: "0px",
                          height: "30px",
                        }}
                      >
                        Chat with a Live Person
                      </p>
                      <div className="text-[#999] text-[13px]">
                        whatsapp us now
                      </div>
                    </div>

                    <div className="ml-auto">
                      <RiArrowRightSLine size={22} color="#000" />
                    </div>
                  </a>

                  <a
                    href="mailto:@care@lagosprintingmall.com"
                    className="flex items-center mt-2 rounded-[8px] px-[13px] py-[13px] mb-1"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="w-[40px] h-[40px] bg-[#00000033] rounded-full flex items-center justify-center">
                      <MdOutlineAlternateEmail color="#000" size={22} />
                    </div>

                    <div className="ml-2">
                      <p
                        className="mb-0 text-[#3f405b] gilroy-Semibold  text-[16px] font-[500]"
                        style={{ width: "max-content" }}
                      >
                        Email Us
                      </p>
                      <div className="text-[#999] text-[13px]">
                        care@lagosprintingmall.com
                      </div>
                    </div>

                    <div className="ml-auto">
                      <RiArrowRightSLine size={22} color="#000" />
                    </div>
                  </a>

                  <h2
                    onClick={() => setIsSupport(false)}
                    className={
                      Classes.authSubheaderTitleSecondaryWhiteBlackColor
                    }
                    style={{
                      width: "100%",
                      textAlign: "center",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "outfit",
                      marginBottom: "-1px",
                      justifyContent: "center",
                    }}
                  >
                    {/* {loadingResend && (
                          <AiOutlineLoading className="animate-spin h-5 w-5 mr-3" />
                        )} */}
                    Cancel
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
