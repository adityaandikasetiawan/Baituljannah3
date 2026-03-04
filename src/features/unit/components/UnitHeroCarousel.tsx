import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface UnitHeroCarouselProps {
  unitName: string;
  fullName: string;
  accentColor: string;
  icon: string;
  slug?: string;
  onCtaClick?: () => void;
}

export const UnitHeroCarousel: React.FC<UnitHeroCarouselProps> = ({
  unitName,
  fullName,
  accentColor,
  icon,
  slug,
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

  const defaultBadge = (
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
  );

  const getSlides = () => {
    const unitSlug = (slug || '').toLowerCase();
    
    if (unitSlug === 'smpit') {
      return [
        {
          image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&h=1080&fit=crop', // Group of students studying
          title: `Selamat Datang di ${fullName}`,
          description: 'Sekolah Menengah Pertama Islam Terpadu yang Menginspirasi dan Berkarakter',
          badge: defaultBadge
        },
        {
          image: 'https://images.unsplash.com/photo-1576091160550-217358c7db81?w=1920&h=1080&fit=crop', // Science lab
          title: 'Sains & Teknologi',
          description: 'Mengembangkan potensi ilmiah melalui Science Club dan pembelajaran berbasis praktik',
          badge: '🔬 Science & Tech'
        },
        {
          image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=1920&h=1080&fit=crop', // Quran reading
          title: 'Generasi Qur\'ani',
          description: 'Program Tahfidz intensif dan pembinaan karakter Islami yang kuat',
          badge: '📖 Tahfidz & Karakter'
        },
        {
          image: 'https://images.unsplash.com/photo-1529390003868-6c640a9376c6?w=1920&h=1080&fit=crop', // Students discussing/collaborating
          title: 'Bilingual & Global',
          description: 'Siap bersaing di era global dengan kemampuan bahasa Arab dan Inggris',
          badge: '🌍 Wawasan Global'
        }
      ];
    }

    if (unitSlug === 'smait') {
      return [
        {
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop', // Graduation/College prep vibe
          title: `Selamat Datang di ${fullName}`,
          description: 'Mempersiapkan Pemimpin Masa Depan yang Cerdas, Mandiri, dan Bertakwa',
          badge: defaultBadge
        },
        {
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=1080&fit=crop', // Research/Lab
          title: 'Riset & Inovasi',
          description: 'Mengasah kemampuan berpikir kritis melalui program Research & Scientific Writing',
          badge: '🧪 Riset Ilmiah'
        },
        {
          image: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?w=1920&h=1080&fit=crop', // University/Library
          title: 'Sukses PTN & Kedinasan',
          description: 'Bimbingan intensif dan terstruktur menuju Perguruan Tinggi Impian',
          badge: '🎓 Menuju Kampus Impian'
        },
        {
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop', // Leadership/Meeting
          title: 'Leadership & Entrepreneurship',
          description: 'Membangun jiwa kepemimpinan dan kewirausahaan sejak dini',
          badge: '💼 Calon Pemimpin'
        }
      ];
    }

    // Default slides for other units
    return [
      {
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop',
        title: `Selamat Datang di ${fullName}`,
        description: 'Membentuk Generasi Qur\'ani yang Cerdas, Berakhlak Mulia, dan Berprestasi',
        badge: defaultBadge
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
  };

  const slides = getSlides();

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
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <div className="container-custom px-4">
              <div 
                className={`transform transition-all duration-1000 delay-300 ${
                  index === currentSlide 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
                  {slide.badge}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button 
                    onClick={onCtaClick}
                    className="px-8 py-4 rounded-full font-semibold text-white transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ backgroundColor: accentColor }}
                  >
                    Daftar Sekarang
                  </button>
                  <button className="px-8 py-4 rounded-full font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-10' 
                : 'w-3 bg-white/50 hover:bg-white/80'
            }`}
            style={index === currentSlide ? { backgroundColor: accentColor } : {}}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
