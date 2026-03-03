import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { UnitHeroCarousel } from '../features/unit/components/UnitHeroCarousel';
import { ProgramCard } from '../features/program/components/ProgramCard';
import { NewsCard } from '../features/news/components/NewsCard';
import { BookOpen, Users, Award, Calendar, MapPin, Phone, Mail, GraduationCap, Clock, DollarSign, Target, TrendingUp, Star, Trophy, CheckCircle, Building, Microscope, Library } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface UnitSchoolProps {
  unitName: string;
  fullName: string;
  accentColor: string;
  icon: string;
  description: string;
  onNavigate?: (page: string) => void;
}

export const UnitSchool: React.FC<UnitSchoolProps> = ({
  unitName,
  fullName,
  accentColor,
  icon,
  description,
  onNavigate = () => {}
}) => {
  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => {} },
    {
      label: 'Profil',
      href: '#',
      submenu: [
        { label: 'Tentang Kami', href: '#', onClick: () => {} },
        { label: 'Visi & Misi', href: '#', onClick: () => {} },
        { label: 'Fasilitas', href: '#', onClick: () => {} }
      ]
    },
    { label: 'Kurikulum', href: '#', onClick: () => {} },
    { label: 'Guru & Staff', href: '#', onClick: () => {} },
    { label: 'Berita', href: '#', onClick: () => {} },
    { label: 'Galeri', href: '#', onClick: () => {} },
    { label: 'Karir', href: '#', onClick: () => onNavigate('career') },
    { label: 'PPDB', href: '#', onClick: () => onNavigate('admission') },
    { label: 'Kontak', href: '#', onClick: () => {} }
  ];

  const programs = [
    {
      title: 'Tahfidz Al-Qur\'an',
      description: 'Program menghafal Al-Qur\'an dengan metode yang mudah dan menyenangkan.',
      icon: BookOpen,
      color: accentColor
    },
    {
      title: 'Character Building',
      description: 'Pembentukan karakter Islami melalui pembiasaan akhlak mulia setiap hari.',
      icon: Users,
      color: accentColor
    },
    {
      title: 'Prestasi Akademik',
      description: 'Pembelajaran berkualitas untuk meraih prestasi akademik terbaik.',
      icon: Award,
      color: accentColor
    }
  ];

  const teachers = [
    {
      name: 'Ustadz Ahmad Fauzi, S.Pd.I',
      role: 'Kepala Sekolah',
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Ustadzah Siti Aisyah, S.Pd',
      role: 'Guru Tahfidz',
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Ustadz Muhammad Rizki, M.Pd',
      role: 'Guru Matematika',
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Ustadzah Fatimah Az-Zahra, S.S',
      role: 'Guru Bahasa Arab',
      image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar
        logo={icon}
        siteName={fullName}
        accentColor={accentColor}
        menuItems={menuItems}
      />

      {/* Back to Portal */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-4">
          <button 
            onClick={() => onNavigate('main')}
            className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"
          >
            <span>←</span> Kembali ke Portal Utama
          </button>
        </div>
      </div>

      {/* Hero Carousel */}
      <UnitHeroCarousel
        unitName={unitName}
        fullName={fullName}
        accentColor={accentColor}
        icon={icon}
        onCtaClick={() => onNavigate('admission')}
      />

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-strong">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNsYXNzcm9vbSUyMHN0dWR5aW5nfGVufDF8fHx8MTc2NDMxNzE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt={fullName}
                className="w-full h-[500px] object-cover"
              />
            </div>

            <div>
              <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                Tentang Kami
              </div>
              <h2 className="mb-4">Profil {unitName}</h2>
              <p className="text-gray-600 mb-6">
                {fullName} adalah lembaga pendidikan Islam terpadu yang berkomitmen untuk memberikan 
                pendidikan berkualitas dengan mengintegrasikan kurikulum nasional dan nilai-nilai Islam. 
                Kami fokus pada pengembangan kognitif, afektif, dan psikomotorik siswa secara seimbang.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="mb-1">Kurikulum Terintegrasi</h5>
                    <p className="text-gray-600 text-sm">
                      Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="mb-1">Tenaga Pendidik Profesional</h5>
                    <p className="text-gray-600 text-sm">
                      Guru-guru berkualifikasi dan berpengalaman dalam pendidikan Islam terpadu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h5 className="mb-1">Fasilitas Lengkap</h5>
                    <p className="text-gray-600 text-sm">
                      Gedung modern, laboratorium, perpustakaan, dan fasilitas pendukung lainnya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              Program Unggulan
            </div>
            <h2 className="mb-4">Program Unggulan Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Program-program dirancang khusus untuk mengembangkan potensi siswa secara maksimal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Kurikulum Section - NEW */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              Kurikulum
            </div>
            <h2 className="mb-4">Kurikulum Terintegrasi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kombinasi sempurna antara kurikulum nasional dan nilai-nilai Islam
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Kurikulum Nasional */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-soft">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: accentColor }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Kurikulum Nasional</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">Kurikulum Merdeka yang adaptif dan inovatif</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">Pembelajaran berbasis project dan problem solving</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">STEAM (Science, Technology, Engineering, Arts, Math)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">Bahasa Indonesia, Inggris, dan Arab</span>
                </li>
              </ul>
            </div>

            {/* Kurikulum Islam */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-soft">
              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Kurikulum Islam</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Tahfidz Al-Qur'an dengan target hafalan bertahap</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Aqidah, Fiqih, dan Akhlak dalam kehidupan sehari-hari</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Hadits dan Sirah Nabawiyah</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Praktik ibadah dan pembiasaan adab Islami</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Jadwal Pembelajaran */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
            <h3 className="text-2xl mb-8 text-center">Jadwal Pembelajaran</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" style={{ color: accentColor }} />
                  <h4 className="text-lg">Waktu Belajar</h4>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>Senin - Kamis</span>
                    <span className="font-medium">07:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>Jumat</span>
                    <span className="font-medium">07:00 - 11:00 WIB</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>Sabtu</span>
                    <span className="font-medium">Ekstrakurikuler</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6" style={{ color: accentColor }} />
                  <h4 className="text-lg">Fokus Pembelajaran</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">Character & Leadership Building</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">Critical Thinking & Problem Solving</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">Collaboration & Communication</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section - NEW */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              Fasilitas
            </div>
            <h2 className="mb-4">Fasilitas Lengkap & Modern</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Didukung fasilitas terbaik untuk mendukung proses belajar mengajar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ruang Kelas */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558443957-d056622df610"
                  alt="Ruang Kelas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: accentColor }}>
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">Ruang Kelas</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  Ruang kelas ber-AC dengan kapasitas 25-30 siswa, dilengkapi smart TV dan sound system
                </p>
              </div>
            </div>

            {/* Perpustakaan */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1595315343110-9b445a960442"
                  alt="Perpustakaan"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-2">
                    <Library className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">Perpustakaan</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  Koleksi 5000+ buku, ruang baca nyaman, dan sistem peminjaman digital
                </p>
              </div>
            </div>

            {/* Laboratorium */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac"
                  alt="Laboratorium"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center mb-2">
                    <Microscope className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">Laboratorium</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  Lab Komputer, Sains, dan Bahasa dengan peralatan modern dan lengkap
                </p>
              </div>
            </div>

            {/* Lapangan Olahraga */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1649182462992-ea644b7f8155"
                  alt="Lapangan"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center mb-2">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-white text-lg">Lapangan</h4>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm">
                  Lapangan futsal, basket, dan area outdoor untuk kegiatan olahraga
                </p>
              </div>
            </div>
          </div>

          {/* Additional Facilities List */}
          <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 shadow-strong">
            <h3 className="text-2xl mb-8 text-center">Fasilitas Tambahan</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">Masjid/Musholla</h5>
                  <p className="text-sm text-gray-600">Tempat ibadah yang nyaman dan bersih</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">Kantin Sehat</h5>
                  <p className="text-sm text-gray-600">Menyediakan makanan bergizi dan halal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">Klinik Kesehatan</h5>
                  <p className="text-sm text-gray-600">UKS dengan tenaga medis profesional</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">WiFi & Internet</h5>
                  <p className="text-sm text-gray-600">Akses internet cepat di seluruh area</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">CCTV 24/7</h5>
                  <p className="text-sm text-gray-600">Keamanan terpantau sepanjang waktu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                <div>
                  <h5 className="mb-1">Parkir Luas</h5>
                  <p className="text-sm text-gray-600">Area parkir yang aman dan tertata</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Stats - NEW */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              Prestasi
            </div>
            <h2 className="mb-4">Prestasi & Statistik</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bukti nyata kualitas pendidikan kami
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">95%</p>
                <p className="text-white/90">Lulus UN/USBN</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">50+</p>
                <p className="text-white/90">Prestasi Lomba</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">30 Juz</p>
                <p className="text-white/90">Target Tahfidz</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white text-center shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <Star className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-4xl mb-2">A</p>
                <p className="text-white/90">Akreditasi</p>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
            <h3 className="text-2xl mb-8">Prestasi Terkini</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">Juara 1 Olimpiade Sains Nasional</h5>
                  <p className="text-sm text-gray-600">Tingkat Provinsi - Bidang Matematika</p>
                  <p className="text-xs text-gray-500 mt-1">Desember 2024</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">Juara 2 Kompetisi Hafidz</h5>
                  <p className="text-sm text-gray-600">Tingkat Nasional - Kategori 10 Juz</p>
                  <p className="text-xs text-gray-500 mt-1">November 2024</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">Juara 1 Lomba Robotika</h5>
                  <p className="text-sm text-gray-600">Tingkat Kota - Line Follower</p>
                  <p className="text-xs text-gray-500 mt-1">Oktober 2024</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20` }}>
                  <Trophy className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h5 className="mb-1">Juara 3 English Competition</h5>
                  <p className="text-sm text-gray-600">Tingkat Provinsi - Story Telling</p>
                  <p className="text-xs text-gray-500 mt-1">September 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure - NEW */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              Biaya Pendidikan
            </div>
            <h2 className="mb-4">Investasi Pendidikan Terbaik</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Biaya yang transparan dan kompetitif untuk pendidikan berkualitas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Biaya Pendaftaran */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <DollarSign className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <h3 className="text-xl">Biaya Pendaftaran</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Formulir Pendaftaran</span>
                      <span className="font-medium">Rp 300.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Uang Pangkal</span>
                      <span className="font-medium">Rp 15.000.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Seragam & Buku</span>
                      <span className="font-medium">Rp 3.500.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-gray-50 rounded-xl px-4">
                      <span className="font-medium">Total Awal</span>
                      <span className="text-xl font-semibold" style={{ color: accentColor }}>Rp 18.800.000</span>
                    </div>
                  </div>
                </div>

                {/* Biaya Bulanan */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <Calendar className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <h3 className="text-xl">Biaya Bulanan</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">SPP</span>
                      <span className="font-medium">Rp 1.500.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Catering (Opsional)</span>
                      <span className="font-medium">Rp 500.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Transportasi (Opsional)</span>
                      <span className="font-medium">Rp 400.000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-gray-50 rounded-xl px-4">
                      <span className="font-medium">Per Bulan</span>
                      <span className="text-xl font-semibold" style={{ color: accentColor }}>Rp 1.500.000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                    <Star className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-900">Diskon Pendaftar Awal</p>
                      <p className="text-xs text-green-700">Hingga 20%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Diskon Kakak Beradik</p>
                      <p className="text-xs text-blue-700">10% untuk adik</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                    <Award className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-purple-900">Beasiswa Prestasi</p>
                      <p className="text-xs text-purple-700">Tersedia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-yellow-900">
                  <strong>Catatan:</strong> Biaya dapat berubah sewaktu-waktu. Silakan hubungi bagian administrasi untuk informasi terkini dan detail cicilan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              Tenaga Pendidik
            </div>
            <h2 className="mb-4">Guru & Staff</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tim pendidik profesional yang berdedikasi untuk pendidikan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, index) => (
              <div key={index} className="card text-center hover:-translate-y-2">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4" style={{ borderColor: `${accentColor}40` }}>
                  <ImageWithFallback
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="mb-1">{teacher.name}</h5>
                <p className="text-sm text-gray-600">{teacher.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPDB CTA */}
      <section className="section-padding" style={{ background: `linear-gradient(to right, ${accentColor}, #8B5CF6)` }}>
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-12 shadow-strong">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="mb-4">Pendaftaran Peserta Didik Baru (PPDB)</h2>
                <p className="text-gray-600 mb-6">
                  Bergabunglah dengan keluarga besar {fullName}. Kami membuka pendaftaran untuk tahun ajaran 2025/2026.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <Calendar className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm">Periode Pendaftaran: <strong>1 Januari - 31 Maret 2025</strong></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <Users className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm">Kuota: <strong>120 Siswa</strong></p>
                    </div>
                  </div>
                </div>

                <button className="btn-primary" style={{ backgroundColor: accentColor }}>
                  Daftar Sekarang
                </button>
              </div>

              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760464600453-2aa3b68fd9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBlZHVjYXRpb258ZW58MXx8fHwxNzY0MzE3MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="PPDB"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Hubungi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami siap membantu menjawab pertanyaan Anda
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                <MapPin className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h5 className="mb-2">Alamat</h5>
              <p className="text-gray-600 text-sm">
                Jl. Pendidikan Islam No. 123<br />
                Jakarta Selatan, 12345
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                <Phone className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h5 className="mb-2">Telepon</h5>
              <p className="text-gray-600 text-sm">
                (021) 1234-5678<br />
                0812-3456-7890
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${accentColor}20` }}>
                <Mail className="w-8 h-8" style={{ color: accentColor }} />
              </div>
              <h5 className="mb-2">Email</h5>
              <p className="text-gray-600 text-sm">
                info@{unitName.toLowerCase()}baituljannah.sch.id<br />
                ppdb@{unitName.toLowerCase()}baituljannah.sch.id
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer logo={icon} siteName={fullName} accentColor={accentColor} onNavigate={onNavigate} />
    </div>
  );
};
