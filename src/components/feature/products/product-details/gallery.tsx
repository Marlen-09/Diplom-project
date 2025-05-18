"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images = [] }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Если нет изображений, показываем заглушку
  if (images.length === 0) {
    return (
      <div className="aspect-square w-full bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }
  
  return (
    <div>
      {/* Main Image */}
      <div className="aspect-square w-full relative bg-gray-100 rounded-lg overflow-hidden mb-4">
        {/* Заменим на actual Image component, когда будут настоящие изображения */}
        <div className="w-full h-full bg-gray-200" />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square bg-gray-100 rounded-md overflow-hidden 
                ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
            >
              {/* Заменим на actual Image component, когда будут настоящие изображения */}
              <div className="w-full h-full bg-gray-200" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}