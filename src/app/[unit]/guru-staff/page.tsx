'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Award, BookOpen, Heart, Sparkles, Users } from 'lucide-react';

export default function UnitGuruStaffPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slug } = React.use(params);
  const config = getUnitConfig(slug);
  const apiBaseUrl = React.useMemo(() => {
    const base = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '');
    if (typeof window === 'undefined') return base;
    const hostname = window.location.hostname.toLowerCase();
    if (
      hostname === 'smaitbaituljannah.sch.id' ||
      hostname === 'www.smaitbaituljannah.sch.id' ||
      hostname === 'smpitbaituljannah.sch.id' ||
      hostname === 'www.smpitbaituljannah.sch.id'
    ) {
      return 'https://baituljannah.sch.id/api/v1';
    }
    return base;
  }, []);
  const [cmsContent, setCmsContent] = React.useState<any | null>(null);
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
    { label: 'PPDB', href: '#', onClick: () => router.push(`/${slug}/ppdb`) },
    { label: 'Kontak', href: '#', onClick: () => router.push(`/${slug}/kontak`) }
  ];

  React.useEffect(() => {
    const unitCode = String(slug || '').trim().toUpperCase();
    if (!unitCode || unitCode === 'ASRAMA') {
      setCmsContent(null);
      return;
    }
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/unit-pages?unit_code=${encodeURIComponent(unitCode)}&page_key=guru-staff`, { signal: controller.signal })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat CMS');
        setCmsContent(json?.data?.content || null);
      })
      .catch(() => setCmsContent(null));
    return () => controller.abort();
  }, [apiBaseUrl, slug]);

  if (!config) return null;

  const heroByUnit: Record<string, string> = {
    tkit: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
    sdit: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
    smpit: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
    smait: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
    slbit: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
    asrama: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
  };

  const heroImage = heroByUnit[slug] ?? '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp';

  const teamByUnit: Record<
    string,
    {
      leaders: { name: string; role: string; focus: string; image: string }[];
      teachers: { name: string; role: string; highlight: string }[];
      values: { title: string; desc: string; icon: typeof Users }[];
    }
  > = {
    tkit: {
      leaders: [
        {
          name: 'Kepala TKIT',
          role: 'Kepala Unit',
          focus: 'Manajemen unit, pembinaan kurikulum, dan kemitraan orang tua.',
          image: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
        },
        {
          name: 'Koordinator Tahfidz',
          role: 'Koordinator Program',
          focus: 'Pembiasaan adab, doa harian, tahsin & tahfidz bertahap.',
          image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
        },
      ],
      teachers: [
        { name: 'Guru Kelas A', role: 'Wali Kelas', highlight: 'Literasi, numerasi, sentra bermain.' },
        { name: 'Guru Kelas B', role: 'Wali Kelas', highlight: 'Kesiapan sekolah, proyek tematik, adab & ibadah.' },
        { name: 'Pendamping Kelas', role: 'Pendamping', highlight: 'Pendampingan personal dan komunikasi orang tua.' },
        { name: 'Guru Seni & Kreativitas', role: 'Pengembangan Diri', highlight: 'Seni, musik, dan kreativitas anak.' },
        { name: 'Guru Olahraga', role: 'Pengembangan Diri', highlight: 'Motorik kasar, permainan, kebugaran.' },
        { name: 'Staff Administrasi', role: 'Administrasi', highlight: 'Layanan informasi dan administrasi PPDB.' },
      ],
      values: [
        { title: 'Adab & Keteladanan', desc: 'Guru menjadi teladan adab, doa, dan disiplin harian.', icon: Heart },
        { title: 'Pembelajaran Bermakna', desc: 'Metode bermain-terstruktur yang menumbuhkan rasa ingin tahu.', icon: Sparkles },
        { title: 'Komunikasi Orang Tua', desc: 'Koordinasi rutin untuk sinergi pembiasaan di rumah dan sekolah.', icon: Users },
      ],
    },
    sdit: {
      leaders: [
        {
          name: 'Kepala SDIT',
          role: 'Kepala Unit',
          focus: 'Pembinaan akademik, karakter, dan kolaborasi sekolah-orang tua.',
          image: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
        },
        {
          name: 'Koordinator Tahfidz',
          role: 'Koordinator Program',
          focus: 'Pembinaan halaqah, tahsin, dan target tahfidz sesuai jenjang.',
          image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
        },
      ],
      teachers: [
        { name: 'Wali Kelas', role: 'Tenaga Pendidik', highlight: 'Pendampingan belajar harian dan pembinaan karakter.' },
        { name: 'Guru Mapel', role: 'Tenaga Pendidik', highlight: 'Pembelajaran aktif, literasi, dan numerasi terarah.' },
        { name: 'Guru BPI', role: 'Pembinaan', highlight: 'Adab, ibadah, dan pembiasaan islami konsisten.' },
        { name: 'Guru Bahasa', role: 'Pengayaan', highlight: 'Penguatan bahasa dan komunikasi efektif.' },
        { name: 'Guru Olahraga', role: 'Pengembangan Diri', highlight: 'Kebugaran, disiplin, dan kerjasama tim.' },
        { name: 'Staff Administrasi', role: 'Administrasi', highlight: 'Layanan informasi, surat menyurat, dan PPDB.' },
      ],
      values: [
        { title: 'Akhlak & Adab', desc: 'Pembiasaan adab yang menjadi budaya sekolah.', icon: Heart },
        { title: 'Pembelajaran Terarah', desc: 'Kelas terstruktur dengan pendekatan aktif dan menyenangkan.', icon: BookOpen },
        { title: 'Budaya Prestasi', desc: 'Pembinaan akademik dan non-akademik yang konsisten.', icon: Award },
      ],
    },
    smpit: {
      leaders: [
        {
          name: 'Kepala SMPIT',
          role: 'Kepala Unit',
          focus: 'Penguatan akademik, karakter remaja, dan pembinaan organisasi siswa.',
          image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
        },
        {
          name: 'Waka Kurikulum',
          role: 'Koordinator Akademik',
          focus: 'Perencanaan pembelajaran, asesmen, dan penguatan literasi numerasi.',
          image: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
        },
      ],
      teachers: [
        { name: 'Guru IPA/Matematika', role: 'Tenaga Pendidik', highlight: 'Latihan problem solving dan pembelajaran kontekstual.' },
        { name: 'Guru Bahasa', role: 'Tenaga Pendidik', highlight: 'Penguatan komunikasi, debat, dan literasi.' },
        { name: 'Guru PAI', role: 'Pembinaan', highlight: 'Tahsin, tahfidz, dan fiqih terapan.' },
        { name: 'Pembina Ekskul', role: 'Pengembangan Diri', highlight: 'Minat-bakat, kepemimpinan, dan teamwork.' },
        { name: 'Guru BK', role: 'Bimbingan', highlight: 'Pendampingan remaja, konseling, dan pembinaan karakter.' },
        { name: 'Staff Administrasi', role: 'Administrasi', highlight: 'Layanan akademik dan informasi sekolah.' },
      ],
      values: [
        { title: 'Karakter Remaja', desc: 'Pembinaan adab dan tanggung jawab pada usia transisi.', icon: Heart },
        { title: 'Akademik Kuat', desc: 'Penguatan konsep, praktik, dan asesmen terarah.', icon: BookOpen },
        { title: 'Kepemimpinan', desc: 'Pembiasaan organisasi, proyek, dan kegiatan sosial.', icon: Users },
      ],
    },
    smait: {
      leaders: [
        {
          name: 'Kepala SMAIT',
          role: 'Kepala Unit',
          focus: 'Persiapan studi lanjut, pembinaan karakter, dan budaya prestasi.',
          image: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
        },
        {
          name: 'Koordinator Prestasi',
          role: 'Koordinator Program',
          focus: 'Pembinaan olimpiade, lomba, dan portfolio prestasi siswa.',
          image: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
        },
      ],
      teachers: [
        { name: 'Guru Saintek', role: 'Tenaga Pendidik', highlight: 'Penguatan konsep dan persiapan kompetisi.' },
        { name: 'Guru Soshum', role: 'Tenaga Pendidik', highlight: 'Analisis, literasi, dan diskusi terarah.' },
        { name: 'Guru PAI', role: 'Pembinaan', highlight: 'Tahsin, tahfidz, dan penguatan worldview Islami.' },
        { name: 'Wali Kelas', role: 'Pendamping', highlight: 'Monitoring perkembangan, target belajar, dan disiplin.' },
        { name: 'Guru BK', role: 'Bimbingan', highlight: 'Konseling, rencana studi lanjut, dan minat bakat.' },
        { name: 'Staff Administrasi', role: 'Administrasi', highlight: 'Layanan akademik, surat, dan informasi PPDB.' },
      ],
      values: [
        { title: 'Prestasi Terukur', desc: 'Pembinaan akademik dan non-akademik berbasis target.', icon: Award },
        { title: 'Mentoring', desc: 'Pendampingan belajar dan karakter secara konsisten.', icon: Users },
        { title: 'Akhlak & Integritas', desc: 'Membangun integritas dan keteladanan dalam keseharian.', icon: Heart },
      ],
    },
    slbit: {
      leaders: [
        {
          name: 'Kepala SLBIT',
          role: 'Kepala Unit',
          focus: 'Pendidikan inklusif, kolaborasi orang tua, dan program individual siswa.',
          image: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
        },
        {
          name: 'Koordinator Inklusi',
          role: 'Koordinator Program',
          focus: 'Asesmen kebutuhan, rencana belajar individual, dan layanan pendampingan.',
          image: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
        },
      ],
      teachers: [
        { name: 'Guru Kelas', role: 'Tenaga Pendidik', highlight: 'Pembelajaran adaptif sesuai kemampuan siswa.' },
        { name: 'Guru Pendamping', role: 'Pendamping', highlight: 'Pendampingan personal dan penguatan kemandirian.' },
        { name: 'Terapis', role: 'Layanan', highlight: 'Stimulasi motorik, sensori, dan keterampilan fungsional.' },
        { name: 'Guru BPI', role: 'Pembinaan', highlight: 'Adab, ibadah, dan pembiasaan Islami bertahap.' },
        { name: 'Konselor', role: 'Bimbingan', highlight: 'Komunikasi dengan orang tua dan rencana tindak lanjut.' },
        { name: 'Staff Administrasi', role: 'Administrasi', highlight: 'Layanan informasi dan administrasi sekolah.' },
      ],
      values: [
        { title: 'Pendampingan Personal', desc: 'Rencana belajar individual dan komunikasi berkelanjutan.', icon: Users },
        { title: 'Belajar Adaptif', desc: 'Strategi sesuai kebutuhan, aman, dan memotivasi.', icon: BookOpen },
        { title: 'Lingkungan Hangat', desc: 'Keteladanan adab dan dukungan emosional siswa.', icon: Heart },
      ],
    },
    asrama: {
      leaders: [
        {
          name: 'Kepala Asrama',
          role: 'Pimpinan Asrama',
          focus: 'Pembinaan karakter, kedisiplinan, dan manajemen kegiatan harian santri.',
          image: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
        },
        {
          name: 'Koordinator Musyrif',
          role: 'Koordinator Pembinaan',
          focus: 'Pendampingan kamar, adab, dan program halaqah harian.',
          image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
        },
      ],
      teachers: [
        { name: 'Musyrif Kamar', role: 'Pembina', highlight: 'Pendampingan harian, adab, dan disiplin santri.' },
        { name: 'Musyrifah Kamar', role: 'Pembina', highlight: 'Pembinaan akhlak, kemandirian, dan rutinitas ibadah.' },
        { name: 'Pembina Tahfidz', role: 'Pembinaan', highlight: 'Halaqah, tahsin, dan target tahfidz terukur.' },
        { name: 'Pembina Kegiatan', role: 'Pengembangan Diri', highlight: 'Olahraga, organisasi, dan kegiatan sosial.' },
        { name: 'Pengasuh Asrama', role: 'Layanan', highlight: 'Pengawasan kesehatan, keamanan, dan kebutuhan harian.' },
        { name: 'Staff Administrasi', role: 'Administrasi', highlight: 'Informasi, perizinan, dan layanan wali santri.' },
      ],
      values: [
        { title: 'Disiplin & Mandiri', desc: 'Rutinitas terarah untuk kemandirian dan tanggung jawab.', icon: Sparkles },
        { title: 'Pembinaan Tahfidz', desc: 'Halaqah terstruktur dan evaluasi perkembangan.', icon: BookOpen },
        { title: 'Adab & Akhlak', desc: 'Keteladanan musyrif/musyrifah dalam keseharian.', icon: Heart },
      ],
    },
  };

  const baseTeam =
    teamByUnit[slug] ??
    ({
      leaders: [
        {
          name: `Kepala ${config.unitName}`,
          role: 'Kepala Unit',
          focus: 'Pembinaan akademik, karakter, dan layanan pendidikan.',
          image: heroImage,
        },
      ],
      teachers: [
        { name: 'Wali Kelas', role: 'Tenaga Pendidik', highlight: 'Pendampingan belajar dan pembinaan karakter.' },
        { name: 'Guru Mapel', role: 'Tenaga Pendidik', highlight: 'Pembelajaran terarah dan evaluasi berkala.' },
        { name: 'Guru BPI', role: 'Pembinaan', highlight: 'Adab, ibadah, dan pembiasaan Islami.' },
        { name: 'Pembina Kegiatan', role: 'Pengembangan Diri', highlight: 'Minat-bakat, proyek, dan kegiatan siswa.' },
        { name: 'Guru BK', role: 'Bimbingan', highlight: 'Pendampingan dan konseling sesuai kebutuhan.' },
        { name: 'Staff Administrasi', role: 'Administrasi', highlight: 'Layanan informasi dan administrasi PPDB.' },
      ],
      values: [
        { title: 'Profesional', desc: 'Tim terlatih dan berpengalaman mendampingi siswa.', icon: Award },
        { title: 'Pembelajaran Aktif', desc: 'Kelas interaktif dan terarah sesuai jenjang.', icon: BookOpen },
        { title: 'Kolaboratif', desc: 'Komunikasi dan sinergi sekolah, orang tua, dan siswa.', icon: Users },
      ],
    } as const);
  const team = (() => {
    if (!cmsContent || typeof cmsContent !== 'object') return baseTeam;
    const nextLeaders = Array.isArray(cmsContent?.leaders) ? cmsContent.leaders : baseTeam.leaders;
    const nextTeachers = Array.isArray(cmsContent?.teachers) ? cmsContent.teachers : baseTeam.teachers;
    const nextValues = Array.isArray(cmsContent?.values)
      ? baseTeam.values.map((v: any, idx: number) => {
          const o = cmsContent.values[idx];
          if (!o || typeof o !== 'object') return v;
          return {
            ...v,
            title: typeof o.title === 'string' ? o.title : v.title,
            desc: typeof o.desc === 'string' ? o.desc : v.desc,
          };
        })
      : baseTeam.values;
    return { leaders: nextLeaders, teachers: nextTeachers, values: nextValues };
  })();

  

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
              <Users className="w-4 h-4" />
              <span>{staffMenuLabel}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Tim Pengajar Profesional</h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              Tim pendidik dan pembina yang hangat, terlatih, dan berdedikasi mendampingi siswa sesuai jenjang dan kebutuhan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push(`/${slug}/kontak`)}
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-opacity-90 transition-all"
              >
                Hubungi Admin Unit
              </button>
              <button
                onClick={() => router.push(`/${slug}/kurikulum`)}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                Lihat Kurikulum
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-2 rounded-full text-sm mb-4"
              style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}
            >
              Struktur Tim
            </div>
            <h2 className="text-3xl mb-3">Pimpinan & Koordinator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tim inti yang memastikan pembelajaran berjalan terarah, aman, dan menyenangkan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {team.leaders.map((leader: any) => (
              <div key={leader.name} className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
                <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                  <ImageWithFallback src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: `${config.accentColor}12`, color: config.accentColor }}>
                    {leader.role}
                  </div>
                  <h3 className="text-2xl mb-2">{leader.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{leader.focus}</p>
                </div>
              </div>
            ))}
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
              Tenaga Pendidik
            </div>
            <h2 className="text-3xl mb-3">Guru Kelas & Pendamping</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pendampingan konsisten melalui pembelajaran terarah dan pembinaan karakter yang berkelanjutan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {team.teachers.map((t: any) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100 hover:shadow-strong transition-all">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${config.accentColor}18` }}
                >
                  <Users className="w-7 h-7" style={{ color: config.accentColor }} />
                </div>
                <h4 className="text-xl mb-1">{t.name}</h4>
                <p className="text-sm font-semibold mb-4" style={{ color: config.accentColor }}>
                  {t.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{t.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {team.values.map((item: any) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${config.accentColor}18` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: config.accentColor }} />
                </div>
                <h3 className="text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
