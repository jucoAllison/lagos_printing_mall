import React from "react";
import Classes from "./nav.module.css";
import { Link } from "react-router-dom";

const SmallScreenLinks = () => {
  return (
    <div
      className={Classes.inner_product_smth}
      style={{
        gridTemplateColumns: "1fr 1fr",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <Link to="/user/products/poster" style={{ color: "#444" }}>
        Posters
      </Link>
      <Link
        to="/user/products/letter-head"
        style={{ color: "#444", textAlign: "right" }}
      >
        Letter Head
      </Link>
      <Link to={"/user/products/envelopes"} style={{ color: "#444" }}>
        Envelope
      </Link>
      <Link
        to={"/user/products/flyer"}
        style={{ color: "#444", textAlign: "right" }}
      >
        Flyers
      </Link>
      <Link to={"/user/products/brochures"} style={{ color: "#444" }}>
        Brochures
      </Link>
      <div style={{ color: "#444", textAlign: "right" }}>Greeting Cards</div>
      <Link to={"/user/products/receipts-invoices"} style={{ color: "#444" }}>
        Receipts/Invoices
      </Link>
      <Link
        to="/user/products/exercise-book"
        style={{ color: "#444", textAlign: "right" }}
      >
        Exercise Books
      </Link>
      <Link to={"/user/products/book"} style={{ color: "#444" }}>
        Books
      </Link>
      <Link
        to={"/user/products/magazine"}
        style={{ color: "#444", textAlign: "right" }}
      >
        Magazine
      </Link>
      <Link to={"/user/products/plastic-id-card"} style={{ color: "#444" }}>
        Plastic ID Cards
      </Link>
      <div style={{ color: "#444", textAlign: "right" }}>Mailer Bags</div>
      <div style={{ color: "#444" }}>Banners/Signs</div>
      <div style={{ color: "#444", textAlign: "right" }}>Custom T-Shirt</div>
      <Link to={"/user/products/car-branding"} style={{ color: "#444" }}>
        Car Wrap
      </Link>
      <div style={{ color: "#444", textAlign: "right" }}>Pen</div>
      <div style={{ color: "#444" }}>Frames</div>
      <div style={{ color: "#444", textAlign: "right" }}>Invitation Cards</div>
      <div style={{ color: "#444" }}>Dummy Cheques</div>
      <Link
        to={"/user/products/graphics-design"}
        style={{ color: "#444", textAlign: "right" }}
      >
        Graphics Design
      </Link>
      <Link to={"/user/products/calendar"} style={{ color: "#444" }}>
        Tailored Calendar
      </Link>
      <Link
        to={"/user/products/screen-printing"}
        style={{ color: "#444", textAlign: "right" }}
      >
        Screen Printing
      </Link>
      <div style={{ color: "#444" }}>Throw Pillows</div>
      <div style={{ color: "#444", textAlign: "right" }}>Banner Stand</div>
      <div style={{ color: "#444" }}>Awards / Plaque</div>
      <Link
        to={"/user/products/wedding-card"}
        style={{ color: "#444", textAlign: "right" }}
      >
        Wedding Cards
      </Link>
      <Link to="/user/products/business-card" style={{ color: "#444" }}>
        Business Cards
      </Link>
      <div style={{ color: "#444", textAlign: "right" }}>Custom Hoody</div>
      <Link to={"/user/products/jotters-notepads"} style={{ color: "#444" }}>
        Jotters - Hard / Soft Covers
      </Link>
      <Link
        to={"/user/products/custom-mug"}
        style={{ color: "#444", textAlign: "right" }}
      >
        Custom Mugs
      </Link>
      <Link to={"/large/format/printing"} style={{ color: "#444" }}>
        Large Format Printing
      </Link>
      <div style={{ color: "#444", textAlign: "right" }}>
        Carrier Bag a3/a4/a5
      </div>
      <div style={{ color: "#444" }}>Branded Building</div>
      <Link
        to={"/user/products/sticker"}
        style={{ color: "#444", textAlign: "right" }}
      >
        Stickers
      </Link>
    </div>
  );
};

export default SmallScreenLinks;
