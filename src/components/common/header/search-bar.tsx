import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <Search size={18} />
      </button>
    </div>
  );
}