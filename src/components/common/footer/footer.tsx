import Link from "next/link";
import Newsletter from "./newsletter";
import SocialLinks from "./social-links";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop info */}
          <div>
            <h3 className="text-lg font-bold mb-4">ShopNext</h3>
            <p className="text-gray-600 mb-4">
              Your destination for quality products with fast shipping and exceptional customer service.
            </p>
            <SocialLinks />
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-600 hover:text-gray-900">All Products</Link></li>
              <li><Link href="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link></li>
              <li><Link href="/products?deal=true" className="text-gray-600 hover:text-gray-900">Deals</Link></li>
              <li><Link href="/products?new=true" className="text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
            </ul>
          </div>
          
          {/* Customer service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-600 hover:text-gray-900">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <Newsletter />
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ShopNext. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}