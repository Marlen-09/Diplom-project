"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { ShoppingCart, Heart, Plus, Minus } from "lucide-react";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const addToCart = () => {
    // В будущем здесь будет интеграция с корзиной
    console.log(`Adding ${quantity} of ${product.name} to cart`);
    
    // Можно было бы использовать хук useCart
    // addToCart({ ...product, quantity });
  };
  
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // В будущем здесь будет интеграция со списком желаний
  };
  
  return (
    <div>
      {/* Quantity Selector */}
      <div className="flex items-center mb-6">
        <span className="text-sm font-medium mr-4">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className={`p-2 ${
              quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
            }`}
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button 
            onClick={incrementQuantity} 
            className="p-2 text-gray-600"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={addToCart}
          disabled={!product.inStock}
          className={`flex-1 flex justify-center items-center gap-2 py-3 px-6 rounded-full font-medium
            ${
              product.inStock
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
        
        <button
          onClick={toggleWishlist}
          className={`p-3 rounded-full border
            ${
              isWishlisted
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            }`}
        >
          <Heart
            size={20}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
}