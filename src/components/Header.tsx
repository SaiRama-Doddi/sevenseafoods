import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { NavLink } from "react-router-dom";

/* Active link style */
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative font-medium transition-colors
   ${
     isActive
       ? "text-orange-500 after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-full after:bg-orange-500"
       : "text-gray-700 hover:text-orange-500"
   }`;

export default function Header() {
  const { cart, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        bg-background/95 backdrop-blur
        supports-[backdrop-filter]:bg-background/60
      "
    >
      {/* MAIN BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center">
          <div className="h-24 sm:h-16 md:h-30">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-auto object-contain"
            />
          </div>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {/* CART */}
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-black/5 transition"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-black/5"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-semibold" : "text-gray-700"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-semibold" : "text-gray-700"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-semibold" : "text-gray-700"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-orange-500 font-semibold" : "text-gray-700"
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
