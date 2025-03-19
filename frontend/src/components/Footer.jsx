import React from "react";
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10" id="support">
      <div className="container flex sm:justify-between justify-center items-center max-sm:gap-5 sm:gap-10 max-sm:flex-col">
        <p className="caption text-n-4 lg:block">
          CodeEaseX © {new Date().getFullYear()}. All rights reserved.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
            >
              <img src={item.iconUrl} width={16} height={16} alt={item.title} />
            </a>
          ))}
        </ul>
      </div>
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <ul className="flex justify-between w-full mt-4 max-sm:flex-col max-sm:px-10">
          <li className="text-n-4">
            <a href="/terms-and-conditions">Terms And Conditions</a>
          </li>
          <li className="text-n-4 max-sm:mt-2">
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li className="text-n-4 max-sm:mt-2">
            <a href="/refund-policy">Refunds And Cancellations</a>
          </li>
          <li className="text-n-4 max-sm:mt-2">
            <a href="/contact-us">Contact Us</a>
          </li>
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
