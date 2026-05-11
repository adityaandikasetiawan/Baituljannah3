import React, { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export function AchievementsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const achievements = [
    { title: 'Peserta Olimpiade Terbaik', description: 'SAHABAYA CUP 2025', image: '/uploads/achievement/achievement_1769996411538_dig650xbr3b.webp' },
    { title: 'Pencak Silat Tunggal', description: 'SAHABAYA CUP 2025', image: '/uploads/achievement/achievement_1770259138348_pcj36zz54xh.webp' },
    { title: 'Pidato Bahasa Inggris', description: 'SAHABAYA CUP 2025', image: '/uploads/achievement/achievement_1770259163513_vakbjibn58j.webp' },
    { title: 'Matematika Olimpiade', description: 'Kompetisi Sains Nasional 2025', image: '/uploads/achievement/achievement_1770259176223_998ib4a3t76.webp' },
    { title: 'Tahfidz Al-Qur’an', description: 'MTQ 2025', image: '/uploads/achievement/achievement_1770259190080_iu7u3uoup9.webp' },
    { title: 'Robotika', description: 'Indonesia Robot Olympiad 2025', image: '/uploads/achievement/achievement_1770259204289_7zh4ifi6pca.webp' },
    { title: 'Juara Umum', description: 'Lomba Cerdas Cermat 2025', image: '/uploads/achievement/achievement_1770259218100_4znqxdhqfjq.webp' },
    { title: 'Lari Marathon', description: 'Pekan Olahraga Pelajar 2025', image: '/uploads/achievement/achievement_1770259234557_sdnixtxzwr.webp' },
    { title: 'Seni Lukis', description: 'FLS2N 2025', image: '/uploads/achievement/achievement_1770601549377_5saxw8xrr2i.webp' },
    { title: 'Pidato Bahasa Arab', description: 'Musabaqah Bahasa Arab 2025', image: '/uploads/achievement/achievement_1770601631186_pq0yr3wit0b.webp' },
    { title: 'Olimpiade Biologi', description: 'Olimpiade Sains Nasional 2025', image: '/uploads/achievement/achievement_1770601645303_qumz9y74jk.webp' },
    { title: 'Karate', description: 'Kejuaraan Karate Pelajar 2025', image: '/uploads/achievement/achievement_1770601668743_4hdkv8zve2a.webp' },
  ];

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-6 font-bold">Prestasi Siswa</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Bukti nyata keberhasilan pendidikan di Baituljannah melalui pencapaian gemilang para siswa
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={scrollPrev}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm items-center justify-center transition-colors"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {achievements.map((item, idx) => (
                <div key={idx} className="min-w-0 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-white/10 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={1}
                        height={1}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        loading="lazy"
                        className="w-full h-full object-cover"
                        style={{ width: '100%', height: '100%' }}
                        unoptimized
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-blue-100">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm items-center justify-center transition-colors"
            aria-label="Berikutnya"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
