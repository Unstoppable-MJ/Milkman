import React from 'react';
import { twMerge } from 'tailwind-merge';

const Input = ({ className, label, error, ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="text-sm font-medium text-slate-700 ml-1">
                    {label}
                </label>
            )}
            <input
                className={twMerge(
                    'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm transition-all duration-200',
                    'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary',
                    error && 'border-state-danger focus:ring-state-danger/20 focus:border-state-danger',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-state-danger ml-1 font-medium">{error}</p>
            )}
        </div>
    );
};

export default Input;
