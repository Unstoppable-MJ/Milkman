import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [orderRes, subRes] = await Promise.all([
                    api.get('/order/my_orders/'),
                    api.get('/subscription/')
                ]);
                setOrders(orderRes.data);
                setSubs(subRes.data);
            } catch (err) {
                console.error("Profile fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[40px] shadow-soft border border-slate-100">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-brand-primary text-white rounded-[2rem] flex items-center justify-center text-3xl font-black shadow-xl shadow-brand-primary/20">
                        {localStorage.getItem('user_name')?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{localStorage.getItem('user_name')}</h1>
                        <p className="text-slate-400 font-medium flex items-center gap-2">
                            <span>📍</span> Default Address: Sector 14, Noida
                        </p>
                    </div>
                </div>
                <Button variant="outline" className="rounded-2xl">Edit Profile</Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Order History */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 px-2">Order History</h2>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="p-5 flex items-center justify-between hover:translate-x-1 transition-transform border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl">🚚</div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">Order #{order.id}</h3>
                                        <p className="text-xs text-slate-400">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="font-black text-slate-900">₹{order.total_amount}</p>
                                    <Badge variant={order.status === 'DELIVERED' ? 'success' : 'warning'}>{order.status}</Badge>
                                </div>
                            </Card>
                        ))}
                        {orders.length === 0 && <p className="text-slate-400 italic px-2">No orders placed yet.</p>}
                    </div>
                </div>

                {/* Subscriptions */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 px-2">My Subscriptions</h2>
                    <div className="space-y-4">
                        {subs.map((sub) => (
                            <Card key={sub.id} className="p-6 space-y-4 border-slate-100 border-2 border-dashed">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">{sub.frequency}</p>
                                        <h3 className="text-xl font-bold text-slate-800">{sub.product_name}</h3>
                                    </div>
                                    <Badge variant="success">Active</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm text-slate-500 font-medium">
                                    <span>Daily Quantity: {sub.quantity}</span>
                                    <button className="text-brand-primary font-bold hover:underline">Manage</button>
                                </div>
                            </Card>
                        ))}
                        {subs.length === 0 && <p className="text-slate-400 italic px-2">No active subscriptions.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
