"use client"
import { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Later integrate with auth-store
  const isLoggedIn = false;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
      >
        <User size={22} className="text-gray-500"/>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          {isLoggedIn ? (
            <>
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
                Orders
              </Link>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  // Sign out logic
                  setIsOpen(false);
                }}
              >
                Sign Out
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