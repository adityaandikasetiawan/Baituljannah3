'use client';

import React from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { UnitHeroCarousel } from './UnitHeroCarousel';
import { UnitProfileCarousel } from './UnitProfileCarousel';
import { ProgramCard } from '../../program/components/ProgramCard';
import { NewsCard } from '../../news/components/NewsCard';
import { BookOpen, Users, Award, Calendar, MapPin, Phone, Mail, GraduationCap, Clock, DollarSign, Target, TrendingUp, Star, Trophy, CheckCircle, Building, Microscope, Library, Heart } from 'lucide-react';
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

      {/* Six Aspects Curriculum Section - SMP */}
      {isSMP && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm mb-6" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                <BookOpen className="w-4 h-4" />
                <span>Six Aspects of Curriculum</span>
              </div>
              <h2 className="mb-4">Six Aspects of Curriculum</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Enam aspek kurikulum untuk membentuk siswa yang unggul dalam iman, ilmu, keterampilan, dan teknologi
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Islamic Studies', description: 'Akidah, ibadah, akhlak, Al-Qur’an, hadis, fiqih, dan pembiasaan harian untuk membentuk karakter Islami.', icon: Heart, gradient: 'from-green-500 to-emerald-500' },
                { title: 'Academic Excellence', description: 'Penguatan literasi-numerasi, pembelajaran tuntas, dan pembinaan prestasi melalui penilaian yang terukur.', icon: Award, gradient: 'from-orange-500 to-amber-500' },
                { title: 'Project Based Learning', description: 'Proyek lintas mata pelajaran yang melatih riset, kreativitas, problem solving, dan presentasi karya.', icon: Target, gradient: 'from-indigo-500 to-blue-500' },
                { title: 'Interpersonal Skill', description: 'Komunikasi efektif, teamwork, kepemimpinan, empati, dan etika melalui pembiasaan dan aktivitas terarah.', icon: Users, gradient: 'from-purple-500 to-indigo-500' },
                { title: 'Entrepreneur', description: 'Market day, proyek bisnis sederhana, literasi finansial, dan kreativitas produk untuk menumbuhkan mental wirausaha.', icon: TrendingUp, gradient: 'from-amber-500 to-yellow-500' },
                { title: 'ICT', description: 'Literasi digital, keamanan digital, tools produktivitas, dan pengenalan coding/robotik sesuai jenjang.', icon: Star, gradient: 'from-blue-500 to-cyan-500' },
              ].map((program, index) => {
                const Icon = program.icon;
                return (
                  <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
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
          </div>
        </section>
      )}

      {/* Kurikulum Section - non-SMP units */}
      {!isSMP && (
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
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-soft">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: accentColor }}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-4">{isAsrama ? 'Program Harian' : 'Kurikulum Nasional'}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} /><span className="text-gray-700">Kurikulum Merdeka yang adaptif dan inovatif</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} /><span className="text-gray-700">Pembelajaran berbasis project dan problem solving</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} /><span className="text-gray-700">STEAM (Science, Technology, Engineering, Arts, Math)</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} /><span className="text-gray-700">Bahasa Indonesia, Inggris, dan Arab</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-soft">
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-4">{isAsrama ? 'Target Asrama' : 'Kurikulum Islam'}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" /><span className="text-gray-700">Tahfidz Al-Qur\'an dengan target hafalan bertahap</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" /><span className="text-gray-700">Aqidah, Fiqih, dan Akhlak dalam kehidupan sehari-hari</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" /><span className="text-gray-700">Hadits dan Sirah Nabawiyah</span></li>
                  <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 mt-1 text-green-600 flex-shrink-0" /><span className="text-gray-700">Praktik ibadah dan pembiasaan adab Islami</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* Achievement Banner - SMP */}
      {isSMP && (
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
          <div className="container-custom relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6" style={{ backgroundColor: `${accentColor}30` }}>
                <Trophy className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-white text-sm">Prestasi Siswa</span>
              </div>
              <h2 className="text-4xl lg:text-5xl mb-6 font-bold text-white">Murid Berprestasi</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Bukti nyata keberhasilan pendidikan di SMPIT Baituljannah melalui pencapaian gemilang para siswa
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: 'M. Husein Haekal', achievement: 'Juara 1 Cerdas Cermat', competition: 'SAHABAYA CUP 2025', image: '/uploads/achievement/achievement_1769996411538_dig650xbr3b.webp', color: '#1E4AB8' },
                { name: 'Zalika Tsabita Az-Zahra', achievement: 'Juara 3 Pencak Silat', competition: 'SAHABAYA CUP 2025', image: '/uploads/achievement/achievement_1770259138348_pcj36zz54xh.webp', color: '#F97316' },
                { name: 'Dhoffa Adzellia Khaerani', achievement: 'Juara 2 Pidato B. Inggris', competition: 'SAHABAYA CUP 2025', image: '/uploads/achievement/achievement_1770259163513_vakbjibn58j.webp', color: '#10B981' },
                { name: 'Ahmad Fadhil Rahman', achievement: 'Juara 1 Matematika', competition: 'Kompetisi Sains Nasional 2025', image: '/uploads/achievement/achievement_1770259176223_998ib4a3t76.webp', color: '#8B5CF6' },
              ].map((student, index) => (
                <div key={index} className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-white/10">
                  <ImageWithFallback
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="inline-block px-2 py-1 rounded-full text-xs font-bold text-white mb-2" style={{ backgroundColor: student.color }}>
                      {student.achievement}
                    </div>
                    <h4 className="text-white font-semibold text-sm">{student.name}</h4>
                    <p className="text-white/70 text-xs">{student.competition}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => onNavigate('achievement')}
                className="bg-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center gap-2 hover:bg-gray-100"
                style={{ color: accentColor }}
              >
                <span>Lihat Semua Prestasi</span>
                <Trophy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer
        logo={unitLogo}
        siteName={fullName}
        accentColor={accentColor}
        onNavigate={onNavigate}
      />
    </div>
  );
};
