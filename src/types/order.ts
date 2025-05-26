import { CartItem } from "./cart";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface ShippingInfo {
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

export interface PaymentInfo {
  cardName: string;
  cardNumber: string; // Только последние 4 цифры
  expDate: string;
  savePaymentInfo: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}