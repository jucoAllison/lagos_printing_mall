import React, { useContext, useRef, useState } from "react";
import Settings from "./settings";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import { MainContext } from "../../App";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";

const EventSettings = () => {
  const inputRef = useRef();
  const CTX = useContext(MainContext);
  const [loading, setLoading] = useState(false);

  const saveImage = async (e) => {
    if (loading) return;

    setLoading(true);
    try {
      var formData = await new FormData();
      formData.append("photo", e.target.files[Object.keys(e.target.files)]);

      const fetchUser = await fetch(
        `${CTX.url}v1/account/update_picture`,
        {
          method: "PUT",
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${CTX?.token}`,
          },
          body: formData,
        }
      );
      const jsoned = await fetchUser?.json();
      setLoading(false);
      if (jsoned?.m) {
        return toast(jsoned?.m);
      }

      toast(jsoned?.data);
    } catch (error) {
      setLoading(false);
      console.log("error from createAccount =++>> ", error);
      toast("Unable to complete request");
    }
  };

  return (
    <>
      <Nav />

      <input
        ref={inputRef}
        onChange={saveImage}
        type="file"
        accept="image/*"
        style={{ position: "absolute", top: "-1232px" }}
      />
      <div className="containt-parent">
        <div className="main-containt" style={{marginTop: "20px", fontFamily: "outfit"}}>
          {/* <!-- main-containt --> */}
          <div className="text-center">
            <p className="mb-0 gilroy-Semibold text-[26px] font-[500] text-[#3f405b] theme-tran r-f-20 text-uppercase">
              Profile Details
            </p>
            <p className="mb-0 gilroy-medium text-[#6a6b87] text-[16px] r-f-12 profile-header  tran-title">
              Manage your account information
            </p>
          </div>

          <div
            className="text-center mt-[30px] relative w-fit mx-auto"
            onClick={() => {
              inputRef.current.click();
            }}
          >
            {CTX?.userObj?.image ? (
              <img
                src={CTX?.userObj?.image}
                alt="Profile"
                className="img-fluid h-[116px] w-[116px]"
                style={{
                  width: "116px",
                  height: "116px",
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
              />
            ) : (
              <div className="w-[116px] mx-auto h-[116px] mb-2 rounded-full bg-[#e7e5ff] flex items-center justify-center">
                <FaRegUser size={37} color="#3f405b" />
              </div>
            )}

            <div className="w-full h-full absolute top-[0px] hover:bg-[#00000052] bg-[#00000032] rounded-full flex items-center justify-center">
              {loading ? (
                <AiOutlineLoading
                  className="animate-spin"
                  color="#fff"
                  size={17}
                />
              ) : (
                <IoCameraOutline size={17} color="#fff" />
              )}
            </div>
          </div>
        </div>
      </div>

      <Settings />
      <Footer />
    </>
  );
};

export default EventSettings;
