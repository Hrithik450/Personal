import React from "react";
import { useParams } from "react-router-dom";

const PrivacyPolicy = () => {
  const { uuid, packageName } = useParams();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Privacy Policy</h1>
        <a
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back
        </a>
      </div>
      <p className="italic mb-6 text-black">Last updated on: 02-03-2025</p>

      <h2 className="text-2xl font-semibold mt-6">1. Introduction</h2>
      <p className="mt-2">
        At CodeEaseX, we respect your privacy and are committed to protecting
        your personal information. This Privacy Policy outlines how we collect,
        use, disclose, and safeguard your information when you visit our website
        or use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6">2. Information We Collect</h2>
      <h3 className="text-xl font-medium mt-4">A. Personal Information</h3>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Name</li>
        <li>Email address</li>
        <li>Payment information (secured through third-party providers)</li>
      </ul>

      <h3 className="text-xl font-medium mt-4">B. Non-Personal Information</h3>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device information</li>
        <li>Website usage data</li>
        <li>Cookies and tracking technologies</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">
        3. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>To provide and improve our services</li>
        <li>To process transactions</li>
        <li>To communicate with you</li>
        <li>To ensure security and prevent fraud</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">4. Data Security</h2>
      <p className="mt-2">
        We use industry-standard measures to protect your data but cannot
        guarantee absolute security. You acknowledge that you provide your
        information at your own risk.
      </p>

      <h2 className="text-2xl font-semibold mt-6">5. Your Rights & Choices</h2>
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Access and update your data</li>
        <li>Opt-out of marketing emails</li>
        <li>Request data deletion</li>
      </ul>
      <p className="mt-2">
        To exercise these rights, contact us at{" "}
        <strong>codeeasepackages@gmail.com</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-6">6. Changes to This Policy</h2>
      <p className="mt-2">
        We may update this Privacy Policy from time to time. Please review it
        periodically for any changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6">7. Contact Information</h2>
      <p className="mt-2">For any questions, contact us at:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Email: codeeasepackages@gmail.com</li>
        <li>Phone: +91-7483229386.</li>
        <li>Address: Bangalore, Karnataka</li>
      </ul>

      <footer className="text-center text-sm text-gray-600 mt-6">
        Thank you for using CodeEaseX. For support, contact us at
        <strong> codeeasepackages@gmail.com</strong>.
        <br /> Copyright © 2025 CodeEaseX. All Rights Reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
