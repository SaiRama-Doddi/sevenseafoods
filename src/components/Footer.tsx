import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <a href="/" className="w-fit">
              <img
                src="/logo.png"
                alt="7seafoods Logo"
                className="h-16 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Delivering premium, sustainably sourced seafood fresh from ocean
              to your table.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/products?category=Fish" className="hover:text-[#005F86] transition">
                  Fresh Fish
                </a>
              </li>
              <li>
                <a href="/products?category=Shellfish" className="hover:text-[#005F86] transition">
                  Shellfish
                </a>
              </li>
              <li>
                <a href="/products?category=Specialty" className="hover:text-[#005F86] transition">
                  Dry Seafood
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#about" className="hover:text-[#005F86] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#005F86] transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-[#005F86] transition">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#005F86] transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-[#005F86] hover:shadow-md transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-[#005F86] hover:shadow-md transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-[#005F86] hover:shadow-md transition"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} 7seafoods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
