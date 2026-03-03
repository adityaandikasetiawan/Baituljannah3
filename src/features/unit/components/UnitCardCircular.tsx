import React, { useMemo, useState } from 'react';

interface UnitCardCircularProps {
  name: string;
  icon: string;
  color: string;
  onClick: () => void;
}

export const UnitCardCircular: React.FC<UnitCardCircularProps> = ({
  name,
  icon,
  color,
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
    <div className="flex flex-col items-center gap-4 group">
      {/* Circular Icon */}
      <div 
        className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer transform"
        onClick={onClick}
      >
        {resolvedIconSrc && !didIconError ? (
          <img
            src={resolvedIconSrc}
            alt={name}
            className="w-full h-full object-contain"
            onError={() => setDidIconError(true)}
          />
        ) : (
          <span className="text-4xl md:text-5xl text-white">{icon}</span>
        )}
      </div>
      
      {/* Name */}
      <div className="text-center">
        <h3 className="text-white mb-3 text-base md:text-lg">{name}</h3>
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
