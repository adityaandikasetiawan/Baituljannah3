'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { BookOpen, GraduationCap, CheckCircle, ArrowRight, Heart, Sparkles, Users, Palette, Music, Puzzle, Shapes, Brain, Hand, Leaf } from 'lucide-react';

export default function UnitKurikulumPage({ params }: { params: Promise<{ unit: string }> }) {
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

  const getCurriculumContent = (unitSlug: string) => {
    const key = unitSlug.toLowerCase();

    if (key === 'tkit') {
      return {
        badge: 'Kurikulum TKIT',
        headline: 'Holistik, islami, dan sesuai tahap perkembangan anak',
        intro:
          'Kurikulum TKIT menekankan pembiasaan adab, stimulasi perkembangan, dan pengalaman belajar yang menyenangkan melalui bermain terarah.',
        approachTitle: 'Pendekatan Pembelajaran',
        approaches: [
          { title: 'Belajar Melalui Bermain', description: 'Aktivitas bermakna yang menumbuhkan rasa ingin tahu dan kemandirian.', icon: Sparkles },
          { title: 'Pembiasaan Adab & Ibadah', description: 'Doa harian, adab, dan praktik ibadah sederhana dibangun konsisten.', icon: Heart },
          { title: 'Aktif & Eksploratif', description: 'Motorik, sains sederhana, seni, dan aktivitas kolaboratif.', icon: Hand },
          { title: 'Kolaborasi Orang Tua', description: 'Komunikasi rutin dan program rumah untuk memperkuat pembiasaan.', icon: Users },
        ],
        ageGroupsTitle: 'Kelompok Usia',
        ageGroups: [
          { title: 'Kelompok A', subtitle: 'Usia 4–5 tahun', items: ['Adaptasi lingkungan sekolah', 'Kemandirian dasar', 'Bahasa & sosial-emosional', 'Motorik halus & kasar'] },
          { title: 'Kelompok B', subtitle: 'Usia 5–6 tahun', items: ['Kesiapan SD (literasi & numerasi)', 'Berpikir logis sederhana', 'Proyek tematik', 'Pembiasaan disiplin dan tanggung jawab'] },
        ],
        learningAreasTitle: 'Area Perkembangan',
        learningAreas: [
          { title: 'Nilai Agama & Moral', description: 'Adab, doa, kisah teladan, dan pembiasaan ibadah.', icon: Heart },
          { title: 'Bahasa & Literasi', description: 'Mendengar, bercerita, pra-membaca, dan kosakata.', icon: BookOpen },
          { title: 'Kognitif & Numerasi', description: 'Pola, klasifikasi, angka dasar, dan problem solving sederhana.', icon: Brain },
          { title: 'Seni & Kreativitas', description: 'Menggambar, mewarnai, craft, dan ekspresi kreatif.', icon: Palette },
          { title: 'Sosial-Emosional', description: 'Empati, kerjasama, manajemen emosi, dan percaya diri.', icon: Users },
          { title: 'Motorik', description: 'Koordinasi gerak, permainan fisik, dan keterampilan tangan.', icon: Shapes },
          { title: 'Sains & Lingkungan', description: 'Eksperimen ringan, mengenal alam, dan kebiasaan hidup bersih.', icon: Leaf },
          { title: 'Musik & Gerak', description: 'Lagu edukatif, ritme, dan aktivitas gerak terpimpin.', icon: Music },
        ],
        islamicTitle: 'Program Keislaman',
        islamicPoints: [
          "Tahsin dan tahfidz awal (murojaah bertahap sesuai kemampuan anak)",
          'Doa harian dan adab keseharian (masuk kelas, makan, bermain, kebersihan)',
          'Kisah Nabi & sahabat untuk menumbuhkan karakter',
          'Praktik ibadah sederhana (wudhu, shalat berjamaah terarah)',
        ],
        nationalTitle: 'Kurikulum Nasional (PAUD/Kurikulum Merdeka)',
        nationalPoints: [
          'Pembelajaran tematik dan berbasis proyek (mini project)',
          'Penguatan literasi dan numerasi sesuai tahapan',
          'Kegiatan bermain terstruktur (sentra/pojok bermain)',
          'Pengembangan karakter melalui rutinitas dan aturan kelas',
        ],
        routineTitle: 'Contoh Alur Harian',
        routine: [
          { time: '07.00', title: 'Penyambutan & Adab Pagi', desc: 'Salam, sapa, dan pembiasaan kemandirian.' },
          { time: '07.30', title: 'Circle Time', desc: 'Doa, dzikir, literasi, dan kesepakatan kelas.' },
          { time: '08.30', title: 'Pembelajaran Inti', desc: 'Sentra/tematik, eksplorasi, dan kegiatan motorik.' },
          { time: '10.00', title: 'Tahfidz & Kisah Teladan', desc: 'Murojaah, hafalan, dan cerita inspiratif.' },
          { time: '11.00', title: 'Penutup', desc: 'Refleksi, doa, dan persiapan pulang.' },
        ],
        assessmentTitle: 'Asesmen & Laporan Perkembangan',
        assessmentPoints: [
          'Observasi harian melalui aktivitas bermain dan rutinitas',
          'Portofolio karya anak (gambar, craft, proyek tematik)',
          'Catatan perkembangan tiap area (bahasa, kognitif, motorik, sosial-emosional)',
          'Komunikasi berkala dengan orang tua untuk tindak lanjut',
        ],
        extrasTitle: 'Kegiatan Pengayaan',
        extras: [
          { title: 'Fun Science', description: 'Eksperimen sederhana yang aman dan menarik.', icon: Puzzle },
          { title: 'Seni & Craft', description: 'Mengasah kreativitas, fokus, dan motorik halus.', icon: Palette },
          { title: 'Outbound Mini', description: 'Permainan fisik untuk keberanian dan kerjasama.', icon: Shapes },
          { title: 'Baca Bersama', description: 'Menumbuhkan minat baca sejak dini.', icon: BookOpen },
        ],
      };
    }

    return {
      badge: `Kurikulum ${config?.unitName || 'Unit'}`,
      headline: 'Kurikulum terintegrasi untuk tumbuh dan berprestasi',
      intro: 'Integrasi kurikulum nasional dengan pendidikan Islam secara terarah dan aplikatif.',
      approachTitle: 'Komponen Utama',
      approaches: [
        { title: 'Pembelajaran Berkualitas', description: 'Materi inti, praktik, dan pembiasaan belajar yang disiplin.', icon: BookOpen },
        { title: 'Pembinaan Karakter', description: 'Adab, akhlak, dan budaya sekolah yang konsisten.', icon: Heart },
        { title: 'Pengembangan Potensi', description: 'Program pengayaan untuk bakat dan minat peserta didik.', icon: Sparkles },
        { title: 'Kolaborasi Orang Tua', description: 'Komunikasi dan sinergi pembinaan di rumah.', icon: Users },
      ],
      ageGroupsTitle: 'Fokus Pembinaan',
      ageGroups: [
        { title: 'Akademik', subtitle: 'Terukur dan bertahap', items: ['Literasi & numerasi', 'Proyek tematik', 'Keterampilan abad 21', 'Pembelajaran aktif'] },
        { title: 'Karakter', subtitle: 'Berbasis nilai Islam', items: ['Adab harian', 'Kedisiplinan', 'Tanggung jawab', 'Kepedulian sosial'] },
      ],
      learningAreasTitle: 'Pilar Pembelajaran',
      learningAreas: [
        { title: 'Kognitif', description: 'Menguatkan kemampuan berpikir dan pemecahan masalah.', icon: Brain },
        { title: 'Kolaborasi', description: 'Komunikasi, kerja tim, dan empati sosial.', icon: Users },
        { title: 'Kreativitas', description: 'Proyek, seni, dan inovasi dalam kegiatan belajar.', icon: Palette },
        { title: 'Karakter', description: 'Adab, akhlak, dan pembiasaan ibadah.', icon: Heart },
      ],
      islamicTitle: 'Kurikulum Islam',
      islamicPoints: ["Tahfidz Al-Qur'an bertahap", 'Aqidah, Fiqih, Akhlak', 'Hadits & Sirah Nabawiyah', 'Praktik ibadah & adab'],
      nationalTitle: 'Kurikulum Nasional',
      nationalPoints: ['Kurikulum Merdeka yang adaptif dan inovatif', 'Pembelajaran berbasis proyek', 'STEAM', 'Penguatan literasi & numerasi'],
      routineTitle: 'Rangkaian Pembelajaran',
      routine: [
        { time: 'Pagi', title: 'Pembiasaan', desc: 'Doa, adab, literasi, dan kesiapan belajar.' },
        { time: 'Siang', title: 'Pembelajaran Inti', desc: 'Materi inti, praktik, dan evaluasi formatif.' },
        { time: 'Sore', title: 'Pengembangan Diri', desc: 'Kegiatan pengayaan dan pembinaan karakter.' },
      ],
      assessmentTitle: 'Asesmen',
      assessmentPoints: ['Asesmen formatif dan sumatif', 'Proyek dan portofolio', 'Umpan balik terarah', 'Rapat evaluasi berkala'],
      extrasTitle: 'Pengayaan',
      extras: [
        { title: 'Kelas Pengayaan', description: 'Penguatan materi sesuai kebutuhan siswa.', icon: BookOpen },
        { title: 'Proyek Tematik', description: 'Kegiatan lintas mata pelajaran yang aplikatif.', icon: Puzzle },
        { title: 'Seni & Olahraga', description: 'Menyeimbangkan prestasi dan kebugaran.', icon: Shapes },
        { title: 'Pembinaan Karakter', description: 'Mentoring, adab, dan kegiatan sosial.', icon: Heart },
      ],
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

  const content = getCurriculumContent(slug);

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
          <ImageWithFallback src={heroImages[1]} alt={`${config.fullName} Kurikulum`} className="w-full h-full object-cover" />
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
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
              {content.approachTitle}
            </div>
            <h2 className="mb-4">Pembelajaran yang Terarah dan Menyenangkan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Struktur pembelajaran disusun agar peserta didik bertumbuh sesuai tahapan dan memiliki adab yang kuat.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.approaches.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
                  {React.createElement(a.icon, { className: 'w-6 h-6' })}
                </div>
                <h4 className="mb-2">{a.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
              Kurikulum Terintegrasi
            </div>
            <h2 className="mb-4">Kurikulum Nasional & Kurikulum Islam</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Integrasi pembelajaran umum dan keislaman yang aplikatif dalam rutinitas harian.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-soft border border-blue-100/60">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: config.accentColor }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">{content.nationalTitle}</h3>
              <ul className="space-y-3">
                {content.nationalPoints.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: config.accentColor }} />
                    <span className="text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-soft border border-green-100/60">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: config.accentColor }}>
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">{content.islamicTitle}</h3>
              <ul className="space-y-3">
                {content.islamicPoints.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: config.accentColor }} />
                    <span className="text-gray-700">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
              <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
                {content.ageGroupsTitle}
              </div>
              <h2 className="mb-4">Tahapan yang Jelas</h2>
              <p className="text-gray-600 mb-6">
                Materi dan aktivitas disusun bertahap agar anak/siswa berkembang stabil dan siap ke jenjang berikutnya.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {content.ageGroups.map((g) => (
                  <div key={g.title} className="rounded-2xl p-6 border border-gray-100 bg-gray-50">
                    <h4 className="mb-1">{g.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{g.subtitle}</p>
                    <ul className="space-y-2">
                      {g.items.map((it) => (
                        <li key={it} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: config.accentColor }} />
                          <span className="text-gray-700 text-sm">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
              <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
                {content.learningAreasTitle}
              </div>
              <h2 className="mb-4">Fokus Pengembangan</h2>
              <p className="text-gray-600 mb-6">
                Target pembelajaran difokuskan pada penguatan kompetensi inti dan karakter yang relevan.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {content.learningAreas.map((a) => (
                  <div key={a.title} className="rounded-2xl p-6 border border-gray-100 bg-gray-50">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
                      {React.createElement(a.icon, { className: 'w-6 h-6' })}
                    </div>
                    <h4 className="mb-1">{a.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
                {content.routineTitle}
              </div>
              <h2 className="mb-4">Rutinitas yang Menenangkan</h2>
              <p className="text-gray-600 mb-8">
                Rutinitas membantu anak/siswa merasa aman, paham alur kegiatan, dan belajar disiplin.
              </p>

              <div className="space-y-4">
                {content.routine.map((r) => (
                  <div key={`${r.time}-${r.title}`} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-16 text-sm font-bold" style={{ color: config.accentColor }}>
                        {r.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{r.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
              <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
                {content.assessmentTitle}
              </div>
              <h2 className="mb-4">Evaluasi yang Ramah Anak</h2>
              <p className="text-gray-600 mb-6">
                Penilaian dilakukan dengan pendekatan yang mendukung perkembangan dan memberikan umpan balik yang jelas.
              </p>

              <ul className="space-y-3 mb-10">
                {content.assessmentPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: config.accentColor }} />
                    <span className="text-gray-700">{p}</span>
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
                  onClick={() => router.push(`/${slug}/profil`)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 bg-white hover:bg-gray-50 transition-colors"
                  style={{ borderColor: config.accentColor, color: config.accentColor }}
                >
                  Lihat Profil <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
              {content.extrasTitle}
            </div>
            <h2 className="mb-4">Kegiatan Pengayaan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kegiatan pendukung untuk memperkaya pengalaman belajar dan menguatkan karakter.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.extras.map((e) => (
              <div key={e.title} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
                  {React.createElement(e.icon, { className: 'w-6 h-6' })}
                </div>
                <h4 className="mb-2">{e.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
