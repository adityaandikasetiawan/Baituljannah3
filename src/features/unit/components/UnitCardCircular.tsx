import React, { useMemo, useState } from 'react';

interface UnitCardCircularProps {
  name: string;
  icon: string;
  color: string;
  onClick: () => void;
  imageClassName?: string;
  className?: string;
  titleClassName?: string;
}

export const UnitCardCircular: React.FC<UnitCardCircularProps> = ({
  name,
  icon,
  color,
  onClick,
  imageClassName,
  className,
  titleClassName
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
    <div className={`flex flex-col items-center group ${className || 'gap-4'}`}>
      {/* Circular Icon */}
      <div 
        className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer transform"
        onClick={onClick}
      >
        {resolvedIconSrc && !didIconError ? (
          <img
            src={resolvedIconSrc}
            alt={name}
            className={`w-full h-full object-contain ${imageClassName || ''}`}
            onError={() => setDidIconError(true)}
          />
        ) : (
          <span className="text-4xl md:text-5xl text-white">{icon}</span>
        )}
      </div>
      
      {/* Name */}
      <div className="text-center">
        <h3 className={`text-white text-base md:text-lg ${titleClassName || 'mb-3'}`}>{name}</h3>
        <button
          onClick={onClick}
          className="px-6 py-2 rounded-full border-2 border-white text-white text-sm hover:bg-white hover:text-[#5B4DB5] transition-all duration-300 hover:scale-105"
        >
          Selengkapnya
        </button>
      </div>
    </div>
  );
};
