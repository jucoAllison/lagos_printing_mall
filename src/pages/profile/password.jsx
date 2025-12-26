import React, { useContext, useState } from "react";
import Classes from "../dashboard/dash.module.css";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import { MainContext } from "../../App";
import { AiOutlineLoading } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";

const Password = ({ password, setPassword }) => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const CTX = useContext(MainContext);
  const [showCon, setShowCon] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showOld, setShowOld] = useState(false);

  const submitHandler = async () => {
    if (loading) return;
    if (inputs?.new?.toLowerCase() !== inputs?.con?.toLowerCase()) {
      return toast("Passwords do not match!");
    }
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
      toast.success(jsoned?.data);
      setPassword(false)
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  return (
    <>
      <div className={Classes.modalMainCover}>
        <div className={Classes.fessInsideMainCover}>
          <div className={Classes.modalContent}>
            <div
              className="flex items-center justify-between pb-[17px]"
              style={{
                borderBottom: "1px solid #e0dfef",
                fontFamily: "outfit",
              }}
            >
              <p className="mb-0 gilroy-Semibold text-[18px] font-[500] text-[#3f405b] theme-tran r-f-20 text-capitalize">
                Change Password
              </p>

              <IoClose
                color="#3f405b"
                size={22}
                onClick={() => setPassword(!password)}
              />
            </div>

            <form>
              <div className="label-top mt-[20px] relative">
                <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                  Old Password
                </label>
                <input
                  value={inputs?.old}
                  onChange={(e) =>
                    setInputs({ ...inputs, old: e.target.value })
                  }
                  className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                  name="old_password"
                  placeholder="Old Password"
                  required
                  type={showOld ? "text" : "password"}
                />

                <div
                  className="absolute right-[20px] top-[44px]"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? (
                    <IoMdEyeOff color="#3f405b" size={17} />
                  ) : (
                    <IoMdEye color="#3f405b" size={17} />
                  )}
                </div>
              </div>

              <div className="label-top mt-[20px] relative">
                <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                  New Password
                </label>
                <input
                  value={inputs?.new}
                  onChange={(e) =>
                    setInputs({ ...inputs, new: e.target.value })
                  }
                  type={showNew ? "text" : "password"}
                  className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                  name="old_password"
                  placeholder="New Password"
                  required
                />

                <div
                  className="absolute right-[20px] top-[44px]"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? (
                    <IoMdEyeOff color="#3f405b" size={17} />
                  ) : (
                    <IoMdEye color="#3f405b" size={17} />
                  )}
                </div>
              </div>

              <div className="label-top mt-[20px] relative">
                <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                  Confirm Password
                </label>
                <input
                  value={inputs?.con}
                  onChange={(e) =>
                    setInputs({ ...inputs, con: e.target.value })
                  }
                  type={showCon ? "text" : "password"}
                  className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                  name="old_password"
                  placeholder="Confirm Password"
                  required
                />

                <div
                  className="absolute right-[20px] top-[44px]"
                  onClick={() => setShowCon(!showCon)}
                >
                  {showCon ? (
                    <IoMdEyeOff color="#3f405b" size={17} />
                  ) : (
                    <IoMdEye color="#3f405b" size={17} />
                  )}
                </div>
              </div>

              <button
                onClick={submitHandler}
                type="button"
                className={clsx([
                  Classes.shopNowBTN,
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
