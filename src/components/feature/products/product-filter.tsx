"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

// Мок категорий и фильтров, в будущем будет приходить с API
const filterCategories = [
  {
    name: "Categories",
    options: [
      { id: "electronics", label: "Electronics", count: 42 },
      { id: "clothing", label: "Clothing", count: 36 },
      { id: "home-garden", label: "Home & Garden", count: 28 },
      { id: "beauty", label: "Beauty", count: 15 },
    ],
  },
  {
    name: "Price",
    options: [
      { id: "under-50", label: "Under $50", count: 25 },
      { id: "50-100", label: "$50 - $100", count: 30 },
      { id: "100-200", label: "$100 - $200", count: 22 },
      { id: "over-200", label: "Over $200", count: 15 },
    ],
  },
];

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize filters from URL
  useEffect(() => {
    const newFilters: Record<string, string[]> = {};
    
    // Extract category filters
    const categories = searchParams.get("categories")?.split(",") || [];
    if (categories.length > 0) {
      newFilters.categories = categories;
    }
    
    // Extract price filters
    const prices = searchParams.get("price")?.split(",") || [];
    if (prices.length > 0) {
      newFilters.price = prices;
    }
    
    setSelectedFilters(newFilters);
  }, [searchParams]);
  
  // Apply filters to URL
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear existing filters
    params.delete("categories");
    params.delete("price");
    
    // Add new filters
    if (selectedFilters.categories?.length) {
      params.set("categories", selectedFilters.categories.join(","));
    }
    
    if (selectedFilters.price?.length) {
      params.set("price", selectedFilters.price.join(","));
    }
    
    router.push(`/products?${params.toString()}`);
  };
  
  // Toggle filter option
  const toggleFilter = (category: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      
      const index = newFilters[category].indexOf(optionId);
      
      if (index === -1) {
        newFilters[category] = [...newFilters[category], optionId];
      } else {
        newFilters[category] = newFilters[category].filter(id => id !== optionId);
        
        if (newFilters[category].length === 0) {
          delete newFilters[category];
        }
      }
      
      return newFilters;
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({});
    router.push("/products");
  };
  
  // Check if the option is selected
  const isSelected = (category: string, optionId: string) => {
    return selectedFilters[category]?.includes(optionId) || false;
  };
  
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black text-lg font-semibold">Filters</h2>
        
        {/* Mobile toggle */}
        <button 
          className="lg:hidden text-gray-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : "Show"}
        </button>
        
        {/* Clear filters */}
        {Object.keys(selectedFilters).length > 0 && (
          <button 
            className="text-sm text-blue-600 hover:underline"
            onClick={clearFilters}
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        {filterCategories.map((category) => (
          <div key={category.name} className="mb-6">
            <h3 className="text-black font-medium mb-3">{category.name}</h3>
            
            <div className="space-y-2">
              {category.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <Checkbox
                    id={`filter-${option.id}`}
                    checked={isSelected(category.name.toLowerCase(), option.id)}
                    onCheckedChange={() => toggleFilter(category.name.toLowerCase(), option.id)}
                  />
                  <label 
                    htmlFor={`filter-${option.id}`}
                    className="ml-2 text-sm text-gray-600 cursor-pointer flex-grow"
                  >
                    {option.label}
                  </label>
                  <span className="text-xs text-gray-400">({option.count})</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <button
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors mt-4"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}