import React from "react";
import Classes from "./home.module.css";
import clsx from "clsx";
import chiudo from "../../assets/chiudo_creative.png";

const SomeOfOurClient = () => {
  const mappedCLs = Array(30)
    .fill("sfsf")
    .map((v, i) => (
      <div
        // className="min-w-[160px] w-[160px] h-[160px]"
        style={{
              border: "2px solid #e0e0d7",
          minWidth: "max-content",
          height: "max-content",
        }}
        key={i}
      >
        <img
          src="https://printify.com/pfh/assets/publishers/business-insider.svg"
          alt="clients"
        />
      </div>
    ));

  return (
    <div
      className="mt-[50px]"
      style={{
        backgroundColor: "#37356432",
        height: "200px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* <div className="text-center font-bold sm:text-[44px] text-[24px] font-[Righteous]">
        
      </div> */}
      <div
        className={Classes.products_cover}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className={Classes.majorBrands}>
          We are <span style={{ color: "#ed258f" }}> trusted </span> by major
          global brands
        </div>
        <div className={clsx([Classes.clients_cover, "no-scrollbar"])}>
          <div
            style={{
              border: "0px solid #e0e0d7",
              minWidth: "max-content",
            }}
          >
            <img className={Classes.eachimg} src={chiudo} alt="clients" />
          </div>

          {mappedCLs}
        </div>
      </div>
    </div>
  );
};

export default SomeOfOurClient;
