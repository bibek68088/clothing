import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../App"; 

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

export default ProtectedRoute;