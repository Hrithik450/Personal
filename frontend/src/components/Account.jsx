import React from "react";
import { MdContentCopy } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { alertObject } from "../constants";
import SubscriptionCard from "./design/Subscription";
import { useDispatch, useSelector } from "react-redux";
import { fetchprofile, logout } from "../store/slices/auth/authThunks";
import DotSpinner from "./design/Spinner";
import { useSearchParams } from "react-router-dom";

const plans = {
  24: "plan4",
  12: "plan3",
  6: "plan2",
  1: "plan1",
};

const Profile = ({ toggleAccount }) => {
  const { user, authLoading } = useSelector((state) => state.authReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const apiKeyRef = useRef(null);

  const handleCopy = () => {
    const apiKeyText = apiKeyRef.current.textContent;
    navigator.clipboard.writeText(apiKeyText);
    toast.success("Copied!", alertObject);
  };

  useEffect(() => {
    if (apiKeyRef.current) {
      apiKeyRef.current.scrollLeft = apiKeyRef.current.scrollWidth;
    }
    const fetchProfile = async () => {
      await dispatch(fetchprofile()).unwrap();
    };
    fetchProfile();
  }, []);

  // console.log(user);

  const onUpgrade = () => {
    setSearchParams({
      subscription: "Premium",
      payment: "open",
      duration: "plan4",
      paymentMethod: "crypto",
    });
  };

  const onRenew = () => {
    setSearchParams({
      subscription: user.subscription.package,
      payment: "open",
      duration: plans[user.subscription.duration],
      paymentMethod: user.subscription.method,
    });
  };

  const onLogout = async () => {
    const result = await dispatch(logout()).unwrap();
    if (result?.success) setSearchParams({});
  };

  if (authLoading) {
    return (
      <div className="fixed top-0 right-0 z-[101] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-5 bg-gradient-to-br from-[#2b4162] to-[#12100e] border border-gray-700 shadow-2xl text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6 my-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Account
          </h2>
          <button
            onClick={toggleAccount}
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
    <div className="fixed top-0 right-0 z-[101] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-5 bg-gradient-to-br from-[#2b4162] to-[#12100e] border border-gray-700 shadow-2xl text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Account
        </h2>
        <button
          onClick={toggleAccount}
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="flex justify-center items-center my-8">
        <div className="relative mr-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
          <img
            src="https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png"
            alt="Profile"
            className="rounded-full object-cover w-full h-full border-4 border-white/20"
          />
          <div className="absolute inset-0 rounded-full border-4 border-white/10 animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] max-sm:grid-cols-1 gap-y-4 mt-6 md:my-10 items-center">
        <h4 className="max-sm:text-sm text-lg font-bold sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Name
        </h4>
        <p className="max-sm:text-sm text-lg text-white/80 sm:text-base">
          {user?.username}
        </p>

        <h4 className="max-sm:text-sm text-lg font-bold sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Email
        </h4>
        <p className="max-sm:text-sm text-lg text-white/80 sm:text-base">
          {user?.email}
        </p>

        {user?.subscription?.apiKey && !user?.subscription?.expired && (
          <>
            <h4 className="max-sm:text-sm text-lg font-bold sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              API Key
            </h4>
            <div className="flex items-center rounded-md">
              <div className="w-48 max-w-full overflow-hidden">
                <p
                  ref={apiKeyRef}
                  className="text-sm text-white/80 whitespace-nowrap overflow-x-auto"
                >
                  {user.subscription.apiKey}
                </p>
              </div>

              <button
                onClick={handleCopy}
                className="ml-4 p-2 bg-gradient-to-r from-[#4ade80] to-[#22c55e] rounded-md hover:from-[#3bc76e] hover:to-[#1d9f4d] transition-all duration-300"
              >
                <MdContentCopy className="h-5 w-5 text-white" />
              </button>
            </div>
          </>
        )}

        <h4 className="max-sm:text-sm text-lg font-bold sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Last login
        </h4>
        <p className="max-sm:text-sm text-lg text-white/80 sm:text-base">
          {user?.lastLogin}
        </p>
      </div>

      {user?.subscription?.package && (
        <SubscriptionCard
          subscription={user?.subscription?.package}
          expiryDate={user?.subscription?.expiry}
          onUpgrade={onUpgrade}
          onRenew={onRenew}
          expired={user?.subscription?.expired}
          price={`$${user?.subscription?.priceRate || "0"}${
            user?.subscription?.priceRate ? "/mon" : ""
          }`}
        />
      )}

      <div className="my-6">
        <button
          onClick={onLogout}
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
