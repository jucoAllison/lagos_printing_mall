import React from "react";
import Classes from "./product.module.css";
import InputCom from "../../components/input/input";

const BottomComponent = ({
  designReady,
  designSupport,
  setDesignSupport,
  inputs,
  setInputs,
  setDesignReady,
}) => {
  return (
    <>
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
            This means we will be doing your design, Please upload design files
            you would want to use (images/*)
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
    </>
  );
};

export default BottomComponent;
