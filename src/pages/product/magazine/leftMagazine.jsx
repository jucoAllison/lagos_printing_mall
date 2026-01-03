import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { MainContext } from "../../../App";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import BottomComponent from "../bottomComponent";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Select from "../../../components/select/select";


const LeftMagazine = ({
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
  schoolStationery,
  setSchoolStationery,
  setBarcodePrinting,
  barcodePrinting,
  setIsImages,
  isImages,
  setEBook,
  eBook,
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
          <InputCom label={"Product"} readOnly={true} value={"Magazine"} />

          {/* <div
             style={{
               width: "max-content",
               marginLeft: "auto",
               marginTop: "10px",
             }}
           >
             <FiEdit color="#635BFF" />
           </div> */}
        </div>

        <InputCom
          label={"Quantity "}
          value={inputs?.quantity}
        //   placeholder={"Minimum of " + 50 + " copies"}
          placeholder={""}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />

        <InputCom
          label={"What is your target budget for this print job?"}
          value={inputs?.budget}
          placeholder={"0"}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, budget: newValue });
          }}
        />

        <InputCom
          label={"How many total pages does the book have?"}
          value={inputs?.totalPages}
          placeholder={"0"}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, totalPages: newValue });
          }}
        />

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Are there images, charts, or illustrations inside?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={isImages}
            onChange={() => {
              setIsImages(!isImages);
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
            Do you want eBook (digital) conversion alongside the print version?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={eBook}
            onChange={() => {
              setEBook(!eBook);
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
            Do you need ISBN registration or barcode printing
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={barcodePrinting}
            onChange={() => {
              setBarcodePrinting(!barcodePrinting);
            }}
          />
        </div>

<Select
          label={"What type of book do you want to print?"}
          statee={paperType}
          setStatee={setPaperType}
          />

                 <Select
          label={"Size"}
          statee={size}
          setStatee={setSize}
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
          label={"Orientation"}
          statee={orientation}
          setStatee={setOrientation}
        />

        <Select
          label={"What cover material do you prefer?"}
          statee={lamination}
          setStatee={setLamination}
        />


        <Select
          label={"Do you want the cover laminated?"}
          statee={premiumFinishing}
          optional={true}
          setStatee={setPremiumFinishing}
        />


        <Select
          label={"Paper type for inner pages"}
          statee={pages}
          setStatee={setPages}
        />

        {/* <sses.wrapTheFlex}>{mappTypes}</div> */}

<Select
          label={"Are the inner pages"}
          setStatee={setType}
          statee={type}
        />

        <Select
          label={"What binding type do you prefer?"}
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
            Do you want matching school stationery?
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

        {schoolStationery && (
  <Select
          label={""}
          setStatee={setPrintStyle}
          statee={printStyle}
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
                      .filter((b) => !b.includes("Magazine"))}
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

export default LeftMagazine