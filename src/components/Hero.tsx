import React from 'react';
import { Button } from 'antd';

const Hero: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-0">
      <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-3xl font-bold text-white rotate-[-90deg] origin-bottom-left translate-y-[-100%]">JACKET</h3>
        </div>
      </div>
      <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594938291221-94f18cbb5660?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-3xl font-bold text-white rotate-[-90deg] origin-bottom-left translate-y-[-100%]">SHIRT</h3>
        </div>
      </div>
      <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-3xl font-bold text-white rotate-[-90deg] origin-bottom-left translate-y-[-100%]">HOODIE</h3>
        </div>
      </div>
      <div className="relative h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center flex-col p-8">
          <h2 className="text-4xl font-bold text-white mb-4">Vogue Sweaters</h2>
          <p className="text-white mb-6 text-center">Explore our premium collection</p>
          <Button type="primary" className="bg-black text-white border-none px-8 py-4 h-auto text-lg">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;