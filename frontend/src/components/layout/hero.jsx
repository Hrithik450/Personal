import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../common/button";

const Hero = () => {
  return (
    <section className="realtive border-2 border-amber-400 pt-60 pb-40 max-lg:pt-52 max-lg:pd-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Automate Your Development
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:h2 max-lg:mb-7 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              CodeEaseX
            </h1>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
