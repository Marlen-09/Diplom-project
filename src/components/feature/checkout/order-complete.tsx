"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Truck } from "lucide-react";

interface OrderCompleteProps {
  orderNumber: string;
  orderDate: string;
}

export default function OrderComplete({ 
  orderNumber, 
  orderDate 
}: OrderCompleteProps) {
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date | null>(null);
  
  useEffect(() => {
    // Расчет примерной даты доставки (5-7 рабочих дней)
    const delivery = new Date(orderDate);
    delivery.setDate(delivery.getDate() + 5 + Math.floor(Math.random() * 3));
    setEstimatedDelivery(delivery);
  }, [orderDate]);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(date);
  };
  
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="text-left space-y-4">
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <h2 className="font-bold text-xl text-gray-900">Order Summary</h2>
            <p className="text-gray-700">Order #{orderNumber}</p>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Calendar size={16} className="mr-1" />
            <span>{formatDate(new Date(orderDate))}</span>
          </div>
        </div>
        
        <div className="py-4 border-b">
          <h3 className="font-medium mb-3 text-gray-900">Order Status</h3>
          
          <div className="relative">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white z-10">
                <Clock size={16} />
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Order Placed</p>
                <p className="text-sm text-gray-700">{formatDate(new Date(orderDate))}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 z-10">
                <Truck size={16} />
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">Estimated Delivery</p>
                {estimatedDelivery && (
                  <p className="text-sm text-gray-700">{formatDate(estimatedDelivery)}</p>
                )}
              </div>
            </div>
            
            <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-300 -translate-x-1/2"></div>
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="font-medium mb-3 text-gray-900">Need Help?</h3>
          <p className="text-sm text-gray-700 mb-2">
            If you have any questions or concerns about your order, please contact our customer service team.
          </p>
          <a 
            href="mailto:support@shopnext.com" 
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            support@shopnext.com
          </a>
        </div>
      </div>
    </div>
  );
}