import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftBooks from "./leftBooks";
import RightBooks from "./rightBooks";

const Books = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [schoolStationery, setSchoolStationery] = useState(false);
  const [barcodePrinting, setBarcodePrinting] = useState(false);
  const [isImages, setIsImages] = useState(false);
  const [eBook, setEBook] = useState(false);
  const [orientation, setOrientation] = useState([
    { name: "Portrait", selected: true },
    { name: "Landscape", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "70gsm bond paper", selected: true },
    { name: "80gsm bond paper", selected: false },
    { name: "100gsm bond paper", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Single color (blue, black, grey, etc)", selected: true },
    { name: "Full color", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Letterheads", selected: true },
    { name: "ID cards", selected: false },
    { name: "Envelopes", selected: false },
    { name: "Report cards", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Matte", selected: false },
    { name: "Gloss", selected: false },
    { name: "Sugar", selected: false },
    { name: "3D", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Novel", selected: true },
    { name: "Textbook", selected: false },
    { name: "Workbook", selected: false },
    { name: "Devotional", selected: false },
    { name: "Journal", selected: false },
    { name: "Magazine", selected: false },
    { name: "Poetry", selected: false },
    { name: "Storybook", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Saddle stitch (stapled)", selected: true },
    { name: "Perfect binding (glued spine)", selected: false },
    { name: "Spiral / Wire-O binding", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "200gsm", selected: true },
    { name: "250gsm", selected: false },
    { name: "300gsm Art Card", selected: false },
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
        <LeftBooks
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
          schoolStationery={schoolStationery}
          setSchoolStationery={setSchoolStationery}
          setBarcodePrinting={setBarcodePrinting}
          barcodePrinting={barcodePrinting}
          setIsImages={setIsImages}
          isImages={isImages}
          setEBook={setEBook}
          eBook={eBook}
          setOrientation={setOrientation}
          orientation={orientation}
        />

        <RightBooks
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

export default Books;
