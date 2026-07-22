import React from 'react';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  darkMode?: boolean;
  id?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  onDelete,
  darkMode = false,
  id,
}) => {
  // Specs: Chip border radius = 12px (rounded-xl)
  const baseStyle = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-all duration-300 rounded-[12px] select-none border';
  
  const lightStyles = selected
    ? 'bg-primary text-white border-primary shadow-sm'
    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800';

  const darkStyles = selected
    ? 'bg-accent text-white border-accent shadow-sm shadow-accent/20'
    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white';

  return (
    <span
      id={id}
      onClick={onClick}
      className={`
        ${baseStyle} 
        ${darkMode ? darkStyles : lightStyles}
        ${onDelete ? 'pr-2' : ''}
      `}
    >
      <span>{label}</span>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/15 focus:outline-none"
        >
          <X className="w-3 h-3 text-current" />
        </button>
      )}
    </span>
  );
};
