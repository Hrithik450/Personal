import { curve } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { HolographicEdge, QuantumOrbitParticles } from "./design/Hero";
import { useRef } from "react";
import HeadCard from "./design/HeadCard";

const Hero = () => {
  const item = {
    price: "3.5",
    originalPrice: "5",
    title: "Premium Plan",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    features: [
      "Valid for all packages",
      "You can use any package, anytime.",
      "Unlimited usage",
    ],
  };

  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[7rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div
        className="container relative grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center justify-center"
        ref={parallaxRef}
      >
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <HeadCard item={item} />
        </div>

        <div className="w-full text-center lg:text-left">
          <h1 className="h1 mb-6">
            Reduce Development Time Drastically with{" "}
            <span className="inline-block relative">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                CodeEaseX
              </span>
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2 animate-wave"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-xl mx-auto lg:mx-0 mb-6 text-n-2 lg:mb-8">
            CodeEaseX automates the entire development process with AI, making
            setup and coding effortless.
          </p>
          <Button
            href="#features"
            className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
          >
            Get started
          </Button>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[23rem] md:max-w-5xl xl:mb-24 pointer-events-none -z-10">
          <QuantumOrbitParticles />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
