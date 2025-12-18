import { useEffect, useState } from "react";
import { products } from "../types/product";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "react-router-dom";
import { Filter, Check } from "lucide-react";

/* 🔹 FILTER TYPES */
type FilterType = "All" | "Fish" | "Prawns" | "Crabs" | "Dry Fish";

export default function ProductsPage() {
  const { addToCart } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter") as FilterType | null;

  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [showFilter, setShowFilter] = useState(false);

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

  /* 🔹 FILTER LOGIC */
  const filteredProducts = products.filter((product) => {
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
    <section className="bg-[#F6FBFC] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* 🔹 HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-4">
          Our Premium Selection
        </h1>

        <p className="text-gray-600 mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base">
          Explore our complete range of fresh & dry seafood.
        </p>

        {/* 🔹 FILTER BAR */}
    {/* 🔹 FILTER BAR */}
<div className="flex items-center justify-between mb-10 relative">
  
  {/* LEFT: FILTER */}
  <div className="relative">
    {/* FILTER BUTTON */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        setShowFilter((prev) => !prev);
      }}
      className="flex items-center gap-2 px-4 py-2 rounded-lg
                 border border-gray-300 bg-white text-sm
                 hover:bg-gray-100 transition cursor-pointer"
    >
      <Filter size={16} />
      Filter
    </button>

    {/* FILTER DROPDOWN */}
    {showFilter && (
      <div
        className="filter-dropdown absolute left-0 top-12 w-52
                   bg-white rounded-xl shadow-lg
                   border border-gray-200 z-30 overflow-hidden"
      >
        {(["All", "Fish", "Prawns", "Crabs", "Dry Fish"] as FilterType[]).map(
          (filter) => (
            <button
              key={filter}
              onClick={() => {
                handleFilterClick(filter);
                setShowFilter(false);
              }}
              className={`w-full flex items-center justify-between
                          px-4 py-2 text-sm transition cursor-pointer
                          ${
                            activeFilter === filter
                              ? "bg-[#005F86] text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
            >
              {filter}
              {activeFilter === filter && <Check size={16} />}
            </button>
          )
        )}
      </div>
    )}
  </div>

  {/* RIGHT: STATUS TEXT */}
  <p className="text-sm text-gray-600">
    Showing <span className="font-semibold">{activeFilter}</span> products
  </p>
</div>

        {/* 🔹 PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl shadow-md
                         overflow-hidden hover:shadow-lg transition"
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
              <div className="p-4 sm:p-5">
                <span className="text-[11px] sm:text-xs bg-teal-100
                                 text-teal-700 px-3 py-1 rounded-full">
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

                {/* WEIGHT INFO */}
                <div className="mt-3 rounded-xl border border-gray-200
                                bg-white p-4 space-y-3 min-h-[110px]">
                  <div className={p.grossWeight ? "" : "invisible"}>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Gross Weight
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {p.grossWeight || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Net Weight
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        p.grossWeight ? "text-green-700" : "text-gray-900"
                      }`}
                    >
                      {p.netWeight}
                      {p.grossWeight && (
                        <span className="ml-1 text-xs text-gray-500">
                          (After Cleaning)
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* ADD TO CART */}
                <button
                  onClick={() => addToCart(p)}
                  className="mt-6 sm:mt-8 w-full bg-[#005F86]
                             text-white h-9 sm:h-10
                             text-xs sm:text-sm rounded-lg
                             flex items-center justify-center gap-2
                             hover:bg-[#004a68] transition cursor-pointer"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-12 text-sm">
            No products found for this filter.
          </p>
        )}
      </div>
    </section>
  );
}
