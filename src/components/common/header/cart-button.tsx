import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function CartButton() {
  // Later integrate with cart-store
  const itemCount = 0;

  return (
    <Link href="/cart" className="relative p-2">
      <ShoppingBag size={22} className="text-gray-500" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}