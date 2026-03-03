import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface UnitHeroCarouselProps {
  unitName: string;
  fullName: string;
  accentColor: string;
  icon: string;
  onCtaClick?: () => void;
}

export const UnitHeroCarousel: React.FC<UnitHeroCarouselProps> = ({
  unitName,
  fullName,
  accentColor,
  icon,
  onCtaClick = () => {}
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    setDidIconError(false);
  }, [resolvedIconSrc]);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop',
      title: `Selamat Datang di ${fullName}`,
      description: 'Membentuk Generasi Qur\'ani yang Cerdas, Berakhlak Mulia, dan Berprestasi',
      badge: (
        <span className="inline-flex items-center gap-2">
          {resolvedIconSrc && !didIconError ? (
            <img
              src={resolvedIconSrc}
              alt={unitName}
              className="w-5 h-5 object-contain"
              onError={() => setDidIconError(true)}
            />
          ) : (
            <span>{icon}</span>
          )}
          <span>{unitName} Baituljannah</span>
        </span>
      )
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&h=1080&fit=crop',
      title: 'Pendidikan Berkualitas',
      description: 'Kurikulum terintegrasi dengan metode pembelajaran modern dan Islami',
      badge: `📚 Kurikulum ${unitName}`
    },
    {
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=1080&fit=crop',
      title: 'Prestasi Gemilang',
      description: 'Raih prestasi akademik dan non-akademik di berbagai kompetisi',
      badge: '🏆 Berprestasi'
    },
    {
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=1080&fit=crop',
      title: 'Fasilitas Modern',
      description: 'Dilengkapi fasilitas pembelajaran yang lengkap dan nyaman',
      badge: '🏫 Fasilitas Lengkap'
    }
  ];

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            style={index === currentSlide ? { backgroundColor: accentColor } : {}}
          />
        ))}
      </div>
    </section>
  );
};
