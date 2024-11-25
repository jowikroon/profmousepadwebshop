export interface MousePad {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'gaming' | 'office' | 'designer' | 'custom';
  size: 'small' | 'medium' | 'large' | 'extended';
  features: string[];
  description: string;
}

export interface CartItem {
  mousepad: MousePad;
  quantity: number;
}