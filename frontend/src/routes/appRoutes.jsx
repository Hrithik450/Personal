import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "../Docs/ContactUs";
import Home from "../Home";
import RefundPolicy from "../Docs/RefundPolicy";
import PrivacyPolicy from "../Docs/PrivacyPolicy";
import TermsAndConditions from "../Docs/TermsAndCond";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default AppRoutes;
