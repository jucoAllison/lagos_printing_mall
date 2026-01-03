import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftLargeFormatPrinting from "./leftLargeFormatPrinting";
import RightLargeFormatPrinting from "./rightLargeFormatPrinting";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LargeFormatPrinting = () => {
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
  ladders;
  const [purpose, setPurpose] = useState([
    { name: "Event", selected: true },
    { name: "Branding", selected: false },
    { name: "Outdoor Advertising", selected: false },
    { name: "Store Display", selected: false },
    { name: "Promotional Campaign", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Eyelets", selected: false },
    { name: "Pole pockets", selected: false },
    { name: "Frame", selected: false },
    { name: "Hemming/Edge Sealing", selected: false },
  ]);

  const [size, setSize] = useState([{ name: "Custom Size", selected: true }]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Foam Board", selected: false },
    { name: "PVC Board Acrylic", selected: false },
    { name: "ACO Board", selected: false },
  ]);
  const [wantToPrint, setWantToPrint] = useState([
    { name: "Flex Banner", selected: true },
    { name: "Roll-Up Banner", selected: false },
    { name: "Backdrop / Stage Backdrop", selected: false },
    { name: "Billboard", selected: false },
    { name: "Vinyl Sticker", selected: false },
    { name: "One-Way Vision", selected: false },
    { name: "Foam Board Signage", selected: false },
    { name: "Canvas Print", selected: false },
    { name: "Wall/Floor Graphics", selected: false },
    { name: "Directional Signage", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Indoor", selected: true },
    { name: "Outdoor", selected: false },
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
      name: "Large Format Printing",
      details: [
        {
          type: "text",
          key: "Quantity",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "What do you want to print",
          value: wantToPrint.filter((v) => v.selected)[0]?.name,
        },
         {
          type: "text",
          key: "What is the purpose of the print",
          value: purpose.filter((v) => v.selected)[0]?.name,
        },
         {
          type: "text",
          key: "Where will it be used",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Size",
          value: size.filter((v) => v.selected)[0]?.name?.toLowerCase()?.includes("custom") ? `Custom Size width: ${inputs?.width}ft length: ${inputs?.length}ft ` : size.filter((v) => v.selected)[0]?.name,
            width: inputs?.width,
            length: inputs?.length,
            ms: "ft",
        },
        {
          type: "text",
          key: "Do you need mounting on",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you need",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        { type: "boolean", key: "Do you need us to install the print?", value: installThePrint },
        ...(installThePrint
          ? [
               {
          type: "text",
          key: "Where is the installation location, Indoor or outdoor, Height and accessibility",
          value: inputs?.installationLocation,
        },
            ]
            : []),
 ...(installThePrint
          ? [
                      { type: "boolean", key: "Should we carry ladders or scaffolding, Do you need site measurement before production?", value: ladders },
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
      toast.error("Input quantity details and continue");
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
        <LeftLargeFormatPrinting
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
          submitButton={submitButton}
  loading={loading}
  setNewProduct={setNewProduct}
  newProduct={newProduct}
  proceedHandler={proceedHandler}
        />

        <RightLargeFormatPrinting />
      </div>
    </div>
  );
};

export default LargeFormatPrinting;
