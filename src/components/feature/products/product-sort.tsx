"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Select } from "@/components/ui/select";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popularity", label: "Popularity" },
];

export default function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("newest");
  
  // Initialize from URL
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam && sortOptions.find(option => option.value === sortParam)) {
      setSortBy(sortParam);
    }
  }, [searchParams]);
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    
    router.push(`/products?${params.toString()}`);
  };
  
  return (
    <div className="flex items-center">
      <label className="text-sm text-gray-500 mr-2">Sort by:</label>
      <Select
        value={sortBy}
        onValueChange={handleSortChange}
        options={sortOptions}
      />
    </div>
  );
}