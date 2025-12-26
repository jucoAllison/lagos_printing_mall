import React, { useContext } from "react";
import Classes from "../product.module.css";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { MainContext } from "../../../App";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import Select from "../../../components/select/select";

const LeftMug = ({
  inputs,
  setInputs,
  paperType,
  setPaperType,
  gsm,
  setGsm,
  designReady,
  setDesignReady,
  designSupport,
  setDesignSupport,
  lamination,
  setLamination,
  premiumFinishing,
  setPremiumFinishing,
  setSampleProof,
  sampleProof,
  pages,
  setPages,
  setOrientation,
  orientation,
}) => {
  const CTX = useContext(MainContext);

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
          <InputCom
            label={"Product"}
            readOnly={true}
            value={"Cups/Mugs"}
          />
        </div>

        <InputCom
          label={"How many mugs do you want? "}
          value={inputs?.quantity}
          //   placeholder={"Minimum of " + 50 + " copies"}
          placeholder={""}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />
{/* 
        <InputCom
          label={"What is the exact make, model, and year of the vehicle?"}
          value={inputs?.vehicle}
          placeholder={""}
          onChange={(e) => {
            setInputs({ ...inputs, vehicle: e.target.value });
          }}
        />

        <InputCom
          label={"What date and time is convenient for installation?"}
          value={inputs?.date}
          placeholder={""}
          type={"date"}
          onChange={(e) => {
            setInputs({ ...inputs, date: e.target.value });
          }}
        /> */}

        <Select
          label={"What type of mug do you want to brand?"}
          setStatee={setPaperType}
          statee={paperType}
        />
        <Select
          label={"What color of mug do you want?"}
          setStatee={setOrientation}
          statee={orientation}
        />
        <Select
          label={"What size do you want?"}
          setStatee={setLamination}
          statee={lamination}
        />

        <Select
          label={"What is the mug for?"}
          setStatee={setPremiumFinishing}
          statee={premiumFinishing}
        />

        <Select
          label={"Where should the print appear?"}
          setStatee={setPages}
          statee={pages}
        />

        <Select
          label={"Preferred communication method?"}
          setStatee={setGsm}
          statee={gsm}
        />

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Do you have a final print-ready design?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={designReady}
            onChange={() => {
              if (designSupport) {
                setDesignSupport(false);
              }

              setDesignReady(!designReady);
            }}
          />
        </div>
        {designReady && (
          <>
            {inputs?.design && (
              <img
                src={URL.createObjectURL(inputs?.user_design)}
                alt="Selected"
                width="200"
                style={{ borderRadius: "10px" }}
              />
            )}

            <div className={Classes.subDataHere} style={{ margin: "0px" }}>
              Do you have your own design, just upload the file here
            </div>

            <InputCom
              label={"Upload design"}
              type={"file"}
              // value={inputs?.quantity}
              accept="image/*"
              placeholder={"Height (inches)"}
              onChange={(e) => {
                const user_design = e.target.files[Object.keys(e.target.files)];

                setInputs({ ...inputs, user_design: user_design });
              }}
            />
          </>
        )}

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Do you need design support?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={designSupport}
            onChange={() => {
              if (designReady) {
                setDesignReady(false);
              }
              setDesignSupport(!designSupport);
            }}
          />
        </div>
        {designSupport && (
          <>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "35px",
              }}
            >
              {inputs?.upload_design &&
                Object?.keys(inputs?.upload_design)?.map((v, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(inputs?.upload_design[v])}
                    alt="Selected"
                    width="100"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                  />
                ))}
            </div>

            <div className={Classes.subDataHere} style={{ margin: "0px" }}>
              This means we will be doing your design, please provide brand
              assets (if available) Logo, other information, any specific
              branding guideline (brand colours, preferred fonts etc)
            </div>

            <InputCom
              label={"Add files for the design"}
              type={"file"}
              // value={inputs?.quantity}
              accept="image/*"
              placeholder={"Height (inches)"}
              multiple={true}
              onChange={(e) => {
                const upload_design = e.target.files;

                // console.log("e.target =>>> ", e);

                setInputs({ ...inputs, upload_design: upload_design });
              }}
            />

            <InputCom
              label={"Upload reference if any"}
              type={"file"}
              // value={inputs?.quantity}
              accept="image/*"
              placeholder={"Height (inches)"}
              onChange={(e) => {
                const reference = e.target.files[Object.keys(e.target.files)];

                setInputs({ ...inputs, reference: reference });
              }}
            />
          </>
        )}

        <div className="flex items-center mt-7 ">
          <InputCom
            label={
              "Additional note any special instructions or contract requirements?"
            }
            row
            value={inputs?.additional}
            placeholder={"Additional note . . ."}
            textarea={true}
            onChange={(e) => {
              setInputs({ ...inputs, additional: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex gap-[10px] mt-5">
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
        >
          Submit <HiChevronRight />{" "}
        </button>
      </div>
    </div>
  );
};

export default LeftMug