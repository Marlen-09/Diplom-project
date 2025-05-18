"use client";

import { useState } from "react";

interface AttributesProps {
  attributes?: Record<string, string[]>;
}

export default function Attributes({ attributes = {} }: AttributesProps) {
  const attributeKeys = Object.keys(attributes);
  
  // Если нет атрибутов, не рендерим компонент
  if (attributeKeys.length === 0) {
    return null;
  }
  
  // Для каждого атрибута создаем состояние с выбранным значением
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    
    // По умолчанию выбираем первое значение для каждого атрибута
    attributeKeys.forEach(key => {
      if (attributes[key] && attributes[key].length > 0) {
        initialValues[key] = attributes[key][0];
      }
    });
    
    return initialValues;
  });
  
  // Обработчик изменения значения атрибута
  const handleAttributeChange = (attributeName: string, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [attributeName]: value
    }));
  };
  
  return (
    <div className="mb-6">
      {attributeKeys.map(attributeName => (
        <div key={attributeName} className="mb-4">
          <h3 className="text-sm font-medium mb-2">
            {attributeName}:
            <span className="ml-2 font-normal">
              {selectedValues[attributeName]}
            </span>
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {attributes[attributeName].map(value => (
              <button
                key={value}
                onClick={() => handleAttributeChange(attributeName, value)}
                className={`px-3 py-1 text-sm rounded-full border 
                  ${
                    selectedValues[attributeName] === value
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}