// utils/imageHelpers.ts
import { IMG_API } from "@/services/api";

export const getFullImageUrl = (
  relativePath?: string,
  defaultImage: string = "/placeholder-image.jpg"
): string => {
  if (!relativePath) return defaultImage;

  if (
    relativePath.startsWith("http://") ||
    relativePath.startsWith("https://")
  ) {
    return relativePath;
  }

  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  return `${IMG_API}${path}`;
};

export const extractImagesFromModels = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  models: any[],
  productSlug: string
): string[] => {
  if (!models || !Array.isArray(models) || models.length === 0) {
    return ["/placeholder-image.jpg"];
  }

  // Фильтруем модели, соответствующие продукту
  const matchingModels = models.filter(
    (model) => model.product?.slug === productSlug
  );

  if (matchingModels.length === 0) {
    return ["/placeholder-image.jpg"];
  }

  // Извлекаем URL-ы изображений из моделей
  const imageUrls: string[] = [];

  matchingModels.forEach((model) => {
    if (model.images && model.images.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      model.images.forEach((image: any) => {
        let imageUrl: string | null = null;

        if (image.url) {
          imageUrl = getFullImageUrl(image.url);
        } else if (
          image.formats &&
          image.formats.small &&
          image.formats.small.url
        ) {
          imageUrl = getFullImageUrl(image.formats.small.url);
        }

        if (imageUrl && !imageUrls.includes(imageUrl)) {
          imageUrls.push(imageUrl);
        }
      });
    }
  });

  return imageUrls.length > 0 ? imageUrls : ["/placeholder-image.jpg"];
};

// Оптимизированная функция для Next.js Image
export const getOptimizedImageUrl = (
  imagePath: string,
  width?: number,
  height?: number,
  quality: number = 75
): string => {
  const fullUrl = getFullImageUrl(imagePath);
  
  // Если это внешний URL или placeholder, возвращаем как есть
  if (fullUrl.startsWith('http') && !fullUrl.includes(IMG_API)) {
    return fullUrl;
  }
  
  if (fullUrl === "/placeholder-image.jpg") {
    return fullUrl;
  }

  // Для Strapi изображений можно добавить параметры оптимизации
  // Это зависит от настроек вашего Strapi
  const url = new URL(fullUrl);
  
  if (width) url.searchParams.set('w', width.toString());
  if (height) url.searchParams.set('h', height.toString());
  if (quality !== 75) url.searchParams.set('q', quality.toString());
  
  return url.toString();
};