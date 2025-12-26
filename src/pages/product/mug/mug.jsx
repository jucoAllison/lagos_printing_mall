import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftMug from "./leftMug";
import RightMug from "./rightMug";

const Mug = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [orientation, setOrientation] = useState([
    { name: "White", selected: true },
    { name: "Black", selected: false },
    { name: "Coloured", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Left-Hand Side", selected: true },
    { name: "Right-Hand Side", selected: true },
    { name: "Center", selected: false },
    { name: "Wrap-Around Full Print", selected: false },
    { name: "Double-Sided Print", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Souvenirs", selected: true },
    { name: "Corporate Gifts", selected: false },
    { name: "Weddings", selected: false },
    { name: "Birthdays", selected: false },
    { name: "Promotional Branding", selected: false },
    { name: "Product Merch", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Ceramic Mug", selected: true },
    { name: "Magic/Color-Changing Mug", selected: false },
    { name: "Plastic Mug", selected: false },
    { name: "Stainless Steel Mug", selected: false },
    { name: "Glass Mug", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "WhatsApp", selected: true },
    { name: "Email", selected: false },
    { name: "Phone call", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Standard 11oz", selected: true },
    { name: "Large 15oz", selected: false },
    { name: "Small Custom Size", selected: false },
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
        <LeftMug
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
          setOrientation={setOrientation}
          orientation={orientation}
        />

        <RightMug
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

export default Mug