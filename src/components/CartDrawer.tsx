import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    toggleCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------------- SEND TO WHATSAPP ---------------- */
  const handleSendWhatsApp = () => {
    if (!name || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    const productLines = cart
      .map(
        item =>
          `• ${item.name} x ${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const message = `
🛒 *New Order - Seven Seafoods*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📍 *Address:* ${address}

🧾 *Order Details:*
${productLines}

💰 *Total:* ₹${subtotal}
    `;

    const whatsappUrl = `https://wa.me/918499919197?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}>
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
        )}
      </AnimatePresence>

      {/* CART DRAWER PANEL */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute right-0 top-0 h-full w-full sm:w-105 bg-white shadow-2xl flex flex-col justify-between"
      >
        {/* HEADER */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0B6A8B]" />
            <h2 className="text-xl font-bold text-gray-900">
              Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCart}
            className="p-1.5 rounded-full hover:bg-gray-200 transition text-gray-600 cursor-pointer"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* ITEM LIST */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-12">
              <ShoppingBag size={48} className="mb-3 text-gray-300" />
              <p className="text-lg font-medium text-gray-600">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1">Explore our fresh seafood collection to add items.</p>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 60, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                      {item.name}
                    </h4>

                    {/* QUANTITY CONTROLS WITH MOTION */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                        <motion.button
                          whileHover={{ backgroundColor: "#0B6A8B", color: "#ffffff" }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => decreaseQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </motion.button>

                        <span className="w-8 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>

                        <motion.button
                          whileHover={{ backgroundColor: "#0B6A8B", color: "#ffffff" }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => increaseQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </motion.button>
                      </div>

                      {/* REMOVE BUTTON WITH MOTION */}
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer ml-auto"
                      >
                        <Trash2 size={14} />
                        Remove
                      </motion.button>
                    </div>
                  </div>

                  <p className="font-bold text-[#005F86] text-base self-start">
                    ₹{item.price * item.quantity}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">₹{subtotal}</span>
            </div>

            <div className="flex justify-between font-bold text-lg text-gray-900 pt-1 border-t border-gray-100">
              <span>Total</span>
              <span className="text-[#0B6A8B] text-xl">₹{subtotal}</span>
            </div>

            {/* PROCEED TO CHECKOUT BUTTON WITH MOTION */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowCheckout(true)}
              className="group w-full bg-[#0B6A8B] hover:bg-[#074b63] text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              Proceed to Checkout
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* ================= CHECKOUT POPUP WITH MOTION ================= */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition text-gray-600 cursor-pointer"
              >
                <X size={20} />
              </motion.button>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Enter Delivery Details
              </h3>

              <div className="space-y-4">
                <input
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B6A8B] focus:ring-1 focus:ring-[#0B6A8B] transition"
                />

                <input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B6A8B] focus:ring-1 focus:ring-[#0B6A8B] transition"
                />

                <textarea
                  placeholder="Delivery Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0B6A8B] focus:ring-1 focus:ring-[#0B6A8B] transition"
                  rows={3}
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSendWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  Send Order via WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
