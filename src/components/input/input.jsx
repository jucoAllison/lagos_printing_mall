import clsx from "clsx";
import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MainContext } from "../../App";

const InputCom = ({
  label,
  accept,
  type,
  required,
  placeholder,
  value,
  readOnly,
  onChange,
  textarea,
  select,
  options,
  multiple,
  onBlur,
  inputStyles
}) => {
  const [override, setOverride] = useState(false);
  const CTX = useContext(MainContext);

  return (
    <div style={{width: "100%"}}>
      <label
        htmlFor="email"
        // className="block mb-2 text-sm font-medium text-gray-900  text[#414141] font-bold	 "
        className={clsx(["font-semibold text-gray-600 py-2 text-xs"])}
        style={{
          color: CTX?.isBlack && "#a8a8a8",
        }}
      >
        {label}
      </label>{" "}
      <abbr title="required"></abbr>
      {textarea ? (
        <textarea
          // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          className={clsx([
            "appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg px-4 py-3 text-xs",
            CTX?.isBlack && "bg-[#2a2f3b] text-[#fff] border-[#1b1c21]",
          ])}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={6}
        />
      ) : select ? (
        <select
          // className="bg-[#373d53] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          className={clsx([
            "appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 text-xs",
            CTX?.isBlack && "bg-[#2a2f3b] text-[#fff] border-[#1b1c21]",
          ])}
          onChange={onChange}
          value={value}
          
        >
          {options.map((v, i) => (
            <option style={{ fontSize: "14px" }} value={v} key={i}>
              {v}
            </option>
          ))}
        </select>
      ) : (
        <div style={{ position: "relative" }}>
          <input
            type={override ? "text" : type}
            onBlur={onBlur}
            accept={accept}
            multiple={multiple}
            // className="border text-gray-900 sm:text-sm rounded-lg focus:ring-[#d00] focus:border-[#d00] block w-full p-2.5 bg-[#373d53] border-gray-600 placeholder-[#fff] text-white focus:ring-[#d00] focus:border-[#d00] pl-4"
            className={clsx([
              "appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-2 px-4 text-xs",
              CTX?.isBlack && "bg-[#2a2f3b] text-[#fff] border-[#1b1c21]",
            ])}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
            style={{
              borderRadius: "6.2px",
              // outlineColor: "#279348",
              backgroundColor: readOnly && "#292d3d96",
              ...inputStyles
            }}
            required={required}
          />

          {/* <input
                        placeholder="Your email"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="integration[shop_name]"
                        id="integration_shop_name"
                      /> */}

          {type?.includes("password") && (
            <div
              style={{
                position: "absolute",
                right: "8px",
                top: "12px",
                cursor: "pointer",
              }}
              onClick={() => setOverride(!override)}
            >
              {override ? <FiEyeOff /> : <FiEye />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputCom;
