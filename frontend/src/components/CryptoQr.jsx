import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alertObject } from "../constants";
import { toast } from "react-toastify";
import DotSpinner from "./design/Spinner";
import {
  fetchDepositAddress,
  verifyPayment,
} from "../store/slices/payment/paymentThunks";
import { fetchprofile } from "../store/slices/auth/authThunks";

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

const CryptoQr = ({ toggleCrypto }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cryptoData, setcryptoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [txid, setTxid] = useState("");
  const dispatch = useDispatch();
  const apiKeyRef = useRef(null);

  const plan = searchParams.get("duration") || "plan1";
  const paymentMethod = searchParams.get("paymentMethod") || "card";
  const subscription = searchParams.get("subscription") || "Pro";
  const selectedCrypto = searchParams.get("crypto") || "XLM";
  const { user } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const user = await dispatch(fetchprofile()).unwrap();

        const data = {
          asset: selectedCrypto,
          network: selectedCrypto,
          totalUSDT: getTotalPrice(),
          userID: user.user.userID,
        };

        const response = await dispatch(fetchDepositAddress(data)).unwrap();
        setcryptoData(response);
      } catch (error) {
        console.error("Failed to fetch deposit address:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleCopy = () => {
    const apiKeyText = apiKeyRef.current.textContent;
    navigator.clipboard.writeText(apiKeyText);
    toast.success("Copied!", alertObject);
  };

  useEffect(() => {
    if (apiKeyRef.current) {
      apiKeyRef.current.scrollLeft = apiKeyRef.current.scrollWidth;
    }
  }, []);

  const calculateDiscountedPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const getTotalDiscountPercentage = () => {
    let discount = paymentMethod === "crypto" ? 10 : 0;

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

  const handleChange = (e) => {
    setTxid(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (txid === "")
      return toast.error("Please Enter TXID/Hash ID!", alertObject);

    try {
      setPaymentLoading(true);
      const data = {
        txid,
        coin: selectedCrypto,
        userData: {
          username: user.username,
          userID: user.userID,
          email: user.email,
        },
        subscription: {
          expectedAmount: cryptoData.amount,
          expectedAddress: cryptoData.depositAddress,
          usdtAmount: getTotalPrice(),
          Subscription: subscription,
          PlanDuration: plans[plan],
          PaymentMode: "crypto",
          PlanRate: subscriptions[subscription],
        },
      };

      const res = await dispatch(verifyPayment(data)).unwrap();
      if (res?.success) setSearchParams({ account: "open" });
    } catch (error) {
      toast.error(error.response.data.message, alertObject);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 right-0 z-[104] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-4 bg-gradient-to-br bg-n-8 border border-gray-300 shadow-md text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Secure Pay 🔒
          </h2>
          <button
            onClick={toggleCrypto}
            className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
          >
            ✕
          </button>
        </div>

        <DotSpinner />
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 z-[104] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-4 bg-gradient-to-br bg-n-8 border border-gray-300 shadow-md text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Secure Pay 🔒
        </h2>
        <button
          onClick={toggleCrypto}
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-4 bg-gradient-to-br from-[#1a2a6c] to-[#12100e] rounded-2xl shadow-2xl transform transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              Amount in {selectedCrypto}
            </h3>
            <div className="bg-gradient-to-r from-[#2b4162] to-[#12100e] rounded-md p-3 text-white">
              {cryptoData?.amount}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Currency</h3>
            <div className="bg-gradient-to-r from-[#2b4162] to-[#12100e] rounded-md p-3 text-white">
              {selectedCrypto}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-2.293 2.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Network</h3>
            <div className="bg-gradient-to-r from-[#2b4162] to-[#12100e] rounded-md p-3 text-white">
              {selectedCrypto}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              Deposit Address
            </h3>
            <div className="bg-gradient-to-r from-[#2b4162] to-[#12100e] rounded-md p-4 space-y-4">
              <img
                src={cryptoData?.qrCode}
                alt="Crypto QR Code"
                className="w-40 h-40 mx-auto"
              />

              <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
                <div ref={apiKeyRef} className="text-white break-all">
                  {cryptoData?.depositAddress}
                </div>
                <button
                  onClick={handleCopy}
                  className="ml-4 p-2 bg-gradient-to-r from-[#4ade80] to-[#22c55e] rounded-md hover:from-[#3bc76e] hover:to-[#1d9f4d] transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {cryptoData && cryptoData?.memoTag && (
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                Memo/Destination Tag
              </h3>
              <div className="bg-gradient-to-r from-[#2b4162] to-[#12100e] rounded-md p-4 space-y-4">
                <img
                  src={cryptoData?.memoQr}
                  alt="Crypto QR Code"
                  className="w-40 h-40 mx-auto"
                />

                <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
                  <div ref={apiKeyRef} className="text-white break-all">
                    {cryptoData?.memoTag}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="ml-4 p-2 bg-gradient-to-r from-[#4ade80] to-[#22c55e] rounded-md hover:from-[#3bc76e] hover:to-[#1d9f4d] transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <p>
            <strong className="text-red-400">Payment Instructions:</strong>
          </p>
          <p className="text-yellow-200">
            1. Make sure you select the <strong>TRX Tron (TRC20)</strong>{" "}
            network in your wallet when sending payment.
          </p>
          <p className="text-orange-200">
            2. It's okay to navigate away from this page while paying. Your
            payment progress is saved. Come back here to enter the TXID/Hash ID
            once your payment is complete.
          </p>
          <p className="text-yellow-200">
            3. You must enter TXID/Hash ID within 2 hours of payment is
            completed.
          </p>
          <p className="text-red-200">
            4. Please ensure that the amount you send matches the exact amount
            displayed.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="txid" className="text-white">
            TXID/Hash ID:
          </label>
          <input
            type="text"
            value={txid}
            className="w-full p-3 rounded-md bg-gradient-to-r from-[#2b4162] to-[#12100e] text-white focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
            placeholder="Enter TXID/Hash ID"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-[#3bc76e] hover:to-[#1d9f4d] transition-all duration-300 transform hover:scale-105"
          >
            {paymentLoading ? <DotSpinner /> : "Verify Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoQr;
