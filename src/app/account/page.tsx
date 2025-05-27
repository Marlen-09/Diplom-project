"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import Breadcrumbs from "@/components/common/layout/breadcrumbs";
import AccountMenu from "@/components/feature/account/account-menu";
import { Package, User, MapPin, Heart, CreditCard } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Если пользователь не авторизован, перенаправляем на страницу входа
  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/auth/signin");
    }
  }, [mounted, isLoading, user, router]);

  if (!mounted || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-gray-200 rounded-full border-t-gray-800"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Будет перенаправление
  }

  const quickActions = [
    {
      title: "Order History",
      description: "View your past orders and track current ones",
      icon: Package,
      href: "/account/orders",
      color: "text-blue-600"
    },
    {
      title: "Profile Settings",
      description: "Update your personal information",
      icon: User,
      href: "/account/profile",
      color: "text-green-600"
    },
    {
      title: "Addresses",
      description: "Manage your shipping and billing addresses",
      icon: MapPin,
      href: "/account/addresses",
      color: "text-purple-600"
    },
    {
      title: "Wishlist",
      description: "Items you've saved for later",
      icon: Heart,
      href: "/account/wishlist",
      color: "text-red-600"
    },
    {
      title: "Payment Methods",
      description: "Manage your saved payment methods",
      icon: CreditCard,
      href: "/account/payment-methods",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        items={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account", active: true },
        ]} 
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <AccountMenu />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.firstName}!</h1>
            <p className="text-gray-600 mt-2">Manage your account and track your orders</p>
          </div>

          {/* Account Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg bg-gray-50 ${action.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package size={20} className="text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Order Delivered</p>
                    <p className="text-xs text-gray-600">Order #ORD-12345678 was delivered</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart size={20} className="text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Item Added to Wishlist</p>
                    <p className="text-xs text-gray-600">Smart Watch added to your wishlist</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Profile Updated</p>
                    <p className="text-xs text-gray-600">Your profile information was updated</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">2 weeks ago</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Link 
                href="/account/orders" 
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}