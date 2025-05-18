export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images?: string[];
    category: string;
    description?: string;
    specifications?: Record<string, string>;
    attributes?: Record<string, string[]>;
    inStock?: boolean;
    rating?: number;
    reviewCount?: number;
  }