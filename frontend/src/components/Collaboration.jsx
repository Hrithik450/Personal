import { check } from "../assets";
import { collabApps, collabContent } from "../constants";
import Button from "./Button";
import { HolographicEdge } from "./design/Hero";
import Section from "./Section";

const Collaboration = () => {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container relative z-10 py-20 lg:flex lg:items-center lg:gap-16">
        <div className="lg:flex-1 lg:max-w-[32rem]">
          <h2 className="text-5xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CodeEaseX - Revolutionize Your Development
          </h2>

          <p className="text-lg text-gray-300 mb-8 max-w-lg">
            Accelerate your workflow with our seamless integrations, intelligent
            automation, and optimized coding environments designed for modern
            developers.
          </p>

          <div className="space-y-6 mb-12">
            {collabContent.map((item) => (
              <div key={item.id} className="flex items-start group">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <img
                      src={check}
                      width={14}
                      height={14}
                      alt="check"
                      className="text-white"
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.text && (
                    <p className="mt-1 text-gray-400">{item.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/20">
            <a href="#features" className="flex items-center">
              Get Started Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </Button>
        </div>

        <div className="relative mt-16 lg:mt-0 lg:flex-1">
          <div className="relative w-full max-w-lg aspect-square mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-600/10 backdrop-blur-md border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 animate-float">
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500/5 to-purple-600/5 backdrop-blur-sm border border-cyan-500/20 animate-float-reverse">
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png"
                    width={80}
                    height={80}
                    alt="codeEaseX"
                    className="animate-pulse"
                  />
                </div>
              </div>
            </div>

            <div className="absolute inset-0">
              {collabApps.map((app, index) => {
                const angle = index * (360 / collabApps.length);
                const distance = 140;
                const x = Math.cos(angle * (Math.PI / 180)) * distance;
                const y = Math.sin(angle * (Math.PI / 180)) * distance;

                return (
                  <div
                    key={app.id}
                    className="absolute w-16 h-16 -ml-8 -mt-8 rounded-2xl bg-gray-900/80 border border-cyan-500/20 shadow-lg flex items-center justify-center transition-all duration-500 hover:scale-110 hover:bg-cyan-500/10 hover:border-cyan-500/40"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `rotate(${angle}deg) translateZ(0)`,
                    }}
                  >
                    <img
                      src={app.icon}
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      className="transition-transform duration-500 hover:scale-125"
                    />
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-10 pointer-events-none" />

      <HolographicEdge />
    </Section>
  );
};

export default Collaboration;
