// utils/apiHelpers.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getFullImageUrl, extractImagesFromModels } from './imageHelpers';

export interface ProductApiResponse {
  id: number;
  slug: string;
  Name: string;
  Description: string;
  Price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Image: any; 
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

export interface FormattedProduct {
  slug: string;
  Name: string;
  Description: string;
  Price: number;
  imageUrl: string;
  imageUrls: string[];
  brandName: string;
  brandSlug: string;
  categoryNames: string[];
  categoryIds: string[];
  categorySlugs: string[];
  genders: string[];
  colors: string[];
  sizes: number[];
}

export interface BrandWithProducts {
  name: string;
  slug: string;
  products: FormattedProduct[];
}

export const formatApiProduct = async (
  item: ProductApiResponse, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  models: any[]
): Promise<FormattedProduct> => {
  // Извлекаем URL-ы изображений из моделей
  const imageUrls = extractImagesFromModels(models, item.slug);
  
  // Собираем данные о цветах из моделей
  // eslint-disable-next-line prefer-const
  let modelColors: string[] = [];
  if (models && models.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchingModels = models.filter((model: any) => model.product?.slug === item.slug);
    
    if (matchingModels.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      matchingModels.forEach((model: any) => {
        if (model.color && model.color.Name) {
          if (!modelColors.includes(model.color.Name)) {
            modelColors.push(model.color.Name);
          }
        }
      });
    }
  }
  
  // Определяем итоговый список цветов
  const finalColors = modelColors.length > 0 
    ? modelColors 
    : (item.colors && Array.isArray(item.colors) 
        ? item.colors.map(c => c?.Name || '').filter(Boolean)
        : []);
  
  // Собираем информацию о категориях
  const categoryNames: string[] = [];
  const categoryIds: string[] = [];
  const categorySlugs: string[] = [];
  
  if (item.category) {
    const category = item.category;
    if (category.slug) {
      const categoryName = category.NameEngl || category.Name;
      
      if (categoryName) {
        categoryNames.push(categoryName);
        categoryIds.push(category.id);
        categorySlugs.push(category.slug);
      }
    }
  }
  
  // Получаем доступные размеры
  const sizes = item.sizes && Array.isArray(item.sizes)
    ? item.sizes.map(size => size.Size)
    : [];
  
  // Возвращаем отформатированный объект продукта
  return {
    slug: item.slug || 'no-slug',
    Name: item.Name || 'No name',
    Description: item.Description || '',
    Price: item.Price || 0,
    imageUrl: imageUrls.length > 0 ? imageUrls[0] : '/placeholder-image.jpg',
    imageUrls: imageUrls,
    brandName: item.brand?.Brand_Name || 'Unknown Brand',
    brandSlug: item.brand?.slug || 'unknown-brand',
    categoryNames,
    categoryIds,
    categorySlugs,
    genders: item.genders && Array.isArray(item.genders) 
      ? item.genders.map(g => g?.Geander_Name || '').filter(Boolean)
      : [],
    colors: finalColors,
    sizes: sizes,
  };
};

export const groupProductsByBrand = (products: FormattedProduct[]): BrandWithProducts[] => {
  const brandMap = new Map<string, BrandWithProducts>();
  
  products.forEach(product => {
    if (!brandMap.has(product.brandSlug)) {
      brandMap.set(product.brandSlug, {
        name: product.brandName,
        slug: product.brandSlug,
        products: []
      });
    }
    
    brandMap.get(product.brandSlug)?.products.push(product);
  });
  
  // Преобразуем Map в массив
  return Array.from(brandMap.values());
};