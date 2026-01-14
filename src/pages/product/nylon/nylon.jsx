import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftNylon from "./leftNylon";
import RightNylon from "./rightNylon";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Nylon = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);

  const CTX = useContext(MainContext);
  const { checkRight } = useCheckRight();
  const navigation = useNavigate();
  const [newProduct, setNewProduct] = useState("");
  const [loading, setLoading] = useState(false);

  const [installThePrint, setInstallThePrint] = useState(false);
  const [ladders, setLadders] = useState(false);
  const [gsm, setGsm] = useState([
    { name: "Stickers", selected: true },
    { name: "Labels", selected: false },
    { name: "Business Cards", selected: false },
    { name: "Branded Packaging", selected: false },
  ]);
  const [forr, setFor] = useState([
    { name: "Cold Items", selected: true },
    { name: "Dry Goods", selected: false },
    { name: "Oily/Greasy Items", selected: false },
  ]);
  const [purpose, setPurpose] = useState([
    { name: "Flat", selected: true },
    { name: "Die-Cut handle", selected: false },
    { name: "Soft Loop Handle", selected: false },
    { name: "Patch Handle", selected: false },
    { name: "Punch Handle", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Black", selected: false },
    { name: "White", selected: false },
    { name: "Red", selected: false },
    { name: "Blue", selected: false },
    { name: "Metallic (gold/silver)", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "Light (12–20 microns)", selected: false },
    { name: "Medium (25–35 microns)", selected: false },
    { name: "Heavy-duty (40–70 microns)", selected: true },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "1 color", selected: false },
    { name: " 2 colors", selected: false },
    { name: "3+ colors", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Shopping Nylon", selected: true },
    { name: "Event Gift Nylon", selected: false },
    { name: "Bread Nylon", selected: false },
    { name: "Laundry Nylon", selected: false },
    { name: "Boutique Nylon", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "One side only", selected: true },
    { name: "Both sides", selected: false },
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
      name: "Screen Printing",
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
          key: "Is it for",
          value: forr.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What type of nylon bag do you want to print on",
          value: wantToPrint.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What thickness (microns) do you prefer",
          value: size.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What style/type of nylon",
          value: purpose.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Will the print be",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "How many colors do you want us to print",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What exact color(s)",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you need matching items",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "boolean",
          key: "Do you need a printed sample/proof before full production?",
          value: installThePrint,
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
        <LeftNylon
          inputs={inputs}
          setInputs={setInputs}
          size={size}
          setSize={setSize}
          wantToPrint={wantToPrint}
          setWantToPrint={setWantToPrint}
          designReady={designReady}
          setDesignReady={setDesignReady}
          designSupport={designSupport}
          setDesignSupport={setDesignSupport}
          lamination={lamination}
          setLamination={setLamination}
          premiumFinishing={premiumFinishing}
          setPremiumFinishing={setPremiumFinishing}
          pages={pages}
          setPages={setPages}
          setInstallThePrint={setInstallThePrint}
          installThePrint={installThePrint}
          purpose={purpose}
          setPurpose={setPurpose}
          ladders={ladders}
          setLadders={setLadders}
          setGsm={setGsm}
          gsm={gsm}
          forr={forr}
          setFor={setFor}
          submitButton={submitButton}
          loading={loading}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          proceedHandler={proceedHandler}
        />

        <RightNylon />
      </div>
    </div>
  );
};

export default Nylon;
