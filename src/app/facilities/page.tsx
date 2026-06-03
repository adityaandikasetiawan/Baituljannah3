'use client';

import Image from 'next/image';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Building2, Zap, BookOpen, Heart, Target, Star, Users, Home, Camera } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function FacilitiesPage() {
  const { menuItems, onNavigate } = useNavigationMenu();

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Fasilitas' }
  ];

  const facilities = [
    {
      title: 'Ruang Kelas Modern',
      shortTitle: 'Ruang Kelas',
      description: 'Ruang kelas ber-AC dengan fasilitas multimedia dan kapasitas optimal untuk pembelajaran efektif',
      icon: Building2,
      color: '#3B82F6',
      image: '/uploads/images/facilities/Ruang Kelas.webp'
    },
    {
      title: 'Laboratorium Lengkap',
      shortTitle: 'Laboratorium',
      description: 'Lab komputer, sains, dan bahasa dengan peralatan modern untuk praktikum siswa',
      icon: Zap,
      color: '#10B981',
      image: '/uploads/images/facilities/Lab.webp'
    },
    {
      title: 'Perpustakaan Digital',
      shortTitle: 'Perpustakaan',
      description: 'Perpustakaan dengan koleksi buku lengkap dan akses e-library untuk pembelajaran mandiri',
      icon: BookOpen,
      color: '#8B5CF6',
      image: '/uploads/images/facilities/Perpus.webp'
    },
    {
      title: 'Masjid Megah',
      shortTitle: 'Masjid',
      description: 'Masjid dengan kapasitas besar untuk ibadah berjamaah dan kegiatan keagamaan',
      icon: Heart,
      color: '#10B981',
      image: null
    },
    {
      title: 'Lapangan Olahraga',
      shortTitle: 'Lapangan',
      description: 'Area olahraga lengkap termasuk lapangan futsal, basket, dan fasilitas olahraga lainnya',
      icon: Target,
      color: '#F97316',
      image: '/uploads/images/facilities/lapangan.webp'
    },
    {
      title: 'Kantin Sehat',
      shortTitle: 'Kantin',
      description: 'Kantin dengan menu halal, bergizi, dan higienis untuk kebutuhan nutrisi siswa',
      icon: Star,
      color: '#F59E0B',
      image: null
    },
    {
      title: 'Ruang Aula',
      shortTitle: 'Ruang Aula',
      description: 'Aula serbaguna berkapasitas besar untuk kegiatan upacara, seminar, pentas seni, dan acara sekolah lainnya',
      icon: Users,
      color: '#EC4899',
      image: '/uploads/images/facilities/AULA.webp'
    },
    {
      title: 'Gedung Asrama',
      shortTitle: 'Gedung Asrama',
      description: 'Asrama nyaman dan aman dengan fasilitas lengkap untuk mendukung kehidupan santri yang mandiri dan berkarakter',
      icon: Home,
      color: '#6366F1',
      image: '/uploads/images/facilities/asrama.webp'
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
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <Building2 className="w-4 h-4" />
              <span>Fasilitas Sekolah</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Fasilitas Lengkap</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Menunjang kegiatan belajar mengajar dengan fasilitas modern dan lingkungan yang kondusif
            </p>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  {/* Foto fasilitas */}
                  <div className="relative w-full h-44 bg-gray-100">
                    {facility.image ? (
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ backgroundColor: facility.color + '15' }}
                      >
                        <Icon className="w-10 h-10 opacity-30" style={{ color: facility.color }} />
                        <span className="text-xs text-gray-400">Foto segera hadir</span>
                      </div>
                    )}
                  </div>

                  {/* Info fasilitas */}
                  <div className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: facility.color + '20' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: facility.color }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{facility.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{facility.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section — hidden, uncomment to show */}
      {false && (
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4AB8]/10 rounded-full text-[#1E4AB8] text-sm mb-6">
              <Camera className="w-4 h-4" />
              <span>Galeri Fasilitas</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Foto Fasilitas Sekolah</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dokumentasi visual fasilitas lengkap yang mendukung kegiatan belajar dan pembentukan karakter siswa
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {facilities.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
              >
                {item.image ? (
                  <>
                    <Image
                      src={item.image}
                      alt={item.shortTitle}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-semibold text-sm">{item.shortTitle}</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="text-center px-3">
                      <p className="text-sm font-semibold text-gray-700">{item.shortTitle}</p>
                      <p className="text-xs text-gray-400 mt-1">Foto segera hadir</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Call to Action */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ingin Melihat Langsung?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Kami mengundang Anda untuk mengunjungi sekolah kami dan melihat fasilitas yang tersedia. Silakan hubungi kami untuk menjadwalkan kunjungan.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-[#1E4AB8] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      <Footer 
        siteName="Baitul Jannah Islamic School"
        accentColor="#1E4AB8"
        onNavigate={onNavigate}
      />
    </div>
  );
}
