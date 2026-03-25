import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProgramCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ title, description, icon: Icon, color }) => {
  return (
    <div className="card hover:-translate-y-2 group">
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-8 h-8" style={{ color: color }} />
      </div>
      <h4 className="mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
