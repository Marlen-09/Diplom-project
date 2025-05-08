
import ProductCard from "@/components/feature/products/product-card";

// Mock products - will be replaced with actual API call
const mockProducts = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 129.99,
    image: "/placeholder.jpg",
    slug: "premium-headphones",
    category: "electronics",
  },
  {
    id: "2",
    name: "Leather Wallet",
    price: 49.99,
    image: "/placeholder.jpg",
    slug: "leather-wallet",
    category: "accessories",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.jpg",
    slug: "smart-watch",
    category: "electronics",
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    price: 24.99,
    image: "/placeholder.jpg",
    slug: "cotton-tshirt",
    category: "clothing",
  },
];

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}