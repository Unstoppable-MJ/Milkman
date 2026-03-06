import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', password: '' });

  const fetchStaff = async () => {
    try {
      const res = await api.get('/staff/');
      setStaff(res.data);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/staff/', formData);
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', address: '', password: '' });
      fetchStaff();
    } catch (err) {
      alert("Error adding staff member.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this staff member?")) {
      await api.delete(`/staff/${id}/`);
      fetchStaff();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Staff Management</h1>
          <p className="text-slate-500">Manage internal team roles and access.</p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Add Staff</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((s) => (
          <Card key={s.id} className="p-6 space-y-4 border-slate-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold">
                  {s.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{s.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">Administrator</p>
                </div>
              </div>
              <button onClick={() => handleDelete(s.id)} className="text-slate-300 hover:text-state-danger transition-colors">🗑️</button>
            </div>

            <div className="space-y-2 pt-2 text-sm text-slate-600">
              <div className="flex items-center gap-2"><span>📧</span> {s.email}</div>
              <div className="flex items-center gap-2"><span>📞</span> {s.phone}</div>
            </div>

            <div className="pt-2">
              <Badge variant="success">Active Status</Badge>
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-8 space-y-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-slate-900">Add Staff Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <Input label="Password" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
              </div>
              <Input label="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
              <div className="pt-4 flex gap-3">
                <Button type="submit" className="flex-1">Add Member</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Staff;
