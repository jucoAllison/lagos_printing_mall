import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { MainContext } from "../../../App";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import Select from "../../../components/select/select";
import BottomComponent from "../bottomComponent";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const LeftCarBranding = ({
  inputs,
  setInputs,
  previouslyBranded,
  setpreviouslyBranded,
  takeMeasurements,
  setTakeMeasurements,
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
  pages,
  setPages,
  schoolStationery,
  setSchoolStationery,
  setOrientation,
  orientation,




  


  
  submitButton,
  loading,
  setNewProduct,
  newProduct,
  proceedHandler,
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
          <InputCom
            label={"Product"}
            readOnly={true}
            value={"Vehicle Wraps/Car Branding"}
          />
        </div>

        <InputCom
          label={"What is your budget range?"}
          value={inputs?.range}
          //   placeholder={"Minimum of " + 50 + " copies"}
          placeholder={""}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, range: newValue });
          }}
        />

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
        />

        <Select
          label={"What type of vehicle do you want to brand?"}
          setStatee={setPaperType}
          statee={paperType}
        />
        <Select
          label={"What is the primary purpose of the branding?"}
          setStatee={setOrientation}
          statee={orientation}
        />
        <Select
          label={"What type of branding material do you prefer?"}
          setStatee={setLamination}
          statee={lamination}
        />

        <Select
          label={"Where should installation take place?"}
          setStatee={setPremiumFinishing}
          statee={premiumFinishing}
        />

        <Select
          label={"How many vehicles are you branding"}
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
            Is the vehicle available and clean for installation?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={schoolStationery}
            onChange={() => {
              setSchoolStationery(!schoolStationery);
            }}
          />
        </div>

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Previously branded?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={previouslyBranded}
            onChange={() => {
              setpreviouslyBranded(!previouslyBranded);
            }}
          />
        </div>
        <>

          {inputs?.vehiclePhotos &&
              Object?.keys(inputs?.vehiclePhotos)?.map((v, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(inputs?.vehiclePhotos[v])}
                  alt="Selected"
                  width="100"
                  style={{ objectFit: "cover", borderRadius: "10px" }}
                />
              ))}

          <div className={Classes.subDataHere} style={{ margin: "0px" }}>
            Please send clear photos of the vehicle: Front, Back, Left side,
            Right side, Top (if needed)
          </div>

          <InputCom
            label={"Upload design"}
            type={"file"}
            multiple={true}
            accept="image/*"
            placeholder={"Height (inches)"}
            onChange={(e) => {
              const user_design = e.target.files;
              setInputs({ ...inputs, vehiclePhotos: user_design });
            }}
          />
        </>

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Should we come and take measurements?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={takeMeasurements}
            onChange={() => {
              // if (designReady) {
              //   setDesignReady(false);
              // }
              setTakeMeasurements(!takeMeasurements);
            }}
          />
        </div>
        {!takeMeasurements && (
          <>
            <div className={Classes.subDataHere} style={{ margin: "0px" }}>
              Do you have the vehicle dimensions?
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <InputCom
                label={"Width (inches)"}
                value={inputs?.vehicleWidth}
                placeholder={"Width (inches)"}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setInputs({ ...inputs, vehicleWidth: newValue });
                }}
              />

              <InputCom
                label={"Length (inches)"}
                value={inputs?.vehicleLength}
                placeholder={"Length (inches)"}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setInputs({ ...inputs, vehicleLength: newValue });
                }}
              />
              <InputCom
                label={"Height (inches)"}
                value={inputs?.vehicleHeight}
                placeholder={"Height (inches)"}
                onChange={(e) => {
                  const newValue = e.target.value.replace(/\D/g, "");
                  setInputs({ ...inputs, vehicleHeight: newValue });
                }}
              />
            </div>
          </>
        )}

        





































        


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
                      .filter((b) => !b.includes("Wrap"))}
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

export default LeftCarBranding;
