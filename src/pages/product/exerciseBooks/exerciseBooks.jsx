import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftExerciseBooks from "./leftExerciseBooks";
import RightExerciseBooks from "./rightExerciseBooks";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ExerciseBooks = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  
  
    const CTX = useContext(MainContext);
    const { checkRight } = useCheckRight();
    const navigation = useNavigate();
    const [newProduct, setNewProduct] = useState("");
    const [loading, setLoading] = useState(false);
  
   

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






  






  const sendOrder = async (order) => {
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("order", JSON.stringify(order));
      formData.append("boom", "bang");

      // Iterate products and attach files found in details
      order.products.forEach((product, pIndex) => {
        if (!product.details || !Array.isArray(product.details)) return;

        product.details.forEach((detail) => {
          if (detail.type !== "file") return;
          const fieldKey = detail.key; // e.g. "user_design"

          const data = detail.data;
          if (!data) return;

          // If it's a FileList or array-like
          if (typeof data.length === "number" && data instanceof FileList) {
            [...data].forEach((file) => {
              // name: product_<index>_<fieldKey>[]  (multiple)
              formData.append(`product_${pIndex}_${fieldKey}[]`, file);
            });
          } else if (Array.isArray(data)) {
            data.forEach((file) => {
              formData.append(`product_${pIndex}_${fieldKey}[]`, file);
            });
          } else if (data instanceof File) {
            // single file
            formData.append(`product_${pIndex}_${fieldKey}`, data);
          }
        });
      });

      const fetched = await fetch(`${CTX.url}v1/account/create/order`, {
        method: "POST",
        body: formData,
      });

      const jsoned = await fetched.json();
      setLoading(false);

      if (jsoned.m) {
        if (jsoned.m?.includes("File size too large")) {
          toast.error("File size too large");
          return;
        }
        toast.error(jsoned.m);
        return;
      }

      navigation(`/account/track/${jsoned.data?.track}`);
      // console.log("jsoned.data =>> ", jsoned.data);
    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);

      toast.error("Check your internet connection and continue!");
    }
  };

  const returnOrder = () => {
    const orderDetails = {
      name: "Exercise Book",
      details: [
        {
          type: "text",
          key: "Quantity",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "What is your target budget for this print job",
          value: inputs?.budget,
        },
        {
          type: "text",
          key: "What type of exercise book do you want to print",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Size",
          value: size.filter((v) => v.selected)[0]?.name?.includes("Custom") ? `Custom Size width: ${inputs?.width}inches length: ${inputs?.length}inches ` : size.filter((v) => v.selected)[0]?.name,
            width: inputs?.width,
            length: inputs?.length,
            ms: "inches",
        },
        {
          type: "text",
          key: "What cover material do you prefer",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Paper type for inner pages",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Printing on inner pages",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "How many leaves per book",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What binding type do you prefer",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },
        { type: "boolean", key: "Do you want matching school stationery?", value: schoolStationery },
        ...(schoolStationery
          ? [
               {
          type: "text",
          key: "Matching stationery",
          value: printStyle.filter((v) => v.selected)[0]?.name,
        },
            ]
          : []),
        {
          type: "text",
          key: "Additional note",
          value: inputs?.additional,
        },
        { type: "boolean", key: "Do you need a printed sample/proof before full production?", value: sampleProof },
        { type: "boolean", key: "Need design?", value: designReady },
        ...(designReady
          ? [
              {
                type: "file",
                data: inputs?.user_design,
                key: "user_design",
                value: null,
                imgObj: null,
              },
            ]
          : []),
        {
          type: "boolean",
          key: "Do you need design support?",
          value: designSupport,
        },
        ...(designSupport
          ? [
              {
                type: "file",
                data: inputs?.upload_design,
                key: "upload_design",
                value: null,
                imgObj: null,
              },
            ]
          : []),

        ...(designSupport
          ? [
              {
                type: "file",
                data: inputs?.reference,
                key: "reference",
                value: null,
                imgObj: null,
              },
            ]
          : []),
      ],
    };

    return orderDetails;
  };

  const recheckError = () => {
    if (!inputs?.quantity) {
      toast.error("Input quantity details and continue");
      return true;
    }

    if (!inputs?.budget) {
      toast.error("Target budget is required");
      return true;
    }

    return false;
  };

  const submitButton = async () => {
    try {
      const hasError = checkRight();

      if (hasError) return;

      const recheck = recheckError();

      if (recheck) return;

      const orderDetails = returnOrder();

      const order = {
        ...CTX.products,
        products: [...(CTX.products?.products || []), orderDetails],
      };

      sendOrder(order);
    } catch (error) {
      console.log("error =>> ", error);
      toast.error("Check your internet connection and continue");
    }
  };

  const proceedHandler = async () => {
    const hasError = checkRight();

    if (hasError) return;

    const recheck = recheckError();

    if (recheck) return;

    const orderDetails = returnOrder();

    const order = orderDetails;
    CTX.setProducts({
      ...CTX.products,
      products: [...CTX.products.products, order],
    });

    const selecetd = newProduct;

    // find the to
    const findTo = CTX.proceedOptions?.filter((w) => w.name == selecetd);

    if (findTo.length < 1) {
      toast.error("Can't find product, please select another");
    }

    if (findTo[0]?.to?.length > 3) {
      navigation(findTo[0]?.to);
    } else {
      toast.error("No navigation for the selected product");
    }
  };

 
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



        
  
  
  submitButton={submitButton}
  loading={loading}
  setNewProduct={setNewProduct}
  newProduct={newProduct}
  proceedHandler={proceedHandler}
        />

        <RightExerciseBooks />
      </div>
    </div>
  );
};



export default ExerciseBooks