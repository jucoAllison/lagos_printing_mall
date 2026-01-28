import React from "react";
import GifImage from "../../../components/gif_image/gifImage";
import Calendar from "../../../assets/invitation_card.jpeg";
import Calenda from "../../../assets/invitation_car.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";
import Classes from "../product.module.css";

const RightInvitationCard = () => {
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
          Invitation Cards
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightInvitationCard;
