// services/searchService.ts
import { formatApiProduct } from "@/utils/apiHelpers";
import { fetchModels, fetchProducts } from "./api";
import { Product } from "@/utils/productHelpers";

export interface SearchFilters {
  brands?: string[];
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  genders?: string[];
  colors?: string[];
  sizes?: number[];
}

export interface SearchOptions {
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'popular' | 'newest';
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  products: Product[];
  total: number;
  hasMore: boolean;
}

export interface FilterOptions {
  brands: Array<{ slug: string; name: string; count: number }>;
  categories: Array<{ slug: string; name: string; count: number }>;
  genders: Array<{ name: string; count: number }>;
  colors: Array<{ name: string; count: number }>;
  sizes: Array<{ size: number; count: number }>;
  priceRange: { min: number; max: number };
}

// Кэш для хранения полученных продуктов
let productsCache: Product[] = [];
let lastCacheUpdate: number = 0;
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 минут в миллисекундах

/**
 * Поиск товаров с поддержкой фильтров, сортировки и пагинации
 */
export const searchProducts = async (
  query: string, 
  filters?: SearchFilters,
  options?: SearchOptions
): Promise<SearchResult> => {
  try {
    // Проверяем кэш
    const now = Date.now();
    if (productsCache.length === 0 || (now - lastCacheUpdate) > CACHE_EXPIRY) {
      await updateProductsCache();
    }

    let results = [...productsCache];

    // Применяем поиск по запросу
    if (query && query.trim().length > 0) {
      results = performTextSearch(results, query);
    }

    // Применяем фильтры
    if (filters) {
      results = applyFilters(results, filters);
    }

    // Применяем сортировку
    if (options?.sortBy) {
      results = applySorting(results, options.sortBy);
    }

    // Применяем пагинацию
    const total = results.length;
    const offset = options?.offset || 0;
    const limit = options?.limit || 20;
    
    const paginatedResults = results.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return {
      products: paginatedResults,
      total,
      hasMore
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return {
      products: [],
      total: 0,
      hasMore: false
    };
  }
};

/**
 * Обновление кэша продуктов
 */
const updateProductsCache = async (): Promise<void> => {
  try {
    const allProducts = await fetchProducts();
    
    if (!allProducts || !Array.isArray(allProducts)) {
      productsCache = [];
      return;
    }
    
    // Форматируем продукты
    const formattedProducts = await Promise.all(allProducts.map(async (item) => {
      const models = await fetchModels(item.slug);
      return formatApiProduct(item, models);
    }));
    
    productsCache = formattedProducts;
    lastCacheUpdate = Date.now();
  } catch (error) {
    console.error('Error updating products cache:', error);
    productsCache = [];
  }
};

/**
 * Выполнение текстового поиска
 */
const performTextSearch = (products: Product[], query: string): Product[] => {
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  // Функция для определения релевантности результата
  const calculateRelevance = (product: Product): number => {
    let score = 0;
    
    // Проверяем каждое слово запроса
    for (const term of searchTerms) {
      // Проверяем название (наивысший приоритет)
      if (product.Name.toLowerCase().includes(term)) {
        score += 10;
        
        // Еще больше очков за точное совпадение слова
        if (product.Name.toLowerCase().split(/\s+/).includes(term)) {
          score += 5;
        }
        
        // Бонус за совпадение в начале названия
        if (product.Name.toLowerCase().startsWith(term)) {
          score += 3;
        }
      }
      
      // Проверяем бренд (высокий приоритет)
      if (product.brandName.toLowerCase().includes(term)) {
        score += 7;
        
        if (product.brandName.toLowerCase() === term) {
          score += 3;
        }
      }
      
      // Проверяем категории (средний приоритет)
      product.categoryNames.forEach(category => {
        if (category.toLowerCase().includes(term)) {
          score += 5;
        }
      });
      
      // Проверяем описание (низкий приоритет)
      if (product.Description && product.Description.toLowerCase().includes(term)) {
        score += 2;
      }
      
      // Проверяем цвета (низкий приоритет)
      product.colors.forEach(color => {
        if (color.toLowerCase().includes(term)) {
          score += 1;
        }
      });
      
      // Проверяем пол (низкий приоритет)
      product.genders.forEach(gender => {
        if (gender.toLowerCase().includes(term)) {
          score += 1;
        }
      });
    }
    
    return score;
  };
  
  // Фильтруем продукты, оставляя только те, у которых ненулевая релевантность
  return products
    .map(product => ({
      product,
      relevance: calculateRelevance(product)
    }))
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance) // Сортируем по релевантности
    .map(item => item.product);
};

