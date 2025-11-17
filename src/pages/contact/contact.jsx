import React, { useState } from "react";
import Classes from "./contact.module.css";
import InputCom from "../../components/input/input";
import { HiChevronRight } from "react-icons/hi";
import clsx from "clsx";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

const Contact = () => {
  const [inputs, setInputs] = useState({});

  return (
    <>
      <center style={{ marginTop: "50px" }}>
        <h1 style={{ fontFamily: "Outfit" }}>Get in touch with us</h1>
      </center>
      <center>
        <p style={{ fontFamily: "Outfit", color: "#444" }}>
          Fill out the form below or schedule a meeting with us at your
          convenience.
        </p>
      </center>

      <div className={Classes.gridIt}>
        <div className={Classes.subgrid}>
          <form>
            <div className="mt-[10px]">
              <InputCom
                label={"NAME"}
                value={inputs?.name}
                placeholder={"Your name"}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </div>

            <div className="mt-[10px]">
              <InputCom
                label={"EMAIL"}
                value={inputs?.email}
                placeholder={"Enter your email"}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>

            <div className="mt-[10px]">
              <InputCom
                label={"MESSAGE"}
                value={inputs?.message}
                placeholder={"Enter your message"}
                textarea={true}
                onChange={(e) =>
                  setInputs({ ...inputs, message: e.target.value })
                }
              />
            </div>

            <div className="flex items-center mt-[30px]">
              <input
                type="checkbox"
                value={inputs?.agree}
                onChange={() => setInputs({ ...inputs, agree: !inputs?.agree })}
              />
              <label className="font-[Outfit] text-[13px] ml-[10px]">
                I agree with{" "}
                <span style={{ textDecoration: "underline" }}>
                  Terms and Condition
                </span>
              </label>
            </div>

            <button
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
                width: "100%",
                marginTop: "20px",
              }}
            >
              Send your request <HiChevronRight />{" "}
            </button>
          </form>

          <div className="mt-[40px]">
            <strong className="font-[Outfit] text-[14px]">
              You can also Contact Us via
            </strong>

            <div className="items-center  sm:flex mt-[30px] gap-[10px] justify-between">
              <div className="flex items-center gap-[10px]">
                <div
                  className="w-[35px] h-[35px] rounded-full flex items-center justify-center"
                  style={{ border: "1px solid oklch(44.6% 0.03 256.802)" }}
                >
                  <BiLogoGmail size={17} color="#000" />
                </div>
                <a
                  href="mailto:contact@lagosprintingmall.com"
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  contact@lagosprintingmall.com
                </a>
              </div>

              <div className="flex items-center gap-[10px] sm:mt-[0px] mt-[20px]">
                <div
                  className="w-[35px] h-[35px] rounded-full flex items-center justify-center"
                  style={{ border: "1px solid oklch(44.6% 0.03 256.802)" }}
                >
                  <FaPhoneAlt size={15} color="#000" />
                </div>
                <a
                  href="tel:+2348062249993"
                  style={{
                    color: "#000",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  +234 806 224 9993
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={Classes.subgrid} style={{ paddingTop: "15px" }}>
          <strong className="font-[Outfit] text-[14px]">
            With our services you can
          </strong>

          <div className="flex items-center gap-[10px] mt-[40px]">
            <FaRegCircleCheck size={16} color="#000" />

            <div
              style={{
                color: "#000",
                fontSize: "14px",
              }}
            >
              Improve usability of your product
            </div>
          </div>

          <div className="flex items-center gap-[10px] mt-[10px]">
            <FaRegCircleCheck size={16} color="#000" />

            <div
              style={{
                color: "#000",
                fontSize: "14px",
              }}
            >
              Engage users at a higher level and outperform your competitions
            </div>
          </div>

          <div className="flex items-center gap-[10px] mt-[10px]">
            <FaRegCircleCheck size={16} color="#000" />

            <div
              style={{
                color: "#000",
                fontSize: "14px",
              }}
            >
              Reduce the onboarding time and increase sales
            </div>
          </div>

          <div className="flex items-center gap-[10px] mt-[10px]">
            <FaRegCircleCheck size={16} color="#000" />

            <div
              style={{
                color: "#000",
                fontSize: "14px",
              }}
            >
              Balance users need with your business goals
            </div>
          </div>

          <div className="mt-[40px] sm:flex justify-between gap-[10px]">
            <div style={{ width: "170px", fontFamily: "outfit" }}>
              <div className="flex items-center gap-[10px]">
                <MdLocationPin size={16} color="#000" />
                <strong className="font-[Outfit] text-[14px]">Mainland</strong>
              </div>

              <div
                style={{
                  marginTop: "4px",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                3 Iperu Akesan street, beside Access Bank, Alagutan b/stop,
                Iyana Ipaja Alimosho, Lagos
              </div>
              <div></div>
            </div>

            <div style={{ width: "170px", fontFamily: "outfit" }} className=" mt-[30px] sm:mt-[0px] ">
              <div className="flex items-center gap-[10px]">
                <MdLocationPin size={16} color="#000" />
                <strong className="font-[Outfit] text-[14px]">Island</strong>
              </div>

              <div
                style={{
                  marginTop: "4px",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                3 Iperu Akesan street, beside Access Bank, Alagutan b/stop,
                Iyana Ipaja Alimosho, Lagos
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

// oklch(44.6% 0.03 256.802)
