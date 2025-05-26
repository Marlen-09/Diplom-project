"use client";

import { useState } from "react";
import { ShippingData, PaymentData } from "./checkout-form";
import { ChevronLeft, CreditCard, MapPin, Truck } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface ReviewOrderProps {
  shippingData: ShippingData;
  paymentData: PaymentData;
  onSubmit: () => void;
  onBack: () => void;
}

export default function ReviewOrder({ 
  shippingData, 
  paymentData, 
  onSubmit, 
  onBack 
}: ReviewOrderProps) {
  const { cart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Имитация отправки заказа на сервер
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Review Your Order</h2>
      
      {/* Shipping Information */}
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <MapPin size={18} className="text-gray-600 mr-2" />
            <h3 className="font-medium text-gray-900">Shipping Address</h3>
          </div>
        </div>
        
        <div className="text-sm space-y-1 text-gray-800">
          <p>
            {shippingData.firstName} {shippingData.lastName}
          </p>
          <p>{shippingData.address}</p>
          <p>
            {shippingData.city}, {shippingData.state} {shippingData.zipCode}
          </p>
          <p>{shippingData.country}</p>
          <p>{shippingData.email}</p>
          <p>{shippingData.phone}</p>
        </div>
      </div>
      
      {/* Shipping Method */}
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Truck size={18} className="text-gray-600 mr-2" />
            <h3 className="font-medium text-gray-900">Shipping Method</h3>
          </div>
        </div>
        
        <div className="text-sm text-gray-800">
          {shippingData.shippingMethod === "standard" ? (
            <p>Standard Shipping (4-6 business days)</p>
          ) : (
            <p>Express Shipping (1-3 business days)</p>
          )}
        </div>
      </div>
      
      {/* Payment Method */}
      <div className="border rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <CreditCard size={18} className="text-gray-600 mr-2" />
            <h3 className="font-medium text-gray-900">Payment Method</h3>
          </div>
        </div>
        
        <div className="text-sm space-y-1 text-gray-800">
          <p>Card: **** **** **** {paymentData.cardNumber.slice(-4)}</p>
          <p>Name: {paymentData.cardName}</p>
          <p>Expiration: {paymentData.expDate}</p>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="border rounded-md p-4">
        <h3 className="font-medium mb-3 text-gray-900">Order Items</h3>
        
        <div className="space-y-3">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-gray-400 rounded flex-shrink-0 mr-3">
                  {/* Replace with actual image */}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  {/* Показываем атрибуты если есть */}
                  {item.attributes && Object.entries(item.attributes).length > 0 && (
                    <div className="text-xs text-gray-600">
                      {Object.entries(item.attributes).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-900">${cart.subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Shipping</span>
            {cart.shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span className="text-gray-900">${cart.shipping.toFixed(2)}</span>
            )}
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Tax</span>
            <span className="text-gray-900">${cart.tax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between font-medium pt-2 border-t">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900 font-bold">${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-6 flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center py-2 px-4 border border-gray-300 rounded-full font-medium hover:bg-gray-50 text-gray-700"
          disabled={isSubmitting}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </button>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-400"
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}