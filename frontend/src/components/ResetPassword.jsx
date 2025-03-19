import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const ResetPassword = ({ toggleReset }) => {
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

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
          onClick={toggleReset}
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="flex items-center justify-center mt-20">
        <div className="bg-gradient-to-br from-[#1a2a6c] to-[#b21f1f] p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">
            Reset Your Password
          </h2>

          <p className="text-center text-gray-400 mb-6">
            Enter your new password and confirm it to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="New Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ff7e5f]"
                required
              />
              <button
                type="button"
                onClick={() => setpasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#ff7e5f] transition-colors duration-300"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative mb-6">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#ff7e5f]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6f4f] hover:to-[#fea46b] text-white font-semibold py-2 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
