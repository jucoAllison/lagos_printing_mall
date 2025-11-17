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

const RightFlyers = ({
  inputs,
  setInputs,
  deliveryMethod,
  setDeliveryMethod,
}) => {
  const params = useParams();
  const CTX = useContext(MainContext);

  const onChangeForPaperType = (v, i) => {
    const spreadGender = [...deliveryMethod];

    const reMapped = spreadGender.map((v) => {
      return { ...v, selected: false };
    });

    reMapped[i].selected = true;

    setDeliveryMethod(reMapped);
  };

  const mappDeliveryMethod = deliveryMethod.map((v, i) => (
    <div
      key={i}
      style={{
        backgroundColor: v.selected && "#eb268f",
        color: v.selected && "#fff",
      }}
      className={Classes.eachMapCover}
      onClick={() => onChangeForPaperType(v, i)}
    >
      {v?.name}
    </div>
  ));
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

<div style={{height: "340px"}}>
              <GifImage settime={3200} images={[Flyer, FlyerPNG]} />
</div>



          {/* <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]"> */}
          <div
            className={Classes.titleDataHere}
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            Flyers
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

        <div
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Delivery Method
        </div>
        <div className={Classes.wrapTheFlex}>{mappDeliveryMethod}</div>

        {/* <div className="flex items-center ">
                    <div
                      style={{
                        fontSize: "12px",
                        // textTransform: "capitalize",
                      }}
                      className={Classes.titleDataHere}
                    >
                      Delivery?
                    </div>
    
                    <input
                      className={Classes.preferenceInput}
                      type="checkbox"
                      checked={delivery}
                      onChange={() => setDelivery(!delivery)}
                    />
                  </div> */}

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

export default RightFlyers;
