import React from 'react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ className, children, variant = 'info', ...props }) => {
    const variants = {
        success: 'bg-green-100 text-green-700 border-green-200',
        danger: 'bg-red-100 text-red-700 border-red-200',
        warning: 'bg-amber-100 text-amber-700 border-amber-200',
        info: 'bg-blue-100 text-blue-700 border-blue-200',
        glass: 'bg-white/30 backdrop-blur-md text-slate-800 border-white/40',
    };

    return (
        <span
            className={twMerge(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
