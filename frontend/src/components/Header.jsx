import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ toggleAccount, toggleAuthen }) => {
  const dispatch = useDispatch();
  const pathname = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const auth = localStorage.getItem("isAuthenticated") === "true";

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = (url) => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);

    if (url.startsWith("/?")) {
      navigate(url, { replace: true });
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:backdrop-blur-sm ${
        openNavigation ? "" : "backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img
            src="https://res.cloudinary.com/duozomapm/image/upload/v1742360772/Screenshot_2025-03-19_104809-removebg-preview_yxez2b.png"
            width={190}
            height={40}
            alt="CodeEaseX"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8/95 backdrop-blur-sm lg:static lg:flex lg:mx-auto lg:bg-transparent lg:backdrop-blur-0 transition-all duration-300 ease-in-out`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row gap-1 lg:gap-0">
            {navigation.map((item) =>
              item.url.startsWith("/?") ? (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.url)}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-all duration-200 hover:text-color-1 
            ${item.onlyMobile ? "lg:hidden" : ""} 
            px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold 
            ${
              item.url === pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/70"
            } 
            lg:leading-5 lg:hover:text-n-1 xl:px-12 
            ${item.title === "Account" && !auth ? "hidden" : ""} 
            ${item.title === "Sign in" && auth ? "hidden" : ""}
            hover:scale-105 active:scale-95
            before:content-[''] before:absolute before:bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-0.5 before:bg-color-1 before:opacity-0 before:transition-all before:duration-200
            hover:before:w-4 hover:before:opacity-100
            ${
              item.url === pathname.hash ? "before:w-4 before:opacity-100" : ""
            }`}
                >
                  {item.title}
                </button>
              ) : (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={handleClick}
                  className={`block relative font-code text-2xl uppercase text-n-1 transition-all duration-200 hover:text-color-1 
            ${item.onlyMobile ? "lg:hidden" : ""} 
            px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold 
            ${
              item.url === pathname.hash ? "z-2 lg:text-n-1" : "lg:text-n-1/70"
            } 
            lg:leading-5 lg:hover:text-n-1 xl:px-12 
            ${item.title === "Account" && !auth ? "hidden" : ""} 
            ${item.title === "Sign in" && auth ? "hidden" : ""}
            hover:scale-105 active:scale-95
            before:content-[''] before:absolute before:bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-0.5 before:bg-color-1 before:opacity-0 before:transition-all before:duration-200
            hover:before:w-4 hover:before:opacity-100
            ${
              item.url === pathname.hash ? "before:w-4 before:opacity-100" : ""
            }`}
                >
                  {item.title}
                </a>
              )
            )}
          </div>

          <HamburgerMenu />
        </nav>

        {auth && (
          <button
            className="lg:flex hidden items-center justify-center relative overflow-hidden group px-6 py-3 rounded-lg"
            onClick={toggleAccount}
          >
            <span className="relative z-10 flex items-center gap-2 font-medium text-n-1 group-hover:text-color-1 transition-colors duration-300">
              Account
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:translate-x-1 group-hover:stroke-color-1"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>

            <span className="absolute inset-0 bg-n-6/50 rounded-lg transition-all duration-500 group-hover:bg-n-6/70"></span>

            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-1/10 to-transparent rounded-lg"></span>
            </span>

            <span className="absolute inset-0 border border-n-4/30 rounded-lg group-hover:border-color-1/50 transition-all duration-500"></span>

            <span className="absolute inset-0 rounded-lg scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
              <span className="absolute top-0 left-0 w-full h-full border-2 border-color-1/20 rounded-lg animate-pulse"></span>
            </span>
          </button>
        )}

        {!auth && (
          <button
            className="lg:flex hidden items-center justify-center relative overflow-hidden group px-6 py-3 rounded-lg"
            onClick={toggleAuthen}
          >
            <span className="relative z-10 flex items-center gap-2 font-medium text-n-8 group-hover:text-n-1 transition-colors duration-300">
              Sign in
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:translate-x-1 group-hover:stroke-n-1"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
              </svg>
            </span>

            {/* Gradient background with hover effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-color-1 to-color-1/90 rounded-lg group-hover:from-color-1/90 group-hover:to-color-1 transition-all duration-500"></span>

            {/* Glow effect */}
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-color-1/20 to-transparent rounded-lg"></span>
            </span>

            <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-300"></span>

            <span className="absolute inset-0 border-2 border-color-1/50 rounded-lg group-hover:border-color-1 transition-all duration-500"></span>

            <span className="absolute inset-0 rounded-lg shadow-md group-hover:shadow-lg group-hover:shadow-color-1/30 transition-all duration-300"></span>
          </button>
        )}

        <button
          className="ml-auto lg:hidden relative group p-3 -mr-3 focus:outline-none"
          onClick={toggleNavigation}
          aria-label="Toggle menu"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <MenuSvg openNavigation={openNavigation} />

            <span
              className={`absolute inset-0 rounded-full bg-n-1/5 scale-0 group-hover:scale-100 transition-transform duration-300 ${
                openNavigation ? "scale-100" : ""
              }`}
            ></span>

            {openNavigation && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-color-1 rounded-full animate-ping opacity-75"></span>
            )}
          </div>

          <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 group-active:opacity-50 bg-color-1 transition-opacity duration-500 pointer-events-none"></span>
        </button>
      </div>
    </div>
  );
};

export default Header;
