import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-between overflow-hidden rounded-[40px] bg-slate-900 mx-auto max-w-7xl mt-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10"></div>
          {/* Background image mockup style */}
          <div className="absolute right-0 top-0 h-full w-1/2 bg-brand-secondary/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-20 px-12 sm:px-20 max-w-2xl space-y-8 animate-fade-in">
          <Badge variant="glass" className="py-1 px-4 text-white">🥛 Pure & Fresh Since 2024</Badge>
          <h1 className="text-6xl sm:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            Better Quality <br />
            <span className="text-brand-secondary">Better Life.</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl font-medium leading-relaxed">
            Fresh milk and farm-to-table products delivered to your doorstep every morning. Start your subscription today.
          </p>
          <div className="flex gap-4">
            <Link to="/shop">
              <Button size="lg" className="rounded-2xl">Shop Now</Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="lg" className="rounded-2xl">Subscribe</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900">Explore Categories</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Discover a wide range of organic and fresh diary products curated just for you.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Fresh Milk', 'Organic Eggs', 'Artisan Cheese', 'Creamy Yogurt'].map((cat, i) => (
            <Card key={i} className="group cursor-pointer hover:-translate-y-2">
              <div className="aspect-square bg-slate-100 flex items-center justify-center p-8 group-hover:bg-brand-primary/5 transition-colors">
                <span className="text-5xl">{['🥛', '🥚', '🧀', '🍦'][i]}</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-slate-800">{cat}</h3>
                <p className="text-xs text-slate-400 mt-1">12+ Products</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-24 rounded-[60px] shadow-sm border border-slate-100 max-w-7xl mx-auto px-12 grid md:grid-cols-3 gap-12">
        {[
          { icon: '🚚', title: 'Free Delivery', desc: 'No extra charges for your daily morning delivery.' },
          { icon: '🌿', title: '100% Organic', desc: 'Products sourced directly from local organic farms.' },
          { icon: '💳', title: 'Secure Payment', desc: 'Multiple secure ways to pay for your orders.' }
        ].map((item, i) => (
          <div key={i} className="text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-sm border border-slate-100">{item.icon}</div>
            <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

// Internal Badge for Landing
const Badge = ({ variant, className, children }) => (
  <span className={`inline-block rounded-full ${className} ${variant === 'glass' ? 'bg-white/10 backdrop-blur-md border border-white/20' : ''}`}>
    {children}
  </span>
);

export default LandingPage;
