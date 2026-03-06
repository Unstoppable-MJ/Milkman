import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ className, glass = false, children, ...props }) => {
  return (
    <div
      className={twMerge(
        'rounded-2xl overflow-hidden transition-all duration-300',
        glass ? 'glass-effect' : 'premium-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
