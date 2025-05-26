import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    // image: string;
    slug: string;
    category: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200 mb-4">
          {/* Replace with actual product image */}
          <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-300" />
        </div>
      </Link>
      
      <div>
        <Link href={`/categories/${product.category}`} className="text-sm text-gray-500 hover:underline">
          {product.category}
        </Link>
        
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-lg mt-1 group-hover:text-gray-600">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          
          <button 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}