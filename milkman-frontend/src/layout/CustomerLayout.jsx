import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Milkman Delivery. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;