import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import RightStickers from "./rightStickers";
import LeftStickers from "./leftStickers";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Stickers = () => {
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
    { name: "Individually cut (die-cut singles)", selected: true },
    { name: "On sheets", selected: false },
    { name: "On rolls", selected: false },

  ])
  const [purpose, setPurpose] = useState([
    { name: "Square", selected: true },
    { name: "Rectangle", selected: false },
    { name: "Circle", selected: false },
    { name: "Oval", selected: false },
    { name: "Custom Die-Cut", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Matte Lamination", selected: false },
    { name: "Gloss Lamination", selected: false },
    { name: "No Lamination", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "2x3 inches", selected: false },
    { name: "5cm x 7cm", selected: false },
    { name: "Custom Size", selected: true },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "White Vinyl", selected: false },
    { name: "Clear Vinyl", selected: false },
    { name: "Matte or Gloss Finish", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Flat Surface", selected: true },
    { name: "Curved Surface", selected: false },
    { name: "Bottle", selected: false },
    { name: "Jar", selected: false },
    { name: "Packaging", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Matte Paper", selected: true },
    { name: "Gloss Paper", selected: false },
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
      name: "Stickers/Product Labels",
      details: [
        {
          type: "text",
          key: "Quantity",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "What is the sticker/label being used for",
          value: inputs?.use,
        },
        {
          type: "text",
          key: "What surface",
          value: wantToPrint.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What size should the print be",
          value: size.filter((v) => v.selected)[0]?.name?.includes("Custom")
            ? `Custom Size width: ${inputs?.width}inches length: ${inputs?.length}inches `
            : size.filter((v) => v.selected)[0]?.name,
          width: inputs?.width,
          length: inputs?.length,
          ms: "inches",
        },
        {
          type: "text",
          key: "What shape",
          value: purpose.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Paper Stickers",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Vinyl Stickers (Waterproof)",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Finish / Lamination",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you need them",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },

        { type: "boolean", key: "Do you need a printed sample/proof before full production?", value: installThePrint },
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

    if (!inputs?.use) {
      toast.error("What is the sticker/label being used for? is required");
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
        <LeftStickers
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



          


          

          

          

          
          
  submitButton={submitButton}
  loading={loading}
  setNewProduct={setNewProduct}
  newProduct={newProduct}
  proceedHandler={proceedHandler}
        />

        <RightStickers />
      </div>
    </div>
  );
};

export default Stickers;
