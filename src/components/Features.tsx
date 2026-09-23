import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description:
      "Every product is hand-selected and quality-checked for freshness and taste.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Temperature-controlled delivery ensures your seafood arrives fresh at your doorstep.",
  },
  {
    icon: BadgeCheck,
    title: "Fresh & Clean",
    description:
      "All seafood is cleaned and ready to cook, saving you time in the kitchen.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-[#F4FAFB]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="
                  bg-[#0B6A8B]
                  rounded-2xl
                  p-10
                  text-center
                  shadow-lg
                  hover:shadow-2xl
                  transition-all duration-300
                "
              >
                {/* ICON */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 shadow-inner">
                  <Icon className="h-8 w-8 text-[#fddd15]" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
