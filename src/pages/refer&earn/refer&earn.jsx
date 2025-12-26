import React, { useContext, useRef, useState } from "react";
import { RxSpeakerModerate } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCopyOutline } from "react-icons/io5";
import { MainContext } from "../../App";
import { AiOutlineLoading } from "react-icons/ai";
import toast from "react-hot-toast";
import Classes from "../dashboard/dash.module.css";
import moment from "moment";
import { MdOutlineFiberSmartRecord } from "react-icons/md";

const ReferEarn = ({ data, inputs, setInputs }) => {
  const CTX = useContext(MainContext);
  const [copied, setCopied] = useState(false);
  const refInput = useRef();
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const claimHandler = async () => {
    if (loadingClaim) return;

    setLoadingClaim(true);
    try {
      const fetchUser = await fetch(`${CTX.url}v1/account/claim/referral`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX?.token}`,
        },
        body: JSON.stringify({
          bonus: CTX?.userObj?.bonusAmount,
        }),
      });
      const jsoned = await fetchUser?.json();
      setLoadingClaim(false);
      if (jsoned?.m) {
        return toast(jsoned?.m);
      }
      toast(jsoned?.data);
    } catch (error) {
      setLoadingClaim(false);
      console.error(error);
      toast("Unable to complete request. Check your internet connection");
      // setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  const saveUplineHandler = async () => {
    if (loadingSubmit) return;
    setLoadingSubmit(true);
    try {
      const fetchUser = await fetch(`${CTX.url}v1/account/save/referral`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CTX?.token}`,
        },
        body: JSON.stringify({
          referral: inputs?.referral,
        }),
      });
      const jsoned = await fetchUser?.json();
      setLoadingSubmit(false);
      if (jsoned?.m) {
        return toast(jsoned?.m);
      }
      toast(jsoned?.data);
    } catch (error) {
      setLoadingSubmit(false);
      console.error(error);
      toast("Unable to complete request. Check your internet connection");
      // setStore((prev) => ({ ...prev, loading: false }));
    }
  };

  const mappedHistory = data?.map((v, i) => (
    <p
      key={i}
      className="text-[#99980a] text-[14px] gilroy-medium"
      style={{ margin: "5px 0px 0px 0px" }}
    >
      ₦{v?.amount?.toLocaleString()}
      <span className="ml-2 text-[#6f709b]">
        {moment(v?.date).format("lll")}
      </span>
    </p>
  ));

  return (
    <>
      <div className={Classes.coverhereim} style={{ marginTop: "60px" }}>
        <div className="containt-parent">
          <div className="main-containt">
            <div className="pb-34">
              <div className="px-61 pb-20 helper-size">
                <p className="mb-0 text-[26px] gilroy-Semibold text-uppercase font-[500] text-center text-[#3f405b]">
                  Refer & Earn
                </p>
                <p className="mb-0 text-center text-[16px]  gilroy-medium text-[#6a6b87] dark-c dark-p mt-8">
                  Invite your friends and earn big.
                </p>
              </div>

              <div className="px-28 helper-div">
                <div className="row r-mt-n">
                  <div className=" mt-19">
                    <div
                      className="balance-box"
                      style={{
                        padding: "23px 19px",
                        backgroundColor: "#f6f6f8",
                        border: "1px solid #e0dfef",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="wallet-left-box d-flex gap-3 items-center">
                          <div className="w-[50px] h-[50px] rounded-[10px] d-flex align-items-center justify-content-center bg-[#fff]">
                            <RxSpeakerModerate size={21} color="#3f405b" />
                          </div>
                          <div className="mt-n3p span-currency">
                            <span className="text-[15px] gilroy-medium text-[#9998a0]">
                              Referal
                            </span>
                            <p className="mb-0 mt-6">
                              <span className="text-[28px] font-[500] gilroy-Semibold text-[#3f405b]">
                                ₦{CTX?.userObj?.bonusAmount?.toFixed(2)}
                              </span>
                            </p>
                          </div>
                        </div>
                        {CTX?.userObj?.bonusAmount > 0 && (
                          <div className="wallet-right-box mt-n3p span-currency text-end">
                            <button
                              onClick={() => claimHandler()}
                              className="text3xlFontBoldUnderline"
                              style={{
                                width: "max-content",
                                padding: "0px 11px",
                                display: "flex",
                                alignItems: "center",
                                margin: "auto",
                                height: "30px",
                              }}
                            >
                              {loadingClaim && (
                                <AiOutlineLoading
                                  className="animate-spin h-5 w-5 mr-3"
                                  color="#fff"
                                />
                              )}

                              <span className="text-[12px]">Claim</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-between span-currency">
                        <div className="mt-4">
                          <p className="text-[#99980a] mb-0 text-[12px] gilroy-medium">
                            {/* 0/0 */}
                            {`${CTX?.userObj?.successfulReferred}/${CTX?.userObj?.totalReferred}`}
                            <span className="ml-2 text-[#3f405b]">
                              Successful Referrals
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="balance-box"
                      style={{
                        marginTop: "20px",
                        padding: "23px 19px",
                        backgroundColor: "#f6f6f8",
                        border: "1px solid #e0dfef",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="gap-[20px] flex justify-between items-end w-full">
                        <div className="wallet-left-box flex flex-col  items-center w-full">
                          <p className="text-[#99980a] mb-0 text-[12px] gilroy-medium">
                            {/* {`${CTX?.userObj?.successfulReferred}/${CTX?.userObj?.totalReferred}`} */}
                            <span className="text-[#3f405b]">
                              {CTX.userObj?.referral
                                ? `This account already has a referral associated with it. Below is the code.`
                                : `Support any user by entering their referral code.
                              The user whose code you enter will be credited as
                              the person who referred you.`}
                            </span>
                          </p>

                          <input
                            value={inputs?.referral}
                            style={{
                              marginTop: "10px",
                              textTransform: "uppercase",
                            }}
                            readOnly={CTX.userObj?.referral ? true : false}
                            onChange={(e) =>
                              setInputs({
                                ...inputs,
                                referral: e.target.value,
                              })
                            }
                            className="form-control-input form-control-input-form-control input-form-control-withdraw apply-bg text-[14px]"
                            name="Referral"
                            placeholder="Referral"
                            required
                            type={"text"}
                          />
                        </div>
                        {!CTX.userObj?.referral && (
                          <div className="wallet-right-box mt-n3p span-currency text-end mb-[10px]">
                            <button
                              onClick={() => saveUplineHandler()}
                              className="text3xlFontBoldUnderline"
                              style={{
                                width: "max-content",
                                padding: "0px 11px",
                                display: "flex",
                                alignItems: "center",
                                margin: "auto",
                                height: "30px",
                              }}
                            >
                              {loadingSubmit && (
                                <AiOutlineLoading
                                  className="animate-spin h-5 w-5 mr-3"
                                  color="#fff"
                                />
                              )}

                              <span className="text-[12px]">Submit</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-between span-currency">
                        <div className="mt-4 w-full" style={{ margin: "auto" }}>
                          {mappedHistory?.length > 0 ? (
                            <>
                              <p
                                className="text-[#99980a] text-[12px] gilroy-medium"
                                style={{ margin: "0px 0px 6px 0px" }}
                              >
                                <span className=" text-[#3f405b]">
                                  Referral commission history
                                </span>
                              </p>
                              {mappedHistory}
                            </>
                          ) : (
                            <>
                              <MdOutlineFiberSmartRecord
                                size={45}
                                className="flex items-center justify-center ml-auto mr-auto mt-[35px]"
                                color="#3f405b"
                              />

                              <p
                                className="mb-0 f-14 leading-22 text-[#3f405b] gilroy-medium w-break text-[12px] text-center mt-[20px] ml-auto mr-auto"
                                style={{
                                  width: "100%",
                                  wordWrap: "break-word",
                                }}
                              >
                                No commission history yet. All withdrew
                                commissions will show up here.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="rounded-[8px] mt-4"
                      style={{
                        padding: "23px 19px",
                        border: "1px solid #e0dfef",
                        background:
                          "linear-gradient(88.7deg,  #1dd6ad 19.95%, #00905b 89.51%)",
                      }}
                    >
                      <div
                        className="bg-[#fff] text-[#000] text-[10px] px-3 py-[1px] rounded-[30px] font-[500] mx-auto mb-2"
                        style={{ width: "max-content" }}
                      >
                        Yes, you can earn up to
                      </div>

                      <p className="mb-2 text-[26px] gilroy-Semibold font-[500] text-uppercase text-center text-[#000]">
                        ₦108,332
                      </p>

                      <p className="mb-0 text-left text-[13px]  gilroy-medium text-[#000] dark-c dark-p mt-8">
                        With our referral program, you can earn extra income
                        simply by inviting others to join and invest. It’s our
                        way of saying thank you for helping us grow.
                      </p>

                      <p className="mb-0 text-left text-[13px]  gilroy-medium text-[#000] dark-c dark-p">
                        <br />
                        <strong>🔗 How It Works:</strong>
                        <br />
                      </p>

                      <p className="mb-0 text-left text-[13px] gilroy-medium text-[#000] dark-c dark-p">
                        <strong>-Get Your Unique Referral Code:</strong> Log
                        into your account and grab your personal referral link
                        from your dashboard.
                      </p>

                      <p className="mb-0 text-left text-[13px]  gilroy-medium text-[#000] dark-c dark-p">
                        <strong>-Invite Your Friends:</strong> Share your link
                        via WhatsApp, email, social media, or however you
                        choose!
                      </p>

                      <p className="mb-0 text-left text-[13px] gilroy-medium text-[#000] dark-c dark-p">
                        <strong>
                          -Earn When They successfully place an Order:
                        </strong>{" "}
                        Once your referral successfully placed an Order, you
                        instantly earn a referral commission. Its not much, but
                        its a way of showing appreciation
                      </p>
                      <br />
                      <p className="mb-0 text-left text-[13px] gilroy-medium text-[#000] dark-c dark-p">
                        <strong>✅ Why Refer?</strong>
                      </p>

                      <p className="mb-0 text-left text-[13px] gilroy-medium text-[#000] dark-c dark-p">
                        It’s easy and free You’re helping us and others discover
                        a trusted way print and brand there business with easy.
                        The more you share, the more you earn Start earning
                        passively share your link today!
                        <br />
                        Contact Us If you have any questions or concerns about
                        this. please contact us at{" "}
                        <strong>care@lagosprintingmall.com</strong>
                      </p>

                      {/* <div
                        style={{
                          border: "1px solid #000",
                          width: "250px",
                          maxWidth: "100%",
                          margin: "20px auto"
                        }}
                        className="h-[35px] rounded-[30px] text-[13px] font-bold flex justify-center items-center mt-[20px]"
                      >
                        Read our Rules $ Guidelines
                      </div> */}

                      <div
                        style={{
                          width: "250px",
                          maxWidth: "100%",
                          margin: "auto",
                          marginTop: "30px",
                        }}
                        className="bg-[#000] text-[#fff] py-[12px] px-[13px] rounded-[10px] text-[13px] font-[500] flex justify-center flex-col items-center mt-[20px]"
                      >
                        <span className="text-[#eee]">Your Invite Code</span>
                        {/* <span className="text-[29px] font-bold uppercase">
                          {CTX?.userObj?.referral_code}
                        </span> */}

                        <input
                          className="w-full text-[29px] font-bold uppercase"
                          value={CTX?.userObj?.referral_code || 1234567890}
                          readOnly
                          ref={refInput}
                          style={{
                            textAlign: "center",
                            border: "none",
                            outline: "none",
                            fontSize: "29px",
                            backgroundColor: "inherit",
                          }}
                        />

                        <div
                          className="w-full py-[8px] bg-[#ffffff21] mt-2 rounded-[30px] flex items-center justify-center text-[12px]"
                          onClick={() => {
                            setTimeout(() => {
                              setCopied(false);
                            }, 800);
                            setCopied(true);
                            refInput.current.select();
                            refInput.current.focus();
                            document.execCommand("copy");
                          }}
                        >
                          <IoCopyOutline
                            size={15}
                            color="#fff"
                            className="mr-1"
                          />
                          {copied ? "Copied" : "Copy Invite Code"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferEarn;
