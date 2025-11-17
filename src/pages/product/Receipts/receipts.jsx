import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftReceipts from "./leftReceipts";
import RightReceipts from "./rightReceipts";

const Receipts = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [numbering, setNumbering] = useState(false);
  const [pages, setPages] = useState([
    { name: "Thick card cover", selected: true },
    { name: "Printed cover with branding", selected: false },
    { name: "Plain paper cover", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Side", selected: true },
    { name: "Top", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "1/3 of A4", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "One color", selected: true },
    { name: "Full color", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Landscape", selected: false },
    { name: "Portrait", selected: true },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "NCR (Carbonless) paper", selected: true },
    { name: "Standard bond paper (if using carbon sheets)", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Yes", selected: false },
    { name: "No", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "55gsm", selected: true },
    { name: "70gsm", selected: false },
    { name: "80gsm", selected: false },
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
        <LeftReceipts
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
          numbering={numbering}
          setNumbering={setNumbering}
        />

        <RightReceipts
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

export default Receipts;
