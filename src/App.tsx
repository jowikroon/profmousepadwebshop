import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Filters from './components/Filters';
import { mousepads } from './data/mousepads';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());

  const categories = ['gaming', 'office', 'designer', 'custom'];
  const sizes = ['small', 'medium', 'large', 'extended'];

  const filteredMousepads = useMemo(() => {
    return mousepads.filter(mousepad => {
      const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(mousepad.category);
      const sizeMatch = selectedSizes.size === 0 || selectedSizes.has(mousepad.size);
      return categoryMatch && sizeMatch;
    });
  }, [selectedCategories, selectedSizes]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => {
      const next = new Set(prev);
      if (next.has(size)) {
        next.delete(size);
      } else {
        next.add(size);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedSizes(new Set());
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar toggleCart={() => setIsCartOpen(!isCartOpen)} />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Mouse Pads
            </h1>
            <p className="text-lg text-gray-600">
              Discover our collection of high-quality mouse pads for every need
            </p>
          </div>

          <Filters
            categories={categories}
            sizes={sizes}
            selectedCategories={selectedCategories}
            selectedSizes={selectedSizes}
            onCategoryChange={handleCategoryChange}
            onSizeChange={handleSizeChange}
            onClearFilters={clearFilters}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMousepads.map(mousepad => (
              <ProductCard key={mousepad.id} mousepad={mousepad} />
            ))}
          </div>

          {filteredMousepads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No mouse pads match your selected filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;