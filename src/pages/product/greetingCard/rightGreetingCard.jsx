import React from "react";
import GifImage from "../../../components/gif_image/gifImage";
import Calendar from "../../../assets/calendar.webp";
import Calenda from "../../../assets/calenda.webp";
import Calend from "../../../assets/calend.webp";
import Calen from "../../../assets/calen.webp";
import RightComponent from "../../../components/rightDetails/rightComponent";
import Classes from "../product.module.css";

const RightGreetingCard = () => {
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
          Greeting Cards
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightGreetingCard;
