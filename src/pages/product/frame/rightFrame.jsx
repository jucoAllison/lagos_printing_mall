import React from "react";
import GifImage from "../../../components/gif_image/gifImage";
import Fram from "../../../assets/PicFrames.jpeg";
import Frame from "../../../assets/PicFrame.jpeg";
import Calendar from "../../../assets/PicFram.jpeg";
import Calenda from "../../../assets/PicFra.jpeg";
import Calend from "../../../assets/PicFr.jpeg";
import Calen from "../../../assets/PicF.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";
import Classes from "../product.module.css";

const RightFrame = () => {
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
            images={[Calendar, Calenda, Calend, Calen, Fram, Frame]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Frames
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightFrame;
