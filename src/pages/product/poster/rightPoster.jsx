import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import CustomTShirt from "../../../assets/custom-T-Shirt.gif";
import Classes from "../product.module.css";
import Flyer from "../../../assets/flyer.jpeg";
import FlyerPNG from "../../../assets/flyer.png";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { MainContext } from "../../../App";
import GifImage from "../../../components/gif_image/gifImage";
import Select from "../../../components/select/select";
import { IoIosArrowForward } from "react-icons/io";
import { FaFileAlt, FaRegWindowClose } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import RightComponent from "../../../components/rightDetails/rightComponent";

const RightPoster = () => {
  const params = useParams();
  const CTX = useContext(MainContext);

  return (
    <>
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
            <GifImage settime={3200} images={[Flyer, FlyerPNG]} />
          </div>

          {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
          <div
            className={Classes.titleDataHere}
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            Posters
          </div>
        </>

        <RightComponent />
      </div>
    </>
  );
};

export default RightPoster;
