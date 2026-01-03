import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftBrochures from "./leftBrochures";
import RightBrochures from "./rightBrochures";
import { useNavigate } from "react-router-dom";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import toast from "react-hot-toast";
import { MainContext } from "../../../App";

const Brochures = () => {
  const CTX = useContext(MainContext);
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);

  const { checkRight } = useCheckRight();
  const navigation = useNavigate();
  const [newProduct, setNewProduct] = useState("");
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState([
    { name: "3.5” x 2.25”", selected: true },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Saddle Stitch", selected: true },
    { name: "Perfect Binding", selected: false },
    { name: "Spiral Binding", selected: false },
    { name: "Wire-O Binding", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Single Fold (Bi-fold)", selected: true },
    { name: "Tri-fold", selected: false },
    { name: "Z-fold", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Art Paper(Gloss)", selected: true },
    { name: "Matte Paper", selected: false },
    { name: "Standard Bond", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Cover – Art Card 300gsm", selected: false },
    { name: "Inside pages: 150gsm", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Sugar", selected: false },
    { name: "Gloss", selected: false },
    { name: "Matte", selected: false },
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
      name: "Brochures",
      details: [
        { type: "text", key: "Quantity", value: inputs?.quantity },
        { type: "text", key: "Number of pages", value: inputs?.pages },

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
          key: "Lamination Type",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Folding Style",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Paper Weight",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Binding Type",
          value: printStyle.filter((v) => v.selected)[0]?.name,
        },

        {
          type: "boolean",
          key: "Do you need a printed sample/proof before full production",
          value: sampleProof,
        },
        {
          type: "text",
          key: "Additional note",
          value: inputs?.additional,
        },
        {
          type: "boolean",
          key: "Do you need a printed sample/proof before full production?",
          value: sampleProof,
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

        // {
        //   type: "file",
        //   data: inputs?.user_design,
        //   key: "user_design",
        //   value: null,
        //   imgObj: null,
        // },
        // {
        //   type: "file",
        //   data: inputs?.upload_design,
        //   key: "upload_design",
        //   value: null,
        //   imgObj: null,
        // },
        // {
        //   type: "file",
        //   data: inputs?.reference,
        //   key: "reference",
        //   value: null,
        //   imgObj: null,
        // },
      ],
    };

    return orderDetails;
  };

  const submitButton = async () => {
    try {
      const hasError = checkRight();

      if (hasError) return;

      if (!inputs?.quantity) {
        toast.error("Input quantity details and continue");
        return;
      }

      if (!inputs?.pages) {
        toast.error("Number of pages is required");
        return;
      }

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

    if (!inputs?.quantity) {
      toast.error("Input quantity details and continue");
      return;
    }

    if (!inputs?.pages) {
      toast.error("Number of pages is required");
      return;
    }

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
        <LeftBrochures
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
          submitButton={submitButton}
          loading={loading}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          proceedHandler={proceedHandler}
        />

        <RightBrochures />
      </div>
    </div>
  );
};

export default Brochures;
