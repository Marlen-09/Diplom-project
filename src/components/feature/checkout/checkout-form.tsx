"use client";

import { useState } from "react";
import ShippingForm from "./shipping-form";
import PaymentForm from "./payment-form";
import ReviewOrder from "./review-order";

interface CheckoutFormProps {
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Типы для данных форм оформления заказа
export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: string;
}

export interface PaymentData {
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  savePaymentInfo: boolean;
}

export default function CheckoutForm({
  currentStep,
  goToNextStep,
  goToPreviousStep,
}: CheckoutFormProps) {
  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    shippingMethod: "standard",
  });
  
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    savePaymentInfo: false,
  });
  
  const handleShippingSubmit = (data: ShippingData) => {
    setShippingData(data);
    goToNextStep();
  };
  
  const handlePaymentSubmit = (data: PaymentData) => {
    setPaymentData(data);
    goToNextStep();
  };
  
  const handleOrderSubmit = () => {
    // Здесь будет логика отправки заказа
    console.log("Order submitted", { shippingData, paymentData });
    window.location.href = "/checkout/complete";
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {currentStep === 0 && (
        <ShippingForm 
          initialData={shippingData}
          onSubmit={handleShippingSubmit}
        />
      )}
      
      {currentStep === 1 && (
        <PaymentForm 
          initialData={paymentData}
          onSubmit={handlePaymentSubmit}
          onBack={goToPreviousStep}
        />
      )}
      
      {currentStep === 2 && (
        <ReviewOrder 
          shippingData={shippingData}
          paymentData={paymentData}
          onSubmit={handleOrderSubmit}
          onBack={goToPreviousStep}
        />
      )}
    </div>
  );
}