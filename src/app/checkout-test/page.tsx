// src/app/checkout-test/page.tsx
"use client";

import Link from "next/link";

export default function CheckoutTestPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout Testing Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Test Pages</h2>
          <div className="space-y-2">
            <div>
              <Link 
                href="/checkout" 
                className="text-blue-600 hover:underline"
              >
                Checkout Page (Full Flow)
              </Link>
            </div>
            <div>
              <Link 
                href="/checkout/complete" 
                className="text-blue-600 hover:underline"
              >
                Order Complete Page
              </Link>
            </div>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Test Configuration</h2>
          <p className="mb-2">
            The mock cart contains:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Premium Headphones - $99.99</li>
            <li>Smart Watch - $179.99</li>
          </ul>
        </div>
      </div>
    </div>
  );
}