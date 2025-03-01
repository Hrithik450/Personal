import React from "react";

const LandingPage = () => {
  return (
    <div>
      <head>
        <title>CodeEase - Simplifying Software Development</title>
        <meta
          name="description"
          content="CodeEase provides seamless authentication, secure credential management, and UI/UX optimization for developers."
        />
        <meta
          name="keywords"
          content="software development, authentication, UI/UX, MERN stack, credential management"
        />
        <meta
          property="og:title"
          content="CodeEase - Simplifying Software Development"
        />
        <meta
          property="og:description"
          content="Enhance your development workflow with CodeEase tools and automation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeease.com" />
        <meta property="og:image" content="/images/preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="CodeEase - Simplifying Software Development"
        />
        <meta
          name="twitter:description"
          content="Enhance your development workflow with CodeEase tools and automation."
        />
        <meta name="twitter:image" content="/images/preview.jpg" />
      </head>

      <section className="bg-gray-100 py-20 text-center">
        <h1 className="text-5xl font-bold">Welcome to CodeEase</h1>
        <p className="text-lg text-gray-700 mt-4">
          Simplifying Software Development for You
        </p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded-md mr-2"
          />
          <input
            type="text"
            placeholder="Phone"
            className="p-2 border rounded-md mr-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-md mr-2"
          />
          <button className="bg-purple-700 text-white px-6 py-2 rounded-md">
            Contact Us
          </button>
        </div>
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center my-20 px-6">
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold">About CodeEase</h2>
          <p className="text-gray-700 mt-4">
            At CodeEase, we simplify software development with seamless
            authentication, secure credential management, and optimized UI/UX
            design.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/images/about.jpg"
            alt="About CodeEase"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="text-center my-20">
        <h2 className="text-3xl font-bold">Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">UI/UX Optimization</h3>
            <p className="text-gray-600">
              Enhance user experience with professional UI/UX tools.
            </p>
          </div>
          <div className="p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Seamless Authentication</h3>
            <p className="text-gray-600">
              Integrate robust authentication mechanisms with ease.
            </p>
          </div>
          <div className="p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">
              Secure Credential Management
            </h3>
            <p className="text-gray-600">
              Ensure safe storage of user credentials.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center my-20">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <div className="mt-6">
          <p className="text-gray-700 italic">
            “CodeEase has been a game-changer for our team.”
          </p>
          <p className="font-semibold">- Jane Doe, Lead Developer</p>
        </div>
      </section>

      <section className="bg-gray-100 py-20 text-center">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="text-gray-700">
          New York, NY, USA | info@codeease.com | +123-456-7890
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="300"
          className="mt-6 rounded-lg"
        ></iframe>
      </section>
    </div>
  );
};

export default LandingPage;
