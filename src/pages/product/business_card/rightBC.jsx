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
import Buisiness_Card from "../../../assets/buisiness_card.jpeg";
import Buisiness_Car from "../../../assets/buisiness_car.jpeg";
import Buisiness_Ca from "../../../assets/buisiness_ca.jpeg";
import Buisiness_C from "../../../assets/buisiness_c.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightBC = () => {
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
            images={[Buisiness_Card, Buisiness_Car, Buisiness_Ca, Buisiness_C]}
            settime={3000}
          />
        </div>

        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Business Cards
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightBC;
