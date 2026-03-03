import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/customers", icon: "👥", label: "Customers" },
    { to: "/products", icon: "🧺", label: "Products" },
    { to: "/category", icon: "🥛", label: "Category" },
    { to: "/staff", icon: "🧑‍🍳", label: "Staff" },
    { to: "/subscription", icon: "🔁", label: "Subscription" },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-brand-primary to-brand-secondary text-white p-6 shadow-xl">
      <div className="flex items-center gap-2 text-3xl font-bold mb-10">
        <span>🥛</span> Milkman
      </div>

      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.to 
                  ? "bg-white/20 shadow-lg backdrop-blur-md" 
                  : "hover:bg-white/10"
              }`} 
              to={item.to}
            >
              <span className="text-xl">{item.icon}</span> 
              <span className="font-medium tracking-wide">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
