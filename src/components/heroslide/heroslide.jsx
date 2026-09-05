import React, { useEffect, useState } from "react";
import Classes from "./heroslide.module.css";
import Roaming from "../../assets/roaming.jpg";
import Broadband from "../../assets/broadband.jpeg";
import Code from "../../assets/code-of-ethics.jpg";
import Data_Plans from "../../assets/data_Plans.jpg";
import Personal from "../../assets/personal.jpg";
import Pulse from "../../assets/pulse.jpg";
import Tariff from "../../assets/tariff.jpg";
import HEROKCH from "../../assets/HEROKCH.jpeg";
import Getimage from "../../assets/getimage.webp";
import { HiChevronRight } from "react-icons/hi";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const Heroslide = ({ scrollToSection }) => {
  const [count, setCount] = useState(localStorage.getItem("counter") || 0);
  const navigation = useNavigate();
  // const [count, setCount] = useState(0);
  const slides = [
    {
      top: "The Mark of Quality",
      body: "Save up to 30% on Large Format & Custom Packaging",
      last: "Elevate your brand with precision printing at unbeatable prices",
      button: "Order Now",
      href: "https://www.mtnonline.com/broadband",
      // img: Getimage,
      img: HEROKCH,
    },
    {
      top: "Stand Out from the Crowd",
      body: "Special Offers on Large Format Banners & Signage",
      last: "High-impact printing solutions designed to get your business",
      button: "Shop the Sale",
      href: "https://www.mtnonline.com/broadband",
      // img: Getimage,
      img: HEROKCH,
    },
    {
      top: "Elevate Your Brand with Quality Prints",
      body: "Special Offers on Large Format Banners & Custom Packaging",
      last: "From  concept to print - vibrant colors, durable finishes, flawless results.",
      button: "Print with Us",
      href: "https://www.mtnonline.com/broadband",
      // img: Getimage,
      img: HEROKCH,
    },
    {
      top: "Bold Prints. Bigger Impacts.",
      body: "Limited-Time Discount on Business Printing",
      last: "Eye-catching banners, branded bags, event backdrops, and corporate materials.",
      button: "Request a Quote",
      href: "https://www.mtnonline.com/broadband",
      // img: Getimage,
      img: HEROKCH,
    },
  ];

  useEffect(() => {
    if (count >= slides.length - 1) {
      setTimeout(() => {
        localStorage.setItem("counter", 0);
        return setCount(0);
      }, 21000);
    } else {
      setTimeout(() => {
        const newCount = +count + 1;
        setCount(newCount);
        localStorage.setItem("counter", newCount);
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
        <div className={Classes.yellowHere}>{slides[count].top}</div>

        <h3 className={Classes.cardHeader}>{slides[count].body}</h3>
        <h3 className={Classes.lastHere}>{slides[count].last}</h3>
        {/* <a href={slides[count].href} target="_blank"> */}
        <a href={"#"}>
          <button
            onClick={() => {
              if (slides[count].button?.toLowerCase()?.includes("quote")) {
                navigation("/account/contact-us");
              } else {
                scrollToSection();
              }
            }}
            type="button"
            className={clsx([
              Classes.shopNowBTN,
              "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent ml-auto",
            ])}
            style={{
              fontFamily: "Outfit",
              color: "#000",
              backgroundColor: "#812b5a",
              borderRadius: "12px",
            }}
          >
            {slides[count].button} <HiChevronRight />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Heroslide;
