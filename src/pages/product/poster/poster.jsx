import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftPoster from "./leftPoster";
import RightPoster from "./rightPoster";

const Poster = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [size, setSize] = useState([
    { name: "A3", selected: true },
    { name: "A2", selected: false },
    { name: "A1", selected: false },
    { name: "Custom Size", selected: false },
  ]);

  const [paperType, setPaperType] = useState([
    { name: "Art Paper(Gloss)", selected: true },
    { name: "Matte Paper", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "115gsm", selected: true },
    { name: "135gsm", selected: false },
    { name: "150gsm", selected: false },
    { name: "170gsm", selected: false },
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
        <LeftPoster
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
          />

        <RightPoster
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

export default Poster;