/**
 * Применение фильтров к списку продуктов
 */
const applyFilters = (products: Product[], filters: SearchFilters): Product[] => {
  let filtered = [...products];
  
  // Фильтр по брендам
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter(product =>
      filters.brands!.some(brand => 
        product.brandSlug === brand || product.brandName.toLowerCase() === brand.toLowerCase()
      )
    );
  }
  
  // Фильтр по категориям
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      product.categoryNames.some(cat => 
        filters.categories!.some(filterCat => 
          cat.toLowerCase() === filterCat.toLowerCase()
        )
      ) ||
      product.categorySlugs.some(slug => 
        filters.categories!.includes(slug)
      )
    );
  }
  
  // Фильтр по цене
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(product => product.Price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(product => product.Price <= filters.maxPrice!);
  }
  
  // Фильтр по полу
  if (filters.genders && filters.genders.length > 0) {
    filtered = filtered.filter(product =>
      product.genders.some(gender => 
        filters.genders!.some(filterGender => 
          gender.toLowerCase() === filterGender.toLowerCase()
        )
      )
    );
  }
  
  // Фильтр по цветам
  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter(product =>
      product.colors.some(color => 
        filters.colors!.some(filterColor => 
          color.toLowerCase() === filterColor.toLowerCase()
        )
      )
    );
  }
  
  // Фильтр по размерам
  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter(product =>
      product.sizes.some(size => filters.sizes!.includes(size))
    );
  }
  
  return filtered;
};

/**
 * Применение сортировки
 */
const applySorting = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => a.Price - b.Price);
      
    case 'price_desc':
      return sorted.sort((a, b) => b.Price - a.Price);
      
    case 'name_asc':
      return sorted.sort((a, b) => a.Name.localeCompare(b.Name));
      
    case 'name_desc':
      return sorted.sort((a, b) => b.Name.localeCompare(a.Name));
      
    case 'newest':
      // Предполагаем, что продукты с большим ID новее
      return sorted.sort((a, b) => {
        const aId = parseInt(a.slug.replace(/\D/g, '')) || 0;
        const bId = parseInt(b.slug.replace(/\D/g, '')) || 0;
        return bId - aId;
      });
      
    case 'popular':
    default:
      // Для популярности можно использовать различные метрики
      // Пока что просто возвращаем исходный порядок
      return sorted;
  }
};

/**
 * Получение всех доступных фильтров с подсчетом количества
 */
