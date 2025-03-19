import React, { useState } from "react";
import PlanConfirmationCard from "./Confcard";
import { useSearchParams } from "react-router-dom";

const PaymentDetailsTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subscription = searchParams.get("subscription");

  const price =
    subscription === "Premium" ? 3.5 : subscription === "Pro" ? 2.5 : 0;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [duration, setDuration] = useState(1);

  const calculateExpiryDate = (months) => {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setMonth(currentDate.getMonth() + months);
    const year = expiryDate.getFullYear();
    const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
    const day = String(expiryDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFreeMonths = (months) => {
    switch (months) {
      case 6:
        return 1;
      case 12:
        return 2;
      case 24:
        return 4;
      default:
        return 0;
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const getTotalPrice = () => {
    let totalPrice = price * duration;
    if (paymentMethod === "crypto") {
      totalPrice = calculateDiscountedPrice(totalPrice, 10);
    } else {
      totalPrice = price * duration;
    }
    return totalPrice.toFixed(2);
  };

  return (
    <div className="bg-gradient-to-br from-[#2b4162] to-[#12100e] rounded-2xl p-5 text-white shadow-lg mt-8">
      {price !== 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Choose Payment Method
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <label
              onClick={() => setPaymentMethod("card")}
              className={`p-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                paymentMethod === "card"
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 border-2 border-blue-500 shadow-xl"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border-2 border-gray-600 shadow-md"
              } flex flex-col items-center justify-center relative overflow-hidden`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "card"}
                className="hidden"
              />
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-white">Card/UPI</span>
                {paymentMethod === "card" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-300 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Instant and secure payments
              </p>
            </label>

            <label
              onClick={() => setPaymentMethod("crypto")}
              className={`p-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                paymentMethod === "crypto"
                  ? "bg-gradient-to-r from-purple-600 to-purple-800 border-2 border-purple-500 shadow-xl"
                  : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border-2 border-gray-600 shadow-md"
              } flex flex-col items-center justify-center relative overflow-hidden`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={paymentMethod === "crypto"}
                className="hidden"
              />
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-white">Crypto</span>
                {paymentMethod === "crypto" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-300 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Decentralized and secure
              </p>
              <div className="mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold animate-bounce">
                🎉 Flat 10% Off 🎉
              </div>
            </label>
          </div>
        </div>
      )}

      {price !== 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Choose Plan Duration
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[1, 6, 12, 24].map((months) => (
              <button
                key={months}
                onClick={() => setDuration(months)}
                className={`p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  duration === months
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-md"
                } flex flex-col items-center justify-center relative overflow-hidden`}
              >
                <span className="text-2xl font-bold">
                  {months} {months > 1 ? "Months" : "Month"}
                </span>
                {getFreeMonths(months) > 0 && (
                  <span className="text-sm mt-2 bg-green-500/20 px-3 py-1 rounded-full animate-bounce">
                    Get {getFreeMonths(months)} Month
                    {getFreeMonths(months) > 1 ? "s" : ""} Free! ({months} +{" "}
                    {getFreeMonths(months)})
                  </span>
                )}
                {duration === months && (
                  <div className="absolute inset-0 bg-green-900/20 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-green-300 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-400/50 animate-progress"></div>
              </button>
            ))}
          </div>
        </div>
      )}

      <PlanConfirmationCard
        plan={subscription}
        price={`$${price}/mon`}
        validTill={calculateExpiryDate(duration)}
      />

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Total Price
        </h3>
        <div className="bg-gradient-to-r from-[#2b4162] to-[#12100e] p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
          <p className="text-4xl font-bold text-white animate-pulse">
            ${getTotalPrice()}
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Inclusive of all taxes and fees
          </p>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentDetailsTab;
