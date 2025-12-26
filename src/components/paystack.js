export const payWithPaystack = ({ email, amount, onSuccess, onClose }) => {
  const handler = window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email,
    amount: amount * 100, // kobo
    currency: "NGN",
    callback: function (response) {
      onSuccess(response);
    },
    onClose: function () {
      onClose();
    },
  });

  handler.openIframe();
};
