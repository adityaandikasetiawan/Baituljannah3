import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { BookOpen, Users, Award, Globe, Heart, Star, Lightbulb, Target, Zap, Shield, ArrowRight, Sparkles, CheckCircle, TrendingUp } from 'lucide-react';

interface ProgramsProps {
  onNavigate?: (page: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onNavigate = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

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
      title: 'Character Building',
      description: 'Program pembentukan karakter Islami melalui pembiasaan dan keteladanan dalam kehidupan sehari-hari di lingkungan sekolah.',
      category: 'Pengembangan',
      features: ['Daily habits', 'Mentoring', 'Islamic values', 'Role model'],
      color: '#8B5CF6',
      bgGradient: 'from-purple-50 to-indigo-50'
    },
    {
      icon: Users,
      title: 'Leadership Training',
      description: 'Pelatihan kepemimpinan untuk membentuk karakter pemimpin yang amanah, bertanggung jawab, dan visioner.',
      category: 'Pengembangan',
      features: ['Outbound', 'Public speaking', 'Team building', 'Project management'],
      color: '#14B8A6',
      bgGradient: 'from-teal-50 to-cyan-50'
    },
    {
      icon: Star,
      title: 'Tahsin & Tajwid',
      description: 'Program memperbaiki bacaan Al-Quran dengan tajwid yang benar dan tartil yang indah dengan metode talaqqi.',
      category: 'Keagamaan',
      features: ['One-on-one session', 'Progress tracking', 'Certificated', 'Talaqqi method'],
      color: '#10B981',
      bgGradient: 'from-emerald-50 to-green-50'
    },
    {
      icon: Lightbulb,
      title: 'Robotika & Coding',
      description: 'Program pembelajaran robotika dan pemrograman untuk menghadapi era digital dengan peralatan modern.',
      category: 'Ekstrakurikuler',
      features: ['Modern equipment', 'Project based', 'Competition ready', 'AI & IoT'],
      color: '#F59E0B',
      bgGradient: 'from-yellow-50 to-amber-50'
    },
    {
      icon: Target,
      title: 'Bimbingan Konseling',
      description: 'Layanan konseling profesional untuk membantu perkembangan psikologis, sosial, dan akademik siswa secara optimal.',
      category: 'Pengembangan',
      features: ['Professional counselor', 'Confidential', 'Parent consultation', 'Career guidance'],
      color: '#6366F1',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
    {
      icon: Zap,
      title: 'Olahraga & Seni',
      description: 'Ekstrakurikuler olahraga dan seni untuk mengembangkan bakat dan minat siswa dengan fasilitas lengkap.',
      category: 'Ekstrakurikuler',
      features: ['Futsal', 'Basket', 'Beladiri', 'Musik', 'Kaligrafi'],
      color: '#EF4444',
      bgGradient: 'from-red-50 to-rose-50'
    },
    {
      icon: Shield,
      title: 'Kajian Kitab Kuning',
      description: 'Program pembelajaran kitab-kitab klasik Islam untuk memperdalam ilmu agama dengan sanad dan ijazah.',
      category: 'Keagamaan',
      features: ['Ulama berpengalaman', 'Sanad pembelajaran', 'Ijazah', 'Metode salaf'],
      color: '#10B981',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: BookOpen,
      title: 'Kelas Entrepreneur',
      description: 'Program kewirausahaan untuk menumbuhkan jiwa bisnis Islami sejak dini dengan praktik langsung.',
      category: 'Ekstrakurikuler',
      features: ['Business plan', 'Market day', 'Mentor bisnis', 'Real project'],
      color: '#F97316',
      bgGradient: 'from-orange-50 to-yellow-50'
    },
    {
      icon: Globe,
      title: 'Study Tour & Exchange',
      description: 'Program kunjungan edukatif ke dalam dan luar negeri untuk memperluas wawasan dan pengalaman siswa.',
      category: 'Pengembangan',
      features: ['Domestic & international', 'Educational', 'Cultural exchange', 'Global exposure'],
      color: '#3B82F6',
      bgGradient: 'from-blue-50 to-indigo-50'
    }
  ];

