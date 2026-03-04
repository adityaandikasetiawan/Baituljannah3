'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { Users } from 'lucide-react';

export default function UnitGuruStaffPage({ params }: { params: Promise<{ unit: string }> }) {
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
          <div className="text-center mb-10">
            <div
              className="inline-block px-4 py-2 rounded-full text-sm mb-4"
              style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
            >
              Guru & Staff
            </div>
            <h2 className="mb-2">Tim Pengajar Profesional</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tenaga pendidik berpengalaman dan berdedikasi mendidik generasi Qurani.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${config.accentColor}20` }}
                >
                  <Users className="w-8 h-8" style={{ color: config.accentColor }} />
                </div>
                <h4 className="mb-1">Nama Guru {i + 1}</h4>
                <p className="text-gray-600 text-sm">Mata Pelajaran</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
