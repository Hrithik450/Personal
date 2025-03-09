import React from "react";

const Home = () => {
  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-700">
      <h2 className="text-3xl font-bold text-center mb-4">
        Thanks For Choosing CodeEase Packages
      </h2>
      <p className="text-center max-w-2xl">
        We provide ready-to-use development packages that simplify coding and
        enhance efficiency. From authentication to payment integrations, we make
        development faster and hassle-free.
      </p>

      <div className="relative w-full max-w-3xl mt-10 text-center">
        <div className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-md inline-block">
          Explore Our Premium Packages
        </div>

        <div className="grid grid-cols-3 gap-10 mt-10">
          {[
            {
              title: "Built-in Authentication",
              code: "npx secure-auth@1.0.0",
              img: "https://res.cloudinary.com/duozomapm/image/upload/v1740422740/package1-image_ds0gme.jpg",
              description: "Pre-configured login with JWT & OAuth support.",
            },
            {
              title: "Payment Gateway",
              code: "npx quickpay@1.0.0",
              img: "https://res.cloudinary.com/duozomapm/image/upload/v1740422740/Screenshot_2025-02-25_002520_rssieh.png",
              description: "Seamless Stripe, PayPal & Razorpay integration.",
            },
            {
              title: "Error Simplifier",
              code: "npx error-ease@1.0.0",
              img: "https://res.cloudinary.com/duozomapm/image/upload/v1740422740/package-3image_yofjxj.jpg",
              description: "Automatic error handling & user-friendly messages.",
            },
          ].map((pkg, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white shadow-md p-4 rounded-lg w-60">
                <h2 className="text-lg font-bold">{pkg.title}</h2>
                <img
                  src={pkg.img}
                  alt=""
                  className="h-32 w-full object-cover rounded"
                />
                <h2 className="text-gray-600 text-sm bg-gray-200 px-2 py-1 rounded font-mono mt-2">
                  <code>{pkg.code}</code>
                </h2>
                <p className="text-gray-800 text-sm mt-2">{pkg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
