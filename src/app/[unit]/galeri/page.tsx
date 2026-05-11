'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Camera, Images, Sparkles } from 'lucide-react';

export default function UnitGaleriPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slug } = React.use(params);
  const config = getUnitConfig(slug);
  const [activeCategory, setActiveCategory] = React.useState('Semua');
  const apiBaseUrl = React.useMemo(() => {
    const base = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '');
    if (typeof window === 'undefined') return base;
    const hostname = window.location.hostname.toLowerCase();
    if (hostname === 'smaitbaituljannah.sch.id' || hostname === 'www.smaitbaituljannah.sch.id') {
      return 'https://baituljannah.sch.id/api/v1';
    }
    return base;
  }, []);
  const [dbItems, setDbItems] = React.useState<{ title: string; category: string; src: string }[] | null>(null);
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
    { label: 'PPDB', href: '#', onClick: () => router.push(`/${slug}/ppdb`) },
    { label: 'Kontak', href: '#', onClick: () => router.push(`/${slug}/kontak`) }
  ];

  React.useEffect(() => {
    const unitCode = String(slug || '').trim().toUpperCase();
    if (!unitCode || unitCode === 'ASRAMA') {
      setDbItems(null);
      return;
    }

    const controller = new AbortController();
    fetch(`${apiBaseUrl}/gallery?unit_code=${encodeURIComponent(unitCode)}&limit=100`, { signal: controller.signal })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat galeri');
        const rows = Array.isArray(json?.data) ? json.data : [];
        const mapped = rows
          .map((row: any) => ({
            title: String(row?.title || ''),
            category: String(row?.category || 'Semua'),
            src: String(row?.image_url || ''),
          }))
          .filter((it: any) => it.title && it.src);
        setDbItems(mapped);
      })
      .catch(() => {
        setDbItems(null);
      });

    return () => controller.abort();
  }, [apiBaseUrl, slug]);

  if (!config) return null;

  const heroByUnit: Record<string, string> = {
    tkit: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
    sdit: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
    smpit: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
    smait: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
    slbit: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
    asrama: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
  };

  const heroImage = heroByUnit[slug] ?? '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp';

  const galleryByUnit: Record<string, { items: { title: string; category: string; src: string }[] }> = {
    tkit: {
      items: [
        { title: 'Belajar di Sentra', category: 'Kegiatan Kelas', src: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp' },
        { title: 'Circle Time', category: 'Kegiatan Kelas', src: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp' },
        { title: 'Kegiatan Motorik', category: 'Outdoor', src: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp' },
        { title: 'Adab Harian', category: 'Tahfidz & Adab', src: 'https://images.unsplash.com/photo-1603985529862-9e12198c9a60?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Tahfidz Bertahap', category: 'Tahfidz & Adab', src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Eksperimen Sains', category: 'Kegiatan Kelas', src: 'https://images.unsplash.com/photo-1588072432836-7fb78b0b6f31?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Seni & Kreativitas', category: 'Kegiatan Kelas', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Area Bermain', category: 'Fasilitas', src: 'https://images.unsplash.com/photo-1588072432904-843af37f03ed?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    sdit: {
      items: [
        { title: 'Pembelajaran Tematik', category: 'Kegiatan Kelas', src: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp' },
        { title: 'Literasi & Numerasi', category: 'Akademik', src: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp' },
        { title: 'Halaqah Tahfidz', category: 'Tahfidz & Adab', src: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp' },
        { title: 'Praktik Ibadah', category: 'Tahfidz & Adab', src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Eksperimen Sains', category: 'Akademik', src: 'https://images.unsplash.com/photo-1588072432836-7fb78b0b6f31?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Olahraga', category: 'Outdoor', src: 'https://images.unsplash.com/photo-1535909339361-9b3d7f4f3be4?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Seni', category: 'Kegiatan Kelas', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Fasilitas Belajar', category: 'Fasilitas', src: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    smpit: {
      items: [
        { title: 'Praktikum Sains', category: 'Akademik', src: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp' },
        { title: 'Diskusi Kelas', category: 'Kegiatan Kelas', src: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp' },
        { title: 'Halaqah Tahfidz', category: 'Tahfidz & Adab', src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan OSIS', category: 'Kesiswaan', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Olahraga', category: 'Outdoor', src: 'https://images.unsplash.com/photo-1535909339361-9b3d7f4f3be4?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Fasilitas Laboratorium', category: 'Fasilitas', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Proyek Tematik', category: 'Akademik', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Sosial', category: 'Kesiswaan', src: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    smait: {
      items: [
        { title: 'Pembinaan Olimpiade', category: 'Prestasi', src: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp' },
        { title: 'Kelas Persiapan Studi', category: 'Akademik', src: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp' },
        { title: 'Proyek & Riset Mini', category: 'Akademik', src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Mentoring Karakter', category: 'Pembinaan', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Ekskul', category: 'Kesiswaan', src: 'https://images.unsplash.com/photo-1520975958221-3f4b20f79e60?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Sosial', category: 'Kesiswaan', src: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Halaqah Tahfidz', category: 'Pembinaan', src: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Fasilitas Belajar', category: 'Fasilitas', src: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    slbit: {
      items: [
        { title: 'Kelas Adaptif', category: 'Kegiatan Kelas', src: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp' },
        { title: 'Pendampingan Individual', category: 'Pendampingan', src: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp' },
        { title: 'Terapi Motorik', category: 'Pendampingan', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Pembiasaan Adab', category: 'Tahfidz & Adab', src: 'https://images.unsplash.com/photo-1603985529862-9e12198c9a60?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Sensori', category: 'Pendampingan', src: 'https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Outdoor', category: 'Outdoor', src: 'https://images.unsplash.com/photo-1535909339361-9b3d7f4f3be4?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Fasilitas Pendukung', category: 'Fasilitas', src: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Karya & Kreativitas', category: 'Kegiatan Kelas', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
    asrama: {
      items: [
        { title: 'Kegiatan Halaqah', category: 'Pembinaan', src: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp' },
        { title: 'Kegiatan Tahfidz', category: 'Tahfidz', src: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp' },
        { title: 'Pembinaan Adab', category: 'Pembinaan', src: 'https://images.unsplash.com/photo-1603985529862-9e12198c9a60?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Olahraga', category: 'Kegiatan Harian', src: 'https://images.unsplash.com/photo-1535909339361-9b3d7f4f3be4?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Belajar Malam', category: 'Kegiatan Harian', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Kebersihan', category: 'Kegiatan Harian', src: 'https://images.unsplash.com/photo-1520975958221-3f4b20f79e60?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Fasilitas Asrama', category: 'Fasilitas', src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Kegiatan Sosial', category: 'Pembinaan', src: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80' },
      ],
    },
  };

  const fallbackItems =
    galleryByUnit[slug]?.items ??
    [
      { title: 'Dokumentasi Kegiatan', category: 'Semua', src: heroImage },
      { title: 'Suasana Belajar', category: 'Semua', src: heroImage },
      { title: 'Aktivitas Siswa', category: 'Semua', src: heroImage },
      { title: 'Fasilitas Sekolah', category: 'Semua', src: heroImage },
      { title: 'Kegiatan Rutin', category: 'Semua', src: heroImage },
      { title: 'Kegiatan Pengayaan', category: 'Semua', src: heroImage },
      { title: 'Kegiatan Keislaman', category: 'Semua', src: heroImage },
      { title: 'Momen Kebersamaan', category: 'Semua', src: heroImage },
    ];

  const items = dbItems && dbItems.length ? dbItems : fallbackItems;

  const categories = Array.from(new Set(items.map((it) => it.category)));
  const categoryChips = ['Semua', ...categories];

  const filteredItems =
    activeCategory === 'Semua' ? items : items.filter((it) => it.category === activeCategory);

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
              <Images className="w-4 h-4" />
              <span>Galeri</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Dokumentasi Kegiatan {config.unitName}
            </h1>
            <p className="text-white/90 text-lg md:text-xl">
              Momen belajar, bermain, dan pembiasaan adab yang kami abadikan untuk orang tua dan masyarakat.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-3"
                style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
              >
                <Camera className="w-4 h-4" />
                <span>Kategori</span>
              </div>
              <h2 className="text-3xl mb-2">Pilih Dokumentasi</h2>
              <p className="text-gray-600 max-w-2xl">
                Gunakan kategori untuk menemukan momen yang ingin dilihat.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categoryChips.map((c) => {
                const isActive = activeCategory === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all ${
                      isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: config.accentColor, borderColor: config.accentColor }
                        : { borderColor: `${config.accentColor}40` }
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredItems.map((it) => (
              <div key={`${it.title}-${it.src}`} className="group relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-soft hover:shadow-strong transition-all">
                <div className="aspect-square">
                  <ImageWithFallback src={it.src} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-0 right-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  <p className="text-white text-sm font-semibold">{it.title}</p>
                  <p className="text-white/80 text-xs mt-1">{it.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-10 md:p-12 shadow-soft border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4"
                  style={{ backgroundColor: `${config.accentColor}14`, color: config.accentColor }}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Info & Kegiatan</span>
                </div>
                <h3 className="text-3xl mb-3">Ingin lihat agenda dan berita terbaru?</h3>
                <p className="text-gray-600">
                  Temukan update kegiatan, program, dan pengumuman penting dari {config.unitName}.
                </p>
              </div>
              <button
                onClick={() => router.push(`/${slug}/berita`)}
                className="px-8 py-3 rounded-full font-semibold text-white hover:opacity-95 transition-opacity"
                style={{ backgroundColor: config.accentColor }}
              >
                Buka Berita Unit
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
