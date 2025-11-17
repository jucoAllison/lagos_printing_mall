import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { useParams } from "react-router-dom";

import Footer from "../../components/footer/footer";
import Nav from "../../components/nav/nav";
import Classes from "./product.module.css";
import InputCom from "../../components/input/input";
import { MainContext } from "../../App";
import Right from "./right";
import Left from "./left";
const Product = () => {
  const [designReady, setDesignReady] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [product, setProduct] = useState([]);
  const [inputs, setInputs] = useState({ product: "" });


  const flyers = {
    quantity: "",
    size: "",
    size_name: "Size",
    size_options: "Size",
    custom_size: {width: "", length: ""},
    type: "",
    type_name: "Paper type",
    gsm: "",
    gsm_name: "Paper type",
    timeline: "",
    design: {
      ready: false,
      data: false,
    },
    recurring_orders: {
      default: false,
      weekly: false,
      monthly: false,
      yearly: false,
    },
  };


  const poster = {
    quantity: "",
    size: "",
    size_name: "Size",
    size_options: ["A3", "A2", "A1", "Custom Size"],
    custom_size: {width: "", length: ""},
    type: "",
    type_name: "Paper type",
    type_options: ["Art Paper(gloss)", "Matte Paper"],
    gsm: "",
    gsm_name: "Paper GSM",
    gsm_options: ["115gsm", "135gsm", "150gsm", "170gsm"],
    timeline: "",
    design: {
      ready: false,
      data: false,
    },
    recurring_orders: {
      default: false,
      weekly: false,
      monthly: false,
      yearly: false,
    },
  };

  
  const business_cards = {
    quantity: "",
    size: "",
    size_name: "Card Size",
    size_options: ["3.5' x 2.25'", "Custom Size"],
    custom_size: {width: "", length: ""},
    type: "",
    type_name: "Art card",
    type_options: ["Art card", "Matte card", "Plastic", "PVC"],
// lamination
lamination: "",
    lamination_name: "Lamination type",
    lamination_options: ["Sugar", "Gloss", "Matte", "Diecut edges"],
    // finishing
finishing: "",
    finishing_name: "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ",
    lamination_options: ["Sugar", "Gloss", "Matte", "Diecut edges"],

    // premium finishing: Rounded edges, Raised spot UV


    gsm: "",
    gsm_name: "Paper GSM",
    gsm_options: ["115gsm", "135gsm", "150gsm", "170gsm"],
    timeline: "",
    design: {
      ready: false,
      data: false,
    },
    recurring_orders: {
      default: false,
      weekly: false,
      monthly: false,
      yearly: false,
    },
  };

  const CTX = useContext(MainContext);
  const params = useParams();
  const [size, setSize] = useState([
    { name: "A3", selected: true },
    { name: "A4", selected: false },
    { name: "A5", selected: false },
    { name: "A6", selected: false },
    { name: "B2", selected: false },
    { name: "B3", selected: false },
    { name: "B4", selected: false },
    { name: "B5", selected: false },
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
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState([
    { name: "Pickup", selected: true },
    { name: "Shipping", selected: false },
  ]);

  // useEffect(() => {
  //   if(product.length < 0){
  //     setProduct({product: })
  //   }
  // },[])

  return (
    <>
      <Nav />

      <div className={Classes.coverHere}>
        <div className={Classes.bottomSomething}>
          <Left
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
          />

          <Right
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            inputs={inputs}
            setInputs={setInputs}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;
