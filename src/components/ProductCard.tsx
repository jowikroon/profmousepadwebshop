import React from 'react';
import { useCart } from '../context/CartContext';
import { MousePad } from '../types';
import { Plus, Star } from 'lucide-react';

export default function ProductCard({ mousepad }: { mousepad: MousePad }) {
  const { addToCart } = useCart();

  return (
    <div className="card group">
      <div className="relative h-56 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        <img 
          src={mousepad.image} 
          alt={mousepad.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 z-20">
          <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">4.8</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
            {mousepad.name}
          </h3>
          <span className="text-lg font-bold text-indigo-600">${mousepad.price}</span>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
            {mousepad.category}
          </span>
          <span className="px-3 py-1 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-full">
            {mousepad.size}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">{mousepad.description}</p>
          <ul className="mt-2 space-y-1">
            {mousepad.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-500 flex items-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={() => addToCart(mousepad)}
          className="w-full btn-primary flex items-center justify-center group"
        >
          <Plus className="w-4 h-4 mr-2 transform group-hover:rotate-180 transition-transform" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}