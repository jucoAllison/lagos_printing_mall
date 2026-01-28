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
import Screen_Printing from "../../../assets/graphics.jpeg";
import Screen_Printin from "../../../assets/graphic.jpeg";
import Screen_Printi from "../../../assets/graphi.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightGraphicsDesign = () => {
  const CTX = useContext(MainContext);

  return (
    <div
      className="w-full"
      style={{
        height: "max-content",
      }}
    >
      <>

        <div style={{ height: "340px" }}>
          <GifImage
            images={[
              Screen_Printing,
              Screen_Printin,
              Screen_Printi,
            ]}
            settime={3000}
          />
        </div>

        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Graphics Design
        </div>
      </>
     
      <RightComponent />
    </div>
  );
};

export default RightGraphicsDesign;
