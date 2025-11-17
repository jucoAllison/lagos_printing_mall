import React, { useEffect, useState } from "react";
import Classes from "./heroslide.module.css";
import Roaming from "../../assets/roaming.jpg";
import Broadband from "../../assets/broadband.jpeg";
import Code from "../../assets/code-of-ethics.jpg";
import Data_Plans from "../../assets/data_Plans.jpg";
import Personal from "../../assets/personal.jpg";
import Pulse from "../../assets/pulse.jpg";
import Tariff from "../../assets/tariff.jpg";
import Getimage from "../../assets/getimage.webp";
import { HiChevronRight } from "react-icons/hi";
import clsx from "clsx";

const Heroslide = () => {
  const [count, setCount] = useState(sessionStorage.getItem("counter") || 0);
  // const [count, setCount] = useState(0);
  const slides = [
    {
      top: "The Send of the Season",
      body: "Save up to 40% on Holiday Cards & Invitation",
      button: "Learn More",
      href: "https://www.mtnonline.com/broadband",
      img: Getimage,
    },
    {
      top: "Broadband",
      body: "Broadband Services",
      button: "Learn More",
      href: "https://www.mtnonline.com/broadband",
      img: Broadband,
    },
    {
      top: "Data Plans",
      body: "Choosing a Mobile data plan has never been this simple",
      button: "Learn More",
      href: "https://www.mtnonline.com/personal/data/data-plans",
      img: Data_Plans,
    },
    {
      top: "Code of Ethics",
      body: "Report Fraud",
      button: "Get Started",
      href: "https://www.mtn.ng/about-us/who-we-are/our-code-of-ethics/",
      img: Code,
    },
    {
      top: "Personal",
      body: "4G LTE",
      button: "Learn More",
      href: "https://www.mtnonline.com/personal/4g/",
      img: Personal,
    },
    {
      top: "Pulse",
      body: "#DoYou",
      button: "Learn More",
      href: "https://www.mtnonline.com/personal/pulse/",
      img: Pulse,
    },
    {
      top: "Tariff Plan",
      body: "XtraValue bundle covers voice calls and data",
      button: "Learn More",
      href: "https://www.mtnonline.com/personal/xtravalue/",
      img: Tariff,
    },
    {
      top: "Roaming",
      body: "Stay connected to home while abroad",
      button: "Learn More",
      href: "https://www.mtnonline.com/personal/roaming/",
      img: Roaming,
    },
  ];

  useEffect(() => {
    if (count >= slides.length - 1) {
      setTimeout(() => {
        sessionStorage.setItem("counter", 0);
        return setCount(0);
      }, 21000);
    } else {
      setTimeout(() => {
        const newCount = +count + 1;
        setCount(newCount);
        sessionStorage.setItem("counter", newCount);
      }, 21000);
      return;
    }
    // return () => {
    //     cleanup
    // }
  }, [count]);

  return (
    <div
      className={Classes.slideShowCover}
      style={{
        background: `url(${slides[count].img}) no-repeat center center`,
      }}
    >
      <div className={Classes.contentCover}>
        <div className={Classes.yellowHere}>The Send of the Season</div>

        <h3 className={Classes.cardHeader}>
          Save up to 40% on Holiday Cards & Invitation
        </h3>
        <h3 className={Classes.lastHere}>
          Stand out with premium cards at exceptional value
        </h3>
        {/* <a href={slides[count].href} target="_blank"> */}
        <a href={"#"} target="_blank">
          <button
            type="button"
            className={clsx([Classes.shopNowBTN,"rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent ml-auto"])}
            style={{
              fontFamily: "Outfit",
              color: "#000",
              backgroundColor: "#812b5a",
              borderRadius: "12px"
            }}
          >
            Shop Now <HiChevronRight />{" "}
          </button>
        </a>
      </div>
    </div>
  );
};

export default Heroslide;
