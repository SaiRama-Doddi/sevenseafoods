// src/components/FeaturedProducts.tsx
import { products } from "../types/product";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function FeaturedProducts() {
  const featured = products.filter(p => p.featured).slice(0, 8);
  const { addToCart } = useCart();
  return (
    <section className="bg-[#F6FBFC] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-3 italic">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Our most popular selections, handpicked for quality and freshness.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="relative overflow-hidden">
  <img
    src={product.image}
    alt={product.name}
    className="
      h-52 w-full object-cover
      transition-transform duration-700 ease-out
      hover:scale-110
    "
  />

  <span className="absolute top-3 right-3 bg-teal-500 text-white text-xs px-3 py-1 rounded-full">
    Featured
  </span>
</div>


              <div className="p-5">
                <span className="inline-block mb-2 text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <h3 className="font-semibold text-lg mb-2">
                  {product.name}
                </h3>

                <p className="text-2xl font-bold text-[#005F86]">
                  ₹{product.price}.00{" "}
                  <span className="text-sm font-normal">/ {product.unit}</span>
                </p>

               <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 space-y-3 min-h-[110px]">
  {/* Gross Weight */}
  <div className={product.grossWeight ? "" : "invisible"}>
    <p className="text-xs uppercase tracking-wide text-gray-500">
      Gross Weight
    </p>
    <p className="text-sm font-semibold text-gray-900">
      {product.grossWeight || "—"}
    </p>
  </div>

  {/* Net Weight */}
  <div>
    <p className="text-xs uppercase tracking-wide text-gray-500">
      Net Weight
    </p>
    <p className={`text-sm font-semibold ${
      product.grossWeight ? "text-green-700" : "text-gray-900"
    }`}>
      {product.netWeight}
      {product.grossWeight && (
        <span className="ml-1 text-xs text-gray-500">(After Cleaning)</span>
      )}
    </p>
  </div>
</div>

<button
  onClick={() => addToCart(product)}
  className="mt-10 w-full bg-[#005F86] text-white 
             h-8 text-sm rounded-lg
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

        {/* VIEW ALL */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block border px-8 py-3 rounded-xl hover:bg-gray-100"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
