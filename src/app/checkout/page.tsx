"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/common/layout/breadcrumbs";
import CheckoutForm from "@/components/feature/checkout/checkout-form";
import OrderSummary from "@/components/feature/checkout/order-summary";
import { useCart } from "@/hooks/use-cart";

// Шаги оформления заказа
const CHECKOUT_STEPS = [
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Если корзина пуста, перенаправляем на страницу корзины
  useEffect(() => {
    if (mounted && !isLoading && cart.items.length === 0) {
      // Временно закомментировано для тестирования
      // router.push("/cart");
    }
  }, [mounted, isLoading, cart.items.length, router]);
  
  const goToNextStep = () => {
    if (currentStep < CHECKOUT_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-gray-200 rounded-full border-t-gray-800"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout", active: true },
        ]} 
      />
      
      <h1 className="text-3xl font-bold mt-6 mb-8 text-white">Checkout</h1>
      
      {/* Прогресс-бар */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {CHECKOUT_STEPS.map((step, index) => (
            <div 
              key={step.key} 
              className={`flex-1 text-center ${
                index === currentStep ? "font-bold" : ""
              }`}
            >
              <div className="relative mb-4">
                {/* Линия между шагами */}
                {index < CHECKOUT_STEPS.length - 1 && (
                  <div 
                    className={`absolute top-1/2 left-1/2 w-full h-0.5 transform -translate-y-1/2 ${
                      index < currentStep ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
                
                {/* Круг шага */}
                <div 
                  className={`relative mx-auto h-8 w-8 rounded-full flex items-center justify-center ${
                    index < currentStep ? "bg-black text-white" :
                    index === currentStep ? "bg-black text-white border-2 border-white shadow-md" : 
                    "bg-gray-200 text-gray-500"
                  }`}
                >
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
              </div>
              
              <div className={`text-sm capitalize ${
                index === currentStep ? "text-gray-900 font-medium" : "text-gray-600"
              }`}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm 
            currentStep={currentStep} 
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        </div>
        
        <div>
          <OrderSummary 
            subtotal={cart.subtotal}
            shipping={cart.shipping}
            tax={cart.tax}
            total={cart.total}
            items={cart.items}
          />
        </div>
      </div>
    </div>
  );
}