import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import Flyer from "../../../assets/letter_head.jpeg";
import FlyerPNG from "../../../assets/letter_hea.jpeg";
import GifImage from "../../../components/gif_image/gifImage";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightLetterHead  = () => {

  return (
    <div
      className="w-full"
      style={{
        height: "max-content",
      }}
    >
      <>
        <div style={{ height: "340px" }}>
          <GifImage settime={3200} images={[Flyer, FlyerPNG]} />
        </div>

        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Letter Head
        </div>
      </>
      
      <RightComponent />
    </div>
  );
};

export default RightLetterHead