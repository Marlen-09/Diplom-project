"use client";

import { useState } from "react";
import ProductCard from "./product-card";
import Pagination from "@/components/ui/pagination";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  itemsPerPage?: number;
}

export default function ProductGrid({ 
  products, 
  itemsPerPage = 12 
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}