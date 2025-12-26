import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftLargeFormatPrinting from "./leftLargeFormatPrinting";
import RightLargeFormatPrinting from "./rightLargeFormatPrinting";

const LargeFormatPrinting = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [installThePrint, setInstallThePrint] = useState(false);
  const [ladders, setLadders] = useState(false);
  ladders;
  const [purpose, setPurpose] = useState([
    { name: "Event", selected: true },
    { name: "Branding", selected: false },
    { name: "Outdoor Advertising", selected: false },
    { name: "Store Display", selected: false },
    { name: "Promotional Campaign", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Eyelets", selected: false },
    { name: "Pole pockets", selected: false },
    { name: "Frame", selected: false },
    { name: "Hemming/Edge Sealing", selected: false },
  ]);

  const [size, setSize] = useState([{ name: "Custom Size", selected: true }]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Foam Board", selected: false },
    { name: "PVC Board Acrylic", selected: false },
    { name: "ACO Board", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Flex Banner", selected: true },
    { name: "Roll-Up Banner", selected: false },
    { name: "Backdrop / Stage Backdrop", selected: false },
    { name: "Billboard", selected: false },
    { name: "Vinyl Sticker", selected: false },
    { name: "One-Way Vision", selected: false },
    { name: "Foam Board Signage", selected: false },
    { name: "Canvas Print", selected: false },
    { name: "Wall/Floor Graphics", selected: false },
    { name: "Directional Signage", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Indoor", selected: true },
    { name: "Outdoor", selected: false },
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
        <LeftLargeFormatPrinting
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
        />

        <RightLargeFormatPrinting
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

export default LargeFormatPrinting;
