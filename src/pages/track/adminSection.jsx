import React, { useContext, useState } from "react";
import InputCom from "../../components/input/input";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import { MainContext } from "../../App";
import clsx from "clsx";
import { HiChevronRight } from "react-icons/hi";

const AdminSection = ({ data }) => {
  const CTX = useContext(MainContext);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const setAmountHandler = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/account/change/password`, {
        method: "PUT",
        headers: {
          Authorization: `bearer ${CTX.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          old_password: inputs?.old,
          password: inputs?.new,
        }),
      });

      const jsoned = await fetched.json();
      setLoading(false);
      if (jsoned?.m) {
        toast.error(jsoned?.m);
        return;
      }
      window.location.reload();
      //   toast.success(jsoned?.data);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };
  return (
    <div
      className="shadow-sm p-[20px] mb-[40px]"
      style={{ border: "1px solid #111" }}
    >
      <p className="font-[outfit] text-[15px] text-[#000] mt-4">
        You are only seeing this because you are a management!{" "}
        {data?.status?.includes("awaiting_confirmation") &&
          `this order is awaiting confirmation, confirm details with ${data?.details?.name?.first} ${data?.details?.name?.last} personally either with phone call or whatsapp details are below. After confirmation with ${data?.details?.name?.first} ${data?.details?.name?.last}, set amount so they can proceed with payment`}
        <div className="mt-3">
          <InputCom
            label={"Order price"}
            placeholder={"Amount"}
            required
            value={inputs?.price}
            type={"text"}
            inputStyles={{ backgroundColor: "#88899999" }}
            onChange={(e) => {
              const newValue = e.target.value.replace(/\D/g, "");

              setInputs({ ...inputs, price: newValue });
            }}
          />
        </div>
        <button
          onClick={setAmountHandler}
          type="button"
          className={clsx([
            "text3xlFontBoldUnderline",
            "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent",
          ])}
          style={{
            fontFamily: "Outfit",
            color: "#fff",
            backgroundColor: "#ee2490",
            borderRadius: "12px",
            border: "none",
            marginTop: "20px",
          }}
        >
          {loading && (
            <AiOutlineLoading
              className="animate-spin h-[20px] w-[20px] mr-1 ml-auto"
              color={"#fff"}
            />
          )}
          Submit <HiChevronRight />{" "}
        </button>
      </p>
    </div>
  );
};

export default AdminSection;
