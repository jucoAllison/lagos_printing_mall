import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftJotters from "./leftJotters";
import RightJotters from "./rightJotters";

const Jotters = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [intendedPurpose, setIntendedPurpose] = useState([
    { name: "Corporate branding", selected: true },
    { name: "Souvenirs", selected: false },
    { name: "School use", selected: false },
    { name: "Event giveaway", selected: false },
    { name: "Retail sale", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "50", selected: true },
    { name: "60", selected: false },
    { name: "80", selected: false },
    { name: "100", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Landscape", selected: false },
    { name: "Portrait", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "A6", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "70gsm Bond Paper", selected: true },
    { name: "80gsm Bond Paper", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "One color", selected: false },
    { name: "Full color", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "250gsm Art Card", selected: true },
    { name: "300gsm / 350gsm Art Card", selected: false },
    { name: "Hard Cover (board wrapped with printed sheet)", selected: false },
    { name: "Transparent PVC Cover", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Cover – Art Card 300gsm", selected: false },
    { name: "Inside pages: 150gsm", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Sugar", selected: false },
    { name: "Gloss", selected: false },
    { name: "Matte", selected: false },
    { name: "3D", selected: false },
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
  const [bindingType, setBindingType] = useState([
    { name: "Wire-O binding", selected: true },
    { name: "Saddle stitch (stapled)", selected: false },
    { name: "Perfect binding (glued spine)", selected: false },
  ]);
  const [bindingPosition, setBindingPosition] = useState([
    { name: "Top", selected: false },
    { name: "Side", selected: true },
  ]);
  const [tearOff, setTearOff] = useState(false);

  return (
    <div className={Classes.coverHere}>
      <div className={Classes.bottomSomething}>
        <LeftJotters
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
          intendedPurpose={intendedPurpose}
          setIntendedPurpose={setIntendedPurpose}
          bindingType={bindingType}
          setBindingType={setBindingType}
          bindingPosition={bindingPosition}
          setBindingPosition={setBindingPosition}
          tearOff={tearOff}
          setTearOff={setTearOff}
        />

        <RightJotters
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

export default Jotters;
