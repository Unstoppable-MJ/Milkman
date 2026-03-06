import React from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="advanced-card group relative flex flex-col h-full bg-white z-10">
            {/* Image Container with Floating Badges */}
            <div className="aspect-[4/3] bg-gradient-to-tr from-slate-50 to-slate-100 relative overflow-hidden flex-shrink-0">
                {product?.image ? (
                    <img
                        src={product.image}
                        alt={product?.name || "Product"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out p-6 drop-shadow-md"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-slate-300 bg-slate-50/50">🥛</div>
                )}

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-20">
                    {product?.discount_percent > 0 ? (
                        <div className="bg-gradient-to-r from-red-500 to-rose-400 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30">
                            {product.discount_percent}% OFF
                        </div>
                    ) : <div></div>}

                    {product?.stock <= 5 && product?.stock > 0 && (
                        <div className="bg-amber-100/90 backdrop-blur-sm text-amber-700 border border-amber-200/50 text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-sm">
                            Only {product.stock} Left
                        </div>
                    )}
                </div>

                {/* Out of Stock Overlay */}
                {product?.stock === 0 && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[4px] flex flex-col items-center justify-center z-30">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl mb-3">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <span className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Rest of the Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white relative">

                {/* Product Info */}
                <div className="space-y-2">
                    <p className="inline-block text-[10px] font-black text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md uppercase tracking-widest">
                        {product?.category_name || 'General'}
                    </p>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">
                        {product?.name || 'Premium Dairy Product'}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 min-h-[40px]">
                        {product?.description || 'Experience the purest, freshest farm delivery right to your door.'}
                    </p>
                </div>

                {/* Pricing & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Price</span>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-slate-900 leading-none">
                                ₹{product?.discounted_price || product?.price || 0}
                            </span>
                            {product?.discount_percent > 0 && (
                                <span className="text-sm text-slate-400 font-bold line-through">₹{product?.price}</span>
                            )}
                        </div>
                    </div>

                    <button
                        disabled={product?.stock === 0}
                        onClick={() => addToCart(product)}
                        className={`w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-300 active:scale-90 ${product?.stock > 0
                                ? 'bg-slate-900 text-white hover:bg-brand-primary hover:shadow-brand-primary/30 group-hover:-translate-y-1'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        <span className="text-xl">{product?.stock > 0 ? '➕' : '❌'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
