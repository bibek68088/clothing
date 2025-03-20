import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import AdminLayout from "./components/admin/AdminLayout";
import ProductList from "./components/admin/ProductList";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { MantineProvider } from "@mantine/core";

export const useAuth = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const login = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
  };

  return { isAdmin, login, logout };
};

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <main>
                  <Hero />
                  <ProductGrid />
                </main>
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={
              <div className="min-h-screen bg-white">
                <Navbar />
                <ProductDetail />
              </div>
            }
          />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<AdminLayout />} />}
          >
            <Route index element={<div>Dashboard Overview</div>} />
            <Route path="products" element={<ProductList />} />
            <Route path="users" element={<div>Users Management</div>} />
            <Route path="settings" element={<div>Admin Settings</div>} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
