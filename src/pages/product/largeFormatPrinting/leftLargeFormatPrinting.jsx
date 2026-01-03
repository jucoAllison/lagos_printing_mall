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

const LeftLargeFormatPrinting = ({
  inputs,
  setInputs,
  ladders,
  setLadders,
  wantToPrint,
  setWantToPrint,
  installThePrint,
  setInstallThePrint,
  size,
  setSize,
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
  setPurpose,
  purpose,








  
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
            value={"Large Format Printing"}
          />
        </div>

        <InputCom
          label={"Quantity - How many prints do you need?"}
          value={inputs?.quantity}
          //   placeholder={"Minimum of " + 50 + " copies"}
          placeholder={""}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />

        <Select
          label={"What do you want to print?"}
          statee={wantToPrint}
          setStatee={setWantToPrint}
        />
        <Select
          label={"What is the purpose of the print?"}
          setStatee={setPurpose}
          statee={purpose}
        />
        <Select
          label={"Where will it be used?"}
          setStatee={setLamination}
          statee={lamination}
        />
        <div
          className={Classes.subDataHere}
          style={{
            fontFamily: "outfit",
            marginTop: "-2px",
            fontWeight: "200",
            marginBottom: "10px",
          }}
        >
          Important for material type and durability
        </div>

        <Select
          label={"What size should the print be? (ft)"}
          setStatee={setSize}
          statee={size}
        />

        {size
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
        )}

        <Select
          label={"Do you need mounting on?"}
          setStatee={setPremiumFinishing}
          statee={premiumFinishing}
          optional={true}
        />

        <Select
          label={"Do you need?"}
          optional={true}
          setStatee={setPages}
          statee={pages}
        />

        {/* <Select
          label={"Do you need matching office branding materials"}
          setStatee={setGsm}
          statee={gsm}
        /> */}

        <div className="flex items-center mt-7 ">
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
            checked={installThePrint}
            onChange={() => {
              setInstallThePrint(!installThePrint);
            }}
          />
        </div>

        {installThePrint && (
          <>
          
        <div className="flex items-center mt-7 ">
          <InputCom
            label={
              "Where is the installation location, Indoor or outdoor, Height and accessibility?"
            }
            row
            value={inputs?.installationLocation}
            placeholder={". . ."}
            textarea={true}
            onChange={(e) => {
              setInputs({ ...inputs, installationLocation: e.target.value });
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
              Should we carry ladders or scaffolding, Do you need site
              measurement before production?
            </div>

            <input
              className={Classes.preferenceInput}
              type="checkbox"
              checked={ladders}
              onChange={() => {
                setLadders(!ladders);
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
                      .filter((b) => !b.includes("Large Format Printing"))}
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

export default LeftLargeFormatPrinting;
