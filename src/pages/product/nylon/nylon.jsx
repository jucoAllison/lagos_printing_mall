import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftNylon from "./leftNylon";
import RightNylon from "./rightNylon";

const Nylon = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [installThePrint, setInstallThePrint] = useState(false);
  const [ladders, setLadders] = useState(false);
  const [gsm, setGsm] = useState([
    { name: "Stickers", selected: true },
    { name: "Labels", selected: false },
    { name: "Business Cards", selected: false },
    { name: "Branded Packaging", selected: false },
  ]);
  const [purpose, setPurpose] = useState([
    { name: "Flat", selected: true },
    { name: "Die-Cut handle", selected: false },
    { name: "Soft Loop Handle", selected: false },
    { name: "Patch Handle", selected: false },
    { name: "Punch Handle", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Black", selected: false },
    { name: "White", selected: false },
    { name: "Red", selected: false },
    { name: "Blue", selected: false },
    { name: "Metallic (gold/silver)", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "Light (12–20 microns)", selected: false },
    { name: "Medium (25–35 microns)", selected: false },
    { name: "Heavy-duty (40–70 microns)", selected: true },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "1 color", selected: false },
    { name: " 2 colors", selected: false },
    { name: "3+ colors", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Shopping Nylon", selected: true },
    { name: "Event Gift Nylon", selected: false },
    { name: "Bread Nylon", selected: false },
    { name: "Laundry Nylon", selected: false },
    { name: "Boutique Nylon", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "One side only", selected: true },
    { name: "Both sides", selected: false },
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
        <LeftNylon
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
          lamination={lamination}
          setLamination={setLamination}
          premiumFinishing={premiumFinishing}
          setPremiumFinishing={setPremiumFinishing}
          pages={pages}
          setPages={setPages}
          setInstallThePrint={setInstallThePrint}
          installThePrint={installThePrint}
          purpose={purpose}
          setPurpose={setPurpose}
          ladders={ladders}
          setLadders={setLadders}
          setGsm={setGsm}
          gsm={gsm}
        />

        <RightNylon
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

export default Nylon;
