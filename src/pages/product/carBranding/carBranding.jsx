import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftCarBranding from "./leftCarBranding";
import RightCarBranding from "./rightCarBranding";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CarBranding = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [schoolStationery, setSchoolStationery] = useState(false);
  const [previouslyBranded, setPreviouslyBranded] = useState(false);
  const [takeMeasurements, setTakeMeasurements] = useState(false);

  const CTX = useContext(MainContext);
  const { checkRight } = useCheckRight();
  const navigation = useNavigate();
  const [newProduct, setNewProduct] = useState("");
  const [loading, setLoading] = useState(false);

  const [orientation, setOrientation] = useState([
    { name: "Advertisement", selected: true },
    { name: "Company Identity", selected: false },
    { name: "Event Promotion", selected: false },
    { name: "Product Marketing", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Fleet", selected: true },
    { name: "Single Vehicle", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "At our workshop", selected: true },
    { name: "At your location", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Car", selected: true },
    { name: "Bus", selected: false },
    { name: "Van", selected: false },
    { name: "Truck", selected: false },
    { name: "Tricycle (Keke)", selected: false },
    { name: "Motorcycle", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "WhatsApp", selected: true },
    { name: "Email", selected: false },
    { name: "Phone call", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Vinyl (standard)", selected: true },
    { name: "Reflective Vinyl", selected: false },
    { name: "One-Way Vision for Windows", selected: false },
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
      name: "Vehicle Wraps/Car Branding",
      details: [
        {
          type: "text",
          key: "What is your budget range",
          value: inputs?.range,
        },
        {
          type: "text",
          key: "What is the exact make, model, and year of the vehicle",
          value: inputs?.vehicle,
        },
        {
          type: "text",
          key: "What date and time is convenient for installation",
          value: inputs?.date,
        },
        {
          type: "text",
          key: "What type of vehicle do you want to brand",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What is the primary purpose of the branding",
          value: orientation.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What type of branding material do you prefer",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Where should installation take place",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "How many vehicles are you branding",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Preferred communication method",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "boolean",
          key: "Is the vehicle available and clean for installation?",
          value: schoolStationery,
        },
        {
          type: "boolean",
          key: "Previously branded?",
          value: previouslyBranded,
        },
        ...(inputs?.vehiclePhotos
          ? [
              {
                type: "file",
                data: inputs?.vehiclePhotos,
                key: "vehicle_photos",
                value: null,
                imgObj: null,
              },
            ]
          : []),
        {
          type: "boolean",
          key: "Should we come and take measurements?",
          value: takeMeasurements,
        },
        ...(!takeMeasurements
          ? [
              {
                type: "text",
                key: "Do you have the vehicle dimensions",
                value: `Width: ${inputs?.vehicleWidth}inches Length: ${inputs?.vehicleLength}inches Height: ${inputs?.vehicleHeight}inches `,
              },
            ]
          : []),

        {
          type: "text",
          key: "Additional note",
          value: inputs?.additional,
        },
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
    if (!inputs?.vehiclePhotos) {
      toast.error("Send clear photos of the vehicle and continue");
      return true;
    }

    if (!inputs?.range) {
      toast.error("Budget range is required");
      return true;
    }

    if (!inputs?.vehicle) {
      toast.error(
        "What is the exact make, model, and year of the vehicle is required"
      );
      return true;
    }

    if (!inputs?.date) {
      toast.error(
        "What date and time is convenient for installation is required"
      );
      return true;
    }

    if (!takeMeasurements && !inputs?.vehicleWidth) {
      toast.error("vehicle width is required");
      return true;
    }

    if (!takeMeasurements && !inputs?.vehicleLength) {
      toast.error("vehicle length is required");
      return true;
    }

    if (!takeMeasurements && !inputs?.vehicleHeight) {
      toast.error("vehicle height is required");
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
        <LeftCarBranding
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
          schoolStationery={schoolStationery}
          setSchoolStationery={setSchoolStationery}
          setOrientation={setOrientation}
          orientation={orientation}
          previouslyBranded={previouslyBranded}
          setpreviouslyBranded={setPreviouslyBranded}
          takeMeasurements={takeMeasurements}
          setTakeMeasurements={setTakeMeasurements}
          submitButton={submitButton}
          loading={loading}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          proceedHandler={proceedHandler}
        />

        <RightCarBranding />
      </div>
    </div>
  );
};

export default CarBranding;
