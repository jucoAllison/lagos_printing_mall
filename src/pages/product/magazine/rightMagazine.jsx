import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import GifImage from "../../../components/gif_image/gifImage";
import Calendar from "../../../assets/magazine.jpeg";
import Calenda from "../../../assets/magazin.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightMagazine = () => {
  

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
            images={[Calendar, Calenda]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Magazine
        </div>
      </>
     
     <RightComponent />
    </div>
  );
};

export default RightMagazine