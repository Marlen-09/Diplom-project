"use client"
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// Nav items array - later move this to navigation config

const navItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "Deals", href: "/products?deal=true" },
  // Временная ссылка для тестирования
  { label: "Checkout Test", href: "/checkout" },
];

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white pt-16">
            <ul className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-gray-700 hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}