'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { UnitProfileCarousel } from '../../../features/unit/components/UnitProfileCarousel';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { ArrowRight, Award, BookOpen, Calendar, CheckCircle2, Heart, Sparkles, Users } from 'lucide-react';

export default function UnitProfilPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slug } = React.use(params);
  const config = getUnitConfig(slug);
  const isAsrama = slug === 'asrama';
  const staffMenuLabel = isAsrama ? 'Musyrif & Musyrifah' : 'Guru & Staff';
  const curriculumMenuLabel = isAsrama ? 'Program' : 'Kurikulum';

  const heroImages = [
    '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
    '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
    '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
  ];

  const getProfileContent = (unitSlug: string) => {
    const key = unitSlug.toLowerCase();

    if (key === 'tkit') {
      return {
        badge: 'Profil TKIT',
        headline: 'Belajar sambil bermain, berakhlak sejak dini',
        intro:
          'Kami menumbuhkan cinta Al-Qur’an, adab, dan rasa ingin tahu anak melalui pembelajaran yang hangat, menyenangkan, dan terstruktur.',
        vision:
          'Menjadi TK Islam terpadu unggul yang menumbuhkan generasi Qur’ani, ceria, mandiri, dan berakhlak mulia.',
        missions: [
          'Menanamkan adab dan pembiasaan ibadah harian sejak dini.',
          'Mengenalkan Al-Qur’an melalui tahsin, tahfidz awal, dan kisah teladan.',
          'Mengembangkan kognitif, bahasa, sosial-emosional, dan motorik secara seimbang.',
          'Membangun kolaborasi positif sekolah dan orang tua untuk tumbuh kembang optimal.',
        ],
        strengths: [
          {
            title: 'Pendampingan Hangat',
            description: 'Ruang kelas yang aman dan suportif agar anak percaya diri bereksplorasi.',
            icon: Heart,
          },
          {
            title: 'Tahfidz & Adab',
            description: 'Pembiasaan doa, dzikir, dan adab harian dibangun dengan konsisten.',
            icon: BookOpen,
          },
          {
            title: 'Kegiatan Variatif',
            description: 'Sentra bermain, eksperimen sederhana, seni, dan aktivitas motorik.',
            icon: Sparkles,
          },
          {
            title: 'Komunikasi Orang Tua',
            description: 'Update perkembangan anak dan sinergi program pembiasaan di rumah.',
            icon: Users,
          },
        ],
        routineTitle: 'Alur Kegiatan Harian',
        routine: [
          { time: '07.00', title: 'Penyambutan & Adab Pagi', desc: 'Salam, sapa, doa, dan pembiasaan kemandirian.' },
          { time: '08.00', title: 'Circle Time', desc: 'Ice breaking, literasi, numerasi dasar, dan permainan edukatif.' },
          { time: '09.00', title: 'Tahfidz & Tahsin', desc: 'Murojaah, hafalan bertahap, dan makharijul huruf.' },
          { time: '10.00', title: 'Sentra / Proyek', desc: 'Belajar melalui bermain: sains, seni, motorik, bahasa.' },
          { time: '11.00', title: 'Penutup', desc: 'Refleksi, doa, dan persiapan pulang dengan tertib.' },
        ],
        facilitiesTitle: 'Fasilitas & Lingkungan',
        facilities: [
          'Ruang kelas nyaman dan ramah anak',
          'Area bermain indoor & outdoor',
          'Sudut baca / perpustakaan mini',
          'Ruang UKS dan kebersihan terjaga',
          'Musholla untuk pembiasaan ibadah',
        ],
      };
    }

    return {
      badge: `Profil ${config?.unitName || 'Unit'}`,
      headline: 'Pendidikan Islam terpadu untuk tumbuh dan berprestasi',
      intro:
        'Kami mengintegrasikan kurikulum nasional dan nilai-nilai Islam melalui pembelajaran yang aktif, terukur, dan berorientasi karakter.',
      vision: 'Menjadi unit pendidikan Islam terpadu unggul yang melahirkan generasi beriman, berakhlak, dan berprestasi.',
      missions: [
        'Menguatkan karakter Islami melalui pembiasaan ibadah dan adab.',
        'Menyelenggarakan pembelajaran berkualitas dan berpusat pada peserta didik.',
        'Mengembangkan bakat-minat melalui program pengayaan dan kegiatan variatif.',
        'Membangun kemitraan sekolah, orang tua, dan masyarakat.',
      ],
      strengths: [
        { title: 'Kurikulum Terintegrasi', description: 'Kurikulum nasional ditopang penguatan nilai Islam.', icon: BookOpen },
        { title: 'Guru Profesional', description: 'Tenaga pendidik berkualifikasi dan peduli perkembangan siswa.', icon: Users },
        { title: 'Budaya Prestasi', description: 'Pembinaan akademik dan non-akademik untuk hasil terbaik.', icon: Award },
        { title: 'Kegiatan Terarah', description: 'Program pembiasaan, proyek, dan pembinaan karakter rutin.', icon: Calendar },
      ],
      routineTitle: 'Rangkaian Pembelajaran',
      routine: [
        { time: 'Pagi', title: 'Pembiasaan & Literasi', desc: 'Doa, dzikir, adab, dan penguatan literasi.' },
        { time: 'Siang', title: 'Pembelajaran Inti', desc: 'Materi inti, praktik, proyek, dan evaluasi formatif.' },
        { time: 'Sore', title: 'Pengembangan Diri', desc: 'Ekstrakurikuler, mentoring, dan pembinaan karakter.' },
      ],
      facilitiesTitle: 'Fasilitas Pendukung',
      facilities: ['Ruang kelas nyaman', 'Sarana ibadah', 'Area kegiatan siswa', 'Perpustakaan', 'Layanan konseling'],
    };
  };

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

  const content = getProfileContent(slug);

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
          <ImageWithFallback
            src={heroImages[0]}
            alt={config.fullName}
            className="w-full h-full object-cover"
          />
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
              <img src={config.icon} alt={config.unitName} className="w-5 h-5 object-contain" />
              <span>{content.badge}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{config.fullName}</h1>
            <p className="text-white/90 text-lg md:text-xl mb-6">{content.headline}</p>
            <p className="text-white/85 leading-relaxed max-w-2xl">{content.intro}</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <UnitProfileCarousel images={heroImages} unitName={config.unitName} accentColor={config.accentColor} />

            <div>
              <div
                className="inline-block px-4 py-2 rounded-full text-sm mb-4"
                style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
              >
                Tentang Kami
              </div>
              <h2 className="mb-4">Tentang {config.unitName}</h2>
              <p className="text-gray-600 mb-6">{config.description}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {content.strengths.map((s) => (
                  <div key={s.title} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
                    >
                      {React.createElement(s.icon, { className: 'w-6 h-6' })}
                    </div>
                    <h4 className="mb-2">{s.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-2 rounded-full text-sm mb-4"
              style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
            >
              Visi & Misi
            </div>
            <h2 className="mb-4">Arah Pendidikan {config.unitName}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilar dan tujuan pembelajaran yang menjadi acuan pembinaan karakter, akhlak, dan prestasi.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: config.accentColor }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl">Visi</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{content.vision}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: config.accentColor }}>
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl">Misi</h3>
              </div>
              <ul className="space-y-3">
                {content.missions.map((m) => (
                  <li key={m} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: config.accentColor }} />
                    <span className="text-gray-700">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div
                className="inline-block px-4 py-2 rounded-full text-sm mb-4"
                style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
              >
                {content.routineTitle}
              </div>
              <h2 className="mb-4">Rangkaian Kegiatan</h2>
              <p className="text-gray-600 mb-8">
                Aktivitas disusun terarah agar anak/siswa terlatih disiplin, terbiasa adab, dan berkembang sesuai tahapannya.
              </p>

              <div className="space-y-4">
                {content.routine.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-16 text-sm font-bold" style={{ color: config.accentColor }}>
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div
                className="inline-block px-4 py-2 rounded-full text-sm mb-4"
                style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
              >
                {content.facilitiesTitle}
              </div>
              <h2 className="mb-4">Nyaman untuk Tumbuh</h2>
              <p className="text-gray-600 mb-6">
                Lingkungan belajar yang aman dan bersih membantu proses pembelajaran lebih fokus dan menyenangkan.
              </p>
              <ul className="space-y-3 mb-10">
                {content.facilities.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: config.accentColor }} />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => router.push('/admission')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-soft hover:shadow-strong transition-all"
                  style={{ backgroundColor: config.accentColor }}
                >
                  Daftar PPDB <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push(`/${slug}/galeri`)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 bg-white hover:bg-gray-50 transition-colors"
                  style={{ borderColor: config.accentColor, color: config.accentColor }}
                >
                  Lihat Galeri <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
