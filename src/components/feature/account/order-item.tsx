"use client";

import { useState } from "react";
import Link from "next/link";
import { Order } from "@/types/order";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";

interface OrderItemProps {
  order: Order;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return {
        icon: Clock,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        label: "Pending"
      };
    case "processing":
      return {
        icon: Package,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        label: "Processing"
      };
    case "shipped":
      return {
        icon: Truck,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        label: "Shipped"
      };
    case "delivered":
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
        label: "Delivered"
      };
    case "cancelled":
      return {
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-100",
        label: "Cancelled"
      };
    default:
      return {
        icon: Package,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        label: "Unknown"
      };
  }
};

export default function OrderItem({ order }: OrderItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      {/* Основная информация о заказе */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                Order #{order.id}
              </h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                <StatusIcon size={16} className="mr-1" />
                {statusConfig.label}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p>Placed on {formatDate(order.createdAt)}</p>
              <p>{order.items.length} item{order.items.length > 1 ? 's' : ''} • Total: ${order.total.toFixed(2)}</p>
              {order.trackingNumber && (
                <p>Tracking: {order.trackingNumber}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {order.trackingNumber && (
              <Link
                href={`/orders/${order.id}/track`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                Track Package <ExternalLink size={14} className="ml-1" />
              </Link>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <span className="text-sm font-medium mr-1">
                {isExpanded ? "Less" : "More"} Details
              </span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Превью товаров */}
        <div className="mt-4 flex flex-wrap gap-2">
          {order.items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center bg-gray-50 rounded-lg p-2">
              <div className="h-10 w-10 bg-gray-200 rounded mr-3 flex-shrink-0">
                {/* Replace with actual image */}
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="flex items-center text-sm text-gray-600">
              +{order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Развернутая информация */}
      {isExpanded && (
        <div className="border-t bg-gray-50 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Товары в заказе */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center bg-white rounded-lg p-3">
                    <div className="h-12 w-12 bg-gray-200 rounded mr-4 flex-shrink-0">
                      {/* Replace with actual image */}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      {item.attributes && Object.entries(item.attributes).length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Object.entries(item.attributes).map(([key, value]) => (
                            <span key={key} className="mr-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Информация о доставке и оплате */}
            <div className="space-y-6">
              {/* Адрес доставки */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                <div className="text-sm text-gray-600 bg-white rounded-lg p-3">
                  <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
                  <p>{order.shippingInfo.address}</p>
                  <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                  <p>{order.shippingInfo.country}</p>
                </div>
              </div>

              {/* Информация об оплате */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                <div className="text-sm text-gray-600 bg-white rounded-lg p-3">
                  <p>Card ending in {order.paymentInfo.cardNumber}</p>
                  <p>{order.paymentInfo.cardName}</p>
                </div>
              </div>

              {/* Итоги заказа */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                <div className="text-sm bg-white rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Действия */}
          <div className="mt-6 pt-6 border-t flex flex-wrap gap-3">
            <Link
              href={`/orders/${order.id}`}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-medium"
            >
              View Order Details
            </Link>
            
            {order.status === "delivered" && (
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium">
                Leave Review
              </button>
            )}
            
            {(order.status === "pending" || order.status === "processing") && (
              <button className="border border-red-300 text-red-700 px-4 py-2 rounded-md hover:bg-red-50 text-sm font-medium">
                Cancel Order
              </button>
            )}
            
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium">
              Reorder Items
            </button>
          </div>
        </div>
      )}
    </div>
  );
}