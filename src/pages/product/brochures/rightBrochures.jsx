import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import GifImage from "../../../components/gif_image/gifImage";
import Buisiness_Card from "../../../assets/brochure.jpeg";
import Buisiness_Car from "../../../assets/brochur.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightBrochures = () => {
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
            images={[Buisiness_Card, Buisiness_Car, ]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Brochures
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightBrochures;
