import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('customer'); // 'customer' or 'admin'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(username, password);

      if (data.role !== loginType) {
        setError(`This account does not have ${loginType} privileges.`);
        setLoading(false);
        return;
      }

      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      {/* Left Side: Illustration/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {/* Pattern/Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 text-center space-y-8">
          <div className="w-24 h-24 bg-brand-primary rounded-3xl mx-auto flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-brand-primary/40 rotate-12">
            M
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Freshness <br />
              <span className="text-brand-primary">Delivered Daily.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              Experience the finest dairy and grocery delivery service with premium quality guaranteed.
            </p>
          </div>
        </div>

        {/* Floating circles for aesthetic */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2 lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500">Please enter your details to sign in</p>
          </div>

          <Card className="p-1 shadow-sm border border-slate-200">
            <div className="flex">
              <button
                onClick={() => setLoginType('customer')}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${loginType === 'customer' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                Customer Portal
              </button>
              <button
                onClick={() => setLoginType('admin')}
                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${loginType === 'admin' ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                Admin Dashboard
              </button>
            </div>
          </Card>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary/20" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-sm font-semibold text-brand-primary hover:text-blue-700 transition-colors">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : `Login as ${loginType === 'admin' ? 'Admin' : 'Customer'}`}
            </Button>
          </form>

          <p className="text-center text-slate-500 text-sm">
            Don't have an account?{' '}
            <button className="text-brand-primary font-bold hover:text-blue-700 transition-colors">
              Create one now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;