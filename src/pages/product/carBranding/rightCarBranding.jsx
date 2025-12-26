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
import BrandCar from "../../../assets/brand_car.webp";
import BrandCa from "../../../assets/brand_ca.webp";
import Brand from "../../../assets/brand_.webp";
import BrandC from "../../../assets/brand_c.webp";
import Select from "../../../components/select/select";

const RightCarBranding = ({
  inputs,
  setInputs,
  deliveryMethod,
  setDeliveryMethod,
  setRecurring,
  recurring,
  frequency,
  setFrequency,
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
        <div style={{ height: "340px" }}>
          <GifImage
            images={[BrandCar, BrandCa, Brand, BrandC]}
            settime={3000}
          />
        </div>
        <div
          className={Classes.titleDataHere}
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Vehicle Wraps/Car Branding
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

        <div className="flex items-center mt-4 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Recurring order?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={recurring}
            onChange={() => setRecurring(!recurring)}
          />
        </div>

        {recurring && (
          <>
            <Select
              label={"Frequency"}
              setStatee={setFrequency}
              statee={frequency}
            />
          </>
        )}

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
          setStatee={setDeliveryMethod}
          statee={deliveryMethod}
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
      </div>
    </div>
  );
};

export default RightCarBranding;
