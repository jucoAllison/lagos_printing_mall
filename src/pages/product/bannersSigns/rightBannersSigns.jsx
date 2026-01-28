import React from "react";
import GifImage from "../../../components/gif_image/gifImage";
import Calendar from "../../../assets/banner.jpeg";
import Calenda from "../../../assets/banner_.jpeg";
import Bstand from "../../../assets/bstand.jpeg";
import Bstan from "../../../assets/bstan.jpeg";
import Bsta from "../../../assets/bsta.jpeg";
import Bst from "../../../assets/bst.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";
import Classes from "../product.module.css";

const RightBanner = () => {
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
            images={[Calendar, Calenda]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Banners/Signs
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightBanner;
