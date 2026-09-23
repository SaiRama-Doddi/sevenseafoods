import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=2000&q=85", // Fresh fish & seafood on ice HD
  "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=2000&q=85", // Premium gourmet seafood HD
  "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=2000&q=85", // Fresh oceanic catch HD
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85", // Fresh fish market display HD
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto scroll every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-slate-900">

      {/* Background Images with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={images[current]}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[current]}')` }}
        />
      </AnimatePresence>

      {/* Rich Vignette & Dark Gradient Overlay for Maximum Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/35 backdrop-brightness-90" />

      {/* Animated Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`hero-slide-text-${current}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.18 },
              },
              exit: { opacity: 0, transition: { duration: 0.3 } },
            }}
            className="flex flex-col items-center justify-center"
          >
            {/* 1. BADGE */}
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: -15 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                },
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#fddd15] text-[#063f54] text-xs sm:text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6 shadow-xl border border-yellow-300/50 cursor-default"
            >
              100% Fresh & Hygienically Cleaned
            </motion.span>

            {/* 2. HEADLINE (Single line on desktop) */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: "easeOut" },
                },
              }}
              className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white italic leading-tight drop-shadow-2xl sm:whitespace-nowrap max-w-full"
            >
              Fresh From Ocean to Your Table
            </motion.h1>

            {/* 3. SUBTEXT */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" },
                },
              }}
              className="mt-6 text-gray-100 text-base sm:text-xl md:text-2xl max-w-3xl font-light leading-relaxed drop-shadow-md"
            >
              Visakhapatnam’s finest daily catch. Premium fish, lobsters, prawns & dry seafood delivered directly to your doorstep.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="mt-10 flex flex-wrap justify-center gap-5"
            >
              <Link
                to="/products"
                className="bg-[#0B6A8B] hover:bg-[#074b63] text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border border-teal-400/30"
              >
                Explore Fresh Catch
              </Link>

              <Link
                to="/about"
                className="bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Our Process
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
