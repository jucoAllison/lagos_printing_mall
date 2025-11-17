import React from "react";
import Classes from "./loading.module.css";
import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className={Classes.mainLoadingCover}>
      <AiOutlineLoading className="animate-spin " color="#777" size={"60px"} />
    </div>
  );
};

export default Loading;
