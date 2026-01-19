import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import CustomTShirt from "../../../assets/custom-T-Shirt.gif";
import Classes from "../product.module.css";
import { MainContext } from "../../../App";
import GifImage from "../../../components/gif_image/gifImage";
import Buisiness_Card from "../../../assets/envelop.jpeg";
import Buisiness_Car from "../../../assets/envelo.jpeg";
import RightComponent from "../../../components/rightDetails/rightComponent";

const Rightenvelopes = () => {
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
            images={[Buisiness_Card, Buisiness_Car]}
            settime={3000}
          />
        </div>

        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Envelops
        </div>
      </>

      <RightComponent />
    </div>
  );
};

export default Rightenvelopes;
