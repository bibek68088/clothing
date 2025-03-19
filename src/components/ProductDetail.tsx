import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'antd';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Brown');
  const [mainImage, setMainImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  const sizes = ['S', 'M', 'L'];
  const colors = ['Brown', 'Black', 'Navy'];

  return (
    <div className="max-w-[1920px] mx-auto px-6 py-8">
      <div className="text-sm breadcrumbs mb-8">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/best-seller" className="text-gray-500 hover:text-black">Best seller</Link>
        <span className="mx-2">/</span>
        <span>Velvet Touch Button-Up</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={images[mainImage]}
              alt="Product"
              className="w-full aspect-square object-cover"
            />
            <button 
              onClick={() => setMainImage(prev => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMainImage(prev => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(index)}
                className={`aspect-square overflow-hidden ${mainImage === index ? 'ring-2 ring-black' : ''}`}
              >
                <img 
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Velvet Touch Button-Up</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(42 Reviews)</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex space-x-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full border ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black'
                    } flex items-center justify-center`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border ${
                      selectedColor === color ? 'ring-2 ring-black' : ''
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-6">
            <Button type="primary" className="w-full h-12 bg-black">
              Add to Cart - $120.99
            </Button>
            <Button className="w-full h-12 border-black text-black">
              Add to Wishlist
            </Button>
          </div>
          
          <div className="space-y-4 pt-6">
            <div className="border-t border-b border-gray-200 py-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">Premium quality button-up shirt with velvet touch finish. Perfect for both casual and formal occasions.</p>
            </div>
            
            <div className="border-b border-gray-200 py-4">
              <h3 className="font-medium mb-2">Materials & Care</h3>
              <p className="text-gray-600">100% Cotton. Machine wash cold, tumble dry low.</p>
            </div>
            
            <div className="py-4">
              <h3 className="font-medium mb-2">Size Guide</h3>
              <p className="text-gray-600">Find your perfect fit with our comprehensive size guide.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Similar products would go here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;