import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import FeedbackSuccess from "../../components/feedback/FeedbackSuc";
import { createFeedback } from "../../store/slices/feedback/feedbackThunks";
import DotSpinner from "../../components/common/dotSpinner";
const steps = ["User Info", "Likes", "Reason", "Source", "WhatsApp", "Submit"];

const FeedbackForm = () => {
  const { packageName, uuid } = useParams();
  const SECRET_KEY = import.meta.env.VITE_SECRET;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [step, setStep] = useState(Number(searchParams.get("step")) || 0);
  const [feedbackLoading, setfeedbackLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    name: "",
    likes: [],
    source: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const Reviewed = sessionStorage.getItem("reviewSuccess");
    if (Reviewed) {
      setReviewSuccess(true);
    }
  }, []);

  useEffect(() => {
    const newData = { ...data };

    if (searchParams.get("name")) newData.name = searchParams.get("name");
    newData.likes = searchParams.get("likes")?.split(",") || [];
    if (searchParams.get("source")) newData.source = searchParams.get("source");

    const encryptedEmail = searchParams.get("data");
    if (encryptedEmail) {
      const decryptedEmail = decryptEmail(decodeURIComponent(encryptedEmail));
      if (decryptedEmail) {
        newData.email = decryptedEmail;
      }
    }

    setData(newData);
    setStep(Number(searchParams.get("step")) || 0);
  }, [searchParams]);

  const handleNext = () => {
    const newStep = Math.min(step + 1, steps.length - 1);
    setStep(newStep);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", newStep);
    setSearchParams(newSearchParams);
  };

  const handlePrev = () => {
    const newStep = Math.max(step - 1, 0);
    setStep(newStep);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", newStep);
    setSearchParams(newSearchParams);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, value);
    setSearchParams(newSearchParams);
  };

  const handleCheckboxChange = (name, value) => {
    setData((prevData) => {
      const updatedArray = prevData[name].includes(value)
        ? prevData[name].filter((item) => item !== value)
        : [...prevData[name], value];

      const newSearchParams = new URLSearchParams(searchParams);

      if (updatedArray.length === 0) {
        newSearchParams.delete(name);
      } else {
        newSearchParams.set(name, updatedArray.join(","));
      }

      setSearchParams(newSearchParams);
      return { ...prevData, [name]: updatedArray };
    });
  };

  function decryptEmail(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  const handleGoogleAuth = () => {
    const url = new URL(window.location.href);
    const redirectUrl = encodeURIComponent(url.toString());
    window.location.href = `${BACKEND_URL}/api/v1/auth/google?redirectUrl=${redirectUrl}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setfeedbackLoading(true);
    const res = await dispatch(
      createFeedback({ feedback: data, packageName, uuid })
    ).unwrap();

    if (res.success) {
      setfeedbackLoading(false);
      setReviewSuccess(true);
      sessionStorage.setItem("reviewSuccess", JSON.stringify("true"));
    }
  };

  if (reviewSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-700 ">
        <form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
          <FeedbackSuccess />
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <form className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <div className="bg-black text-white text-center rounded-t-2xl p-4">
          <h2 className="text-lg font-semibold">
            THANKS FOR CHOOSING <span className="text-blue-200">CodeEaseX</span>
          </h2>
        </div>
        <h2 className="text-xl font-bold mt-4 mb-4 text-black"></h2>

        {step === 0 && (
          <>
            <label className="block font-semibold text-black">
              Full Name<span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={data.name}
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
                  value={data.email}
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
              {data.email && (
                <p className="text-green-600 font-semibold mt-1 self-end text-xs">
                  Verified
                </p>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={!data.name || !data.email}
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </>
        )}

        {step === 1 && (
          <div className="px-2 mt-4">
            <h3 className="text-black font-serif text-lg mb-2">
              What makes CodeEaseX the right choice for you?
            </h3>
            {[
              "Easy to Setup MERN Projects",
              "Reduces Manual Effort",
              "Saves Lot of Time!",
              "Boosts Productivity",
            ].map((option) => (
              <label key={option} className="block text-black mt-1">
                <input
                  type="checkbox"
                  checked={data.likes?.includes(option) || false}
                  onChange={() => handleCheckboxChange("likes", option)}
                />
                <p className="inline-block ml-2 font-serif">{option}</p>
              </label>
            ))}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                className="bg-gray-500 text-white px-5 py-1 rounded-2xl"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={data.likes.length === 0}
                className={`bg-blue-600 text-white px-5 py-1 rounded-2xl ${
                  data.likes.length === 0 && "opacity-50 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="px-2 mt-4">
            <h3 className="text-black font-serif text-lg mb-2">
              Where did you hear about CodeEaseX?
            </h3>
            {[
              "Linkdin",
              "Instagram",
              "YouTube Shorts",
              "Friend Recommended",
            ].map((option) => (
              <label key={option} className="block text-black mt-1">
                <input
                  type="radio"
                  name="source"
                  value={option}
                  checked={data.source === option}
                  onChange={handleChange}
                />
                <p className="inline-block ml-2 font-serif">{option}</p>
              </label>
            ))}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                className="bg-gray-500 text-white px-5 py-1 rounded-2xl"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!data.source}
                className={`bg-blue-600 text-white px-5 py-1 rounded-2xl ${
                  !data.source && "opacity-50 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="px-2 mt-2">
            <h3 className="text-black mb-4 font-bold font-serif">
              🚀 Only for limited members
            </h3>
            <div className="flex items-center gap-2">
              <h3 className="text-black font-serif text-lg mb-2">
                🚀 Join our WhatsApp Group to participate in our{" "}
                <span className="text-blue-500 font-medium">CodeEaseX</span>{" "}
                projects & win up to ₹10,000! prize💰🔥 👉
              </h3>

              <img
                src="https://res.cloudinary.com/duozomapm/image/upload/v1741114807/Screenshot_2025-03-05_004202_rxesg5.png"
                alt="WhatsApp QR Code"
                className="w-50 mx-auto rounded-xl"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                className="bg-gray-500 text-white px-5 py-1 rounded-2xl"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!data.source}
                className={`bg-blue-600 text-white px-5 py-1 rounded-2xl ${
                  !data.source && "opacity-50 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="px-2 mt-4">
            <h3 className="text-black font-serif text-lg mb-2 text-center">
              Developers are saving an average of 90% time in setting up MERN
              project using CodeEaseX
            </h3>

            <img
              className="rounded-lg"
              src="https://res.cloudinary.com/duozomapm/image/upload/v1741177646/codeaseX_banner_gcoiqr.png"
              alt=""
            />
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={feedbackLoading ? true : false}
                className="bg-gray-500 text-white px-5 py-1 rounded-2xl"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className={`bg-green-600 text-white px-5 py-1 rounded-2xl`}
              >
                {feedbackLoading ? <DotSpinner color="white" /> : " Submit"}
              </button>
            </div>
          </div>
        )}

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
      </form>
    </div>
  );
};

export default FeedbackForm;
