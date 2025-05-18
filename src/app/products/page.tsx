import React from "react";
import ProductGrid from "@/components/feature/products/product-grid";
import ProductFilter from "@/components/feature/products/product-filter";
import ProductSearch from "@/components/feature/products/product-search";
import ProductSort from "@/components/feature/products/product-sort";
import Breadcrumbs from "@/components/common/layout/breadcrumbs";
import MetaTags from "@/components/common/seo/meta-tags";

// В будущем заменим на реальные данные из API
import { mockProducts } from "@/mocks/products";

export default function ProductsPage() {
  return (
    <>
      <MetaTags 
        title="All Products - ShopNext" 
        description="Browse our collection of high-quality products."
      />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products", active: true },
          ]} 
        />
        
        <h1 className="text-3xl font-bold mt-6 mb-8">All Products</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-1/4">
            <ProductFilter />
          </div>
          
          {/* Products Grid with Search and Sort */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
              <ProductSearch />
              <ProductSort />
            </div>
            
            <ProductGrid products={mockProducts} />
          </div>
        </div>
      </div>
    </>
  );
}