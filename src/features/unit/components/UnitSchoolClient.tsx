'use client';

import React from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { UnitHeroCarousel } from './UnitHeroCarousel';
import { ProgramCard } from '../../program/components/ProgramCard';
import { NewsCard } from '../../news/components/NewsCard';
import { BookOpen, Users, Award, Calendar, MapPin, Phone, Mail, GraduationCap, Clock, DollarSign, Target, TrendingUp, Star, Trophy, CheckCircle, Building, Microscope, Library } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';

interface UnitSchoolClientProps {
  unitName: string;
  fullName: string;
  accentColor: string;
  icon: string;
  description: string;
}

export const UnitSchoolClient: React.FC<UnitSchoolClientProps> = ({
  unitName,
  fullName,
  accentColor,
  icon,
  description,
}) => {
  const { onNavigate } = useNavigationMenu();
  const unitLogo = (() => {
    const input = icon?.trim();
    if (!input) return undefined;
    if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('data:') || input.startsWith('/')) return input;
    if (/\.(png|jpe?g|webp|gif|svg)$/i.test(input)) return input;
    return undefined;
  })();

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
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
        logo={unitLogo}
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
                  Lapangan olahraga multifungsi untuk futsal, basket, voli, dan badminton
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer
        logo={unitLogo}
        siteName={fullName}
        accentColor={accentColor}
        onNavigate={onNavigate}
      />
    </div>
  );
};
