import { Product } from "@/types/product";
import { Star } from "lucide-react";

interface InfoProps {
  product: Product;
}

export default function Info({ product }: InfoProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        {/* Rating Stars */}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < Math.floor(product.rating || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        
        <span className="ml-2 text-sm text-gray-600">
          {product.rating?.toFixed(1)} ({product.reviewCount} reviews)
        </span>
        
        <span className="mx-2 text-gray-300">|</span>
        
        <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      
      {/* Short description if available */}
      {product.description && (
        <p className="text-gray-600 mt-4">
          {product.description.substring(0, 150)}
          {product.description.length > 150 ? '...' : ''}
        </p>
      )}
    </div>
  );
}