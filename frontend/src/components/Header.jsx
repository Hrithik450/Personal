import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAcc } from "../store/slices/auth/authSlice";

const Header = ({ toggleAccount, toggleAuthen }) => {
  const dispatch = useDispatch();
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const auth = false;

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);

    toggleAccount();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
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
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 
                ${item.onlyMobile ? "lg:hidden" : ""} 
                px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold 
                ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } 
                lg:leading-5 lg:hover:text-n-1 xl:px-12 
                ${item.title === "Account" && !auth ? "hidden" : ""} 
                ${item.title === "Sign in" && auth ? "hidden" : ""}`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {auth && (
          <Button className="lg:flex hidden" onClick={toggleAccount}>
            Account
          </Button>
        )}

        {!auth && (
          <Button className="lg:flex hidden" onClick={toggleAuthen}>
            Sign in
          </Button>
        )}

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
