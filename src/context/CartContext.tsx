import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../types/product";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingBag } from "lucide-react";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  isOpen: boolean;
  toggleCart: () => void;
  addedAnimationId: number | null;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<number | null>(null);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Trigger button animation ID
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);

    // Show floating toast alert
    setToastMessage(`${product.name} added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(p => p.id !== id));

  const increaseQty = (id: number) =>
    setCart(prev =>
      prev.map(p => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );

  const decreaseQty = (id: number) =>
    setCart(prev =>
      prev.map(p =>
        p.id === id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        isOpen,
        toggleCart,
        addedAnimationId,
      }}
    >
      {children}

      {/* Floating Animated Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 bg-[#063f54] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#fddd15]/40 backdrop-blur-md"
          >
            <div className="bg-[#fddd15] text-[#063f54] p-1.5 rounded-full flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#fddd15] font-semibold tracking-wide uppercase">Item Added</span>
              <span className="text-sm font-medium">{toastMessage}</span>
            </div>
            <button 
              onClick={toggleCart}
              className="ml-3 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1"
            >
              <ShoppingBag size={12} /> View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)!;
