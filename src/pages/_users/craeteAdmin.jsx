import React, { useContext, useState } from "react";
import Classes from "../dashboard/dash.module.css";
import { MainContext } from "../../App";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";

const CraeteAdmin = ({ setPassword, password }) => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ role: "user" });
  const CTX = useContext(MainContext);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!inputs?.email) {
      toast.error("Fill email and continue");
      return true;
    }
    if (!isValidEmail(inputs?.email)) {
      toast.error("Enter a valid email and continue!");
      return;
    }

    setLoading(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/su/toggle/position`, {
        method: "POST",
        headers: {
          Authorization: `bearer ${CTX.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs?.email?.trim(),
          type: inputs?.role,
        }),
      });

      const jsoned = await fetched.json();
      setLoading(false);
      if (jsoned?.m) {
        toast.error(jsoned?.m);
        return;
      }
    //   window.location.reload();
      setPassword(false);
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
                Admin
              </p>

              <IoClose
                color="#3f405b"
                size={22}
                onClick={() => setPassword(!password)}
              />
            </div>

            <form onSubmit={submitHandler}>
              <div className="label-top mt-[20px] relative">
                <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                  Email Address
                </label>
                <input
                  value={inputs?.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                  className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                  name="email"
                  placeholder="Email Address"
                  required
                  type={"text"}
                />
              </div>

              <div className="label-top mt-[20px] relative">
                <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                  Role
                </label>
                <select
                  className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                  onChange={(e) =>
                    setInputs({ ...inputs, role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                {/* <input
                  value={inputs?.email}
                  
                  name="email"
                  placeholder="Email Address"
                  required
                  type={"text"}
                /> */}
              </div>

              <button
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

export default CraeteAdmin;
