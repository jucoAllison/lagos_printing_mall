import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftCarBranding from "./leftCarBranding";
import RightCarBranding from "./rightCarBranding";

const CarBranding = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [schoolStationery, setSchoolStationery] = useState(false);
  const [previouslyBranded, setPreviouslyBranded] = useState(false);
  const [takeMeasurements, setTakeMeasurements] = useState(false);
  const [orientation, setOrientation] = useState([
    { name: "Advertisement", selected: true },
    { name: "Company Identity", selected: false },
    { name: "Event Promotion", selected: false },
    { name: "Product Marketing", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Fleet", selected: true },
    { name: "Single Vehicle", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "At our workshop", selected: true },
    { name: "At your location", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Car", selected: true },
    { name: "Bus", selected: false },
    { name: "Van", selected: false },
    { name: "Truck", selected: false },
    { name: "Tricycle (Keke)", selected: false },
    { name: "Motorcycle", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "WhatsApp", selected: true },
    { name: "Email", selected: false },
    { name: "Phone call", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Vinyl (standard)", selected: true },
    { name: "Reflective Vinyl", selected: false },
    { name: "One-Way Vision for Windows", selected: false },
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
        <LeftCarBranding
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
          previouslyBranded={previouslyBranded}
          setpreviouslyBranded={setPreviouslyBranded}
          takeMeasurements={takeMeasurements}
          setTakeMeasurements={setTakeMeasurements}
        />

        <RightCarBranding
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

export default CarBranding;
