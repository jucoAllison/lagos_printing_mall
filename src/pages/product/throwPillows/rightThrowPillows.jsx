import React from "react";
import GifImage from "../../../components/gif_image/gifImage";
import Calendar from "../../../assets/throw_pillows.jpeg";
import Calenda from "../../../assets/throw_pillow.jpeg";
import Calend from "../../../assets/throw_pillo.jpeg";
import Calen from "../../../assets/throw_pill.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";
import Classes from "../product.module.css";

const RightThrowPillows = () => {
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
            images={[Calendar, Calenda, Calend, Calen]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Throw Pillows
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightThrowPillows;

