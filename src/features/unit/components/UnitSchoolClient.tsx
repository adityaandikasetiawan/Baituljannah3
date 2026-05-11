'use client';

import React from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { UnitHeroCarousel } from './UnitHeroCarousel';
import { UnitProfileCarousel } from './UnitProfileCarousel';
import { ProgramCard } from '../../program/components/ProgramCard';
import { NewsCard } from '../../news/components/NewsCard';
import { BookOpen, Users, Award, Calendar, MapPin, Phone, Mail, GraduationCap, Clock, DollarSign, Target, TrendingUp, Star, Trophy, CheckCircle, Building, Microscope, Library } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';

interface UnitSchoolClientProps {
  unitName: string;
  fullName: string;
  accentColor: string;
  icon: string;
  description: string;
  unitSlug?: string;
}

export const UnitSchoolClient: React.FC<UnitSchoolClientProps> = ({
  unitName,
  fullName,
  accentColor,
  icon,
  description,
  unitSlug,
}) => {
  const { onNavigate } = useNavigationMenu();
  const slug = (unitSlug || unitName || '').toString().trim().toLowerCase();
  const apiBaseUrl = React.useMemo(() => {
    const base = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '');
    if (typeof window === 'undefined') return base;
    const hostname = window.location.hostname.toLowerCase();
    if (hostname === 'smaitbaituljannah.sch.id' || hostname === 'www.smaitbaituljannah.sch.id') {
      return 'https://baituljannah.sch.id/api/v1';
    }
    return base;
  }, []);
  const [homeCmsContent, setHomeCmsContent] = React.useState<any | null>(null);
  const unitLogo = (() => {
    const input = icon?.trim();
    if (!input) return undefined;
    if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('data:') || input.startsWith('/')) return input;
    if (/\.(png|jpe?g|webp|gif|svg)$/i.test(input)) return input;
    if (/\.(png|jpe?g|webp|gif|svg)$/i.test(input)) return input;
    return undefined;
  })();

  const isAsrama = slug === 'asrama';
  const isSMP = slug === 'smpit';
  const isSMA = slug === 'smait';

  React.useEffect(() => {
    const unitCode = String(slug || '').trim().toUpperCase();
    if (!unitCode || unitCode === 'ASRAMA') {
      setHomeCmsContent(null);
      return;
    }
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/unit-pages?unit_code=${encodeURIComponent(unitCode)}&page_key=home`, { signal: controller.signal })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat CMS Home');
        setHomeCmsContent(json?.data?.content || null);
      })
      .catch(() => setHomeCmsContent(null));
    return () => controller.abort();
  }, [apiBaseUrl, slug]);

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    {
      label: 'Profil',
      href: '#',
      onClick: () => onNavigate(`${slug}/profil`)
    },
    { label: isAsrama ? 'Program' : 'Kurikulum', href: '#', onClick: () => onNavigate(`${slug}/kurikulum`) },
    { label: isAsrama ? 'Musyrif & Musyrifah' : 'Guru & Staff', href: '#', onClick: () => onNavigate(`${slug}/guru-staff`) },
    {
      label: 'Info',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => onNavigate(`${slug}/berita`) },
        { label: 'Galeri', href: '#', onClick: () => onNavigate(`${slug}/galeri`) },
      ],
    },
    { label: 'Karir', href: '#', onClick: () => onNavigate('career') },
    { label: 'PPDB', href: '#', onClick: () => onNavigate('admission') },
    { label: 'Kontak', href: '#', onClick: () => onNavigate(`${slug}/kontak`) }
  ];

  const getPrograms = () => {
    if (isAsrama) {
      return [
        {
          title: 'Tahfidz Intensif',
          description: 'Program hafalan Al-Qur\'an intensif dengan target hafalan yang terukur.',
          icon: BookOpen,
          color: accentColor
        },
        {
          title: 'Kemandirian',
          description: 'Melatih santri untuk mandiri dalam mengurus diri sendiri dan disiplin waktu.',
          icon: Target,
          color: accentColor
        },
        {
          title: 'Kajian Kitab',
          description: 'Pembelajaran kitab kuning dan tsaqofah Islamiyah secara rutin.',
          icon: Library,
          color: accentColor
        }
      ];
    }

    if (isSMP) {
      return [
        {
          title: 'Tahfidz Reguler',
          description: 'Program menghafal Al-Qur\'an 2 juz per tahun dengan bacaan tartil.',
          icon: BookOpen,
          color: accentColor
        },
        {
          title: 'Bina Pribadi Islam',
          description: 'Pembinaan karakter intensif melalui mentoring kelompok kecil (Halaqah).',
          icon: Users,
          color: accentColor
        },
        {
          title: 'Science & Language Club',
          description: 'Pengembangan minat bakat sains dan bahasa (Arab & Inggris).',
          icon: Microscope,
          color: accentColor
        }
      ];
    }

    if (isSMA) {
      return [
        {
          title: 'Sukses PTN & Kedinasan',
          description: 'Bimbingan intensif persiapan masuk Perguruan Tinggi Negeri dan Sekolah Kedinasan.',
          icon: GraduationCap,
          color: accentColor
        },
        {
          title: 'Tahfidz & Dirosah',
          description: 'Pendalaman ilmu agama dan hafalan Al-Qur\'an bersanad.',
          icon: BookOpen,
          color: accentColor
        },
        {
          title: 'Research & Innovation',
          description: 'Program penelitian ilmiah remaja untuk melatih berpikir kritis dan inovatif.',
          icon: Microscope,
          color: accentColor
        }
      ];
    }

    // Default (TK, SD, SLB)
    return [
      {
        title: 'Tahfidz Al-Qur\'an',
        description: 'Program menghafal Al-Qur\'an dengan metode yang mudah dan menyenangkan.',
        icon: BookOpen,
        color: accentColor
      },
      {
        title: 'Character Building',
        description: 'Pembentukan karakter Islami melalui pembiasaan akhlak mulia setiap hari.',
        icon: Users,
        color: accentColor
      },
      {
        title: 'Prestasi Akademik',
        description: 'Pembelajaran berkualitas untuk meraih prestasi akademik terbaik.',
        icon: Award,
        color: accentColor
      }
    ];
  };

  const programs = getPrograms();

  const getTeachers = () => {
    if (isAsrama) {
      return [
        {
          name: 'Ustadz Ahmad Fauzi, S.Pd.I',
          role: 'Mudir Asrama',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadzah Siti Aisyah, S.Pd',
          role: 'Musyrifah',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadz Muhammad Rizki, M.Pd',
          role: 'Musyrif',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadzah Fatimah Az-Zahra, S.S',
          role: 'Musyrifah',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ];
    }

    if (isSMP) {
      return [
        {
          name: 'Ustadz Ahmad Fauzi, S.Pd.I',
          role: 'Kepala Sekolah SMPIT',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadzah Siti Aisyah, S.Pd',
          role: 'Waka Kurikulum',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadz Muhammad Rizki, M.Pd',
          role: 'Koordinator Tahfidz',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadzah Fatimah Az-Zahra, S.S',
          role: 'Guru Bahasa Arab',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ];
    }

    if (isSMA) {
      return [
        {
          name: 'Ustadz Ahmad Fauzi, S.Pd.I',
          role: 'Kepala Sekolah SMAIT',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadzah Siti Aisyah, S.Pd',
          role: 'Waka Kesiswaan',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadz Muhammad Rizki, M.Pd',
          role: 'Koordinator Riset & IT',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        },
        {
          name: 'Ustadzah Fatimah Az-Zahra, S.S',
          role: 'Konselor Pendidikan',
          image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
        }
      ];
    }

    // Default
    return [
      {
        name: 'Ustadz Ahmad Fauzi, S.Pd.I',
        role: 'Kepala Sekolah',
        image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Ustadzah Siti Aisyah, S.Pd',
        role: 'Guru Tahfidz',
        image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Ustadz Muhammad Rizki, M.Pd',
        role: 'Guru Matematika',
        image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        name: 'Ustadzah Fatimah Az-Zahra, S.S',
        role: 'Guru Bahasa Arab',
        image: 'https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwdGVhY2hpbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NjQyMjMxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ];
  };

  const teachers = getTeachers();

  const getProfileImages = () => {
    if (isAsrama) {
      return [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1080&h=1080&fit=crop', // Dorm room / Living area
        'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1080&h=1080&fit=crop', // Dining / Community
        'https://images.unsplash.com/photo-1542810634-71277d95dc24?w=1080&h=1080&fit=crop', // Prayer / Quran
      ];
    }
    if (isSMP) {
      return [
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1080&h=1080&fit=crop', // Classroom/Activity
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1080&h=1080&fit=crop', // Science/Lab
        'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1080&h=1080&fit=crop', // Sports/Activity
      ];
    }
    if (isSMA) {
      return [
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1080&h=1080&fit=crop', // Study Group
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1080&h=1080&fit=crop', // Innovation/Tech
        'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1080&h=1080&fit=crop', // Presentation/Leadership
      ];
    }
    // Default
    return [
      'https://images.unsplash.com/photo-1654366698665-e6d611a9aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNsYXNzcm9vbSUyMHN0dWR5aW5nfGVufDF8fHx8MTc2NDMxNzE0OHww&ixlib=rb-4.1.0&q=80&w=1080'
    ];
  };

  const profileImages = getProfileImages();
  const homeContent = homeCmsContent && typeof homeCmsContent === 'object' ? homeCmsContent : {};

  const about = {
    badge: String(homeContent?.about?.badge || 'Tentang Kami'),
    title: String(homeContent?.about?.title || `Profil ${unitName}`),
    description:
      String(homeContent?.about?.description || '').trim() ||
      `${fullName} adalah lembaga pendidikan Islam terpadu yang berkomitmen untuk memberikan pendidikan berkualitas dengan mengintegrasikan kurikulum nasional dan nilai-nilai Islam. Kami fokus pada pengembangan kognitif, afektif, dan psikomotorik siswa secara seimbang.`,
    features: [
      {
        title: String(homeContent?.about?.features?.[0]?.title || 'Kurikulum Terintegrasi'),
        description:
          String(homeContent?.about?.features?.[0]?.description || '').trim() ||
          'Menggabungkan kurikulum nasional dengan pendidikan agama Islam yang komprehensif',
        icon: BookOpen,
      },
      {
        title: String(homeContent?.about?.features?.[1]?.title || 'Tenaga Pendidik Profesional'),
        description:
          String(homeContent?.about?.features?.[1]?.description || '').trim() ||
          'Guru-guru berkualifikasi dan berpengalaman dalam pendidikan Islam terpadu',
        icon: Users,
      },
      {
        title: String(homeContent?.about?.features?.[2]?.title || 'Fasilitas Lengkap'),
        description:
          String(homeContent?.about?.features?.[2]?.description || '').trim() ||
          'Gedung modern, laboratorium, perpustakaan, dan fasilitas pendukung lainnya',
        icon: Award,
      },
    ],
  };

  const sectionPrograms = {
    badge: String(homeContent?.programs?.badge || 'Program Unggulan'),
    title: String(homeContent?.programs?.title || 'Program Unggulan Kami'),
    description:
      String(homeContent?.programs?.description || '').trim() ||
      'Program-program dirancang khusus untuk mengembangkan potensi siswa secara maksimal',
    items: Array.isArray(homeContent?.programs?.items)
      ? programs.map((base, index) => ({
          ...base,
          title: String(homeContent?.programs?.items?.[index]?.title || base.title),
          description: String(homeContent?.programs?.items?.[index]?.description || base.description),
        }))
      : programs,
  };

  const facilitiesSection = {
    badge: String(homeContent?.facilities?.badge || 'Fasilitas'),
    title: String(homeContent?.facilities?.title || 'Fasilitas Lengkap & Modern'),
    description:
      String(homeContent?.facilities?.description || '').trim() ||
      'Didukung fasilitas terbaik untuk mendukung proses belajar mengajar',
  };

  const facilitiesItems = [
    {
      title: String(homeContent?.facilities?.items?.[0]?.title || 'Ruang Kelas'),
      description:
        String(homeContent?.facilities?.items?.[0]?.description || '').trim() ||
        'Ruang kelas ber-AC dengan kapasitas 25-30 siswa, dilengkapi smart TV dan sound system',
      image: String(homeContent?.facilities?.items?.[0]?.image || 'https://images.unsplash.com/photo-1558443957-d056622df610'),
      icon: Building,
      iconBg: accentColor,
    },
    {
      title: String(homeContent?.facilities?.items?.[1]?.title || 'Perpustakaan'),
      description:
        String(homeContent?.facilities?.items?.[1]?.description || '').trim() ||
        'Koleksi 5000+ buku, ruang baca nyaman, dan sistem peminjaman digital',
      image: String(homeContent?.facilities?.items?.[1]?.image || 'https://images.unsplash.com/photo-1595315343110-9b445a960442'),
      icon: Library,
      iconBg: '#2563eb',
    },
    {
      title: String(homeContent?.facilities?.items?.[2]?.title || 'Laboratorium'),
      description:
        String(homeContent?.facilities?.items?.[2]?.description || '').trim() ||
        'Lab Komputer, Sains, dan Bahasa dengan peralatan modern dan lengkap',
      image: String(homeContent?.facilities?.items?.[2]?.image || 'https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac'),
      icon: Microscope,
      iconBg: '#9333ea',
    },
    {
      title: String(homeContent?.facilities?.items?.[3]?.title || 'Lapangan'),
      description:
        String(homeContent?.facilities?.items?.[3]?.description || '').trim() ||
        'Lapangan olahraga multifungsi untuk futsal, basket, voli, dan badminton',
      image: String(homeContent?.facilities?.items?.[3]?.image || 'https://images.unsplash.com/photo-1649182462992-ea644b7f8155'),
      icon: Trophy,
      iconBg: '#16a34a',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar
        logo={unitLogo}
        siteName={fullName}
        accentColor={accentColor}
        menuItems={menuItems}
      />

      {/* Back to Portal */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-4">
          <button 
            onClick={() => onNavigate('main')}
            className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"
          >
            <span>←</span> Kembali ke Portal Utama
          </button>
        </div>
      </div>

      {/* Hero Carousel */}
      <UnitHeroCarousel
        unitName={unitName}
        fullName={fullName}
        accentColor={accentColor}
        icon={icon}
        slug={slug}
        onCtaClick={() => onNavigate('admission')}
        cmsSlides={Array.isArray(homeContent?.heroSlides) ? homeContent.heroSlides : []}
      />

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <UnitProfileCarousel 
              images={profileImages}
              unitName={unitName}
              accentColor={accentColor}
            />

            <div>
              <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                {about.badge}
              </div>
              <h2 className="mb-4">{about.title}</h2>
              <p className="text-gray-600 mb-6">{about.description}</p>

              <div className="space-y-4 mb-8">
                {about.features.map((f, idx) => (
                  <div key={`${f.title}-${idx}`} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
                      {React.createElement(f.icon, { className: 'w-4 h-4 text-white' })}
                    </div>
                    <div>
                      <h5 className="mb-1">{f.title}</h5>
                      <p className="text-gray-600 text-sm">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {sectionPrograms.badge}
            </div>
            <h2 className="mb-4">{sectionPrograms.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{sectionPrograms.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {sectionPrograms.items.map((program, index) => (
              <ProgramCard key={index} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Kurikulum Section - NEW */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {isAsrama ? 'Kegiatan' : 'Kurikulum'}
            </div>
            <h2 className="mb-4">{isAsrama ? 'Program & Kegiatan' : 'Kurikulum Terintegrasi'}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isAsrama 
                ? 'Membangun kemandirian dan kedekatan dengan Al-Qur\'an melalui rutinitas harian' 
                : 'Kombinasi sempurna antara kurikulum nasional dan nilai-nilai Islam'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Kurikulum Nasional / Program Harian */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-soft">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: accentColor }}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">{isAsrama ? 'Program Harian' : 'Kurikulum Nasional'}</h3>
              <ul className="space-y-3">
                {isAsrama ? (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Shalat berjamaah 5 waktu di masjid</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Murojaah dan Ziyadah hafalan Al-Qur'an</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Puasa Sunnah Senin & Kamis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Belajar mandiri malam hari (Study Club)</span>
                    </li>
                  </>
                ) : isSMP ? (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Kurikulum Merdeka dengan Penguatan Karakter</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Pembelajaran Bilingual (Arab & Inggris)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Proyek Penguatan Profil Pelajar Pancasila (P5)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Literasi Digital & Coding Dasar</span>
                    </li>
                  </>
                ) : isSMA ? (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Kurikulum Merdeka dengan Sistem SKS</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Persiapan Intensif UTBK & Kedinasan</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Research & Scientific Writing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Leadership & Entrepreneurship Program</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Kurikulum Merdeka yang adaptif dan inovatif</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Pembelajaran berbasis project dan problem solving</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">STEAM (Science, Technology, Engineering, Arts, Math)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                      <span className="text-gray-700">Bahasa Indonesia, Inggris, dan Arab</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Kurikulum Islam / Target Asrama */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-soft">
              <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl mb-4">{isAsrama ? 'Target Asrama' : 'Kurikulum Islam'}</h3>
              <ul className="space-y-3">
                {isAsrama ? (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Hafal minimal 5 Juz (untuk program Tahfidz)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Mampu berbahasa Arab dan Inggris aktif</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Memiliki kemandirian dan kepemimpinan (Leadership)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Berakhlak mulia dan beradab Islami</span>
                    </li>
                  </>
                ) : isSMP ? (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Target Hafalan Minimal 3 Juz (Juz 28, 29, 30)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Tahsin Al-Qur'an Bersertifikat (Metode Utsmani)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Pembelajaran Fiqih Ibadah & Hadits Arba'in</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Program Mentoring & Bina Pribadi Islam</span>
                    </li>
                  </>
                ) : isSMA ? (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Program Tahfidz Lanjutan & Mutqin</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Kajian Tsaqofah Islamiyah & Kitab Kuning Dasar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Pelatihan Khutbah & Public Speaking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Praktik Pengurusan Jenazah & Imam Shalat</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Tahfidz Al-Qur'an dengan target hafalan bertahap</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Aqidah, Fiqih, dan Akhlak dalam kehidupan sehari-hari</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Hadits dan Sirah Nabawiyah</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">Praktik ibadah dan pembiasaan adab Islami</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Jadwal Pembelajaran / Kegiatan */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong">
            <h3 className="text-2xl mb-8 text-center">{isAsrama ? 'Jadwal Kegiatan Asrama' : 'Jadwal Pembelajaran'}</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" style={{ color: accentColor }} />
                  <h4 className="text-lg">{isAsrama ? 'Jadwal Harian' : 'Waktu Belajar'}</h4>
                </div>
                <div className="space-y-3 text-gray-600">
                  {isAsrama ? (
                    <>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Bangun & Qiyamul Lail</span>
                        <span className="font-medium">03:30 - 04:30 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Shalat Subuh & Dzikir</span>
                        <span className="font-medium">04:30 - 05:30 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Sekolah Formal</span>
                        <span className="font-medium">07:00 - 15:00 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Kegiatan Asrama Sore-Malam</span>
                        <span className="font-medium">15:30 - 21:30 WIB</span>
                      </div>
                    </>
                  ) : isSMP || isSMA ? (
                    <>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Senin - Kamis (Full Day)</span>
                        <span className="font-medium">07:00 - 16:00 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Jumat</span>
                        <span className="font-medium">07:00 - 15:00 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Sabtu</span>
                        <span className="font-medium">Ekskul Pilihan / Libur</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Senin - Kamis</span>
                        <span className="font-medium">07:00 - 14:00 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Jumat</span>
                        <span className="font-medium">07:00 - 11:00 WIB</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span>Sabtu</span>
                        <span className="font-medium">Ekstrakurikuler</span>
                      </div>
                    </>
                  )}
              </div>
            </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6" style={{ color: accentColor }} />
                  <h4 className="text-lg">Fokus Pembelajaran</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">Character & Leadership Building</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">Critical Thinking & Problem Solving</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                    <span className="text-gray-700">Collaboration & Communication</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section - NEW */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
              {facilitiesSection.badge}
            </div>
            <h2 className="mb-4">{facilitiesSection.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{facilitiesSection.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilitiesItems.map((item, index) => (
              <div key={`${item.title}-${index}`} className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: item.iconBg }}>
                      {React.createElement(item.icon, { className: 'w-5 h-5 text-white' })}
                    </div>
                    <h4 className="text-white text-lg">{item.title}</h4>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer
        logo={unitLogo}
        siteName={fullName}
        accentColor={accentColor}
        onNavigate={onNavigate}
      />
    </div>
  );
};
