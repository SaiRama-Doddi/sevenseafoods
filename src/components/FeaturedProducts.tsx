// src/components/FeaturedProducts.tsx
import { ShoppingCart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import FishBackground from "./FishBackground";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const { products } = useProducts();
  const featured = products.filter(p => p.featured).slice(0, 8);
  const { addToCart, addedAnimationId } = useCart();
  return (
    <section className="
      bg-[#F6FBFC]
      py-16
      relative
      overflow-hidden
      min-h-[120vh]
      sm:min-h-screen
    ">
      <FishBackground/>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif font-semibold text-center mb-3 italic"
        >
          Featured Products
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-600 mb-12"
        >
          Our most popular selections, handpicked for quality and freshness.
        </motion.p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, index) => {
            const isAdded = addedAnimationId === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
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

                    <span className="absolute top-3 right-3 bg-teal-500 text-white text-xs px-3 py-1 rounded-full shadow">
                      Featured
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="inline-block mb-2 text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium">
                      {product.category}
                    </span>

                    <h3 className="font-semibold text-lg mb-2 text-gray-900">
                      {product.name}
                    </h3>

                    <p className="text-2xl font-bold text-[#005F86]">
                      ₹{product.price}.00{" "}
                      <span className="text-sm font-normal text-gray-600">/ {product.unit}</span>
                    </p>

                    <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3 min-h-[110px]">
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
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => addToCart(product)}
                    className={`w-full h-10 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer ${
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
                        <Check size={18} className="stroke-[3]" /> Added!
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
        </div>

        {/* VIEW ALL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-block border border-[#005F86] text-[#005F86] hover:bg-[#005F86] hover:text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
