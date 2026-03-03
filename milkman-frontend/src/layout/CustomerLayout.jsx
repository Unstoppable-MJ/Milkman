import { Outlet, Link, useNavigate } from "react-router-dom";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🥛 Milkman Shop
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/shop" className="font-medium hover:text-blue-600">
            Shop
          </Link>

          {role === "customer" && (
            <Link to="/cart" className="font-medium hover:text-blue-600">
              🛒 Cart
            </Link>
          )}

          {role === "admin" && (
            <Link to="/dashboard" className="font-medium hover:text-blue-600">
              Dashboard
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-red-500 font-medium hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}