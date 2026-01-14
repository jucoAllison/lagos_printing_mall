import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import BottomComponent from "../bottomComponent";
import { MainContext } from "../../../App";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Select from "../../../components/select/select";

const LeftPEN = ({
  designReady,
  designSupport,
  setDesignSupport,
  inputs,
  setInputs,
  setDesignReady,
  submitButton,
  loading,
  setNewProduct,
  newProduct,
  proceedHandler,
  size,
  setSize,
  type,
  setType,
  format,
  setFormat,
  orientation,
  setOrientation,
  paperType,
  setPaperType,
  paperWeight,
  setPaperWeight,
  needEnvelop,
  setNeedEnvelop,
  envelopBranded,
  setEnvelopBranded,
  sampleProof,
  setSampleProof,
  qualityLevel,
  setQualityLevel,
}) => {
  const CTX = useContext(MainContext);
  const [toggle, setToggle] = useState(false);

  return (
    <div
      className={Classes.firstBorderHerer}
      style={{ boxShadow: "none", width: "100%", height: "max-content" }}
    >
      <div
        className={Classes.titleDataHere}
        // style={{ color: CTX?.isBlack && "#a8a8a8" }}
      >
        Optimized targeting is set up for you
      </div>

      <div
        className={Classes.subDataHere}
        // style={{ color: CTX?.isBlack && "#efefef" }}
      >
        Please submit your preferred quantity and select your desired job type.
        If you’re unsure about which paper type to choose, watch our{" "}
        <span
          style={{
            color: "#635BFF",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          explainer video
        </span>{" "}
        <br />
        <br /> or{" "}
        <span
          style={{
            color: "#635BFF",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          contact us
        </span>{" "}
        for a quick response.
      </div>
      <div className={Classes.manualCover}>
        <div className="flex gap-[20px] w-full items-top">
          <InputCom label={"Product"} readOnly={true} value={"Pen"} />
        </div>
        <InputCom
          label={"Quantity?"}
          value={inputs?.quantity}
          placeholder={""}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />
        <InputCom
          label={"Timeline"}
          value={inputs?.timeline}
          placeholder={""}
          type={"date"}
          onChange={(e) => {
            setInputs({ ...inputs, timeline: e.target.value });
          }}
        />
        <InputCom
          label={"What color of pen do you want?"}
          value={inputs?.color}
          placeholder={""}
          onChange={(e) => {
            setInputs({ ...inputs, color: e.target.value });
          }}
        />

        <Select
          label={"What is the intended purpose?"}
          statee={type}
          setStatee={setType}
        />

        <Select label={"Is this for?"} statee={format} setStatee={setFormat} />

        <Select
          label={"Mechanism"}
          statee={orientation}
          setStatee={setOrientation}
        />
        {/* <div
          className={Classes.subDataHere}
          style={{
            fontFamily: "outfit",
            marginTop: "-2px",
            fontWeight: "200",
            marginBottom: "10px",
          }}
        >
          (important for material type and durability)
        </div> */}

        <Select
          label={"Quality Level"}
          statee={qualityLevel}
          setStatee={setQualityLevel}
        />

        {/* <Select label={"Size"} statee={size} setStatee={setSize} /> */}

        {/* {size
          ?.filter((v) => v.selected == true)[0]
          ?.name?.toLowerCase()
          ?.includes("custom") && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <InputCom
              label={"Width (ft)"}
              value={inputs?.width}
              placeholder={"Width (ft)"}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                setInputs({ ...inputs, width: newValue });
              }}
            />

            <InputCom
              label={"Length (ft)"}
              value={inputs?.length}
              placeholder={"Length (ft)"}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                setInputs({ ...inputs, length: newValue });
              }}
            />
          </div>
        )} */}

        {/* <div
          className={Classes.subDataHere}
          style={{
            fontFamily: "outfit",
            marginTop: "-2px",
            fontWeight: "200",
            marginBottom: "10px",
          }}
        >
          (Exact dimensions in feet)
        </div> */}

        <Select
          label={"Pen ink color?"}
          statee={paperType}
          setStatee={setPaperType}
        />
        <Select
          label={"Preferred branding method"}
          statee={paperWeight}
          setStatee={setPaperWeight}
        />

        {/* <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Do you need us to install the print?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={needEnvelop}
            onChange={() => {
              setNeedEnvelop(!needEnvelop);
            }}
          />
        </div>

        {needEnvelop && (
          <InputCom
            label={"Installation location, height and accessibility"}
            value={inputs?.location}
            textarea={true}
            placeholder={"Installation location, height and accessibility"}
            onChange={(e) => {
              setInputs({ ...inputs, location: e.target.value });
            }}
          />
        )}

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Should we carry ladders or scaffolding?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={envelopBranded}
            onChange={() => {
              setEnvelopBranded(!envelopBranded);
            }}
          />
        </div> */}

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Do you need a printed sample/proof before full production?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={sampleProof}
            onChange={() => {
              setSampleProof(!sampleProof);
            }}
          />
        </div>

        <BottomComponent
          designReady={designReady}
          designSupport={designSupport}
          setDesignSupport={setDesignSupport}
          inputs={inputs}
          setInputs={setInputs}
          setDesignReady={setDesignReady}
        />
      </div>

      <div className=" gap-[8px] mt-3">
        <button
          onClick={submitButton}
          type="button"
          className={clsx([
            Classes.shopNowBTN,
            "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent ml-auto",
          ])}
          style={{
            fontFamily: "Outfit",
            color: "#fff",
            backgroundColor: "#ee2490",
            borderRadius: "12px",
            border: "none",
          }}
        >
          {loading && (
            <AiOutlineLoading
              className="animate-spin h-[20px] w-[20px] mr-1 ml-auto"
              color={"#fff"}
            />
          )}
          Submit <HiChevronRight />
        </button>

        <div
          className="flex items-center justify-between gap-[20px] w-full"
          style={{
            marginTop: "30px",
          }}
        >
          <div
            className={Classes.subDataHere}
            style={{
              fontFamily: "outfit",
              fontWeight: "400",
              marginBottom: "10px",
            }}
            onClick={() => setToggle(true)}
          >
            Do you need to add{" "}
            <span style={{ color: "#e20254", cursor: "pointer" }}>
              {" "}
              other products?
            </span>
          </div>
          {toggle && <IoClose onClick={() => setToggle(false)} size={20} />}
        </div>
        {toggle && (
          <div className="flex gap-[20px] items-end">
            <InputCom
              label={"Select Product"}
              select={true}
              options={CTX.proceedOptions
                ?.map((e) => e.name)
                .filter(
                  (v) =>
                    !(CTX.products?.products || [])
                      .map((p) => p.name)
                      .includes(v)
                )
                .filter((b) => !b.includes("Pen"))}
              onChange={(e) => {
                setNewProduct(e.target.value);
              }}
            />
            {!newProduct ? (
              <div className="w-[92px]"></div>
            ) : (
              <button
                type="button"
                className={clsx([
                  Classes.shopNowBTN,
                  "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent ml-auto",
                ])}
                style={{
                  fontFamily: "Outfit",
                  color: "#fff",
                  backgroundColor: "#ee2490",
                  borderRadius: "12px",
                  border: "none",
                }}
                onClick={proceedHandler}
              >
                Proceed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPEN;
