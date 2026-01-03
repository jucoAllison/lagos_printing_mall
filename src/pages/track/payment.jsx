import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../App";
import clsx from "clsx";
import { HiChevronRight } from "react-icons/hi";
import Classes from "./track.module.css";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { AiOutlineLoading } from "react-icons/ai";
import { payWithPaystack } from "../../components/paystack";

const Payment = ({ data }) => {
  const CTX = useContext(MainContext);
  const anchorRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true);
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [isfund, setIsfund] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hascommission, setHasCommission] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    if (anchorRef.current) observer.observe(anchorRef.current);
    return () => observer.disconnect();
  }, []);

  const makePaymentHandler = () => {
    if (!checked)
      return toast.error(
        "Agree to our terms and services before you will continue"
      );

    if (!CTX.token) return CTX.setShowModal("login");

    setModal(true);
  };

  const sendBackend = async (is_fund) => {
    if (loading) return;
    setLoading(true);
    try {
      const fetched = await fetch(
        `${CTX.url}v1/account/pay/for/order/${data?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CTX.token}`,
          },
          body: JSON.stringify({
            is_fund,
          }),
        }
      );
      setLoading(false);
      const jsoned = await fetched.json();
      if (jsoned?.m) {
        toast.error(jsoned?.m);
        return;
      }
      setModal(false);
      if (jsoned?.has_commission) {
        setHasCommission(jsoned?.has_commission);
        return;
      }

      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  const handlePayment = () => {
    payWithPaystack({
      email: CTX.userObj?.email,
      amount: parseFloat(data?.amount),
      onSuccess: async (response) => {
        // console.log("Payment success:", response.reference);
        // Send reference to backend for verification

        setLoading(true);
        try {
          const fetched = await fetch(
            `${CTX.url}v1/account/pay/for/order/${data?._id}`,
            {
              method: "POST",
              headers: {
                Authorization: `bearer ${CTX.token}`,
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                is_fund: false,
                reference: response.reference,
              }),
            }
          );

          const jsoned = await fetched.json();
          setLoading(false);
          if (jsoned?.m) {
            toast.error(jsoned?.m);
            return;
          }
          setModal(false);
          toast.success(jsoned?.data);
          if (jsoned?.has_commission) {
            setHasCommission(jsoned?.has_commission);
            return;
          }
          window.location.reload();
        } catch (error) {
          setLoading(false);
          console.log("Error => ", error);
          toast.error("Check your internet connection and continue!");
        }
      },
      onClose: () => {
        alert("Payment cancelled");
      },
    });
  };

  const paynowHandler = () => {
    if (isfund) {
      const calcAllAmount = CTX.userObj.balance + CTX.userObj.commission;
      if (calcAllAmount <= data?.amount) {
        toast("Account fund cannot cover the order amount");
        return;
      }
      // now send to the backend
      sendBackend(true);
      return;
    } else {
      handlePayment();
    }
  };

  return (
    <>
      {hascommission && (
        <div className={Classes.modalMainCover}>
          <div className={Classes.fessInsideMainCover}>
            <div className={Classes.modalContent}>
              <div
                className="flex items-center justify-between pb-[17px] mb-[20px]"
                style={{
                  borderBottom: "1px solid #e0dfef",
                  fontFamily: "outfit",
                }}
              >
                <p className="mb-0 gilroy-Semibold text-[18px] font-[500] text-[#3f405b] theme-tran r-f-20 text-capitalize">
                  Congratulation 🎉
                </p>
              </div>

              <p className="font-[outfit] font-bold text-[15px] text-[#000] mt-4">
                You’ve Earned a Reward 🎁
              </p>

              <p className="font-[outfit] text-[15px] text-[#000] mt-4">
                Payment successful! A small reward has been added to your
                account as commission and can be used on your next order. Your
                order is now being processed.
              </p>

              <button
                onClick={() => {
                  window.location.reload();
                  setHasCommission(false);
                }}
                type="button"
                className={clsx([
                  "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent",
                ])}
                style={{
                  width: "max-content",
                  fontFamily: "Outfit",
                  color: "#fff",
                  backgroundColor: "#ee2490",
                  borderRadius: "12px",
                  border: "none",
                  marginTop: "20px",
                }}
              >
                Continue <HiChevronRight />{" "}
              </button>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div className={Classes.modalMainCover}>
          <div className={Classes.fessInsideMainCover}>
            <div className={Classes.modalContent}>
              <div
                className="flex items-center justify-between pb-[17px] mb-[20px]"
                style={{
                  borderBottom: "1px solid #e0dfef",
                  fontFamily: "outfit",
                }}
              >
                <p className="mb-0 gilroy-Semibold text-[18px] font-[500] text-[#3f405b] theme-tran r-f-20 text-capitalize">
                  Confirm Order
                </p>

                <IoClose
                  color="#3f405b"
                  size={22}
                  onClick={() => setModal(!modal)}
                />
              </div>

              <p className=" text-[17px]">
                Subtotal:{" "}
                <strong className="ml-1">
                  ₦{data?.amount?.toLocaleString()}
                </strong>
              </p>

              <div className="flex items-center font-[outfit] text-[15px] text-[#000] mt-2 mb-2 gap-[10px]">
                <input
                  type="checkbox"
                  checked={isfund}
                  onChange={() => setIsfund(true)}
                />{" "}
                <div className="flex flex-col">
                  <label>
                    Charge from account funds{" "}
                    <span className="ml-1 font-bold">
                      ₦{CTX?.userObj?.balance?.toLocaleString()}
                    </span>
                  </label>

                  <label className="text-[13px] text-[#ee2490]">
                    plus commission{" "}
                    <span className="ml-1">
                      ₦{CTX?.userObj?.commission?.toLocaleString()}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center font-[outfit] text-[15px] text-[#000] mt-4 mb-2 gap-[10px]">
                <input
                  type="checkbox"
                  checked={!isfund}
                  onChange={() => setIsfund(false)}
                />{" "}
                <label>Continue with PayStack</label>
              </div>

              {/* // Classes.shopNowBTN,
            // onClick={submitHandler} */}

              <button
                onClick={paynowHandler}
                type="button"
                className={clsx([
                  "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent",
                ])}
                style={{
                  width: "max-content",
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
                Pay now <HiChevronRight />{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      <div ref={anchorRef} style={{ marginTop: "20px" }}>
        <div className={Classes.centdataerit}>
          <div className="flex items-center font-[outfit] text-[15px] text-[#000] mt-2 gap-[20px]">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />{" "}
            <label>
              Before making payment, you indicate that you have read, understood
              and agree to Lagos Printing Mall{" "}
              <span
                style={{
                  color: "#ee2490",
                  textDecoration: "underline",
                }}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                style={{
                  color: "#ee2490",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </span>
            </label>
          </div>

          <div>
            <button
              onClick={makePaymentHandler}
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
              Checkout ₦{data?.amount?.toLocaleString()} <HiChevronRight />{" "}
            </button>
          </div>

          {/* {CTX?. } */}
        </div>
      </div>
      {isFixed && (
        <div className={Classes.checkoutCover}>
          <div className={Classes.centdataerit}>
            <div className="flex items-center font-[outfit] text-[15px] text-[#000] mt-2 gap-[20px]">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />{" "}
              <label>
                Before making payment, you indicate that you have read,
                understood and agree to Lagos Printing Mall{" "}
                <span
                  style={{
                    color: "#ee2490",
                    textDecoration: "underline",
                  }}
                >
                  Terms of Service
                </span>{" "}
                and{" "}
                <span
                  style={{
                    color: "#ee2490",
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </span>
              </label>
            </div>

            <div>
              <button
                onClick={makePaymentHandler}
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
                Checkout ₦{data?.amount?.toLocaleString()} <HiChevronRight />{" "}
              </button>
            </div>

            {/* {CTX?. } */}
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
