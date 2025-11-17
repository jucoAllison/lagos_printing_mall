import React, { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TopestDetails from "./components/topest_details";
import Nav from "./components/nav/nav";
import Heroslide from "./components/heroslide/heroslide";
import Home from "./pages/home/home";
import EventFlyers from "./pages/product/flyers/eventFlyers";
import EventPoster from "./pages/product/poster/eventPoster";
import EventBusinessCard from "./pages/product/business_card/eventBusinessCard";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/loading/loading";
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

function App() {
  const [count, setCount] = useState(0);
  const [isBlack, setIsBlack] = useState(false);

  return (
    <>
      <MainContext.Provider
        value={{
          isBlack,
          setIsBlack,
          // url,
          // userObj,
          // token: token?.t,
          // setToken: setTokenHandler,
          // logout: logoutHandler,
          // loadingToggle,
          // setLoadingToggle,
          // toggleLightDark,
          // shouldLogin,
        }}
      >
        <Routes>
          <Route path="/*" element={<Navigate exact to="/user/home" />} />

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
        </Routes>

        {/*  */}

        {/*     
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 class="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      </MainContext.Provider>
    </>
  );
}

export default App;

export const MainContext = React.createContext({
  isBlack: null,
  setIsBlack: () => {},
  socketObj: null,
  token: null,
  webSocketURL: null,
  logout: () => {},
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
