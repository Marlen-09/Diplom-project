"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  CreditCard, 
  Settings,
  LogOut 
} from "lucide-react";

const menuItems = [
  {
    label: "Account Overview",
    href: "/account",
    icon: User,
  },
  {
    label: "Order History",
    href: "/account/orders",
    icon: Package,
  },
  {
    label: "Profile Settings",
    href: "/account/profile",
    icon: Settings,
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    label: "Payment Methods",
    href: "/account/payment-methods",
    icon: CreditCard,
  }
];

export default function AccountMenu() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* User Info */}
      <div className="mb-6 pb-6 border-b">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt="Avatar" className="h-12 w-12 rounded-full" />
            ) : (
              <User size={24} className="text-gray-500" />
            )}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <IconComponent size={18} className="mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-6 pt-6 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}