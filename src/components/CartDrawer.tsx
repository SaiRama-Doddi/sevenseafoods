import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    toggleCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={toggleCart}
        className={`absolute inset-0 bg-black/40 transition ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-105 bg-white shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">
            Shopping Cart ({cart.length})
          </h2>
          <button onClick={toggleCart}>
            <X />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto h-[60%]">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-xl p-3"
            >
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

        {/* Footer */}
        <div className="p-6 border-t space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
