"use client";

import { useState, useEffect } from "react";
import OrderItem from "./order-item";
import { Order } from "@/types/order";
import { Package, Search, Filter } from "lucide-react";

// Моковые данные заказов для демо
const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    userId: "user-123",
    items: [
      {
        id: "item-1",
        productId: "1",
        name: "Premium Headphones",
        price: 99.99,
        quantity: 1,
        image: "/placeholder.jpg",
        attributes: { Color: "Black" }
      }
    ],
    shippingInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      shippingMethod: "standard"
    },
    paymentInfo: {
      cardName: "John Doe",
      cardNumber: "1234",
      expDate: "12/25",
      savePaymentInfo: false
    },
    subtotal: 99.99,
    shipping: 0,
    tax: 8.00,
    total: 107.99,
    status: "delivered",
    createdAt: "2024-12-15T10:30:00Z",
    updatedAt: "2024-12-18T14:20:00Z",
    estimatedDelivery: "2024-12-20T00:00:00Z",
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD-2024-002",
    userId: "user-123",
    items: [
      {
        id: "item-2",
        productId: "3",
        name: "Smart Watch",
        price: 179.99,
        quantity: 1,
        image: "/placeholder.jpg",
        attributes: { Color: "Silver", "Band Material": "Silicone" }
      }
    ],
    shippingInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      shippingMethod: "express"
    },
    paymentInfo: {
      cardName: "John Doe",
      cardNumber: "1234",
      expDate: "12/25",
      savePaymentInfo: false
    },
    subtotal: 179.99,
    shipping: 14.99,
    tax: 14.40,
    total: 209.38,
    status: "shipped",
    createdAt: "2024-12-10T15:45:00Z",
    updatedAt: "2024-12-12T09:15:00Z",
    estimatedDelivery: "2024-12-25T00:00:00Z",
    trackingNumber: "TRK987654321"
  },
  {
    id: "ORD-2024-003",
    userId: "user-123",
    items: [
      {
        id: "item-3",
        productId: "2",
        name: "Leather Wallet",
        price: 49.99,
        quantity: 2,
        image: "/placeholder.jpg",
        attributes: { Color: "Brown" }
      }
    ],
    shippingInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      shippingMethod: "standard"
    },
    paymentInfo: {
      cardName: "John Doe",
      cardNumber: "1234",
      expDate: "12/25",
      savePaymentInfo: false
    },
    subtotal: 99.98,
    shipping: 0,
    tax: 8.00,
    total: 107.98,
    status: "processing",
    createdAt: "2024-12-20T12:00:00Z",
    updatedAt: "2024-12-20T12:00:00Z",
    estimatedDelivery: "2024-12-28T00:00:00Z"
  }
];

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    // Имитация загрузки заказов
    const fetchOrders = async () => {
      setIsLoading(true);
      // В реальном приложении здесь будет API запрос
      setTimeout(() => {
        setOrders(mockOrders);
        setIsLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  // Фильтрация заказов
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-gray-200 rounded-full border-t-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Фильтры и поиск */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Поиск */}
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Фильтр по статусу */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Список заказов */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="flex justify-center mb-4">
            <Package size={64} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== "all" ? "No orders found" : "No orders yet"}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "When you place orders, they will appear here"
            }
          </p>
          {!searchTerm && statusFilter === "all" && (
            // eslint-disable-next-line @next/next/no-html-link-for-pages
            <a 
              href="/products" 
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800"
            >
              Start Shopping
            </a>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}

      {/* Статистика */}
      {orders.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Order Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === "delivered").length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === "shipped").length}
              </div>
              <div className="text-sm text-gray-600">In Transit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}