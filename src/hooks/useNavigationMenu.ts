
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, BookOpen, Users, FileText, Calendar, Settings, 
  DollarSign, ClipboardCheck, Award, MessageCircle, Home, 
  Info, Grid, Phone, Briefcase, GraduationCap, Zap 
} from 'lucide-react';

export type UserRole = 'public' | 'student' | 'parent' | 'teacher' | 'admin';

type NavigationSubmenuItem = {
  label: string;
  labelEn?: string;
  icon?: any;
  href: string;
  onClick?: () => void;
};

type NavigationMenuItem = {
  label: string;
  labelEn?: string;
  icon: any;
  href: string;
  onClick?: () => void;
  submenu?: NavigationSubmenuItem[];
};

export const useNavigationMenu = (role: UserRole = 'public') => {
  const router = useRouter();
  const portalOrigin = 'https://baituljannah.sch.id';
  const hostname = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
  const unitSubdomainToSlug: Record<string, string> = {
    'smpitbaituljannah.sch.id': 'smpit',
    'www.smpitbaituljannah.sch.id': 'smpit',
    'smaitbaituljannah.sch.id': 'smait',
    'www.smaitbaituljannah.sch.id': 'smait',
  };
  const unitSlugFromHost = unitSubdomainToSlug[hostname];
  const unitSlugFromPath = typeof window !== 'undefined'
    ? (window.location.pathname || '').match(/^\/(tkit|sdit|smpit|smait|slbit)(\/|$)/i)?.[1]?.toLowerCase()
    : undefined;
  const unitSlug = unitSlugFromHost || unitSlugFromPath;
  const isUnitSubdomain = Boolean(unitSlugFromHost);
  const unitSlugs = ['tkit', 'sdit', 'smpit', 'smait', 'slbit'];

  const onNavigate = (page: string) => {
    const normalized = String(page || '').trim();
    if (unitSlug) {
      if (normalized === 'main') {
        window.location.href = `${portalOrigin}/`;
        return;
      }

      if (normalized === unitSlug) {
        router.push(isUnitSubdomain ? '/' : `/${unitSlug}`);
        return;
      }

      if (normalized.startsWith(`${unitSlug}/`)) {
        router.push(isUnitSubdomain ? `/${normalized.slice(`${unitSlug}/`.length)}` : `/${normalized}`);
        return;
      }

      if (unitSlugs.includes(normalized) && normalized !== unitSlug) {
        window.location.href = `${portalOrigin}/${normalized}`;
        return;
      }
    }

    const routes: Record<string, string> = {
      'main': '/',
      'about': '/about',
      'vision-mission': '/vision-mission',
      'programs': '/programs',
      'facilities': '/facilities',
      'tkit': '/tkit',
      'sdit': '/sdit',
      'smpit': '/smpit',
      'smait': '/smait',
      'slbit': '/slbit',
      'news': '/news',
      'gallery': '/gallery',
      'achievement': '/achievement',
      'career': '/career',
      'admission': '/admission',
      'contact': '/contact',
      // Portal routes
      'student-dashboard': '/student/dashboard',
      'student-academic': '/student/academic',
      'student-profile': '/student/profile',
      'student-extracurricular': '/student/extracurricular',
      'student-counseling': '/student/counseling',
      'student-messages': '/student/messages',
      'parent-dashboard': '/parent/dashboard',
      'parent-finance': '/parent/finance',
      'teacher-dashboard': '/teacher/dashboard',
      'teacher-schedule': '/teacher/schedule',
      'teacher-grades': '/teacher/grades',
      'teacher-attendance': '/teacher/attendance',
      'teacher-messages': '/teacher/messages',
      'teacher-profile': '/teacher/profile',
      'admin-dashboard': '/admin/dashboard',
      'admin-news': '/admin/news',
      'admin-gallery': '/admin/gallery',
      'admin-achievement': '/admin/achievement',
      'admin-programs': '/admin/programs',
      'admin-cms': '/admin/cms',
      'admin-career': '/admin/career',
      'admin-finance': '/admin/finance',
      'admin-attendance': '/admin/attendance',
      'admin-ppdb': '/admin/ppdb',
      'admin-users': '/admin/users',
      'admin-units': '/admin/units',
    };
    
    const route = routes[page] || `/${page}`;
    if (unitSlug && !isUnitSubdomain && (route.startsWith('/admin') || route.startsWith('/teacher') || route.startsWith('/student') || route.startsWith('/parent'))) {
      router.push(`/${unitSlug}${route}`);
      return;
    }
    router.push(route);
  };

  const publicMenu: NavigationMenuItem[] = [
    { 
      label: 'Beranda', 
      labelEn: 'Home',
      icon: Home,
      href: '#', 
      onClick: () => onNavigate('main') 
    },
    {
      label: 'Tentang',
      labelEn: 'About',
      icon: Info,
      href: '#',
      submenu: [
        { label: 'Profil Yayasan', labelEn: 'Foundation Profile', href: '#', onClick: () => onNavigate('about') },
        { label: 'Visi dan Misi', labelEn: 'Vision & Mission', href: '#', onClick: () => onNavigate('vision-mission') },
        { label: 'Kurikulum', labelEn: 'Curriculum', href: '#', onClick: () => onNavigate('programs') },
        { label: 'Fasilitas', labelEn: 'Facilities', href: '#', onClick: () => onNavigate('facilities') },
      ]
    },
    {
      label: 'Unit Pendidikan',
      labelEn: 'Education Units',
      icon: Grid,
      href: '#',
      submenu: [
        { label: 'TKIT', labelEn: 'TKIT', icon: '/uploads/logos/TK.webp', href: '#', onClick: () => onNavigate('tkit') },
        { label: 'SDIT', labelEn: 'SDIT', icon: '/uploads/logos/SD.webp', href: '#', onClick: () => onNavigate('sdit') },
        { label: 'SMPIT', labelEn: 'SMPIT', icon: '/uploads/logos/SMP.webp', href: '#', onClick: () => onNavigate('smpit') },
        { label: 'SMAIT', labelEn: 'SMAIT', icon: '/uploads/logos/SMA.webp', href: '#', onClick: () => onNavigate('smait') },
        { label: 'SLBIT', labelEn: 'SLBIT', icon: '/uploads/logos/SLB.webp', href: '#', onClick: () => onNavigate('slbit') }
      ]
    },
    {
      label: 'Informasi',
      labelEn: 'Information',
      icon: FileText,
      href: '#',
      submenu: [
        { label: 'Berita', labelEn: 'News', href: '#', onClick: () => onNavigate('news') },
        { label: 'Galeri Foto', labelEn: 'Photo Gallery', href: '#', onClick: () => onNavigate('gallery') },
        { label: 'Prestasi', labelEn: 'Achievements', href: '#', onClick: () => onNavigate('achievement') },
        { label: 'Program', labelEn: 'Programs', href: '#', onClick: () => onNavigate('programs') }
      ]
    },
    {
      label: 'Karir',
      labelEn: 'Career',
      icon: Briefcase,
      href: '#',
      onClick: () => onNavigate('career')
    },
    {
      label: 'SPMB',
      labelEn: 'Admission',
      icon: GraduationCap,
      href: '#',
      submenu: [
        { label: 'Pendaftaran', labelEn: 'Registration', href: '#', onClick: () => onNavigate('admission') },
        { label: 'Jadwal & Alur', labelEn: 'Schedule & Flow', href: '#', onClick: () => onNavigate('admission') },
      ]
    },
    { 
      label: 'Kontak', 
      labelEn: 'Contact',
      icon: Phone,
      href: '#', 
      onClick: () => onNavigate('contact') 
    }
  ];

  const studentMenu: NavigationMenuItem[] = [
    { label: 'Dashboard', icon: TrendingUp, href: '#', onClick: () => onNavigate('student-dashboard') },
    { label: 'Akademik', icon: BookOpen, href: '#', onClick: () => onNavigate('student-academic') },
    { label: 'Ekskul', icon: Zap, href: '#', onClick: () => onNavigate('student-extracurricular') },
    { label: 'BK', icon: Calendar, href: '#', onClick: () => onNavigate('student-counseling') },
    { label: 'Pesan', icon: MessageCircle, href: '#', onClick: () => onNavigate('student-messages') },
    { label: 'Profile', icon: Users, href: '#', onClick: () => onNavigate('student-profile') }
  ];

  const parentMenu: NavigationMenuItem[] = [
    { label: 'Dashboard', icon: TrendingUp, href: '#', onClick: () => onNavigate('parent-dashboard') },
    { label: 'Keuangan', icon: DollarSign, href: '#', onClick: () => onNavigate('parent-finance') },
    { label: 'Profile', icon: Users, href: '#', onClick: () => {} }
  ];

  const teacherMenu: NavigationMenuItem[] = [
    { label: 'Dashboard', icon: TrendingUp, href: '#', onClick: () => onNavigate('teacher-dashboard') },
    { label: 'Jadwal', icon: Calendar, href: '#', onClick: () => onNavigate('teacher-schedule') },
    { label: 'Nilai', icon: Award, href: '#', onClick: () => onNavigate('teacher-grades') },
    { label: 'Absensi', icon: ClipboardCheck, href: '#', onClick: () => onNavigate('teacher-attendance') },
    { label: 'Pesan', icon: MessageCircle, href: '#', onClick: () => onNavigate('teacher-messages') },
    { label: 'Profile', icon: Users, href: '#', onClick: () => onNavigate('teacher-profile') }
  ];

  const adminMenu: NavigationMenuItem[] = [
    { label: 'Dashboard', icon: TrendingUp, href: '#', onClick: () => onNavigate('admin-dashboard') },
    { label: 'Manajemen Unit', icon: BookOpen, href: '#', onClick: () => onNavigate('admin-units') },
    { label: 'Manajemen User', icon: Users, href: '#', onClick: () => onNavigate('admin-users') },
    { 
      label: 'Manajemen Konten', 
      icon: FileText, 
      href: '#',
      submenu: [
        { label: 'Berita & Artikel', href: '#', onClick: () => onNavigate('admin-news') },
        { label: 'Galeri', href: '#', onClick: () => onNavigate('admin-gallery') },
        { label: 'Prestasi', href: '#', onClick: () => onNavigate('admin-achievement') },
        { label: 'Program', href: '#', onClick: () => onNavigate('admin-programs') },
        { label: 'CMS Halaman Unit', href: '#', onClick: () => onNavigate('admin-cms') }
      ]
    },
    { label: 'PPDB', icon: Calendar, href: '#', onClick: () => onNavigate('admin-ppdb') },
    { label: 'Rekrutmen', icon: Briefcase, href: '#', onClick: () => onNavigate('admin-career') },
    { label: 'Keuangan', icon: DollarSign, href: '#', onClick: () => onNavigate('admin-finance') },
    { label: 'Absensi', icon: ClipboardCheck, href: '#', onClick: () => onNavigate('admin-attendance') },
    { label: 'Pengaturan', icon: Settings, href: '#', onClick: () => {} }
  ];

  let menuItems: NavigationMenuItem[] = publicMenu;
  switch (role) {
    case 'student':
      menuItems = studentMenu;
      break;
    case 'parent':
      menuItems = parentMenu;
      break;
    case 'teacher':
      menuItems = teacherMenu;
      break;
    case 'admin':
      menuItems = unitSlug
        ? adminMenu.filter((item) => !['Manajemen Unit', 'Manajemen User', 'Keuangan', 'Absensi'].includes(item.label))
        : adminMenu;
      break;
  }

  return { menuItems, onNavigate };
};
