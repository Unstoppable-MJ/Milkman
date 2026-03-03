import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    customers: 0,
    products: 0,
    subscriptions: 0,
  });

  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [
        { data: cust },
        { data: prod },
        { data: subs },
        { data: rev },
      ] = await Promise.all([
        API.get("/customer/"),
        API.get("/product/"),
        API.get("/subscription/"),
        API.get("/order/revenue/"),
      ]);

      setCounts({
        customers: cust.length,
        products: prod.length,
        subscriptions: subs.length,
      });

      setRevenue(rev.total_revenue);
    } catch (error) {
      console.log("Dashboard fetch error:", error);

      // If token expired → logout
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-10 pb-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            Live Delivery Status
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage your daily <br />
            <span className="text-brand-primary">Milk Deliveries</span> with ease.
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed">
            Everything you need to track customers, manage products, and monitor subscriptions in one premium interface.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard
          icon="👥"
          title="Total Customers"
          value={loading ? "..." : counts.customers}
        />

        <StatCard
          icon="🧺"
          title="Active Products"
          value={loading ? "..." : counts.products}
        />

        <StatCard
          icon="🔁"
          title="Daily Subscriptions"
          value={loading ? "..." : counts.subscriptions}
        />

        <StatCard
          icon="💰"
          title="Total Revenue"
          value={loading ? "..." : `₹${revenue}`}
        />
      </div>
    </div>
  );
}

/* Reusable Stat Card */
function StatCard({ icon, title, value }) {
  return (
    <div className="glass-card p-8 group hover:border-brand-primary/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <h3 className="text-slate-500 font-medium mb-1">{title}</h3>
      <p className="text-4xl font-bold text-slate-900">{value}</p>
    </div>
  );
}