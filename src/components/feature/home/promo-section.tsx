import Link from "next/link";

export default function PromoSection() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-black">Free Shipping</h3>
            <p className="text-gray-600 mb-6">
              Enjoy free shipping on all orders over $50. Shop now and get your items delivered to your doorstep without any extra cost.
            </p>
            <Link 
              href="/shipping"
              className="text-black font-medium hover:underline"
            >
              Learn More →
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-black">Summer Sale</h3>
            <p className="text-gray-600 mb-6">
              Get up to 50% off on selected summer items. Limited time offer, shop now while supplies last!
            </p>
            <Link 
              href="/products?sale=true"
              className="text-black font-medium hover:underline"
            >
              Shop Sale →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}