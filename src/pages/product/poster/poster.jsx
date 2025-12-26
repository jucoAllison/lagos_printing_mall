import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftPoster from "./leftPoster";
import RightPoster from "./rightPoster";
import toast from "react-hot-toast";
import { MainContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";

const Poster = () => {
  const navigation = useNavigate();
  const CTX = useContext(MainContext);
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const { checkRight } = useCheckRight();
  const [size, setSize] = useState([
    { name: "A3", selected: true },
    { name: "A2", selected: false },
    { name: "A1", selected: false },
    { name: "Custom Size", selected: false },
  ]);

  const [paperType, setPaperType] = useState([
    { name: "Art Paper(Gloss)", selected: true },
    { name: "Matte Paper", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "115gsm", selected: true },
    { name: "135gsm", selected: false },
    { name: "150gsm", selected: false },
    { name: "170gsm", selected: false },
  ]);

  // const checkRightFunc = async () => {
  //   if (!inputs?.full_name) {
  //     toast.error("Fill your full name and continue");
  //     return true;
  //   }

  //   if (!inputs?.email) {
  //     toast.error("Fill your email and continue");
  //     return true;
  //   }

  //   if (!inputs?.phone || inputs?.phone?.length < 10) {
  //     toast.error("Fill your phone and continue");
  //     return true;
  //   }

  //   if (!isWhatApp && !inputs?.whatsapp) {
  //     toast.error("Fill your whatsapp number and continue");
  //     return true;
  //   }

  //   if (!isWhatApp && inputs?.whatsapp?.length < 10) {
  //     toast.error("Fill your whatsapp number and continue");
  //     return true;
  //   }

  //   if (recurring && frequency.filter((v) => v.selected).length < 1) {
  //     toast.error(
  //       "This is a recurring order. Please confirm the frequency and proceed"
  //     );
  //     return true;
  //   }

  //   if (
  //     deliveryMethod.filter((v) => v.selected)[0]?.name?.toLowerCase() ==
  //       "shipping" &&
  //     !inputs?.state
  //   ) {
  //     toast.error("Fill your shipping state details and continue");
  //     return true;
  //   }

  //   if (
  //     deliveryMethod.filter((v) => v.selected)[0]?.name?.toLowerCase() ==
  //       "shipping" &&
  //     !inputs?.address
  //   ) {
  //     toast.error("Fill your shipping address details and continue");
  //     return true;
  //   }

  //   if (
  //     deliveryMethod.filter((v) => v.selected)[0]?.name?.toLowerCase() ==
  //       "shipping" &&
  //     !inputs?.city
  //   ) {
  //     toast.error("Fill your shipping city details and continue");
  //     return true;
  //   }

  //   if (
  //     deliveryMethod.filter((v) => v.selected)[0]?.name?.toLowerCase() ==
  //       "shipping" &&
  //     !inputs?.zip
  //   ) {
  //     toast.error("Fill your shipping zip code details and continue");
  //     return true;
  //   }

  //   return false;
  // };

  //   // onChange for file input for product index pIndex and detail key 'user_design'
  // const handleFileChange = (pIndex, key, event) => {
  //   const files = event.target.files; // FileList
  //   // clone order and set detail.data = files
  //   setOrder(prev => {
  //     const next = { ...prev };
  //     next.products = next.products.map((p, i) => {
  //       if (i !== pIndex) return p;
  //       return {
  //         ...p,
  //         details: p.details.map(d => d.key === key ? { ...d, data: files } : d)
  //       };
  //     });
  //     return next;
  //   });
  // };

  const sendOrder = async (order) => {
    if (loading) return;
    setLoading(true);
    try {
      // const formData = new FormData();

      // // JSON without files
      // formData.append("order", JSON.stringify(order));
      // formData.append("boom", "bang");

      // // Loop over file groups
      // Object.keys(fileMap).forEach((key) => {
      //   const fileGroup = fileMap[key];

      //   if (!fileGroup) return;

      //   if (fileGroup instanceof FileList) {
      //     // multiple files
      //     [...fileGroup].forEach((file) => {
      //       formData.append(`${key}[]`, file);
      //     });
      //   } else {
      //     // single file
      //     formData.append(key, fileGroup);
      //   }
      // });

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

      // console.log("jsoned.data =>> ", jsoned.data);
      navigation(`/account/track/${jsoned.data?.track}`);

    } catch (error) {
      setLoading(false);
      console.log("Error => ", error);

      toast.error("Check your internet connection and continue!");
    }
  };

  const returnOrder = () => {
    const orderDetails = {
      name: "Poster",
      details: [
        { type: "text", key: "Quantity", value: inputs?.quantity },
        {
          type: "text",
          key: "Size",
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
          key: "Paper GSM",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Additional note",
          value: inputs?.additional,
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
      // const check = await checkRightFunc();

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
        <LeftPoster
          submitButton={submitButton}
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
          loading={loading}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          proceedHandler={proceedHandler}
        />

        <RightPoster />
      </div>
    </div>
  );
};

export default Poster;
