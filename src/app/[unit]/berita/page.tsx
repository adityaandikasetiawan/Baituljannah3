'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Calendar, Newspaper, Sparkles, Tag } from 'lucide-react';

export default function UnitBeritaPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slug } = React.use(params);
  const config = getUnitConfig(slug);
  const fullName = config?.fullName || '';
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
  const [dbPosts, setDbPosts] = React.useState<
    { title: string; date: string; category: string; excerpt: string; image: string }[] | null
  >(null);
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

  const heroByUnit: Record<string, string> = {
    tkit: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
    sdit: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
    smpit: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
    smait: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
    slbit: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
    asrama: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
  };

  const heroImage = heroByUnit[slug] ?? '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp';

  React.useEffect(() => {
    const unitCode = String(slug || '').trim().toUpperCase();
    if (!unitCode || unitCode === 'ASRAMA') {
      setDbPosts(null);
      return;
    }

    const controller = new AbortController();
    fetch(`${apiBaseUrl}/news?unit_sekolah=${encodeURIComponent(unitCode)}&limit=100&page=1`, { signal: controller.signal })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat berita');
        const rows = Array.isArray(json?.data) ? json.data : [];
        const mapped = rows
          .map((row: any) => {
            const rawTitle = String(row?.title || '').trim();
            const rawCategory = String(row?.category || '').trim() || 'Lainnya';
            const rawDate = String(row?.publish_date || row?.created_at || '').trim();
            const dt = rawDate ? new Date(rawDate) : null;
            const dateLabel = dt && !Number.isNaN(dt.getTime())
              ? dt.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
              : 'Jadwal menyusul';
            const rawContent = String(row?.content || '').trim();
            const plain = rawContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            const excerpt = plain.length > 160 ? `${plain.slice(0, 160)}...` : plain;
            const imageUrl = String(row?.image_url || '').trim() || heroImage;
            return {
              title: rawTitle,
              date: dateLabel,
              category: rawCategory,
              excerpt: excerpt || `Update kegiatan, agenda, dan informasi penting seputar ${fullName}.`,
              image: imageUrl,
            };
          })
          .filter((it: any) => it.title);
        setDbPosts(mapped);
      })
      .catch(() => {
        setDbPosts(null);
      });

    return () => controller.abort();
  }, [apiBaseUrl, fullName, heroImage, slug]);

  if (!config) return null;

  const postsByUnit: Record<
    string,
    { title: string; date: string; category: string; excerpt: string; image: string }[]
  > = {
    tkit: [
      {
        title: 'Open House & Trial Class TKIT',
        date: 'Sabtu, 20 Juli 2026',
        category: 'Pengumuman',
        excerpt: 'Ajak Ayah/Bunda melihat kelas, sentra bermain, dan simulasi pembelajaran. Kuota terbatas.',
        image: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      },
      {
        title: 'Kegiatan Tahfidz: Murojaah Pagi',
        date: 'Senin, 8 Juli 2026',
        category: 'Kegiatan',
        excerpt: 'Pembiasaan murojaah surat pendek dan doa harian dengan metode yang menyenangkan.',
        image: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
      },
      {
        title: 'Workshop Parenting: Adab Sejak Dini',
        date: 'Jumat, 28 Juni 2026',
        category: 'Parenting',
        excerpt: 'Diskusi praktis tentang membangun rutinitas adab, disiplin positif, dan komunikasi hangat di rumah.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Proyek Tematik: Sains Mini di Kelas',
        date: 'Rabu, 19 Juni 2026',
        category: 'Kegiatan',
        excerpt: 'Eksperimen sederhana untuk melatih rasa ingin tahu, motorik halus, dan kemampuan bahasa anak.',
        image: 'https://images.unsplash.com/photo-1588072432836-7fb78b0b6f31?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Lomba Mewarnai: Anak Ceria Berprestasi',
        date: 'Senin, 10 Juni 2026',
        category: 'Prestasi',
        excerpt: 'Selamat untuk anak-anak yang meraih penghargaan. Terus semangat berkarya dan percaya diri!',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Informasi PPDB TKIT Tahun Ajaran Baru',
        date: 'Kamis, 30 Mei 2026',
        category: 'Pengumuman',
        excerpt: 'Pendaftaran dibuka. Jadwal seleksi, dokumen, dan alur registrasi tersedia untuk Ayah/Bunda.',
        image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
      },
    ],
    sdit: [
      {
        title: 'Sosialisasi Program Tahfidz SDIT',
        date: 'Rabu, 17 Juli 2026',
        category: 'Tahfidz',
        excerpt: 'Penjelasan target halaqah, evaluasi berkala, dan dukungan pembiasaan murojaah di rumah.',
        image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
      },
      {
        title: 'Agenda Kegiatan Semester Ganjil',
        date: 'Senin, 8 Juli 2026',
        category: 'Pengumuman',
        excerpt: 'Rangkaian kegiatan akademik, keislaman, dan pengembangan diri untuk siswa SDIT.',
        image: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
      },
      {
        title: 'Kegiatan Projek Tematik',
        date: 'Kamis, 27 Juni 2026',
        category: 'Kegiatan',
        excerpt: 'Belajar lintas mata pelajaran melalui proyek yang melatih kolaborasi dan kreativitas.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Parenting: Pola Komunikasi Efektif',
        date: 'Sabtu, 15 Juni 2026',
        category: 'Parenting',
        excerpt: 'Diskusi praktis membangun rutinitas belajar di rumah dan komunikasi positif dengan anak.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Prestasi Siswa di Ajang Lomba',
        date: 'Selasa, 4 Juni 2026',
        category: 'Prestasi',
        excerpt: 'Apresiasi untuk siswa yang berprestasi dan dukungan pembinaan berkelanjutan.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Informasi PPDB SDIT',
        date: 'Jumat, 24 Mei 2026',
        category: 'Pengumuman',
        excerpt: 'Alur pendaftaran, jadwal seleksi, dan dokumen yang dibutuhkan.',
        image: heroImage,
      },
    ],
    smpit: [
      {
        title: 'Program Pembinaan Remaja & Karakter',
        date: 'Rabu, 17 Juli 2026',
        category: 'Pembinaan',
        excerpt: 'Penguatan adab, disiplin, dan tanggung jawab pada masa transisi remaja.',
        image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
      },
      {
        title: 'Agenda Kegiatan Kesiswaan',
        date: 'Selasa, 9 Juli 2026',
        category: 'Kesiswaan',
        excerpt: 'Rangkaian kegiatan OSIS, proyek sosial, dan pembinaan kepemimpinan siswa.',
        image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Tryout & Evaluasi Berkala',
        date: 'Kamis, 27 Juni 2026',
        category: 'Akademik',
        excerpt: 'Penguatan pemahaman materi melalui evaluasi terarah dan umpan balik.',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Halaqah Tahfidz SMPIT',
        date: 'Sabtu, 15 Juni 2026',
        category: 'Tahfidz',
        excerpt: 'Program tahsin, murojaah, dan target hafalan sesuai jenjang.',
        image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Workshop Parenting: Remaja & Gadget',
        date: 'Selasa, 4 Juni 2026',
        category: 'Parenting',
        excerpt: 'Strategi pendampingan penggunaan gadget dan membangun komunikasi yang sehat.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Informasi PPDB SMPIT',
        date: 'Jumat, 24 Mei 2026',
        category: 'Pengumuman',
        excerpt: 'Informasi seleksi, jadwal, dan persyaratan pendaftaran.',
        image: heroImage,
      },
    ],
    smait: [
      {
        title: 'Program Persiapan Studi Lanjut',
        date: 'Rabu, 17 Juli 2026',
        category: 'Akademik',
        excerpt: 'Pendampingan peminatan, strategi belajar, dan rencana studi lanjut siswa.',
        image: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
      },
      {
        title: 'Pembinaan Prestasi & Olimpiade',
        date: 'Selasa, 9 Juli 2026',
        category: 'Prestasi',
        excerpt: 'Program pembinaan terstruktur untuk lomba, olimpiade, dan portofolio prestasi.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Mentoring Karakter Pekanan',
        date: 'Kamis, 27 Juni 2026',
        category: 'Pembinaan',
        excerpt: 'Penguatan adab, integritas, dan kebiasaan belajar mandiri.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Kegiatan Kesiswaan & Organisasi',
        date: 'Sabtu, 15 Juni 2026',
        category: 'Kesiswaan',
        excerpt: 'Kegiatan organisasi siswa, proyek sosial, dan kepemimpinan.',
        image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Halaqah Tahfidz SMAIT',
        date: 'Selasa, 4 Juni 2026',
        category: 'Tahfidz',
        excerpt: 'Tahsin, murojaah, dan penguatan target hafalan.',
        image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Informasi PPDB SMAIT',
        date: 'Jumat, 24 Mei 2026',
        category: 'Pengumuman',
        excerpt: 'Jadwal seleksi, dokumen, dan alur pendaftaran.',
        image: heroImage,
      },
    ],
    slbit: [
      {
        title: 'Layanan Pendampingan Individual',
        date: 'Rabu, 17 Juli 2026',
        category: 'Pendampingan',
        excerpt: 'Informasi asesmen, rencana belajar individual, dan komunikasi rutin dengan orang tua.',
        image: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      },
      {
        title: 'Program Adaptasi & Kemandirian',
        date: 'Selasa, 9 Juli 2026',
        category: 'Pembinaan',
        excerpt: 'Pembiasaan adab, kemandirian, dan keterampilan fungsional bertahap.',
        image: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
      },
      {
        title: 'Kolaborasi Orang Tua & Sekolah',
        date: 'Kamis, 27 Juni 2026',
        category: 'Parenting',
        excerpt: 'Pertemuan berkala untuk membahas strategi pendampingan yang konsisten.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Kegiatan Kelas Adaptif',
        date: 'Sabtu, 15 Juni 2026',
        category: 'Kegiatan',
        excerpt: 'Aktivitas kelas yang disesuaikan dengan kebutuhan dan potensi setiap siswa.',
        image: heroImage,
      },
      {
        title: 'Pembiasaan Tahsin & Adab',
        date: 'Selasa, 4 Juni 2026',
        category: 'Tahfidz',
        excerpt: 'Pembiasaan tahsin/tahfidz bertahap dan penguatan adab keseharian.',
        image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Informasi PPDB SLBIT',
        date: 'Jumat, 24 Mei 2026',
        category: 'Pengumuman',
        excerpt: 'Informasi pendaftaran, asesmen awal, dan alur layanan.',
        image: heroImage,
      },
    ],
    asrama: [
      {
        title: 'Pekan Orientasi Santri Baru',
        date: 'Rabu, 17 Juli 2026',
        category: 'Pengumuman',
        excerpt: 'Informasi tata tertib, perlengkapan, dan rangkaian kegiatan orientasi.',
        image: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      },
      {
        title: 'Rutinitas Harian Asrama',
        date: 'Selasa, 9 Juli 2026',
        category: 'Kegiatan Asrama',
        excerpt: 'Jadwal halaqah, belajar malam, olahraga, dan pembiasaan adab.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Pembinaan Tahfidz & Tahsin',
        date: 'Kamis, 27 Juni 2026',
        category: 'Tahfidz',
        excerpt: 'Program halaqah terstruktur dengan evaluasi perkembangan berkala.',
        image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Kegiatan Kebersamaan Santri',
        date: 'Sabtu, 15 Juni 2026',
        category: 'Kegiatan Asrama',
        excerpt: 'Kegiatan sosial, olahraga, dan pengembangan diri di lingkungan asrama.',
        image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Parenting Wali Santri',
        date: 'Selasa, 4 Juni 2026',
        category: 'Wali Santri',
        excerpt: 'Komunikasi, perizinan, dan sinergi pembinaan karakter bersama wali santri.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Informasi Pendaftaran Asrama',
        date: 'Jumat, 24 Mei 2026',
        category: 'Pengumuman',
        excerpt: 'Syarat, alur pendaftaran, dan jadwal seleksi.',
        image: heroImage,
      },
    ],
  };

  const fallbackPosts =
    postsByUnit[slug] ??
    [
      {
        title: `Informasi Program ${config.unitName}`,
        date: 'Jadwal menyusul',
        category: 'Pengumuman',
        excerpt: `Update kegiatan, agenda, dan informasi penting seputar ${config.fullName}.`,
        image: heroImage,
      },
      {
        title: `Kegiatan Unggulan ${config.unitName}`,
        date: 'Jadwal menyusul',
        category: 'Kegiatan',
        excerpt: `Dokumentasi dan highlight program unggulan di ${config.unitName}.`,
        image: heroImage,
      },
      {
        title: `Informasi PPDB ${config.unitName}`,
        date: 'Jadwal menyusul',
        category: 'Pengumuman',
        excerpt: 'Informasi seleksi, dokumen, dan alur pendaftaran terbaru.',
        image: heroImage,
      },
      {
        title: `Kegiatan Pembinaan ${config.unitName}`,
        date: 'Jadwal menyusul',
        category: 'Pembinaan',
        excerpt: 'Pembiasaan adab, mentoring, dan program karakter.',
        image: heroImage,
      },
      {
        title: `Prestasi ${config.unitName}`,
        date: 'Jadwal menyusul',
        category: 'Prestasi',
        excerpt: 'Apresiasi untuk capaian akademik dan non-akademik siswa.',
        image: heroImage,
      },
      {
        title: `Parenting & Kolaborasi ${config.unitName}`,
        date: 'Jadwal menyusul',
        category: 'Parenting',
        excerpt: 'Agenda parenting dan komunikasi rutin sekolah-orang tua.',
        image: heroImage,
      },
    ];

  const posts = dbPosts && dbPosts.length ? dbPosts : fallbackPosts;

  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const categoryChips = ['Semua', ...categories];

  const filteredPosts =
    activeCategory === 'Semua' ? posts : posts.filter((p) => p.category === activeCategory);

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
              <Newspaper className="w-4 h-4" />
              <span>Berita & Kegiatan</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Informasi Terbaru {config.unitName}
            </h1>
            <p className="text-white/90 text-lg md:text-xl">
              Update kegiatan, pengumuman, dan agenda penting seputar {config.fullName}.
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
                <Tag className="w-4 h-4" />
                <span>Kategori</span>
              </div>
              <h2 className="text-3xl mb-2">Pilih Informasi</h2>
              <p className="text-gray-600 max-w-2xl">
                Filter berita untuk menemukan agenda dan update sesuai kebutuhan.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((p) => (
              <div
                key={`${p.title}-${p.date}`}
                className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-strong transition-all group"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${config.accentColor}12`, color: config.accentColor }}>
                      <Tag className="w-3.5 h-3.5" />
                      <span>{p.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{p.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.excerpt}</p>
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
                  <span>PPDB</span>
                </div>
                <h3 className="text-3xl mb-3">Siap bergabung dengan {config.unitName}?</h3>
                <p className="text-gray-600">
                  Lihat alur pendaftaran dan informasi PPDB terbaru. Admin unit siap membantu.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push(`/${slug}/ppdb`)}
                  className="px-8 py-3 rounded-full font-semibold text-white hover:opacity-95 transition-opacity"
                  style={{ backgroundColor: config.accentColor }}
                >
                  Daftar PPDB
                </button>
                <button
                  onClick={() => router.push(`/${slug}/kontak`)}
                  className="px-8 py-3 rounded-full font-semibold border-2 hover:bg-gray-50 transition-colors"
                  style={{ borderColor: `${config.accentColor}60`, color: config.accentColor }}
                >
                  Hubungi Kami
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
