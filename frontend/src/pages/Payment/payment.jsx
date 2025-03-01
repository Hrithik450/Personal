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

const PaymentPage = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const [isPaymentStart, setisPaymentStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [formData, setformData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedPaymentData = sessionStorage.getItem("paymentSuccess");
    if (storedPaymentData) {
      setPaymentData(JSON.parse(storedPaymentData));
      setIsPaymentSuccessful(true);
    }
  }, []);

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              "https://res.cloudinary.com/duozomapm/image/upload/v1737799706/AnuvBanner2_lp8bqd.jpg",
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
            required
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg mt-1 border-2 border-gray-400 focus:border-pink-600 placeholder-gray-500 text-black"
          />

          <label className="block font-semibold mt-4 text-black">
            Email Address<span className="text-red-500">*</span>
          </label>
          <input
            required
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className="w-full p-2 rounded-lg mt-1 border-2 border-gray-400 focus:border-pink-600 placeholder-gray-500 text-black"
          />

          <div className="flex items-center mt-4 text-green-600">
            <span className="text-2xl">📲</span>
            <p className="ml-2">Confirmations will be sent over email</p>
          </div>

          <button
            className={`w-full bg-blue-600 text-white py-2 rounded-lg mt-4 text-lg cursor-pointer ${
              isPaymentStart && "pt-4 pb-4"
            }`}
          >
            {isPaymentStart ? <DotSpinner color={"white"} /> : "PAY ₹149/ year"}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            By proceeding you agree to our{" "}
            <a
              href="https://hruthik.anox.store/terms-and-conditions"
              className="text-blue-600 cursor-pointer"
            >
              Terms, Privacy & Refund Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
