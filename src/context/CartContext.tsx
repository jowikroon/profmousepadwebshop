import React, { createContext, useContext, useState } from 'react';
import { MousePad, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (mousepad: MousePad) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (mousepad: MousePad) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.mousepad.id === mousepad.id);
      if (existingItem) {
        return prev.map(item =>
          item.mousepad.id === mousepad.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { mousepad, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.mousepad.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity === 0) {
        return prev.filter(item => item.mousepad.id !== id);
      }
      return prev.map(item =>
        item.mousepad.id === id ? { ...item, quantity } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}