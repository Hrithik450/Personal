export const CosmicRings = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-[65rem] aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        className="absolute top-1/2 left-1/2 w-full aspect-square border border-transparent rounded-full -translate-x-1/2 -translate-y-1/2 
      before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-opacity-10 before:border-n-2 
      before:animate-[spin_20s_linear_infinite]"
      >
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-color-1 rounded-full -translate-x-1/2 transform shadow-glow shadow-color-1/50"></div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 w-[75%] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 
      before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-opacity-15 before:border-n-1 
      before:animate-[pulse_8s_ease-in-out_infinite]"
      >
        <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-color-1 rounded-full -translate-y-1/2 transform shadow-glow shadow-color-1/60"></div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 w-[50%] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 
      before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-opacity-20 before:border-n-1 
      before:animate-[glow_12s_ease-in-out_infinite]"
      >
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-color-1 rounded-full -translate-x-1/2 transform shadow-glow shadow-color-1/70"></div>
      </div>
    </div>
  );
};

export const NeonGuidelines = () => {
  return (
    <>
      <div
        className="absolute top-0 left-10 w-0.5 h-full bg-gradient-to-b from-transparent via-color-1/60 to-transparent 
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-8 before:bg-gradient-to-b before:from-color-1 before:to-transparent 
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-8 after:bg-gradient-to-t after:from-color-1 after:to-transparent 
      animate-pulse-slow"
      ></div>
      <div
        className="absolute top-0 right-10 w-0.5 h-full bg-gradient-to-b from-transparent via-color-1/40 to-transparent 
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-12 before:bg-gradient-to-b before:from-color-1 before:to-transparent 
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-12 after:bg-gradient-to-t after:from-color-1 after:to-transparent 
      animate-pulse-slow animation-delay-2000"
      ></div>
    </>
  );
};

export const FloatingOrbs = () => {
  return (
    <>
      <div
        className="absolute top-[15%] left-[15%] w-4 h-4 bg-gradient-to-br from-[#FF4D4D] to-[#F9CB28] rounded-full 
      shadow-glow shadow-[#FF4D4D]/50 animate-float-1"
      ></div>

      <div
        className="absolute top-[25%] right-[20%] w-3 h-3 bg-gradient-to-br from-[#4D79FF] to-[#1A1A32] rounded-full 
      shadow-glow shadow-[#4D79FF]/50 animate-float-2"
      ></div>

      <div
        className="absolute bottom-[20%] left-[20%] w-5 h-5 bg-gradient-to-br from-[#88E5BE] to-[#1A1A32] rounded-full 
      shadow-glow shadow-[#88E5BE]/50 animate-float-3"
      ></div>

      <div
        className="absolute bottom-[15%] right-[15%] w-3.5 h-3.5 bg-gradient-to-br from-[#B9AEDF] to-[#1A1A32] rounded-full 
      shadow-glow shadow-[#B9AEDF]/50 animate-float-4"
      ></div>
    </>
  );
};

export const HamburgerMenu = () => {
  return (
    <div className="absolute inset-0 pointer-events-none lg:hidden overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A32] to-[#0D0D1A]"></div>
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
        </div>
      </div>

      <CosmicRings />
      <NeonGuidelines />
      <FloatingOrbs />

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-color-1 rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${
                3 + Math.random() * 7
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
