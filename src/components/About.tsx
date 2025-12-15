export default function About() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://wallpaperaccess.com/full/1491751.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Angled Top Shape */}
        <div
          className="absolute top-0 left-0 w-full h-32 bg-[#FAF9F6]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 35%, 50% 100%, 0 35%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center max-w-4xl">
            <h1 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight">
              Local Seafood  Mastery in Visakhapatnam
            </h1>

            <p className="mt-6 text-gray-200 text-lg md:text-xl">
              Experience the finest local seafood delicacies crafted with
              tradition, freshness, and unmatched quality.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ABOUT CONTENT SECTION ===== */}
      <section
        id="about"
        className="py-16 max-w-7xl mx-auto px-6 md:px-8 lg:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="font-serif text-4xl font-bold text-balance mb-6 text-foreground">
              Quality Seafood You Can Trust
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At <span className="font-semibold">7seafoods</span>, we are
              passionate about delivering the freshest and highest quality
              seafood to your doorstep. Our team carefully selects each product
              to ensure you receive only the best catch, cleaned and ready to
              cook.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              From premium lobsters and king fish to everyday favorites like
              prawns and mackerel, every item is handled with care and delivered
              fresh. We provide complete weight transparency with gross and net
              weights for your peace of mind.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <img
              src="/fresh-seafood-market-display.jpg"
              alt="Fresh seafood"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
