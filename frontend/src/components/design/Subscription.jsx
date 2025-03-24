import React, { Suspense } from "react";

const SubscriptionCard = ({
  subscription,
  expiryDate,
  price,
  onUpgrade,
  onRenew,
  expired,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1a2a6c] to-[#b21f1f] rounded-2xl p-8 text-white shadow-2xl mt-4 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">
        {subscription} Subscription
      </h3>

      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <span className="text-5xl font-bold bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent">
            {price}
          </span>
          <span className="text-sm text-gray-300 mt-2">
            {subscription !== "Basic" ? "Unlimited Usage" : "Limited Usage"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {subscription === "Premium" ? (
          <button
            onClick={onRenew}
            className="animate-bounce bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6f4f] hover:to-[#fea46b] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Renew
          </button>
        ) : (
          <button
            onClick={onUpgrade}
            className="animate-bounce bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff6f4f] hover:to-[#fea46b] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Upgrade
          </button>
        )}
        <div className="text-right">
          <span className="text-sm text-gray-300">
            {expired ? "" : "Expires at:"}
          </span>
          <span
            className={`font-medium text-${
              expired ? "lg" : "sm"
            } bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] bg-clip-text text-transparent`}
          >
            {expired ? "Expired" : expiryDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
