import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customer/');
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this customer? This will also remove their user account.")) {
      await api.delete(`/customer/${id}/`);
      fetchCustomers();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Customers</h1>
          <p className="text-slate-500">Manage your verified delivery members.</p>
        </div>
        <Badge variant="info">Total: {customers.length}</Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <Card key={i} className="h-48 animate-pulse bg-slate-100"></Card>
          ))
        ) : (
          customers.map((c) => (
            <Card key={c.id} className="p-6 space-y-4 group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center text-xl font-bold">
                    {(c.username || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{c.username}</h3>
                    <p className="text-xs text-slate-400">{c.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-2 text-slate-300 hover:text-state-danger transition-colors"
                >🗑️</button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>📞</span> {c.phone}
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-600 line-clamp-2">
                  <span>📍</span> {c.address}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                <Badge variant="success">Active Member</Badge>
                <Link to={`/admin/customers/${c.id}`} className="text-xs font-bold text-brand-primary hover:underline">View History →</Link>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Customers;
