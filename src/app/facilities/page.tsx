'use client';

import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Building2, Zap, BookOpen, Heart, Target, Star } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

export default function FacilitiesPage() {
  const { menuItems, onNavigate } = useNavigationMenu();

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Fasilitas' }
  ];

  const facilities = [
    {
      title: 'Ruang Kelas Modern',
      description: 'Ruang kelas ber-AC dengan fasilitas multimedia dan kapasitas optimal untuk pembelajaran efektif',
      icon: Building2,
      color: '#3B82F6'
    },
    {
      title: 'Laboratorium Lengkap',
      description: 'Lab komputer, sains, dan bahasa dengan peralatan modern untuk praktikum siswa',
      icon: Zap,
      color: '#10B981'
    },
    {
      title: 'Perpustakaan Digital',
      description: 'Perpustakaan dengan koleksi buku lengkap dan akses e-library untuk pembelajaran mandiri',
      icon: BookOpen,
      color: '#8B5CF6'
    },
    {
      title: 'Masjid Megah',
      description: 'Masjid dengan kapasitas besar untuk ibadah berjamaah dan kegiatan keagamaan',
      icon: Heart,
      color: '#10B981'
    },
    {
      title: 'Lapangan Olahraga',
      description: 'Area olahraga lengkap termasuk lapangan futsal, basket, dan fasilitas olahraga lainnya',
      icon: Target,
      color: '#F97316'
    },
    {
      title: 'Kantin Sehat',
      description: 'Kantin dengan menu halal, bergizi, dan higienis untuk kebutuhan nutrisi siswa',
      icon: Star,
      color: '#F59E0B'
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-100"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm"
                    style={{ backgroundColor: facility.color + '20' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: facility.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{facility.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{facility.description}</p>
                </div>
              );
            })}
          </div>

          {/* Additional Info / Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 text-center">
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

