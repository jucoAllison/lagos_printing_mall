import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import GifImage from "../../../components/gif_image/gifImage";
import Calendar from "../../../assets/receipts.jpeg";
import Calenda from "../../../assets/receipt.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightReceipts = () => {
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
          Receipts/Invoices
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default RightReceipts;
