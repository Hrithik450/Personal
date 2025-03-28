import { alertObject, benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { toast } from "react-toastify";

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Code Smarter, Not Harder with our Packages"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)`,
              }}
              key={item.id}
            >
              {item.upcoming && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black animate-pulse">
                    🚀 Coming Soon!
                  </span>
                </div>
              )}

              {item.upcoming && (
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
              )}

              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] bg-gradient-to-b from-gray-900/80 to-gray-900/30 backdrop-blur-sm">
                <h5 className="h5 mb-5 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-400 transition-colors duration-300">
                  {item.title}
                </h5>

                <div className="relative mb-6">
                  <img
                    className="max-h-[160px] w-full object-cover rounded-lg border border-gray-700 group-hover:border-purple-500 transition-all duration-300"
                    src={item.url}
                    alt=""
                  />
                  {item.upcoming && (
                    <div className="absolute inset-0 bg-purple-500/10 rounded-lg pointer-events-none" />
                  )}
                </div>

                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg my-2 border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex justify-between items-center bg-gray-800 px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.snippet);
                        toast.success("Copied!!", alertObject);
                      }}
                      className="text-gray-300 hover:text-white flex items-center text-sm bg-gray-700 hover:bg-purple-600 px-2 py-1 rounded transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-gray-100 font-mono text-sm bg-gray-900/50">
                    <code className="language-javascript">{item.snippet}</code>
                  </pre>
                </div>

                <p className="body-2 mb-6 text-gray-300 group-hover:text-white transition-colors duration-300">
                  {item.text}
                </p>

                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                    className="animate-bounce"
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    <a
                      href={item.redirect}
                      className="hover:text-blue-400 transition-colors duration-300 flex items-center"
                    >
                      View Docs
                      <Arrow className="ml-1 text-blue-400 hover:text-purple-500 transition-colors duration-300" />
                    </a>
                  </p>
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-20">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
