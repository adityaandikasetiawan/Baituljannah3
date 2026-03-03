import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accentColor?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  onSecondaryClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  accentColor = '#1E4AB8',
  ctaText = 'Daftar Sekarang',
  onCtaClick = () => {},
  onSecondaryClick = () => {}
}) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-40"></div>
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full text-sm" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {subtitle}
            </div>
            <h1 className="text-4xl lg:text-5xl">{title}</h1>
            <p className="text-gray-600 text-lg">{description}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={onCtaClick} className="btn-primary flex items-center justify-center gap-2" style={{ backgroundColor: accentColor }}>
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onSecondaryClick} className="btn-outline" style={{ borderColor: accentColor, color: accentColor }}>
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <h3 style={{ color: accentColor }}>1000+</h3>
                <p className="text-gray-600 text-sm">Siswa Aktif</p>
              </div>
              <div>
                <h3 style={{ color: accentColor }}>100+</h3>
                <p className="text-gray-600 text-sm">Guru Profesional</p>
              </div>
              <div>
                <h3 style={{ color: accentColor }}>25+</h3>
                <p className="text-gray-600 text-sm">Tahun Berpengalaman</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accentColor }}></div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-strong">
              <ImageWithFallback
                src={imageUrl}
                alt={title}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
