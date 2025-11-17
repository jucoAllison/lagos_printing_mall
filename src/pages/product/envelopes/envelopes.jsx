import React, { useState } from "react";
import Classes from "../product.module.css";
import Leftenvelopes from "./leftenvelopes";
import Rightenvelopes from "./rightenvelopes";

const Envelopes = () => {
 const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [size, setSize] = useState([
    { name: "C6", selected: true },
    { name: "DL", selected: false },
    { name: "C5", selected: false },
    { name: "9x12", selected: false },
    { name: "A5", selected: false },
    { name: "A4", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Raised Spot UV", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Plain (No Window)", selected: true },
    { name: "Window Envelope", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Straight", selected: true },
    { name: "Peel & Seal", selected: false },
    { name: "Self-Seal", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Standard white bond", selected: true },
    { name: "Brown kraft", selected: false },
    { name: "White premium", selected: false },
    { name: "Cream premium", selected: false },
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
        <Leftenvelopes
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
        />

        <Rightenvelopes
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

export default Envelopes