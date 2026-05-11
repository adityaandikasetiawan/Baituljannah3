
'use client';

import React from 'react';
import Image from 'next/image';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BookOpen, Users, Award, Globe, Heart, Star, ArrowRight, Sparkles, Trophy, GraduationCap, Target, TrendingUp, Search, ChevronLeft, ChevronRight, Play, Lightbulb, Zap } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useNavigationMenu } from '../hooks/useNavigationMenu';

export default function Home() {
  const { onNavigate, menuItems } = useNavigationMenu();

  const [heroRef, heroApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollHeroPrev = React.useCallback(() => heroApi?.scrollPrev(), [heroApi]);
  const scrollHeroNext = React.useCallback(() => heroApi?.scrollNext(), [heroApi]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', skipSnaps: false, dragFree: false, containScroll: 'trimSnaps' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedAchievementIndex, setSelectedAchievementIndex] = React.useState(0);

  const apiBaseUrl = React.useMemo(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
    return base.replace(/\/$/, '');
  }, []);

  const fallbackAchievements = React.useMemo(() => ([
    {
      studentName: "M. Husein Haekal",
      studentImage: "/uploads/achievement/achievement_1769996411538_dig650xbr3b.webp",
      achievement: "Peserta Olimpiade Terbaik",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 1",
      category: "Cerdas Cermat",
      accentColor: "#1E4AB8"
    },
    {
      studentName: "Zalika Tsabita Az - Zahra",
      studentImage: "/uploads/achievement/achievement_1770259138348_pcj36zz54xh.webp",
      achievement: "Pencak Silat Tunggal",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 3",
      category: "Perwakilan • Tinggi 2 • Tinggi 1",
      accentColor: "#F97316"
    },
    {
      studentName: "Dhoffa Adzellia Khaerani",
      studentImage: "/uploads/achievement/achievement_1770259163513_vakbjibn58j.webp",
      achievement: "Pidato Bahasa Inggris",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 2",
      category: "Perwakilan • Tinggi 2 • Tinggi 3",
      accentColor: "#10B981"
    },
    {
      studentName: "Ahmad Fadhil Rahman",
      studentImage: "/uploads/achievement/achievement_1770259176223_998ib4a3t76.webp",
      achievement: "Matematika Olimpiade",
      competition: '"Kompetisi Sains Nasional 2025" Tingkat Nasional',
      rank: "JUARA 1",
      category: "Matematika • SMP",
      accentColor: "#8B5CF6"
    },
    {
      studentName: "Aisha Zahra Putri",
      studentImage: "/uploads/achievement/achievement_1770259190080_iu7u3uoup9.webp",
      achievement: "Tahfidz Al-Qur'an",
      competition: '"Musabaqah Tilawatil Quran 2025" Tingkat Provinsi',
      rank: "JUARA 1",
      category: "Tahfidz 10 Juz",
      accentColor: "#10B981"
    },
    {
      studentName: "Muhammad Rizki Alfarizi",
      studentImage: "/uploads/achievement/achievement_1770259204289_7zh4ifi6pca.webp",
      achievement: "Robotika",
      competition: '"Indonesia Robot Olympiad 2025" Tingkat Nasional',
      rank: "JUARA 2",
      category: "Line Follower",
      accentColor: "#F97316"
    },
    {
      studentName: "Siti Nurhaliza",
      studentImage: "/uploads/achievement/achievement_1770259218100_4znqxdhqfjq.webp",
      achievement: "Juara Umum",
      competition: '"Lomba Cerdas Cermat 2025" Tingkat Kota',
      rank: "JUARA 1",
      category: "Akademik",
      accentColor: "#3B82F6"
    },
    {
      studentName: "Budi Santoso",
      studentImage: "/uploads/achievement/achievement_1770259234557_sdnixtxzwr.webp",
      achievement: "Lari Marathon",
      competition: '"Pekan Olahraga Pelajar 2025" Tingkat Provinsi',
      rank: "JUARA 2",
      category: "Olahraga",
      accentColor: "#EF4444"
    },
    {
      studentName: "Rina Wati",
      studentImage: "/uploads/achievement/achievement_1770601549377_5saxw8xrr2i.webp",
      achievement: "Seni Lukis",
      competition: '"Festival Seni Siswa Nasional 2025"',
      rank: "JUARA 1",
      category: "Seni",
      accentColor: "#8B5CF6"
    },
    {
      studentName: "Joko Susilo",
      studentImage: "/uploads/achievement/achievement_1770601631186_pq0yr3wit0b.webp",
      achievement: "Pidato Bahasa Arab",
      competition: '"Musabaqah Bahasa Arab 2025" Tingkat Nasional',
      rank: "JUARA 3",
      category: "Bahasa",
      accentColor: "#10B981"
    },
    {
      studentName: "Dewi Sartika",
      studentImage: "/uploads/achievement/achievement_1770601645303_qumz9y74jk.webp",
      achievement: "Olimpiade Biologi",
      competition: '"Olimpiade Sains Nasional 2025"',
      rank: "JUARA 2",
      category: "Sains",
      accentColor: "#F59E0B"
    },
    {
      studentName: "Andi Wijaya",
      studentImage: "/uploads/achievement/achievement_1770601668743_4hdkv8zve2a.webp",
      achievement: "Karate",
      competition: '"Kejuaraan Karate Pelajar 2025" Tingkat Nasional',
      rank: "JUARA 1",
      category: "Olahraga",
      accentColor: "#DC2626"
    }
  ]), []);

  const fallbackHeroSlides = React.useMemo(() => ([
    {
      image: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      title: 'Yayasan Baituljannah',
      description: 'Membentuk Generasi Qur\'ani yang Cerdas, Berakhlak Mulia, dan Berprestasi Global',
      badge: '🕌 Pendidikan Islam Terpadu'
    },
    {
      image: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
      title: 'Pendidikan Berkualitas',
      description: 'Mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Quran dan As-Sunnah',
      badge: '📚 Kurikulum Terpadu'
    },
    {
      image: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
      title: 'Prestasi Gemilang',
      description: 'Ratusan prestasi di tingkat lokal, nasional, dan internasional',
      badge: '🏆 Berprestasi'
    },
    {
      image: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      title: 'Fasilitas Modern',
      description: 'Dilengkapi dengan fasilitas pembelajaran yang modern dan mendukung',
      badge: '🏫 Fasilitas Lengkap'
    },
    {
      image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
      title: 'Guru Profesional',
      description: 'Tenaga pendidik yang kompeten, berpengalaman, dan berdedikasi tinggi',
      badge: '👨‍🏫 Pendidik Berpengalaman'
    },
    {
      image: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
      title: 'Lingkungan Islami',
      description: 'Membangun karakter dan akhlak mulia dalam suasana pembelajaran yang kondusif',
      badge: '🕋 Akhlak & Adab'
    }
  ]), []);

  const [achievements, setAchievements] = React.useState(fallbackAchievements);
  const [heroSlides, setHeroSlides] = React.useState(fallbackHeroSlides);

  const getAccentColor = React.useCallback((category?: string, level?: string) => {
    const key = (category || level || '').toLowerCase();
    if (key.includes('olahraga')) return '#F97316';
    if (key.includes('tahfidz') || key.includes('agama')) return '#8B5CF6';
    if (key.includes('seni') || key.includes('budaya')) return '#10B981';
    if (key.includes('sains') || key.includes('biologi') || key.includes('kimia') || key.includes('fisika')) return '#3B82F6';
    if (key.includes('bahasa')) return '#14B8A6';
    if (key.includes('matematika')) return '#6366F1';
    return '#1E4AB8';
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [slidersRes, achievementsRes] = await Promise.all([
          fetch(`${apiBaseUrl}/sliders`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`${apiBaseUrl}/achievements?limit=12`).then(r => r.ok ? r.json() : null).catch(() => null)
        ]);

        const slidersRows = slidersRes?.success && Array.isArray(slidersRes.data) ? slidersRes.data : null;
        if (!cancelled && slidersRows && slidersRows.length) {
          setHeroSlides(
            slidersRows.map((row: any) => ({
              image: row.image,
              title: row.title,
              description: row.subtitle || '',
              badge: row.button_text || ''
            }))
          );
        }

        const achievementRows = achievementsRes?.success && Array.isArray(achievementsRes.data) ? achievementsRes.data : null;
        if (!cancelled && achievementRows && achievementRows.length) {
          const mapped = achievementRows.map((row: any, index: number) => ({
            studentName: row.student_name || 'Siswa',
            studentImage:
              row.image_url ||
              fallbackAchievements[index % fallbackAchievements.length]?.studentImage ||
              '/uploads/logos/Yayasan.webp',
            achievement: row.title,
            competition: row.description || '',
            rank: row.rank || '',
            category: row.category || '',
            accentColor: getAccentColor(row.category, row.level)
          }));

          const combined = [...mapped];
          for (const fallback of fallbackAchievements) {
            if (combined.length >= fallbackAchievements.length) break;
            if (combined.some(item => item.studentImage === fallback.studentImage)) continue;
            combined.push(fallback);
          }

          setAchievements(combined.slice(0, Math.max(fallbackAchievements.length, mapped.length)));
        }
      } catch {
        if (!cancelled) {
          setHeroSlides(fallbackHeroSlides);
          setAchievements(fallbackAchievements);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, fallbackAchievements, fallbackHeroSlides, getAccentColor]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedAchievementIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollAchievementPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollAchievementNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const getLoopDistance = React.useCallback((index: number, selected: number, count: number) => {
    if (count <= 0) return 0;
    const direct = Math.abs(index - selected);
    return Math.min(direct, count - direct);
  }, []);

  const getAchievementScale = React.useCallback((index: number) => {
    const count = achievements.length;
    const distance = getLoopDistance(index, selectedAchievementIndex, count);

    if (distance === 0) return 1;
    if (distance === 1) return 0.92;
    if (distance === 2) return 0.86;
    return 0.82;
  }, [achievements.length, getLoopDistance, selectedAchievementIndex]);

  const programs = [
    {
      title: 'Islamic Studies',
      description: 'Akidah, ibadah, akhlak, Al-Qur’an, hadis, fiqih, dan pembiasaan harian untuk membentuk karakter Islami.',
      icon: Heart,
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Academic Excellence',
      description: 'Penguatan literasi-numerasi, pembelajaran tuntas, dan pembinaan prestasi melalui penilaian yang terukur.',
      icon: Award,
      color: '#F97316',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Project Based Learning',
      description: 'Proyek lintas mata pelajaran yang melatih riset, kreativitas, problem solving, dan presentasi karya.',
      icon: Lightbulb,
      color: '#6366F1',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Interpersonal Skill',
      description: 'Komunikasi efektif, teamwork, kepemimpinan, empati, dan etika melalui pembiasaan dan aktivitas terarah.',
      icon: Users,
      color: '#8B5CF6',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Entrepreneur',
      description: 'Market day, proyek bisnis sederhana, literasi finansial, dan kreativitas produk untuk menumbuhkan mental wirausaha.',
      icon: Target,
      color: '#F59E0B',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      title: 'ICT',
      description: 'Literasi digital, keamanan digital, tools produktivitas, dan pengenalan coding/robotik sesuai jenjang.',
      icon: Zap,
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const news = [
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=75',
      title: 'SMAIT Juara Olimpiade Matematika Nasional 2024',
      date: '15 November 2024',
      category: 'Prestasi',
      excerpt: 'Tim olimpiade SMAIT Baituljannah berhasil meraih medali emas pada kompetisi Olimpiade Matematika tingkat nasional...',
      color: '#8B5CF6'
    },
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=75',
      title: 'Launching Program Tahfidz Intensif 2025',
      date: '10 November 2024',
      category: 'Program',
      excerpt: 'Yayasan Baituljannah meluncurkan program tahfidz intensif dengan target hafalan 30 juz untuk siswa berprestasi...',
      color: '#10B981'
    },
    {
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=75',
      title: 'Workshop Parenting untuk Orang Tua Siswa',
      date: '5 November 2024',
      category: 'Kegiatan',
      excerpt: 'Kegiatan workshop parenting Islami dengan tema "Mendidik Anak di Era Digital" dihadiri 200+ orang tua...',
      color: '#F97316'
    }
  ];

  const whyChooseUs = [
    {
      icon: Target,
      title: 'Visi yang Jelas',
      description: 'Membentuk generasi Qurani dengan target hafalan dan prestasi akademik yang terukur'
    },
    {
      icon: Users,
      title: 'Guru Berkualitas',
      description: 'Tim pendidik profesional, bersertifikat, dan berpengalaman di bidangnya'
    },
    {
      icon: Award,
      title: 'Prestasi Membanggakan',
      description: 'Ratusan prestasi lokal, nasional, dan internasional di berbagai bidang'
    },
    {
      icon: Heart,
      title: 'Lingkungan Islami',
      description: 'Suasana pembelajaran yang kondusif dengan nilai-nilai Islam yang kuat'
    },
    {
      icon: TrendingUp,
      title: 'Fasilitas Modern',
      description: 'Lab komputer, perpustakaan digital, dan sarana olahraga yang lengkap'
    },
    {
      icon: Globe,
      title: 'Kurikulum Global',
      description: 'Integrasi kurikulum nasional dengan standar internasional dan nilai Islam'
    }
  ];

  const universities = [
    { name: 'Universitas Lampung', file: 'UNILA.png' },
    { name: 'Universitas Airlangga', file: 'UNAIR.png' },
    { name: 'Universitas Padjadjaran', file: 'UNPAD.png' },
    { name: 'Universitas Brawijaya', file: 'UB.png' },
    { name: 'Universitas Sriwijaya', file: 'Logo_Universitas_Sriwijaya.svg.png' },
    { name: 'UIN Raden Intan', file: 'Logo-UIN-Raden-Intan.png' },
    { name: 'UIN Malang', file: 'UIN MALANG.webp' },
    { name: 'Institut Teknologi Sumatera', file: 'Logo_ITERA.png' },
    { name: 'Politeknik Negeri Lampung', file: 'Politeknik_Negeri_Lampung.png' },
    { name: 'Universitas Jenderal Soedirman', file: 'Logo-UNSOED.png' },
    { name: 'Universitas Syiah Kuala', file: 'unsyiah.png' },
    { name: 'Universitas Negeri Semarang', file: 'UNES.png' },
  ];

  const getUniversityLogoSrc = (file: string) => encodeURI(`/uploads/universitas/${file}`);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <section className="relative h-[400px] md:h-[600px] group">
        <div className="overflow-hidden h-full" ref={heroRef}>
          <div className="flex h-full">
            {heroSlides.map((slide, index) => (
              <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollHeroPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={scrollHeroNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5B4DB5 0%, #7C6FCC 100%)' }}>
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm mb-4 md:mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Jenjang Pendidikan</span>
            </div>
            <h2 className="text-white mb-3 md:mb-4">Jenjang Pendidikan</h2>
            <p className="text-white/90 text-base md:text-xl lg:text-2xl max-w-3xl mx-auto px-4">
              Lima unit pendidikan terintegrasi dari PAUD hingga SMA untuk perjalanan pendidikan yang berkesinambungan
            </p>
            <div className="w-16 md:w-24 h-1 bg-white/50 mx-auto mt-4 md:mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 md:mb-12">
            {[
              { n: 'PGIT - TKIT', i: '/uploads/logos/TK.webp', c: '#10B981', u: 'tkit' },
              { n: 'SDIT', i: '/uploads/logos/SD.webp', c: '#3B82F6', u: 'sdit' },
              { n: 'SMPIT', i: '/uploads/logos/SMP.webp', c: '#F97316', u: 'smpit' },
              { n: 'SMAIT', i: '/uploads/logos/SMA.webp', c: '#8B5CF6', u: 'smait' },
              { n: 'SLBIT', i: '/uploads/logos/SLB.webp', c: '#14B8A6', u: 'slbit' },
              { n: 'Asrama', i: '/uploads/logos/ASRAMA.webp', c: '#D4AF37', u: 'asrama' }
            ].map((u) => (
              <div key={u.n} className="flex flex-col items-center gap-4">
                <div
                  onClick={() => onNavigate(u.u)}
                  className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <Image src={u.i} alt={u.n} fill sizes="128px" className="object-contain drop-shadow-lg" unoptimized />
                </div>
                <div className="text-center">
                  <h3 className="text-white text-base md:text-lg mb-3">{u.n}</h3>
                  <button
                    onClick={() => onNavigate(u.u)}
                    className="px-6 py-2 rounded-full border-2 border-white text-white text-sm hover:bg-white hover:text-[#5B4DB5] transition-all duration-300 hover:scale-105"
                  >
                    Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 10%, rgba(255,255,255,0.12), transparent 45%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.10), transparent 40%), radial-gradient(circle at 50% 90%, rgba(255,255,255,0.08), transparent 55%)',
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Play className="w-4 h-4" />
              <span>Video Profil</span>
            </div>
            <h2 className="text-1xl md:text-3xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
              Mengenal Lebih Dekat Baituljannah Islamic School
            </h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-strong border border-white/10 max-w-5xl mx-auto aspect-[16/9] bg-black">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/EMSGkb_-ATI?si=9kmsTfulmlc3HOtA&autoplay=1&mute=1&playsinline=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4AB8]/10 rounded-full text-[#1E4AB8] text-sm mb-6">
              <Star className="w-4 h-4" />
              <span>Keunggulan Kami</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4">Mengapa Memilih Baituljannah?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pendidikan Islam terpadu dengan standar berkualitas tinggi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 h-full border border-gray-100 hover:border-[#1E4AB8]/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full text-sm mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Six Aspects of Curriculum</span>
            </div>
            <h2 className="mb-4">Six Aspects of Curriculum</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Enam aspek kurikulum untuk membentuk siswa yang unggul dalam iman, ilmu, keterampilan, dan teknologi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div 
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-3">{program.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{program.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('programs')}
              className="btn-primary inline-flex items-center gap-2 group"
            >
              <span>Lihat Semua Program</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <h2 className="text-3xl lg:text-4xl">Berita Dan Kegiatan Sekolah</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#1E4AB8] transition-colors"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              {news.length > 0 && (
                <div className="group cursor-pointer" onClick={() => onNavigate('news')}>
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                    <Image
                      src={news[0].image}
                      alt={news[0].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#1E4AB8] shadow-sm">
                        {news[0].category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#1E4AB8] transition-colors line-clamp-2">
                    {news[0].title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{news[0].date}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {news[0].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#1E4AB8] font-semibold group-hover:translate-x-2 transition-transform">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 space-y-6">
              {news.slice(1).map((item, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col sm:flex-row gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate('news')}
                >
                  <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="192px"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 group-hover:bg-[#1E4AB8] group-hover:text-white transition-colors">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#1E4AB8] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span>{item.date}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl mb-6 font-bold">Prestasi Siswa</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Bukti nyata keberhasilan pendidikan di Baituljannah melalui pencapaian gemilang para siswa
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={scrollAchievementPrev}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm items-center justify-center transition-colors"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={scrollAchievementNext}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm items-center justify-center transition-colors"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {achievements.map((achievement, index) => {
                  const scale = getAchievementScale(index);
                  const distance = getLoopDistance(index, selectedAchievementIndex, achievements.length);
                  const zIndex = 30 - distance;

                  return (
                    <div
                      key={index}
                      className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_20%] min-w-0 pl-4"
                      style={{ zIndex }}
                    >
                      <div
                        className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white/10 origin-center transition-transform duration-300"
                        style={{ transform: `scale(${scale})` }}
                      >
                        <ImageWithFallback
                          src={achievement.studentImage}
                          alt={achievement.studentName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('achievement')}
              className="bg-white text-[#1E4AB8] hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>Lihat Semua Prestasi</span>
              <Trophy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4AB8]/10 rounded-full text-[#1E4AB8] text-sm mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Universitas Unggulan</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4">Jejak Lulusan Kami</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Lulusan Baituljannah melanjutkan studi ke berbagai perguruan tinggi unggulan.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {universities.map((u) => (
              <div
                key={u.name}
                className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-100 hover:border-[#1E4AB8]/20"
              >
                <div className="h-16 md:h-20 flex items-center justify-center">
                  <ImageWithFallback
                    src={getUniversityLogoSrc(u.file)}
                    alt={u.name}
                    className="max-h-full w-auto object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 text-center text-xs md:text-sm text-gray-700 font-semibold">{u.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer 
        onNavigate={onNavigate} 
        siteName="Baitul Jannah"
        siteTagline="Islamic School"
      />
    </div>
  );
}
