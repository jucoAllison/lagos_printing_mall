import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftReceipts from "./leftReceipts";
import RightReceipts from "./rightReceipts";
import toast from "react-hot-toast";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";

const Receipts = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [numbering, setNumbering] = useState(false);
  const CTX = useContext(MainContext);
  const navigation = useNavigate();
  const { checkRight } = useCheckRight();
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([
    { name: "Thick card cover", selected: true },
    { name: "Printed cover with branding", selected: false },
    { name: "Plain paper cover", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Side", selected: true },
    { name: "Top", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "1/3 of A4", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "One color", selected: true },
    { name: "Full color", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Landscape", selected: false },
    { name: "Portrait", selected: true },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "NCR (Carbonless) paper", selected: true },
    { name: "Standard bond paper (if using carbon sheets)", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Yes", selected: false },
    { name: "No", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "55gsm", selected: true },
    { name: "70gsm", selected: false },
    { name: "80gsm", selected: false },
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
      name: "Receipts/Invoices",
      details: [
        { type: "text", key: "Quantity", value: inputs?.quantity },
        {
          type: "text",
          key: "Size?",
          value: size.filter((v) => v.selected)[0]?.name,
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
          key: "Do you need Carbon Sheet",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Paper Weight",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Cover Type",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Should the perforation be on",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Orientation",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Printing Detail",
          value: printStyle.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Additional note",
          value: inputs?.additional,
        },
        { type: "boolean", key: "Any numbering required?", value: numbering },
        {
          type: "boolean",
          key: "Do you need a printed sample/proof before full production?",
          value: sampleProof,
        },
        { type: "boolean", key: "Need design?", value: designReady },

        {
          type: "file",
          data: inputs?.user_design,
          key: "user_design",
          value: null,
          imgObj: null,
        },
        {
          type: "file",
          data: inputs?.upload_design,
          key: "upload_design",
          value: null,
          imgObj: null,
        },
        {
          type: "file",
          data: inputs?.reference,
          key: "reference",
          value: null,
          imgObj: null,
        },
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

      const orderDetails = returnOrder();

      // const order = {
      //   ...CTX.products,
      //   products: [...CTX?.products?.products, orderDetails],
      // };

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
        <LeftReceipts
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
          numbering={numbering}
          setNumbering={setNumbering}
          loading={loading}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          proceedHandler={proceedHandler}
          submitButton={submitButton}
        />

        <RightReceipts />
      </div>
    </div>
  );
};

export default Receipts;
