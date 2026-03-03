import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Image as ImageIcon, X, Download, Share2, ZoomIn, Calendar, Tag, Eye, Grid, List, Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface GalleryProps {
  onNavigate?: (page: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onNavigate = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => onNavigate('main') },
    {
      label: 'Tentang',
      href: '#',
      submenu: [
        { label: 'Visi & Misi', href: '#', onClick: () => onNavigate('vision-mission') },
        { label: 'Kurikulum', href: '#', onClick: () => onNavigate('about') },
        { label: 'Fasilitas', href: '#', onClick: () => onNavigate('about') },
        { label: 'Kepengurusan', href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: 'Profile',
      href: '#',
      submenu: [
        { label: 'Profil Yayasan', href: '#', onClick: () => onNavigate('about') },
        { label: 'Sejarah', href: '#', onClick: () => onNavigate('about') },
        { label: 'Struktur Organisasi', href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: 'Informasi',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => onNavigate('news') },
        { label: 'Galeri Foto', href: '#', onClick: () => onNavigate('gallery') },
        { label: 'Prestasi', href: '#', onClick: () => onNavigate('achievement') },
        { label: 'Program', href: '#', onClick: () => onNavigate('programs') }
      ]
    },
    { label: 'Karir', href: '#', onClick: () => onNavigate('career') },
    {
      label: 'SPMB',
      href: '#',
      submenu: [
        { label: 'Pendaftaran', href: '#', onClick: () => onNavigate('admission') },
        { label: 'Jadwal & Alur', href: '#', onClick: () => onNavigate('admission') },
        { label: 'Biaya Pendidikan', href: '#', onClick: () => onNavigate('admission') }
      ]
    },
    { label: 'Kontak', href: '#', onClick: () => onNavigate('contact') }
  ];

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
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gallery-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="white"/>
                <circle cx="75" cy="75" r="2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gallery-pattern)"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} theme="dark" />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <ImageIcon className="w-4 h-4" />
              <span>Dokumentasi Kegiatan</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Galeri Foto</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Dokumentasi momen berharga, prestasi gemilang, dan kegiatan inspiratif di Yayasan Baituljannah
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-soft sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === cat.name
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>{cat.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.name ? 'bg-white/30' : 'bg-gray-200'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'masonry' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Masonry View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title="Grid View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-gray-600">
            Menampilkan <strong>{filteredGallery.length}</strong> foto
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredGallery.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'masonry' 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : 'md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 ${
                    viewMode === 'masonry' && index % 3 === 0 ? 'lg:row-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === 'masonry' && index % 3 === 0 ? 'h-96 lg:h-full' : 'h-64'
                  }`}>
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span 
                          className="inline-block px-3 py-1 rounded-full text-white text-xs mb-3 backdrop-blur-md"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.category}
                        </span>
                        <h3 className="text-white text-lg mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-4 text-white/90 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl text-gray-600 mb-2">Tidak ada foto ditemukan</h3>
              <p className="text-gray-500 mb-6">Coba pilih kategori lain</p>
              <button
                onClick={() => setSelectedCategory('Semua')}
                className="btn-outline"
              >
                Lihat Semua Foto
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain"
              />
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-4 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-white text-sm mb-3"
                    style={{ backgroundColor: selectedImage.color }}
                  >
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl mb-2">{selectedImage.title}</h3>
                  <p className="text-white/80 mb-4">{selectedImage.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedImage.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedImage.views} views
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer siteName="Baitul Jannah Islamic School" accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
};

