import React, { useContext, useState } from "react";
import InputCom from "../../components/input/input";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import { MainContext } from "../../App";
import clsx from "clsx";
import { HiChevronRight } from "react-icons/hi";
import Classes from "../product/product.module.css";
import { IoClose } from "react-icons/io5";
import Styles from "./track.module.css";

const AdminSection = ({ data, updating, setUpdating }) => {
  const CTX = useContext(MainContext);
  const [inputs, setInputs] = useState({ has_commission: false });
  const [loading, setLoading] = useState(false);

  const setAmountHandler = async () => {
    if (loading) return;

    if (!inputs?.price) {
      return toast("Enter order price price to continue");
    }

    setLoading(true);
    try {
      const fetched = await fetch(
        `${CTX.url}v1/su/order/await_payment/${data?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `bearer ${CTX.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: +inputs?.price,
            has_commission: inputs?.has_commission,
            commission_amount: +inputs?.commission_amount,
          }),
        }
      );

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
    <>
      

      <div
        className="shadow-sm p-[20px] mb-[40px]"
        style={{ border: "1px solid #111" }}
      >
        {data?.status?.includes("awaiting_confirmation") && (
          <p className="font-[outfit] text-[15px] text-[#000] mt-4">
            You are only seeing this because you are a management! this order is
            awaiting confirmation, confirm details with{" "}
            <strong>
              {data?.details?.name?.first} {data?.details?.name?.last}
            </strong>{" "}
            personally either with phone call or whatsapp details are below.
            After confirmation with{" "}
            <strong>
              {data?.details?.name?.first} {data?.details?.name?.last},
            </strong>{" "}
            set amount so they can proceed with payment
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
            <div className="flex items-center mt-3 ">
              <div
                style={{
                  fontSize: "12px",
                  // textTransform: "capitalize",
                }}
                className={Classes.titleDataHere}
              >
                Has commission?
              </div>

              <input
                className={Classes.preferenceInput}
                type="checkbox"
                checked={inputs?.has_commission}
                onChange={() => {
                  setInputs({
                    ...inputs,
                    has_commission: !inputs?.has_commission,
                  });
                }}
              />
            </div>
            {inputs?.has_commission && (
              <div className="mt-1">
                <InputCom
                  label={"Commission amount"}
                  placeholder={"Commission amount"}
                  required
                  value={inputs?.commission_amount}
                  type={"text"}
                  inputStyles={{ backgroundColor: "#88899999" }}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, "");

                    setInputs({ ...inputs, commission_amount: newValue });
                  }}
                />
              </div>
            )}
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
                  className="animate-spin h-[20px] w-[20px] mr-1"
                  color={"#fff"}
                />
              )}
              Submit <HiChevronRight />{" "}
            </button>
          </p>
        )}

        {data?.status?.includes("awaiting_payment") && (
          <p className="font-[outfit] text-[15px] text-[#000] mt-4">
            The order is currently awaiting payment. Please contact the user to
            complete the payment before any further action can take place
          </p>
        )}

        {data?.status?.includes("pending") && (
          <>
            <p className="font-[outfit] text-[15px] text-[#000] mt-4">
              This order is currently pending. Management can review the order
              and take action by updating the order status to Completed or
              Refunded. Alternatively, the order progress can be updated by
              adding a note that reflects the current or exact status of the
              order.
            </p>

            <div className="flex sm:flex-row flex-col gap-[20px] items-center">
              <button
                onClick={() => setUpdating("status")}
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
                  margin: "0px",
                }}
              >
                {loading && (
                  <AiOutlineLoading
                    className="animate-spin h-[20px] w-[20px] mr-1"
                    color={"#fff"}
                  />
                )}
                Change Status <HiChevronRight />{" "}
              </button>

              <button
                onClick={() => setUpdating("progress")}
                type="button"
                className={clsx([
                  "text3xlFontBoldUnderline",
                  "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent",
                ])}
                style={{
                  fontFamily: "Outfit",
                  color: "#fff",
                  background: "#2196F3",
                  borderRadius: "12px",
                  border: "none",
                  margin: "0px",
                }}
              >
                {loading && (
                  <AiOutlineLoading
                    className="animate-spin h-[20px] w-[20px] mr-1"
                    color={"#fff"}
                  />
                )}
                Update Progress <HiChevronRight />{" "}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminSection;
