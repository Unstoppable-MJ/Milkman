import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import Badge from '../components/Badge';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_revenue: 0,
    total_orders: 0,
    total_customers: 0,
    total_subscriptions: 0,
    monthly_stats: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/order/admin/analytics/');
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard stats fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `₹${stats.total_revenue}`, icon: '💰', color: 'bg-green-500' },
    { title: 'Total Orders', value: stats.total_orders, icon: '📦', color: 'bg-blue-500' },
    { title: 'Total Customers', value: stats.total_customers, icon: '👥', color: 'bg-purple-500' },
    { title: 'Active Subs', value: stats.total_subscriptions, icon: '🔁', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="glass" className="py-2 px-4 shadow-sm border-slate-200 text-slate-600 bg-white font-bold">
            Last Update: Just Now
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <Card key={i} className="p-6 relative overflow-hidden group hover:-translate-y-1 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-[0.03] rounded-bl-full`}></div>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{card.title}</p>
                <h3 className="text-4xl font-black text-slate-900">{loading ? '...' : card.value}</h3>
              </div>
              <div className={`w-12 h-12 ${card.color} bg-opacity-10 rounded-2xl flex items-center justify-center text-2xl shadow-inner`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-green-600">
              <span>↑ 12%</span>
              <span className="text-slate-400 font-medium tracking-normal text-[10px]">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Revenue Growth</h3>
            <select className="bg-slate-50 border-none rounded-lg text-xs font-bold p-2 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthly_stats.length > 0 ? stats.monthly_stats : [{ month: 'Jan', revenue: 0 }]}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="created_at__month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Order Distribution</h3>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthly_stats.length > 0 ? stats.monthly_stats : [{ month: 'Jan', revenue: 0 }]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="created_at__month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" fill="#059669" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;