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
import Jotters from "../../../assets/jotters.jpeg";
import Jotter from "../../../assets/jotter.jpeg";
import Jotte from "../../../assets/jotte.jpeg";
import Jott from "../../../assets/jott.jpeg";
import Jot from "../../../assets/jot.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightJotters = () => {
 
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
            images={[Jotters, Jotter, Jotte, Jott, Jot]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Jotters/Notepads
        </div>
      </>
     <RightComponent />
    </div>
  );
};

export default RightJotters;
