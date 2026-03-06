import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const Subscription = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubs = async () => {
    try {
      const res = await api.get('/subscription/');
      setSubs(res.data);
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubs(); }, []);

  const getFrequencyLabel = (freq) => {
    switch (freq) {
      case 'DAILY': return 'Every Day';
      case 'WEEKEND': return 'Sat & Sun';
      case 'ALTERNATE': return 'Every Other Day';
      default: return freq;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Active Subscriptions</h1>
          <p className="text-slate-500">Overview of recurring household deliveries.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subs.map((sub) => (
          <Card key={sub.id} className="p-6 space-y-6 relative overflow-hidden group border-slate-200">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-bl-[40px] flex items-center justify-center text-xl">
              🔁
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
                {sub.customer_name[0]}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{sub.customer_name}</h3>
                <p className="text-xs text-slate-400">Registered Hub: Sector 4</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Product</span>
                <span className="text-sm font-bold text-slate-800">{sub.product_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Frequency</span>
                <Badge variant="info">{getFrequencyLabel(sub.frequency)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Quantity</span>
                <span className="text-sm font-bold text-slate-800">{sub.quantity} units</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Starts: {new Date().toLocaleDateString()}</span>
              <Button variant="ghost" size="sm" className="text-brand-primary">Edit Schedule</Button>
            </div>
          </Card>
        ))}

        {subs.length === 0 && !loading && (
          <div className="col-span-full py-24 text-center space-y-4 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <span className="text-6xl">🥛</span>
            <p className="text-slate-400 font-medium">No active subscriptions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
