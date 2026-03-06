import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Input from '../components/Input';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await api.get('/category/');
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/category/', { name, description, is_active: true });
      setShowModal(false);
      setName('');
      setDescription('');
      fetchCategories();
    } catch (err) {
      alert("Error adding category.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await api.delete(`/category/${id}/`);
      fetchCategories();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Categories</h1>
          <p className="text-slate-500">Organize your products for easy discovery.</p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ New Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-6 space-y-4 group relative">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📁
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-lg">{cat.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{cat.description || 'General dairy category'}</p>
            </div>
            <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
              <Badge variant="info">Active</Badge>
              <button onClick={() => handleDelete(cat.id)} className="text-slate-300 hover:text-state-danger transition-colors">🗑️</button>
            </div>
          </Card>
        ))}

        <button
          onClick={() => setShowModal(true)}
          className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-primary/40 hover:text-brand-primary transition-all group"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform">➕</span>
          <span className="font-bold text-sm">Add Category</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-8 space-y-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900">Create Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Category Name" value={name} onChange={e => setName(e.target.value)} required />
              <Input label="Description" value={description} onChange={e => setDescription(e.target.value)} />
              <div className="pt-4 flex gap-3">
                <Button type="submit" className="flex-1">Create</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Category;
