"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalPages,
  onPageChange 
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    
    // Show first page
    if (currentPage > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 rounded-md hover:bg-gray-100"
        >
          1
        </button>
      );
      
      if (currentPage > 4) {
        pages.push(
          <span key="ellipsis1" className="px-3 py-2">
            ...
          </span>
        );
      }
    }
    
    // Show pages around current page
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 rounded-md ${
            currentPage === i
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(
          <span key="ellipsis2" className="px-3 py-2">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 rounded-md hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };
  
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mr-2 p-2 rounded-md ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="flex">{renderPageNumbers()}</div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`ml-2 p-2 rounded-md ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}