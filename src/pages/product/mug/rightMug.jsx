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
import Select from "../../../components/select/select";

import Custommug from "../../../assets/custom_mug.jpg";
import Custommu from "../../../assets/custom_mu.jpg";
import Customm from "../../../assets/custom_m.jpg";
import Custom_ from "../../../assets/custom_.jpg";
import WP_MUG from "../../../assets/wp_mug.jpeg";
import WP_MU from "../../../assets/wp_mu.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightMug = () => {

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
            images={[ Custommu, WP_MUG, Customm, Custom_,  WP_MU]}
            settime={3000}
          />
        </div>
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Cups/Mugs
        </div>
      </>
      
      <RightComponent />
        </div>
  );
};

export default RightMug;
