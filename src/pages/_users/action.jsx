import React, { useContext, useEffect, useState } from "react";
import Classes from "../dashboard/dash.module.css";
import { MainContext } from "../../App";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import clsx from "clsx";
import { AiOutlineLoading } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";

const Action = ({ setPassword, password }) => {
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
      const fetched = await fetch(
        `${CTX.url}v1/su/update/profile/${password?.user?._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `bearer ${CTX.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: {
              first: inputs?.name?.first,
              last: inputs?.name?.last,
            },
            city: inputs?.city,
            state: inputs?.state,
            is_suspended: inputs?.is_suspended,
            suspended_reason: inputs?.suspended_reason,
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
      setPassword(null);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  const deleteHandler = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const fetched = await fetch(
        `${CTX.url}v1/su/delete/user/${password?.user?._id}`,
        {
          method: "DELETE",
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
      window.location.reload();
      setPassword(null);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  useEffect(() => {
    if (!password) return;
    setInputs({ ...password?.user, role: "user" });
  }, [password]);

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
                {password?.action == "delete" ? "DELETE user" : "EDIT user"}
              </p>

              <IoClose
                color="#3f405b"
                size={22}
                onClick={() => setPassword(null)}
              />
            </div>

            {password?.action == "delete" && (
              <>
                <div
                  style={{
                    fontSize: "12px",
                    // textTransform: "capitalize",
                  }}
                  className={Classes.titleDataHere}
                >
                  You’re about to delete this user. This action cannot be
                  undone.
                </div>

                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="label-top mt-[20px] relative">
                    <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                      First name
                    </label>
                    <input
                      value={inputs?.name?.first}
                      style={{ backgroundColor: "#c5c6Ca" }}
                      readOnly
                      className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                      name="first_name"
                      placeholder="First name"
                      required
                      type={"text"}
                    />
                  </div>

                  <div className="label-top mt-[20px] relative">
                    <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                      Last name
                    </label>
                    <input
                      value={inputs?.name?.last}
                      style={{ backgroundColor: "#c5c6Ca" }}
                      readOnly
                      className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                      name="last_name"
                      placeholder="Last name"
                      required
                      type={"text"}
                    />
                  </div>
                </div>

                <div className="label-top mt-[20px] relative">
                  <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                    Email
                  </label>
                  <input
                    value={inputs?.email}
                    readOnly
                    className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                    style={{ backgroundColor: "#c5c6Ca" }}
                  />
                </div>

                <button
                  onClick={deleteHandler}
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
                      className="animate-spin h-[20px] w-[20px] mr-1"
                      color={"#fff"}
                    />
                  )}
                  Delete user <HiChevronRight />{" "}
                </button>
              </>
            )}

            {password?.action == "edit" && (
              <form onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="label-top mt-[20px] relative">
                    <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                      First name
                    </label>
                    <input
                      value={inputs?.name?.first}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          name: { ...inputs?.name, first: e.target.value },
                        })
                      }
                      className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                      name="first_name"
                      placeholder="First name"
                      required
                      type={"text"}
                    />
                  </div>

                  <div className="label-top mt-[20px] relative">
                    <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                      Last name
                    </label>
                    <input
                      value={inputs?.name?.last}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          name: { ...inputs?.name, last: e.target.value },
                        })
                      }
                      className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                      name="last_name"
                      placeholder="Last name"
                      required
                      type={"text"}
                    />
                  </div>
                </div>

                <div className="label-top mt-[20px] relative">
                  <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                    Email
                  </label>
                  <input
                    value={inputs?.email}
                    readOnly
                    className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                    style={{ backgroundColor: "#c5c6Ca" }}
                  />
                </div>

                <div className="label-top mt-[20px] relative">
                  <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                    Phone
                  </label>
                  <input
                    value={inputs?.phone}
                    readOnly
                    className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                    style={{ backgroundColor: "#c5c6Ca" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-[20px]">
                  <div className="label-top mt-[20px] relative">
                    <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                      City
                    </label>
                    <input
                      value={inputs?.city}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          city: e.target.value,
                        })
                      }
                      className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                      name="city"
                      placeholder="city"
                      type={"text"}
                    />
                  </div>

                  <div className="label-top mt-[20px] relative">
                    <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                      State
                    </label>
                    <input
                      value={inputs?.state}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          state: e.target.value,
                        })
                      }
                      className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                      name="state"
                      placeholder="State"
                      type={"text"}
                    />
                  </div>
                </div>

                <div className="flex items-center mt-7 ">
                  <div
                    style={{
                      fontSize: "12px",
                      // textTransform: "capitalize",
                    }}
                    className={Classes.titleDataHere}
                  >
                    Do you have a final print-ready design?
                  </div>

                  <input
                    className={Classes.preferenceInput}
                    type="checkbox"
                    checked={inputs?.is_suspended}
                    onChange={() => {
                      setInputs({
                        ...inputs,
                        is_suspended: !inputs?.is_suspended,
                      });
                    }}
                  />
                </div>

                {inputs?.is_suspended && (
                  <div className="label-top mt-[20px] relative">
                    <label className="gilroy-medium text-[#6a6b87] mb-2 text-[14px] r-mt-amount r-mt-6">
                      Suspension reason
                    </label>
                    <textarea
                      rows="7"
                      value={inputs?.suspended_reason}
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          suspended_reason: e.target.value,
                        })
                      }
                      className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                      name="suspended_reason"
                      placeholder=". . ."
                      style={{
                        height: "max-content",
                      }}
                    />
                  </div>
                )}

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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Action;
