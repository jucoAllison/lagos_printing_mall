import React, { useContext, useState } from "react";
import Classes from "./track.module.css";
import Styles from "../product/product.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { TbBrandAbstract } from "react-icons/tb";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RiArrowDropRightLine } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";
import { HiMiniHome } from "react-icons/hi2";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import moment from "moment";
import { FaFileAlt } from "react-icons/fa";
import { MainContext } from "../../App";
import AdminSection from "./adminSection";
import Payment from "./payment";
import { IoClose } from "react-icons/io5";
import InputCom from "../../components/input/input";
import { HiChevronRight } from "react-icons/hi";

const Track = ({
  params,
  data,
  setData,
  loading,
  loadingPending,
  updateProgressHandler,
  inputs,
  setInputs,
  updating,
  setUpdating,
  changeStatusHandler,
}) => {
  const CTX = useContext(MainContext);
  const [viewAll, setViewAll] = useState(false);
  const navigation = useNavigate();

  // const data = null
  // const [data, setData] = useState({
  //   _id: "g65s434d56fg78h7ff6g87h",
  //   status: "awaiting_confirmation",
  //   details: {
  //     name: "Celebrity Kaftan",
  //     email: "celebrity@gmail.com",
  //     phone: "098765432345",
  //     whatsapp: "098765432345",
  //   },
  //   recurringOrder: { data_type: "boolean", key: true, value: "Monthly" },
  //   delivery: {
  //     is_pickup: false,
  //     address: {
  //       state: "Abuja",
  //       address: "utako park",
  //       city: "lugbe junction",
  //       zip: "9fe87e89",
  //     },
  //   },
  //   progress: [
  // {
  //   doing: "Item 1: Start of the list",
  //   time: "Jun 24, 09:52 GMT+1",
  // },
  //     {
  //       doing: "Item 2: Next important step",
  //       time: "Jun 24, 09:52 GMT+1",
  //     },
  //     {
  //       doing: "Item 3: Something else",
  //       time: "Jun 24, 09:52 GMT+1",
  //     },
  //     {
  //       doing: "Item 4: Final note",
  //       time: "Jun 24, 09:52 GMT+1",
  //     },
  //     {
  //       doing: "Item 1: Start of the list",
  //       time: "Jun 24, 09:52 GMT+1",
  //     },
  //     {
  //       doing: "Item 1: Start of the list",
  //       time: "Jun 24, 09:52 GMT+1",
  //     },
  //   ],
  //   products: [
  //     {
  //       name: "Jotters/Notepads",
  //       details: [
  //         { type: "text", key: "Quantity", value: 643 },
  //         {
  //           type: "text",
  //           key: "What is the intended purpose?",
  //           value: "Giveaway",
  //         },
  //         { type: "text", key: "Size", value: "A6" },
  //         { type: "text", key: "Orientation", value: "Portrait" },
  //         {
  //           type: "text",
  //           key: "What cover type/material do you want?",
  //           value: "350gsm Art Card",
  //         },
  //         {
  //           type: "text",
  //           key: "Do you want the cover laminated?",
  //           value: "Sugar",
  //         },
  //         {
  //           type: "text",
  //           key: "What paper type for the inside pages?",
  //           value: "80gsm Bond Paper",
  //         },
  //         { type: "text", key: "How many pages per jotter?", value: "80" },
  //         { type: "text", key: "Printing on inner pages", value: "Full color" },
  //         {
  //           type: "text",
  //           key: "Binding Type",
  //           value: "Saddle stitch (stapled)",
  //         },
  //         {
  //           type: "boolean",
  //           key: "Tear-off pad with gum at the top",
  //           value: false,
  //         },
  //         { type: "text", key: "Binding position", value: "Side" },
  //         {
  //           type: "boolean",
  //           key: "Do you need a printed sample/proof before full production?",
  //           value: true,
  //         },
  //         {
  //           type: "text",
  //           key: "Additional note",
  //           value:
  //             "Any numbering required? \n need a printed sample/proof before full production? \n have a final print-ready design? \n need design support? \n Additional note",
  //         },
  //         { type: "boolean", key: "Need design", value: false },
  //         { type: "file", key: "file upload", value: "cloudinary file link", imgObj: {details: "herer"} },
  //         { type: "file", key: "design", value: "cloudinary file link", imgObj: {details: "herer"} },
  //         { type: "file", key: "reference", value: "cloudinary file link", imgObj: {details: "herer"} },
  //       ],
  //     },
  //   ],
  // });

  const viewedAll = viewAll ? data?.progress : data?.progress?.slice(0, 2);

  const mappedTimeline = viewedAll?.map((v, i) => {
    return (
      <div key={i} class={Classes.timeline_item}>
        <div>{v?.doing}</div> <p class="second_date_container">{v?.time}</p>{" "}
      </div>
    );
  });

  const mappedProgress = data?.progress?.map((v, i) => {
    return (
      <div key={i} class={Classes.timeline_item}>
        <div>
          {/* <input value={v?.doing} onChange={(e) => {
            const newProgress = {...data, progress: [...data.progress]};
            newProgress.progress[i] = {
              ...newProgress.progress[i],
              doing: e.target.value,
            };
            setData(newProgress);
          }} />{" "} */}

          <input
            value={v?.doing || ""}
            style={{ width: "100%", outline: "1px solid #000" }}
            onChange={(e) => {
              const value = e.target.value;

              setData((prev) => {
                if (!prev) return prev;

                const progress = [...prev.progress];
                progress[i] = {
                  ...progress[i],
                  doing: value,
                };

                return {
                  ...prev,
                  progress,
                };
              });
            }}
          />
        </div>{" "}
        <p class="second_date_container">{v?.time}</p>{" "}
      </div>
    );
  });

  const mappProductDetails = data?.products?.map((product, i) => (
    <div key={i} className="mt-4">
      {/* Product name */}
      <h3 className="font-[outfit] text-[18px] font-semibold text-[#000]">
        {product?.name}
      </h3>

      {/* Product details */}
      {product?.details.map((v, j) => (
        <div key={j} className="mt-1">
          {v?.type === "text" ? (
            <p
              className="font-[outfit] text-[15px] text-[#000] mt-2"
              style={{ margin: "0px" }}
            >
              {v?.key}: {v?.value}
            </p>
          ) : v?.type === "boolean" ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={Boolean(v?.value)}
                readOnly
                className="preferenceInput cursor-not-allowed accent-[#000]"
              />
              <label className="font-[outfit] text-[15px] text-[#000]">
                {v?.key}
              </label>
            </div>
          ) : v.type === "file" ? (
            <>
              {v.imgObj && (
                <div div className="flex items-center gap-2 mt-2">
                  <p className="font-[outfit] text-[15px] text-[#000] mt-2">
                    {v.key == "user_design"
                      ? "Uploaded design"
                      : v.key == "reference"
                      ? "Design reference"
                      : "Design files"}
                  </p>

                  {Array.isArray(v?.value) ? (
                    v?.value?.map((r, t) => {
                      return (
                        <FaFileAlt
                          key={t}
                          onClick={() => window.open(r, "_blank")}
                        />
                      );
                    })
                  ) : (
                    <FaFileAlt
                      onClick={() => window.open(v?.value, "_blank")}
                    />
                  )}
                </div>
              )}
            </>
          ) : null}
        </div>
      ))}
    </div>
  ));

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = inputs.track.trim(); // remove spaces just in case

    if (!value?.toLowerCase().startsWith("lpm-")) {
      toast.error("Invalid Tracking ID. Tracking IDs must start with 'LPM-'.");
      return;
    }

    navigation(`/account/track/${inputs?.track}`);
  };

  const openWhatsApp = () => {
    const phone = "+2348062249993"; // international format, no +
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <>
      {updating && (
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
                  {updating == "status" ? "Change status" : "Update progress"}
                </p>

                <IoClose
                  color="#3f405b"
                  size={22}
                  onClick={() => setUpdating(null)}
                />
              </div>

              {updating == "status" && (
                <>
                  <p className="font-[outfit] text-[15px] text-[#000] mt-2 mb-0">
                    Order Status Update
                  </p>

                  <p className="font-[outfit] text-[13px] text-[#000] mt-0">
                    Changing the order status from Pending to Completed or
                    Refunded is a permanent action. Ensure the selected status
                    is correct, as this change cannot be undone.
                  </p>

                  <InputCom
                    label={"New Status"}
                    placeholder={"Status"}
                    // value={inputs?.new_progress}
                    type={"text"}
                    select={true}
                    options={[
                      "Select new status",
                      "Refund",
                      "Cancelled",
                      "Completed",
                    ]}
                    inputStyles={{ backgroundColor: "#88899999" }}
                    value={inputs?.status}
                    onChange={(e) => {
                      setInputs({ ...inputs, status: e.target.value });
                    }}
                  />

                  <div className="flex items-center mt-3 mb-2">
                    <div
                      style={{
                        fontSize: "12px",
                        // textTransform: "capitalize",
                      }}
                      className={Styles.titleDataHere}
                    >
                      Send email?
                    </div>

                    <input
                      className={Styles.preferenceInput}
                      type="checkbox"
                      checked={inputs?.send_email}
                      onChange={() => {
                        setInputs({
                          ...inputs,
                          send_email: !inputs?.send_email,
                        });
                      }}
                    />
                  </div>

                  <button
                    onClick={changeStatusHandler}
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
                      margin: "0px",
                    }}
                  >
                    {loadingPending && (
                      <AiOutlineLoading
                        className="animate-spin h-[20px] w-[20px] mr-1"
                        color={"#fff"}
                      />
                    )}
                    Change Status <HiChevronRight />{" "}
                  </button>
                </>
              )}
              {updating == "progress" && (
                <>
                  <p className="font-[outfit] text-[15px] text-[#000] mt-2 mb-0">
                    Below is the list of the order progress
                  </p>

                  <p className="font-[outfit] text-[13px] text-[#000] mt-0">
                    You can update existing progress entries by editing the
                    inputs, or add a new progress entry to reflect the current
                    status of the order.
                  </p>

                  <div className="mt-2">
                    <InputCom
                      label={"New progress"}
                      placeholder={"New progress"}
                      value={inputs?.new_progress}
                      type={"text"}
                      inputStyles={{ backgroundColor: "#88899999" }}
                      onChange={(e) => {
                        setInputs({ ...inputs, new_progress: e.target.value });
                      }}
                    />

                    <button
                      onClick={updateProgressHandler}
                      type="button"
                      className={clsx([
                        "text3xlFontBoldUnderline",
                        "rounded-[4px] transition duration-200  focus:outline-none inline-flex items-center justify-center secondary-button-text  h-10 text-base px-3 bg-primary button-text  border-tertiary border-tertiary-hover border-transparent",
                      ])}
                      style={{
                        fontFamily: "Outfit",
                        color: "#fff",
                        background: "#2196F3",
                        borderRadius: "12px",
                        border: "none",
                        margin: "20px 0px",
                      }}
                    >
                      {loadingPending && (
                        <AiOutlineLoading
                          className="animate-spin h-[20px] w-[20px] mr-1"
                          color={"#fff"}
                        />
                      )}
                      Update Progress <HiChevronRight />{" "}
                    </button>
                  </div>

                  <div class={Classes.timeline} id="timeline_cover">
                    {mappedProgress}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={Classes.trackHero}>
        {loading ? (
          <div className={Classes.blurSmth}>
            <div className="flex flex-col items-center justify-center">
              <AiOutlineLoading
                size={53}
                className="animate-spin h-[53px] w-[53px] mb-[20px]"
                color={"#000"}
              />
              <strong>Loading . . . </strong>
            </div>
          </div>
        ) : !data ? (
          <div className={Classes.centerit}>
            <>
              <div className={Classes.headTr}>
                Package tracking is easy with order number
              </div>

              <div className={Classes.bodyTr}>
                We couldn’t find a job with the code{" "}
                <span style={{ fontWeight: "bold" }}>
                  {params.ID?.toUpperCase()}
                </span>
                . Double-check the code you entered (no extra spaces), try
                again, or{" "}
                <Link to={"/account/contact-us"} style={{ color: "inherit" }}>
                  {" "}
                  contact us{" "}
                </Link>{" "}
                with your order details.
              </div>

              <form onSubmit={onSubmitHandler} className={Classes.search_round}>
                <input
                  required
                  value={inputs?.track}
                  onChange={(e) =>
                    setInputs({ ...inputs, track: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault(); // Block space
                  }}
                  placeholder="Track your order"
                  className={Classes.inputNavStuff}
                />

                <button className={Classes.btnSearchNAv}>Track</button>
              </form>
            </>
          </div>
        ) : null}

        {data && !loading && (
          <>
            {CTX.token && CTX.userObj?.type != "user" && (
              <AdminSection
                data={data}
                updating={updating}
                setUpdating={setUpdating}
              />
            )}

            <div className={Classes.centdataerit}>
              <>
                <div className={Classes.headTr}>
                  Tracking made easy! Here’s your order information.
                </div>

                <div className="mt-[40px]">
                  {data?.status?.includes("awaiting_confirmation") && (
                    <strong className={Classes.bgSmthConf}>
                      Awaiting confirmations
                    </strong>
                  )}
                  {data?.status?.includes("awaiting_payment") && (
                    <strong
                      className={Classes.bgSmthConf}
                      style={{
                        backgroundColor: "#7C3AED",
                        color: "#fff",
                      }}
                    >
                      Awaiting Payment
                    </strong>
                  )}
                  {data?.status?.includes("pending") && (
                    <strong
                      className={Classes.bgSmthConf}
                      style={{
                        backgroundColor: "#2196F3",
                        color: "#fff",
                      }}
                    >
                      Processing
                    </strong>
                  )}

                  {data?.status?.includes("cancelled") && (
                    <strong
                      className={Classes.bgSmthConf}
                      style={{
                        backgroundColor: "#F44336",
                        color: "#fff",
                      }}
                    >
                      Cancelled
                    </strong>
                  )}

                  {data?.status?.includes("completed") && (
                    <strong
                      className={Classes.bgSmthConf}
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                      }}
                    >
                      Completed
                    </strong>
                  )}

                  {data?.status?.includes("refund") && (
                    <strong
                      className={Classes.bgSmthConf}
                      style={{
                        backgroundColor: "##1c87f1",
                        color: "#fff",
                      }}
                    >
                      Refund
                    </strong>
                  )}

                  <p className="font-[outfit] font-bold text-[15px] text-[#000] mt-4">
                    {data?.track?.toUpperCase()}
                  </p>

                  <p className="font-[outfit] text-[15px] text-[#000] mt-4">
                    Thanks for reaching out! We’re reviewing your details and
                    will confirm shortly. For quick updates, feel free to
                    contact us via{" "}
                    <span
                      onClick={openWhatsApp}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      {" "}
                      WhatsApp.
                    </span>
                  </p>

                  <div className="mt-[10px]">
                    {/* <strong>Booked: Dec 08 - 11</strong> */}
                    <strong>Booked: {moment(data?.date).format("lll")}</strong>

                    <div className="mt-3 flex items-center gap-[10px]">
                      <div className="w-[22px] h-[22px] rounded-full bg-[#000] flex items-center  justify-center">
                        <BsFillBoxSeamFill size={12} fill="#fff" />
                      </div>

                      <strong>Delivery update</strong>

                      {data?.progress?.length > 1 && (
                        <div
                          onClick={() => setViewAll(!viewAll)}
                          className="flex items-center text-[#00d] ml-[auto]"
                        >
                          <span>View {viewAll ? "less" : "all"}</span>{" "}
                          <RiArrowDropRightLine size={22} />
                        </div>
                      )}
                    </div>

                    <div class={Classes.timeline} id="timeline_cover">
                      {mappedTimeline}
                    </div>

                    <div className="mt-3 flex items-center gap-[10px]">
                      <div
                        className="w-[23px] h-[23px] rounded-full flex items-center justify-center"
                        style={{ border: "1px solid #000" }}
                      >
                        <CgDetailsMore size={17} fill="#000" />
                      </div>

                      <strong>Details</strong>
                    </div>

                    <div className="ml-[33px]">
                      <p
                        className="font-[outfit] text-[15px] text-[#000] mt-2"
                        style={{ margin: "0px" }}
                      >
                        Name:{" "}
                        {`${data?.details?.name?.first} ${data?.details?.name?.last}`}
                      </p>
                      <p
                        className="font-[outfit] text-[15px] text-[#000]"
                        style={{ margin: "0px" }}
                      >
                        Email: {data?.details?.email}
                      </p>
                      <p
                        className="font-[outfit] text-[15px] text-[#000]"
                        style={{ margin: "0px" }}
                      >
                        Phone: {data?.details?.phone}
                      </p>
                      {!data?.details?.isWhatsapp && (
                        <p
                          className="font-[outfit] text-[15px] text-[#000]"
                          style={{ margin: "0px" }}
                        >
                          Phone: {data?.details?.whatsapp}
                        </p>
                      )}
                      <p
                        className="font-[outfit] text-[15px] text-[#000]"
                        style={{ margin: "0px", marginTop: "30px" }}
                      >
                        {/* <strong>Order details</strong> */}
                        <strong></strong>
                      </p>
                      <div>{mappProductDetails}</div>
                    </div>

                    <div className="mt-3 flex items-center gap-[10px]">
                      <div
                        className="w-[23px] h-[23px] rounded-full flex items-center justify-center"
                        style={{ border: "1px solid #000" }}
                      >
                        <HiMiniHome size={17} fill="#000" />
                      </div>

                      <strong>
                        {data?.delivery?.is_pickup
                          ? "Pickup"
                          : "Delivery address"}
                      </strong>
                    </div>

                    <div className="ml-[33px]">
                      {data?.delivery?.is_pickup ? (
                        <p
                          className="font-[outfit] text-[15px] text-[#000] mt-2"
                          style={{ margin: "0px" }}
                        >
                          3 Iperu Akesan street, beside Access Bank, Alagutan
                          b/stop, Iyana Ipaja Alimosho, Lagos
                        </p>
                      ) : (
                        <>
                          <p
                            className="font-[outfit] text-[15px] text-[#000] mt-2"
                            style={{ margin: "0px" }}
                          >
                            State: {data?.delivery?.address?.state}
                          </p>
                          <p
                            className="font-[outfit] text-[15px] text-[#000]"
                            style={{ margin: "0px" }}
                          >
                            Address: {data?.delivery?.address?.address}
                          </p>
                          <p
                            className="font-[outfit] text-[15px] text-[#000]"
                            style={{ margin: "0px" }}
                          >
                            City: {data?.delivery?.address?.city}
                          </p>
                          {data?.delivery?.address?.zip && (
                            <p
                              className="font-[outfit] text-[15px] text-[#000]"
                              style={{ margin: "0px" }}
                            >
                              Zip: {data?.delivery?.address?.zip}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </>
        )}
      </div>
      {data?.status?.includes("awaiting_payment") && <Payment data={data} />}

      <div className={Classes.secondHero}>
        <div className="w-full">
          <div
            className={Classes.headTr}
            style={{ fontSize: "14px", textAlign: "left" }}
          >
            International tracking is available
          </div>

          <div className={Classes.headTr} style={{ textAlign: "left" }}>
            For jobs shipped through supported postal services.
          </div>

          <div className={Classes.bodyTr} style={{ textAlign: "left" }}>
            Our tracking system updates your job status in real time, ensuring
            you always have the most accurate information about your project’s
            progress. You can also receive notifications through email or SMS,
            so you’re always informed as your job moves through each production
            stage.
          </div>
        </div>
        <div className="w-full h-full">
          <div className="relative h-full">
            <div className={Classes.bgTrackImg}></div>

            <div className={Classes.boxSmall}>
              <div className={Classes.iconSide}>
                <TbBrandAbstract color={"#fff"} size={27} />
              </div>

              <div className="text-[#fff]">
                <div
                  className="sm:text-[30px] text-[16px] font-[500] mb-3"
                  style={{ lineHeight: "1" }}
                >
                  With over 15 years of experience
                </div>{" "}
                We remain deeply passionate about delivering quality and
                reliability. Our extensive service network ensures seamless
                handling and timely delivery of your printed materials,
                supported by dependable global coverage. From the moment you
                submit your order to the final delivery, we maintain clear and
                consistent communication, keeping you updated at every stage.
                That’s the Printing West Expressway!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
