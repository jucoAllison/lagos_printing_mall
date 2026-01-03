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

const LeftStickers = ({
  inputs,
  setInputs,
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
  setGsm,
  gsm,




  
  





  
  
  
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
            value={"Stickers and Product Labels"}
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

        <InputCom
          label={"What is the sticker/label being used for?"}
          value={inputs?.use}
          placeholder={"Is it for indoor or outdoor use?"}
          onChange={(e) => {
            setInputs({ ...inputs, use: e.target.value });
          }}
        />

        <Select
          label={"What surface?"}
          statee={wantToPrint}
          setStatee={setWantToPrint}
        />
 <Select
          label={"What size should the print be?"}
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
              label={"Width (inches)"}
              value={inputs?.width}
              placeholder={"Width (inches)"}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                setInputs({ ...inputs, width: newValue });
              }}
            />

            <InputCom
              label={"Length (inches)"}
              value={inputs?.length}
              placeholder={"Length (inches)"}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                setInputs({ ...inputs, length: newValue });
              }}
            />
          </div>
        )}



        <Select
          label={"What shape?"}
          setStatee={setPurpose}
          statee={purpose}
        />
        <Select
          label={"Paper Stickers"}
          setStatee={setLamination}
          statee={lamination}
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
          Important for material type and durability
        </div> */}

       
        <Select
          label={"Vinyl Stickers (Waterproof)"}
          setStatee={setPremiumFinishing}
          statee={premiumFinishing}
          optional={true}
        />

        <Select
          label={"Finish / Lamination"}
          optional={true}
          setStatee={setPages}
          statee={pages}
        />

        <Select
          label={"Do you need them"}
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
            Do you need a printed sample/proof before full production?
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
                      .filter((b) => !b.includes("Stickers"))}
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

export default LeftStickers;
