import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import RightGreetingCard from "./rightGreetingCard";
import LeftGreetingCard from "./leftGreetingCard";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GreetingCard = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [needEnvelop, setNeedEnvelop] = useState(false);
  const [envelopBranded, setEnvelopBranded] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const CTX = useContext(MainContext);
  const { checkRight } = useCheckRight();
  const navigation = useNavigate();
  const [newProduct, setNewProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState([
    { name: "A6", selected: true },
    { name: "A5", selected: false },
    { name: "A4 Folded", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Birthday", selected: true },
    { name: "Wedding", selected: false },
    { name: "Anniversary", selected: false },
    { name: "Christmas", selected: false },
    { name: "New Year", selected: false },
    { name: "Valentine’s Day", selected: false },
    { name: "Corporate Appreciation", selected: false },
    { name: "Thank-you Card", selected: false },
    { name: "Get-well Card,", selected: false },
    { name: "Condolence/Sympathy", selected: false },
    { name: "Custom Occasion", selected: false },
  ]);
  const [format, setFormat] = useState([
    { name: "Flat Card", selected: true },
    { name: "Bi-fold (half fold)", selected: false },
    { name: "Tri-fold", selected: false },
  ]);
  const [orientation, setOrientation] = useState([
    { name: "Portrait", selected: true },
    { name: "Landscape", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Art Card", selected: true },
    { name: "Matte Card", selected: false },
    { name: "Glossy Card", selected: false },
  ]);
  const [paperWeight, setPaperWeight] = useState([
    { name: "250gsm", selected: true },
    { name: "300gsm", selected: false },
    { name: "400gsm", selected: false },
    { name: "Custom Weight", selected: false },
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
      name: "Greeting Cards",
      details: [
        {
          type: "text",
          key: "Quantity",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "Timeline",
          value: inputs?.timeline,
        },
        {
          type: "text",
          key: "What type of greeting card do you want to make",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What card format do you want",
          value: format.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Card Orientation",
          value: orientation.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Size",
          value: size.filter((v) => v.selected)[0]?.name?.includes("Custom")
            ? `Custom Size width: ${inputs?.width}inches length: ${inputs?.length}inches `
            : size.filter((v) => v.selected)[0]?.name,
          // value: size.filter((v) => v.selected)[0]?.name,
          width: inputs?.width,
          length: inputs?.length,
          ms: "inches",
        },
        {
          type: "text",
          key: "Paper Type",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Paper Weight",
          value: paperWeight
            .filter((v) => v.selected)[0]
            ?.name?.includes("Custom")
            ? `Custom weight: ${inputs?.weight}`
            : paperWeight.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "boolean",
          key: "Do you need envelopes?",
          value: needEnvelop,
        },
        ...(needEnvelop
          ? [
              {
                type: "text",
                key: "Envelope color",
                value: inputs?.color,
              },
            ]
          : []),

        {
          type: "boolean",
          key: "Should envelope be branded?",
          value: envelopBranded,
        },

        {
          type: "boolean",
          key: "Do you want samples before full production?",
          value: sampleProof,
        },
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
      toast.error("Quantity is required");
      return true;
    }
    if (!inputs?.timeline) {
      toast.error("Timeline is required");
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
        <LeftGreetingCard
          designReady={designReady}
          designSupport={designSupport}
          setDesignSupport={setDesignSupport}
          inputs={inputs}
          setInputs={setInputs}
          setDesignReady={setDesignReady}
          submitButton={submitButton}
          loading={loading}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          proceedHandler={proceedHandler}
          size={size}
          setSize={setSize}
          type={type}
          setType={setType}
          format={format}
          setFormat={setFormat}
          orientation={orientation}
          setOrientation={setOrientation}
          paperType={paperType}
          setPaperType={setPaperType}
          paperWeight={paperWeight}
          setPaperWeight={setPaperWeight}
          needEnvelop={needEnvelop}
          setNeedEnvelop={setNeedEnvelop}
          envelopBranded={envelopBranded}
          setEnvelopBranded={setEnvelopBranded}
          sampleProof={sampleProof}
          setSampleProof={setSampleProof}
        />

        <RightGreetingCard />
      </div>
    </div>
  );
};

export default GreetingCard;
