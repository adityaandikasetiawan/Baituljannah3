'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { BookOpen, Users, Award, Globe, Heart, Star, Lightbulb, Target, Zap, Shield, ArrowRight, Sparkles, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function ProgramsPage() {
  const { onNavigate, menuItems } = useNavigationMenu();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Program Unggulan' }
  ];

  const categories = [
    { name: 'Semua', icon: Star, count: 12 },
    { name: 'Akademik', icon: BookOpen, count: 2 },
    { name: 'Keagamaan', icon: Heart, count: 3 },
    { name: 'Ekstrakurikuler', icon: Zap, count: 3 },
    { name: 'Pengembangan', icon: TrendingUp, count: 4 }
  ];

  const programs = [
    {
      icon: BookOpen,
      title: 'Program Tahfidz Al-Quran',
      description: 'Program menghafal Al-Quran dengan metode yang efektif dan terstruktur untuk semua jenjang pendidikan dengan bimbingan ustadz berpengalaman.',
      category: 'Keagamaan',
      features: ['Target 30 juz', 'Bimbingan Ustadz berpengalaman', 'Metode terbukti efektif', 'Wisuda Tahfidz'],
      color: '#10B981',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: Globe,
      title: 'Bahasa Asing (English & Arabic)',
      description: 'Program pembelajaran bahasa Inggris dan Arab dengan metode praktis dan komunikatif untuk persiapan komunikasi global.',
      category: 'Akademik',
      features: ['Native speaker', 'Language lab', 'International certification', 'Daily conversation'],
      color: '#3B82F6',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Award,
      title: 'Olimpiade & Kompetisi',
      description: 'Pembinaan khusus untuk persiapan olimpiade sains, matematika, dan kompetisi akademik lainnya dengan track record juara.',
      category: 'Akademik',
      features: ['Pembimbing ahli', 'Latihan intensif', 'Track record juara', 'Kompetisi rutin'],
      color: '#F97316',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    {
      icon: Heart,
      title: 'Bina Pribadi Islami (BPI)',
      description: 'Pembinaan karakter dan kepribadian Islam melalui mentoring rutin dalam kelompok kecil untuk membentuk akhlak mulia.',
      category: 'Keagamaan',
      features: ['Mentoring pekanan', 'Materi komprehensif', 'Pembentukan karakter', 'Ukhuwah islamiyah'],
      color: '#8B5CF6',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      icon: Zap,
      title: 'Robotik & Coding',
      description: 'Pengenalan teknologi masa depan melalui ekstrakurikuler robotik dan coding yang melatih logika dan kreativitas siswa.',
      category: 'Ekstrakurikuler',
      features: ['Kit robotik lengkap', 'Kurikulum coding modern', 'Kompetisi nasional', 'Project based'],
      color: '#EC4899',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    {
      icon: Users,
      title: 'Leadership Camp',
      description: 'Pelatihan kepemimpinan untuk melatih jiwa leadership, kemandirian, dan kerjasama tim melalui kegiatan outdoor.',
      category: 'Pengembangan',
      features: ['Outbound training', 'Team building', 'Leadership materi', 'Character building'],
      color: '#14B8A6',
      bgGradient: 'from-teal-50 to-cyan-50'
    },
    {
      icon: Target,
      title: 'Entrepreneurship',
      description: 'Menumbuhkan jiwa wirausaha sejak dini melalui market day dan proyek bisnis sederhana yang dikelola siswa.',
      category: 'Pengembangan',
      features: ['Market day', 'Business plan', 'Financial literacy', 'Creative product'],
      color: '#F59E0B',
      bgGradient: 'from-amber-50 to-yellow-50'
    },
    {
      icon: Shield,
      title: 'Pramuka SIT',
      description: 'Kegiatan kepramukaan berbasis Sekolah Islam Terpadu yang menggabungkan ketangkasan, kemandirian, dan nilai keislaman.',
      category: 'Ekstrakurikuler',
      features: ['Kemah ukhuwah', 'Keterampilan hidup', 'Survival skill', 'Nilai keislaman'],
      color: '#8B4513',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      icon: Lightbulb,
      title: 'Literasi & Jurnalistik',
      description: 'Mengembangkan kemampuan membaca, menulis, dan jurnalistik siswa melalui majalah sekolah dan mading.',
      category: 'Pengembangan',
      features: ['Majalah sekolah', 'Pelatihan menulis', 'Kunjungan media', 'Publikasi karya'],
      color: '#6366F1',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
    {
      icon: Sparkles,
      title: 'Seni & Budaya Islam',
      description: 'Melestarikan seni dan budaya Islam melalui nasyid, kaligrafi, dan seni peran yang sesuai syariat.',
      category: 'Ekstrakurikuler',
      features: ['Nasyid/Marawis', 'Kaligrafi', 'Teater Islami', 'Pentas seni'],
      color: '#D946EF',
      bgGradient: 'from-fuchsia-50 to-pink-50'
    },
    {
      icon: CheckCircle,
      title: 'Shalat Dhuha & Tahajud',
      description: 'Pembiasaan ibadah sunnah harian dan bulanan (Mabit) untuk mendekatkan diri kepada Allah SWT.',
      category: 'Keagamaan',
      features: ['Dhuha berjamaah', 'Mabit bulanan', 'Kultum siswa', 'Evaluasi ibadah'],
      color: '#0EA5E9',
      bgGradient: 'from-sky-50 to-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Life Skill & Kemandirian',
      description: 'Pembekalan keterampilan hidup sehari-hari seperti memasak, menjahit, dan pertukangan dasar.',
      category: 'Pengembangan',
      features: ['Cooking class', 'Basic crafting', 'Gardening', 'Home management'],
      color: '#84CC16',
      bgGradient: 'from-lime-50 to-green-50'
    }
  ];

  const filteredPrograms = selectedCategory === 'Semua' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar menuItems={menuItems} activePage="programs" onNavigate={onNavigate} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Programs Background" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-down">
                Program Unggulan
              </h1>
              <p className="text-xl text-blue-100 mb-8 animate-fade-in-up">
                Mengembangkan potensi siswa melalui berbagai program akademik, keagamaan, dan pengembangan diri yang komprehensif.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                      ${isSelected 
                        ? 'bg-blue-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-600'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    <span>{category.name}</span>
                    <span className={`
                      ml-2 px-2 py-0.5 rounded-full text-xs
                      ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                    `}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => {
                const Icon = program.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-6 ${program.bgGradient}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: program.color }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-gray-700 shadow-sm">
                          {program.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {program.description}
                      </p>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-3 mb-6">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full py-3 px-4 bg-gray-50 text-blue-600 rounded-xl font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white">
                        <span>Selengkapnya</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Tidak ada program ditemukan</h3>
                <p className="text-gray-500">Coba pilih kategori program yang lain.</p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Tertarik dengan Program Kami?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah bersama keluarga besar Baituljannah dan kembangkan potensi putra-putri Anda dengan pendidikan terbaik.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => onNavigate('admission')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Daftar Sekarang
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                Hubungi Kami
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer 
        siteName="Baitul Jannah Islamic School"
        accentColor="#1E4AB8"
        onNavigate={onNavigate}
      />
    </div>
  );
}

