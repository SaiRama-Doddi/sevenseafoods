import { ShoppingCart, Menu, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

/* Active link style */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative font-medium transition-colors duration-200
   ${
     isActive
       ? "text-black font-bold after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-[#0B6A8B]"
       : "text-black hover:text-[#0B6A8B]"
   }`;

export default function Header() {
  const { cart, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">

      {/* 🔹 TOP MARQUEE BAR */}
      <div className="bg-[#063f54] text-[#fddd15] text-sm overflow-hidden w-full max-w-full">
        <div className="whitespace-nowrap animate-marquee flex gap-12 py-2 font-medium">
          <span>🚚 Vizag local 10km free home delivery service available on fish, prawns, crabs, ( with cleaning )</span>
          <span className="flex items-center gap-1">
            <Phone size={14} /> Contact: +91 84999 19197
          </span>
          <span>🐟 Premium Quality | Hygienic Cleaning | Fast Delivery</span>
        </div>
      </div>

      {/* 🔹 MAIN HEADER */}
      <div className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-22 md:h-22 flex items-center justify-between">

          {/* LOGO (LEFT SIDE - ENLARGED) */}
          <NavLink to="/" className="flex items-center shrink-0 py-1">
            <img
              src="/logo.png"
              alt="Seven Seafoods"
              className="h-18 sm:h-20 md:h-24 lg:h-26 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm"
            />
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-base sm:text-lg italic font-serif">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* CART */}
            <motion.button
              key={`cart-btn-${cart.reduce((a, b) => a + b.quantity, 0)}`}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.25, 0.95, 1] }}
              transition={{ duration: 0.4 }}
              onClick={toggleCart}
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <ShoppingCart className="w-7 h-7 text-black" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#0B6A8B] text-white
                    text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow"
                >
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </motion.span>
              )}
            </motion.button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <Menu className="w-7 h-7 text-black" />
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fadeIn">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {["/", "/products", "/about", "/contact"].map((path, i) => (
                <NavLink
                  key={i}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold"
                      : "text-black/80 hover:text-black"
                  }
                >
                  {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
