import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import CustomTShirt from "../../../assets/custom-T-Shirt.gif";
import Classes from "../product.module.css";
import Flyer from "../../../assets/flyer.jpeg";
import FlyerPNG from "../../../assets/flyer.png";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { MainContext } from "../../../App";
import GifImage from "../../../components/gif_image/gifImage";
import Screen_Printing from "../../../assets/screen_printing.jpeg";
import Screen_Printin from "../../../assets/screen_printin.jpeg";
import Screen_Printi from "../../../assets/screen_printi.jpeg";
import Screen_Print from "../../../assets/screen_print.jpeg";
import Screen_Prin from "../../../assets/screen_prin.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightNylon = () => {

  return (
    <div
      className="w-full"
      style={{
        height: "max-content",
      }}
    >
      <>
        {/* <img
            src={CustomTShirt}
            className={clsx([Classes.image_grid, "w-full  object-cover"])}
          /> */}

        <div style={{ height: "340px" }}>
          <GifImage
            images={[
              Screen_Printing,
              Screen_Printin,
              Screen_Printi,
              Screen_Print,
              Screen_Prin,
            ]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Screen Printing
        </div>
      </>
      
      <RightComponent />
    </div>
  );
};

export default RightNylon;
