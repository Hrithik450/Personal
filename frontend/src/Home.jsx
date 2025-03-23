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
import { useEffect, useMemo } from "react";
import useCheckTokenExpiry from "./hooks/token";
import CryptoPayment from "./components/Crypto";
import CryptoQr from "./components/CryptoQr";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useCheckTokenExpiry();

  const modalState = useMemo(
    () => ({
      isAccOpen: searchParams.get("account") === "open",
      isPayOpen: searchParams.get("payment") === "open",
      isForgetOpen: searchParams.get("forgetPassword") === "open",
      isAuthOpen: searchParams.get("authpage") === "open",
      isResetOpen: searchParams.get("resetPassword") === "open",
      isCryptoOpen: searchParams.get("cryptoPay") === "open",
      isCryptoPay: searchParams.get("cryptoPayOpen") === "open",
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
        {modalState.isCryptoPay && (
          <CryptoQr toggleCrypto={() => toggleParam("cryptoPayOpen")} />
        )}
        {modalState.isCryptoOpen && (
          <CryptoPayment toggleCrypto={() => toggleParam("cryptoPay")} />
        )}
        {modalState.isForgetOpen && (
          <ForgetPassword toggleForget={() => toggleParam("forgetPassword")} />
        )}
        {modalState.isAuthOpen && (
          <Auth
            toggleAuthen={toggleAuth}
            toggleForget={() => toggleParam("forgetPassword")}
          />
        )}
        {modalState.isPayOpen && <Payment />}
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
