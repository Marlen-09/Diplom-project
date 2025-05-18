interface PriceProps {
    price: number;
    discountPrice?: number;
  }
  
  export default function Price({ price, discountPrice }: PriceProps) {
    const hasDiscount = discountPrice !== undefined && discountPrice < price;
    const discountPercentage = hasDiscount 
      ? Math.round(((price - discountPrice!) / price) * 100) 
      : 0;
    
    return (
      <div className="mb-6">
        <div className="flex items-center">
          {hasDiscount ? (
            <>
              <span className="text-2xl font-bold text-red-600">
                ${discountPrice!.toFixed(2)}
              </span>
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                Save {discountPercentage}%
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    );
  }