
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, BookOpen, Users, FileText, Calendar, Settings, 
  DollarSign, ClipboardCheck, Award, MessageCircle, Home, 
  Info, Grid, Phone, Briefcase, GraduationCap, Zap 
} from 'lucide-react';

export type UserRole = 'public' | 'student' | 'parent' | 'teacher' | 'admin';

export const useNavigationMenu = (role: UserRole = 'public') => {
  const router = useRouter();

  const onNavigate = (page: string) => {
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
      'admin-career': '/admin/career',
      'admin-finance': '/admin/finance',
      'admin-attendance': '/admin/attendance',
      'admin-users': '/admin/users',
      'admin-units': '/admin/units',
    };
    
    const route = routes[page] || `/${page}`;
    router.push(route);
  };

  const publicMenu = [
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
        { label: 'Kepengurusan', labelEn: 'Management', href: '#', onClick: () => onNavigate('about') }
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

  const studentMenu = [
    { label: 'Dashboard', icon: TrendingUp, href: '#', onClick: () => onNavigate('student-dashboard') },
    { label: 'Akademik', icon: BookOpen, href: '#', onClick: () => onNavigate('student-academic') },
    { label: 'Ekskul', icon: Zap, href: '#', onClick: () => onNavigate('student-extracurricular') },
    { label: 'BK', icon: Calendar, href: '#', onClick: () => onNavigate('student-counseling') },
    { label: 'Pesan', icon: MessageCircle, href: '#', onClick: () => onNavigate('student-messages') },
    { label: 'Profile', icon: Users, href: '#', onClick: () => onNavigate('student-profile') }
  ];

  const parentMenu = [
    { label: 'Dashboard', icon: TrendingUp, href: '#', onClick: () => onNavigate('parent-dashboard') },
    { label: 'Keuangan', icon: DollarSign, href: '#', onClick: () => onNavigate('parent-finance') },
    { label: 'Profile', icon: Users, href: '#', onClick: () => {} }
  ];

  const teacherMenu = [
    { label: 'Dashboard', icon: TrendingUp, href: '#', onClick: () => onNavigate('teacher-dashboard') },
    { label: 'Jadwal', icon: Calendar, href: '#', onClick: () => onNavigate('teacher-schedule') },
    { label: 'Nilai', icon: Award, href: '#', onClick: () => onNavigate('teacher-grades') },
    { label: 'Absensi', icon: ClipboardCheck, href: '#', onClick: () => onNavigate('teacher-attendance') },
    { label: 'Pesan', icon: MessageCircle, href: '#', onClick: () => onNavigate('teacher-messages') },
    { label: 'Profile', icon: Users, href: '#', onClick: () => onNavigate('teacher-profile') }
  ];

  const adminMenu = [
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
        { label: 'Program', href: '#', onClick: () => onNavigate('admin-programs') }
      ]
    },
    { label: 'PPDB', icon: Calendar, href: '#', onClick: () => {} },
    { label: 'Rekrutmen', icon: Briefcase, href: '#', onClick: () => onNavigate('admin-career') },
    { label: 'Keuangan', icon: DollarSign, href: '#', onClick: () => onNavigate('admin-finance') },
    { label: 'Absensi', icon: ClipboardCheck, href: '#', onClick: () => onNavigate('admin-attendance') },
    { label: 'Pengaturan', icon: Settings, href: '#', onClick: () => {} }
  ];

  let menuItems = publicMenu;
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
      menuItems = adminMenu;
      break;
  }

  return { menuItems, onNavigate };
};
