import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import desktopHero1 from "../assets/hero-dekstop/1.png";
import desktopHero2 from "../assets/hero-dekstop/2.png";

import mobileHero1 from "../assets/hero-mobile/1.png";
import mobileHero2 from "../assets/hero-mobile/2.png";

const desktopSlides = [
  {
    id: 1,
    image: desktopHero1,
    alt: "Fresh Seafood For a Healthier You - Desktop 1",
  },
  {
    id: 2,
    image: desktopHero2,
    alt: "Ocean Fresh Seafood - Desktop 2",
  },
];

const mobileSlides = [
  {
    id: 1,
    image: mobileHero1,
    alt: "Fresh Seafood For a Healthier You - Mobile 1",
  },
  {
    id: 2,
    image: mobileHero2,
    alt: "Taste the Freshness - Mobile 2",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % desktopSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + desktopSlides.length) % desktopSlides.length);
  }, []);

  // Auto-slide every 5 seconds for both desktop & mobile carousels
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="relative w-full overflow-hidden bg-slate-50 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* DESKTOP HERO CAROUSEL (Visible on sm and up) */}
      <div className="hidden sm:block relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] max-h-[720px] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-${desktopSlides[current].id}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Link to="/products" className="block w-full h-full cursor-pointer relative">
              <img
                src={desktopSlides[current].image}
                alt={desktopSlides[current].alt}
                className="w-full h-full object-cover object-center transition-transform duration-700"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Desktop Prev Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/70 text-white border border-white/30 backdrop-blur-md transition-all duration-300 transform hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Desktop Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/30 hover:bg-black/70 text-white border border-white/30 backdrop-blur-md transition-all duration-300 transform hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Desktop Carousel Indicators / Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/40 px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md border border-white/20 shadow-md">
          {desktopSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                current === idx
                  ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-[#fddd15] shadow-md"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE HERO CAROUSEL (Visible on mobile screens) */}
      <div className="block sm:hidden w-full relative group min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${mobileSlides[current].id}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full"
          >
            <Link to="/products" className="block w-full cursor-pointer">
              <img
                src={mobileSlides[current].image}
                alt={mobileSlides[current].alt}
                className="w-full h-auto object-cover object-top shadow-sm"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Mobile Prev Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white border border-white/30 backdrop-blur-md shadow-md active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Mobile Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white border border-white/30 backdrop-blur-md shadow-md active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Mobile Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md">
          {mobileSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to mobile slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                current === idx
                  ? "w-6 h-2 bg-[#fddd15] shadow-md"
                  : "w-2 h-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
