import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import RightGreetingCard from "./rightPen";
import LeftGreetingCard from "./leftPen";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PEN = () => {
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
  const [qualityLevel, setQualityLevel] = useState([
    { name: "Economy", selected: true },
    { name: "Standard", selected: false },
    { name: "Premium", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: "S", selected: true },
    { name: "M", selected: false },
    { name: "L", selected: false },
    { name: "XL", selected: false },
    { name: "XXL", selected: false },
    { name: "XXXL", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Corporate Branding", selected: true },
    { name: "Promotional Giveaway", selected: false },
    { name: "Event Souvenir", selected: false },
    { name: "Conference/Seminar", selected: false },
    { name: "School Use", selected: false },
    { name: "Retail Sale", selected: false },
  ]);
  const [format, setFormat] = useState([
    { name: "Adults", selected: true },
    { name: "Kids", selected: false },
  ]);
  const [orientation, setOrientation] = useState([
    { name: "Click", selected: true },
    { name: "Twist", selected: false },
    { name: "Capped", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Blue", selected: true },
    { name: "Black", selected: false },
    { name: "Red", selected: false },
  ]);
  const [paperWeight, setPaperWeight] = useState([
    { name: "Screen Printing", selected: true },
    { name: "UV", selected: false },
    { name: "Laser Engraving", selected: false },
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
      name: "Pen",
      details: [
        {
          type: "text",
          key: "Quantity",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "What color of pen do you want??",
          value: inputs?.color,
        },
        {
          type: "text",
          key: "What is the intended purpose",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Is this for",
          value: format.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Mechanism",
          value: orientation.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Quality Level",
          value: qualityLevel.filter((v) => v.selected)[0]?.name,
        },
        // {
        //   type: "text",
        //   key: "Size",
        //   value: size.filter((v) => v.selected)[0]?.name,
        // },
        {
          type: "text",
          key: "Pen ink color",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Preferred branding method",
          value: paperWeight
            .filter((v) => v.selected)[0]
            ?.name,
        },
        // {
        //   type: "boolean",
        //   key: "Do you need us to install the print?",
        //   value: needEnvelop,
        // },
        // ...(needEnvelop
        //   ? [
        //       {
        //         type: "text",
        //         key: "Installation location, height and accessibility",
        //         value: inputs?.location,
        //       },
        //     ]
        //   : []),

        // {
        //   type: "boolean",
        //   key: "Should we carry ladders or scaffolding?",
        //   value: envelopBranded,
        // },

        {
          type: "boolean",
          key: "Do you need a printed sample/proof before full production?",
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
      toast.error("How many mugs do you want? is required");
      return true;
    }
    if (!inputs?.color) {
      toast.error("What color of pen do you want? is required");
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
          qualityLevel={qualityLevel}
          setQualityLevel={setQualityLevel}
        />

        <RightGreetingCard />
      </div>
    </div>
  );
};

export default PEN;
