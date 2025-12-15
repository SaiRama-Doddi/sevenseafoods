import { motion } from "framer-motion";
import {
  Fish,
  ShieldCheck,
  Truck,
  Scale,
  Globe,
  Award,
} from "lucide-react";

export default function About() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://wallpaperaccess.com/full/1491751.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Angled Shape */}
        <div
          className="absolute top-0 left-0 w-full h-32 bg-[#FAF9F6]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 35%, 50% 100%, 0 35%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight">
              Local Seafood Mastery in Visakhapatnam
            </h1>

            <p className="mt-6 text-gray-200 text-lg md:text-xl">
              Delivering fresh, hygienic, and premium seafood with complete
              transparency and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold mb-6 text-foreground">
              Quality Seafood You Can Trust
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At <span className="font-semibold">Seven Seafoods</span>, we
              specialize in sourcing the freshest seafood directly from the
              Visakhapatnam fishing harbour. Every catch is handled with
              precision, care, and respect for quality.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              From premium lobsters and king fish to daily essentials like
              prawns and mackerel, we maintain strict hygiene standards,
              accurate weight transparency, and timely delivery.
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Feature
                icon={<Fish />}
                title="Fresh From Harbour"
                desc="Daily sourcing ensures peak freshness."
              />
              <Feature
                icon={<ShieldCheck />}
                title="Hygiene Assured"
                desc="Handled with export-grade cleanliness."
              />
              <Feature
                icon={<Scale />}
                title="Weight Transparency"
                desc="Clear gross and net weight details."
              />
              <Feature
                icon={<Truck />}
                title="Fast Delivery"
                desc="Reliable doorstep delivery service."
              />
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src="/fresh-seafood-market-display.jpg"
              alt="Fresh seafood"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 bg-[#0B6A8B] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            <Stat value="10+" label="Years Experience" />
            <Stat value="500+" label="Bulk Orders Delivered" />
            <Stat value="100+" label="Happy Clients" />
          </div>
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Why Choose Seven Seafoods
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine tradition, technology, and trust to deliver seafood
            excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Value
            icon={<Award />}
            title="Premium Quality"
            desc="Only the best seafood meets our standards."
          />
          <Value
            icon={<Globe />}
            title="Trusted Network"
            desc="Serving retail, bulk & export customers."
          />
          <Value
            icon={<ShieldCheck />}
            title="Customer First"
            desc="Transparency and satisfaction guaranteed."
          />
        </div>
      </section>
    </>
  );
}

/* ================= COMPONENTS ================= */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex gap-4"
    >
      <div className="text-[#fddd15] mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </motion.div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="text-4xl font-bold text-[#fddd15]">{value}</p>
      <p className="mt-2 text-sm tracking-wide">{label}</p>
    </motion.div>
  );
}

function Value({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#fddd15] text-[#0c2d48] mb-4">
        {icon}
      </div>
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </motion.div>
  );
}
