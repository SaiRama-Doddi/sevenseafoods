import { ShoppingCart, Menu, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { NavLink } from "react-router-dom";

/* Active link style */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative font-medium transition-colors duration-200
   ${
     isActive
       ? "text-[#fddd15] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-[#fddd15]"
       : "text-white hover:text-[#fddd15]"
   }`;

export default function Header() {
  const { cart, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* 🔹 TOP MARQUEE BAR */}
      <div className="bg-[#063f54] text-[#fddd15] text-sm overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex gap-12 py-2 font-medium">
          <span>🚚 Free Home Delivery Service Available on Fresh & Dry Seafoods</span>
          <span className="flex items-center gap-1">
            <Phone size={14} /> Contact: +91 84999 19197
          </span>
          <span>🐟 Premium Quality | Hygienic Cleaning | Fast Delivery</span>
        </div>
      </div>

      {/* 🔹 MAIN HEADER */}
      <div className="bg-[#0B6A8B] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Seven Seafoods"
              className="h-24 sm:h-20 md:h-28 object-contain"
            />
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-lg italic">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">

            {/* CART */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full hover:bg-white/10 transition"
            >
              <ShoppingCart className="w-6 h-6 text-[#fddd15]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#fddd15] text-[#0c2d48]
                  text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {menuOpen && (
          <div className="md:hidden bg-[#0c2d48] border-t border-white/10">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {["/", "/products", "/about", "/contact"].map((path, i) => (
                <NavLink
                  key={i}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#f4b400] font-semibold"
                      : "text-white hover:text-[#f4b400]"
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
