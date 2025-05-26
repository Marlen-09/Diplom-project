"use client";

import { CartItem } from "@/types/cart";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: CartItem[];
}

export default function OrderSummary({ 
  subtotal, 
  shipping, 
  tax, 
  total,
  items
}: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h2>
      
      {/* Order items */}
      <div className="max-h-48 overflow-y-auto mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex py-2 border-b last:border-0">
            <div className="h-10 w-10 bg-gray-200 rounded flex-shrink-0 mr-3">
              {/* Replace with actual image */}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium truncate text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Totals */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-700">Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span className="text-gray-900">${shipping.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-700">Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Promo code - disabled in checkout */}
      <div className="opacity-50 cursor-not-allowed">
        <div className="flex">
          <input
            type="text"
            placeholder="Promo code"
            disabled
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-200 w-full text-gray-500"
          />
          <button
            disabled
            className="px-4 py-2 rounded-r-md font-medium bg-gray-200 text-gray-500"
          >
            Apply
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Promo codes can only be applied in cart</p>
      </div>
    </div>
  );
}