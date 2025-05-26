"use client";

import { useState } from "react";
import { PaymentData } from "./checkout-form";
import { CreditCard, ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PaymentFormProps {
  initialData: PaymentData;
  onSubmit: (data: PaymentData) => void;
  onBack: () => void;
}

export default function PaymentForm({ 
  initialData, 
  onSubmit, 
  onBack 
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentData, string>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    if (errors[name as keyof PaymentData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PaymentData, string>> = {};
    let isValid = true;
    
    const requiredFields: (keyof PaymentData)[] = [
      "cardName", "cardNumber", "expDate", "cvv"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });
    
    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
      isValid = false;
    }
    
    if (formData.expDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expDate)) {
      newErrors.expDate = "Please use MM/YY format";
      isValid = false;
    }
    
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-900">Payment Method</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg flex items-center mb-6">
          <CreditCard className="text-gray-600 mr-3" size={24} />
          <div>
            <p className="font-medium text-gray-900">Credit or Debit Card</p>
            <p className="text-sm text-gray-600">Safe payment online using your credit card.</p>
          </div>
        </div>
        
        <div>
          <label htmlFor="cardName" className="block text-sm font-medium mb-1 text-gray-900">
            Name on Card *
          </label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
              errors.cardName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cardName && (
            <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1 text-gray-900">
            Card Number *
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="XXXX XXXX XXXX XXXX"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
              errors.cardNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expDate" className="block text-sm font-medium mb-1 text-gray-900">
              Expiration Date *
            </label>
            <input
              type="text"
              id="expDate"
              name="expDate"
              value={formData.expDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.expDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.expDate && (
              <p className="text-red-500 text-xs mt-1">{errors.expDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium mb-1 text-gray-900">
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVC"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.cvv ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            <Checkbox
              id="savePaymentInfo"
              checked={formData.savePaymentInfo}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, savePaymentInfo: checked as boolean })
              }
            />
            <label htmlFor="savePaymentInfo" className="ml-2 text-sm text-gray-800">
              Save this card for future purchases
            </label>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center py-2 px-4 border border-gray-300 rounded-full font-medium hover:bg-gray-50 text-gray-700"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
}