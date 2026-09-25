import { useEffect, useState } from "react";
import { ShoppingCart, Filter, Check, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";
import FishIconBackground from "../components/FishBackground";
import { motion, AnimatePresence } from "framer-motion";

/* 🔹 FILTER TYPES */
type FilterType = "All" | "Fish" | "Prawns" | "Crabs" | "Dry Fish";

export default function ProductsPage() {
  const { products } = useProducts();
  const { addToCart, addedAnimationId } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter") as FilterType | null;

  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /* 🔹 SYNC URL → FILTER */
  useEffect(() => {
    if (filterFromUrl) {
      setActiveFilter(filterFromUrl);
    } else {
      setActiveFilter("All");
    }
  }, [filterFromUrl]);

  /* 🔹 CLOSE FILTER ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filter-dropdown")) {
        setShowFilter(false);
      }
    };

    if (showFilter) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [showFilter]);

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

    if (activeFilter === "Fish") {
      return (
        product.category === "Fresh Fish" &&
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

    if (activeFilter === "Dry Fish") {
      return product.category === "Dry Seafood";
    }

    return true;
  });

  return (
    <section className="pt-2 sm:pt-4 pb-14 sm:pb-20 relative">
      <FishIconBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-2"
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

        {/* MOBILE FILTER TOGGLE */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                       border border-gray-300 bg-white text-sm font-medium"
          >
            <Filter size={16} />
            Filters
          </button>

          <span className="text-sm text-gray-600">
            {filteredProducts.length} items
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">

          {/* ================= LEFT SIDEBAR (STICKY ON DESKTOP) ================= */}
          <>
            {/* OVERLAY (mobile only) */}
            {mobileFilterOpen && (
              <div
                onClick={() => setMobileFilterOpen(false)}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              />
            )}

            <aside
              className={`
                fixed lg:sticky top-0 lg:top-24 left-0 h-full lg:h-fit lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto
                w-64 bg-white rounded-none lg:rounded-2xl
                border-r lg:border border-gray-200 p-5
                z-50 lg:z-10 lg:self-start shadow-sm
                transform transition-transform duration-300
                ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
              `}
            >
              {/* HEADER (mobile only) */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <Filter size={18} /> Filters
                </h3>

                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-gray-600 text-xl"
                >
                  ←
                </button>
              </div>

              {/* DESKTOP TITLE */}
              <h3 className="hidden lg:flex items-center gap-2 font-semibold text-lg mb-4">
                <Filter size={18} /> Filters
              </h3>

              {/* SEARCH INPUT INSIDE SIDEBAR */}
              <div className="relative mb-5">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search seafood..."
                  className="w-full pl-9 pr-7 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005F86] focus:bg-white transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* CATEGORY BUTTONS */}
              <div className="space-y-2">
                <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-2">Categories</p>
                {(["All", "Fish", "Prawns", "Crabs", "Dry Fish"] as FilterType[]).map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        handleFilterClick(filter);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                        ${
                          activeFilter === filter
                            ? "bg-[#005F86] text-white shadow-sm"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </aside>
          </>

          {/* ================= RIGHT PRODUCTS ================= */}
          <div>
            {/* STATUS BAR */}
            <div className="mb-6 px-4 py-3 rounded-xl bg-gray-100 text-sm text-gray-700 flex justify-between items-center flex-wrap gap-2">
              <span>
                Showing <b>{filteredProducts.length}</b> products
                {searchQuery && <span className="ml-1 text-gray-500">(matching "{searchQuery}")</span>}
              </span>

              {(activeFilter !== "All" || searchQuery !== "") && (
                <button
                  onClick={handleClearAll}
                  className="text-[#005F86] font-semibold hover:underline cursor-pointer text-xs uppercase tracking-wide"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* ================= PRODUCTS GRID WITH MOTION ================= */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
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
                                 flex flex-col h-full"
                    >
                      {/* IMAGE */}
                      <div className="overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-44 sm:h-48 lg:h-52 w-full object-cover
                                     transition-transform duration-700 ease-out
                                     group-hover:scale-110"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <span className="text-[11px] sm:text-xs bg-teal-100
                                         text-teal-700 px-3 py-1 rounded-full w-fit font-medium">
                          {p.category}
                        </span>

                        {/* TITLE */}
                        <h3 className="font-semibold text-base sm:text-lg mt-2 min-h-12 text-gray-900">
                          {p.name}
                        </h3>

                        <p className="text-lg sm:text-xl font-bold text-[#005F86] mt-2">
                          ₹{p.price}.00{" "}
                          <span className="text-xs sm:text-sm font-normal text-gray-500">
                            / {p.unit}
                          </span>
                        </p>

                        {/* WEIGHT INFO */}
                        <div className="mt-3 rounded-xl 
                                        bg-gray-50/60 p-4 space-y-3 min-h-[110px] border border-gray-100">
                          <div className={p.grossWeight ? "" : "invisible"}>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              Gross Weight
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {p.grossWeight || "—"}
                            </p>
                          </div>

                          <div className="min-h-11">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              Net Weight
                            </p>

                            <p
                              className={`text-sm font-semibold ${
                                p.grossWeight ? "text-green-700" : "text-gray-900"
                              }`}
                            >
                              {p.netWeight}
                            </p>

                            <p
                              className={`text-xs ${
                                p.grossWeight ? "text-gray-500" : "invisible"
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
                          className={`mt-auto w-full h-9 sm:h-10 text-xs sm:text-sm rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer ${
                            isAdded
                              ? "bg-emerald-600 text-white shadow-emerald-200"
                              : "bg-[#005F86] hover:bg-[#004a68] text-white"
                          }`}
                        >
                          {isAdded ? (
                            <motion.span
                              initial={{ scale: 0.5 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1.5"
                            >
                              <Check size={16} className="stroke-[3]" /> Added!
                            </motion.span>
                          ) : (
                            <>
                              <ShoppingCart size={16} /> Add to Cart
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
      </div>
    </section>
  );
}
