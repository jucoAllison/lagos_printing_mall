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
import Screen_Printing from "../../../assets/screen_printing.jpeg";
import Screen_Printin from "../../../assets/screen_printin.jpeg";
import Screen_Printi from "../../../assets/screen_printi.jpeg";
import Screen_Print from "../../../assets/screen_print.jpeg";
import Screen_Prin from "../../../assets/screen_prin.jpeg";
import Select from "../../../components/select/select";

const RightGraphicsDesign = ({
  inputs,
  setInputs,
  deliveryMethod,
  setDeliveryMethod,
}) => {
  const CTX = useContext(MainContext);

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
            images={[
              Screen_Printing,
              Screen_Printin,
              Screen_Printi,
              Screen_Print,
              Screen_Prin,
            ]}
            settime={3000}
          />
        </div>

        {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Graphics Design
        </div>
      </>
      <div
        className={clsx([Classes.firstBorderHerer, "mt-5"])}
        style={{ boxShadow: "none" }}
      >
        <div
          style={{
            fontSize: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Fill in your details
        </div>

        <div className="w-full">
          <InputCom
            label={"Full name"}
            value={inputs?.full_name}
            placeholder={"Your full name"}
            onChange={(e) => {
              setInputs({ ...inputs, full_name: e.target.value });
            }}
          />

          <InputCom
            label={"Email address"}
            value={inputs?.full_name}
            placeholder={"Your email"}
            onChange={(e) => {
              setInputs({ ...inputs, email: e.target.value });
            }}
          />

          <InputCom
            label={"Phone number"}
            value={inputs?.phone}
            placeholder={"Your number"}
            onChange={(e) => {
              const newValue = e.target.value.replace(/\D/g, "");
              setInputs({ ...inputs, phone: newValue });
            }}
          />
        </div>

        <div
          className={Classes.subDataHere}
          style={{
            fontFamily: "outfit",
            marginTop: "30px",
            fontWeight: "400",
            marginBottom: "10px",
          }}
        >
          Do you want it delivered to your doorstep?
        </div>

        <Select
          label={"Delivery Method"}
          statee={deliveryMethod}
          setStatee={setDeliveryMethod}
        />

        {deliveryMethod.filter((v) => v.selected)[0]?.name === "Shipping" && (
          <>
            <InputCom
              label={"State"}
              value={inputs?.state}
              placeholder={"Your state"}
              onChange={(e) => {
                setInputs({ ...inputs, state: e.target.value });
              }}
            />

            <InputCom
              label={"Address"}
              value={inputs?.state}
              placeholder={"Landmark"}
              onChange={(e) => {
                setInputs({ ...inputs, state: e.target.value });
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "17px",
              }}
            >
              <InputCom
                label={"City"}
                value={inputs?.city}
                placeholder={"Your city"}
                onChange={(e) => {
                  setInputs({ ...inputs, city: e.target.value });
                }}
              />
              <InputCom
                label={"Zip code"}
                value={inputs?.zip}
                placeholder={"Zip code"}
                onChange={(e) => {
                  setInputs({ ...inputs, zip: e.target.value });
                }}
              />
            </div>
          </>
        )}

        {/* <InputCom
          label={"Deadline"}
          value={inputs?.timeline}
          type={"date"}
          placeholder={"Timeline"}
          onChange={(e) => {
            setInputs({ ...inputs, timeline: e.target.value });
          }}
        /> */}
      </div>
    </div>
  );
};

export default RightGraphicsDesign;
