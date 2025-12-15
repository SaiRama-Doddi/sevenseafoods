import { useEffect, useState } from "react";

const images = [
  "/hero.jpg",
  "https://img.freepik.com/premium-photo/ocean-odyssey-fresh-seafood-adventures_960396-190971.jpg",
  "https://thumbs.dreamstime.com/b/freshest-steak-fillet-fresh-atlantic-salmon-herbs-fish-chilled-ice-close-up-ready-to-eat-302100526.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
<section className="relative w-full h-[50vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">


      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl font-semibold text-[#0c2d48] italic max-w-5xl leading-tight">
          Fresh From Ocean to Your Table
        </h1>

  <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-3xl hidden sm:block">
          Premium quality seafood delivered fresh. Experience the finest
          selection of fish, shellfish, and specialty items.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <a
            href="/products"
            className="bg-[#0B6A8B] hover:bg-[#095a76] text-white px-8 py-3 rounded-xl text-lg font-medium transition"
          >
            Shop Now
          </a>

          <a
            href="/about"
            className="border border-gray-400 hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-xl text-lg font-medium transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
