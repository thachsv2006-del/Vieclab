import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'floating' | 'outline' | 'flat';
  darkMode?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'floating',
  darkMode = false,
  className = '',
  ...props
}) => {
  // Specs:
  // - Border Radius: Card = 20px (rounded-[20px])
  // - Shadows: Soft Floating Shadow (Y: 8px, Blur: 24px, #1565C0, Opacity 0.04)
  
  const baseStyle = 'transition-all duration-300 rounded-[20px] overflow-hidden border p-5 bg-white dark:bg-card-dark';

  const shadowLight = 'shadow-floating border-slate-100/80';
  const shadowDark = 'shadow-floating-dark border-slate-800/80';

  const variantStyles = {
    floating: darkMode ? shadowDark : shadowLight,
    outline: darkMode ? 'border-slate-800' : 'border-slate-200',
    flat: darkMode ? 'bg-slate-900 border-transparent' : 'bg-slate-50 border-transparent',
  };

  return (
    <div
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
