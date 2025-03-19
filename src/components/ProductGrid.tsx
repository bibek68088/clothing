import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { Button } from 'antd';
import { Filter } from 'lucide-react';

const products: Product[] = [
  {
    id: '1',
    name: 'Velvet Touch Button-Up',
    price: 120.99,
    description: 'Premium quality button-up shirt with velvet touch finish',
    category: 'shirts',
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Brown', 'Black', 'Navy'],
    rating: 4.5,
    reviews: 42
  },
  {
    id: '2',
    name: 'Classic Baseball Cap',
    price: 29.99,
    description: 'Timeless baseball cap design',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sizes: ['One Size'],
    colors: ['Yellow', 'Black', 'Navy'],
    rating: 4.8,
    reviews: 156
  },
  {
    id: '3',
    name: 'Urban Hoodie',
    price: 89.99,
    description: 'Comfortable urban-style hoodie',
    category: 'hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Navy'],
    rating: 4.6,
    reviews: 89
  }
];

const ProductGrid: React.FC = () => {
  return (
    <div className="max-w-[1920px] mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Best Sellers Product</h1>
        <div className="flex justify-between items-center border-b border-gray-200 py-4">
          <div className="flex space-x-6">
            <button className="text-gray-700 hover:text-black">Shirt</button>
            <button className="text-gray-700 hover:text-black">Pant</button>
            <button className="text-gray-700 hover:text-black">Hoodies</button>
            <button className="text-gray-700 hover:text-black">Jacket</button>
            <button className="text-gray-700 hover:text-black">T-Shirt</button>
            <button className="text-gray-700 hover:text-black">Denim</button>
            <button className="text-gray-700 hover:text-black">Cap</button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <select className="border-none bg-transparent">
              <option>Shop By Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Selling</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;