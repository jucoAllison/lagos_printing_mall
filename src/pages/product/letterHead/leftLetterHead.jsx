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

const LeftLetterHead = ({
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
  premiumFinishing,
  setPremiumFinishing,








  
  
  
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
            // select={true}
            // options={[
            //   "Select Product",
            //   "Posters",
            //   "Letter Head",
            //   "Envelope",
            //   "Flyers",
            //   "Brochures",
            //   "Greeting Cards",
            //   "Receipts/Invoices",
            //   "Exercise Books",
            //   "Books",
            //   "Magazine",
            //   "Plastic ID Cards",
            //   "Mailer Bags",
            //   "Banners/Signs",
            //   "Custom T-Shirt",
            //   "Car Wrap",
            //   "Pen",
            //   "Frames",
            //   "Invitation Cards",
            //   "Dummy Cheques",
            //   "Graphics Design",
            //   "Tailored Calendar",
            //   "Screen Printing",
            //   "Throw Pillows",
            //   "Banner Stand",
            //   "Awards/Plaque",
            //   "Wedding Cards",
            //   "Business Cards",
            //   "Custom Hoody",
            //   "Jotters - Hard / Soft Covers",
            //   "Custom Mugs",
            //   "Large Format Printing",
            //   "Carrier Bag a3/a4/a5",
            //   "Branded Building",
            //   "Stickers/Product Labels",
            // ]}
            readOnly={true}
            // placeholder={"Minimum of " + 50 + " copies"}
            //   onBlur={(e) => {
            //     if (parseInt(e.target.value) < parseInt(v?.min)) {
            //       e.target.style.border = "1px solid red";
            //       e.target.style.outline = "1px solid red";
            //       setIsToBlock(true);
            //       // console.log("onBlur log =>> ", e.target.value)
            //     } else {
            //       e.target.style.border = "0px solid red";
            //       e.target.style.outline = "0px solid red";
            //       setIsToBlock(false);
            //     }
            //   }}
            value={"Letter Head"}
            // onChange={(e) => {
            //   setInputs({ ...inputs, product: e.target.value });
            // }}
          />

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
          // placeholder={"Minimum of " + 50 + " copies"}
          placeholder={""}
          //   onBlur={(e) => {
          //     if (parseInt(e.target.value) < parseInt(v?.min)) {
          //       e.target.style.border = "1px solid red";
          //       e.target.style.outline = "1px solid red";
          //       setIsToBlock(true);
          //       // console.log("onBlur log =>> ", e.target.value)
          //     } else {
          //       e.target.style.border = "0px solid red";
          //       e.target.style.outline = "0px solid red";
          //       setIsToBlock(false);
          //     }
          //   }}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />

        
  <Select
          label={"Size"}
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
          label={"Paper Type"}
          setStatee={setPaperType}
          statee={paperType}
        />

  <Select
          label={"Premium Finishing"}
          setStatee={setPremiumFinishing}
          statee={premiumFinishing}
          optional={true}
        />

  <Select
          label={"Paper Thickness"}
          setStatee={setGsm}
          statee={gsm}
        />






        
      






      

        









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
                      .filter((b) => !b.includes("Letter Head"))}
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

export default LeftLetterHead;
