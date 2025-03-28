import React from "react";
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section className="!px-0 !py-12 backdrop-blur-sm" id="support">
      <div className="container">
        <div className="flex sm:justify-between justify-center items-center max-sm:gap-6 sm:gap-10 max-sm:flex-col">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png"
              width={32}
              height={32}
              alt="CodeEaseX"
              className="w-8 h-8"
            />
            <p className="caption text-n-3/80 hover:text-n-1 transition-colors duration-300">
              © {new Date().getFullYear()} CodeEaseX. All rights reserved.
            </p>
          </div>

          <ul className="flex gap-4 flex-wrap justify-center">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-all duration-300 hover:bg-primary-1/20 hover:scale-110 group"
                  aria-label={item.title}
                >
                  <img
                    src={item.iconUrl}
                    width={16}
                    height={16}
                    alt=""
                    className="group-hover:brightness-200 transition-all duration-300"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-8 border-t border-n-6/50">
          <ul className="flex flex-wrap justify-center gap-8 max-sm:gap-6">
            <li>
              <a
                href="/terms-and-conditions"
                className="text-n-3/80 hover:text-n-1 transition-all duration-300 flex items-center group"
              >
                Terms And Conditions
                <svg
                  className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-n-3/80 hover:text-n-1 transition-all duration-300 flex items-center group"
              >
                Privacy Policy
                <svg
                  className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/refund-policy"
                className="text-n-3/80 hover:text-n-1 transition-all duration-300 flex items-center group"
              >
                Refunds And Cancellations
                <svg
                  className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="text-n-3/80 hover:text-n-1 transition-all duration-300 flex items-center group"
              >
                Contact Us
                <svg
                  className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-n-4 hover:text-n-1 transition-colors duration-300 flex items-center justify-center mx-auto gap-1"
            aria-label="Back to top"
          >
            Back to top
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
