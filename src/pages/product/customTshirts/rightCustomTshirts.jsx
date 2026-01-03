import React from "react";
import GifImage from "../../../components/gif_image/gifImage";
import CustomTShirt from "../../../assets/custom-T-Shirt.gif";
import Hoody from "../../../assets/hoody.gif";
import RightComponent from "../../../components/rightDetails/rightComponent";
import Classes from "../product.module.css";

const RightTShirt = () => {
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
            images={[CustomTShirt, Hoody]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Custom T-Shirt
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightTShirt;
