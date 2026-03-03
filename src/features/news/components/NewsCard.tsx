import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  date,
  author,
  imageUrl,
  category,
  categoryColor
}) => {
  return (
    <div className="card hover:-translate-y-2 p-0 overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div 
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs text-white"
          style={{ backgroundColor: categoryColor }}
        >
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">{title}</h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{author}</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[var(--color-primary)] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
