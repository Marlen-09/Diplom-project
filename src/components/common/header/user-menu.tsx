"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Не рендерим до монтирования компонента
  if (!mounted) {
    return (
      <div className="relative p-2">
        <User size={22} className="text-gray-500"/>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 flex items-center"
      >
        <User size={22} className="text-gray-500"/>
        {user && (
          <span className="ml-2 text-sm text-gray-700 hidden md:block">
            {user.firstName}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
          {user ? (
            <>
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              
              <Link 
                href="/account" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Link>
              <Link 
                href="/account/orders" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Order History
              </Link>
              <Link 
                href="/account/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Profile Settings
              </Link>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                onClick={handleLogout}
              >
                <div className="flex items-center">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </div>
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth/signin" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}