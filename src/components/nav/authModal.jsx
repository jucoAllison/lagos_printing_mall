import React, { useEffect, useState } from "react";
import Classes from "./nav.module.css";
import { useContext } from "react";
import { MainContext } from "../../App";
import toast from "react-hot-toast";
import { parsePhoneNumber } from "libphonenumber-js";
import { AiOutlineLoading } from "react-icons/ai";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ setShowModal, showModal, inputs, setInputs }) => {
  const navigate = useNavigate();
  const CTX = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [resending, setResending] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    // Trigger resend email logic here
    setTimeLeft(60);
  };

  const resendHandler = async () => {
    if (timeLeft > 1) return;
    if (resending) return;
    setResending(true);
    try {
      const fetched = await fetch(`${CTX.url}v1/account/resend/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        }),
      });

      const jsoned = await fetched.json();
      setResending(false);
      if (jsoned?.m) {
        toast.error(jsoned?.m);
        return;
      }
      toast.success("Confirmation email resent");
      handleResend();
    } catch (error) {
      setResending(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(number, country) {
    try {
      const phone = parsePhoneNumber(number, country);

      return {
        valid: phone.isValid(),
        countryMatch: phone.country === country,
        e164: phone.number,
        national: phone.formatNational(),
        international: phone.formatInternational(),
      };
    } catch {
      return { valid: false, countryMatch: false };
    }
  }

  const sumbitHandler = async () => {
    if (loading) return;

    const valid = validatePhone(inputs?.phone, "NG");
    // console.log("valid =>> ", valid);

    if (showModal != "verify_code") {
      if (!isValidEmail(inputs?.email)) {
        toast.error("Enter a valid email and continue!");
        return;
      }
    }

    if (showModal == "register" && !inputs?.first_name) {
      toast.error("Enter first name and continue!");
      return;
    }

    if (showModal == "register" && !inputs?.last_name) {
      toast.error("Enter last name and continue!");
      return;
    }

    if (showModal == "register" && !valid?.valid) {
      toast.error("Check phone number and continue!");
      return;
    }

    if (showModal == "login") {
      if (!inputs?.password) {
        toast.error("Enter your password and continue!");
        return;
      }
    }

    if (showModal == "register") {
      if (!inputs?.password) {
        toast.error("Enter your password and continue!");
        return;
      }
    }

    localStorage.setItem("email", inputs?.email);

    setLoading(true);

    const url =
      showModal == "login"
        ? `${CTX.url}v1/account/login`
        : showModal == "register"
        ? `${CTX.url}v1/account/create/account`
        : showModal == "verify_code"
        ? `${CTX.url}v1/account/verify_email`
        : `${CTX.url}v1/account/password/reset`;

    try {
      const fetched = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: {
            first: inputs?.first_name,
            last: inputs?.last_name,
          },
          password: inputs?.password,
          phone: valid?.international,
          email: inputs?.email,
          code: inputs?.code,
        }),
      });

      const jsoned = await fetched.json();
      setLoading(false);
      if (jsoned?.m) {
        if (jsoned?.m?.includes("Please verify your email and continue")) {
          resendHandler();
          handleResend();
          setShowModal("verify_code");
        }

        toast(jsoned?.m);
        return;
      }
      // console.log("jsoned?.data =>> ", jsoned?.data);

      if (showModal == "register") {
        handleResend();
        setShowModal("verify_code");
        return;
      }

      if (showModal == "forgot") {
        toast(jsoned?.data);
        setInputs({
          ...inputs,
          email: "",
          code: "",
          phone: "",
          password: "",
          first_name: "",
          last_name: "",
        });
        setShowModal(null);
        return;
      }

      if (showModal == "verify_code") {
        navigate("/account/portfolio");
        localStorage.setItem("token", jsoned?.data);
        CTX.setToken(jsoned?.data);
        setShowModal(null);
      }

      if (showModal == "login") {
        localStorage.setItem("token", jsoned?.data);
        CTX.setToken(jsoned?.data);
        setShowModal(null);
        if (jsoned?.is_admin) {
          navigate("/management/portfolio");
        } else {
          navigate("/account/portfolio");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);
      toast.error("Check your internet connection and continue!");
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setInputs({
            ...inputs,
            email: "",
            code: "",
            phone: "",
            password: "",
            first_name: "",
            last_name: "",
          });
          setShowModal(null);
        }}
        className="modal-backdrop fade show"
      ></div>

      <div
        class={"modal fade modal-overly show"}
        id="exampleModal"
        tabindex="-1"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg res-dialog">
          <div
            className="modal-content"
            style={{ borderRadius: "17px", overflow: "hidden" }}
          >
            <div className="modal-header w-modal-header">
              <div>
                <p className="modal-title gilroy-Semibold text-dark font-[Righteous]">
                  {showModal == "login"
                    ? "Sign in"
                    : showModal == "verify_code"
                    ? "Verify your email address"
                    : showModal == "forgot"
                    ? "Forgot password"
                    : "Register"}
                </p>
                <div className="text-[14px] font-[400] text-[#000]">
                  {showModal == "login"
                    ? "Enter your email and password to log in to your account. This lets you securely access your personal dashboard and features."
                    : showModal == "verify_code"
                    ? ` Thanks for registering! 🎉 We’ve sent a verification code to ${
                        localStorage.getItem("email")
                          ? localStorage.getItem("email")
                          : ""
                      }. Please check your inbox (and your spam or junk folder, just in case) and enter the code below to verify your account and continue.`
                    : showModal == "forgot"
                    ? "Enter your registered email address, and we’ll send you instructions to reset your password securely. Follow the instructions in the email and regain access to your account."
                    : "Enter your details to create a new account. Once registered, you’ll be able to access all features and personalize your experience."}
                </div>
              </div>

              <div style={{ width: "40px" }}>
                <FaRegWindowClose
                  onClick={() => {
                    setInputs({
                      ...inputs,
                      email: "",
                      code: "",
                      phone: "",
                      password: "",
                      first_name: "",
                      last_name: "",
                    });
                    setShowModal(null);
                  }}
                  color="#000"
                  size={25}
                />
              </div>
            </div>
            <div className="modal-body modal-body-pxy">
              <div>
                {showModal == "login" ? (
                  <div
                    className={Classes.search_round}
                    style={{ maxWidth: "100%" }}
                  >
                    <input
                      placeholder="Email Address"
                      className={Classes.inputNavStuff}
                      type="email"
                      style={{ textTransform: "none" }}
                      value={inputs?.email}
                      onChange={(e) =>
                        setInputs({ ...inputs, email: e.target.value })
                      }
                    />
                  </div>
                ) : showModal == "forgot" ? (
                  <div
                    className={Classes.search_round}
                    style={{ maxWidth: "100%" }}
                  >
                    <input
                      placeholder="Email Address"
                      className={Classes.inputNavStuff}
                      type="email"
                      style={{ textTransform: "none" }}
                      value={inputs?.email}
                      onChange={(e) =>
                        setInputs({ ...inputs, email: e.target.value })
                      }
                    />
                  </div>
                ) : null}

                {showModal == "verify_code" && (
                  <div
                    className={Classes.search_round}
                    style={{ maxWidth: "100%" }}
                  >
                    <input
                      placeholder="Verification Code"
                      className={Classes.inputNavStuff}
                      type="text"
                      value={inputs?.code}
                      onChange={(e) =>
                        setInputs({ ...inputs, code: e.target.value })
                      }
                    />
                  </div>
                )}

                {showModal == "register" && (
                  <div className={Classes.grid_stuff}>
                    <div
                      className={Classes.search_round}
                      style={{ maxWidth: "100%" }}
                    >
                      <input
                        placeholder="First Name"
                        style={{ textTransform: "none" }}
                        className={Classes.inputNavStuff}
                        value={inputs?.first_name}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div
                      className={Classes.search_round}
                      style={{ maxWidth: "100%" }}
                    >
                      <input
                        placeholder="Last Name"
                        style={{ textTransform: "none" }}
                        className={Classes.inputNavStuff}
                        value={inputs?.last_name}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div
                      className={Classes.search_round}
                      style={{ maxWidth: "100%" }}
                    >
                      <input
                        placeholder="Email Address"
                        className={Classes.inputNavStuff}
                        type="email"
                        style={{ textTransform: "none" }}
                        value={inputs?.email}
                        onChange={(e) =>
                          setInputs({ ...inputs, email: e.target.value })
                        }
                      />
                    </div>

                    <div
                      className={Classes.search_round}
                      style={{ position: "relative", maxWidth: "100%" }}
                    >
                      <div style={{ color: "gray", padding: "0px 10px" }}>
                        +234
                      </div>
                      <input
                        placeholder="Phone number"
                        type="text"
                        style={{
                          paddingLeft: "10px",
                          borderLeft: "1px solid #999",
                          textTransform: "none",
                        }}
                        className={Classes.inputNavStuff}
                        value={inputs?.phone}
                        onChange={(e) => {
                          const newValue = e.target.value.replace(/\D/g, "");

                          setInputs({ ...inputs, phone: newValue });
                        }}
                      />
                    </div>
                  </div>
                )}
                {showModal == "login" ? (
                  <div
                    style={{
                      marginTop: "20px",
                      position: "relative",
                      maxWidth: "100%",
                    }}
                    className={Classes.search_round}
                  >
                    <input
                      placeholder="Password"
                      className={Classes.inputNavStuff}
                      type={isPassword ? "password" : "text"}
                      style={{ textTransform: "none" }}
                      value={inputs?.password}
                      onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                      }
                    />

                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "11px",
                      }}
                      onClick={() => {
                        setIsPassword(!isPassword);
                      }}
                    >
                      {isPassword ? (
                        <IoMdEye size={21} color="#000" />
                      ) : (
                        <IoMdEyeOff size={21} color="#000" />
                      )}
                    </div>
                  </div>
                ) : showModal == "register" ? (
                  <div
                    style={{
                      marginTop: "20px",
                      position: "relative",
                      maxWidth: "100%",
                    }}
                    className={Classes.search_round}
                  >
                    <input
                      placeholder="Password"
                      className={Classes.inputNavStuff}
                      type={isPassword ? "password" : "text"}
                      style={{ textTransform: "none" }}
                      value={inputs?.password}
                      onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                      }
                    />

                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "11px",
                      }}
                      onClick={() => {
                        setIsPassword(!isPassword);
                      }}
                    >
                      {isPassword ? (
                        <IoMdEye size={21} color="#000" />
                      ) : (
                        <IoMdEyeOff size={21} color="#000" />
                      )}
                    </div>
                  </div>
                ) : null}

                <div
                  className="mt-[20px] flex items-center justify-center gap-[10px] text-[#fff] bg-[#ee2490] rounded-[400px] px-[25px] h-[44px]"
                  style={{
                    boxShadow: "1px 1px 10px #00000012",
                    fontWeight: "bold",
                  }}
                  onClick={() => sumbitHandler()}
                >
                  {loading && (
                    <AiOutlineLoading
                      className="animate-spin h-[20px] w-[20px] mr-1 "
                      color="#fff"
                    />
                  )}
                  <span>Submit</span>

                  {/* <FaArrowRightLong /> */}
                </div>

                {showModal == "register" ? (
                  <p
                    className="font-[outfit] text-[15px] text-[#000] "
                    style={{
                      maxWidth: "90%",
                      width: "500px",
                      margin: "26px auto 0px auto",
                      textAlign: "center",
                    }}
                  >
                    By signing up, you indicate that you have read, understood
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
                  </p>
                ) : showModal == "login" ? (
                  <p
                    className="font-[outfit] text-[15px] text-[#000] "
                    style={{
                      maxWidth: "90%",
                      width: "500px",
                      margin: "26px auto 0px auto",
                      textAlign: "center",
                    }}
                    onClick={() => setShowModal("forgot")}
                  >
                    <span
                      style={{
                        color: "#ee2490",
                        textDecoration: "underline",
                      }}
                    >
                      Forgot your password?
                    </span>
                  </p>
                ) : showModal == "verify_code" ? (
                  <p
                    className="font-[outfit] text-[15px] text-[#000] "
                    style={{
                      maxWidth: "90%",
                      width: "500px",
                      margin: "26px auto 0px auto",
                      textAlign: "center",
                    }}
                  >
                    Didn’t receive the email? Please check your spam or junk
                    folder, confirm your email address{" "}
                    {localStorage.getItem("email")
                      ? localStorage.getItem("email")
                      : ""}{" "}
                    is correct, and wait a few minutes before trying again.{" "}
                    <span
                      onClick={resendHandler}
                      className="flex items-center justify-center"
                      style={{
                        color: "#ee2490",
                        textDecoration: "underline",
                      }}
                    >
                      Resend Code {timeLeft > 1 && timeLeft}{" "}
                      {resending && (
                        <AiOutlineLoading
                          className="animate-spin h-[20px] w-[20px] ml-1 "
                          color="#ee2490"
                        />
                      )}
                    </span>
                  </p>
                ) : null}

                {showModal == "login" ? (
                  <p
                    className="font-[outfit] text-[15px] text-[#000] "
                    style={{
                      maxWidth: "90%",
                      width: "500px",
                      margin: "26px auto 0px auto",
                      textAlign: "center",
                    }}
                  >
                    New to Lagos Printing Mall?{" "}
                    <span
                      style={{
                        color: "#ee2490",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowModal("register")}
                    >
                      Register
                    </span>
                  </p>
                ) : showModal == "verify_code" ? null : (
                  <p
                    className="font-[outfit] text-[15px] text-[#000] "
                    style={{
                      maxWidth: "90%",
                      width: "500px",
                      margin: "26px auto 0px auto",
                      textAlign: "center",
                    }}
                  >
                    {showModal == "forgot"
                      ? "Remember account password?"
                      : "Already have an account?"}{" "}
                    <span
                      style={{
                        color: "#ee2490",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowModal("login")}
                    >
                      Sign in
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
