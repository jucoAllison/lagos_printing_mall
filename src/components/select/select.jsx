import React, { useContext } from "react";
import Classes from "./select.module.css";
import { MainContext } from "../../App";

const Select = ({ label, statee, setStatee, optional }) => {
  const CTX = useContext(MainContext);

  const onChangeForPremiumFinishing = (v, i) => {
    const spreadGender = [...statee];
    const reMapped = spreadGender?.map((v) => {
      return { ...v, selected: false };
    });
    reMapped[i].selected = true;
    setStatee(reMapped);
  };

  const mappArr = statee?.map((v, i) => (
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

  const clearOptions = () => {
    const spreadGender = [...statee];
    const reMapped = spreadGender?.map((v) => {
      return { ...v, selected: false };
    });
    setStatee(reMapped);
  };

  return (
    <>
      <div
        style={{
          fontSize: "12px",
          marginBottom: "8px",
          marginTop: "12px",
          color: CTX?.isBlack && "#a8a8a8",
        }}
        className={Classes.titleDataHere}
      >
        {label}
      </div>
      <div className={Classes.wrapTheFlex}>
        {mappArr}

        {optional && (
          <>
            {statee.filter((v) => v.selected)?.length > 0 && (
              <div
                className={Classes.eachMapCover}
                onClick={() => clearOptions()}
              >
                clear
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Select;
