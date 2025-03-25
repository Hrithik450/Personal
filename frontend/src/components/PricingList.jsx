import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alertObject, pricing } from "../constants";
import { check } from "../assets";
import { useEffect, useState } from "react";
import { fetchprofile } from "../store/slices/auth/authThunks";
import { toast } from "react-toastify";

const PricingList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchprofile()).unwrap();
    };
    fetchData();
  }, [dispatch]);

  const Checkout = (subscription) => {
    const planName = subscription.split(" ")[0];
    const newParams = new URLSearchParams(searchParams);

    newParams.set("subscription", planName);
    newParams.set("payment", "open");

    setSearchParams(newParams);
  };

  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap justify-center">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full max-sm:px-4 px-6 py-10 bg-gradient-to-br from-[#2b4162] to-[#12100e] border-2 border-n-8 rounded-3xl lg:w-auto even:py-14 odd:py-10 odd:my-6 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <h4 className="h4 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {item.title}
          </h4>

          {item.price && (
            <div className="mb-6 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold text-center animate-pulse">
              🎉 Special Price Valid for 24 Hours Only! 🎉
            </div>
          )}

          <div className="flex items-center h-[5.5rem] mb-8">
            {item.price && (
              <>
                <div className="h3 text-white">$</div>
                <div className="text-[5.5rem] leading-none font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {item.price}
                  <span className="text-[3rem] text-gray-300">/mon</span>
                </div>
              </>
            )}
          </div>

          {item.originalPrice && (
            <div className="text-lg text-gray-400 line-through mb-4">
              Original Price: ${item.originalPrice}
            </div>
          )}

          {item.price && (
            <div className="animate-bounce text-lg text-green-400 font-semibold mb-6">
              Special Price: ${item.price} (Save $
              {item.originalPrice - item.price})
            </div>
          )}

          {item.title === "Basic Plan" ? (
            <button
              className="w-full mb-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              onClick={user?.freeTrial ? undefined : () => Checkout(item.title)}
            >
              {user?.freeTrial ? user?.freeTrial : "Choose Plan"}
            </button>
          ) : (
            <button
              className="w-full mb-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              onClick={() => Checkout(item.title)}
            >
              {item.title.split(" ")[0] === user?.subscription?.package
                ? "Active"
                : "Choose Plan"}
            </button>
          )}

          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <img
                  src={check}
                  width={24}
                  height={24}
                  alt="Check"
                  className="text-green-400"
                />
                <p className="body-2 ml-4 text-gray-300">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
