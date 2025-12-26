import { useContext } from "react";
import toast from "react-hot-toast";
import { MainContext } from "../../App";
import { parsePhoneNumber } from "libphonenumber-js";

export const useCheckRight = () => {
  const CTX = useContext(MainContext);

  function validatePhone(number, country) {
    try {
      const phone = parsePhoneNumber(number, country);

      return {
        valid: phone.isValid(),
        countryMatch: phone.country === country,
        e164: phone.number,
        national: phone.formatNational(),
        international: phone.formatInternational(),
      };
    } catch {
      return { valid: false, countryMatch: false };
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const checkRight = () => {
    if (!CTX.products?.details?.name) {
      toast.error("Fill your full name and continue");
      return true;
    }

    if (!CTX.products?.details?.email) {
      toast.error("Fill your email and continue");
      return true;
    }
    if (!isValidEmail(CTX.products?.details?.email)) {
      toast.error("Enter a valid email and continue!");
      return;
    }

    if (
      !CTX.products?.details?.phone ||
      CTX.products?.details?.phone?.length < 10
    ) {
      toast.error("Fill your phone and continue");
      return true;
    }

    // const valid = validatePhone(CTX.products?.details?.phone, "NG");

    // if (!valid?.valid) {
    //   toast.error("Check phone number and continue!");
    //   return;
    // }

    if (
      !CTX.products?.details?.isWhatsapp &&
      !CTX.products?.details?.whatsapp
    ) {
      toast.error("Fill your whatsapp number and continue");
      return true;
    }

    if (
      !CTX.products?.details?.isWhatsapp &&
      CTX.products?.details?.whatsapp?.length < 10
    ) {
      toast.error("Fill your whatsapp number and continue");
      return true;
    }

    if (
      CTX.products?.recurringOrder?.key &&
      !CTX.products?.recurringOrder?.value
    ) {
      toast.error(
        "This is a recurring order. Please confirm the frequency and proceed"
      );
      return true;
    }

    if (
      !CTX.products?.delivery?.is_pickup &&
      !CTX.products?.delivery?.address?.state
    ) {
      toast.error("Fill your shipping state details and continue");
      return true;
    }

    if (
      !CTX.products?.delivery?.is_pickup &&
      !CTX.products?.delivery?.address?.address
    ) {
      toast.error("Fill your shipping address details and continue");
      return true;
    }

    if (
      !CTX.products?.delivery?.is_pickup &&
      !CTX.products?.delivery?.address?.city
    ) {
      toast.error("Fill your shipping city details and continue");
      return true;
    }

    if (
      !CTX.products?.delivery?.is_pickup &&
      !CTX.products?.delivery?.address?.zip
    ) {
      toast.error("Fill your shipping zip code details and continue");
      return true;
    }

    return false;
  };

  return { checkRight };
};
