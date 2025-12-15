import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B6A8B] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* LOGO & DESC */}
          <div className="flex flex-col gap-4">
            <a href="/" className="w-fit">
              <img
                src="/logo.png"
                alt="7seafoods Logo"
                className="h-30 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-yellow-100/90 leading-relaxed max-w-xs">
              Delivering premium, sustainably sourced seafood fresh from ocean
              to your table.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold mb-4 text-[#fddd15]">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-yellow-100/90">
              <li>
                <a
                  href="/products?category=Fish"
                  className="hover:text-[#fddd15] transition"
                >
                  Fresh Fish
                </a>
              </li>
              <li>
                <a
                  href="/products?category=Shellfish"
                  className="hover:text-[#fddd15] transition"
                >
                  Shellfish
                </a>
              </li>
              <li>
                <a
                  href="/products?category=Specialty"
                  className="hover:text-[#fddd15] transition"
                >
                  Dry Seafood
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="font-semibold mb-4 text-[#fddd15]">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-yellow-100/90">
              <li>
                <a href="#about" className="hover:text-[#fddd15] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#fddd15] transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-[#fddd15] transition">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#fddd15] transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold mb-4 text-[#fddd15]">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="
                    p-3 rounded-full
                    bg-white/10
                    text-[#fddd15]
                    hover:bg-[#fddd15]
                    hover:text-[#0c2d48]
                    transition
                  "
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-yellow-100/80">
          © {new Date().getFullYear()} Seven Seafoods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
