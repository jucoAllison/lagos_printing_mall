import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftBC from "./leftBC";
import RightBC from "./rightBC";

const BusinessCard = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [size, setSize] = useState([
    { name: "3.5” x 2.25”", selected: true },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Single", selected: true },
    { name: "Double Sided", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Rounded Edges", selected: true },
    { name: "Raised Spot UV", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Art Card", selected: true },
    { name: "Matte Card", selected: false },
    { name: "Plastic", selected: false },
    { name: "PVC", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "300gsm", selected: true },
    { name: "500gsm", selected: false },
    { name: "600gsm", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Sugar", selected: false },
    { name: "Gloss", selected: false },
    { name: "Matte", selected: false },
    { name: "Diecut Edges", selected: false },
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
        <LeftBC
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
        />

        <RightBC
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

export default BusinessCard;
