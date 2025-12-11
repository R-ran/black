"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { calculatePrice } from "@/utils/priceCalculator";

export interface CartItem {
  id: string;
  color: string;
  size: string;
  quantity: string;
  price: number;
  originalPrice: number | null;
  discountPercent: number | null;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalSavings: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 从 localStorage 加载购物车
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // 保存购物车到 localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.color}-${item.size}-${item.quantity}-${Date.now()}`,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;
        
        const quantityStr = `${quantity} ${quantity === 1 ? 'Pair' : 'Pairs'}`;
        
        // 使用统一的价格计算函数
        const priceInfo = calculatePrice(quantity);
        
        return {
          ...item,
          quantity: quantityStr,
          price: priceInfo.salePrice,
          originalPrice: priceInfo.originalPrice,
          discountPercent: priceInfo.discountPercent,
        };
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => {
      const qty = parseInt(item.quantity.split(" ")[0]) || 1;
      return total + qty;
    }, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getTotalSavings = () => {
    return items.reduce((total, item) => {
      if (item.originalPrice !== null) {
        return total + (item.originalPrice - item.price);
      }
      return total;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getTotalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

