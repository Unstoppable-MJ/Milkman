import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Admin Only Sidebar */}
      {role === "admin" && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden lg:block sticky top-0 h-screen w-[270px]">
            <Sidebar />
          </div>

          {/* Mobile Drawer */}
          {open && (
            <>
              <div
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
              />
              <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden animate-in slide-in-from-left duration-300">
                <Sidebar />
              </div>
            </>
          )}
        </>
      )}

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-1 flex-col min-w-0">

        <Navbar onMenuClick={() => setOpen(true)} onLogout={handleLogout} />

        <main className="flex-1 p-4 md:p-8 w-full">
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}