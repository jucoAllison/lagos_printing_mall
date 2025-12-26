import React, { Suspense, useState } from "react";
// import reactLogo from "./assets/react.svg";
import moment from "moment";
import "./App.css";
import TopestDetails from "./components/topest_details";
import Nav from "./components/nav/nav";
import Heroslide from "./components/heroslide/heroslide";
import Home from "./pages/home/home";
import EventFlyers from "./pages/product/flyers/eventFlyers";
import EventPoster from "./pages/product/poster/eventPoster";
import EventBusinessCard from "./pages/product/business_card/eventBusinessCard";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./components/loading/loading";
import toast, { Toaster } from "react-hot-toast";
import EventLetterHead from "./pages/product/letterHead/eventLetterHead";
import EventEnvelope from "./pages/product/envelopes/eventEnvelopes";
import EventBrochures from "./pages/product/brochures/eventBrochures";
import EventCalender from "./pages/product/calendar/eventCalendar";
import EventExerciseBook from "./pages/product/exerciseBooks/eventExerciseBooks";
import EventJotters from "./pages/product/jotters/eventJotters";
import EventReceipts from "./pages/product/Receipts/eventReceipts";
import EventWeddingCard from "./pages/product/weddingCards/eventWeddingCards";
import EventBooks from "./pages/product/books/eventBooks";
import EventMagazine from "./pages/product/magazine/eventMagazine";
import EventPlasticIdCards from "./pages/product/plasticIdCards/eventPlasticIdCards";
import EventContact from "./pages/contact/eventContact";
import EventTrack from "./pages/track/eventTrack";
import EventLargeFormatPrinting from "./pages/product/largeFormatPrinting/eventLargeFormatPrinting";
import EventStickers from "./pages/product/stickers/eventStickers";
import EventNylon from "./pages/product/nylon/eventNylon";
import EventGraphicsDesign from "./pages/product/graphicsDesign/eventGraphicsDesign";
import EventCarBranding from "./pages/product/carBranding/eventCarBranding";
import EventMug from "./pages/product/mug/eventMug";
import EventDashboard from "./pages/dashboard/eventDashboard";
import Profile from "./pages/profile/eventProfile";
import ReferEarn from "./pages/refer&earn/eventReferEarn";
import About from "./pages/about/eventAbout";
import { WebSocketContext } from "./WebSocketContext";
import EventSettings from "./pages/settings/eventSettings";
import EventNotification from "./pages/notification/eventNotification";
import { useEffect } from "react";
import Event_portfolio from "./pages/_portfolio/event_portfolio";
import Event_users from "./pages/_users/event_users";
import Event_orders from "./pages/_orders/event_orders";

