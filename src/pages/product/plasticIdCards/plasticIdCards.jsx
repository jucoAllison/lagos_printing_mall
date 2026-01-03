import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftPlasticIdCards from "./leftPlasticIdCards";
import RightPlasticIdCards from "./rightPlasticIdCards";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PlasticIdCards = () => {
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  
  
    
    
    
    
      
        
      
        
          
        
            const CTX = useContext(MainContext);
            const { checkRight } = useCheckRight();
            const navigation = useNavigate();
            const [newProduct, setNewProduct] = useState("");
            const [loading, setLoading] = useState(false);
          
           
        
         
      
      
       
    
    
  
  
  
   

  const [schoolStationery, setSchoolStationery] = useState(false);
  const [orientation, setOrientation] = useState([
    { name: "single-sided", selected: true },
    { name: "double-sided", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "Yes", selected: true },
    { name: "No", selected: false },
  ]);
 
  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Plastic ID holders", selected: true },
    { name: "Lanyards (branded or plain), Clips", selected: false },
    { name: "Magnetic clips", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Staff ID Card", selected: true },
    { name: "Student ID Card", selected: false },
    { name: "Membership Card", selected: false },
    { name: "Access Control Card", selected: false },
    { name: "Visitor Card", selected: false },
    { name: "Loyalty or Club Card", selected: false },
    { name: "Event Pass", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Letterhead", selected: true },
    { name: "Envelope", selected: false },
    { name: "Staff handbook", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "Hologram Overlay", selected: true },
    { name: "Microtext", selected: false },
    { name: "UV Print", selected: false },
    { name: "Embedded chip (for RFID/proximity cards)", selected: false },
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
      name: "Plastic ID Cards",
      details: [
        {
          type: "text",
          key: "Quantity",
          value: inputs?.quantity,
        },
        {
          type: "text",
          key: "What type of ID Card do you want to print",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Should the card be",
          value: orientation.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you want the Card to include security features such as",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you need any of the following accessories",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Should the lanyards be branded with your logo or organization name",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you need matching office branding materials",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },

        { type: "boolean", key: "Are the cards identical (same design & data)", value: schoolStationery },
        { type: "boolean", key: "Personalized (unique data per person)", value: !schoolStationery },
        { type: "boolean", key: "Do you need a printed sample/proof before full production?", value: sampleProof },
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
        <LeftPlasticIdCards
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
          schoolStationery={schoolStationery}
          setSchoolStationery={setSchoolStationery}
          setOrientation={setOrientation}
          orientation={orientation}


          


          

          

          

          
          
  submitButton={submitButton}
  loading={loading}
  setNewProduct={setNewProduct}
  newProduct={newProduct}
  proceedHandler={proceedHandler}
        />

        <RightPlasticIdCards />
      </div>
    </div>
  );
};

export default PlasticIdCards