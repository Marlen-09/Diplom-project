"use client";

import { useState } from "react";
import { ShippingData } from "./checkout-form";

interface ShippingFormProps {
  initialData: ShippingData;
  onSubmit: (data: ShippingData) => void;
}

export default function ShippingForm({ initialData, onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name as keyof ShippingData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingData, string>> = {};
    let isValid = true;
    
    const requiredFields: (keyof ShippingData)[] = [
      "firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "country"
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (formData.phone && !/^\+?[\d\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
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
      <h2 className="text-xl font-bold mb-6 text-gray-900">Shipping Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-gray-900">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-gray-900">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-900">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-900">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        
        {/* Address Information */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1 text-gray-900">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1 text-gray-900">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1 text-gray-900">
              State/Province *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state}</p>
            )}
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1 text-gray-900">
              ZIP/Postal Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1 text-gray-900">
            Country *
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
          </select>
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
          )}
        </div>
        
        {/* Shipping Method */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Shipping Method</h3>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 border rounded-md">
              <input
                type="radio"
                id="shipping-standard"
                name="shippingMethod"
                value="standard"
                checked={formData.shippingMethod === "standard"}
                onChange={handleChange}
                className="mr-3"
              />
              <label htmlFor="shipping-standard" className="flex-1">
                <div className="font-medium text-gray-900">Standard Shipping</div>
                <div className="text-sm text-gray-600">Delivery in 4-6 business days</div>
              </label>
              <div className="font-medium text-gray-900">$5.99</div>
            </div>
            
            <div className="flex items-center p-3 border rounded-md">
              <input
                type="radio"
                id="shipping-express"
                name="shippingMethod"
                value="express"
                checked={formData.shippingMethod === "express"}
                onChange={handleChange}
                className="mr-3"
              />
              <label htmlFor="shipping-express" className="flex-1">
                <div className="font-medium text-gray-900">Express Shipping</div>
                <div className="text-sm text-gray-600">Delivery in 1-3 business days</div>
              </label>
              <div className="font-medium text-gray-900">$14.99</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}