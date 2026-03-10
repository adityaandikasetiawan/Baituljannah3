'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { BookOpen, GraduationCap, CheckCircle } from 'lucide-react';

type UnitKey = 'tkit' | 'sdit' | 'smpit' | 'smait' | 'slbit' | 'asrama';

type UnitConfig = {
  unitName: string;
  fullName: string;
  icon: string;
  accentColor: string;
  description: string;
};

const UNIT_CONFIG: Record<UnitKey, UnitConfig> = {
  tkit: {
    unitName: 'TKIT',
    fullName: 'PGIT - TKIT Baitul Jannah',
    icon: '/uploads/logos/TK.webp',
    accentColor: '#10B981',
    description: 'Pendidikan anak usia dini berbasis nilai Islam dan pembelajaran aktif.'
  },
  sdit: {
    unitName: 'SDIT',
    fullName: 'SDIT Baitul Jannah',
    icon: '/uploads/logos/SD.webp',
    accentColor: '#3B82F6',
    description: 'Pendidikan dasar terpadu dengan penguatan literasi, numerasi, dan karakter Islami.'
  },
  smpit: {
    unitName: 'SMPIT',
    fullName: 'SMPIT Baitul Jannah',
    icon: '/uploads/logos/SMP.webp',
    accentColor: '#F97316',
    description: 'Pendidikan menengah pertama dengan pembinaan akademik dan adab yang kuat.'
  },
  smait: {
    unitName: 'SMAIT',
    fullName: 'SMAIT Baitul Jannah',
    icon: '/uploads/logos/SMA.webp',
    accentColor: '#8B5CF6',
    description: 'Pendidikan menengah atas yang mempersiapkan siswa berprestasi dan berakhlak.'
  },
  slbit: {
    unitName: 'SLBIT',
    fullName: 'SLBIT Baitul Jannah',
    icon: '/uploads/logos/SLB.webp',
    accentColor: '#14B8A6',
    description: 'Layanan pendidikan inklusif untuk peserta didik berkebutuhan khusus.'
  },
  asrama: {
    unitName: 'Asrama',
    fullName: 'Asrama Baitul Jannah',
    icon: '/uploads/logos/Asrama.webp',
    accentColor: '#D4AF37',
    description: 'Lingkungan pembinaan dan pendampingan siswa dengan kegiatan terprogram.'
  }
};

function getUnitConfig(unit: string) {
  return UNIT_CONFIG[unit as UnitKey];
}

export default function UnitKurikulumPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slug } = React.use(params);
  const config = getUnitConfig(slug);

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => router.push(`/${slug}`) },
    { label: 'Profil', href: '#', onClick: () => router.push(`/${slug}/profil`) },
    { label: 'Kurikulum', href: '#', onClick: () => router.push(`/${slug}/kurikulum`) },
    { label: 'Guru & Staff', href: '#', onClick: () => router.push(`/${slug}/guru-staff`) },
    { label: 'Berita', href: '#', onClick: () => router.push(`/${slug}/berita`) },
    { label: 'Galeri', href: '#', onClick: () => router.push(`/${slug}/galeri`) },
    { label: 'Karir', href: '#', onClick: () => router.push('/career') },
    { label: 'PPDB', href: '#', onClick: () => router.push('/admission') },
    { label: 'Kontak', href: '#', onClick: () => router.push(`/${slug}/kontak`) }
  ];

  if (!config) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={config.icon}
        siteName={config.fullName}
        accentColor={config.accentColor}
        menuItems={menuItems}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-2 rounded-full text-sm mb-4"
              style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
            >
              Kurikulum
            </div>
            <h2 className="mb-4">Kurikulum Terintegrasi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Integrasi kurikulum nasional dengan pendidikan Islam secara mendalam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-soft">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: config.accentColor }}
              >
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Kurikulum Nasional</h3>
              <ul className="space-y-3">
                {[
                  'Kurikulum Merdeka yang adaptif dan inovatif',
                  'Pembelajaran berbasis proyek',
                  'STEAM (Science, Technology, Engineering, Arts, Math)',
                  'Penguatan Literasi & Numerasi',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: config.accentColor }} />
                    <span className="text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-soft">
              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">Kurikulum Islam</h3>
              <ul className="space-y-3">
                {[
                  "Tahfidz Al-Qur'an bertahap",
                  'Aqidah, Fiqih, Akhlak',
                  'Hadits & Sirah Nabawiyah',
                  'Praktik ibadah & adab',
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
