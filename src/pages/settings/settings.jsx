import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import Classes from "../dashboard/dash.module.css";
import clsx from "clsx";
import Details from "./details";

const Settings = () => {
  const CTX = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const [inputs, setInputs] = useState({});

  return (
    <>
      {showModal && (
        <Details
          showModal={showModal}
          setShowModal={setShowModal}
          inputs={inputs}
          setInputs={setInputs}
        />
      )}
      <div
        className={clsx([
          Classes.coverhereim,
          "profile-personal-information bg-[#f5f6fa] mt-4",
        ])}
      >
        <div className="flex flex-col p-[20px] rounded-[8px]">
          <div className="flex items-center">
            <p className="mb-0 text-[24px] gilroy-Semibold font-[500] text[#3f405b]">
              Personal Information
            </p>
            <div className="hover-qr-code cursor-pointer wallet-svg  position-r">
              <a
                href="#"
                data-bs-toggle="modal"
                onClick={() => {
                  setShowModal(!showModal);
                  setInputs(CTX?.userObj);
                }}
              >
                <svg
                  className="ml-12"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.8448 2.09484C12.759 1.18063 14.2412 1.18063 15.1554 2.09484C16.0696 3.00905 16.0696 4.49129 15.1554 5.4055L5.73337 14.8276C5.71852 14.8424 5.70381 14.8571 5.68921 14.8718C5.47363 15.0878 5.28355 15.2782 5.0544 15.4186C4.85309 15.542 4.63361 15.6329 4.40403 15.688C4.1427 15.7507 3.87364 15.7505 3.56847 15.7502C3.54781 15.7502 3.52698 15.7502 3.50598 15.7502H2.25008C1.83586 15.7502 1.50008 15.4144 1.50008 15.0002V13.7443C1.50008 13.7233 1.50006 13.7025 1.50004 13.6818C1.49975 13.3766 1.4995 13.1076 1.56224 12.8462C1.61736 12.6167 1.70827 12.3972 1.83164 12.1959C1.97206 11.9667 2.16249 11.7766 2.37848 11.5611C2.3931 11.5465 2.40784 11.5317 2.42269 11.5169L11.8448 2.09484ZM14.0948 3.1555C13.7663 2.82707 13.2339 2.82707 12.9054 3.1555L3.48335 12.5776C3.19868 12.8622 3.14619 12.9215 3.1106 12.9796C3.06948 13.0467 3.03917 13.1199 3.0208 13.1964C3.0049 13.2626 3.00008 13.3417 3.00008 13.7443V14.2502H3.50598C3.90857 14.2502 3.98762 14.2453 4.05386 14.2294C4.13039 14.2111 4.20354 14.1808 4.27065 14.1396C4.32873 14.1041 4.38804 14.0516 4.67271 13.7669L14.0948 4.34484C14.4232 4.01641 14.4232 3.48393 14.0948 3.1555ZM8.25006 15.0002C8.25006 14.586 8.58584 14.2502 9.00006 14.2502H15.7501C16.1643 14.2502 16.5001 14.586 16.5001 15.0002C16.5001 15.4144 16.1643 15.7502 15.7501 15.7502H9.00006C8.58584 15.7502 8.25006 15.4144 8.25006 15.0002Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* <!-- Personal Information View Div  --> */}
          <div className="profile-info-body flex flex-col profile-wraps mt-[36px]">
            <div className="left-profile-info w-full">
              <div
                className="flex gap-3 justify-between mb-[20px]"
                style={{ borderBottom: "1px solid #e0dfef" }}
              >
                <p className="mb-0 text-[15px] text-dark gilroy-medium text-align-initial">
                  Name
                </p>
                <div>
                  <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-right capitalize">
                    {CTX?.userObj?.name?.first + " " + CTX?.userObj?.name?.last}{" "}
                  </p>

                  <p className="mb-0 text-[12px]  text-[#6a6b87] gilroy-medium text-right">
                    {CTX?.userObj?.email}
                  </p>
                </div>
              </div>
              <div
                className="flex gap-3 justify-between mb-[20px]"
                style={{ borderBottom: "1px solid #e0dfef" }}
              >
                <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">
                  Phone
                </p>
                <p className="mb-0 text-[15px]  text-gray gilroy-medium text-right">
                  {CTX?.userObj?.phone}
                </p>
              </div>
              <div
                className="flex gap-3 justify-between mb-[20px]"
                style={{ borderBottom: "1px solid #e0dfef" }}
              >
                <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">
                  Session
                </p>
                <p className="mb-0 text-[15px]  text-gray gilroy-medium text-right">
                  <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-right capitalize">
                    {CTX?.userObj?.session?.device?.os}
                  </p>

                  <p className="mb-0 text-[12px]  text-[#6a6b87] gilroy-medium text-right">
                    {CTX?.userObj?.session?.device?.browser}
                  </p>
                </p>
              </div>
              {/* <div
                className="flex gap-3 justify-between mb-[20px]"
                style={{ borderBottom: "1px solid #e0dfef" }}
              >
                <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">
                  Gender
                </p>
                <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-right capitalize">
                  {CTX?.store?.user?.gender}
                </p>
              </div> */}
              {/* <div className="d-flex gap-3 justify-content-between profile-bottom b-unset">
                <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">Address 2</p>
                <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-right">N/A</p>
            </div> */}
            </div>
            <div className="left-profile-info w-full">
              {/* <div className="d-flex gap-3 justify-content-between profile-borders-bottom responsive-mtop">
            <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">
              City
            </p>
            <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-right">
              N/A
            </p>
          </div> */}
              <div
                className="flex gap-3 justify-between mb-[20px]"
                style={{ borderBottom: "1px solid #e0dfef" }}
              >
                <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">
                  City
                </p>
                <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-align-end capitalize">
                  {CTX?.userObj?.city || "N/A"}
                </p>
              </div>

              <div
                className="flex gap-3 justify-between mb-[20px]"
                style={{ borderBottom: "1px solid #e0dfef" }}
              >
                <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">
                  State
                </p>
                <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-right capitalize">
                  {CTX?.userObj?.state || "N/A"}
                </p>
              </div>

              {/* <div className="d-flex gap-3 justify-content-between profile-bottom b-unset">
                <p className="mb-0 text-[15px]  text-dark gilroy-medium text-align-initial">Time Zone</p>
                <p className="mb-0 text-[15px]  text-[#6a6b87] gilroy-medium text-align-end">Asia/Dhaka</p>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
