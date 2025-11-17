import React from "react";
import Classes from "./footer.module.css";
import lpm from "../../assets/LPM_2.png";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={Classes.bgFooterCover}>
      <div className={Classes.products_cover} style={{paddingLeft: "0px", paddingRight: "0px"}}>
        <div className={Classes.flex_stuff}>
          <Link to={"/"}>
          <img src={lpm} className={Classes.lpm_img} />
          </Link>

          <div className="mt-4">
            <div className="font-bold text-[17px] text-[#fff]">Resources</div>
            <div className="text-[14px] font-[300] text-[#fff] mt-1">
              Terms & Condition
            </div>
            <div className="text-[14px] font-[300] text-[#fff] mt-1">
              Refund Policy
            </div>
            <div className="text-[14px] font-[300] text-[#fff] mt-1">
              Contact
            </div>
          </div>
        </div>

        <div
          className="flex-col sm:flex-row flex sm:items-start flex-col-reverse items-center justify-between mt-6 pt-6"
          style={{
            borderTop: "1px solid #fff",
          }}
        >


          <p className="text-[#fff]">
            © {new Date().getFullYear()} Lagos Printing Mall. All rights
            reserved.
          </p>

          <div className="flex items-center justify-center mb-6 gap-[20px]">
            <div className={Classes.linkCover}>
              <FaFacebookF color="#fff" size={22} />
            </div>

            <div className={Classes.linkCover}>
              <FaInstagram color="#fff" size={24} />
            </div>

            <div className={Classes.linkCover}>
              <FaTiktok color="#fff" size={21} />
            </div>
            <div className={Classes.linkCover}>
              <FaWhatsapp color="#fff" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
