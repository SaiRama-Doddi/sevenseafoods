import { createContext, useContext, useState, type ReactNode } from "react";
import type{ Product } from "../types/product";

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
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
  // ❌ no drawer opening here
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)!;
