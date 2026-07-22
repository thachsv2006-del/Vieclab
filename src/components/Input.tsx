import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  darkMode?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  darkMode = false,
  className = '',
  ...props
}) => {
  const isError = !!error;
  
  // Design system specific rules:
  // - Border Radius: Input/Chip = 12px (rounded-[12px])
  // - Focus glow: active Focus glow 2px (ring-2 with customized active focus transition)
  
  const labelStyles = darkMode 
    ? 'text-slate-400 font-semibold text-xs' 
    : 'text-slate-600 font-semibold text-xs';

  const containerBg = darkMode
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-200';

  const textColors = darkMode
    ? 'text-white placeholder:text-slate-500'
    : 'text-slate-800 placeholder:text-slate-400';

  const focusGlowStyle = isError
    ? 'ring-2 ring-error/30 border-error'
    : 'focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className={`block tracking-wide select-none ${labelStyles}`} htmlFor={props.id}>
          {label}
        </label>
      )}

      <div
        className={`
          relative flex items-center border rounded-[12px] transition-all duration-300
          ${containerBg} ${focusGlowStyle} ${isError ? 'border-error' : 'border-slate-200 dark:border-slate-800'}
        `}
      >
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          className={`
            w-full px-4 py-3 bg-transparent font-sans text-sm focus:outline-none rounded-[12px]
            ${leftIcon ? 'pl-11' : ''} 
            ${rightIcon ? 'pr-11' : ''}
            ${textColors}
          `}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center justify-center text-slate-400 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <span
          className={`text-xs select-none mt-0.5 ${
            isError ? 'text-error font-medium' : darkMode ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};
