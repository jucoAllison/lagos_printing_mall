import React, { useContext } from "react";
import Classes from "../product.module.css";
import InputCom from "../../../components/input/input";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { MainContext } from "../../../App";
import { HiChevronRight, HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";

const LeftBC = ({
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
}) => {
  const CTX = useContext(MainContext);

  const onChangeForGsm = (v, i) => {
    const spreadGender = [...gsm];

    const reMapped = spreadGender.map((v) => {
      return { ...v, selected: false };
    });

    reMapped[i].selected = true;

    setGsm(reMapped);
  };

  const mappGSM = gsm.map((v, i) => (
    <div
      key={i}
      style={{
        backgroundColor: v.selected && "#eb268f",
        color: v.selected && "#fff",
      }}
      className={Classes.eachMapCover}
      onClick={() => onChangeForGsm(v, i)}
    >
      {v?.name}
    </div>
  ));

  const onChangeForPaperType = (v, i) => {
    const spreadGender = [...paperType];

    const reMapped = spreadGender.map((v) => {
      return { ...v, selected: false };
    });

    reMapped[i].selected = true;

    setPaperType(reMapped);
  };

  const mappPaperType = paperType.map((v, i) => (
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

  const onChangeForGender = (v, i) => {
    const spreadGender = [...size];

    const reMapped = spreadGender.map((v) => {
      return { ...v, selected: false };
    });

    reMapped[i].selected = true;

    setSize(reMapped);
  };

  const mappGender = size.map((v, i) => (
    <div
      key={i}
      style={{
        backgroundColor: v.selected && "#eb268f",
        color: v.selected && "#fff",
      }}
      className={Classes.eachMapCover}
      onClick={() => onChangeForGender(v, i)}
    >
      {v?.name}
    </div>
  ));

  const onChangeForLamination = (v, i) => {
    const spreadGender = [...lamination];

    const reMapped = spreadGender.map((v) => {
      return { ...v, selected: false };
    });

    reMapped[i].selected = true;

    setLamination(reMapped);
  };

  const mappLamination = lamination.map((v, i) => (
    <div
      key={i}
      style={{
        backgroundColor: v.selected && "#eb268f",
        color: v.selected && "#fff",
      }}
      className={Classes.eachMapCover}
      onClick={() => onChangeForLamination(v, i)}
    >
      {v?.name}
    </div>
  ));

  const onChangeForPrintStyle = (v, i) => {
    const spreadGender = [...printStyle];

    const reMapped = spreadGender.map((v) => {
      return { ...v, selected: false };
    });

    reMapped[i].selected = true;

    setPrintStyle(reMapped);
  };

  const mappPrintStyle = printStyle.map((v, i) => (
    <div
      key={i}
      style={{
        backgroundColor: v.selected && "#eb268f",
        color: v.selected && "#fff",
      }}
      className={Classes.eachMapCover}
      onClick={() => onChangeForPrintStyle(v, i)}
    >
      {v?.name}
    </div>
  ));

  const onChangeForPremiumFinishing = (v, i) => {
    const spreadGender = [...premiumFinishing];

    const reMapped = spreadGender.map((v) => {
      return { ...v, selected: false };
    });

    reMapped[i].selected = true;

    setPremiumFinishing(reMapped);
  };

  const mappPremiumFinishing = premiumFinishing.map((v, i) => (
    <div
      key={i}
      style={{
        backgroundColor: v.selected && "#eb268f",
        color: v.selected && "#fff",
      }}
      className={Classes.eachMapCover}
      onClick={() => onChangeForPremiumFinishing(v, i)}
    >
      {v?.name}
    </div>
  ));

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
          <InputCom label={"Product"} readOnly={true} value={"Business Card"} />

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
          placeholder={"Minimum of " + 50 + " copies"}
          onChange={(e) => {
            const newValue = e.target.value.replace(/\D/g, "");
            setInputs({ ...inputs, quantity: newValue });
          }}
        />

        <div
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Card Size
        </div>
        <div className={Classes.wrapTheFlex}>{mappGender}</div>

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

        <div
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Card Type
        </div>
        <div className={Classes.wrapTheFlex}>{mappPaperType}</div>

        <div
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Lamination Type
        </div>
        <div className={Classes.wrapTheFlex}>{mappLamination}</div>

        <div
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Premium Finishing
        </div>
        <div className={Classes.wrapTheFlex}>{mappPremiumFinishing}</div>

        <div
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Card Thickness
        </div>
        <div className={Classes.wrapTheFlex}>{mappGSM}</div>

        <div
          style={{
            fontSize: "12px",
            marginBottom: "8px",
            marginTop: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Print Style
        </div>
        <div className={Classes.wrapTheFlex}>{mappPrintStyle}</div>

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
              This means we will be doing your design, Please upload design
              files you would want to use
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

      <div className="flex gap-[10px] mt-5">
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
          type="button"
          className={clsx([
            Classes.shopNowBTN,
            "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent ml-auto",
          ])}
          style={{
            fontFamily: "Outfit",
            color: "#fff",
            backgroundColor: "#812b5a",
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

export default LeftBC;
