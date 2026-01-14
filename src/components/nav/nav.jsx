import React, { useContext, useEffect, useState } from "react";
import Classes from "./nav.module.css";
import clsx from "clsx";
import { IoReorderFour, IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineLoading, AiOutlineProduct } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiMessage3Line } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import {
  FaFacebookF,
  FaInstagram,
  FaRegUser,
  FaRegWindowClose,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { BiHomeCircle } from "react-icons/bi";
import lpm from "../../assets/LPM.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MainContext } from "../../App";
// import { isValidPhoneNumber } from "libphonenumber-js";
import AuthModal from "./authModal";
import SmallScreenLinks from "./smallScreenLinks";
import { TbSettingsCheck, TbUsers } from "react-icons/tb";

const Nav = () => {
  const CTX = useContext(MainContext);
  const [showmenu, setShowmenu] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const navigation = useNavigate();
  const [inputs, setInputs] = useState({});
  const [showDropDown, setShowDropDown] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = inputs.track.trim(); // remove spaces just in case

    if (!value?.toLowerCase().startsWith("lpm-")) {
      toast.error("Invalid Tracking ID. Tracking IDs must start with 'LPM-'.");
      return;
    }

    navigation(`/account/track/${inputs?.track}`);
  };

  const closeDropDown = () => {
    setShowDropDown(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeDropDown);
    return () => {
      window.removeEventListener("click", closeDropDown);
    };
  }, []);

  return (
    <>
      {CTX.showModal && (
        <AuthModal
          setShowModal={CTX.setShowModal}
          showModal={CTX.showModal}
          inputs={inputs}
          setInputs={setInputs}
        />
      )}

      <nav className={Classes.nav_cover}>
        <div className={clsx(Classes.top_top, [])}>
          <div className="flex items-center mt-1 relative">
            <div onClick={() => setShowmenu(!showmenu)}>
              {!showmenu ? (
                <HiOutlineMenu
                  color="#000"
                  size={30}
                  className={Classes.menuBar}
                />
              ) : (
                <IoClose color="#000" size={30} className={Classes.menuBar} />
              )}
            </div>
            <Link to={"/"} style={{ marginRight: "17px" }}>
              <img src={lpm} className={clsx([Classes.lpm_img, "mr-4"])} />
            </Link>

            <form
              onSubmit={onSubmitHandler}
              className={clsx([Classes.search_round, "ml-[auto]"])}
            >
              <input
                placeholder="Track your order"
                className={Classes.inputNavStuff}
                required
                value={inputs?.track}
                onChange={(e) =>
                  setInputs({ ...inputs, track: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault(); // Block space
                }}
              />
              <div
                className={clsx([
                  Classes.each_link_stuff,
                  "flex gap-[3px] items-center",
                ])}
                style={{
                  height: "100%",
                  padding: "0px",
                  textDecoration: "none",
                }}
              >
                <button className={Classes.btnSearchNAv}>Track</button>
              </div>
            </form>

            {CTX.token && (
              <div
                className={Classes.smallPhoneNav}
                style={{ fontFamily: "outfit" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropDown(!showDropDown);
                }}
              >
                <div className="flex items-center justify-center h-[27px] w-[27px] rounded-full overflow-hidden bg-[#e7e5ff]">
                  {CTX?.userObj?.image ? (
                    <img
                      src={CTX?.userObj?.image}
                      alt="Profile"
                      className="w-full h-full"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FaRegUser size={17} color="#000" />
                  )}
                </div>
                <span className="ml-[13px]">
                  <svg
                    width="9"
                    height="5"
                    viewBox="0 0 9 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.401158 0.234532C0.639812 -0.00412146 1.02675 -0.00412146 1.2654 0.234532L4.49995 3.46908L7.73449 0.234532C7.97315 -0.00412146 8.36008 -0.00412146 8.59873 0.234532C8.83739 0.473186 8.83739 0.86012 8.59873 1.09877L4.93207 4.76544C4.69341 5.00409 4.30648 5.00409 4.06783 4.76544L0.401158 1.09877C0.162505 0.86012 0.162505 0.473186 0.401158 0.234532Z"
                      fill="#3F405B"
                    ></path>
                  </svg>
                </span>
              </div>
            )}

            {CTX.token && (
              <ul
                className={Classes.showDropDownHere}
                style={{
                  display: showDropDown ? "block" : "none",
                  padding: 0,
                  margin: 0,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <li className="flex items-center bg-[#2e2446] h-[78px] px-[10px]">
                  <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full ">
                    {CTX?.userObj?.image ? (
                      <img
                        src={CTX?.userObj?.image}
                        alt="Profile"
                        className="object-cover w-[42px] h-[42px] rounded-full"
                      />
                    ) : (
                      <FaRegUser size={19} color="#fff" />
                    )}
                  </div>
                  <div className="ml-3 text-[#fff]">
                    <p className="mb-0 text-[15px] gilroy-medium text-white">
                      {/* wouter van */}
                      {CTX?.userObj?.name?.first +
                        " " +
                        CTX?.userObj?.name?.last}
                    </p>
                    <p className="mb-0 text-[13px] gilroy-regular text-[#c1dfef]">
                      {CTX?.userObj?.email}
                    </p>
                  </div>
                </li>

                {CTX.userObj?.type != "user" && (
                  <li className="flex items-center  pl-[20px] py-[10px] my-[7px]">
                    <Link
                      to="/management/portfolio"
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <TbSettingsCheck  color="#3f405b" size={19} />

                      <span className="ml-3">Portfolio</span>
                    </Link>
                  </li>
                )}
                {CTX.userObj?.type != "user" && (
                  <li className="flex items-center  pl-[20px] py-[10px] my-[7px]">
                    <Link
                      to="/management/users"
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <TbUsers  color="#3f405b" size={19} />
                      <span className="ml-3">Users</span>
                    </Link>
                  </li>
                )}
                {CTX.userObj?.type != "user" && (
                  <li className="flex items-center  pl-[20px] py-[10px] my-[7px] relative">
                    <div className="absolute top-[2px] left-[38px] px-[4px] bg-[#d00] text-[#fff] text-[10px] font-bold rounded-full">
                      {CTX?.userObj?.not_user?.stats_cards?.orders?.awaiting_confirmation?.toLocaleString()}
                    </div>
                    <Link
                      to="/management/orders"
                      className="text-[13px] gilroy-medium  flex items-center"
                      style={{ color: "#3f405b" }}
                    >
                      <IoReorderFour  color="#3f405b" size={19} />
                      <span className="ml-3">Orders</span>
                    </Link>
                  </li>
                )}
                <li className="flex items-center  pl-[20px] py-[10px] my-[7px]">
                  <Link
                    to="/account/portfolio"
                    className="text-[13px] gilroy-medium  flex items-center"
                    style={{ color: "#3f405b" }}
                  >
                    <LuLayoutDashboard color="#3f405b" size={19} />

                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li className="flex items-center pl-[20px] py-[10px] my-[7px]">
                  <Link
                    to="/account/profile"
                    className="text-[13px] gilroy-medium flex items-center"
                    style={{ color: "#3f405b" }}
                  >
                    <svg
                      width="15"
                      height="17"
                      viewBox="0 0 15 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 1.7C5.88918 1.7 4.58336 3.03195 4.58336 4.675C4.58336 6.31805 5.88918 7.65 7.5 7.65C9.11082 7.65 10.4166 6.31805 10.4166 4.675C10.4166 3.03195 9.11082 1.7 7.5 1.7ZM2.91671 4.675C2.91671 2.09307 4.96872 0 7.5 0C10.0313 0 12.0833 2.09307 12.0833 4.675C12.0833 7.25693 10.0313 9.35 7.5 9.35C4.96872 9.35 2.91671 7.25693 2.91671 4.675ZM5.27191 10.625C5.31946 10.625 5.36771 10.625 5.41669 10.625H9.58331C9.63229 10.625 9.68054 10.625 9.72809 10.625C10.7508 10.6246 11.4491 10.6243 12.0428 10.808C13.3745 11.22 14.4166 12.283 14.8205 13.6413C15.0006 14.2468 15.0003 14.9591 15 16.0023C14.9999 16.0508 14.9999 16.1 14.9999 16.15C14.9999 16.6194 14.6268 17 14.1666 17C13.7064 17 13.3333 16.6194 13.3333 16.15C13.3333 14.9019 13.3242 14.4663 13.2256 14.1348C12.9833 13.3198 12.358 12.682 11.559 12.4348C11.234 12.3342 10.8069 12.325 9.58331 12.325H5.41669C4.1931 12.325 3.76604 12.3342 3.44099 12.4348C2.642 12.682 2.01674 13.3198 1.77437 14.1348C1.67577 14.4663 1.66672 14.9019 1.66672 16.15C1.66672 16.6194 1.29363 17 0.833395 17C0.373162 17 6.93952e-05 16.6194 6.93952e-05 16.15C6.93952e-05 16.1 5.1514e-05 16.0508 3.39308e-05 16.0023C-0.000344456 14.9591 -0.000602846 14.2468 0.179484 13.6413C0.583439 12.283 1.62553 11.22 2.95719 10.808C3.55085 10.6243 4.24919 10.6246 5.27191 10.625Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="ml-3">View Profile</span>
                  </Link>
                </li>

                <li className="flex items-center  pl-[20px] py-[10px] my-[7px]">
                  <Link
                    to="/profile/settings"
                    style={{ color: "#3f405b" }}
                    className="text-[13px] gilroy-medium  flex items-center"
                  >
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.03788 0H1.82273V6.25H3.03788V0ZM10.4503 6.25H6.56183L6.07577 5.5625V4.3125L6.56183 3.75H10.4503L10.9364 4.375V5.625L10.4503 6.25ZM4.37455 10H0.486061L0 9.375V8.125L0.486061 7.5H4.37455L4.86061 8.125V9.375L4.37455 10ZM9.11365 0H7.8985V2.5H9.11365V0ZM7.8985 7.5H9.11365V15H7.8985V7.5ZM3.03788 11.25H1.82273V15H3.03788V11.25ZM12.6376 11.25H16.5139L17 10.625V9.4375L16.5139 8.8125H12.6376L12.1515 9.4375V10.625L12.6376 11.25ZM15.1894 0H13.9743V7.5H15.1894V0ZM13.9743 12.5H15.1894V15H13.9743V12.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="ml-3">Settings</span>
                  </Link>
                </li>
                <li
                  className="flex items-center border-top  pl-[20px] py-[10px] my-[7px]"
                  onClick={() => {
                    closeDropDown();
                    CTX.logout();
                  }}
                >
                  <a
                    href="#"
                    className="text-[13px] gilroy-medium  flex items-center text-[#3f405b]"
                    style={{ color: "#3f405b" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.03109 3.01904e-07L4.9 6.3569e-07C5.2866 6.3569e-07 5.6 0.313401 5.6 0.700001C5.6 1.0866 5.2866 1.4 4.9 1.4H4.06C3.4604 1.4 3.05279 1.40054 2.73773 1.42629C2.43084 1.45136 2.27389 1.49681 2.16441 1.55259C1.90099 1.68681 1.68681 1.90099 1.55259 2.16441C1.49681 2.27389 1.45136 2.43084 1.42629 2.73773C1.40054 3.05279 1.4 3.46039 1.4 4.06V9.94C1.4 10.5396 1.40054 10.9472 1.42629 11.2623C1.45136 11.5692 1.49681 11.7261 1.55259 11.8356C1.68681 12.099 1.90099 12.3132 2.16441 12.4474C2.27389 12.5032 2.43084 12.5486 2.73773 12.5737C3.05279 12.5995 3.46039 12.6 4.06 12.6H4.9C5.2866 12.6 5.6 12.9134 5.6 13.3C5.6 13.6866 5.2866 14 4.9 14H4.03107C3.4676 14 3.00256 14 2.62372 13.9691C2.23025 13.9369 1.86856 13.8679 1.52883 13.6948C1.00197 13.4264 0.573628 12.998 0.305183 12.4712C0.132079 12.1314 0.0630838 11.7697 0.0309362 11.3763C-1.59696e-05 10.9974 -8.62687e-06 10.5324 3.01904e-07 9.96891V4.03109C-8.62687e-06 3.46761 -1.59696e-05 3.00256 0.0309363 2.62372C0.063084 2.23025 0.132079 1.86856 0.305183 1.52883C0.573629 1.00197 1.00197 0.573628 1.52883 0.305182C1.86856 0.132079 2.23025 0.0630838 2.62372 0.0309362C3.00256 -1.59696e-05 3.46761 -8.62687e-06 4.03109 3.01904e-07ZM9.30503 3.00503C9.57839 2.73166 10.0216 2.73166 10.295 3.00503L13.795 6.50503C14.0683 6.77839 14.0683 7.22161 13.795 7.49497L10.295 10.995C10.0216 11.2683 9.57839 11.2683 9.30503 10.995C9.03166 10.7216 9.03166 10.2784 9.30503 10.005L11.61 7.7H4.9C4.5134 7.7 4.2 7.3866 4.2 7C4.2 6.6134 4.5134 6.3 4.9 6.3H11.61L9.30503 3.99497C9.03166 3.72161 9.03166 3.27839 9.30503 3.00503Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="ml-3">Logout</span>
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className="flex items-center gap-[10px] mt-1">
            <div
              className={clsx([
                Classes.menuli,
                "flex items-center gap-[10px] mt-1",
              ])}
            >
              <Link
                to="/"
                className={clsx([
                  Classes.each_link_stuff,
                  "flex gap-[3px] items-center",
                ])}
              >
                <span>HOME</span>
              </Link>
              <div
                className={clsx([
                  Classes.productLink,
                  "flex gap-[3px] items-center",
                ])}
              >
                <span style={{ textDecoration: "underline" }}>PRODUCTS</span>
                <div className={Classes.product_smth}>
                  <div className={Classes.inner_product_smth}>
                    <Link to="/user/products/poster">Posters</Link>
                    <Link to="/user/products/letter-head">Letter Head</Link>
                    <Link to={"/user/products/envelopes"}>Envelope</Link>
                    <Link to={"/user/products/flyer"}>Flyers</Link>
                    <Link to={"/user/products/brochures"}>Brochures</Link>
                    <Link to={"/user/products/greeting-card"}>Greeting Cards</Link>
                    <Link to={"/user/products/receipts-invoices"}>
                      Receipts/Invoices
                    </Link>
                    <Link to="/user/products/exercise-book">
                      Exercise Books
                    </Link>
                    <Link to={"/user/products/book"}>Books</Link>
                    <Link to={"/user/products/magazine"}>Magazine</Link>
                    <Link to={"/user/products/plastic-id-card"}>
                      Plastic ID Cards
                    </Link>
                    <Link to={"/user/products/screen-printing"}>Mailer Bags</Link>
                    <Link to={"/user/products/banners-signs"} >Banners/Signs</Link>
                    <Link to={"/user/products/custom-tshirt"}>Custom T-Shirt</Link>
                    <Link to={"/user/products/car-branding"}>Car Wrap</Link>
                    <Link to={"/user/products/pen"}>Pen</Link>
                    <Link to={"/user/products/frame"}>Frames</Link>
                    <Link to={"/user/products/invitation/card"}>Invitation Cards</Link>
                    <div>Dummy Cheques</div>
                    <Link to={"/user/products/graphics-design"}>
                      Graphics Design
                    </Link>
                    <Link to={"/user/products/calendar"}>
                      Tailored Calendar
                    </Link>
                    <Link to={"/user/products/screen-printing"}>
                      Screen Printing
                    </Link>
                    <Link to={"/user/products/throw/pillows"}>Throw Pillows</Link>
                    <div>Banner Stand</div>
                    <div>Awards / Plaque</div>
                    <Link to={"/user/products/wedding-card"}>
                      Wedding Cards
                    </Link>
                    <Link to={"/user/products/business-card"}>
                      Business Cards
                    </Link>
                    <Link to={"/user/products/jotters-notepads"}>
                      Jotters - Hard / Soft Covers
                    </Link>
                    <Link to={"/user/products/custom-mug"}>Custom Mugs</Link>
                    <Link to={"/large/format/printing"}>
                      Large Format Printing
                    </Link>
                    <div>Carrier Bag a3/a4/a5</div>
                    <div>Branded Building</div>
                    <Link to={"/user/products/sticker"}>
                      Stickers/Product Labels
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                to={"/account/contact-us"}
                className={clsx([
                  Classes.each_link_stuff,
                  "flex gap-[3px] items-center",
                ])}
              >
                <span>CONTACT US</span>
              </Link>

              {CTX.token ? (
                <div
                  className="flex items-center ml-[auto]"
                  style={{ fontFamily: "outfit" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropDown(!showDropDown);
                  }}
                >
                  <div className="flex items-center justify-center h-[27px] w-[27px] rounded-full overflow-hidden bg-[#e7e5ff]">
                    {CTX?.userObj?.image ? (
                      <img
                        src={CTX?.userObj?.image}
                        alt="Profile"
                        className="w-full h-full"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <FaRegUser size={17} color="#000" />
                    )}
                  </div>
                  <div className="ml-[12px] flex items-center">
                    <p className="mb-0 text-[14px] text-[#3f405b]">
                      {CTX?.userObj?.name?.first +
                        " " +
                        CTX?.userObj?.name?.last}
                    </p>
                    <span className="ml-[13px]">
                      <svg
                        width="9"
                        height="5"
                        viewBox="0 0 9 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.401158 0.234532C0.639812 -0.00412146 1.02675 -0.00412146 1.2654 0.234532L4.49995 3.46908L7.73449 0.234532C7.97315 -0.00412146 8.36008 -0.00412146 8.59873 0.234532C8.83739 0.473186 8.83739 0.86012 8.59873 1.09877L4.93207 4.76544C4.69341 5.00409 4.30648 5.00409 4.06783 4.76544L0.401158 1.09877C0.162505 0.86012 0.162505 0.473186 0.401158 0.234532Z"
                          fill="#3F405B"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center ml-[auto]">
                  <div
                    className={Classes.action_each_link_stuff}
                    style={{ textDecoration: "underline" }}
                    onClick={() => CTX.setShowModal("login")}
                  >
                    SIGN IN
                  </div>
                  |
                  <div
                    className={Classes.action_each_link_stuff}
                    style={{ textDecoration: "underline" }}
                    onClick={() => CTX.setShowModal("register")}
                  >
                    REGISTER
                  </div>
                </div>
              )}
            </div>
            {/* <div className="flex items-center justify-center min-w-[40px] w-[40px] min-h-[40px] h-[40px] bg-[#f3f5f6] rounded-[400px] hover:bg-[#d5d9db]">
          <BsCart3 color="#000" size={27} />
        </div> */}
          </div>
        </div>

        <div
          className={Classes.heightMenuCover}
          style={{ height: showmenu ? "max-content" : "0px" }}
        >
          <form onSubmit={onSubmitHandler} className={Classes.search_round}>
            <input
              placeholder="Track your order"
              className={Classes.inputNavStuff}
              required
              value={inputs?.track}
              onChange={(e) => setInputs({ ...inputs, track: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault(); // Block space
              }}
            />

            <div
              className={clsx([
                Classes.each_link_stuff,
                "flex gap-[3px] items-center",
              ])}
              style={{ height: "100%", padding: "0px", textDecoration: "none" }}
            >
              <button className={Classes.btnSearchNAv}>Track</button>
            </div>
          </form>

          <Link
            to={"/"}
            className={clsx([
              Classes.each_link_stuff,
              "flex gap-[3px] items-center",
            ])}
            style={{ marginTop: "10px" }}
          >
            {/* <BiHomeCircle size={21} /> */}
            <span>HOME</span>
          </Link>
          <div
            className={clsx([
              Classes.each_link_stuff,
              "flex gap-[3px] items-center",
            ])}
            onClick={() => setShowProduct(!showProduct)}
          >
            <span>PRODUCTS</span>

            <MdOutlineKeyboardArrowDown
              style={{
                marginLeft: "auto",
                transform: showProduct ? "rotate(180deg)" : "rotate(0deg)",
              }}
              size={22}
            />
          </div>

          {showProduct && <SmallScreenLinks />}

          <Link
            to={"/account/contact-us"}
            className={clsx([
              Classes.each_link_stuff,
              "flex gap-[3px] items-center",
            ])}
          >
            <span>CONTACT US</span>
          </Link>
          {!CTX?.token && (
            <div
              className={clsx([
                Classes.each_link_stuff,
                "flex gap-[3px] items-center",
              ])}
              onClick={() => CTX.setShowModal("login")}
            >
              <span>SIGN IN</span>
            </div>
          )}

          {!CTX.token && (
            <div
              className={clsx([
                Classes.each_link_stuff,
                "flex gap-[3px] items-center",
              ])}
              onClick={() => CTX.setShowModal("register")}
            >
              <span>REGISTER</span>
            </div>
          )}

          <div className="text-center text-[#515151] mt-1 font-[open sans] text-[11px]">
            Follow, Like, and Share{" "}
          </div>
          <div className="flex items-center justify-center mb-6 gap-[20px]">
            <div className={Classes.linkCover}>
              <FaFacebookF color="#212121" size={22} />
            </div>

            <div className={Classes.linkCover}>
              <FaInstagram color="#212121" size={24} />
            </div>

            <div className={Classes.linkCover}>
              <FaTiktok color="#212121" size={21} />
            </div>
            <div className={Classes.linkCover}>
              <FaWhatsapp color="#212121" size={24} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
