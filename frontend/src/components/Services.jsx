import Section from "./Section";
import Heading from "./Heading";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState } from "react";

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      role: "Senior Full-Stack Dev @TechCo",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "This package manager saved me 15 hours last week alone! The pre-configured templates eliminated our onboarding time completely.",
      rating: 5,
    },
    {
      id: 2,
      name: "Alex K.",
      role: "CTO @StartupXYZ",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "Mern Launcher saved me hours of work every week! The automation features handle the heavy lifting, letting me focus on growing my business.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya M.",
      role: "Lead DevOps @EnterpriseCorp",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "Deployment times reduced from 2 hours to 15 minutes. Our CI/CD pipeline has never been smoother.",
      rating: 5,
    },
  ];

  const scrollToTestimonial = (index) => {
    const carousel = carouselRef.current;
    const testimonial = carousel.children[index];
    testimonial.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToTestimonial(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    scrollToTestimonial(newIndex);
  };

  return (
    <Section id="testimonals" className="relative overflow-hidden py-20">
      <div className="absolute -top-1/4 left-0 w-full h-[150%] inset-0 pointer-events-none" />

      <div className="container relative z-10">
        <Heading
          title="Growing with Thousands of Developers "
          text="See how we're revolutionizing workflows"
          className="text-center mb-16"
        />

        <div className="relative py-2">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory space-x-6 md:px-4 h-full items-center"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 md:px-4 snap-center"
              >
                <div className="relative group h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-md group-hover:opacity-30 transition-all duration-500" />

                  <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 overflow-hidden group-hover:border-blue-400/50 transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300" />
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="relative w-14 h-14 rounded-full border-2 border-blue-400/50 group-hover:border-blue-400 transition-all z-10"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-white text-lg group-hover:text-blue-300 transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <div className="absolute -left-4 text-6xl opacity-10 text-blue-400 top-0">
                        "
                      </div>
                      <p className="text-gray-300 italic pl-6 pr-2 group-hover:text-white transition-colors duration-300 line-clamp-3">
                        {testimonial.quote}
                      </p>
                      <div className="absolute -right-2 text-6xl opacity-10 text-purple-400 bottom-0">
                        "
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-200"
                        />
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs border border-blue-500/20">
                        React
                      </span>
                      <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs border border-purple-500/20">
                        Node.js
                      </span>
                      <span className="px-2 py-1 bg-pink-900/30 text-pink-300 rounded-full text-xs border border-pink-500/20">
                        TypeScript
                      </span>
                    </div>

                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-blue-400/20 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-purple-400/20 rounded-bl-2xl" />

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-10 gap-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-400 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <div className="relative">
                <FaChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                <FaChevronLeft className="w-5 h-5 text-blue-400 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow transition-opacity" />
              </div>
            </button>

            <div className="flex items-center gap-2 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToTestimonial(index)}
                  className={`relative p-1 rounded-full transition-all ${
                    currentIndex === index ? "scale-125" : "scale-100"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentIndex === index
                        ? "bg-gradient-to-r from-blue-400 to-purple-500"
                        : "bg-gray-600"
                    }`}
                  />
                  {currentIndex === index && (
                    <div className="absolute -inset-1 border border-blue-400/30 rounded-full animate-pulse pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-400 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <div className="relative">
                <FaChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                <FaChevronRight className="w-5 h-5 text-blue-400 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow transition-opacity" />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-10 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              10K+
            </div>
            <p className="text-gray-400">AMV</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              4.9/5
            </div>
            <p className="text-gray-400">Customer Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              50+
            </div>
            <p className="text-gray-400">Upcoming Packages</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              99.9%
            </div>
            <p className="text-gray-400">Uptime Guarantee</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6 opacity-80">
          {["React", "NextJS", "Node", "Python", "Docker", "Kubernetes"].map(
            (tech) => (
              <div
                key={tech}
                className="bg-gray-800/50 hover:bg-gray-800/80 px-6 py-3 rounded-full border border-gray-700 transition-all hover:scale-110"
              >
                <span className="text-gray-300 font-mono">{tech}</span>
              </div>
            )
          )}
        </div>
      </div>
    </Section>
  );
};

export default Services;
