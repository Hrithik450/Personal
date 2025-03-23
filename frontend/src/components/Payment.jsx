import React from "react";
import PaymentDetailsTab from "./design/payment";
import { useSearchParams } from "react-router-dom";

const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const closePayment = () => {
    setSearchParams({});
  };

  return (
    <div className="fixed top-0 right-0 z-[101] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-5 bg-gradient-to-br bg-n-8 border border-gray-300 shadow-md text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Secure Pay 🔒
        </h2>
        <button
          onClick={closePayment}
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <PaymentDetailsTab />
    </div>
  );
};

export default Payment;
