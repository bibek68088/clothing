import React from 'react';
import { Search, Heart, ShoppingCart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/admin/AuthModal'; 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white">
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="flex justify-between items-center h-16 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <Menu className="w-5 h-5 text-gray-700 cursor-pointer" />
            <Search className="w-5 h-5 text-gray-700 cursor-pointer" />
          </div>
          <Link to="/" className="text-2xl font-bold">Aashish</Link>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="text-sm text-gray-700">Contact us</Link>
            <Heart className="w-5 h-5 text-gray-700 cursor-pointer" />
            <AuthModal /> {/* Replace the User icon with AuthModal */}
            <ShoppingCart className="w-5 h-5 text-gray-700 cursor-pointer" />
          </div>
        </div>
        <div className="hidden md:flex justify-center space-x-8 py-4">
          <Link to="/men" className="text-gray-700 hover:text-black">Men</Link>
          <Link to="/women" className="text-gray-700 hover:text-black">Women</Link>
          <Link to="/best-sellers" className="text-gray-700 hover:text-black">Best sellers</Link>
          <Link to="/new" className="text-gray-700 hover:text-black">New Arrivals</Link>
          <Link to="/shirts" className="text-gray-700 hover:text-black">Shirts & Tees</Link>
          <Link to="/pants" className="text-gray-700 hover:text-black">Pants & Jeans</Link>
          <Link to="/outerwear" className="text-gray-700 hover:text-black">Outerwear</Link>
          <Link to="/sale" className="text-gray-700 hover:text-black">Sale</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;