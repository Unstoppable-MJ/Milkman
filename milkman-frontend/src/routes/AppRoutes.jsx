import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import CustomerLayout from "../layout/CustomerLayout";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Category from "../pages/Category";
import Staff from "../pages/Staff";
import Subscription from "../pages/Subscription";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";

/* 🔐 Basic Auth Check */
function RequireAuth({ children }) {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

/* 👨‍💼 Admin Only */
function RequireAdmin({ children }) {
  const role = localStorage.getItem("role");
  return role === "admin" ? children : <Navigate to="/shop" replace />;
}

/* 👤 Customer Only */
function RequireCustomer({ children }) {
  const role = localStorage.getItem("role");
  return role === "customer" ? children : <Navigate to="/dashboard" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌍 Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* 👤 CUSTOMER ROUTES */}
        <Route
          element={
            <RequireAuth>
              <RequireCustomer>
                <CustomerLayout />
              </RequireCustomer>
            </RequireAuth>
          }
        >
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* 👨‍💼 ADMIN ROUTES */}
        <Route
          element={
            <RequireAuth>
              <RequireAdmin>
                <MainLayout />
              </RequireAdmin>
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Category />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/subscription" element={<Subscription />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}