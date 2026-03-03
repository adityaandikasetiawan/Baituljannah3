import React, { useMemo, useState } from 'react';
import { ArrowRight, Users, BookOpen, Award } from 'lucide-react';

interface UnitCardProps {
  name: string;
  fullName: string;
  description: string;
  domain: string;
  color: string;
  icon: string;
  students: string;
  onClick: () => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
  name,
  fullName,
  description,
  domain,
  color,
  icon,
  students,
  onClick
}) => {
  const [didIconError, setDidIconError] = useState(false);

  const resolvedIconSrc = useMemo(() => {
    const input = icon?.trim();
    if (!input) return null;
    if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('data:') || input.startsWith('/')) {
      return input;
    }
    if (/\.(png|jpe?g|webp|gif|svg)$/i.test(input)) return `/uploads/logos/${input}`;
    return null;
  }, [icon]);

  return (
    <div 
      className="card hover:scale-105 cursor-pointer group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-14 h-14 flex items-center justify-center text-2xl"
            style={{ color: color }}
          >
            {resolvedIconSrc && !didIconError ? (
              <img
                src={resolvedIconSrc}
                alt={name}
                className="w-10 h-10 object-contain"
                onError={() => setDidIconError(true)}
              />
            ) : (
              icon
            )}
          </div>
          <div>
            <h3 style={{ color: color }}>{name}</h3>
            <p className="text-gray-500 text-sm">{fullName}</p>
          </div>
        </div>
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
          style={{ backgroundColor: `${color}10` }}
        >
          <ArrowRight className="w-5 h-5" style={{ color: color }} />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 line-clamp-2">{description}</p>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{students} Siswa</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Terakreditasi A</span>
        </div>
      </div>

      {/* Domain */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">{domain}</span>
        <span 
          className="text-xs px-3 py-1 rounded-full"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          Buka Website
        </span>
      </div>
    </div>
  );
};
