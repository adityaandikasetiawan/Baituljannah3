import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import Image from 'next/image';

export function NewsSection() {
  const { onNavigate } = useNavigationMenu();

  const news = [
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=75',
      title: 'SMAIT Juara Olimpiade Matematika Nasional 2024',
      date: '15 November 2024',
      category: 'Prestasi',
      excerpt: 'Tim olimpiade SMAIT Baituljannah berhasil meraih medali emas pada kompetisi Olimpiade Matematika tingkat nasional...',
    },
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=75',
      title: 'Launching Program Tahfidz Intensif 2025',
      date: '10 November 2024',
      category: 'Program',
      excerpt: 'Yayasan Baituljannah meluncurkan program tahfidz intensif dengan target hafalan 30 juz untuk siswa berprestasi...',
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=75',
      title: 'Workshop Parenting untuk Orang Tua Siswa',
      date: '5 November 2024',
      category: 'Kegiatan',
      excerpt: 'Kegiatan workshop parenting Islami dengan tema "Mendidik Anak di Era Digital" dihadiri 200+ orang tua...',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl lg:text-4xl">Berita Dan Kegiatan Sekolah</h2>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#1E4AB8] transition-colors"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            {news.length > 0 && (
              <div className="group cursor-pointer" onClick={() => onNavigate('news')}>
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-white">
                  <Image
                    src={news[0].image}
                    alt={news[0].title}
                    width={1}
                    height={1}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    loading="lazy"
                    className="w-full h-full object-contain bg-white"
                    style={{ width: '100%', height: '100%' }}
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#1E4AB8] shadow-sm">
                      {news[0].category}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#1E4AB8] transition-colors line-clamp-2">
                  {news[0].title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{news[0].date}</span>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {news[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[#1E4AB8] font-semibold group-hover:translate-x-2 transition-transform">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-6">
            {news.slice(1).map((item, index) => (
              <div
                key={index}
                className="group flex flex-col sm:flex-row gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onNavigate('news')}
              >
                <div className="w-full sm:w-48 aspect-video rounded-xl overflow-hidden shrink-0 bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1}
                    height={1}
                    sizes="(max-width: 640px) 100vw, 192px"
                    loading="lazy"
                    className="w-full h-full object-contain bg-white"
                    style={{ width: '100%', height: '100%' }}
                    unoptimized
                  />
                </div>
                <div>
                  <div className="mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 group-hover:bg-[#1E4AB8] group-hover:text-white transition-colors">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#1E4AB8] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span>{item.date}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
