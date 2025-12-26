import React from "react";
import Logo from "../../assets/LPM.png";
import { RiErrorWarningFill } from "react-icons/ri";
import { useContext } from "react";
import { MainContext } from "../../App";
import Classes from "../dashboard/dash.module.css";

const About = () => {
  const CTX = useContext(MainContext);

  return (
    <div className={Classes.coverhereim} style={{ marginTop: "60px" }}>
      <div className="w-[100%] h-[80vh] flex flex-col items-center justify-center relative">
        <img src={Logo} alt="logo" className="w-[182px]" />
        {/* <div>PROXACE</div> */}
        <div className="mt-[20px] text-[14px] text-[#999] pt-[10px]">
          Version 4.2.2
        </div>
        <a
          href={`#`}
          target="_blank"
          className="font-[500] mt-[20px] bg-[#33333333] py-[5px] px-[15px] rounded-[19px] text-[14px] flex items-center"
          style={{ textDecoration: "none" }}
        >
          <span className="text-[#333] font-[500]">
            Why Choose Lagos Printing Mall
          </span>{" "}
          <RiErrorWarningFill size={14} color="#444" className="ml-1" />{" "}
        </a>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            width: "500px",
            maxWidth: "100%",
          }}
        >
          Our goal is simple: premium print quality at unbeatable prices with a
          process that feels effortless. From start to finish, you’ll work with
          a dedicated expert who’s ready to assist, advise, and ensure your
          project exceeds expectations.
        </div>

        <p className="text-center text-[12px] mt-[90px] absolute bottom-[80px]">
          &trade; and &copy; {new Date().getFullYear()} LAGOS PRINTING MALL{" "}
          <br /> All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default About;
