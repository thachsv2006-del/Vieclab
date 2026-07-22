import React from 'react';

interface BadgeProps {
  status: 'success' | 'warning' | 'error' | 'primary' | 'neutral';
  children: React.ReactNode;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, children, id }) => {
  // Badges are usually small capsules, completely rounded, but conforming to premium minimalist style
  const baseStyle = 'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full select-none uppercase tracking-wider border';

  const statusStyles = {
    primary: 'bg-primary-light text-primary border-primary/20 dark:bg-primary/20 dark:text-accent dark:border-accent/30',
    success: 'bg-green-50 text-success border-success/20 dark:bg-success/15 dark:text-success dark:border-success/30',
    warning: 'bg-amber-50 text-warning border-warning/20 dark:bg-warning/15 dark:text-warning dark:border-warning/30',
    error: 'bg-red-50 text-error border-error/20 dark:bg-red-15 dark:text-error dark:border-error/30',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  };

  return (
    <span id={id} className={`${baseStyle} ${statusStyles[status]}`}>
      {children}
    </span>
  );
};
