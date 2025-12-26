import React, { useContext, useState } from "react";
import Classes from "./dash.module.css";
import clsx from "clsx";
import { HiChevronRight } from "react-icons/hi";
import { payWithPaystack } from "../../components/paystack";
import toast from "react-hot-toast";
import { MainContext } from "../../App";
import { AiOutlineLoading } from "react-icons/ai";

const Fund = ({ fund, setFund }) => {
  const CTX = useContext(MainContext);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    payWithPaystack({
      email: CTX.userObj?.email,
      amount: parseFloat(inputs?.amount),
      onSuccess: async (response) => {
        console.log("Payment success:", response.reference);
        // Send reference to backend for verification

        setLoading(true);
        try {
          const fetched = await fetch(
            `${CTX.url}v1/account/fund/account/${response.reference}`,
            {
              method: "GET",
              headers: {
                Authorization: `bearer ${CTX.token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const jsoned = await fetched.json();
          setLoading(false);
          if (jsoned?.m) {
            toast.error(jsoned?.m);
            return;
          }
          setFund(false);
          toast.success(jsoned?.data);
        } catch (error) {
          setLoading(false);
          console.log("Error => ", error);
          toast.error("Check your internet connection and continue!");
        }
      },
      onClose: () => {
        alert("Payment cancelled");
        setFund(false);
      },
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        style={{
          backdropFilter: "blur(0.3rem)",
          zIndex: "10",
          background: "rgba(33,33,33,.6)",
        }}
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0"
          style={{ padding: "17px" }}
        >
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            style={{ width: "100%" }}
          >
            <div
              className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 p-[300px]"
              style={{ width: "100%", padding: "17px" }}
            >
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: "-20px",
                  fontFamily: "Outfit",
                }}
              >
                Fund your account
              </h1>

              <div className="label-top mt-[20px] relative">
                <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                  Amount
                </label>
                <input
                  value={inputs?.amount}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, "");

                    setInputs({ ...inputs, amount: newValue });
                  }}
                  className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                  name="first_name"
                  placeholder="5,000"
                  required
                  type={"text"}
                />
              </div>

              <div className="mt-[20px] flex gap-[17px] justify-between">
                <h2
                  onClick={() => setFund(false)}
                  className={Classes.authSubheaderTitleSecondaryWhiteBlackColor}
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "-1px",
                    justifyContent: "center",
                    fontFamily: "outfit",
                  }}
                >
                  {/* {loadingResend && (
                          <AiOutlineLoading className="animate-spin h-5 w-5 mr-3" />
                        )} */}
                  Cancel
                </h2>

                <button
                  onClick={() => {
                    if (parseFloat(inputs?.amount) > 999) {
                      handlePayment();
                    } else if (!inputs?.amount) {
                      return;
                    } else {
                      toast.error("Amount too small");
                    }
                  }}
                  // onClick={() => {
                  //   console.log("import.meta.env.PAYSTACK_TEXT_PUBLIC_KEY =>>> ", import.meta.env.VITE_PAYSTACK_PUBLIC_KEY)
                  // }}
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
                  Submit <HiChevronRight />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fund;
