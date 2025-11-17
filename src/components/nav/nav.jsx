import React, { useState } from "react";
import Classes from "./nav.module.css";
import clsx from "clsx";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiMessage3Line } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { BiHomeCircle } from "react-icons/bi";
import lpm from "../../assets/LPM.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Nav = () => {
  const [showmenu, setShowmenu] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  return (
    <nav className={Classes.nav_cover}>
      <div className={clsx(Classes.top_top, [])}>
        <div className="flex items-center px-[10px] mt-1">
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

          <div className={clsx([Classes.search_round, "ml-[auto]"])}>
            <input
              placeholder="Track your order"
              className={Classes.inputNavStuff}
            />
            <Link
              to={`/account/track/${Math.random().toString().split(".")[1]}`}
              className={clsx([
                Classes.each_link_stuff,
                "flex gap-[3px] items-center",
              ])}
              style={{ height: "100%", padding: "0px", textDecoration: "none" }}
            >
              <button className={Classes.btnSearchNAv}>Track</button>
            </Link>
          </div>
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
                  <div>Greeting Cards</div>
                  <Link to={"/user/products/receipts-invoices"}>
                    Receipts/Invoices
                  </Link>
                  <Link to="/user/products/exercise-book">Exercise Books</Link>
                  <Link to={"/user/products/book"}>Books</Link>
                  <Link to={"/user/products/magazine"}>Magazine</Link>
                  <Link to={"/user/products/plastic-id-card"}>
                    Plastic ID Cards
                  </Link>
                  <div>Mailer Bags</div>
                  <div>Banners/Signs</div>
                  <div>Custom T-Shirt</div>
                  <div>Car Wrap</div>
                  <div>Pen</div>
                  <div>Frames</div>
                  <div>Invitation Cards</div>
                  <div>Dummy Cheques</div>
                  <div>Graphics Design</div>
                  <Link to={"/user/products/calendar"}>Tailored Calendar</Link>
                  <div>Screen Printing</div>
                  <div>Throw Pillows</div>
                  <div>Banner Stand</div>
                  <div>Awards / Plaque</div>
                  <Link to={"/user/products/wedding-card"}>Wedding Cards</Link>
                  <Link to="/user/products/business-card">Business Cards</Link>
                  <div>Custom Hoody</div>
                  <Link to={"/user/products/jotters-notepads"}>
                    Jotters - Hard / Soft Covers
                  </Link>
                  <div>Custom Mugs</div>
                  <div>Large Format Printing</div>
                  <div>Carrier Bag a3/a4/a5</div>
                  <div>Branded Building</div>
                  <div>Stickers/Product Labels</div>
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

            <div className="flex items-center ml-[auto]">
              <div
                className={Classes.action_each_link_stuff}
                style={{ textDecoration: "underline" }}
              >
                SIGN IN
              </div>
              |
              <div
                className={Classes.action_each_link_stuff}
                style={{ textDecoration: "underline" }}
              >
                REGISTER
              </div>
            </div>
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
        <div className={Classes.search_round}>
          <input
            placeholder="Track your order"
            className={Classes.inputNavStuff}
          />

          <Link
            to={`/account/track/${Math.random().toString().split(".")[1]}`}
            className={clsx([
              Classes.each_link_stuff,
              "flex gap-[3px] items-center",
            ])}
            style={{ height: "100%", padding: "0px", textDecoration: "none" }}
          >
            <button className={Classes.btnSearchNAv}>Track</button>
          </Link>
        </div>

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

        {showProduct && (
          <div
            className={Classes.inner_product_smth}
            style={{
              gridTemplateColumns: "1fr 1fr",
              paddingTop: "8px",
              paddingBottom: "8px",
            }}
          >
            <Link to="/user/products/poster" style={{ color: "#444" }}>
              Posters
            </Link>
            <Link
              to="/user/products/letter-head"
              style={{ color: "#444", textAlign: "right" }}
            >
              Letter Head
            </Link>
            <Link to={"/user/products/envelopes"} style={{ color: "#444" }}>
              Envelope
            </Link>
            <Link
              to={"/user/products/flyer"}
              style={{ color: "#444", textAlign: "right" }}
            >
              Flyers
            </Link>
            <Link to={"/user/products/brochures"} style={{ color: "#444" }}>
              Brochures
            </Link>
            <div style={{ color: "#444", textAlign: "right" }}>
              Greeting Cards
            </div>
            <Link
              to={"/user/products/receipts-invoices"}
              style={{ color: "#444" }}
            >
              Receipts/Invoices
            </Link>
            <Link
              to="/user/products/exercise-book"
              style={{ color: "#444", textAlign: "right" }}
            >
              Exercise Books
            </Link>
            <Link to={"/user/products/book"} style={{ color: "#444" }}>
              Books
            </Link>
            <Link
              to={"/user/products/magazine"}
              style={{ color: "#444", textAlign: "right" }}
            >
              Magazine
            </Link>
            <Link
              to={"/user/products/plastic-id-card"}
              style={{ color: "#444" }}
            >
              Plastic ID Cards
            </Link>
            <div style={{ color: "#444", textAlign: "right" }}>Mailer Bags</div>
            <div style={{ color: "#444" }}>Banners/Signs</div>
            <div style={{ color: "#444", textAlign: "right" }}>
              Custom T-Shirt
            </div>
            <div style={{ color: "#444" }}>Car Wrap</div>
            <div style={{ color: "#444", textAlign: "right" }}>Pen</div>
            <div style={{ color: "#444" }}>Frames</div>
            <div style={{ color: "#444", textAlign: "right" }}>
              Invitation Cards
            </div>
            <div style={{ color: "#444" }}>Dummy Cheques</div>
            <div style={{ color: "#444", textAlign: "right" }}>
              Graphics Design
            </div>
            <Link to={"/user/products/calendar"} style={{ color: "#444" }}>
              Tailored Calendar
            </Link>
            <div style={{ color: "#444", textAlign: "right" }}>
              Screen Printing
            </div>
            <div style={{ color: "#444" }}>Throw Pillows</div>
            <div style={{ color: "#444", textAlign: "right" }}>
              Banner Stand
            </div>
            <div style={{ color: "#444" }}>Awards / Plaque</div>
            <Link
              to={"/user/products/wedding-card"}
              style={{ color: "#444", textAlign: "right" }}
            >
              Wedding Cards
            </Link>
            <Link to="/user/products/business-card" style={{ color: "#444" }}>
              Business Cards
            </Link>
            <div style={{ color: "#444", textAlign: "right" }}>
              Custom Hoody
            </div>
            <Link
              to={"/user/products/jotters-notepads"}
              style={{ color: "#444" }}
            >
              Jotters - Hard / Soft Covers
            </Link>
            <div style={{ color: "#444", textAlign: "right" }}>Custom Mugs</div>
            <div style={{ color: "#444" }}>Large Format Printing</div>
            <div style={{ color: "#444", textAlign: "right" }}>
              Carrier Bag a3/a4/a5
            </div>
            <div style={{ color: "#444" }}>Branded Building</div>
            <div style={{ color: "#444", textAlign: "right" }}>Stickers</div>
          </div>
        )}

        <Link
          to={"/account/contact-us"}
          className={clsx([
            Classes.each_link_stuff,
            "flex gap-[3px] items-center",
          ])}
        >
          <span>CONTACT US</span>
        </Link>
        <div
          className={clsx([
            Classes.each_link_stuff,
            "flex gap-[3px] items-center",
          ])}
        >
          <span>SIGN IN</span>
        </div>

        <div
          className={clsx([
            Classes.each_link_stuff,
            "flex gap-[3px] items-center",
          ])}
        >
          <span>REGISTER</span>
        </div>

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
  );
};

export default Nav;
