import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { authService } from "../services/api";

import CustomerLayout from "../layout/CustomerLayout";
import AdminLayout from "../layout/AdminLayout";

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
import Profile from "../pages/Profile";

import Orders from "../pages/Orders";

/* 🔐 Auth Guard */
function RequireAuth({ children, role }) {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRole();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && userRole !== role) {
    return userRole === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/shop" replace />;
  }
  return children;
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
            <RequireAuth role="customer">
              <CustomerLayout />
            </RequireAuth>
          }
        >
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 👨‍💼 ADMIN ROUTES */}
        <Route
          element={
            <RequireAuth role="admin">
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Category />} />
          <Route path="/admin/staff" element={<Staff />} />
          <Route path="/admin/subscriptions" element={<Subscription />} />
          <Route path="/admin/orders" element={<Orders />} />
          {/* Redirect legacy /dashboard to /admin */}
          <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}