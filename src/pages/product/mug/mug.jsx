import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftMug from "./leftMug";
import RightMug from "./rightMug";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Mug = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  
  
  
    
      
    
      
        
      
          const CTX = useContext(MainContext);
          const { checkRight } = useCheckRight();
          const navigation = useNavigate();
          const [newProduct, setNewProduct] = useState("");
          const [loading, setLoading] = useState(false);
        
         
      
       
    
    
     
  
  

  const [orientation, setOrientation] = useState([
    { name: "White", selected: true },
    { name: "Black", selected: false },
    { name: "Coloured", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Left-Hand Side", selected: true },
    { name: "Right-Hand Side", selected: true },
    { name: "Center", selected: false },
    { name: "Wrap-Around Full Print", selected: false },
    { name: "Double-Sided Print", selected: false },
  ]);

  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Souvenirs", selected: true },
    { name: "Corporate Gifts", selected: false },
    { name: "Weddings", selected: false },
    { name: "Birthdays", selected: false },
    { name: "Promotional Branding", selected: false },
    { name: "Product Merch", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Ceramic Mug", selected: true },
    { name: "Magic/Color-Changing Mug", selected: false },
    { name: "Plastic Mug", selected: false },
    { name: "Stainless Steel Mug", selected: false },
    { name: "Glass Mug", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "WhatsApp", selected: true },
    { name: "Email", selected: false },
    { name: "Phone call", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Standard 11oz", selected: true },
    { name: "Large 15oz", selected: false },
    { name: "Small Custom Size", selected: false },
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
      name: "Cups/Mugs",
      details: [
        {
          type: "text",
          key: "How many mugs do you want",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "What type of mug do you want to brand",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What color of mug do you want",
          value: orientation.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What size do you want",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What is the mug for",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Where should the print appear",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Preferred communication method",
          value: gsm.filter((v) => v.selected)[0]?.name,
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
        <LeftMug
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
          premiumFinishing={premiumFinishing}
          setPremiumFinishing={setPremiumFinishing}
          setSampleProof={setSampleProof}
          sampleProof={sampleProof}
          pages={pages}
          setPages={setPages}
          setOrientation={setOrientation}
          orientation={orientation}


          

          

          
          
  submitButton={submitButton}
  loading={loading}
  setNewProduct={setNewProduct}
  newProduct={newProduct}
  proceedHandler={proceedHandler}
        />

        <RightMug
          
        />
      </div>
    </div>
  );
};

export default Mug