import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (page: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate = () => {} }) => {
  return (
    <nav className="flex items-center gap-2 text-sm">
      <button onClick={() => onNavigate('main')} className="flex items-center gap-1 text-gray-500 hover:text-[var(--color-primary)] transition-colors">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.onClick || item.href ? (
            <button onClick={item.onClick} className="text-gray-500 hover:text-[var(--color-primary)] transition-colors">
              {item.label}
            </button>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
