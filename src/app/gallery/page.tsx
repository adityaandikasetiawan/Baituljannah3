'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Image as ImageIcon, X, Download, Share2, ZoomIn, Calendar, Tag, Eye, Grid, List, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function GalleryPage() {
  const { menuItems, onNavigate } = useNavigationMenu();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Galeri' }
  ];

  const categories = [
    { name: 'Semua', count: 18, color: 'from-gray-500 to-gray-600' },
    { name: 'Kegiatan', count: 6, color: 'from-blue-500 to-cyan-600' },
    { name: 'Fasilitas', count: 5, color: 'from-green-500 to-emerald-600' },
    { name: 'Event', count: 4, color: 'from-orange-500 to-amber-600' },
    { name: 'Pembelajaran', count: 3, color: 'from-pink-500 to-rose-600' }
  ];

  const galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      title: 'Upacara Hari Kemerdekaan RI ke-79',
      category: 'Kegiatan',
      date: '17 Agustus 2024',
      views: 856,
      description: 'Seluruh siswa dan guru mengikuti upacara peringatan hari kemerdekaan dengan khidmat',
      color: '#3B82F6'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
      title: 'Laboratorium Komputer Modern',
      category: 'Fasilitas',
      date: '10 November 2024',
      views: 642,
      description: 'Fasilitas lab komputer dengan perangkat terkini untuk pembelajaran IT',
      color: '#10B981'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1763639700458-38a0fd25335d',
      title: 'Lomba Olahraga Antar Kelas',
      category: 'Event',
      date: '5 November 2024',
      views: 789,
      description: 'Kompetisi olahraga yang seru dan penuh sportivitas',
      color: '#F97316'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
      title: 'Pembelajaran Interaktif di Kelas',
      category: 'Pembelajaran',
      date: '28 Oktober 2024',
      views: 567,
      description: 'Metode pembelajaran aktif dan menyenangkan di kelas',
      color: '#F472B6'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1761445777166-0d4b6f365f4c',
      title: 'Science Fair 2024',
      category: 'Event',
      date: '25 Oktober 2024',
      views: 923,
      description: 'Pameran karya ilmiah siswa yang inovatif dan kreatif',
      color: '#F97316'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754',
      title: 'Kunjungan Industri ke Perusahaan Teknologi',
      category: 'Kegiatan',
      date: '20 Oktober 2024',
      views: 734,
      description: 'Siswa SMAIT berkunjung ke perusahaan teknologi terkemuka',
      color: '#3B82F6'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      title: 'Perpustakaan Digital',
      category: 'Fasilitas',
      date: '15 Oktober 2024',
      views: 512,
      description: 'Perpustakaan dengan koleksi buku digital dan ruang baca nyaman',
      color: '#10B981'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
      title: 'Workshop Robotika untuk Siswa',
      category: 'Pembelajaran',
      date: '12 Oktober 2024',
      views: 845,
      description: 'Pelatihan robotika untuk meningkatkan kreativitas siswa',
      color: '#F472B6'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
      title: 'Gedung Serba Guna',
      category: 'Fasilitas',
      date: '5 Oktober 2024',
      views: 456,
      description: 'Aula besar untuk berbagai acara dan kegiatan sekolah',
      color: '#10B981'
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1588072432904-8cc8cb7e1256',
      title: 'Mabit (Malam Bina Iman dan Taqwa)',
      category: 'Kegiatan',
      date: '1 Oktober 2024',
      views: 923,
      description: 'Kegiatan menginap siswa untuk penguatan spiritual',
      color: '#3B82F6'
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
      title: 'Lapangan Futsal Indoor',
      category: 'Fasilitas',
      date: '28 September 2024',
      views: 678,
      description: 'Fasilitas olahraga modern untuk aktivitas siswa',
      color: '#10B981'
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
      title: 'Perayaan Hari Besar Islam',
      category: 'Event',
      date: '20 September 2024',
      views: 1123,
      description: 'Peringatan Maulid Nabi Muhammad SAW',
      color: '#F97316'
    }
  ];

  const filteredGallery = galleryItems.filter(item => 
    selectedCategory === 'Semua' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        menuItems={menuItems}
        accentColor="#1E4AB8"
      />
      
      {/* Hero Section */}
      <div className="relative bg-green-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-pattern-grid" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-green-800 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-green-400" />
                </span>
                <span className="text-green-300 font-semibold tracking-wide uppercase text-sm">Dokumentasi</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Galeri Kegiatan & Fasilitas
              </h1>
              <p className="text-green-100 text-lg leading-relaxed max-w-xl">
                Dokumentasi kegiatan pembelajaran, acara sekolah, dan fasilitas pendukung pendidikan di Yayasan Baituljannah.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter & View Options */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden
                  ${selectedCategory === category.name 
                    ? 'text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}
                `}
              >
                {selectedCategory === category.name && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-100`} />
                )}
                <div className="relative flex items-center gap-2">
                  <span>{category.name}</span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs
                    ${selectedCategory === category.name ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}
                  `}>
                    {category.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid View"
            >
              <Grid className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'masonry' ? 'bg-gray-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Masonry View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`
          grid gap-6
          ${viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}
        `}>
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`relative overflow-hidden ${viewMode === 'masonry' ? 'aspect-[4/3]' : 'aspect-square'}`}>
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-green-600 transition-colors">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-3 text-white/90 text-sm mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg line-clamp-2">{item.title}</h3>
                </div>
              </div>

              {viewMode === 'masonry' && (
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200`}>
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-green-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada foto ditemukan</h3>
            <p className="text-gray-600">Coba pilih kategori lain atau reset filter</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setSelectedImage(null)} />
          
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section */}
            <div className="flex-1 bg-black flex items-center justify-center relative group">
              <ImageWithFallback
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain"
              />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-96 bg-gray-900 p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-gray-800">
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 mb-4`}>
                  {selectedImage.category}
                </span>
                <h2 className="text-2xl font-bold text-white mb-4 leading-snug">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Tanggal</p>
                    <p className="text-sm font-medium text-gray-300">{selectedImage.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Dilihat</p>
                    <p className="text-sm font-medium text-gray-300">{selectedImage.views} kali</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Kategori</p>
                    <p className="text-sm font-medium text-gray-300">{selectedImage.category}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium border border-gray-700">
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer 
        siteName="Baitul Jannah Islamic School"
        accentColor="#1E4AB8"
        onNavigate={onNavigate}
      />
    </div>
  );
}

