import ButtonGradient from "./assets/svg/ButtonGradient";
import Profile from "./components/Account";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import { useSearchParams } from "react-router-dom";
import Payment from "./components/Payment";
import Auth from "./components/Login";
import ForgetPassword from "./components/Forget-Reset";
import ResetPassword from "./components/ResetPassword";
import { useMemo } from "react";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const modalState = useMemo(
    () => ({
      isAccOpen: searchParams.get("account") === "open",
      isPayOpen: searchParams.get("payment") === "open",
      isForgetOpen: searchParams.get("forgetPassword") === "open",
      isAuthOpen: searchParams.get("authpage") === "open",
      isResetOpen: searchParams.get("resetPassword") === "open",
    }),
    [searchParams]
  );

  const toggleParam = (key) => {
    const newParams = new URLSearchParams(searchParams);

    if (newParams.get(key) === "open") {
      newParams.delete(key);
    } else {
      newParams.set(key, "open");
    }
    setSearchParams(newParams);
  };

  const toggleAuth = () => {
    if (modalState.isAuthOpen) {
      searchParams.delete("authpage");
      searchParams.delete("auth");
    } else {
      searchParams.set("authpage", "open");
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        {modalState.isForgetOpen && (
          <ForgetPassword toggleForget={() => toggleParam("forgetPassword")} />
        )}
        {modalState.isAuthOpen && (
          <Auth
            toggleAuthen={toggleAuth}
            toggleForget={() => toggleParam("forgetPassword")}
          />
        )}
        {modalState.isPayOpen && (
          <Payment togglePayment={() => toggleParam("payment")} />
        )}
        {modalState.isAccOpen && (
          <Profile toggleAccount={() => toggleParam("account")} />
        )}
        {modalState.isResetOpen && (
          <ResetPassword toggleReset={() => toggleParam("resetPassword")} />
        )}

        <Header
          toggleAccount={() => toggleParam("account")}
          toggleAuthen={() => toggleParam("authpage")}
        />
        <Hero />
        <Benefits />
        <Pricing />
        <Collaboration />
        <Services />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Home;
