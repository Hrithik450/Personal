import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">Contact Us</h1>
        <a
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Back
        </a>
      </div>
      <p className="italic mb-6 text-black">Last updated on: 02-03-2025</p>

      <h2 className="text-xl font-semibold text-gray-700">Get in Touch</h2>
      <p className="text-gray-600 mb-4">
        We’d love to hear from you! If you have any questions, concerns, or
        feedback, feel free to reach out to us.
      </p>

      <h2 className="text-xl font-semibold text-gray-700">
        Contact Information
      </h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Email: codeeasepackages@gmail.com</li>
        <li>Phone: +91-7483229386</li>
        <li>Address: Bangalore, Karnataka</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700">Business Hours</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Monday - Friday: 9:00 AM - 6:00 PM (IST)</li>
        <li>Saturday: 10:00 AM - 4:00 PM (IST)</li>
        <li>Sunday: Closed</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700">Customer Support</h2>
      <p className="text-gray-600 mb-4">
        For package-related inquiries, or refunds, please visit our Help Center
        or email us directly.
      </p>

      <h2 className="text-xl font-semibold text-gray-700">Follow Us</h2>
      <ul className="list-disc list-inside text-blue-500 mb-4">
        <li>
          <a
            href="https://www.instagram.com/anoxfashion"
            className="hover:underline"
          >
            Instagram
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/hruthik-m"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com/@mhrithik450"
            className="hover:underline"
          >
            YouTube
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/share/15Qw2rcR8o"
            className="hover:underline"
          >
            Facebook
          </a>
        </li>
      </ul>

      <p className="text-gray-600 mb-4">
        Stay connected with us on social media for the latest updates, offers,
        and new arrivals. We look forward to assisting you!
      </p>

      <footer className="text-center text-sm text-gray-600 mt-6">
        Thank you for using CodeEaseX. For support, contact us at
        <strong> codeeasepackages@gmail.com</strong>.
        <br /> Copyright © 2025 CodeEaseX. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ContactUs;
