import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const ForgetPassword = ({ toggleForget }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: searchParams.get("email") || "",
  });

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      return newParams;
    });
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    return;
  };

  return (
    <div className="fixed top-0 right-0 z-[102] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-5 bg-gradient-to-br from-[#2b4162] to-[#12100e] border border-gray-700 shadow-2xl text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Account
        </h2>
        <button
          onClick={toggleForget}
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center justify-center mt-20">
        <div className="bg-gradient-to-br from-[#1a2a6c] to-[#b21f1f] p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">
            Forgot Your Password?
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Enter your email address, and we’ll send you a link to reset your
            password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ff7e5f]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6f4f] hover:to-[#fea46b] text-white font-semibold py-2 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
