import React from "react";

const VerifyEmailTemplate = () => {
  const packages = [
    { id: 1, name: "Pro Developer Plan", duration: "12 Months", price: "$99" },
  ];

  return (
    <div className="max-w-lg mx-auto p-5 text-gray-800 bg-gray-100 border border-gray-300 rounded-md">
      <div className="text-center">
        <img
          src="https://res.cloudinary.com/duozomapm/image/upload/v1740901356/codease_banner_1_hhgfvo.png"
          alt="CodeEase"
          className="w-full border border-white object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold">
          Package Activated Successfully
        </h2>
        <p className="my-3 text-lg">
          Congratulations! 🎉 Your CodeEase Package has been successfully
          activated. Now you have full access to our premium coding assistance,
          debugging tools, and premium features.
        </p>

        <h3 className="text-lg font-semibold mt-4">Package Details,</h3>
        <ul className="list-none">
          <li>
            <strong>Package ID:</strong> #CODE12345
          </li>
          <li>
            <strong>Activation Date:</strong> March 2, 2025
          </li>
          <li>
            <strong>Expiration Date:</strong> March 2, 2026
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-4">Your Purchased Package</h3>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">
                Package ID
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Package Name
              </th>
              <th className="border border-gray-300 p-2 text-left">Duration</th>
              <th className="border border-gray-300 p-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="bg-white">
                <td className="border border-gray-300 p-2">{pkg.id}</td>
                <td className="border border-gray-300 p-2">{pkg.name}</td>
                <td className="border border-gray-300 p-2">{pkg.duration}</td>
                <td className="border border-gray-300 p-2">{pkg.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <a
          href="https://www.npmjs.com/package/mern-launcher"
          className="inline-block mt-4 py-2 px-5 text-white bg-blue-500 rounded-md font-bold hover:bg-blue-600 transition"
        >
          Configure Your Package
        </a>

        <p className="mt-4">
          Thank you for choosing CodeEase to enhance your coding experience!
        </p>
        <p>Best Regards,</p>
        <p>Team CodeEase</p>

        <p className="mt-4">
          Need help?{" "}
          <a
            href="https://codeease.com/support"
            className="text-blue-600 underline"
          >
            Contact our support team.
          </a>
        </p>
      </div>

      <div className="p-3 text-sm text-gray-600 flex items-center flex-col">
        © 2025-2026 All rights reserved <br />
        <p>
          Designed and Developed by{" "}
          <span className="text-blue-500 font-bold underline cursor-pointer">
            Hruthik M
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailTemplate;
