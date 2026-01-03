import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftGraphicsDesign from "./leftGraphicsDesign";
import RightGraphicsDesign from "./rightGraphicsDesign";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const GraphicsDesign = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [installThePrint, setInstallThePrint] = useState(false);

  
  

    const CTX = useContext(MainContext);
    const { checkRight } = useCheckRight();
    const navigation = useNavigate();
    const [newProduct, setNewProduct] = useState("");
    const [loading, setLoading] = useState(false);
  
   



  const [purpose, setPurpose] = useState([
    { name: "WhatsApp", selected: true },
    { name: "Email", selected: false },
    { name: "Phone call", selected: false },
  ]);
  //   const);

  const [size, setSize] = useState([
    { name: "Luxury", selected: false },
    { name: "Bold", selected: false },
    { name: "Colorful", selected: true },
    { name: "Vintage", selected: false },
    { name: "Corporate", selected: false },
    { name: "Youthful", selected: false },
    { name: "Elegant", selected: false },
    { name: "Tech/Modern", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Print", selected: true },
    { name: "Social Media", selected: false },
    { name: "Website", selected: false },
    { name: "Others", selected: false },
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
      name: "Graphics Design",
      details: [
        {
          type: "text",
          key: "What is the name of your brand/business",
          value: inputs?.name,
        },
        {
          type: "text",
          key: "What product(s) or service(s) do you offer",
          value: inputs?.offer,
        },
        {
          type: "text",
          key: "What industry are you in",
          value: inputs?.industry,
        },
        {
          type: "text",
          key: "Do you need the design for",
          value: wantToPrint.filter((v) => v.selected)[0]?.name,
        },
       {
          type: "text",
          key: "What style of design do you prefer",
          value: size.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Preferred communication method",
          value: purpose.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Additional note",
          value: inputs?.additional,
        },
        { type: "boolean", key: "Do you have preferred brand colors?", value: installThePrint },
        { type: "boolean", key: "Do you have: photos, logos, Product images, Brand symbols you want to use?", value: designReady },
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
      ],
    };

    return orderDetails;
  };

  const recheckError = () => {
    if (!inputs?.name) {
      toast.error("Name of brand/business is required");
      return true;
    }

        if (!inputs?.offer) {
      toast.error("What product(s) or service(s) do you offer is required");
      return true;
    }

         if (!inputs?.industry) {
      toast.error("What industry are you in is required");
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
        <LeftGraphicsDesign
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
          setInstallThePrint={setInstallThePrint}
          installThePrint={installThePrint}
          purpose={purpose}
          setPurpose={setPurpose}





          


          
  submitButton={submitButton}
  loading={loading}
  setNewProduct={setNewProduct}
  newProduct={newProduct}
  proceedHandler={proceedHandler}
        />

        <RightGraphicsDesign />
      </div>
    </div>
  );
};

export default GraphicsDesign;
