import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";

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
    <section className="bg-[#F4FAFB] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                  <Icon className="h-7 w-7 text-teal-600" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
