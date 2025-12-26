import React, { useState } from "react";
import Classes from "../product.module.css";
import RightStickers from "./rightStickers";
import LeftStickers from "./leftStickers";

const Stickers = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [installThePrint, setInstallThePrint] = useState(false);
  const [ladders, setLadders] = useState(false);
  const [gsm, setGsm] = useState([
    { name: "Individually cut (die-cut singles)", selected: true },
    { name: "On sheets", selected: false },
    { name: "On rolls", selected: false },

  ])
  const [purpose, setPurpose] = useState([
    { name: "Square", selected: true },
    { name: "Rectangle", selected: false },
    { name: "Circle", selected: false },
    { name: "Oval", selected: false },
    { name: "Custom Die-Cut", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Matte Lamination", selected: false },
    { name: "Gloss Lamination", selected: false },
    { name: "No Lamination", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "2x3 inches", selected: false },
    { name: "5cm x 7cm", selected: false },
    { name: "Custom Size", selected: true },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "White Vinyl", selected: false },
    { name: "Clear Vinyl", selected: false },
    { name: "Matte or Gloss Finish", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Flat Surface", selected: true },
    { name: "Curved Surface", selected: false },
    { name: "Bottle", selected: false },
    { name: "Jar", selected: false },
    { name: "Packaging", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Matte Paper", selected: true },
    { name: "Gloss Paper", selected: false },
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
        <LeftStickers
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

        <RightStickers
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

export default Stickers;
