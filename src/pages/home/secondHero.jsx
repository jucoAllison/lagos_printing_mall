import React from "react";
import Classes from "./home.module.css";
import Crowd from "../../assets/crowd.mp4";
import clsx from "clsx";

const SecondHero = () => {
  return (
    <>
      <div className={Classes.flexSubHero}>
        <video
          // style={{ width: "100%", height: "max-content", objectFit: "cover" }}
          src={Crowd}
          autoPlay={true}
          muted
          loop
          playsinline
          preload="auto"
          aria-label="Short demo video"
        />

        <div className={Classes.onTopShoul}>
          <h1 className={Classes.sh_text}>
            Print from the Comfort of Your Home!
          </h1>

          <p
            className={Classes.shm_text}
            style={{ borderBottom: "1px solid #aaa", paddingBottom: "17px" }}
          >
            Fast. Reliable. Delivered to your doorstep.
          </p>

          <h1
            className={clsx([Classes.sh_text, "mt-5 text-[15px]"])}
            style={{ fontSize: "16px" }}
          >
            🖨️ How It Works
            {/* 🖨️ How It Works (3 Simple Steps) */}
          </h1>

          <div className={Classes.stepsCover}>
            {/* <div>
              <div className="font-bold text-[#fff] font-[Righteous]">Book Your Print Job</div>
              <div className="font-[200] text-[#fff]">
                Select your print type, Upload your design or Confirm and
                Approve from our Designers. Get an instant quote and confirm
                your order online in minutes.
              </div>
            </div> */}

            <div>
              <div className="font-[200] text-[#fff]">
               <span className="font-bold"> * </span> Pick a product of choice from the list to get its print &
                shipping cost.
              </div>
            </div>

            {/* <div>
              <div className="font-bold text-[#fff] font-[Righteous]">Confirm Your Job</div>
              <div className="font-[200] text-[#fff]">
                Our team reviews your file for quality assurance and sends you a
                digital proof for approval. Once confirmed, we begin production
                with top-grade materials and precision printing.
              </div>
            </div> */}

            <div>
              <div className="font-[200] text-[#fff]">
               <span className="font-bold"> * </span> If the visual design for your project has already been created,
                send files so development can start based on
                them.{" "}
              </div>
            </div>

            {/* <div>
              <div className="font-bold text-[#fff] font-[Righteous]">
                Receive your order at your doorstep
              </div>
              <div className="font-[200] text-[#fff]">
                Sit back and relax! Your prints are carefully packaged and
                delivered right to your home or office anywhere in Lagos — fast
                and secure.
              </div>
            </div> */}

            <div>
              <div className="font-[200] text-[#fff]">
               <span className="font-bold"> * </span> Your personal representative will connect with you to review
                your project details.{" "}
              </div>
            </div>

            <div>
              <div className="font-[200] text-[#fff]">
               <span className="font-bold"> * </span> We begin production as soon as your approval is received.
              </div>
            </div>

            <div>
              <div className="font-[200] text-[#fff]">
               <span className="font-bold"> * </span> Track your job with your Lagos Printing Mall ID till. We print
                pack and deliver to your doorstep
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondHero;
