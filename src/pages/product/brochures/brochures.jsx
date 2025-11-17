import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftBrochures from "./leftBrochures";
import RightBrochures from "./rightBrochures";

const Brochures = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [size, setSize] = useState([
    { name: "3.5” x 2.25”", selected: true },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Saddle Stitch", selected: true },
    { name: "Perfect Binding", selected: false },
    { name: "Spiral Binding", selected: false },
    { name: "Wire-O Binding", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Single Fold (Bi-fold)", selected: true },
    { name: "Tri-fold", selected: false },
    { name: "Z-fold", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Art Paper(Gloss)", selected: true },
    { name: "Matte Paper", selected: false },
    { name: "Standard Bond", selected: false },
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
        <LeftBrochures
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
        />

        <RightBrochures
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

export default Brochures;
