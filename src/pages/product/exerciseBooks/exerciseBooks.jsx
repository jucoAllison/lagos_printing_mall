import React, { useState } from "react";
import Classes from "../product.module.css";
import LeftExerciseBooks from "./leftExerciseBooks";
import RightExerciseBooks from "./rightExerciseBooks";

const ExerciseBooks = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [schoolStationery, setSchoolStationery] = useState(false)
  const [pages, setPages] = useState([
    { name: "60gsm bond paper", selected: true },
    { name: "70gsm bond paper", selected: false },
    { name: "80gsm bond paper", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Single colour (blue, black, grey, etc)", selected: true },
    { name: "Double-sided or Single-sided", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: 'A4', selected: true },
    { name: 'A5', selected: false },
    { name: '7” x 9” (standard school book size)', selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Letterheads", selected: true },
    { name: "ID cards", selected: false },
    { name: "Envelopes", selected: false },
    { name: "Report cards", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "20", selected: false },
    { name: "40", selected: true },
    { name: "60", selected: false },
    { name: "80", selected: false },
    { name: "100", selected: false },
    { name: "120", selected: false },
    { name: "160", selected: false },
    { name: "200", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "School Exercise Book", selected: true },
    { name: "Custom/Corporate-Branded Notebook", selected: false },
    { name: "Souvenir Exercise Book", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Saddle stitch (stapled)", selected: false },
    { name: "Perfect binding (glued spine)", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "200gsm", selected: false },
    { name: "250gsm", selected: false },
    { name: "300gsm Art Card", selected: false },
    { name: "Duplex board (for cost-saving options)", selected: false },
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
        <LeftExerciseBooks
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
        />

        <RightExerciseBooks
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



export default ExerciseBooks