  const filteredPrograms = selectedCategory === 'Semua' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  const highlights = [
    {
      number: '50+',
      label: 'Program Tersedia',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      number: '100%',
      label: 'Siswa Aktif',
      icon: Users,
      color: 'from-green-500 to-emerald-600'
    },
    {
      number: '200+',
      label: 'Prestasi Diraih',
      icon: Award,
      color: 'from-orange-500 to-amber-600'
    },
    {
      number: '15+',
      label: 'Tahun Pengalaman',
      icon: Star,
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        menuItems={menuItems}
        accentColor="#1E4AB8"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} theme="dark" />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Excellence in Education</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Program Unggulan</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Berbagai program berkualitas untuk mengembangkan potensi akademik, karakter Islami, dan keterampilan siswa menghadapi masa depan
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-md">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl mb-1">{stat.number}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-soft sticky top-0 z-40 border-b">
        <div className="container-custom">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === cat.name
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.name ? 'bg-white/30' : 'bg-gray-200'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 text-gray-600">
            Menampilkan <strong>{filteredPrograms.length}</strong> program
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <div 
                  key={index} 
                  className={`group relative bg-gradient-to-br ${program.bgGradient} rounded-3xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden`}
                >
                  {/* Islamic Pattern Overlay */}
                  <div className="absolute inset-0 islamic-pattern opacity-5 group-hover:opacity-10 transition-opacity"></div>
                  
                  {/* Decorative Element */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: program.color }}
                  ></div>

                  <div className="relative">
                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: program.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Category Badge */}
                    <span 
                      className="inline-block text-xs px-4 py-1.5 rounded-full mb-4 text-white"
                      style={{ backgroundColor: program.color }}
                    >
                      {program.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl mb-3 text-gray-900">{program.title}</h3>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle 
                            className="w-5 h-5 flex-shrink-0" 
                            style={{ color: program.color }}
                          />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Arrow */}
                    <div className="mt-6 pt-6 border-t border-gray-200/50">
                      <button 
                        className="text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                        style={{ color: program.color }}
                      >
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section-padding bg-gradient-to-br from-white to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>Program Terbaru</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">Program Unggulan Terbaru</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Program-program inovatif yang dirancang khusus untuk mempersiapkan siswa menghadapi tantangan masa depan
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* International Class */}
            <div className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-strong overflow-hidden">
              <div className="absolute inset-0 islamic-pattern opacity-10"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
                  ✨ NEW PROGRAM
                </span>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl mb-2">International Class Program</h3>
                  </div>
                </div>

                <p className="text-white/90 mb-6 text-lg leading-relaxed">
                  Program kelas internasional dengan kurikulum Cambridge dan pembelajaran bilingual untuk mempersiapkan siswa berkompetisi di tingkat global.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>Cambridge Certified Teachers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>International Curriculum</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>Global Competence Development</span>
                  </div>
                </div>

                <button className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* STEAM Innovation Lab */}
            <div className="relative bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-strong overflow-hidden">
              <div className="absolute inset-0 islamic-pattern opacity-10"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
                  ✨ NEW PROGRAM
                </span>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl mb-2">STEAM Innovation Lab</h3>
                  </div>
                </div>

                <p className="text-white/90 mb-6 text-lg leading-relaxed">
                  Laboratorium inovasi berbasis STEAM (Science, Technology, Engineering, Arts, Mathematics) untuk mengembangkan kreativitas dan problem solving.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>3D Printing & Laser Cutting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>AI & Machine Learning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>Project-Based Learning</span>
                  </div>
                </div>

                <button className="px-6 py-3 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2">
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Bergabunglah Bersama Kami</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">Tertarik dengan Program Kami?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Daftarkan putra-putri Anda sekarang dan berikan mereka kesempatan untuk berkembang optimal dengan program unggulan kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('admission')} 
              className="btn-secondary flex items-center justify-center gap-2 group"
            >
              <span>Daftar PPDB 2025</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E4AB8] transition-all text-lg flex items-center justify-center gap-2"
            >
              <span>Hubungi Kami</span>
            </button>
          </div>
        </div>
      </section>

      <Footer siteName="Baitul Jannah Islamic School" accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
};

