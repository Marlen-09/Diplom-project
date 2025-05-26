"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import OrderComplete from "@/components/feature/checkout/order-complete";

export default function CheckoutCompletePage() {
  const { clearCart } = useCart();
  
  // Очищаем корзину при успешном оформлении заказа
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={72} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-shadow-indigo-300">Order Confirmed!</h1>
        
        <p className="text-gray-700 mb-8 text-lg">
          Your order has been placed successfully. We ve sent a confirmation email with all the details.
        </p>
        
        <OrderComplete 
          orderNumber="ORD-12345678"
          orderDate={new Date().toISOString()}
        />
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/account/orders" 
            className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800"
          >
            View Order Status
          </Link>
          
          <Link 
            href="/products" 
            className="w-full md:w-auto flex items-center justify-center px-8 py-3 rounded-full font-medium border border-gray-300 hover:bg-gray-100 text-gray-700"
          >
            <ShoppingBag size={18} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        {/* Дополнительная информация */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• You ll receive an email confirmation shortly</li>
            <li>• We ll notify you when your order ships</li>
            <li>• Track your package using the tracking number provided</li>
          </ul>
        </div>
      </div>
    </div>
  );
}