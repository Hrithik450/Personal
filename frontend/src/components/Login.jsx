import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaGoogle, FaShieldAlt, FaRocket, FaUserLock } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { login, Oauth, signup } from "../store/slices/auth/authThunks";
import { FcGoogle } from "react-icons/fc";

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
    <div className="fixed top-0 right-0 z-[101] min-h-screen max-h-screen max-w-[450px] w-full overflow-hidden overflow-y-auto p-5 bg-gradient-to-br from-[#12100e] to-[#2b4162] border-l border-gray-700 shadow-2xl text-white animate-slideIn max-md:max-w-full max-sm:max-w-full sm:w-full sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome to CodeEaseX
        </h2>
        <button
          onClick={toggleAuthen}
          className="text-white text-2xl cursor-pointer hover:text-red-400 transition-all duration-200 hover:rotate-90"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mt-15">
        <div className="text-center max-w-md w-full">
          <div className="flex justify-center mb-8 animate-bounce hover:animate-none transition-all duration-300 hover:scale-110">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] blur opacity-20 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
              <FcGoogle className="text-5xl relative z-10 transform transition-all duration-300 group-hover:rotate-[360deg]" />
              <div className="absolute inset-0 border-2 border-white/10 rounded-full pointer-events-none animate-pulse"></div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
            Continue with Google
          </h3>

          <p className="text-gray-400 mb-8">
            One-click access to your SecurePay AI dashboard. We'll never post
            without your permission.
          </p>

          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`}
            className="flex items-center justify-center w-full bg-white text-gray-800 hover:bg-gray-100 py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-95 border border-gray-200"
          >
            <FcGoogle className="text-[#4285F4] mr-3 text-xl" />
            <span className="font-medium">Sign in with Google</span>
          </a>

          <div className="mt-12 space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-500/10 p-1.5 rounded-full mr-3">
                <FaShieldAlt className="text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium">Secure Authentication</h4>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-500/10 p-1.5 rounded-full mr-3">
                <FaRocket className="text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium">Instant Access</h4>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-500/10 p-1.5 rounded-full mr-3">
                <FaUserLock className="text-green-400" />
              </div>
              <div>
                <h4 className="font-medium">Privacy Protected</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 text-center text-xs text-gray-500">
        By continuing, you agree to our{" "}
        <a
          href="/terms-and-conditions"
          className="text-blue-400 hover:underline"
        >
          Terms
        </a>{" "}
        and{" "}
        <a href="/privacy-policy" className="text-blue-400 hover:underline">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default Auth;
