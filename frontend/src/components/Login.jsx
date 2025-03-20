import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaGoogle,
  FaFacebookF,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { login, Oauth, signup } from "../store/slices/auth/authThunks";
import DotSpinner from "./design/Spinner";

const Auth = ({ toggleAuthen, toggleForget }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const authType = searchParams.get("auth") || "login";
  const { authLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: searchParams.get("username") || "",
    email: searchParams.get("email") || "",
    password: searchParams.get("password")
      ? atob(searchParams.get("password"))
      : "",
  });

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      const userID = searchParams.get("tempToken");

      if (!userID) return;

      const res = await dispatch(Oauth(userID)).unwrap();
      if (res?.success) {
        setSearchParams({});
      }
    };

    handleOAuthSuccess();
  }, [dispatch]);

  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      Object.entries({ auth: authType, ...formData }).forEach(
        ([key, value]) => {
          if (value !== "") {
            newParams.set(key, key === "password" ? btoa(value) : value);
          } else {
            newParams.delete(key);
          }
        }
      );
      return newParams;
    });
  }, [formData, authType, setSearchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAuth = (type) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("auth", type);
      return newParams;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result;
    if (authType === "login") {
      result = await dispatch(login(formData)).unwrap();
    } else {
      result = await dispatch(signup(formData)).unwrap();
    }
    if (result?.success) setSearchParams({});
  };

  return (
    <div className="fixed top-0 right-0 z-[101] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-5 bg-gradient-to-br from-[#2b4162] to-[#12100e] border border-gray-700 shadow-2xl text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Account
        </h2>
        <button
          onClick={toggleAuthen}
          className="text-white text-2xl cursor-pointer hover:text-red-500 transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="text-white mt-20 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#1a2a6c] to-[#b21f1f] p-8 rounded-lg shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:scale-105"
        >
          <h2 className="text-3xl font-semibold text-center mb-6 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">
            {authType === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          <div className="flex space-x-4 mb-4">
            <a
              type="button"
              href={`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`}
              className="flex items-center justify-center w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1e4bbd] py-2 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              <FaGoogle className="mr-2" /> Google
            </a>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="w-full border-b border-gray-600"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="w-full border-b border-gray-600"></div>
          </div>

          {authType === "signup" && (
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                required
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full pl-10 pr-3 py-2 rounded-md bg-[#2d2a29] border border-gray-600 focus:outline-none focus:border-[#ff7e5f]"
              />
            </div>
          )}

          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-2 rounded-md bg-[#2d2a29] border border-gray-600 focus:outline-none focus:border-[#ff7e5f]"
            />
          </div>

          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              required
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-md bg-[#2d2a29] border border-gray-600 focus:outline-none focus:border-[#ff7e5f]"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#ff7e5f] transition-colors duration-300"
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {authType === "login" && (
            <div className="text-right mb-6">
              <a
                type="button"
                onClick={toggleForget}
                className="text-[#ff7e5f] hover:underline cursor-pointer"
              >
                Forget Password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6f4f] hover:to-[#fea46b] py-3 rounded-md text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            {authLoading ? (
              <DotSpinner color={"white"} />
            ) : authType === "login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-400">
              {authType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() =>
                toggleAuth(authType === "login" ? "signup" : "login")
              }
              className="text-[#ff7e5f] ml-1 hover:underline"
            >
              {authType === "login" ? "Sign up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
