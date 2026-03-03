'use client';
import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Pagination } from '../../components/common/Pagination';
import { Search, Calendar, Tag, TrendingUp, X, ArrowRight, Sparkles, Eye, Share2, Clock, Users } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function NewsPage() {
  const { onNavigate, menuItems } = useNavigationMenu();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Berita' }
  ];

  const categories = [
    { name: 'Semua', count: 15, color: 'from-gray-500 to-gray-600' },
    { name: 'Prestasi', count: 5, color: 'from-purple-500 to-indigo-600' },
    { name: 'Kegiatan', count: 4, color: 'from-orange-500 to-amber-600' },
    { name: 'Akademik', count: 3, color: 'from-blue-500 to-cyan-600' },
    { name: 'Pengumuman', count: 2, color: 'from-green-500 to-emerald-600' },
    { name: 'Event', count: 1, color: 'from-pink-500 to-rose-600' }
  ];

  const featuredNews = {
    image: 'https://images.unsplash.com/photo-1659080907377-ee6a57fb6b9c',
    title: 'SMAIT Baituljannah Raih Juara Umum Olimpiade Sains Nasional 2024',
    date: '20 November 2024',
    category: 'Prestasi',
    excerpt: 'Alhamdulillah, tim olimpiade SMAIT Baituljannah berhasil meraih gelar juara umum pada Olimpiade Sains Nasional 2024. Prestasi ini merupakan hasil kerja keras siswa dan pembimbingan intensif dari para guru...',
    views: '1,234',
    author: 'Admin Baituljannah',
    categoryColor: '#8B5CF6',
    content: 'Alhamdulillah, tim olimpiade SMAIT Baituljannah berhasil meraih gelar juara umum pada Olimpiade Sains Nasional (OSN) 2024 yang diselenggarakan di Jakarta Convention Center. Prestasi membanggakan ini berhasil diraih setelah melalui proses seleksi ketat dan persaingan dengan ratusan sekolah terbaik dari seluruh Indonesia.\n\nDalam kompetisi bergengsi ini, siswa-siswi SMAIT Baituljannah berhasil meraih 3 medali emas, 5 medali perak, dan 4 medali perunggu dalam berbagai bidang sains seperti Matematika, Fisika, Kimia, dan Biologi. Pencapaian ini tidak lepas dari pembinaan intensif yang dilakukan oleh tim guru pembimbing yang berpengalaman.\n\n"Kami sangat bangga dengan prestasi anak-anak. Ini membuktikan bahwa sekolah Islam tidak hanya unggul dalam pendidikan agama, tetapi juga mampu bersaing di bidang akademik," ujar Kepala SMAIT Baituljannah, Ustadz Ahmad Fauzi, M.Pd.\n\nKeberhasilan ini juga didukung oleh fasilitas laboratorium yang lengkap dan program akselerasi akademik yang telah dirancang khusus untuk mengembangkan potensi siswa berprestasi. Yayasan Baituljannah berkomitmen untuk terus meningkatkan kualitas pendidikan dan memberikan pembinaan terbaik bagi siswa-siswinya.'
  };

  const allNews = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1761640864240-f793d7ec8348',
      title: 'Launching Program Tahfidz 30 Juz untuk Siswa Berprestasi',
      date: '18 November 2024',
      category: 'Program',
      excerpt: 'Yayasan Baituljannah meluncurkan program tahfidz intensif dengan target hafalan 30 juz Al-Quran untuk siswa pilihan...',
      views: '856',
      author: 'Tim Tahfidz',
      categoryColor: '#10B981',
      content: 'Program tahfidz 30 juz ini dirancang khusus untuk siswa yang menunjukkan komitmen tinggi dalam menghafal Al-Quran...'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1760259904989-3c9b99ad49d8',
      title: 'Workshop Parenting Islami: Mendidik Anak di Era Digital',
      date: '15 November 2024',
      category: 'Kegiatan',
      excerpt: 'Lebih dari 200 orang tua siswa menghadiri workshop parenting dengan tema mendidik anak di era digital...',
      views: '642',
      author: 'Humas Baituljannah',
      categoryColor: '#F97316',
      content: 'Workshop ini menghadirkan narasumber kompeten dalam bidang psikologi anak dan pendidikan Islam...'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
      title: 'SDIT Baituljannah Juara 1 Lomba Cerdas Cermat Keagamaan',
      date: '12 November 2024',
      category: 'Prestasi',
      excerpt: 'Tim cerdas cermat SDIT berhasil mengalahkan 50 sekolah pesaing dalam kompetisi keagamaan tingkat provinsi...',
      views: '789',
      author: 'Admin Baituljannah',
      categoryColor: '#8B5CF6',
      content: 'Prestasi ini membuktikan kualitas pendidikan agama di SDIT Baituljannah...'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      title: 'Open House PPDB 2025: Kenali Lebih Dekat Baituljannah',
      date: '10 November 2024',
      category: 'Event',
      excerpt: 'Acara open house PPDB 2025 dihadiri ratusan calon orang tua siswa yang antusias mengenal fasilitas sekolah...',
      views: '1,123',
      author: 'Panitia PPDB',
      categoryColor: '#F472B6',
      content: 'Acara open house menjadi kesempatan bagi calon orang tua siswa untuk melihat langsung fasilitas...'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45',
      title: 'Pelatihan Guru: Implementasi Kurikulum Merdeka Berbasis Islam',
      date: '8 November 2024',
      category: 'Akademik',
      excerpt: 'Seluruh guru mengikuti pelatihan intensif untuk implementasi kurikulum merdeka yang terintegrasi nilai Islam...',
      views: '567',
      author: 'Tim Akademik',
      categoryColor: '#3B82F6',
      content: 'Pelatihan ini bertujuan untuk meningkatkan kompetensi guru dalam mengintegrasikan nilai-nilai Islam...'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754',
      title: 'SMPIT Raih Medali Emas Kompetisi Robotika Nasional',
      date: '5 November 2024',
      category: 'Prestasi',
      excerpt: 'Tim robotika SMPIT berhasil meraih medali emas dalam kompetisi robotika tingkat nasional di Surabaya...',
      views: '912',
      author: 'Admin Baituljannah',
      categoryColor: '#8B5CF6',
      content: 'Prestasi di bidang teknologi ini membuktikan bahwa siswa Baituljannah mampu bersaing di era digital...'
    }
  ];

  const filteredNews = allNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

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
              <pattern id="news-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="white"/>
                <circle cx="75" cy="75" r="2" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#news-pattern)"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} theme="dark" />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Berita & Informasi</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Berita Terkini</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Ikuti perkembangan terbaru, prestasi, dan kegiatan di lingkungan Yayasan Baituljannah
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white shadow-soft sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8] transition-colors"
              />
            </div>

            {/* Category Filter */}
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
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== 'Semua') && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filter aktif:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="hover:bg-blue-200 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'Semua' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('Semua')} className="hover:bg-purple-200 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured News */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Berita Utama</span>
            </div>
          </div>

          <div 
            className="group grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-strong hover:shadow-2xl transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedNews(featuredNews)}
          >
            <div className="relative h-96 md:h-auto overflow-hidden">
              <ImageWithFallback
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-6 left-6">
                <span 
                  className="px-4 py-2 rounded-full text-white backdrop-blur-md shadow-lg"
                  style={{ backgroundColor: featuredNews.categoryColor }}
                >
                  {featuredNews.category}
                </span>
              </div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {featuredNews.date}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {featuredNews.views}
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl mb-4 group-hover:text-[#1E4AB8] transition-colors">
                {featuredNews.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {featuredNews.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <button className="btn-primary flex items-center gap-2 group/btn">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All News Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Semua Berita</h2>
            <span className="text-gray-600">
              Menampilkan {displayedNews.length} dari {filteredNews.length} berita
            </span>
          </div>

          {displayedNews.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedNews.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => setSelectedNews(news)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1 rounded-full text-white text-sm backdrop-blur-sm shadow-md"
                          style={{ backgroundColor: news.categoryColor }}
                        >
                          {news.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Eye className="w-4 h-4" />
                        {news.views}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {news.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          5 min
                        </span>
                      </div>
                      <h3 className="text-xl mb-3 group-hover:text-[#1E4AB8] transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{news.author}</span>
                        <button className="text-[#1E4AB8] flex items-center gap-2 group/btn">
                          <span>Baca</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-600 mb-2">Tidak ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl my-8">
            <div className="relative h-80 overflow-hidden rounded-t-3xl">
              <ImageWithFallback
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="absolute top-6 left-6">
                <span 
                  className="px-4 py-2 rounded-full text-white backdrop-blur-md shadow-lg text-sm"
                  style={{ backgroundColor: selectedNews.categoryColor }}
                >
                  {selectedNews.category}
                </span>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-3xl md:text-4xl text-white font-bold mb-4 leading-tight">
                  {selectedNews.title}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{selectedNews.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{selectedNews.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>{selectedNews.views} views</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-600">
                {selectedNews.content.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center">
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                    Artikel Sebelumnya
                  </button>
                  <button className="px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                    Artikel Selanjutnya
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
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

