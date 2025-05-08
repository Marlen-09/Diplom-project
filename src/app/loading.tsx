"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-900 animate-spin"></div>
        <div className="absolute top-0 right-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-300 animate-pulse"></div>
      </div>
      <p className="ml-4 text-xl font-medium">Загрузка...</p>
    </div>
  );
}