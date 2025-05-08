import Link from "next/link";

// Mock categories - will be replaced with actual API call
const categories = [
  {
    id: "1",
    name: "Electronics",
    image: "/placeholder.jpg",
    slug: "electronics",
  },
  {
    id: "2",
    name: "Clothing",
    image: "/placeholder.jpg",
    slug: "clothing",
  },
  {
    id: "3",
    name: "Home & Garden",
    image: "/placeholder.jpg",
    slug: "home-garden",
  },
  {
    id: "4",
    name: "Beauty",
    image: "/placeholder.jpg",
    slug: "beauty",
  },
];

export default function CategoriesShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group"
        >
          <div className="relative h-64 rounded-lg overflow-hidden bg-gray-200">
            {/* Replace with actual category image */}
            <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
              <h3 className="text-white text-xl font-medium">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}