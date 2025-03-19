import React from "react";

const PlanConfirmationCard = ({ plan, price, validTill }) => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-2xl p-8 text-white shadow-2xl mt-8 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl my-4">
      <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Plan Details
      </h2>

      <div className="flex items-center mb-8">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-400 mr-4 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {plan} Plan
          </h3>
          <p className="text-4xl font-bold mt-2">{price}</p>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <p className="text-sm text-gray-400 mb-2">Valid Till:</p>
        <p className="text-xl font-medium bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          {validTill}
        </p>
      </div>
    </div>
  );
};

export default PlanConfirmationCard;
