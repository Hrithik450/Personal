import React from "react";
import { useParams } from "react-router-dom";

const TermsAndConditions = () => {
  const { uuid, packageName } = useParams();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Terms And Conditions</h1>
        <a
          href={`/feedback/${packageName}/${uuid}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </a>
      </div>
      <p className="italic mt-2 text-black">Last updated on: 02-03-2025</p>

      <Section title="1. Agreement to Terms">
        By accessing or using the CodeEase platform or purchasing any services
        from us, you agree to be bound by these Terms & Conditions. If you do
        not agree to these terms, you may not access or use the site or
        services.
      </Section>

      <Section title="2. Services Information">
        We strive to provide accurate descriptions of our services. However, we
        reserve the right to modify or discontinue services at any time without
        notice.
      </Section>

      <Section title="3. Ordering">
        Orders can be placed online through our website. We reserve the right to
        refuse or cancel any order due to service availability, errors, or
        suspected fraudulent activity.
      </Section>

      <Section title="4. Payment">
        We accept secure payment methods, including Razorpay. Prices are in INR
        and are exclusive of applicable taxes. Full payment must be received
        before processing.
      </Section>

      <Section title="5. Refunds & Cancellations">
        Refund requests can be made within 2 days of service purchase. Refunds
        are subject to review and approval.
      </Section>

      <Section title="6. Privacy">
        Your personal information is collected and used in accordance with our
        Privacy Policy. By using our platform, you consent to the data usage as
        described.
      </Section>

      <Section title="7. Intellectual Property">
        All content on CodeEase, including text, images, and branding, is
        protected by intellectual property laws. Unauthorized use is prohibited.
      </Section>

      <Section title="8. Limitation of Liability">
        We are not liable for any indirect or consequential damages arising from
        the use of our services. Our total liability is limited to the amount
        paid for the service.
      </Section>

      <Section title="9. Governing Law">
        These Terms & Conditions are governed by and construed in accordance
        with the laws of India.
      </Section>

      <Section title="10. Changes to Terms & Conditions">
        We reserve the right to modify these Terms & Conditions at any time.
        Updated terms will be effective upon posting.
      </Section>

      <Section title="11. Contact Us">
        For any questions, contact us at codeeasepackages@gmail.com or
        +91-7483229386.
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
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <p className="text-gray-600 mt-2">{children}</p>
  </div>
);

export default TermsAndConditions;
