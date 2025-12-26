import React, { useRef, useState } from "react";
import Classes from "./home.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiFillDelete, AiOutlineLoading } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";

const Upload = () => {
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  return (
    <>
      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
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
                      Upload
                    </p>
                    <div className="text-[14px] font-[400] text-[#000]">
                      Have a custom design? Upload it here — we’ll review it and
                      get back to you right away with a quote.
                    </div>
                  </div>
                  <FaRegWindowClose
                    onClick={() => setShowModal(false)}
                    color="#000"
                    size={25}
                  />
                </div>
                <div className="modal-body modal-body-pxy">
                  <form>
                    <div className={Classes.grid_stuff}>
                      <div className={Classes.search_round}>
                        <input
                          placeholder="Your name"
                          className={Classes.inputNavStuff}
                        />
                      </div>

                      <div className={Classes.search_round}>
                        <input
                          placeholder="Email address"
                          className={Classes.inputNavStuff}
                        />
                      </div>

                      <div className={Classes.search_round} style={{position: "relative"}}>
                        <div style={{color: "gray", padding:  "0px 10px", }}>
                          +234
                        </div>
                        <input
                          placeholder="Phone number"
                          style={{
                            paddingLeft: "10px",
                            borderLeft: "1px solid #999"
                          }}
                          className={Classes.inputNavStuff}
                        />
                      </div>

                      <div
                        className={Classes.search_round}
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <p
                          onClick={() => fileInputRef.current.click()}
                          className="w-full flex items-center pl-[20px] text-[gray]"
                          style={{ margin: "0px" }}
                        >
                          Upload sample
                        </p>
                        <input
                          type="file"
                          className={Classes.inputNavStuff}
                          ref={fileInputRef}
                          accept="image/*"  
                          style={{
                            visibility: "hidden",
                            position: "absolute",
                            left: "-344px",
                          }}
                        />
                      </div>
                    </div>

                     <div
                className="mt-[20px] flex items-center justify-center gap-[10px] text-[#fff] bg-[#812b5a] rounded-[400px] px-[25px] h-[44px]"
                style={{ boxShadow: "1px 1px 10px #00000012", }}
                onClick={() => setShowModal(true)}
              >
                <span>Upload</span>

                <FaArrowRightLong />
              </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className=" mt-[50px] w-full sm:py-[60px] py-[40px] bg-[#373564]">
        <div
          className={Classes.products_cover}
          style={{ height: "100%", marginTop: "0px" }}
        >
          <div
            className="flex justify-center h-full"
            style={{ flexDirection: "column" }}
          >
            <div className="flex">
              <div>
                <div className="sm:text-[30px] text-[24px] font-bold text-[#fff] font-[Righteous]">
                  Have a custom design?
                </div>
                <div className="sm:text-[17px] text-[14px] font-[400] font-[outfit] text-[#fff]">
                  Have a custom design? Upload it here — we’ll review it and get
                  back to you right away with a quote.
                </div>
              </div>

              <div
                className="ml-[auto] flex items-center gap-[10px] text-[#fff] bg-[#ed258f] rounded-[400px] px-[25px] h-[44px] font-[outfit]"
                style={{ boxShadow: "1px 1px 10px #00000062" }}
                onClick={() => setShowModal(true)}
              >
                <span>Upload</span>

                <FaArrowRightLong />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;


// libphonenumber-js