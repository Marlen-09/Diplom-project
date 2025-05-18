import React from "react";
import Breadcrumbs from "@/components/common/layout/breadcrumbs";
import MetaTags from "@/components/common/seo/meta-tags";
import Gallery from "@/components/feature/products/product-details/gallery";
import Info from "@/components/feature/products/product-details/info";
import Price from "@/components/feature/products/product-details/price";
import Attributes from "@/components/feature/products/product-details/attributes";
import AddToCart from "@/components/feature/products/product-details/add-to-card";
import Description from "@/components/feature/products/product-details/description";
import ReviewList from "@/components/feature/products/product-reviews/review-list";
import ReviewForm from "@/components/feature/products/product-reviews/review-form";
import { mockProducts } from "@/mocks/products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  // В будущем здесь будет запрос к API
  const product = mockProducts.find(p => p.slug === params.slug);
  
  if (!product) {
    // Будет отображен not-found.js
    return null;
  }

  return (
    <>
      <MetaTags 
        title={`${product.name} - ShopNext`} 
        description={product.description?.substring(0, 160) || `Buy ${product.name} at the best price`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name, href: `/products/${product.slug}`, active: true },
          ]} 
        />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product gallery */}
          <Gallery images={product.images || []} />
          
          {/* Product info */}
          <div>
            <Info product={product} />
            <Price price={product.price} discountPrice={product.discountPrice} />
            <Attributes attributes={product.attributes} />
            <AddToCart product={product} />
          </div>
        </div>
        
        {/* Product description */}
        <div className="mt-16">
          <Description description={product.description} specifications={product.specifications} />
        </div>
        
        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <ReviewList productId={product.id} />
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <ReviewForm productId={product.id} />
          </div>
        </div>
      </div>
    </>
  );
}