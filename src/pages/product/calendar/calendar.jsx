import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftCalendar from "./leftCalendar";
import RightCalendar from "./rightCalendar";

const Calendar = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [pages, setPages] = useState([
    { name: "Single sheet (poster style)", selected: true },
    { name: "Full 12-month pages + cover = 13 sheets", selected: false },
    { name: "2-month pages + cover = 7 sheets", selected: false },
    { name: "3-month pages + cover = 5 sheets", selected: false },
    { name: "4-month pages + cover = 4 sheets", selected: false },
    { name: "6-month pages + cover = 3 sheets", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Art paper(gloss)", selected: true },
    { name: "Matte paper", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: 'Wall calendar: A2 / A3 / A4 / 11"x17"', selected: true },
    { name: 'Desk/table top: A5 / 8"x6"', selected: false },
    { name: "Pocket: Credit Card Size", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Saddle Stitch", selected: true },
    { name: "Perfect Binding", selected: false },
    { name: "Spiral Binding", selected: false },
    { name: "Wire-O Binding", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Single Side", selected: false },
    { name: "Double Side", selected: true },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Wall calendar", selected: true },
    { name: "Desk/Table Top Spiral Calendar", selected: false },
    { name: "Pocket Calendar", selected: false },
    { name: "Poster Calendar", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Cover – Art Card 300gsm", selected: false },
    { name: "Inside pages: 150gsm", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Sugar", selected: false },
    { name: "Gloss", selected: false },
    { name: "Matte", selected: false },
  ]);
  const [frequency, setFrequency] = useState([
    { name: "Weekly", selected: false },
    { name: "Monthly", selected: false },
    { name: "Yearly", selected: false },
  ]);
  const [deliveryMethod, setDeliveryMethod] = useState([
    { name: "Pickup", selected: true },
    { name: "Shipping", selected: false },
  ]);

  return (
    <div className={Classes.coverHere}>
      <div className={Classes.bottomSomething}>
        <LeftCalendar
          inputs={inputs}
          setInputs={setInputs}
          size={size}
          setSize={setSize}
          paperType={paperType}
          setPaperType={setPaperType}
          gsm={gsm}
          setGsm={setGsm}
          designReady={designReady}
          setDesignReady={setDesignReady}
          designSupport={designSupport}
          setDesignSupport={setDesignSupport}
          lamination={lamination}
          setLamination={setLamination}
          printStyle={printStyle}
          setPrintStyle={setPrintStyle}
          premiumFinishing={premiumFinishing}
          setPremiumFinishing={setPremiumFinishing}
          setSampleProof={setSampleProof}
          sampleProof={sampleProof}
          pages={pages}
          setPages={setPages}
          type={type}
          setType={setType}
        />

        <RightCalendar
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
          inputs={inputs}
          setInputs={setInputs}
          frequency={frequency}
          setFrequency={setFrequency}
          setRecurring={setRecurring}
          recurring={recurring}
        />
      </div>
    </div>
  );
};

export default Calendar;