export const getAvailableFilters = async (query?: string, currentFilters?: SearchFilters): Promise<FilterOptions> => {
  try {
    // Обновляем кэш если нужно
    const now = Date.now();
    if (productsCache.length === 0 || (now - lastCacheUpdate) > CACHE_EXPIRY) {
      await updateProductsCache();
    }

    let products = [...productsCache];

    // Применяем поиск по запросу, если он есть
    if (query && query.trim().length > 0) {
      products = performTextSearch(products, query);
    }

    // Применяем текущие фильтры (кроме того фильтра, для которого мы собираем опции)
    if (currentFilters) {
      // Для каждого типа фильтра создаем временные фильтры без этого типа
      // Это позволяет показывать доступные опции с учетом других фильтров
    }

    // Собираем статистику
    const brandCounts = new Map<string, { name: string; count: number }>();
    const categoryCounts = new Map<string, { name: string; count: number }>();
    const genderCounts = new Map<string, number>();
    const colorCounts = new Map<string, number>();
    const sizeCounts = new Map<number, number>();
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach(product => {
      // Бренды
      const brandKey = product.brandSlug;
      if (brandKey) {
        const current = brandCounts.get(brandKey) || { name: product.brandName, count: 0 };
        brandCounts.set(brandKey, { ...current, count: current.count + 1 });
      }

      // Категории
      product.categorySlugs.forEach((slug, index) => {
        const name = product.categoryNames[index] || 'Unnamed';
        const current = categoryCounts.get(slug) || { name, count: 0 };
        categoryCounts.set(slug, { ...current, count: current.count + 1 });
      });

      // Пол
      product.genders.forEach(gender => {
        genderCounts.set(gender, (genderCounts.get(gender) || 0) + 1);
      });

      // Цвета
      product.colors.forEach(color => {
        colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
      });

      // Размеры
      product.sizes.forEach(size => {
        sizeCounts.set(size, (sizeCounts.get(size) || 0) + 1);
      });

      // Цены
      if (product.Price < minPrice) minPrice = product.Price;
      if (product.Price > maxPrice) maxPrice = product.Price;
    });

    return {
      brands: Array.from(brandCounts.entries())
        .map(([slug, data]) => ({ slug, name: data.name, count: data.count }))
        .sort((a, b) => b.count - a.count),
        
      categories: Array.from(categoryCounts.entries())
        .map(([slug, data]) => ({ slug, name: data.name, count: data.count }))
        .sort((a, b) => b.count - a.count),
        
      genders: Array.from(genderCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
        
      colors: Array.from(colorCounts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
        
      sizes: Array.from(sizeCounts.entries())
        .map(([size, count]) => ({ size, count }))
        .sort((a, b) => a.size - b.size),
        
      priceRange: { 
        min: minPrice === Infinity ? 0 : minPrice, 
        max: maxPrice || 100000 
      }
    };

  } catch (error) {
    console.error('Ошибка при получении фильтров:', error);
    return getEmptyFilters();
  }
};

/**
 * Получение похожих товаров
 */
export const getSimilarProducts = async (product: Product, limit: number = 4): Promise<Product[]> => {
  try {
    // Обновляем кэш если нужно
    const now = Date.now();
    if (productsCache.length === 0 || (now - lastCacheUpdate) > CACHE_EXPIRY) {
      await updateProductsCache();
    }

    const similarProducts = productsCache
      .filter(p => p.slug !== product.slug) // Исключаем сам продукт
      .map(p => ({
        product: p,
        similarity: calculateSimilarity(product, p)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.product);

    return similarProducts;
  } catch (error) {
    console.error('Error getting similar products:', error);
    return [];
  }
};

/**
 * Вычисление похожести товаров
 */
const calculateSimilarity = (product1: Product, product2: Product): number => {
  let similarity = 0;

  // Совпадение бренда (высокий вес)
  if (product1.brandSlug === product2.brandSlug) {
    similarity += 5;
  }

  // Совпадение категории (высокий вес)
  const hasCommonCategory = product1.categorySlugs.some(cat => 
    product2.categorySlugs.includes(cat)
  );
  if (hasCommonCategory) {
    similarity += 4;
  }

  // Похожая цена (средний вес)
  const priceDiff = Math.abs(product1.Price - product2.Price);
  const maxPrice = Math.max(product1.Price, product2.Price);
  if (maxPrice > 0) {
    const priceRatio = 1 - (priceDiff / maxPrice);
    if (priceRatio > 0.8) similarity += 3;
    else if (priceRatio > 0.6) similarity += 2;
    else if (priceRatio > 0.4) similarity += 1;
  }

  // Совпадение пола (средний вес)
  const hasCommonGender = product1.genders.some(gender => 
    product2.genders.includes(gender)
  );
  if (hasCommonGender) {
    similarity += 2;
  }

  // Совпадение цветов (низкий вес)
  const hasCommonColor = product1.colors.some(color => 
    product2.colors.includes(color)
  );
  if (hasCommonColor) {
    similarity += 1;
  }

  return similarity;
};

/**
 * Автодополнение для поиска
 */
export const getSearchSuggestions = async (query: string, limit: number = 5): Promise<string[]> => {
  try {
    if (query.length < 2) return [];

    // Обновляем кэш если нужно
    const now = Date.now();
    if (productsCache.length === 0 || (now - lastCacheUpdate) > CACHE_EXPIRY) {
      await updateProductsCache();
    }

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    productsCache.forEach(product => {
      // Предложения из названий продуктов
      if (product.Name.toLowerCase().includes(queryLower)) {
        suggestions.add(product.Name);
      }

      // Предложения из брендов
      if (product.brandName.toLowerCase().includes(queryLower)) {
        suggestions.add(product.brandName);
      }

      // Предложения из категорий
      product.categoryNames.forEach(category => {
        if (category.toLowerCase().includes(queryLower)) {
          suggestions.add(category);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [];
  }
};

/**
 * Возвращает пустую структуру фильтров
 */
const getEmptyFilters = (): FilterOptions => ({
  brands: [],
  categories: [],
  genders: [],
  colors: [],
  sizes: [],
  priceRange: { min: 0, max: 100000 }
});

/**
 * Сброс кэша (полезно для тестирования или принудительного обновления)
 */
export const clearCache = (): void => {
  productsCache = [];
  lastCacheUpdate = 0;
};