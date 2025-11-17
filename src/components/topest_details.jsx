import React from "react";

const TopestDetails = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "29px",
        // backgroundColor: "#f9a4cb",
        backgroundColor: "#822b58",
        // color: "#822b58",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
          gap: "7px",
          fontWeight: "bold",
          fontFamily: "Open Sans",
          fontSize: "13px",
        }}
      >
        <div>Become an affiliate</div>
        <div style={{textDecoration: "underline"}}>Join now!</div>
      </div>
    </div>
  );
};

export default TopestDetails;
