import clsx from "clsx";
import React, { useContext, useState } from "react";
import Classes from "../../pages/product/product.module.css";
import { MainContext } from "../../App";
import Select from "../select/select";
import toast from "react-hot-toast";
import { FaFileAlt, FaRegWindowClose } from "react-icons/fa";
import InputCom from "../input/input";
import { IoIosArrowForward } from "react-icons/io";

const RightComponent = () => {
  const CTX = useContext(MainContext);
  const [showModal, setShowModal] = useState(false);
  const [frequency, setFrequency] = useState([
    { name: "weekly", selected: false },
    { name: "monthly", selected: false },
    { name: "yearly", selected: false },
  ]);
  const [deliveryMethod, setDeliveryMethod] = useState([
    { name: "Pickup", selected: true },
    { name: "Shipping", selected: false },
  ]);

  const mappProductDetails = CTX?.products?.products?.map((product, i) => (
    <div key={i} className="mt-4 border-b">
      {/* Product name */}
      <h3 className="font-[outfit] text-[18px] font-semibold text-[#000]">
        {product?.name}
      </h3>

      {/* Product details */}
      {product?.details.map((v, j) => (
        <div key={j} className="mt-1">
          {v?.type === "text" ? (
            <p
              className="font-[outfit] text-[15px] text-[#000] mt-2"
              style={{ margin: "0px" }}
            >
              {v?.key}: {v?.value}
            </p>
          ) : v?.type === "boolean" ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={Boolean(v?.value)}
                readOnly
                className="preferenceInput cursor-not-allowed accent-[#000]"
              />
              <label className="font-[outfit] text-[15px] text-[#000]">
                {v?.key}
              </label>
            </div>
          ) : v.type === "file" ? (
            <div className="flex items-center gap-2 mt-2">
              <p className="font-[outfit] text-[15px] text-[#000] mt-2">
                {v.key}
              </p>

              <FaFileAlt />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  ));

  //   const mappProductDetails = CTX.products?.map((order, i) => (
  //     <div key={i} className="border-b pb-4 mb-4">
  //       {/* Each order may have multiple products */}
  //       {order.products?.map((product, j) => (
  //         <div key={j} className="mt-4">
  //           {/* Product name */}
  //           <h3 className="font-[outfit] text-[18px] font-semibold text-[#000]">
  //             {product?.name}
  //           </h3>

  //           {/* Product details */}
  //           {product?.details?.map((v, k) => (
  //             <div key={k} className="mt-1">
  //               {v.type === "text" ? (
  //                 <p className="font-[outfit] text-[15px] text-[#000] mt-2">
  //                   {v.key}: {v.value}
  //                 </p>
  //               ) : v.type === "boolean" ? (
  //                 <div className="flex items-center gap-2 mt-2">
  //                   <input
  //                     type="checkbox"
  //                     checked={Boolean(v.value)}
  //                     readOnly
  //                     className="preferenceInput cursor-not-allowed accent-[#000]"
  //                   />
  //                   <label className="font-[outfit] text-[15px] text-[#000]">
  //                     {v.key}
  //                   </label>
  //                 </div>
  //               ) : v.type === "file" ? (
  //                 <div className="flex items-center gap-2 mt-2">
  //                   <p className="font-[outfit] text-[15px] text-[#000] mt-2">
  //                     {v.key}
  //                   </p>

  //                   <FaFileAlt />
  //                 </div>
  //               ) : null}
  //             </div>
  //           ))}
  //         </div>
  //       ))}
  //     </div>
  //   ));
  return (
    <>
      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="modal-backdrop fade show"
          ></div>

          <div
            class={"modal fade modal-overly show"}
            id="exampleModal"
            tabindex="-1"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg res-dialog">
              <div
                className="modal-content"
                style={{ borderRadius: "17px", overflow: "hidden" }}
              >
                <div className="modal-header w-modal-header">
                  <div>
                    <p className="modal-title gilroy-Semibold text-dark font-[Righteous]">
                      Cart Details
                    </p>
                    <div className="text-[14px] font-[400] text-[#000]">
                      Below are all the carts details . . .
                    </div>
                  </div>
                  <FaRegWindowClose
                    onClick={() => setShowModal(false)}
                    color="#000"
                    size={25}
                  />
                </div>
                <div className="modal-body modal-body-pxy">
                  {mappProductDetails}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div
        className={clsx([Classes.firstBorderHerer, "mt-5"])}
        style={{ boxShadow: "none" }}
      >
        {CTX?.products?.products?.length > 0 && (
          <div
            onClick={() => setShowModal(true)}
            className="mb-[20px] flex items-center gap-[5px]"
          >
            <div
              style={{
                fontSize: "12px",
                color: CTX?.isBlack && "#a8a8a8",
              }}
              className={Classes.titleDataHere}
            >
              Carts
            </div>
            <div className="bg-[red] w-[20px] h-[20px] rounded-full flex justify-center items-center font-bold text-[13px] pb-[1px] text-[#fff]">
              {CTX?.products?.products?.length}
            </div>

            <IoIosArrowForward size={"17px"} style={{ marginLeft: "auto" }} />
          </div>
        )}
        <div
          style={{
            fontSize: "12px",
            color: CTX?.isBlack && "#a8a8a8",
          }}
          className={Classes.titleDataHere}
        >
          Fill in your details
        </div>

        {CTX.userObj?.name && (
          <p className="mb-0 gilroy-medium text-[#6a6b87] f-16 r-f-12 profile-header text-[14px] mb-2">
            The details have been automatically filled in using your signed-in
            account information. If you don’t want to use them, you can always
            update them.
          </p>
        )}

        <div className="w-full">
          <div className="grid grid-cols-2 gap-[17px]">
            <InputCom
              label={"First name"}
              value={CTX.products?.details?.name?.first}
              placeholder={"Your first name"}
              onChange={(e) => {
                CTX.setProducts({
                  ...CTX.products,
                  details: {
                    ...CTX.products?.details,
                    name: {
                      ...CTX.products?.details?.name,
                      first: e.target.value,
                    },
                  },
                });
              }}
            />

            <InputCom
              label={"Last name"}
              value={CTX.products?.details?.name?.last}
              placeholder={"Your last name"}
              onChange={(e) => {
                CTX.setProducts({
                  ...CTX.products,
                  details: {
                    ...CTX.products?.details,
                    name: {
                      ...CTX.products?.details?.name,
                      last: e.target.value,
                    },
                  },
                });
              }}
            />
          </div>

          <InputCom
            label={"Email address"}
            value={CTX.products?.details?.email}
            placeholder={"Your email"}
            onChange={(e) => {
              CTX.setProducts({
                ...CTX.products,
                details: { ...CTX.products?.details, email: e.target.value },
              });
            }}
          />

          <div className="relative mt-[20px]">
            <div className="absolute right-[10px] top-[1px] flex items-center gap-[10px]">
              <div
                style={{
                  fontSize: "12px",
                  color: CTX?.isBlack && "#a8a8a8",
                }}
                className={Classes.titleDataHere}
              >
                Whatsapp
              </div>
              <input
                className={Classes.preferenceInput}
                type="checkbox"
                checked={CTX.products?.details?.isWhatsapp}
                onChange={() =>
                  CTX.setProducts({
                    ...CTX.products,
                    details: {
                      ...CTX.products?.details,
                      isWhatsapp: !CTX.products?.details?.isWhatsapp,
                    },
                  })
                }
              />
            </div>

            <InputCom
              label={"Phone number"}
              value={CTX.products?.details?.phone}
              placeholder={"Your number"}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");

                CTX.setProducts({
                  ...CTX.products,
                  details: { ...CTX.products?.details, phone: newValue },
                });
              }}
            />
          </div>

          {!CTX.products?.details?.isWhatsapp && (
            <InputCom
              label={"Whatsapp number"}
              value={CTX.products?.details?.whatsapp}
              placeholder={"Your whatsapp number"}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "");
                CTX.setProducts({
                  ...CTX.products,
                  details: { ...CTX.products?.details, whatsapp: newValue },
                });
              }}
            />
          )}
        </div>

        <div className="flex items-center mt-4 ">
          <div
            style={{
              fontSize: "12px",
              // textTransform: "capitalize",
            }}
            className={Classes.titleDataHere}
          >
            Recurring order?
          </div>

          <input
            className={Classes.preferenceInput}
            type="checkbox"
            checked={CTX.products?.recurringOrder?.key}
            onChange={() =>
              CTX.setProducts({
                ...CTX.products,
                recurringOrder: {
                  ...CTX.products?.recurringOrder,
                  key: !CTX.products?.recurringOrder?.key,
                },
              })
            }
          />
        </div>

        {CTX.products?.recurringOrder?.key && (
          <>
            <Select
              label={"Frequency"}
              setStatee={(data) => {
                const value = data.filter((v) => v.selected);

                if (value.length < 1) {
                  toast.error("Can't find frequency");
                }

                CTX.setProducts({
                  ...CTX.products,
                  recurringOrder: {
                    ...CTX.products?.recurringOrder,
                    value: value[0]?.name,
                  },
                });

                setFrequency(data);
              }}
              statee={frequency}
            />
          </>
        )}

        <div
          className={Classes.subDataHere}
          style={{
            fontFamily: "outfit",
            marginTop: "30px",
            fontWeight: "400",
            marginBottom: "10px",
          }}
        >
          Do you want it delivered to your doorstep?
        </div>

        <Select
          label={"Delivery Method"}
          setStatee={(data) => {
            const value = data.filter((v) => v.selected);

            if (value.length < 1) {
              toast.error("Can't find Delivery Method");
            }

            setDeliveryMethod(data);

            if (value[0]?.name == "Pickup") {
              CTX.setProducts({
                ...CTX.products,
                delivery: {
                  ...CTX.products?.delivery,
                  is_pickup: true,
                },
              });
            } else {
              CTX.setProducts({
                ...CTX.products,
                delivery: {
                  ...CTX.products?.delivery,
                  is_pickup: false,
                },
              });
            }
          }}
          statee={deliveryMethod}
        />

        {deliveryMethod.filter((v) => v.selected)[0]?.name === "Shipping" && (
          <>
            <InputCom
              label={"State"}
              value={CTX.products?.delivery?.address?.state}
              placeholder={"Your state"}
              onChange={(e) => {
                CTX.setProducts({
                  ...CTX.products,
                  delivery: {
                    ...CTX.products?.delivery,
                    address: {
                      ...CTX.products?.delivery?.address,
                      state: e.target.value,
                    },
                  },
                });
              }}
            />

            <InputCom
              label={"Address"}
              value={CTX.products?.delivery?.address?.address}
              placeholder={"Landmark"}
              onChange={(e) => {
                CTX.setProducts({
                  ...CTX.products,
                  delivery: {
                    ...CTX.products?.delivery,
                    address: {
                      ...CTX.products?.delivery?.address,
                      address: e.target.value,
                    },
                  },
                });
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "17px",
              }}
            >
              <InputCom
                label={"City"}
                value={CTX.products?.delivery?.address?.city}
                placeholder={"Your city"}
                onChange={(e) => {
                  CTX.setProducts({
                    ...CTX.products,
                    delivery: {
                      ...CTX.products?.delivery,
                      address: {
                        ...CTX.products?.delivery?.address,
                        city: e.target.value,
                      },
                    },
                  });
                }}
              />
              <InputCom
                label={"Zip code"}
                value={CTX.products?.delivery?.address?.zip}
                placeholder={"Zip code"}
                onChange={(e) => {
                  CTX.setProducts({
                    ...CTX.products,
                    delivery: {
                      ...CTX.products?.delivery,
                      address: {
                        ...CTX.products?.delivery?.address,
                        zip: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
          </>
        )}

        {/* <InputCom
          label={"Deadline"}
          value={inputs?.timeline}
          type={"date"}
          placeholder={"Timeline"}
          onChange={(e) => {
            setInputs({ ...inputs, timeline: e.target.value });
          }}
        /> */}
      </div>
    </>
  );
};

export default RightComponent;
