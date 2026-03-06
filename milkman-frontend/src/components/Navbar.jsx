import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { authService } from '../services/api';
import Button from './Button';

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  return (
    <nav className="h-16 bg-white/70 backdrop-blur-md border-b border-white/20 fixed w-full z-50 flex items-center justify-between px-6 sm:px-12">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
        <span className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          Milkman
        </span>
      </Link>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search fresh milk, cheese..."
            className="w-full bg-slate-100/50 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none text-sm"
          />
          <span className="absolute left-3 top-2 text-slate-400">🔍</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative p-2 text-slate-600 hover:text-brand-primary transition-colors">
          <span className="text-xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
            <Button variant="primary" size="sm" onClick={authService.logout}>Logout</Button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="primary" size="sm">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
