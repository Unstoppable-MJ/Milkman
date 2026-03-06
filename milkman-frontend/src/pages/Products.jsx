import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Input from '../components/Input';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', stock: '', category: '', discount_percent: 0, description: ''
  });

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/product/'),
        api.get('/category/')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      ...product,
      category: product.category || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/product/${id}/`);
      fetchData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock, 10) || 0,
        category: parseInt(formData.category, 10) || null,
        discount_percent: parseInt(formData.discount_percent, 10) || 0,
      };

      if (currentProduct) {
        await api.put(`/product/${currentProduct.id}/`, payload);
      } else {
        await api.post('/product/', payload);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert("Error saving product. Please check fields.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900">Manage Products</h1>
        <Button onClick={() => {
          setCurrentProduct(null);
          setFormData({ name: '', price: '', stock: '', category: '', discount_percent: 0, description: '' });
          setShowModal(true);
        }}>
          + Add New Product
        </Button>
      </div>

      <Card className="overflow-hidden border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                      {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : '🥛'}
                    </div>
                    <span className="font-bold text-slate-800">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">{p.category_name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">₹{p.discounted_price}</span>
                    {p.discount_percent > 0 && <span className="text-[10px] text-slate-400 line-through">₹{p.price}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={p.stock > 10 ? 'success' : (p.stock > 0 ? 'warning' : 'danger')}>
                    {p.stock} units
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(p)} className="p-2 text-slate-400 hover:text-brand-primary transition-colors">✏️</button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-state-danger transition-colors">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modern Modal Mockup Style */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <Card className="w-full max-w-xl p-8 space-y-6 shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-bold text-slate-900">{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                <div className="w-full space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 ml-1">Category</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Price (₹)" type="number" value={formData.price || ''} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                <Input label="Stock" type="number" value={formData.stock || ''} onChange={e => setFormData({ ...formData, stock: e.target.value })} required />
                <Input label="Discount %" type="number" value={formData.discount_percent || ''} onChange={e => setFormData({ ...formData, discount_percent: e.target.value })} />
              </div>
              <Input label="Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />

              <div className="pt-4 flex gap-3">
                <Button type="submit" className="flex-1">Save Product</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Products;