import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftFlyers from "./leftFlyers";
import RightFlyers from "./rightFlyers";

const Flyers = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [size, setSize] = useState([
    { name: "A3", selected: true },
    { name: "A4", selected: false },
    { name: "A5", selected: false },
    { name: "A6", selected: false },
    { name: "B2", selected: false },
    { name: "B3", selected: false },
    { name: "B4", selected: false },
    { name: "B5", selected: false },
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
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState([
    { name: "Pickup", selected: true },
    { name: "Shipping", selected: false },
  ]);

  return (
    <div className={Classes.coverHere}>
      <div className={Classes.bottomSomething}>
        <LeftFlyers
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

        <RightFlyers
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
          inputs={inputs}
          setInputs={setInputs}
        />
      </div>
    </div>
  );
};

export default Flyers;
