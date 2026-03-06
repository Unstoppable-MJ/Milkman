import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import api from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orderDone, setOrderDone] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      // Prepared data for the new Order/OrderItem structure
      const orderData = {
        payment_method: paymentMethod,
        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity
        }))
      };

      await api.post('/order/buy/', orderData);
      clearCart();
      setOrderDone(true);
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed. Please check stock availability.");
    } finally {
      setLoading(false);
    }
  };

  if (orderDone) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl shadow-lg border border-green-200">
          🎉
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Order Placed Successfully!</h2>
          <p className="text-slate-500 max-w-sm mx-auto">Your fresh products are on their way. You can track your order in your profile.</p>
        </div>
        <Button onClick={() => window.location.href = '/shop'} size="lg" className="rounded-2xl px-12">
          Back to Shop
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
        <span className="text-7xl">🛒</span>
        <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-400">Looks like you haven't added anything yet.</p>
        <Button onClick={() => window.location.href = '/shop'} variant="outline" className="mt-4 rounded-xl">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12 items-start">
      {/* Items List */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Your Cart</h1>
        {cart.map((item) => (
          <Card key={item.id} className="p-4 flex flex-col sm:flex-row items-center gap-6 group hover:translate-x-1 transition-transform">
            <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">🥛</div>
              )}
            </div>

            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
              <p className="text-sm text-slate-400 font-medium tracking-tight uppercase">{item.category_name}</p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >-</button>
                <span className="font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >+</button>
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="font-extrabold text-xl text-slate-900">₹{item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-state-danger text-xs font-bold hover:underline"
              >
                Remove
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Side */}
      <div className="space-y-6 sticky top-24">
        <Card className="p-8 space-y-8 bg-slate-900 text-white border-none shadow-2xl">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="space-y-4 text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-semibold">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-brand-secondary font-bold">FREE</span>
            </div>
            <hr className="border-slate-800" />
            <div className="flex justify-between text-xl font-extrabold text-white pt-2">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment Method</p>
            <div className="grid grid-cols-1 gap-3">
              {['COD', 'Online'].map(method => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`px-4 py-3 rounded-xl border transition-all flex items-center justify-between font-bold ${paymentMethod === method
                      ? 'border-brand-primary bg-brand-primary/10 text-white'
                      : 'border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                >
                  <span>{method === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</span>
                  {paymentMethod === method && <Badge variant="info">Selected</Badge>}
                </button>
              ))}
            </div>
          </div>

          <Button
            className="w-full py-4 text-lg font-bold shadow-xl shadow-brand-primary/20"
            variant="secondary"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Place Order Now'}
          </Button>

          <p className="text-[10px] text-slate-500 text-center">
            By placing your order, you agree to our Terms of Service.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Cart;