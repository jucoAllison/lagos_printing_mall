import React, { useState } from "react";
import Classes from "./track.module.css";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import {
  TbBrandAbstract,
} from "react-icons/tb";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RiArrowDropRightLine } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";
import { HiMiniHome } from "react-icons/hi2";

const Track = () => {
  const params = useParams();
  const [viewAll, setViewAll] = useState(false);
  // const data = null
  const [data, setData] = useState({
    _id: "g65s434d56fg78h7ff6g87h",
    status: "awaiting_confirmation",
    details: {
      name: "Celebrity Kaftan",
      email: "celebrity@gmail.com",
      phone: "098765432345",
      whatsapp: "098765432345",
    },
    recurringOrder: { type: "boolean", key: true, value: "Monthly" },
    delivery: {
      is_pickup: false,
      address: {
        state: "Abuja",
        address: "utako park",
        city: "lugbe junction",
        zip: "9fe87e89",
      },
    },
    progress: [
      {
        doing: "Item 1: Start of the list",
        time: "Jun 24, 09:52 GMT+1",
      },
      {
        doing: "Item 2: Next important step",
        time: "Jun 24, 09:52 GMT+1",
      },
      {
        doing: "Item 3: Something else",
        time: "Jun 24, 09:52 GMT+1",
      },
      {
        doing: "Item 4: Final note",
        time: "Jun 24, 09:52 GMT+1",
      },
      {
        doing: "Item 1: Start of the list",
        time: "Jun 24, 09:52 GMT+1",
      },
      {
        doing: "Item 1: Start of the list",
        time: "Jun 24, 09:52 GMT+1",
      },
    ],
    products: [
      {
        name: "Jotters/Notepads",
        details: [
          { type: "text", key: "Quantity", value: 643 },
          {
            type: "text",
            key: "What is the intended purpose?",
            value: "Giveaway",
          },
          { type: "text", key: "Size", value: "A6" },
          { type: "text", key: "Orientation", value: "Portrait" },
          {
            type: "text",
            key: "What cover type/material do you want?",
            value: "350gsm Art Card",
          },
          {
            type: "text",
            key: "Do you want the cover laminated?",
            value: "Sugar",
          },
          {
            type: "text",
            key: "What paper type for the inside pages?",
            value: "80gsm Bond Paper",
          },
          { type: "text", key: "How many pages per jotter?", value: "80" },
          { type: "text", key: "Printing on inner pages", value: "Full color" },
          {
            type: "text",
            key: "Binding Type",
            value: "Saddle stitch (stapled)",
          },
          {
            type: "boolean",
            key: "Tear-off pad with gum at the top",
            value: false,
          },
          { type: "text", key: "Binding position", value: "Side" },
          {
            type: "boolean",
            key: "Do you need a printed sample/proof before full production?",
            value: true,
          },
          {
            type: "text",
            key: "Additional note",
            value:
              "Any numbering required? \n need a printed sample/proof before full production? \n have a final print-ready design? \n need design support? \n Additional note",
          },
          { type: "boolean", key: "Need design", value: false },
        ],
      },
    ],
  });

  const viewedAll = viewAll ? data?.progress : data?.progress?.slice(0, 2);

  const mappedTimeline = viewedAll?.map((v, i) => {
    return (
      <div key={i} class={Classes.timeline_item}>
        <div>{v?.doing}</div> <p class="second_date_container">{v?.time}</p>{" "}
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
              className="cursor-not-allowed accent-[#000]"
            />
            <label className="font-[outfit] text-[15px] text-[#000]">
              {v?.key}
            </label>
          </div>
        ) : null}
      </div>
    ))}
  </div>
))

  return (
    <>
      <div className={Classes.trackHero}>
        {!data && (
          <div className={Classes.centerit}>
            <>
              <div className={Classes.headTr}>
                Package tracking is easy with order number
              </div>

              <div className={Classes.bodyTr}>
                We couldn’t find a job with the code{" "}
                <span style={{ fontWeight: "bold" }}>{params.ID}</span>.
                Double-check the code you entered (no extra spaces), try again,
                or{" "}
                <Link to={"/account/contact-us"} style={{ color: "inherit" }}>
                  {" "}
                  contact us{" "}
                </Link>{" "}
                with your order details.
              </div>

              <div className={Classes.search_round}>
                <input
                  placeholder="Track your order"
                  className={Classes.inputNavStuff}
                />

                <button className={Classes.btnSearchNAv}>Track</button>
              </div>
            </>
          </div>
        )}

        {data && (
          <div className={Classes.centdataerit}>
            <>
              <div className={Classes.headTr}>
                Tracking made easy! Here’s your order information.
              </div>

              <div className="mt-[40px]">
                <strong>Awaiting confirmations</strong>
                <p className="font-[outfit] text-[15px] text-[#000] mt-2">
                  Thanks for reaching out! We’re reviewing your details and will
                  confirm shortly. For quick updates, feel free to contact us
                  via{" "}
                  <span style={{ textDecoration: "underline" }}>WhatsApp.</span>
                </p>

                <div className="mt-[10px]">
                  <strong>Delivery: Dec 08 - 11</strong>

                  <div className="mt-3 flex items-center gap-[10px]">
                    <div className="w-[22px] h-[22px] rounded-full bg-[#000] flex items-center  justify-center">
                      <BsFillBoxSeamFill size={12} fill="#fff" />
                    </div>

                    <strong>Delivery update</strong>

                    <div
                      onClick={() => setViewAll(!viewAll)}
                      className="flex items-center text-[#00d] ml-[auto]"
                    >
                      <span>View {viewAll ? "less" : "all"}</span>{" "}
                      <RiArrowDropRightLine size={22} />
                    </div>
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
                    <p className="font-[outfit] text-[15px] text-[#000] mt-2" style={{margin: "0px"}}>
                      Name: {data?.details?.name}
                    </p>
                    <p className="font-[outfit] text-[15px] text-[#000]" style={{margin: "0px"}}>
                      Email: {data?.details?.email}
                    </p>
                    <p className="font-[outfit] text-[15px] text-[#000]" style={{margin: "0px"}}>
                      Phone: {data?.details?.phone}
                    </p>
<p className="font-[outfit] text-[15px] text-[#000]" style={{margin: "0px"}}>
                      Product details
                    </p>
                    <div>
                      {mappProductDetails}
                    </div>
                  </div>




                  





                  <div className="mt-3 flex items-center gap-[10px]">
                    <div
                      className="w-[23px] h-[23px] rounded-full flex items-center justify-center"
                      style={{ border: "1px solid #000" }}
                    >
                      <HiMiniHome size={17} fill="#000" />
                    </div>

                    <strong>{data?.delivery?.is_pickup ? "Pickup" : "Delivery address"}</strong>
                  </div>

                  <div className="ml-[33px]">
                   {data?.delivery?.is_pickup ? <p className="font-[outfit] text-[15px] text-[#000] mt-2" style={{margin: "0px"}}>
                      3 Iperu Akesan street, beside Access Bank, Alagutan b/stop,
                Iyana Ipaja Alimosho, Lagos
                    </p> :  <>
                    <p className="font-[outfit] text-[15px] text-[#000] mt-2" style={{margin: "0px"}}>
                      State: {data?.delivery?.address?.state}
                    </p>
                    <p className="font-[outfit] text-[15px] text-[#000]" style={{margin: "0px"}}>
                      Address: {data?.delivery?.address?.address}
                    </p>
                    <p className="font-[outfit] text-[15px] text-[#000]" style={{margin: "0px"}}>
                      City: {data?.delivery?.address?.city}
                    </p>
                    {data?.delivery?.address?.zip && <p className="font-[outfit] text-[15px] text-[#000]" style={{margin: "0px"}}>
                      Zip: {data?.delivery?.address?.zip}
                    </p>}
                    </>}
                  </div>

                </div>
              </div>
            </>
          </div>
        )}
      </div>

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
                  With over 25 years of experience
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
