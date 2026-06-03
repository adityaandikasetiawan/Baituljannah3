'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Image as ImageIcon, X, Download, Share2, ZoomIn, Calendar, Tag, Eye, Grid, List, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  date: string;
  views: number;
  description: string;
  color: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Kegiatan: '#3B82F6',
  Fasilitas: '#10B981',
  Event: '#F97316',
  Pembelajaran: '#F472B6',
  Lainnya: '#6B7280',
};

export default function GalleryPage() {
  const { menuItems, onNavigate } = useNavigationMenu();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiBaseUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
    return base.replace(/\/$/, '');
  }, []);

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Galeri' }
  ];

  // Fetch galeri dari API
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetch(`${apiBaseUrl}/gallery?limit=100`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        if (cancelled) return;
        const rows = data?.success && Array.isArray(data.data) ? data.data : [];
        if (rows.length > 0) {
          setGalleryItems(rows.map((row: any) => ({
            id: Number(row.id),
            image: row.image_url || '',
            title: String(row.title || ''),
            category: String(row.category || 'Lainnya'),
            date: String(row.created_at || '').split('T')[0],
            views: Number(row.views || 0),
            description: String(row.description || ''),
            color: CATEGORY_COLORS[row.category] ?? '#6B7280',
          })));
        }
        setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [apiBaseUrl]);

  // Kategori dinamis dari data
  const categories = useMemo(() => {
    const colorMap: Record<string, string> = {
      Semua: 'from-gray-500 to-gray-600',
      Kegiatan: 'from-blue-500 to-cyan-600',
      Fasilitas: 'from-green-500 to-emerald-600',
      Event: 'from-orange-500 to-amber-600',
      Pembelajaran: 'from-pink-500 to-rose-600',
    };
    const counts: Record<string, number> = { Semua: galleryItems.length };
    galleryItems.forEach(g => { counts[g.category] = (counts[g.category] || 0) + 1; });
    return Object.entries(counts).map(([name, count]) => ({
      name, count, color: colorMap[name] ?? 'from-gray-400 to-gray-500',
    }));
  }, [galleryItems]);

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

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Gallery Grid & Empty State */}
        {!isLoading && (
          <>
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
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{item.date}</span>
                        <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{item.views}</span>
                      </div>
                      <h3 className="text-white font-semibold text-lg line-clamp-2">{item.title}</h3>
                    </div>
                  </div>
                  {viewMode === 'masonry' && (
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{item.description}</p>
                      <div className="flex items-center text-green-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredGallery.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {galleryItems.length === 0 ? 'Belum ada foto di galeri' : 'Tidak ada foto ditemukan'}
                </h3>
                <p className="text-gray-600">
                  {galleryItems.length === 0 ? 'Tambahkan foto melalui panel admin' : 'Coba pilih kategori lain atau reset filter'}
                </p>
              </div>
            )}
          </>
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

