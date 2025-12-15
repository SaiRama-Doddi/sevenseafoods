import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

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
      {/* Overlay */}
      <div
        onClick={toggleCart}
        className={`absolute inset-0 bg-black/40 transition ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* CART DRAWER */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-105 bg-white shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Shopping Cart ({cart.length})
          </h2>
          <button onClick={toggleCart}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto h-[60%]">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 p-3">
              <img
                src={item.image}
                className="w-16 h-16 rounded object-cover"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="border px-2 rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="border px-2 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2"
                >
                  Remove
                </button>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-[#0B6A8B] text-white py-4 rounded-xl mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* ================= CHECKOUT POPUP ================= */}
      {showCheckout && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">

            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Enter Delivery Details
            </h3>

            <div className="space-y-4">
              <input
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />

              <input
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />

              <textarea
                placeholder="Delivery Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                rows={3}
              />

              <button
                onClick={handleSendWhatsApp}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
              >
                Send Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
