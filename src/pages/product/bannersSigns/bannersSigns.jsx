import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import RightGreetingCard from "./rightBannersSigns";
import LeftGreetingCard from "./leftBannersSigns";
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
    { name: "Custom Size", selected: true },
  ]);
  const [type, setType] = useState([
    { name: "Flex Banner", selected: true },
    { name: "Roll-up Banner", selected: false },
    { name: "Backdrop/Stage Backdrop", selected: false },
    { name: "Billboard", selected: false },
    { name: "Vinyl Sticker", selected: false },
    { name: "One-way Vision", selected: false },
    { name: "Foam board Signage", selected: false },
    { name: "Canvas Print", selected: false },
    { name: "Wall/floor Graphics,", selected: false },
    { name: "Directional Signage", selected: false },
  ]);
  const [format, setFormat] = useState([
    { name: "Event", selected: true },
    { name: "Branding", selected: false },
    { name: "Outdoor Advertising", selected: false },
    { name: "Store Display", selected: false },
    { name: "Promotional Campaign", selected: false },
  ]);
  const [orientation, setOrientation] = useState([
    { name: "Indoor", selected: true },
    { name: "Outdoor", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Foam Board", selected: true },
    { name: "PVC Board Acrylic", selected: false },
    { name: "ACO Board", selected: false },
  ]);
  const [paperWeight, setPaperWeight] = useState([
    { name: "Eyelets", selected: true },
    { name: "Pole Pockets", selected: false },
    { name: "Frame", selected: false },
    { name: "Hemming/edge Sealing", selected: false },
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
      name: "Banners/Signs",
      details: [
        {
          type: "text",
          key: "Quantity",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "What do you want to print",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What is the purpose of the print",
          value: format.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Where will it be used",
          value: orientation.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Size",
          value: size.filter((v) => v.selected)[0]?.name?.includes("Custom")
            ? `Custom Size width: ${inputs?.width}ft length: ${inputs?.length}ft `
            : size.filter((v) => v.selected)[0]?.name,
          // value: size.filter((v) => v.selected)[0]?.name,
          width: inputs?.width,
          length: inputs?.length,
          ms: "ft",
        },
        {
          type: "text",
          key: "Do you need mounting on",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you need",
          value: paperWeight
            .filter((v) => v.selected)[0]
            ?.name,
        },
        {
          type: "boolean",
          key: "Do you need us to install the print?",
          value: needEnvelop,
        },
        ...(needEnvelop
          ? [
              {
                type: "text",
                key: "Installation location, height and accessibility",
                value: inputs?.location,
              },
            ]
          : []),

        {
          type: "boolean",
          key: "Should we carry ladders or scaffolding?",
          value: envelopBranded,
        },

        {
          type: "boolean",
          key: "Do you need site measurement before production?",
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
