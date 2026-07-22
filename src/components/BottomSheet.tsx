import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  darkMode?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  darkMode = false,
}) => {
  // Prevent background scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const bgStyle = darkMode ? 'bg-card-dark text-white' : 'bg-white text-slate-800';
  const handleColor = darkMode ? 'bg-slate-700' : 'bg-slate-300';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Sliding Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`
              relative w-full max-w-lg rounded-t-[24px] shadow-2xl flex flex-col max-h-[90vh] z-10
              ${bgStyle}
            `}
          >
            {/* Grab Handle */}
            <div className="w-full flex justify-center py-3.5 cursor-pointer" onClick={onClose}>
              <div className={`w-12 h-1.5 rounded-full ${handleColor}`} />
            </div>

            {/* Header */}
            <div className="px-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
              <h3 className="text-lg font-bold tracking-tight">
                {title || 'Details'}
              </h3>
              <button
                onClick={onClose}
                className={`
                  p-1.5 rounded-full transition-colors duration-200
                  ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}
                `}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-5 max-h-[60vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
