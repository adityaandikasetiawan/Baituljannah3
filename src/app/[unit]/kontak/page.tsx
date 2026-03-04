'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function UnitKontakPage({ params }: { params: Promise<{ unit: string }> }) {
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
              Kontak
            </div>
            <h2 className="mb-2">Hubungi {config.unitName}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Silakan hubungi kami melalui informasi berikut.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5" style={{ color: config.accentColor }} />
                <h4>Alamat</h4>
              </div>
              <p className="text-gray-600 text-sm">Alamat lengkap {config.fullName}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5" style={{ color: config.accentColor }} />
                <h4>Telepon</h4>
              </div>
              <p className="text-gray-600 text-sm">(+62) 000-0000-000</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5" style={{ color: config.accentColor }} />
                <h4>Email</h4>
              </div>
              <p className="text-gray-600 text-sm">info@{slug}.baituljannah.sch.id</p>
            </div>
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
