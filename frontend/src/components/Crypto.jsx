import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const subscriptions = {
  Premium: 3.5,
  Pro: 2.5,
};

const plans = {
  plan1: 1,
  plan2: 6,
  plan3: 12,
  plan4: 24,
};

const durationDiscounts = {
  6: 2.5,
  12: 5,
  24: 10,
};

const CryptoPayment = ({ toggleCrypto }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const plan = searchParams.get("duration") || "plan1";
  const paymentMethod = searchParams.get("paymentMethod") || "card";
  const subscription = searchParams.get("subscription") || "Pro";
  const selectedCrypto = searchParams.get("crypto") || "XLM";
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get("crypto")) {
      const newParams = new URLSearchParams(searchParams);

      if (!searchParams.get("crypto")) newParams.set("crypto", crypto);

      navigate(`?${newParams.toString()}`, { replace: true });
    }
  }, [searchParams, navigate]);

  function closeCryptoPayment() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("crypto");
    newParams.delete("cryptoPay");
    setSearchParams(newParams);
  }

  const cryptoMethods = [
    {
      coin: "XLM",
      url: "https://res.cloudinary.com/duozomapm/image/upload/v1742567312/cryptoxlm_cdgbwb-removebg-preview_zdup69.png",
      offer: "2-5 sec and ~$0.00001 fee",
    },
    {
      coin: "XRP",
      url: "https://res.cloudinary.com/duozomapm/image/upload/v1742567603/cryptoxrp_prxi1t-removebg-preview_j6uhro.png",
      offer: "3-5 sec and ~$0.0002 fee",
    },
    {
      coin: "LTC",
      url: "https://res.cloudinary.com/duozomapm/image/upload/v1742569392/cryptoltc_e6z7ec-removebg-preview_psnytx.png",
      offer: "2-5 min and ~$0.0001 fee",
    },
    {
      coin: "SOL",
      url: "https://res.cloudinary.com/duozomapm/image/upload/v1742567603/cryptosol_gkioro-removebg-preview_tbvrun.png",
      offer: "1-2 sec and ~$0.00025 fee",
    },
    {
      coin: "TRX",
      url: "https://res.cloudinary.com/duozomapm/image/upload/v1742567603/cryptotron_vuxjq9-removebg-preview_p0k9mk.png",
      offer: "3-5 sec and ~$0.001 fee",
    },
    {
      coin: "BCH",
      url: "https://res.cloudinary.com/duozomapm/image/upload/v1742567603/cryptobch_fiugsi-removebg-preview_wgtavv.png",
      offer: "5-15 min and ~$0.005 fee",
    },
    {
      coin: "DOGE",
      url: "https://res.cloudinary.com/duozomapm/image/upload/v1742567603/cryptodoge_zq4itc-removebg-preview_xeneq3.png",
      offer: "1 min and ~$0.002 fee",
    },
  ];

  const updateCrypto = (crypto) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("crypto", crypto);
      return newParams;
    });
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const getTotalDiscountPercentage = () => {
    let discount = paymentMethod === "crypto" ? 5 : 0;

    if (durationDiscounts[plans[plan]]) {
      discount += durationDiscounts[plans[plan]];
    }

    return discount;
  };

  const getTotalPrice = () => {
    let totalPrice = plans[plan] * subscriptions[subscription];
    const totalDiscount = getTotalDiscountPercentage();
    totalPrice = calculateDiscountedPrice(totalPrice, totalDiscount);
    return totalPrice.toFixed(2);
  };

  const openCryptoPay = () => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("cryptoPayOpen", "open");
      return newParams;
    });
  };

  return (
    <div className="fixed top-0 right-0 z-[103] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-4 bg-gradient-to-br bg-n-8 border border-gray-300 shadow-md text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Secure Pay 🔒
        </h2>
        <button
          onClick={closeCryptoPayment}
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
          Choose Your Currency
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {cryptoMethods.map((crypto) => {
            return (
              <label
                key={crypto.coin}
                className={`p-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedCrypto === crypto.coin
                    ? "bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white shadow-lg"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-md"
                } flex flex-col items-center justify-center relative overflow-hidden cursor-pointer`}
              >
                <input
                  type="radio"
                  name="cryptoPayment"
                  value={crypto.coin}
                  checked={selectedCrypto === crypto.coin}
                  onChange={() => updateCrypto(crypto.coin)}
                  className="hidden"
                />
                <div className="flex items-center">
                  <img
                    src={crypto.url}
                    alt={`${crypto.coin} Logo`}
                    className="w-12 h-12 mr-4"
                  />
                  <span className="text-2xl font-bold">{crypto.coin}</span>
                </div>
                {crypto.offer && (
                  <span className="text-sm mt-4 bg-green-500/20 px-3 py-1 rounded-full animate-bounce">
                    🎉 {crypto.offer}
                  </span>
                )}
                {selectedCrypto === crypto.coin && (
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
              </label>
            );
          })}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#4ade80] to-[#22c55e] bg-clip-text text-transparent">
            Total Price
          </h3>
          <div className="bg-gradient-to-r from-[#14532d] to-[#166534] p-5 py-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
            <div className="text-lg text-gray-300 line-through mb-2">
              Original Price: ${plans[plan] * subscriptions[subscription]}
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
            onClick={openCryptoPay}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoPayment;
