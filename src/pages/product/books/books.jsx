import React, { useContext, useState } from "react";
import Classes from "../product.module.css";
import LeftBooks from "./leftBooks";
import RightBooks from "./rightBooks";
import toast from "react-hot-toast";
import { MainContext } from "../../../App";
import { useCheckRight } from "../../../components/rightDetails/rightChecker";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const { checkRight } = useCheckRight();
  const navigation = useNavigate();
  const [inputs, setInputs] = useState({ product: "" });
  const [designReady, setDesignReady] = useState(false);
  const [designSupport, setDesignSupport] = useState(false);
  const [sampleProof, setSampleProof] = useState(false);
  const [schoolStationery, setSchoolStationery] = useState(false);
  const [barcodePrinting, setBarcodePrinting] = useState(false);
  const [isImages, setIsImages] = useState(false);
  const [eBook, setEBook] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const CTX = useContext(MainContext);
  const [orientation, setOrientation] = useState([
    { name: "Portrait", selected: true },
    { name: "Landscape", selected: false },
  ]);
  const [pages, setPages] = useState([
    { name: "70gsm bond paper", selected: true },
    { name: "80gsm bond paper", selected: false },
    { name: "100gsm bond paper", selected: false },
  ]);
  const [type, setType] = useState([
    { name: "Single color (blue, black, grey, etc)", selected: true },
    { name: "Full color", selected: false },
  ]);
  const [size, setSize] = useState([
    { name: "A4", selected: true },
    { name: "A5", selected: false },
    { name: "Custom Size", selected: false },
  ]);
  const [printStyle, setPrintStyle] = useState([
    { name: "Letterheads", selected: true },
    { name: "ID cards", selected: false },
    { name: "Envelopes", selected: false },
    { name: "Report cards", selected: false },
  ]);
  const [premiumFinishing, setPremiumFinishing] = useState([
    { name: "Matte", selected: false },
    { name: "Gloss", selected: false },
    { name: "Sugar", selected: false },
    { name: "3D", selected: false },
  ]);
  const [paperType, setPaperType] = useState([
    { name: "Novel", selected: true },
    { name: "Textbook", selected: false },
    { name: "Workbook", selected: false },
    { name: "Devotional", selected: false },
    { name: "Journal", selected: false },
    { name: "Magazine", selected: false },
    { name: "Poetry", selected: false },
    { name: "Storybook", selected: false },
  ]);

  const [gsm, setGsm] = useState([
    { name: "Saddle stitch (stapled)", selected: true },
    { name: "Perfect binding (glued spine)", selected: false },
    { name: "Spiral / Wire-O binding", selected: false },
  ]);

  const [lamination, setLamination] = useState([
    { name: "200gsm", selected: true },
    { name: "250gsm", selected: false },
    { name: "300gsm Art Card", selected: false },
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
      name: "Books",
      details: [
        { type: "text", key: "Quantity", value: inputs?.quantity },
        {
          type: "text",
          key: "What is your target budget for this print job",
          value: inputs?.budget,
        },
        {
          type: "text",
          key: "How many total pages does the book have",
          value: inputs?.totalPages,
        },

        {
          type: "boolean",
          key: "Are there images, charts, or illustrations inside",
          value: isImages,
        },
        {
          type: "boolean",
          key: "Do you want eBook (digital) conversion alongside the print version",
          value: eBook,
        },
        {
          type: "boolean",
          key: "Do you need ISBN registration or barcode printing",
          value: barcodePrinting,
        },
        {
          type: "text",
          key: "What type of book do you want to print",
          value: paperType.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Size",
          // value: size.filter((v) => v.selected)[0]?.name,
          value: size.filter((v) => v.selected)[0]?.name?.includes("Custom")
            ? `Custom Size width: ${inputs?.width}inches length: ${inputs?.length}inches `
            : size.filter((v) => v.selected)[0]?.name,
          width: inputs?.width,
          length: inputs?.length,
          ms: "inches",
        },
        {
          type: "text",
          key: "Orientation",
          value: orientation.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What cover material do you prefer",
          value: lamination.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Do you want the cover laminated",
          value: premiumFinishing.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Paper type for inner pages",
          value: pages.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "Are the inner pages",
          value: type.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "text",
          key: "What binding type do you prefer",
          value: gsm.filter((v) => v.selected)[0]?.name,
        },
        {
          type: "boolean",
          key: "Do you want matching school stationery",
          value: schoolStationery,
        },

        ...(schoolStationery
          ? [
              {
                type: "text",
                key: "Matching school stationery style",
                value: printStyle.filter((v) => v.selected)[0]?.name,
              },
            ]
          : []),
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

      if (!inputs?.budget) {
        toast.error("Input target budget for this print job and continue");
        return;
      }

      if (!inputs?.totalPages) {
        toast.error("Input total pages is required");
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

    if (!inputs?.budget) {
      toast.error("Input target budget for this print job and continue");
      return;
    }

    if (!inputs?.totalPages) {
      toast.error("Input total pages is required");
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
        <LeftBooks
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
          schoolStationery={schoolStationery}
          setSchoolStationery={setSchoolStationery}
          setBarcodePrinting={setBarcodePrinting}
          barcodePrinting={barcodePrinting}
          setIsImages={setIsImages}
          isImages={isImages}
          setEBook={setEBook}
          eBook={eBook}
          setOrientation={setOrientation}
          orientation={orientation}
          submitButton={submitButton}
          loading={loading}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          proceedHandler={proceedHandler}
        />

        <RightBooks />
      </div>
    </div>
  );
};

export default Books;
