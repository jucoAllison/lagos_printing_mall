import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftPlasticIdCards from "./leftPlasticIdCards";
import RightPlasticIdCards from "./rightPlasticIdCards";

const PlasticIdCards = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [schoolStationery, setSchoolStationery] = useState(false);
  const [orientation, setOrientation] = useState([
    { name: "single-sided", selected: true },
    { name: "double-sided", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Yes", selected: true },
    { name: "No", selected: false },
  ]);
 
  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Plastic ID holders", selected: true },
    { name: "Lanyards (branded or plain), Clips", selected: false },
    { name: "Magnetic clips", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Staff ID Card", selected: true },
    { name: "Student ID Card", selected: false },
    { name: "Membership Card", selected: false },
    { name: "Access Control Card", selected: false },
    { name: "Visitor Card", selected: false },
    { name: "Loyalty or Club Card", selected: false },
    { name: "Event Pass", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Letterhead", selected: true },
    { name: "Envelope", selected: false },
    { name: "Staff handbook", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Hologram Overlay", selected: true },
    { name: "Microtext", selected: false },
    { name: "UV Print", selected: false },
    { name: "Embedded chip (for RFID/proximity cards)", selected: false },
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
        <LeftPlasticIdCards
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
          premiumFinishing={premiumFinishing}
          setPremiumFinishing={setPremiumFinishing}
          setSampleProof={setSampleProof}
          sampleProof={sampleProof}
          pages={pages}
          setPages={setPages}
          schoolStationery={schoolStationery}
          setSchoolStationery={setSchoolStationery}
          setOrientation={setOrientation}
          orientation={orientation}
        />

        <RightPlasticIdCards
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

export default PlasticIdCards