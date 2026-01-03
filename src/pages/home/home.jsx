import React from "react";
import Classes from "./home.module.css";
import TopestDetails from "../../components/topest_details";
import Nav from "../../components/nav/nav";
import Heroslide from "../../components/heroslide/heroslide";
import BagPrint from "../../assets/bag-print.webp";
import PrintingBags from "../../assets/printing_bags.webp";
import PrintingBag from "../../assets/printing_bag.jpeg";
import BrandCar from "../../assets/brand_car.webp";
import BrandCa from "../../assets/brand_ca.webp";
import Brand from "../../assets/brand_.webp";
import BrandC from "../../assets/brand_c.webp";
import Calendar from "../../assets/calendar.webp";
import Calenda from "../../assets/calenda.webp";
import Calend from "../../assets/calend.webp";
import Calen from "../../assets/calen.webp";
import CustomTShirt from "../../assets/custom-T-Shirt.gif";
import Hoody from "../../assets/hoody.gif";
import MugPrint from "../../assets/mug.jpg";
import Flier from "../../assets/flier.jpg";
import FlexBanner from "../../assets/flex_banner.jpg";
import Custommug from "../../assets/custom_mug.jpg";
import Custommu from "../../assets/custom_mu.jpg";
import Customm from "../../assets/custom_m.jpg";
import Custom_ from "../../assets/custom_.jpg";
import WP_MUG from "../../assets/wp_mug.jpeg";
import WP_MU from "../../assets/wp_mu.jpeg";
import HennessyStand from "../../assets/hennessy_stand.webp";
import Stand from "../../assets/stand.webp";
import Stand_ from "../../assets/stand_.webp";
import Award from "../../assets/award.webp";
import Award_ from "../../assets/award_.webp";
import BrandBuiding from "../../assets/brand_buiding.webp";
import BrandBuidin from "../../assets/brand_buidin.webp";
import BrandBuidi from "../../assets/brand_buidi.webp";
import BrandBuid from "../../assets/brand_buid.webp";
import clsx from "clsx";
import GifImage from "../../components/gif_image/gifImage";
import SecondHero from "./secondHero";
import Footer from "../../components/footer/footer";
import Faq from "./faq";
import SomeOfOurClient from "./someOfOurClient";
import Upload from "./upload";
import PicFrames from "../../assets/PicFrames.jpeg";
import PicFrame from "../../assets/PicFrame.jpeg";
import PicFram from "../../assets/PicFram.jpeg";
import PicFra from "../../assets/PicFra.jpeg";
import PicFr from "../../assets/PicFr.jpeg";
import PicF from "../../assets/PicF.jpeg";
import Wedding_Card from "../../assets/wedding_card.jpeg";
import Wedding_Car from "../../assets/wedding_car.jpeg";
import Wedding_Ca from "../../assets/wedding_ca.jpeg";
import Wedding_C from "../../assets/wedding_c.jpeg";
import Wedding_ from "../../assets/wedding_.jpeg";
import Wedding from "../../assets/wedding.jpeg";
import Weddin from "../../assets/weddin.jpeg";
import Weddi from "../../assets/weddi.jpeg";
import WP_CAR_BAG from "../../assets/wp_car_bag.jpeg";
import WP_CAR_BA from "../../assets/wp_car_ba.jpeg";
import WP_CAR_B from "../../assets/wp_car_b.jpeg";
import WP_CAR_ from "../../assets/wp_car_.jpeg";
import Buisiness_Card from "../../assets/buisiness_card.jpeg";
import Car_wrap from "../../assets/car_wrap.jpeg";
import Car_wra from "../../assets/car_wra.jpeg";
import Car_wr from "../../assets/car_wr.jpeg";
import Buisiness_Car from "../../assets/buisiness_car.jpeg";
import Buisiness_Ca from "../../assets/buisiness_ca.jpeg";
import Buisiness_C from "../../assets/buisiness_c.jpeg";
import Screen_Printing from "../../assets/screen_printing.jpeg";
import Screen_Printin from "../../assets/screen_printin.jpeg";
import Screen_Printi from "../../assets/screen_printi.jpeg";
import Screen_Print from "../../assets/screen_print.jpeg";
import Screen_Prin from "../../assets/screen_prin.jpeg";
import Throw_Pillows from "../../assets/throw_pillows.jpeg";
import Throw_Pillow from "../../assets/throw_pillow.jpeg";
import Throw_Pillo from "../../assets/throw_pillo.jpeg";
import Throw_Pill from "../../assets/throw_pill.jpeg";
import Jotters from "../../assets/jotters.jpeg";
import Jotter from "../../assets/jotter.jpeg";
import Jotte from "../../assets/jotte.jpeg";
import Jott from "../../assets/jott.jpeg";
import Jot from "../../assets/jot.jpeg";
import Stickers from "../../assets/stickers.jpeg";
import Sticker from "../../assets/sticker.jpeg";
import Sticke from "../../assets/sticke.jpeg";
import Flyer from "../../assets/flyer.jpeg";
import FlyerPNG from "../../assets/flyer.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* <TopestDetails /> */}
      <Nav />
      <Heroslide />
      <div className={Classes.products_cover}>
        {/* <div className={Classes.headerWelcome}>
          Welcome to Lagos Printing Mall
        </div>
        <div className={Classes.bodyWelcome}>
          We seek to create an experience where clients achieve their business
          goals through solutions in print making, branding and designs.
          PLEASE SELECT YOUR PRODUCTS
        </div> */}

        <div className={Classes.headerWelcome}>
          Why Choose Lagos Printing Mall
        </div>
        <div className={Classes.bodyWelcome}>
          Our goal is simple: premium print quality at unbeatable prices with a
          process that feels effortless. From start to finish, you’ll work with
          a dedicated expert who’s ready to assist, advise, and ensure your
          project exceeds expectations.
        </div>

        <div className={Classes.grid_container}>
          <Link
            to={"/user/products/custom-tshirt"}
            className={Classes.grid_item}
          >
            {/* <img
              src={CustomTShirt}
              className={clsx([Classes.image_grid, "w-full  object-cover"])}
            /> */}
            <GifImage images={[CustomTShirt, Hoody]} settime={3000} />
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Custom T-Shirts
            </div>
          </Link>

          <Link to="/user/products/flyer" className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage settime={3200} images={[Flyer, FlyerPNG]} />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Flyers
            </div>
          </Link>
          <Link
            to={"/user/products/car-branding"}
            className={Classes.grid_item}
          >
            <div className={Classes.image_grid}>
              <GifImage
                settime={3200}
                images={[
                  Car_wrap,
                  BrandC,
                  BrandCar,
                  Car_wra,
                  BrandCa,
                  Brand,
                  Car_wr,
                ]}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Car Wrap
            </div>
          </Link>
          <Link to={"/user/products/calendar"} className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[Calendar, Calenda, Calend, Calen]}
                settime={3000}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Tailored Calendar
            </div>
          </Link>

          <Link
            to={"/user/products/screen-printing"}
            className={Classes.grid_item}
          >
            <div className={Classes.image_grid}>
              <GifImage
                images={[
                  Screen_Printing,
                  Screen_Printin,
                  Screen_Printi,
                  Screen_Print,
                  Screen_Prin,
                ]}
                settime={2260}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Screen Printing
            </div>
          </Link>

          <div className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[Throw_Pillows, Throw_Pillow, Throw_Pillo, Throw_Pill]}
                settime={2260}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Throw Pillows
            </div>
          </div>

          <div className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[Stand, Stand_, HennessyStand]}
                settime={3000}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Banner Stand
            </div>
          </div>
          {/* <div className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage images={[Award, Award_]} settime={3000} />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Awards / Plaque
            </div>
          </div> */}
          <Link to={"/user/products/wedding-card"} className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[
                  Wedding_Card,
                  Wedding_Car,
                  Wedding_Ca,
                  Wedding_C,
                  Wedding_,
                  Wedding,
                  Weddin,
                  Weddi,
                ]}
                settime={2300}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Wedding Cards
            </div>
          </Link>

          <div className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[PicFrames, PicFrame, PicFram, PicFra, PicFr, PicF]}
                settime={2300}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Frames
            </div>
          </div>

          <Link to="/user/products/business-card" className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[
                  Buisiness_Card,
                  Buisiness_Car,
                  Buisiness_Ca,
                  Buisiness_C,
                ]}
                settime={3000}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Business Cards
            </div>
          </Link>

          {/* <div className={Classes.grid_item}>
            <img
              src={Hoody}
              className={clsx([Classes.image_grid, "w-full  object-cover"])}
            />
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Custom Hoody
            </div>
          </div> */}

          <Link
            to={"/user/products/jotters-notepads"}
            className={Classes.grid_item}
          >
            <div className={Classes.image_grid}>
              <GifImage
                images={[Jotters, Jott, Jotter, Jotte, Jot]}
                settime={3000}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Jotters - Hard / Soft Covers
            </div>
          </Link>

          <Link to={"/user/products/custom-mug"} className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[Custommu, WP_MUG, Custom_, MugPrint, Customm, WP_MU]}
                settime={2800}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Custom Mugs
            </div>
          </Link>
          <Link to={"/large/format/printing"} className={Classes.grid_item}>
            <img
              src={FlexBanner}
              className={clsx([Classes.image_grid, "w-full  object-cover"])}
            />
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Large Format Printing
            </div>
          </Link>
          <div className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[
                  WP_CAR_BA,
                  BagPrint,
                  WP_CAR_BAG,
                  PrintingBag,
                  WP_CAR_B,
                  PrintingBags,
                  WP_CAR_,
                ]}
                settime={3100}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Carrier Bag
            </div>
          </div>
          {/* <div className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage
                images={[BrandBuidi, BrandBuidin, BrandBuiding, BrandBuid]}
                settime={3200}
              />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Branded Building
            </div>
          </div> */}

          <Link to={"/user/products/sticker"} className={Classes.grid_item}>
            <div className={Classes.image_grid}>
              <GifImage images={[Stickers, Sticker, Sticke]} settime={3200} />
            </div>
            <div className="font-[Roboto] text-center mt-1 text-[14px] text-[#515151]">
              Stickers
            </div>
          </Link>
        </div>
      </div>

      <Upload />
      <div className={Classes.products_cover}>
        <SecondHero />
      </div>
      <Faq />
      <SomeOfOurClient />
      <Footer />
    </>
  );
};

export default Home;
