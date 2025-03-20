import React from "react";
import CartPage from "./CartPage";
import RecommendedProducts from "./RecommendedProducts";

const CartPageWithRecommendations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <CartPage />
      <RecommendedProducts />
    </div>
  );
};

export default CartPageWithRecommendations;