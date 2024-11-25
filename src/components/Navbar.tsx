import React from 'react';
import { ShoppingCart, Menu, MousePointer2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ toggleCart }: { toggleCart: () => void }) {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <MousePointer2 className="h-8 w-8 text-indigo-600" />
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                PadPress
              </span>
              <p className="text-xs text-gray-500">Premium Mouse Pads</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink href="#" active>Shop</NavLink>
              <NavLink href="#">Collections</NavLink>
              <NavLink href="#">About</NavLink>
            </div>

            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a
      href={href}
      className={`relative text-sm font-medium transition-colors ${
        active ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
      )}
    </a>
  );
}