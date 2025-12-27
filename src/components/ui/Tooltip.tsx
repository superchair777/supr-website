import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'left',
  className = '' 
}) => {
  const positionClasses = {
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  };

  const arrowClasses = {
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent border-[4px]',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent border-[4px]',
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent border-[4px]',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent border-[4px]',
  };

  return (
    <div className={`group relative flex items-center justify-center ${className}`}>
      {children}
      <div className={`absolute pointer-events-none px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-[60] ${positionClasses[position]}`}>
        {content}
        {/* Arrow */}
        <div className={`absolute w-0 h-0 ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
};
