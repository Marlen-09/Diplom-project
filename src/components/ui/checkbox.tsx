"use client";

import React, {  } from "react";
import { Check } from "lucide-react";

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({
  id,
  checked = false,
  onCheckedChange,
  label,
  className = "",
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          className="sr-only peer"
        />
        <div
          className={`h-5 w-5 border rounded flex items-center justify-center 
            ${checked ? "bg-black border-black" : "border-gray-300 bg-white"}
            peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-gray-200`}
        >
          {checked && <Check size={14} className="text-white" />}
        </div>
      </div>
      {label && (
        <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}