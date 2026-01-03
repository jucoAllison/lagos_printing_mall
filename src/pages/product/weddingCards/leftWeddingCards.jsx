import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { MainContext } from "../../../App";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import BottomComponent from "../bottomComponent";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Select from "../../../components/select/select";


const LeftWeddingCards = ({
  inputs,
  setInputs,
  size,
  setSize,
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
  printStyle,
  setPrintStyle,
  premiumFinishing,
  setPremiumFinishing,
  setSampleProof,
  sampleProof,
  pages,
  setPages,
  type,
  setType,





  


  
  





  
  
  
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
          <InputCom label={"Product"} readOnly={true} value={"Wedding Cards"} />

        </div>

        <InputCom
          label={"Quantity "}
          value={inputs?.quantity}
          // placeholder={"Minimum of " + 50 + " copies"}
          placeholder={""}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />

        <InputCom
          label={
            "What is your target budget for the print job?"
          }
          value={inputs?.budget}
          placeholder={"0"}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, budget: newValue });
          }}
        />


        
                <Select
                  label={"What’s the theme or mood of the wedding?"}
                  statee={size}
                  setStatee={setSize}
                />



        
                <Select
                  label={"What type of wedding invitation do you want?"}
                  statee={paperType}
                  setStatee={setPaperType}
                />


        
        
                <Select
                  label={"Would you like matching items such as"}
                  statee={lamination}
                  setStatee={setLamination}
                  optional={true}
                />


                
        
                <Select
                  label={"Any seal required?"}
                  statee={pages}
                  setStatee={setPages}
                  optional={true}
                />





        
        
                <Select
                  label={"Any packaging requirement?"}
                  statee={type}
                  setStatee={setType}
                  optional={true}
                />




                <Select
                  label={"Envelope required?"}
                  statee={premiumFinishing}
                  setStatee={setPremiumFinishing}
                />

       

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Do you want a belly band or ribbon tie around the card?
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
                      .filter((b) => !b.includes("Wedding"))}
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


export default LeftWeddingCards