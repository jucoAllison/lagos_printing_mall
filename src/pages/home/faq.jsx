import React, { useState } from "react";
import Classes from "./home.module.css";
import { RiArrowUpSLine } from "react-icons/ri";

const Faq = () => {
  const [faqs, setFaqs] = useState([
    {
      selected: false,
      q: "How do I place an order?",
      a: "Submitting an order is quick and straightforward. Select a product of choice at the top of the page and provide the required details, or email us at sales@lagosprintingmall.com for immediate personalized assistance.",
    },

    {
      selected: false,
      q: "What is the Best time to place my Order?",
      a: "Absolutely! Lagos Printing Mall is a true 24-hour commercial printer, ready whenever you are. Need booklet printing fast? We’re always available. Call us anytime for a quick quote!",
    },

    {
      selected: false,
      q: "Do you offer free delivery?",
      a: "We don’t provide free delivery, but you can conveniently use your LPM points to cover dispatch costs.",
    },
  ]);

  const setSelectedHandler = (i) => {
    const spread = [...faqs];
    // find index
    const maps = spread.map((v) => {
      return { ...v, selected: false };
    });

    maps[i].selected = true;

    setFaqs(maps);

    // if (selected?.q == v?.q) {
    //   setSelected(null);
    // } else {
    //   setSelected(v);
    // }
  };

  //   console.log("selected =>>> ", selected);

  const mapedFAQ = faqs.map((v, i) => (
    <div
      style={{
        borderBottom: "1px #414137 solid",
        width: "800px",
        paddingBottom: "10px",
        maxWidth: "92%",
        margin: "auto",
      }}
      key={i}
    >
      <div onClick={() => setSelectedHandler(i)} className="py-[19px]">
        <div className=" font-bold text-[17px] sm:text-[20px]  flex items-center justify-between cursor-pointer">
          <div>{v?.q}</div>

          <RiArrowUpSLine
            color="#000"
            size={26}
            style={{ transform: "rotate(180deg)" }}
          />
        </div>
      </div>

      <div
        style={{
          transition: "1s",
          height: v?.selected ? "max-content" : "0px",
          overflow: "hidden",
        }}
        className="pr-[10px] "
      >
        {v?.a}
      </div>
    </div>
  ));

  return (
    <div className="mt-[50px] w-full bg-[#f2a0c6] py-[40px]">
      <div className="text-center font-bold sm:text-[44px] text-[24px] font-[Righteous]">
        Frequently Asked Questions
      </div>
      <div className="my-5">{mapedFAQ}</div>
    </div>
  );
};

export default Faq;
