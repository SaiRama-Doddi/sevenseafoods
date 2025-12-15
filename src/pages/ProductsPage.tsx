// src/pages/ProductsPage.tsx
import { useState } from "react";
import { products } from "../types/product";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Category } from "../types/product";

type FilterType = "All" | Category;

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter(p => p.category === activeFilter);

  return (
    <section className="bg-[#F6FBFC] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-4">
          Our Premium Selection
        </h1>

        <p className="text-gray-600 mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base">
          Explore our complete range of fresh, sustainably-sourced seafood from
          around the world.
        </p>

        {/* 🔹 FILTER TABS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["All", "Fresh Fish", "Shellfish", "Dry Seafood"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as FilterType)}
              className={`px-4 sm:px-6 py-2 rounded-full border text-xs sm:text-sm font-medium transition
                ${
                  activeFilter === filter
                    ? "bg-[#005F86] text-white border-[#005F86]"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* 🔹 PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-44 sm:h-48 lg:h-52 w-full object-cover"
              />

              <div className="p-4 sm:p-5">
                <span className="text-[11px] sm:text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                  {p.category}
                </span>

                <h3 className="font-semibold text-base sm:text-lg mt-2">
                  {p.name}
                </h3>

                <p className="text-lg sm:text-xl font-bold text-[#005F86] mt-2">
                  ₹{p.price}.00{" "}
                  <span className="text-xs sm:text-sm font-normal">
                    / {p.unit}
                  </span>
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  Net: {p.netWeight}
                </p>

                {/* Add to cart */}
                <button
                  onClick={() => addToCart(p)}
                  className="mt-6 sm:mt-8 w-full bg-[#005F86] text-white 
                             h-9 sm:h-10 text-xs sm:text-sm rounded-lg
                             flex items-center justify-center gap-2
                             hover:bg-[#004a68] transition"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-sm">
            No products found for this category.
          </p>
        )}
      </div>
    </section>
  );
}
