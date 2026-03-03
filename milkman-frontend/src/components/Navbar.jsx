import { useNavigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const email = typeof window !== "undefined" ? localStorage.getItem("staffEmail") : null;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("staffToken");
    localStorage.removeItem("staffEmail");
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-slate-200/60 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <span className="text-2xl">☰</span>
        </button>
        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-slate-800">Overview</h2>
          <p className="text-xs text-slate-500 font-medium">Manage your daily deliveries</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-slate-100/80 px-4 py-2 rounded-xl border border-slate-200/40">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-700">{email || "Guest"}</span>
        </div>
        
        <button
          onClick={logout}
          className="btn-primary py-2 px-5 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
