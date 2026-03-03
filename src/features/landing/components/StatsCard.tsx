import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  return (
    <div className="card-gradient">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <h2 className="text-3xl">{value}</h2>
        </div>
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: color }} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2">
          {trend.isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.value}
          </span>
          <span className="text-gray-400 text-sm">vs bulan lalu</span>
        </div>
      )}
    </div>
  );
};
