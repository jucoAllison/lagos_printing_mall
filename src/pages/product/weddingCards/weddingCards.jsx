import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftWeddingCards from "./leftWeddingCards";
import RightWeddingCards from "./rightWeddingCards";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const WeddingCards = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  
  

  
    
      
      
      
      
        
          
        
          
            
          
              const CTX = useContext(MainContext);
              const { checkRight } = useCheckRight();
              const navigation = useNavigate();
              const [newProduct, setNewProduct] = useState("");
              const [loading, setLoading] = useState(false);
            
             
          
           
        
        
         
      
      
    
    
    
     
  
  




  const [pages, setPages] = useState([
    { name: "Wax seal", selected: false },
    { name: "Sticker", selected: false },
    { name: "Ribbon", selected: false },
    { name: "Custom tag", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Boxes", selected: false },
    { name: "Wraps", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: 'Elegant', selected: true },
    { name: 'Royal', selected: false },
    { name: "Minimalist", selected: false },
    { name: "Traditional", selected: false },
    { name: "Cultural", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Saddle Stitch", selected: true },
    { name: "Perfect Binding", selected: false },
    { name: "Spiral Binding", selected: false },
    { name: "Wire-O Binding", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Yes", selected: true },
    { name: "No", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Single flat card", selected: true },
    { name: "Folded card", selected: false },
    { name: "Boxed invitation", selected: false },
    { name: "Scroll or custom shape", selected: false },
    { name: "Acrylic or transparent card", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Cover – Art Card 300gsm", selected: false },
    { name: "Inside pages: 150gsm", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Menu cards", selected: false },
    { name: "Table tags", selected: false },
    { name: "Programs", selected: false },
    { name: "Souvenir", selected: false },
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
          key: "What is your target budget for the print job",
          value: inputs?.budget,
        },
        {
          type: "text",
          key: "What’s the theme or mood of the wedding",
          value: size.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What type of wedding invitation do you want",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Would you like matching items such as",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Any seal required",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Any packaging requirement",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Envelope required",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },

        { type: "boolean", key: "Do you want a belly band or ribbon tie around the card?", value: sampleProof },
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

    if (!inputs?.budget) {
      toast.error("What is your target budget for the print job? is required");
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
        <LeftWeddingCards
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

          
          


          

          

          

          
          
  submitButton={submitButton}
  loading={loading}
  setNewProduct={setNewProduct}
  newProduct={newProduct}
  proceedHandler={proceedHandler}
        />

        <RightWeddingCards
        />
      </div>
    </div>
  );
};


export default WeddingCards