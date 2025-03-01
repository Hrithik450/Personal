import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home.jsx";
import NotFound from "../pages/NotFound/notFound.jsx";
import PaymentPage from "../pages/Payment/payment.jsx";
import { ToastContainer } from "react-toastify";
import LandingPage from "../pages/LandingPage/landingPage.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/payment/:uuid" element={<PaymentPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default AppRoutes;
