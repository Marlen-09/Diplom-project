// utils/productHelpers.ts

export interface Product {
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

export interface Category {
  id: string;
  slug: string;
  name: string;
  selected?: boolean;
}

export interface BrandWithProducts {
  name: string;
  slug: string;
  products: Product[];
}

export const getPriorityGender = (genders: string[]): string => {
  if (!genders || genders.length === 0) return 'Универсальные';
  
  // Проверяем наличие "Унисекс" с учетом регистра
  const unisex = genders.find(g => 
    g.toLowerCase() === 'унисекс' || 
    g.toLowerCase() === 'unisex');
  if (unisex) return unisex;
  
  // Проверяем наличие "Мужской"
  const male = genders.find(g => 
    g.toLowerCase() === 'мужской' || 
    g.toLowerCase() === 'men' || 
    g.toLowerCase() === 'male');
  if (male) return male;
  
  // Проверяем наличие "Женский"
  const female = genders.find(g => 
    g.toLowerCase() === 'женский' || 
    g.toLowerCase() === 'women' || 
    g.toLowerCase() === 'female');
  if (female) return female;
  
  // Если ничего не найдено, возвращаем первый элемент (исключая "Детский")
  const nonKids = genders.filter(g => 
    !g.toLowerCase().includes('детский') && 
    !g.toLowerCase().includes('kids') && 
    !g.toLowerCase().includes('child'));
  
  return nonKids.length > 0 ? nonKids[0] : 'Универсальные';
};

export const getColorBackground = (
  color: {name?: string, Name?: string, colorCode?: string}, 
  opacity: number = 1
): string => {
  // Получаем hex-код цвета
  let hexColor: string;
  
  if (color.colorCode) {
    hexColor = color.colorCode;
  } else {
    const COLOR_MAP: Record<string, string> = {
      'White': '#FFFFFF', 'Белый': '#FFFFFF',
      'Black': '#000000', 'Черный': '#000000',
      'Brown': '#8B4513', 'Коричневый': '#8B4513',
      'Gray': '#808080', 'Серый': '#808080',
      'Red': '#FF0000', 'Красный': '#FF0000',
      'Blue': '#0000FF', 'Синий': '#0000FF',
      'Green': '#008000', 'Зеленый': '#008000',
      'Yellow': '#FFFF00', 'Желтый': '#FFFF00',
      'Orange': '#FFA500', 'Оранжевый': '#FFA500',
      'Purple': '#800080', 'Фиолетовый': '#800080',
      'Pink': '#FFC0CB', 'Розовый': '#FFC0CB',
      default: '#CCCCCC'
    };
    
    // Проверяем оба возможных имени цвета (name и Name)
    const colorName = color.Name || color.name || '';
    hexColor = COLOR_MAP[colorName] || COLOR_MAP.default;
  }
  
  // Если нужна полная непрозрачность, возвращаем hex-код как есть
  if (opacity >= 1) {
    return hexColor;
  }
  
  // Преобразуем hex в rgba с заданной прозрачностью
  return hexToRgba(hexColor, opacity);
};

// Вспомогательная функция для преобразования HEX в RGBA
const hexToRgba = (hex: string, alpha: number = 1): string => {
  // Убираем # если есть
  hex = hex.replace(/^#/, '');
  
  // Преобразуем в полный формат если это сокращенный hex (например #FFF)
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Парсим hex значение
  const bigint = parseInt(hex, 16);
  
  // Извлекаем RGB компоненты
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  // Убеждаемся, что alpha находится в диапазоне [0, 1]
  alpha = Math.max(0, Math.min(1, alpha));
  
  // Возвращаем строку RGBA
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const formatPrice = (price: number, currency: string = 'USD'): string => {
  if (typeof price !== 'number') return '0.00';
  
  const CURRENCY_SYMBOLS: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'RUB': '₽'
  };
  
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return `${symbol}${price.toFixed(2)}`;
};

export const filterProductsByCategory = (products: Product[], categoryName: string): Product[] => {
  if (!categoryName || categoryName === 'All') {
    return products;
  }
  
  return products.filter(product => {
    // Проверяем соответствие с учетом регистра
    return product.categoryNames && product.categoryNames.some((cat: string) => 
      cat.toLowerCase() === categoryName.toLowerCase()
    );
  });
};

// Функция для определения цвета фона продукта
export const getProductBackgroundColor = (
  product: Product,
  selectedColorName?: string,
  selectedColorCode?: string
): string => {
  // 1. Если выбран конкретный цвет, используем его в первую очередь
  if (selectedColorCode) {
    return selectedColorCode;
  }
  
  // 2. Если указано название цвета, пытаемся определить его
  if (selectedColorName) {
    const colorLower = selectedColorName.toLowerCase();
    
    // Карта цветов
    const colorMap: Record<string, string> = {
      'green': '#7CFC00',
      'зеленый': '#7CFC00',
      'blue': '#0000FF',
      'синий': '#0000FF',
      'red': '#FF0000',
      'красный': '#FF0000',
      'white': '#F0F0F0',
      'белый': '#F0F0F0',
      'black': '#333333',
      'черный': '#333333',
      'yellow': '#FFEB3B',
      'желтый': '#FFEB3B',
      'pink': '#FF80AB',
      'розовый': '#FF80AB',
      'orange': '#FF9800',
      'оранжевый': '#FF9800',
      'purple': '#9C27B0',
      'фиолетовый': '#9C27B0',
      'grey': '#9E9E9E',
      'серый': '#9E9E9E',
      'brown': '#795548',
      'коричневый': '#795548',
    };
    
    // Проверяем каждый цвет
    for (const colorKey in colorMap) {
      if (colorLower.includes(colorKey)) {
        return colorMap[colorKey];
      }
    }
  }
  
  // 3. Ищем указание на цвет в названии продукта
  const productName = product.Name.toLowerCase();
  const colorTerms = [
    { term: 'green', color: '#7CFC00' },
    { term: 'blue', color: '#0000FF' },
    { term: 'red', color: '#FF0000' },
    { term: 'white', color: '#F0F0F0' },
    { term: 'black', color: '#333333' },
    { term: 'yellow', color: '#FFEB3B' },
    { term: 'pink', color: '#FF80AB' },
    { term: 'orange', color: '#FF9800' },
    { term: 'purple', color: '#9C27B0' },
    { term: 'grey', color: '#9E9E9E' },
    { term: 'brown', color: '#795548' },
  ];
  
  for (const { term, color } of colorTerms) {
    if (productName.includes(term)) {
      return color;
    }
  }
  
  // 4. Цвет по умолчанию
  return '#F5F5F5';
};