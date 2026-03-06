import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/order/admin/all/');
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/order/admin/update/${id}/`, { status });
            fetchOrders();
        } catch (err) {
            alert("Failed to update status.");
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Pending': return 'warning';
            case 'Delivered': return 'success';
            case 'Cancelled': return 'danger';
            case 'Processing': return 'info';
            default: return 'glass';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-slate-900">Order Management</h1>
                <Badge variant="glass" className="bg-white border-slate-200 py-2 px-4 shadow-sm text-slate-600 font-bold">
                    Active Deliveries: {orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length}
                </Badge>
            </div>

            <Card className="overflow-hidden border border-slate-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.map((o) => (
                            <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm text-slate-500">#{o.id.toString().padStart(6, '0')}</td>
                                <td className="px-6 py-4">
                                    <span className="font-bold text-slate-800">{o.customer_name}</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">₹{o.total_amount}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={getStatusVariant(o.status)}>{o.status}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <select
                                        value={o.status}
                                        onChange={(e) => updateStatus(o.id, e.target.value)}
                                        className="bg-slate-100 border-none rounded-lg text-xs font-bold p-2 outline-none focus:ring-2 focus:ring-brand-primary/20"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}

                        {!loading && orders.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium italic">
                                    No orders found in the system.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default Orders;
