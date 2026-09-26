import { useEffect, useState } from "react";
import { ShoppingCart, Check, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";
import FishIconBackground from "../components/FishBackground";
import { motion, AnimatePresence } from "framer-motion";

/* 🔹 FILTER TYPES */
type FilterType = "All" | "Sea Foods" | "Dry Seafood" | "Fish" | "Prawns" | "Crabs";

export default function ProductsPage() {
  const { products } = useProducts();
  const { addToCart, addedAnimationId } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter") as FilterType | null;

  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  /* 🔹 SYNC URL → FILTER */
  useEffect(() => {
    if (filterFromUrl) {
      if (filterFromUrl === ("Fresh Fish" as any) || filterFromUrl === ("Shellfish" as any)) {
        setActiveFilter("Sea Foods");
      } else {
        setActiveFilter(filterFromUrl);
      }
    } else {
      setActiveFilter("All");
    }
  }, [filterFromUrl]);

  /* 🔹 HANDLE FILTER CLICK */
  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);

    if (filter === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ filter });
    }
  };

  /* 🔹 CLEAR ALL FILTERS */
  const handleClearAll = () => {
    setActiveFilter("All");
    setSearchQuery("");
    setSearchParams({});
  };

  /* 🔹 FILTER LOGIC */
  const filteredProducts = products.filter((product) => {
    // Hide out-of-stock products on frontend
    if (product.inStock === false) return false;

    // Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      if (!matchesName && !matchesCategory) return false;
    }

    const name = product.name.toLowerCase();

    if (activeFilter === "All") return true;

    if (activeFilter === "Sea Foods") {
      return product.category === "Sea Foods" || product.category === ("Fresh Fish" as any) || product.category === ("Shellfish" as any);
    }

    if (activeFilter === "Fish") {
      return (
        (product.category === "Sea Foods" || product.category === ("Fresh Fish" as any)) &&
        !name.includes("prawn") &&
        !name.includes("crab")
      );
    }

    if (activeFilter === "Prawns") {
      return name.includes("prawn");
    }

    if (activeFilter === "Crabs") {
      return name.includes("crab");
    }

    if (activeFilter === "Dry Seafood") {
      return product.category === "Dry Seafood";
    }

    return true;
  });

  const categories: FilterType[] = ["All", "Sea Foods", "Dry Seafood", "Fish", "Prawns", "Crabs"];

  return (
    <section className="pt-2 sm:pt-4 pb-14 sm:pb-20 relative">
      <FishIconBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-4xl md:text-5xl font-serif font-semibold mb-2 whitespace-nowrap text-gray-900"
        >
          Our Premium Selection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 mb-6 max-w-2xl text-sm sm:text-base"
        >
          Explore our complete range of fresh & dry seafood.
        </motion.p>

        {/* TOP SEARCH & FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-8 space-y-4"
        >
          {/* SEARCH INPUT */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search seafood by name or category (e.g. Fish, Prawns, Lobster...)"
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005F86] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* CATEGORIES PILLS & STATUS BAR */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 border-t border-gray-100">
            {/* CATEGORY BUTTONS */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    activeFilter === filter
                      ? "bg-[#005F86] text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* STATUS & CLEAR */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto text-xs text-gray-600">
              <span>
                Showing <b>{filteredProducts.length}</b> products
              </span>

              {(activeFilter !== "All" || searchQuery !== "") && (
                <button
                  onClick={handleClearAll}
                  className="text-[#005F86] font-semibold hover:underline cursor-pointer uppercase text-[11px] tracking-wide whitespace-nowrap ml-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* FULL WIDTH PRODUCTS GRID */}
        <div>
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((p, idx) => {
                const isAdded = addedAnimationId === p.id;

                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    whileHover={{ y: -6 }}
                    className="group bg-white rounded-2xl shadow-md
                               overflow-hidden hover:shadow-xl transition-all duration-300
                               flex flex-col h-full justify-between"
                  >
                    {/* IMAGE */}
                    <div className="overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-36 sm:h-48 lg:h-52 w-full object-cover
                                   transition-transform duration-700 ease-out
                                   group-hover:scale-110"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-3 sm:p-5 flex flex-col flex-1">
                      <span className="text-[10px] sm:text-xs bg-teal-100
                                       text-teal-700 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full w-fit font-medium">
                        {p.category}
                      </span>

                      {/* TITLE */}
                      <h3 className="font-semibold text-xs sm:text-base md:text-lg mt-1.5 sm:mt-2 min-h-[32px] sm:min-h-[48px] text-gray-900 line-clamp-2">
                        {p.name}
                      </h3>

                      <p className="text-base sm:text-xl font-bold text-[#005F86] mt-1 sm:mt-2">
                        ₹{p.price}.00{" "}
                        <span className="text-[10px] sm:text-sm font-normal text-gray-500">
                          / {p.unit}
                        </span>
                      </p>

                      {/* WEIGHT INFO */}
                      <div className="mt-2 sm:mt-3 rounded-xl 
                                      bg-gray-50/60 p-2.5 sm:p-4 space-y-2 sm:space-y-3 min-h-[85px] sm:min-h-[110px] border border-gray-100">
                        <div className={p.grossWeight ? "" : "invisible"}>
                          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">
                            Gross Weight
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                            {p.grossWeight || "—"}
                          </p>
                        </div>

                        <div className="min-h-9 sm:min-h-11">
                          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">
                            Net Weight
                          </p>

                          <p
                            className={`text-xs sm:text-sm font-semibold truncate ${
                              p.grossWeight ? "text-green-700" : "text-gray-900"
                            }`}
                          >
                            {p.netWeight}
                          </p>

                          <p
                            className={`text-[10px] ${
                              p.grossWeight ? "text-gray-500 hidden sm:block" : "invisible"
                            }`}
                          >
                            (After Cleaning)
                          </p>
                        </div>
                      </div>

                      {/* BUTTON */}
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => addToCart(p)}
                        className={`mt-auto w-full h-8 sm:h-10 text-xs sm:text-sm rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer ${
                          isAdded
                            ? "bg-emerald-600 text-white shadow-emerald-200"
                            : "bg-[#005F86] hover:bg-[#004a68] text-white"
                        }`}
                      >
                        {isAdded ? (
                          <motion.span
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 text-xs"
                          >
                            <Check size={14} className="stroke-[3]" /> Added!
                          </motion.span>
                        ) : (
                          <>
                            <ShoppingCart size={14} /> Add to Cart
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mt-12 text-sm"
            >
              No products found matching your filter or search query.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

