import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/product/'),
          api.get('/category/')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Failed to fetch shop data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCat === 'All'
    ? products
    : products.filter(p => (p.category_name || 'General') === selectedCat);

  return (
    <div className="min-h-screen pb-24">
      {/* Aesthetic Top Banner */}
      <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 mb-12 relative overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-secondary rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>

        <div className="relative z-10 max-w-2xl">
          <Badge variant="glass" className="bg-white/10 border-white/20 text-blue-200 mb-6 py-2">Premium Selection</Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-tight">
            Freshness, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">Delivered.</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg">
            Straight from the farm to your door. Explore our handpicked dairy and daily essentials.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Sticky Filters Ribbon */}
        <div className="glass-header -mx-6 px-6 py-4 md:mx-0 md:px-0 md:py-0 md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-3 w-max">
            <button
              onClick={() => setSelectedCat('All')}
              className={`pill-btn ${selectedCat === 'All' ? 'pill-active' : 'pill-inactive'}`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name)}
                className={`pill-btn ${selectedCat === cat.name ? 'pill-active' : 'pill-inactive'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-400 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <span>Showing {filteredProducts.length} Results</span>
          </div>
        </div>

        {loading ? (
          /* Loading Skeletons - Advanced */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="advanced-card p-4 space-y-6">
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl animate-pulse"></div>
                <div className="space-y-3 px-2">
                  <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse"></div>
                  <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-50 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Advanced Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-6">
                <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-6xl shadow-inner">
                  🔍
                </div>
                <h3 className="text-2xl font-black text-slate-800">No products found</h3>
                <p className="text-slate-500 font-medium text-lg text-center max-w-md">We couldn't find anything in this category right now. Check back later!</p>
                <button onClick={() => setSelectedCat('All')} className="btn-primary mt-4">Browse All</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;