import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";

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
                className="h-28 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-yellow-100/90 leading-relaxed max-w-xs">
              Delivering premium, sustainably sourced seafood fresh from ocean
              to your table.
            </p>
            <div className="flex items-start gap-2 text-xs font-semibold text-[#fddd15] bg-white/10 p-2.5 rounded-lg border border-yellow-300/20 max-w-xs">
              <Sparkles size={16} className="shrink-0 mt-0.5" />
              <span>Vizag local 10km free home delivery service available on fish, prawns, crabs, ( with cleaning )</span>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold mb-4 text-[#fddd15]">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-yellow-100/90">
              <li>
                <a
                  href="/products?filter=Sea Foods"
                  className="hover:text-[#fddd15] transition capitalize"
                >
                  Sea Foods
                </a>
              </li>
              <li>
                <a
                  href="/products?filter=Fish"
                  className="hover:text-[#fddd15] transition capitalize"
                >
                  Fish
                </a>
              </li>
              <li>
                <a
                  href="/products?filter=Prawns"
                  className="hover:text-[#fddd15] transition capitalize"
                >
                  Prawns
                </a>
              </li>
              <li>
                <a
                  href="/products?filter=Crabs"
                  className="hover:text-[#fddd15] transition capitalize"
                >
                  Crabs
                </a>
              </li>
              <li>
                <a
                  href="/products?filter=Dry Seafood"
                  className="hover:text-[#fddd15] transition capitalize"
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
                <a href="/about" className="hover:text-[#fddd15] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#fddd15] transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT & SOCIAL */}
          <div>
            <h3 className="font-semibold mb-4 text-[#fddd15]">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm text-yellow-100/90 mb-5">
              <a 
                href="tel:+918499919197" 
                className="flex items-start gap-2.5 hover:text-[#fddd15] transition font-medium text-base text-white"
              >
                <Phone size={18} className="text-[#fddd15] shrink-0 mt-0.5" />
                <span>+91 84999 19197</span>
              </a>

              <a 
                href="mailto:7seafoods.in@gmail.com" 
                className="flex items-start gap-2.5 hover:text-[#fddd15] transition break-all"
              >
                <Mail size={16} className="text-[#fddd15] shrink-0 mt-0.5" />
                <span>7seafoods.in@gmail.com</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#fddd15] shrink-0 mt-0.5" />
                <span>Fishing Harbour, Visakhapatnam – 530001</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-[#fddd15] shrink-0 mt-0.5" />
                <span>Mon – Sun : 6:00 AM – 5:00 PM</span>
              </div>

              <div className="text-xs text-[#fddd15] font-semibold pt-1">
                Fresh quality seafoods supply in Vizag
              </div>
            </div>

            <h4 className="font-semibold mb-3 text-[#fddd15] text-xs uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="
                    p-2.5 rounded-full
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
