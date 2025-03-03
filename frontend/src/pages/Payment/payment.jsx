import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AlertObject } from "../../components/common/config";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  capturePayment,
  createOrder,
} from "../../store/slices/payment/paymentThunks";
import DotSpinner from "../../components/common/dotSpinner";
import PaymentSuccess from "../../components/payment/success";
import { useSearchParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const PaymentPage = () => {
  const { packageName, uuid } = useParams();
  const dispatch = useDispatch();

  const [isPaymentStart, setisPaymentStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setformData] = useState({
    name: searchParams.get("name") || "",
    email: "",
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const SECRET_KEY = import.meta.env.VITE_SECRET;

  function decryptEmail(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  useEffect(() => {
    const storedPaymentData = sessionStorage.getItem("paymentSuccess");
    if (storedPaymentData) {
      setPaymentData(JSON.parse(storedPaymentData));
      setIsPaymentSuccessful(true);
    }
  }, []);

  useEffect(() => {
    const encryptedEmail = searchParams.get("data");
    if (encryptedEmail) {
      const decryptedEmail = decryptEmail(decodeURIComponent(encryptedEmail));

      if (decryptedEmail) {
        setformData((prev) => ({ ...prev, email: decryptedEmail }));
        setEmailVerified(true);
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, value);
    setSearchParams(newSearchParams);
  };

  const handleGoogleAuth = () => {
    const url = new URL(window.location.href);
    const redirectUrl = encodeURIComponent(url.toString());
    window.location.href = `${BACKEND_URL}/api/v1/auth/google?redirectUrl=${redirectUrl}`;
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();

    const orderData = {
      totalAmount: 149,
      paymentId: "",
      payerId: "",
    };

    try {
      setisPaymentStart(true);

      const res = await dispatch(
        createOrder({ totalAmount: orderData.totalAmount })
      ).unwrap();

      if (res.success) {
        try {
          const loadscript = (src) => {
            return new Promise((resolve) => {
              const script = document.createElement("script");

              script.src = src;
              script.onload = () => {
                resolve(true);
              };

              script.onerror = () => {
                resolve(false);
              };

              document.body.appendChild(script);
            });
          };

          await loadscript("https://checkout.razorpay.com/v1/checkout.js");

          const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: res.amount,
            currency: "INR",
            name: "codeEase",
            description: "Paying to codeEase",
            image:
              "https://res.cloudinary.com/duozomapm/image/upload/v1740900611/codeEaseLogo_tt6wjb.png",
            order_id: res.orderID,
            theme: {
              color: "#F4C430",
            },
            handler: async function (response) {
              setIsLoading(true);
              setPaymentData(orderData.totalAmount);

              const paymentRes = await dispatch(
                capturePayment({
                  formData,
                  orderData,
                  orderID: res.orderID,
                  paymentID: response.razorpay_payment_id,
                  uuid,
                  packageName,
                })
              ).unwrap();

              if (paymentRes.success) {
                setIsLoading(false);
                setIsPaymentSuccessful(true);
                sessionStorage.setItem(
                  "paymentSuccess",
                  JSON.stringify(orderData.totalAmount)
                );
              }
            },
            redirect: true,
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();

          paymentObject.on("payment.failed", function (response) {
            toast.error(response.error, AlertObject);
          });
        } catch (error) {
          toast.error(error, AlertObject);
        }
      }
    } catch (error) {
      toast.error(error, AlertObject);
    } finally {
      setisPaymentStart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-700">
        <form className="flex items-center justify-center bg-white shadow-lg rounded-2xl p-6 w-full min-h-[478px] max-w-md">
          <DotSpinner color={"black"} />
        </form>
      </div>
    );
  }

  if (isPaymentSuccessful) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-700 ">
        <form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <PaymentSuccess amount={paymentData} />
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <form
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
        onSubmit={handleInitiatePayment}
      >
        <div className="bg-black text-white text-center rounded-t-2xl p-4">
          <h2 className="text-lg font-semibold">
            THANKS FOR CHOOSING <span className="text-blue-200">CODEEASE</span>
          </h2>
        </div>
        <div className="p-6">
          <label className="block font-semibold text-black">
            Full Name<span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg mt-1 border-2 border-gray-400 focus:border-pink-600 placeholder-gray-500 text-black"
          />

          <label className="block font-semibold mt-4 text-black">
            Email Address<span className="text-red-500">*</span>
          </label>
          <div className="flex items-center flex-col">
            <div className="relative w-full mt-1 border-2 rounded-lg border-gray-400 focus:border-pink-600">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="example@example.com"
                readOnly
                required
                className="w-full p-2 placeholder-gray-500 text-black"
              />
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="bg-blue-500 text-white px-2 py-2 absolute right-0 top-0 h-full font-medium text-sm"
              >
                Select Email
              </button>
            </div>
            {formData.email && (
              <p className="text-green-600 font-semibold mt-1 self-end text-xs">
                Verified
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!emailVerified}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg mt-4 text-lg cursor-pointer ${
              isPaymentStart ? "pt-4 pb-4" : ""
            } ${!emailVerified && "opacity-50 cursor-not-allowed"}`}
          >
            {isPaymentStart ? <DotSpinner color="white" /> : "PAY ₹149/ year"}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            By proceeding you agree to our{" "}
            <a
              href={`/terms-and-conditions/${packageName}/${uuid}`}
              className="text-blue-600 cursor-pointer"
            >
              Terms
            </a>
            ,{" "}
            <a
              href={`/privacy-policy/${packageName}/${uuid}`}
              className="text-blue-600 cursor-pointer"
            >
              Privacy
            </a>{" "}
            &{" "}
            <a
              href={`/refund-policy/${packageName}/${uuid}`}
              className="text-blue-600 cursor-pointer"
            >
              Refund Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
