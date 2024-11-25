import React from 'react';
import { Check } from 'lucide-react';

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function FilterButton({ label, isSelected, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-all ${
        isSelected
          ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
        isSelected ? 'border-white' : 'border-gray-500'
      }`}>
        {isSelected && <Check className="w-3 h-3" />}
      </span>
      <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
    </button>
  );
}