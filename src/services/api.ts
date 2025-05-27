// services/api.ts
const API_URL = "http://localhost:1337/api";
export const IMG_API = "http://localhost:1337";

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Product {
  id: number;
  slug: string;
  Name: string;
  Description: string;
  Price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Image?: any;
  brand?: {
    id: number;
    slug: string;
    Brand_Name: string;
  };
  category?: {
    id: string;
    slug: string;
    Name: string;
    NameEngl?: string;
  };
  genders: Array<{ Geander_Name: string }>;
  colors: Array<{ Name: string }>;
  sizes?: Array<{ id: number; Size: number }>;
}

export interface Category {
  id: number;
  slug: string;
  Name: string;
  NameEngl?: string;
}

export interface Model {
  id: number;
  product?: {
    slug: string;
  };
  color?: {
    id: number;
    Name: string;
    colorCode?: string;
  };
  images?: Array<{
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  }>;
}

// Fetch products from Strapi
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: StrapiResponse<Product[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    return [];
  }
};

// Fetch categories from Strapi
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_URL}/categories?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: StrapiResponse<Category[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Ошибка загрузки категорий:", error);
    return [];
  }
};

// Fetch models from Strapi
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchModels = async (productId?: string): Promise<Model[]> => {
  try {
    const response = await fetch(`${API_URL}/models?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: StrapiResponse<Model[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Ошибка загрузки моделей:", error);
    return [];
  }
};

// Fetch product by slug
export const fetchProductById = async (slug: string): Promise<StrapiResponse<Product[]>> => {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const response = await fetch(
      `${API_URL}/products?filters[slug][$eq]=${encodedSlug}&populate=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось получить данные о товаре");
    }

    const data: StrapiResponse<Product[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    throw error;
  }
};

// Fetch models by product ID
export const fetchModelsByProductId = async (productId: number): Promise<Model[]> => {
  try {
    const response = await fetch(
      `${API_URL}/models?filters[product][id][$eq]=${productId}&populate=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить модели");
    }

    const result: StrapiResponse<Model[]> = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Ошибка при загрузке моделей:", error);
    return [];
  }
};