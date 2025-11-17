import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftLetterHead from "./leftLetterHead";
import RightLetterHead from "./rightLetterHead";

const LetterHead = () => { const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [size, setSize] = useState([
    { name: "A4 - Standard", selected: true },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Raised Spot UV", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Standard Bond Paper", selected: true },
    { name: "Premium Bond", selected: false },
    { name: "Conqueror Paper", selected: false },
  ]);
  const [gsm, setGsm] = useState([
    { name: "80gsm", selected: true },
    { name: "100gsm", selected: false },
    { name: "120gsm", selected: false },
  ]);
  const [frequency, setFrequency] = useState([
    { name: "weekly", selected: false },
    { name: "monthly", selected: false },
    { name: "yearly", selected: false },
  ]);
  const [deliveryMethod, setDeliveryMethod] = useState([
    { name: "Pickup", selected: true },
    { name: "Shipping", selected: false },
  ]);

  return (
    <div className={Classes.coverHere}>
      <div className={Classes.bottomSomething}>
        <LeftLetterHead
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
          premiumFinishing={premiumFinishing} 
          setPremiumFinishing={setPremiumFinishing}
          />

        <RightLetterHead
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

export default LetterHead