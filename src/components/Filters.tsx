import React from 'react';
import FilterButton from './FilterButton';

interface FiltersProps {
  categories: string[];
  sizes: string[];
  selectedCategories: Set<string>;
  selectedSizes: Set<string>;
  onCategoryChange: (category: string) => void;
  onSizeChange: (size: string) => void;
  onClearFilters: () => void;
}

export default function Filters({
  categories,
  sizes,
  selectedCategories,
  selectedSizes,
  onCategoryChange,
  onSizeChange,
  onClearFilters,
}: FiltersProps) {
  const hasActiveFilters = selectedCategories.size > 0 || selectedSizes.size > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <FilterButton
                key={category}
                label={category}
                isSelected={selectedCategories.has(category)}
                onClick={() => onCategoryChange(category)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <FilterButton
                key={size}
                label={size}
                isSelected={selectedSizes.has(size)}
                onClick={() => onSizeChange(size)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}