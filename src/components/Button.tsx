import React, { useState, useLayoutEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  className = '',
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [count, setCount] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple: Ripple = {
      id: count,
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
    setCount((prev) => prev + 1);

    // Trigger user-provided onClick if exists
    if (onClick) {
      onClick(e);
    }
  };

  useLayoutEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  // Styling based on VIECLAB design guidelines
  const baseStyle = 'relative overflow-hidden font-sans font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  // Specific border radius for Button = 16px (rounded-2xl is 1rem/16px in Tailwind CSS)
  const shapeStyle = 'rounded-[16px]';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4.5 text-base',
  };

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-floating focus:ring-primary/40',
    accent: 'bg-accent text-white hover:bg-accent-hover focus:ring-accent/40',
    secondary: 'bg-white text-primary border border-slate-100 hover:bg-slate-50 focus:ring-slate-300',
    success: 'bg-success text-white hover:opacity-95 focus:ring-success/40',
    danger: 'bg-error text-white hover:opacity-95 focus:ring-error/40',
    outline: 'bg-transparent text-primary border-2 border-primary/20 hover:border-primary hover:bg-primary-light/20 focus:ring-primary/40',
  };

  return (
    <button
      className={`${baseStyle} ${shapeStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onMouseDown={handleMouseDown}
      disabled={isLoading || props.disabled}
      id={props.id || `btn-${variant}`}
      {...props}
    >
      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none bg-white/30 animate-ping"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear forwards',
          }}
        />
      ))}

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        icon && <span className="flex items-center justify-center">{icon}</span>
      )}
      
      <span>{children}</span>

      {/* Ripple Animation Style Injector */}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};
