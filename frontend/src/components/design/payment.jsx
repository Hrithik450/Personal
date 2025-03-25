import React, { useEffect, useState } from "react";
import PlanConfirmationCard from "./Confcard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { freePack } from "../../store/slices/payment/paymentThunks";
import { fetchprofile } from "../../store/slices/auth/authThunks";
import DotSpinner from "./Spinner";
import { toast } from "react-toastify";
import { alertObject } from "../../constants";

function getPlanName(duration) {
  switch (duration) {
    case 6:
      return "plan2";
    case 12:
      return "plan3";
    case 24:
      return "plan4";
    default:
      return "plan1";
  }
}

function calculateExpiryDate(months) {
  const currentDate = new Date();
  const expiryDate = new Date(currentDate);
  expiryDate.setMonth(currentDate.getMonth() + months);
  const year = expiryDate.getFullYear();
  const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
  const day = String(expiryDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const discounts = {
  6: "2.5%",
  12: "5%",
  24: "10%",
};

const durationDiscounts = {
  6: 2.5,
  12: 5,
  24: 10,
};

const planToDuration = {
  plan1: 1,
  plan2: 6,
  plan3: 12,
  plan4: 24,
};

const PaymentDetailsTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const subscription = searchParams.get("subscription");

  const plan = searchParams.get("duration") || "plan1";
  const paymentMethod = searchParams.get("paymentMethod") || "card";
  const duration = planToDuration[plan] || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, authLoading } = useSelector((state) => state.authReducer);
  const price =
    subscription === "Premium" ? 3.5 : subscription === "Pro" ? 2.5 : 0;

  useEffect(() => {
    if (!searchParams.get("duration") || !searchParams.get("paymentMethod")) {
      const newParams = new URLSearchParams(searchParams);

      if (!searchParams.get("duration")) newParams.set("duration", "plan1");
      if (!searchParams.get("paymentMethod"))
        newParams.set("paymentMethod", "card");

      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(fetchprofile()).unwrap();
    };
    fetchUserData();
  }, [dispatch]);

  const getTotalDiscountPercentage = () => {
    let discount = paymentMethod === "crypto" ? 5 : 0;

    if (durationDiscounts[duration]) {
      discount += durationDiscounts[duration];
    }

    return discount;
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const getTotalPrice = () => {
    let totalPrice = price * duration;
    const totalDiscount = getTotalDiscountPercentage();
    totalPrice = calculateDiscountedPrice(totalPrice, totalDiscount);
    return totalPrice.toFixed(2);
  };

  const openCryptoPay = () => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("cryptoPay", "open");
      return newParams;
    });
  };

  const updatePaymentMethod = (newPaymentMethod) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("paymentMethod", newPaymentMethod);
    setSearchParams(newParams);
  };

  const updateDuration = (newDuration) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("duration", getPlanName(newDuration));
    setSearchParams(newParams);
  };

  const handleSubmit = async () => {
    if (paymentMethod !== "card") {
      return openCryptoPay();
    }

    if (subscription === "Basic") {
      if (user?.freeTrial === "Expired" || user?.freeTrial === "Active")
        return toast.error("Basic plan has expired!", alertObject);

      const data = {
        userData: {
          username: user.username,
          userID: user.userID,
          email: user.email,
        },
        subscription: {
          usdtAmount: 0,
          Subscription: subscription,
          PlanRate: 0,
        },
      };

      try {
        setIsLoading(true);
        const res = await dispatch(freePack(data)).unwrap();
        if (res?.success) setSearchParams({ account: "open" });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }

      return;
    }

    return toast.error(
      "This payment method is currently unavailable. Our team is working on it!",
      alertObject
    );
  };

  if (authLoading) {
    return <DotSpinner />;
  }

  return (
    <div className="bg-gradient-to-br from-[#2b4162] to-[#12100e] rounded-2xl p-5 text-white shadow-lg mt-8">
      {price !== 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Choose Payment Method
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <label
              onClick={() => updatePaymentMethod("card")}
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
              onClick={() => updatePaymentMethod("crypto")}
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
                🎉 Flat 5% Off 🎉
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
                onClick={() => updateDuration(months)}
                className={`p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  duration === months
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-md"
                } flex flex-col items-center justify-center relative overflow-hidden`}
              >
                <span className="text-2xl font-bold">
                  {months} {months > 1 ? "Months" : "Month"}
                </span>
                {discounts[months] && (
                  <span className="text-sm mt-2 bg-green-500/20 px-3 py-1 rounded-full animate-bounce">
                    🎉 Flat {discounts[months]} OFF on {months} Months!
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
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
          Total Price
        </h3>
        <div className="bg-gradient-to-r from-[#14532d] to-[#166534] p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
          <div className="text-lg text-gray-300 line-through mb-2">
            Original Price: ${price * duration}
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-4xl font-bold text-white animate-pulse">
              ${getTotalPrice()}
            </p>
            <span className="text-md font-semibold bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white px-3 py-1 rounded-full animate-bounce">
              🎉 Flat {getTotalDiscountPercentage()}% Off
            </span>
          </div>

          <p className="text-sm text-gray-300 mt-2">
            Inclusive of all taxes and fees
          </p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? <DotSpinner /> : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetailsTab;