function App() {
  const [count, setCount] = useState(0);
  const [isBlack, setIsBlack] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:5021/";
  const webSocketURL = "ws://localhost:5021";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // const [token, setToken] = useState("d3456u76u5y4t3r65y4t3r245");
  const [userObj, setUserObj] = useState({});
  const [products, setProducts] = useState({
    _id: "g65s434d56fg78h7ff6g87h",
    status: "awaiting_confirmation",
    details: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      isWhatsapp: true,
    },
    recurringOrder: { data_type: "boolean", key: false, value: "" },
    delivery: {
      is_pickup: true,
      address: {
        state: "",
        address: "",
        city: "",
        zip: "",
      },
    },
    progress: [
      {
        doing: "Item 1: Booked and awaiting confirmation.",
        time: moment().format("MMM DD, HH:mm [GMT]Z"),
      },
    ],
    products: [],
  });

  useEffect(() => {
    if (userObj?.name?.first?.length > 0) {
      setProducts({
        ...products,
        details: {
          ...products?.details,
          name: { first: userObj?.name?.first, last: userObj?.name?.last },
          email: userObj?.email,
          phone: userObj?.phone,
          whatsapp: userObj?.phone,
        },
      });
    }
  }, [userObj]);

  const proceedOptions = [
    { name: "Select Product" },
    { name: "Poster", to: "/user/products/poster" },
    { name: "Letter Head", to: "/user/products/letter-head" },
    { name: "Envelope", to: "/user/products/envelopes" },
    { name: "Flyers", to: "/user/products/flyer" },
    { name: "Brochures", to: "/user/products/brochures" },
    { name: "Greeting Cards", to: "" },
    { name: "Receipts/Invoices", to: "/user/products/receipts-invoices" },
    { name: "Exercise Books", to: "/user/products/exercise-book" },
    { name: "Books", to: "/user/products/book" },
    { name: "Magazine", to: "/user/products/magazine" },
    { name: "Plastic ID Cards", to: "/user/products/plastic-id-card" },
    { name: "Mailer Bags", to: "" },
    { name: "Banners/Signs", to: "" },
    { name: "Custom T-Shirt", to: "" },
    { name: "Car Wrap", to: "/user/products/car-branding" },
    { name: "Pen", to: "" },
    { name: "Frames", to: "" },
    { name: "Invitation Cards", to: "" },
    { name: "Dummy Cheques", to: "" },
    { name: "Graphics Design", to: "/user/products/graphics-design" },
    { name: "Tailored Calendar", to: "/user/products/calendar" },
    { name: "Screen Printing", to: "/user/products/screen-printing" },
    { name: "Throw Pillows", to: "" },
    { name: "Banner Stand", to: "" },
    { name: "Awards/Plaque", to: "" },
    { name: "Wedding Cards", to: "/user/products/wedding-card" },
    { name: "Business Cards", to: "/user/products/business-card" },
    { name: "Custom Hoody", to: "" },
    {
      name: "Jotters - Hard / Soft Covers",
      to: "/user/products/jotters-notepads",
    },
    { name: "Custom Mugs", to: "/user/products/custom-mug" },
    { name: "Large Format Printing", to: "/large/format/printing" },
    { name: "Carrier Bag a3/a4/a5", to: "" },
    { name: "Branded Building", to: "" },
    { name: "Stickers/Product Labels", to: "/user/products/sticker" },
  ];

  const logout_handler = async () => {
    try {
      sessionStorage.clear();
      localStorage.clear();
      const abcd = {};
      setToken(null);
      setUserObj(abcd);
      navigate("/");
    } catch (error) {
      console.log("error =>> ", error);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        containerClassName="kjahfasf"
        // gutter={8}
        // reverseOrder={false}
        //         containerStyle={{
        //             position: "absolute",
        // top: 20,
        //     left: 20,
        //     bottom: 20,
        //     right: 20,
        //         }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#822b58",
            fontWeight: "bold",
            // position: "absolute",
            // bottom: 0,
            color: "#fff",
            fontSize: "13px",
            fontFamily: "outfit",
            zIndex: "214998999999999 !important",
            textAlign: "left",
          },

          // Default options for specific types
          success: {
            duration: 5000,
            theme: {
              primary: "#7fd2bc",
              secondary: "black",
            },
          },
        }}
      />

      <MainContext.Provider
        value={{
          isBlack,
          setIsBlack,
          url,
          products,
          setProducts,
          proceedOptions,
          logout: logout_handler,
          token,
          setToken,
          userObj,
          setUserObj,
          // userObj,
          // token: token?.t,
          // setToken: setTokenHandler,
          // loadingToggle,
          // setLoadingToggle,
          // toggleLightDark,
          // shouldLogin,
        }}
      >
        <WebSocketContext sessionToken={token} webSocketURL={webSocketURL}>
          <Routes>
            {/* <Route
              path="/*"
              element={
                token ? (
                  <Navigate to="/account/portfolio" replace />
                ) : (
                  <Navigate to="/user/home" replace />
                )
              }
            /> */}

            <Route path="/*" element={<Navigate to="/user/home" />} />

            <Route
              path="/user/home"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/user/products/flyer"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventFlyers />
                </Suspense>
              }
            />
            <Route
              path="/user/products/poster"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventPoster />
                </Suspense>
              }
            />
            <Route
              path="/user/products/business-card"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventBusinessCard />
                </Suspense>
              }
            />
            <Route
              path="/user/products/letter-head"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventLetterHead />
                </Suspense>
              }
            />
            <Route
              path="/user/products/envelopes"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventEnvelope />
                </Suspense>
              }
            />
            <Route
              path="/user/products/brochures"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventBrochures />
                </Suspense>
              }
            />

            <Route
              path="/user/products/calendar"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventCalender />
                </Suspense>
              }
            />
            <Route
              path="/user/products/exercise-book"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventExerciseBook />
                </Suspense>
              }
            />
            <Route
              path="/user/products/jotters-notepads"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventJotters />
                </Suspense>
              }
            />
            <Route
              path="/user/products/receipts-invoices"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventReceipts />
                </Suspense>
              }
            />
            <Route
              path="/user/products/wedding-card"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventWeddingCard />
                </Suspense>
              }
            />

            <Route
              path="/user/products/book"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventBooks />
                </Suspense>
              }
            />
            <Route
              path="/user/products/magazine"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventMagazine />
                </Suspense>
              }
            />
            <Route
              path="/user/products/plastic-id-card"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventPlasticIdCards />
                </Suspense>
              }
            />
            <Route
              path="/account/contact-us"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventContact />
                </Suspense>
              }
            />
            <Route
              path="/account/track/:ID"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventTrack />
                </Suspense>
              }
            />
            <Route
              path="/large/format/printing"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventLargeFormatPrinting />
                </Suspense>
              }
            />
            <Route
              path="/user/products/sticker"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventStickers />
                </Suspense>
              }
            />
            <Route
              path="/user/products/screen-printing"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventNylon />
                </Suspense>
              }
            />
            <Route
              path="/user/products/graphics-design"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventGraphicsDesign />
                </Suspense>
              }
            />
            <Route
              path="/user/products/car-branding"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventCarBranding />
                </Suspense>
              }
            />
            <Route
              path="/user/products/custom-mug"
              exact
              element={
                <Suspense fallback={<Loading />}>
                  <EventMug />
                </Suspense>
              }
            />
            {token && (
              <>
                <Route
                  path="/account/portfolio"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <EventDashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="/account/profile"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <Profile />
                    </Suspense>
                  }
                />
                <Route
                  path="/account/about"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <About />
                    </Suspense>
                  }
                />
                <Route
                  path="/refer-earn"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <ReferEarn />
                    </Suspense>
                  }
                />

                <Route
                  path="/profile/settings"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <EventSettings />
                    </Suspense>
                  }
                />

                <Route
                  path="/account/notification"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <EventNotification />
                    </Suspense>
                  }
                />

                <Route
                  path="/management/portfolio"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <Event_portfolio />
                    </Suspense>
                  }
                />
                <Route
                  path="/management/users"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <Event_users />
                    </Suspense>
                  }
                />
                <Route
                  path="/management/orders"
                  exact
                  element={
                    <Suspense fallback={<Loading />}>
                      <Event_orders />
                    </Suspense>
                  }
                />
              </>
            )}
          </Routes>
        </WebSocketContext>
      </MainContext.Provider>
    </>
  );
}

export default App;

export const MainContext = React.createContext({
  isBlack: null,
  setIsBlack: () => {},
  socketObj: null,
  webSocketURL: null,
  logout: () => {},
  token: null,
  setToken: (token) => {},
  url: null,
  userObj: null,
  setUserObj: () => {},
  toogleIsNotificationOpen: () => {},
  toggleLightDark: () => {},
  loadingToggle: null,
  setLoadingToggle: () => {},
  isNotificationOpen: null,
  urlEndpoint: null,
  shouldLogin: null,
  publicKey: null,
  authenticationEndpoint: null,
  products: null,
  setProducts: () => {},
  proceedOptions: null,
  // setLoading:() => {},
  // data: null,
  // loading: null,
  // setDate: () => {},
  // decoded: null,
  // hashed: null,
  // isTokenExpired: () => {},
  // isTokenValid: true,
  // setValidToken: () => {},
  // verifyToken: () => {},
});

// how to broadcast a new transaction from a BSC wallet that exists on tatum-kms using the signature_ID

// #822b58
// #f2a0c6

// https://www.wandggroup.com/portfolio?tab=all
// https://resourceboy.com/?s=flyers
// https://printify.com/custom-mugs/
// https://www.zazzle.com/
