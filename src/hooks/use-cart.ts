/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { CartItem, Cart } from "@/types/cart";

// Моковые данные для корзины
const mockCartItems: CartItem[] = [
  {
    id: "1",
    productId: "1",
    name: "Premium Headphones",
    price: 99.99,
    quantity: 1,
    image: "/placeholder.jpg",
    attributes: { Color: "Black" }
  },
  {
    id: "2",
    productId: "3",
    name: "Smart Watch",
    price: 179.99,
    quantity: 1,
    image: "/placeholder.jpg",
    attributes: { Color: "Silver", "Band Material": "Silicone" }
  }
];

// Расчет итогов корзины
const calculateTotals = (items: CartItem[]): Cart => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0; // Бесплатная доставка при заказе от $100
  const tax = subtotal * 0.08; // 8% налог
  const total = subtotal + shipping + tax;
  
  return {
    items,
    subtotal,
    shipping,
    tax,
    total
  };
};

// Инициализация корзины с моковыми данными
const initialCart: Cart = calculateTotals(mockCartItems);

export const useCart = () => {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Имитация загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Функции для управления корзиной (не будут делать ничего в моковой версии)
  const addToCart = (): void => {
    console.log("Adding to cart (mock)");
  };
  
  const removeFromCart = (): void => {
    console.log("Removing from cart (mock)");
  };
  
  const updateQuantity = (): void => {
    console.log("Updating quantity (mock)");
  };
  
  const clearCart = (): void => {
    console.log("Clearing cart (mock)");
  };
  
  // Получение количества товаров в корзине
  const getCartItemsCount = (): number => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemsCount
  };
};