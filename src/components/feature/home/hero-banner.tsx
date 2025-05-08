import Link from "next/link"

export default function HeroBanner() {
  return (
    <div className="relative bg-gray-100 h-[60vh] min-h-[400px] flex items-center">
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            New Season Arrivals
          </h1>
          <p className="text-lg mb-8">
            Discover the latest trends and styles for the new season with our exclusive collection.
          </p>
          <div className="flex space-x-4">
            <Link 
              href="/products?new=true"
              className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
            <Link 
              href="/categories"
              className="bg-white text-black px-6 py-3 rounded-full font-medium border border-black hover:bg-gray-100 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background image - replace with actual product image */}
      <div className="absolute inset-0 flex justify-end items-center overflow-hidden">
        <div className="relative h-full w-1/2 hidden md:block">
          {/* Replace with actual product image */}
          <div className="w-full h-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}