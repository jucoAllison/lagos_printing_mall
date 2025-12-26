import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { MainContext } from "../../../App";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import Select from "../../../components/select/select";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const LeftReceipts = ({
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
  numbering,
  setNumbering,
  setNewProduct,
  newProduct,
  loading,
  proceedHandler,
  submitButton,
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
            value={"Receipts/Invoices"}
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
          label={"Quantity of Booklets/Set "}
          value={inputs?.quantity}
          // placeholder={"Minimum of " + 50 + " copies"}
          placeholder={""}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />

        {/* <InputCom
          label={
            "What is your target budget per calendar? (Helps guide material and finish recommendations.)"
          }
          value={inputs?.budget}
          placeholder={"0"}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, budget: newValue });
          }}
        /> */}

        <Select label={"Size"} setStatee={setSize} statee={size} />

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

        {paperType.filter((v) => v.selected)[0].name !=
          "NCR (Carbonless) paper" && (
          <>
            {/* <div
              style={{
                fontSize: "12px",
                marginBottom: "8px",
                marginTop: "12px",
                color: CTX?.isBlack && "#a8a8a8",
              }}
              className={Classes.titleDataHere}
            >
              Do you need Carbon Sheet
            </div>
            <div className={Classes.wrapTheFlex}>{mappGSM}</div> */}

            <Select
              label={"Do you need Carbon Sheet"}
              setStatee={setGsm}
              statee={gsm}
              optional={true}
            />
          </>
        )}

        <Select
          label={"Paper Weight"}
          setStatee={setLamination}
          statee={lamination}
        />

        <Select label={"Cover Type"} setStatee={setPages} statee={pages} />

        <Select
          label={"Should the perforation be on"}
          setStatee={setType}
          statee={type}
        />

        <Select
          label={"Orientation"}
          setStatee={setPremiumFinishing}
          statee={premiumFinishing}
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
          Usually double-sided for wall calendars to save paper
        </div> */}

        <Select
          label={"Printing Detail"}
          setStatee={setPrintStyle}
          statee={printStyle}
        />

        <div className="flex items-center mt-7 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Any numbering required?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={numbering}
            onChange={() => {
              setNumbering(!numbering);
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
        {/* {designReady && (
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
        )} */}

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
              Do you have your own design, just upload the file here. Please
              upload (PDF preferred, AI, EPS, CDR, ZIP etc.)
            </div>

            <InputCom
              label={"Upload design"}
              type={"file"}
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
              This means we will be doing your design, Please upload design
              files you would want to use (images/*)
            </div>

            <InputCom
              label={"Add files for the design"}
              type={"file"}
              // value={inputs?.quantity}
              accept="image/*"
              placeholder={"Add files for the design"}
              multiple={true}
              onChange={(e) => {
                const upload_design = e.target.files;

                // console.log("e.target =>>> ", e);

                setInputs({ ...inputs, upload_design: upload_design });
              }}
            />

            <InputCom
              label={"Upload reference if any (images/*)"}
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
            label={"Additional note"}
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

      <div className=" gap-[8px] mt-3">
        {/* <button
           type="button"
           className={clsx([
             Classes.shopNowBTN,
             "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent ml-auto",
           ])}
           style={{
             fontFamily: "Outfit",
             color: "#812b5a",
             backgroundColor: "transparent",
             borderRadius: "12px",
             border: "none",
           }}
         >
           add more <HiPlus />{" "}
         </button> */}

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
                .filter((b) => !b.includes("Receipts/Invoices"))}
              // readOnly={true}
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
              // value={"Poster"}
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

export default LeftReceipts;
