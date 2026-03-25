'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Mail, Sparkles } from 'lucide-react';

export default function UnitKontakPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slug } = React.use(params);
  const config = getUnitConfig(slug);
  const isAsrama = slug === 'asrama';
  const staffMenuLabel = isAsrama ? 'Musyrif & Musyrifah' : 'Guru & Staff';
  const curriculumMenuLabel = isAsrama ? 'Program' : 'Kurikulum';

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => router.push(`/${slug}`) },
    { label: 'Profil', href: '#', onClick: () => router.push(`/${slug}/profil`) },
    { label: curriculumMenuLabel, href: '#', onClick: () => router.push(`/${slug}/kurikulum`) },
    { label: staffMenuLabel, href: '#', onClick: () => router.push(`/${slug}/guru-staff`) },
    {
      label: 'Info',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => router.push(`/${slug}/berita`) },
        { label: 'Galeri', href: '#', onClick: () => router.push(`/${slug}/galeri`) },
      ],
    },
    { label: 'Karir', href: '#', onClick: () => router.push('/career') },
    { label: 'PPDB', href: '#', onClick: () => router.push('/admission') },
    { label: 'Kontak', href: '#', onClick: () => router.push(`/${slug}/kontak`) }
  ];

  if (!config) return null;

  const heroImage = '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp';

  const unitContacts: Record<
    string,
    { phone: string; email: string; whatsapp?: string; addressLines: string[]; hours: string[] }
  > = {
    tkit: {
      phone: '(022) 1234-5601',
      email: 'tkit@baituljannah.sch.id',
      whatsapp: '+6281234567890',
      addressLines: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
      hours: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
    },
    sdit: {
      phone: '(022) 1234-5602',
      email: 'sdit@baituljannah.sch.id',
      whatsapp: '+6281234567890',
      addressLines: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
      hours: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
    },
    smpit: {
      phone: '(022) 1234-5603',
      email: 'smpit@baituljannah.sch.id',
      whatsapp: '+6281234567890',
      addressLines: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
      hours: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
    },
    smait: {
      phone: '(022) 1234-5604',
      email: 'smait@baituljannah.sch.id',
      whatsapp: '+6281234567890',
      addressLines: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
      hours: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
    },
    slbit: {
      phone: '(022) 1234-5605',
      email: 'slbit@baituljannah.sch.id',
      whatsapp: '+6281234567890',
      addressLines: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
      hours: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
    },
    asrama: {
      phone: '(022) 1234-5606',
      email: 'asrama@baituljannah.sch.id',
      whatsapp: '+6281234567890',
      addressLines: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
      hours: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
    },
  };

  const c = unitContacts[slug] ?? {
    phone: '(022) 1234-5678',
    email: `info@${slug}.baituljannah.sch.id`,
    addressLines: ['Jl. Pendidikan No. 123', 'Kota Bandung, Jawa Barat 40123'],
    hours: ['Senin - Jumat: 07:00 - 16:00', 'Sabtu: 07:00 - 13:00'],
  };

  const whatsappHref = c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/[^\d]/g, '')}` : undefined;
  const visitTipByUnit: Record<string, { title: string; desc: string }> = {
    tkit: {
      title: 'Tips kunjungan TK',
      desc: 'Datang di jam 08.00–10.00 agar Ayah/Bunda bisa melihat circle time, tahfidz, dan sentra bermain.',
    },
    sdit: {
      title: 'Tips kunjungan SD',
      desc: 'Datang di jam 07.00–09.00 untuk melihat pembiasaan pagi, halaqah, dan kegiatan kelas.',
    },
    smpit: {
      title: 'Tips kunjungan SMP',
      desc: 'Datang di jam 07.00–09.00 untuk melihat pembiasaan dan suasana pembelajaran.',
    },
    smait: {
      title: 'Tips kunjungan SMA',
      desc: 'Datang di jam 08.00–10.00 untuk konsultasi program, prestasi, dan fasilitas pendukung.',
    },
    slbit: {
      title: 'Tips kunjungan SLB',
      desc: 'Disarankan membuat janji terlebih dahulu agar tim pendampingan dapat menyiapkan sesi konsultasi.',
    },
    asrama: {
      title: 'Tips kunjungan Asrama',
      desc: 'Konfirmasi jadwal kunjungan dan perizinan terlebih dahulu agar layanan lebih optimal.',
    },
  };
  const visitTip = visitTipByUnit[slug];

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={config.icon}
        siteName={config.fullName}
        accentColor={config.accentColor}
        menuItems={menuItems}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={heroImage} alt={config.fullName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 opacity-60" style={{ backgroundColor: config.accentColor }} />
        </div>

        <div className="container-custom px-4 md:px-8 relative z-10 py-16 md:py-24">
          <button
            onClick={() => router.push(`/${slug}`)}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm mb-8"
          >
            <span>←</span> Kembali ke Beranda Unit
          </button>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Kontak</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Hubungi {config.unitName}</h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              Admin unit siap membantu informasi program, jadwal, dan PPDB.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${c.phone}`}
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-opacity-90 transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon</span>
              </a>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
              <button
                onClick={() => router.push('/admission')}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Info PPDB</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 -pb-8 -mt-6 relative z-20">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <MapPin className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Alamat</p>
                  <p className="text-xs text-gray-500">Lokasi sekolah</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {c.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <Phone className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Telepon</p>
                  <p className="text-xs text-gray-500">Admin unit</p>
                </div>
              </div>
              <a href={`tel:${c.phone}`} className="text-sm font-semibold" style={{ color: config.accentColor }}>
                {c.phone}
              </a>
              {c.whatsapp && (
                <div className="mt-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm inline-flex items-center gap-2 font-semibold"
                    style={{ color: config.accentColor }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat WhatsApp</span>
                  </a>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <Mail className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-xs text-gray-500">Respon di jam kerja</p>
                </div>
              </div>
              <a href={`mailto:${c.email}`} className="text-sm font-semibold break-words" style={{ color: config.accentColor }}>
                {c.email}
              </a>
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <Clock className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Jam Operasional</p>
                  <p className="text-xs text-gray-500">Waktu layanan</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {c.hours.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-5"
                  style={{ backgroundColor: `${config.accentColor}14`, color: config.accentColor }}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Peta Lokasi</span>
                </div>
                <h2 className="text-3xl mb-3">Kunjungi {config.unitName}</h2>
                <p className="text-gray-600 leading-relaxed">
                  Silakan datang untuk observasi dan konsultasi program. Disarankan membuat jadwal terlebih dahulu agar layanan lebih optimal.
                </p>
                {visitTip && (
                  <div className="mt-6 bg-gray-50 rounded-2xl p-6">
                    <p className="text-sm font-semibold mb-1">{visitTip.title}</p>
                    <p className="text-sm text-gray-600">{visitTip.desc}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.362148003456!2d107.6181!3d-6.9147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnNTIuOSJTIDEwN8KwMzcnMDUuMiJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title={`${config.unitName} Location`}
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
