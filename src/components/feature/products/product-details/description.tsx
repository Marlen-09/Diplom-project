"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";

interface DescriptionProps {
  description?: string;
  specifications?: Record<string, string>;
}

export default function Description({ description, specifications = {} }: DescriptionProps) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
  ];
  
  const [activeTab, setActiveTab] = useState("description");
  
  return (
    <div>
      <Tabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />
      
      <div className="p-6 border-t border-gray-200">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            {description ? (
              <p>{description}</p>
            ) : (
              <p className="text-gray-500">No description available.</p>
            )}
          </div>
        )}
        
        {activeTab === "specifications" && (
          <div>
            {Object.keys(specifications).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-100 py-2">
                    <span className="font-medium text-gray-700 w-1/3">{key}</span>
                    <span className="text-gray-600 w-2/3">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}