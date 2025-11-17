import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftWeddingCards from "./leftWeddingCards";
import RightWeddingCards from "./rightWeddingCards";

const WeddingCards = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [pages, setPages] = useState([
    { name: "Wax seal", selected: false },
    { name: "Sticker", selected: false },
    { name: "Ribbon", selected: false },
    { name: "Custom tag", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Boxes", selected: false },
    { name: "Wraps", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: 'Elegant', selected: true },
    { name: 'Royal', selected: false },
    { name: "Minimalist", selected: false },
    { name: "Traditional", selected: false },
    { name: "Cultural", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Saddle Stitch", selected: true },
    { name: "Perfect Binding", selected: false },
    { name: "Spiral Binding", selected: false },
    { name: "Wire-O Binding", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Yes", selected: true },
    { name: "No", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Single flat card", selected: true },
    { name: "Folded card", selected: false },
    { name: "Boxed invitation", selected: false },
    { name: "Scroll or custom shape", selected: false },
    { name: "Acrylic or transparent card", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Cover – Art Card 300gsm", selected: false },
    { name: "Inside pages: 150gsm", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Menu cards", selected: false },
    { name: "Table tags", selected: false },
    { name: "Programs", selected: false },
    { name: "Souvenir", selected: false },
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
        <LeftWeddingCards
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
          printStyle={printStyle}
          setPrintStyle={setPrintStyle}
          premiumFinishing={premiumFinishing}
          setPremiumFinishing={setPremiumFinishing}
          setSampleProof={setSampleProof}
          sampleProof={sampleProof}
          pages={pages}
          setPages={setPages}
          type={type}
          setType={setType}
        />

        <RightWeddingCards
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


export default WeddingCards