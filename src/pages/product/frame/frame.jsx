import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import RightGreetingCard from "./rightFrame";
import LeftGreetingCard from "./leftFrame";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Frame = () => {
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
    { name: "4x6", selected: true },
    { name: "5x7", selected: false },
    { name: "8x10", selected: false },
    { name: "11x14", selected: false },
    { name: "16x20", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Photograph", selected: true },
    { name: "Certificate", selected: false },
    { name: "Award", selected: false },
    { name: "Artwork/Painting", selected: false },
    { name: "Poster", selected: false },
    { name: "Memorabilia", selected: false },
    { name: "Corporate Display", selected: false },
    { name: "Home Décor", selected: false },
  ]);
  const [format, setFormat] = useState([
    { name: "Home", selected: true },
    { name: "Office", selected: false },
    { name: "School", selected: false },
    { name: "Church", selected: false },
    { name: "Event Venue", selected: false },
    { name: "Outdoor Frame", selected: false },
  ]);
  const [orientation, setOrientation] = useState([
    { name: "Portrait", selected: true },
    { name: "Landscape", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Wood", selected: true },
    { name: "MDF", selected: false },
    { name: "Aluminum", selected: false },
    { name: "Acrylic", selected: false },
    { name: "Metal", selected: false },
  ]);
  const [paperWeight, setPaperWeight] = useState([
    { name: "Black", selected: true },
    { name: "White", selected: false },
    { name: "Brown", selected: false },
    { name: "Gold", selected: false },
    { name: "Silver", selected: false },
    { name: "Natural wood", selected: false },
  ]);
  const [displayed, setDisplayed] = useState([
    { name: "Wall Hanging", selected: true },
    { name: "Table-Top Stand", selected: false },
    { name: "Easel Stand", selected: false },
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
      name: "Frames",
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
          key: "What is the frame for",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Where will the frame be used",
          value: format.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Frame Orientation",
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
          key: "Preferred Frame Material",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Frame Colour",
          value: paperWeight.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "How will the frame be displayed",
          value: displayed.filter((v) => v.selected)[0]?.name,
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
          displayed={displayed}
          setDisplayed={setDisplayed}
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

export default Frame;
