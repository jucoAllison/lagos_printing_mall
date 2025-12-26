import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftGraphicsDesign from "./leftGraphicsDesign";
import RightGraphicsDesign from "./rightGraphicsDesign";

const GraphicsDesign = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [installThePrint, setInstallThePrint] = useState(false);
  const [purpose, setPurpose] = useState([
    { name: "WhatsApp", selected: true },
    { name: "Email", selected: false },
    { name: "Phone call", selected: false },
  ]);
  //   const);

  const [size, setSize] = useState([
    { name: "Luxury", selected: false },
    { name: "Bold", selected: false },
    { name: "Colorful", selected: true },
    { name: "Vintage", selected: false },
    { name: "Corporate", selected: false },
    { name: "Youthful", selected: false },
    { name: "Elegant", selected: false },
    { name: "Tech/Modern", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Print", selected: true },
    { name: "Social Media", selected: false },
    { name: "Website", selected: false },
    { name: "Others", selected: false },
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState([
    { name: "Pickup", selected: true },
    { name: "Shipping", selected: false },
  ]);

  return (
    <div className={Classes.coverHere}>
      <div className={Classes.bottomSomething}>
        <LeftGraphicsDesign
          inputs={inputs}
          setInputs={setInputs}
          size={size}
          setSize={setSize}
          wantToPrint={wantToPrint}
          setWantToPrint={setWantToPrint}
          designReady={designReady}
          setDesignReady={setDesignReady}
          designSupport={designSupport}
          setDesignSupport={setDesignSupport}
          setInstallThePrint={setInstallThePrint}
          installThePrint={installThePrint}
          purpose={purpose}
          setPurpose={setPurpose}
        />

        <RightGraphicsDesign
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
          inputs={inputs}
          setInputs={setInputs}
        />
      </div>
    </div>
  );
};

export default GraphicsDesign;
