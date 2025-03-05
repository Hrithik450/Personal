import React from "react";
import { useParams } from "react-router-dom";

const RefundPolicy = () => {
  const { uuid, packageName } = useParams();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-black">
          Refund and Cancellation Policy
        </h1>
        <a
          href={`/feedback/${packageName}/${uuid}`}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Back
        </a>
      </div>
      <p className="italic mb-6 text-black">Last updated on: 02-03-2025</p>

      <Section title="1. Order Cancellation">
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>
            Cancellations are only allowed before the download or license key is
            issued.
          </li>
          <li>
            Once a package has been accessed, downloaded, or a license key has
            been issued, cancellations are not permitted.
          </li>
        </ul>
      </Section>

      <Section title="2. Refund Policy">
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>
            Due to the nature of digital products, refunds are only granted in
            cases of duplicate purchases or technical issues that prevent usage.
          </li>
          <li>Refund requests must be submitted within 7 days of purchase.</li>
          <li>
            Refunds will be processed within 5-7 business days upon approval.
          </li>
        </ul>
      </Section>

      <Section title="3. Non-Refundable Items">
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>Downloaded or activated packages are non-refundable.</li>
          <li>
            Custom-built solutions or modifications to existing packages are not
            eligible for refunds.
          </li>
        </ul>
      </Section>

      <Section title="4. Support & Issue Resolution">
        <ul className="list-disc pl-6 space-y-2 text-black">
          <li>
            If you experience technical difficulties with our packages, please
            contact support before requesting a refund.
          </li>
          <li>
            We offer bug fixes and technical assistance to ensure product
            functionality.
          </li>
        </ul>
      </Section>

      <Section title="5. Contact Us">
        <p className="text-black">
          For any refund or cancellation inquiries, reach out to us at{" "}
          <strong>codeeasepackages@gmail.com</strong>.
        </p>
      </Section>

      <footer className="text-center text-sm text-gray-600 mt-6">
        Thank you for using CodeEase. For support, contact us at
        <strong> codeeasepackages@gmail.com</strong>.
        <br /> Copyright © 2025 CodeEase. All Rights Reserved.
      </footer>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    {children}
  </div>
);

export default RefundPolicy;
