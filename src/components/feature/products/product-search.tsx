"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  
  // Initialize query from URL
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [searchParams]);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    
    router.push(`/products?${params.toString()}`);
  };
  
  return (
    <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        <Search size={18} />
      </button>
    </form>
  );
}
