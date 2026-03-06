import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { authService } from '../services/api';
import Button from '../components/Button';

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">
                        {location.pathname === '/admin' ? 'Dashboard Overview' : 'Management'}
                    </h2>

                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-600">Admin Panel</span>
                        <Button variant="ghost" size="sm" onClick={authService.logout}>
                            Logout
                        </Button>
                    </div>
                </header>

                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
