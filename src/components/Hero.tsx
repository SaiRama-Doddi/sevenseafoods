export default function Hero() {
  return (
    <section className="relative w-full h-[90vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/hero.jpg')", // put ocean image in public folder
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 max-w-5xl leading-tight">
          Fresh From Ocean to Your Table
        </h1>

        <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-3xl">
          Premium quality seafood delivered fresh. Experience the finest
          selection of fish, shellfish, and specialty items.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <button className="bg-[#0B6A8B] hover:bg-[#095a76] text-white px-8 py-3 rounded-xl text-lg font-medium transition">
            Shop Now
          </button>

          <button className="border border-gray-400 hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-xl text-lg font-medium transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
