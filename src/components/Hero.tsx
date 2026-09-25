import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    image: "/hero-seafood-1.jpg",
    badge: "100% Fresh & Hygienically Cleaned",
    title: "Fresh Salmon, Crabs & Sea Catch",
    subtext: "Visakhapatnam’s finest daily catch. Premium salmon, crabs, oysters & sea bass delivered fresh to your doorstep.",
  },
  {
    image: "/hero-seafood-3.jpg",
    badge: "Direct From Ocean To Table",
    title: "Premium Red Snappers, Octopus & Lobsters",
    subtext: "Sustainably caught, hand-selected ocean delicacies packed with natural freshness.",
  },
  {
    image: "/hero-seafood-2.jpg",
    badge: "Ice-Packed Fresh Cuts",
    title: "Fresh Fillets, Prawns & Shellfish",
    subtext: "Hygienically cut, cleaned, and vacuum-packed to retain peak flavor and essential nutrients.",
  },
  {
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=2000&q=85",
    badge: "Visakhapatnam Coastal Market",
    title: "Visakhapatnam’s #1 Seafood Supplier",
    subtext: "Supplying top restaurants, hotels, and households with export-grade fresh seafood.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto scroll every 5s if not paused by hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:h-[84vh] flex items-center justify-center overflow-hidden bg-slate-950 group py-12 sm:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={heroSlides[current].image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroSlides[current].image}')` }}
        />
      </AnimatePresence>

      {/* Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40 backdrop-brightness-95" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* Prev / Next Navigation Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#fddd15] text-white hover:text-[#0c2d48] border border-white/20 transition-all duration-300 backdrop-blur-sm transform hover:scale-110 shadow-xl opacity-80 sm:opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#fddd15] text-white hover:text-[#0c2d48] border border-white/20 transition-all duration-300 backdrop-blur-sm transform hover:scale-110 shadow-xl opacity-80 sm:opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={22} />
      </button>

      {/* Animated Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 max-w-7xl mx-auto my-auto pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-slide-${current}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
              exit: { opacity: 0, transition: { duration: 0.2 } },
            }}
            className="flex flex-col items-center justify-center"
          >
            {/* 1. BADGE */}
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: -10 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                },
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#fddd15] text-[#063f54] text-xs sm:text-sm font-bold tracking-widest uppercase px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-5 shadow-xl border border-yellow-300/50 cursor-default"
            >
              {heroSlides[current].badge}
            </motion.span>

            {/* 2. HEADLINE */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white italic leading-tight drop-shadow-2xl max-w-5xl"
            >
              {heroSlides[current].title}
            </motion.h1>

            {/* 3. SUBTEXT (SINGLE LINE ON DESKTOP) */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              className="mt-4 sm:mt-5 text-gray-100 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed drop-shadow-md whitespace-normal md:whitespace-nowrap px-2"
            >
              {heroSlides[current].subtext}
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/products"
                className="bg-[#0B6A8B] hover:bg-[#074b63] text-white px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border border-teal-400/30"
              >
                Explore Fresh Catch
              </Link>

              <Link
                to="/about"
                className="bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Our Process
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              current === idx
                ? "w-7 h-2 bg-[#fddd15] shadow-lg"
                : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

