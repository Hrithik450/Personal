import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home.jsx";
import NotFound from "../pages/NotFound/notFound.jsx";
import PaymentPage from "../pages/Payment/payment.jsx";
import { ToastContainer } from "react-toastify";
import TermsAndConditions from "../pages/Docs/TermsAndCond.jsx";
import PrivacyPolicy from "../pages/Docs/PrivacyPolicy.jsx";
import RefundPolicy from "../pages/Docs/RefundPolicy.jsx";
import ContactUs from "../pages/Docs/ContactUs.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/payment/:packageName/:uuid" element={<PaymentPage />} />
        <Route
          path="/terms-and-conditions/:packageName/:uuid"
          element={<TermsAndConditions />}
        />
        <Route
          path="/privacy-policy/:packageName/:uuid"
          element={<PrivacyPolicy />}
        />
        <Route
          path="/refund-policy/:packageName/:uuid"
          element={<RefundPolicy />}
        />
        <Route path="/support" element={<ContactUs />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default AppRoutes;
