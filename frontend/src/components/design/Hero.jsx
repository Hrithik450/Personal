import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

export const QuantumDivider = () => {
  return (
    <div className="relative z-10 w-full h-16 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/70 to-transparent opacity-80 animate-wave" />

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-teal-400/0 via-teal-400/90 to-teal-400/0 blur-sm" />

      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 h-1 w-1 rounded-full bg-teal-400/80 animate-float"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export const HolographicEdge = () => {
  return (
    <div className="relative w-full h-px">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

      <div className="absolute top-0 left-0 right-0 h-px bg-teal-400/20 animate-pulse-slow" />

      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-500/80 shadow-lg shadow-teal-500/30">
        <div className="absolute inset-0 rounded-full border border-teal-300/50 animate-ping-slow" />
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500/80 shadow-lg shadow-purple-500/30">
        <div className="absolute inset-0 rounded-full border border-purple-300/50 animate-ping-slow" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-0.5 w-0.5 rounded-full bg-white animate-drift"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const QuantumOrbitParticles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[40rem] left-1/2 w-[80rem] aspect-square -translate-x-1/2 md:-top-[36rem] xl:-top-[30rem] pointer-events-none">
      {/* Base orbit ring with gradient */}
      <div className="absolute inset-0 border border-n-1/10 rounded-full opacity-30">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-teal-500/10 via-purple-500/5 to-transparent" />
      </div>

      {/* Animated particles */}
      <MouseParallax strength={0.05} parallaxContainerRef={parallaxRef}>
        {/* Central glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-64 h-64 rounded-full bg-teal-400/10 blur-3xl transition-opacity duration-1000 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Particle system */}
        {[...Array(12)].map((_, i) => {
          const angle = i * (360 / 12) * (Math.PI / 180);
          const distance = 380;
          const size = 4 + (i % 3);
          const delay = i * 100;
          const colorClass =
            i % 3 === 0
              ? "from-teal-400 to-emerald-900"
              : i % 3 === 1
              ? "from-purple-400 to-indigo-900"
              : "from-cyan-400 to-blue-900";

          return (
            <div
              key={i}
              className={`absolute top-1/2 left-1/2 origin-center transition-all duration-1000 ease-out ${
                mounted ? "opacity-100" : "opacity-0 translate-y-10"
              }`}
              style={{
                transform: mounted
                  ? `rotate(${angle}rad) translate(${distance}px) rotate(-${angle}rad)`
                  : "none",
                transitionDelay: `${delay}ms`,
              }}
            >
              <div
                className={`w-${size} h-${size} rounded-full bg-gradient-to-b ${colorClass} shadow-lg shadow-cyan-500/20`}
              />
            </div>
          );
        })}

        {/* Floating micro particles */}
        {[...Array(24)].map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 180 + Math.random() * 200;
          const size = 1 + Math.random() * 2;
          const delay = Math.random() * 500;
          const duration = 3000 + Math.random() * 4000;
          const color = `rgba(${Math.floor(
            100 + Math.random() * 155
          )}, ${Math.floor(200 + Math.random() * 55)}, 255, 0.8)`;

          return (
            <div
              key={`micro-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                transform: `rotate(${angle}rad) translate(${distance}px) rotate(-${angle}rad)`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animation: mounted
                  ? `float ${duration}ms infinite ${delay}ms ease-in-out`
                  : "none",
                opacity: mounted ? 0.8 : 0,
              }}
            />
          );
        })}
      </MouseParallax>

      {/* Pulsing rings */}
      <div
        className={`absolute inset-0 rounded-full border border-teal-400/10 transition-all duration-1000 ${
          mounted ? "scale-100 opacity-30" : "scale-90 opacity-0"
        }`}
      />
      <div
        className={`absolute inset-8 rounded-full border border-purple-400/10 transition-all duration-1000 delay-200 ${
          mounted ? "scale-100 opacity-30" : "scale-90 opacity-0"
        }`}
      />
    </div>
  );
};
