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
import BrandCar from "../../../assets/brand_car.webp";
import BrandCa from "../../../assets/brand_ca.webp";
import Brand from "../../../assets/brand_.webp";
import BrandC from "../../../assets/brand_c.webp";
import Car_wrap from "../../../assets/car_wrap.jpeg";
import Car_wra from "../../../assets/car_wra.jpeg";
import Car_wr from "../../../assets/car_wr.jpeg";
import Select from "../../../components/select/select";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightCarBranding = () => {
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
              BrandCar,
              Car_wrap,
              BrandCa,
              Car_wra,
              Brand,
              BrandC,
              Car_wr,
            ]}
            settime={3000}
          />
        </div>
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Vehicle Wraps/Car Branding
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightCarBranding;
