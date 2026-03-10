
import { BookOpen, Users, Award, Globe, Heart, Star, Activity, Sparkles } from 'lucide-react';

export type UnitData = {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  color: string;
  heroImage: string;
  stats: {
    students: number;
    teachers: number;
    graduates: number;
  };
  programs: {
    title: string;
    description: string;
    icon: any;
  }[];
  facilities: string[];
  gallery: string[];
  headmaster: {
    name: string;
    image: string;
    message: string;
  };
};

export const units: Record<string, UnitData> = {
  tkit: {
    slug: 'tkit',
    name: 'TKIT',
    fullName: 'PGIT - TKIT Baitul Jannah',
    description: 'Membangun generasi cerdas, ceria, dan berakhlak mulia sejak dini dengan metode pembelajaran yang menyenangkan dan Islami.',
    icon: '/uploads/logos/TK.webp',
    color: '#FF6B6B',
    heroImage: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
    stats: {
      students: 150,
      teachers: 15,
      graduates: 1200,
    },
    programs: [
      {
        title: 'Sentra Bermain',
        description: 'Pembelajaran berbasis sentra yang merangsang kreativitas dan kemandirian anak.',
        icon: Sparkles,
      },
      {
        title: 'Tahfidz Cilik',
        description: 'Pengenalan dan hafalan surah-surah pendek dengan metode talqin yang menyenangkan.',
        icon: BookOpen,
      },
      {
        title: 'Bilingual Kids',
        description: 'Pengenalan Bahasa Inggris dan Arab dasar melalui lagu dan permainan.',
        icon: Globe,
      },
    ],
    facilities: ['Ruang Kelas AC', 'Playground Outdoor', 'Kolam Renang Anak', 'Perpustakaan Mini'],
    gallery: [
      '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
      '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
      '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
    ],
    headmaster: {
      name: 'Ustadzah Aminah, S.Pd.I',
      image: '/uploads/logos/TK.webp',
      message: 'Kami berkomitmen memberikan pendidikan terbaik di usia emas anak-anak Anda dengan landasan iman dan taqwa.',
    },
  },
  sdit: {
    slug: 'sdit',
    name: 'SDIT',
    fullName: 'SDIT Baitul Jannah',
    description: 'Sekolah Dasar Islam Terpadu yang mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Quran dan As-Sunnah.',
    icon: '/uploads/logos/SD.webp',
    color: '#4ECDC4',
    heroImage: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
    stats: {
      students: 850,
      teachers: 60,
      graduates: 5000,
    },
    programs: [
      {
        title: 'Tahfidz Al-Quran',
        description: 'Target hafalan minimal 3 Juz dengan bacaan yang tartil dan fasih.',
        icon: BookOpen,
      },
      {
        title: 'Science Club',
        description: 'Eksplorasi sains melalui percobaan sederhana dan menyenangkan.',
        icon: Activity,
      },
      {
        title: 'Character Building',
        description: 'Pembiasaan adab dan akhlak Islami dalam kehidupan sehari-hari.',
        icon: Heart,
      },
    ],
    facilities: ['Lab Komputer', 'Lab Sains', 'Perpustakaan Digital', 'Masjid Sekolah', 'Lapangan Olahraga'],
    gallery: [
      '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
      '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
      '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
    ],
    headmaster: {
      name: 'Ustadz Ahmad, M.Pd',
      image: '/uploads/logos/SD.webp',
      message: 'Mewujudkan generasi Qurani yang cerdas, mandiri, dan berprestasi adalah visi utama kami.',
    },
  },
  smpit: {
    slug: 'smpit',
    name: 'SMPIT',
    fullName: 'SMPIT Baitul Jannah',
    description: 'Mencetak remaja muslim yang tangguh, berprestasi, dan siap menghadapi tantangan global.',
    icon: '/uploads/logos/SMP.webp',
    color: '#45B7D1',
    heroImage: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
    stats: {
      students: 450,
      teachers: 35,
      graduates: 3000,
    },
    programs: [
      {
        title: 'Bina Pribadi Islam',
        description: 'Mentoring intensif untuk pembentukan kepribadian muslim yang kaffah.',
        icon: Users,
      },
      {
        title: 'Olimpiade Sains',
        description: 'Persiapan intensif untuk kompetisi sains tingkat nasional dan internasional.',
        icon: Award,
      },
      {
        title: 'Language Camp',
        description: 'Program intensif bahasa Arab dan Inggris untuk meningkatkan kemampuan komunikasi.',
        icon: Globe,
      },
    ],
    facilities: ['Lab Bahasa', 'Lab IPA', 'Ruang Multimedia', 'Studio Musik', 'Sport Center'],
    gallery: [
      '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
      '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
    ],
    headmaster: {
      name: 'Ustadz Budi, S.Si',
      image: '/uploads/logos/SMP.webp',
      message: 'Kami fokus pada pengembangan akademik dan karakter siswa agar siap menjadi pemimpin masa depan.',
    },
  },
  smait: {
    slug: 'smait',
    name: 'SMAIT',
    fullName: 'SMAIT Baitul Jannah',
    description: 'Menyiapkan pemimpin masa depan yang visioner, berwawasan luas, dan berkarakter Qurani.',
    icon: '/uploads/logos/SMA.webp',
    color: '#96CEB4',
    heroImage: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
    stats: {
      students: 300,
      teachers: 25,
      graduates: 1500,
    },
    programs: [
      {
        title: 'University Preparation',
        description: 'Bimbingan intensif masuk Perguruan Tinggi Negeri dan Luar Negeri.',
        icon: Star,
      },
      {
        title: 'Tahfidz 30 Juz',
        description: 'Program khusus bagi siswa yang ingin menyelesaikan hafalan Al-Quran 30 Juz.',
        icon: BookOpen,
      },
      {
        title: 'Leadership Training',
        description: 'Pelatihan kepemimpinan dan organisasi untuk membentuk karakter leader.',
        icon: Users,
      },
    ],
    facilities: ['Asrama Putra/Putri', 'Lab Biologi/Fisika/Kimia', 'Perpustakaan Lengkap', 'Aula Serbaguna'],
    gallery: [
      '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
      '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
    ],
    headmaster: {
      name: 'Ustadzah Siti, M.Pd',
      image: '/uploads/logos/SMA.webp',
      message: 'Kami mengantarkan siswa menuju gerbang kesuksesan dunia dan akhirat melalui pendidikan holistik.',
    },
  },
  slbit: {
    slug: 'slbit',
    name: 'SLBIT',
    fullName: 'SLBIT Baitul Jannah',
    description: 'Layanan pendidikan khusus yang ramah, inklusif, dan mengembangkan potensi istimewa setiap anak.',
    icon: '/uploads/logos/SLB.webp',
    color: '#D4A5A5',
    heroImage: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
    stats: {
      students: 50,
      teachers: 10,
      graduates: 200,
    },
    programs: [
      {
        title: 'Terapi Terpadu',
        description: 'Layanan terapi wicara, okupasi, dan fisioterapi sesuai kebutuhan siswa.',
        icon: Activity,
      },
      {
        title: 'Keterampilan Hidup',
        description: 'Pelatihan kemandirian dan keterampilan vokasional untuk masa depan.',
        icon: Star,
      },
      {
        title: 'Bakat & Minat',
        description: 'Pengembangan potensi seni dan olahraga bagi siswa berkebutuhan khusus.',
        icon: Award,
      },
    ],
    facilities: ['Ruang Terapi', 'Ruang Sensori Integrasi', 'Kebun Praktik', 'Dapur Latih'],
    gallery: [
      '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
      '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
      '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
    ],
    headmaster: {
      name: 'Ustadzah Rina, S.Psi',
      image: '/uploads/logos/SLB.webp',
      message: 'Setiap anak adalah istimewa. Kami hadir untuk membantu mereka menemukan dan mengembangkan potensinya.',
    },
  },
  asrama: {
    slug: 'asrama',
    name: 'Asrama',
    fullName: 'Boarding School Baitul Jannah',
    description: 'Lingkungan hunian Islami yang kondusif untuk membentuk kemandirian, kedisiplinan, dan ukhuwah Islamiyah.',
    icon: '/uploads/logos/Asrama.webp',
    color: '#8D6E63',
    heroImage: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
    stats: {
      students: 200,
      teachers: 10,
      graduates: 500,
    },
    programs: [
      {
        title: 'Tahsin & Tahfidz Malam',
        description: 'Bimbingan membaca dan menghafal Al-Quran setiap selesai sholat Maghrib dan Subuh.',
        icon: BookOpen,
      },
      {
        title: 'Kajian Kitab Kuning',
        description: 'Pengajian kitab-kitab dasar fiqih, aqidah, dan akhlak.',
        icon: BookOpen,
      },
      {
        title: 'Leadership Camp',
        description: 'Pelatihan kepemimpinan dan kemandirian santri.',
        icon: Users,
      },
    ],
    facilities: ['Kamar Tidur Nyaman', 'Ruang Belajar', 'Masjid Asrama', 'Lapangan Olahraga', 'Kantin Sehat'],
    gallery: [
      '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
      '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
    ],
    headmaster: {
      name: 'Ustadz Hasan, Lc',
      image: '/uploads/logos/Asrama.webp',
      message: 'Asrama bukan sekadar tempat tinggal, tapi kawah candradimuka pembentukan karakter.',
    },
  },
};
