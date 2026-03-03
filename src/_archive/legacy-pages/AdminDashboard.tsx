import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { StatsCard } from '../features/landing/components/StatsCard';
import { Table } from '../components/common/Table';
import { Users, BookOpen, Calendar, Award, TrendingUp, FileText, Bell, Settings, LogOut, Briefcase } from 'lucide-react';

interface AdminDashboardProps {
  userRole: 'Super Admin' | 'Admin Unit' | 'Guru' | 'Siswa';
  userName: string;
  unitName?: string;
  accentColor?: string;
  onNavigate?: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  userRole,
  userName,
  unitName,
  accentColor = '#1E4AB8',
  onNavigate = () => {}
}) => {
  // Menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      { label: 'Dashboard', icon: TrendingUp, href: '#' },
    ];

    if (userRole === 'Super Admin') {
      return [
        ...commonItems,
        { label: 'Manajemen Unit', icon: BookOpen, href: '#' },
        { label: 'Manajemen User', icon: Users, href: '#' },
        { label: 'Manajemen Konten', icon: FileText, submenu: [
          { label: 'Berita & Artikel', href: '#' },
          { label: 'Galeri', href: '#' },
          { label: 'Halaman', href: '#' }
        ]},
        { label: 'PPDB', icon: Calendar, href: '#' },
        { label: 'Rekrutmen', icon: Briefcase, onClick: () => onNavigate('admin-career') },
        { label: 'Pengaturan', icon: Settings, href: '#' },
        { label: 'Logout', icon: LogOut, href: '#' }
      ];
    } else if (userRole === 'Admin Unit') {
      return [
        ...commonItems,
        { label: 'Manajemen Siswa', icon: Users, href: '#' },
        { label: 'Manajemen Guru', icon: Users, href: '#' },
        { label: 'Akademik', icon: BookOpen, submenu: [
          { label: 'Kelas', href: '#' },
          { label: 'Mata Pelajaran', href: '#' },
          { label: 'Jadwal', href: '#' }
        ]},
        { label: 'PPDB', icon: Calendar, href: '#' },
        { label: 'Rekrutmen', icon: Briefcase, onClick: () => onNavigate('admin-career') },
        { label: 'Konten Website', icon: FileText, href: '#' },
        { label: 'Pengaturan', icon: Settings, href: '#' },
        { label: 'Logout', icon: LogOut, href: '#' }
      ];
    } else if (userRole === 'Guru') {
      return [
        ...commonItems,
        { label: 'Kelas Saya', icon: Users, href: '#' },
        { label: 'Materi', icon: BookOpen, href: '#' },
        { label: 'Tugas', icon: FileText, href: '#' },
        { label: 'Nilai', icon: Award, href: '#' },
        { label: 'Jadwal', icon: Calendar, href: '#' },
        { label: 'Profil', icon: Settings, href: '#' },
        { label: 'Logout', icon: LogOut, href: '#' }
      ];
    } else {
      return [
        ...commonItems,
        { label: 'Materi', icon: BookOpen, href: '#' },
        { label: 'Tugas', icon: FileText, href: '#', badge: '3' },
        { label: 'Nilai', icon: Award, href: '#' },
        { label: 'Jadwal', icon: Calendar, href: '#' },
        { label: 'Profil', icon: Settings, href: '#' },
        { label: 'Logout', icon: LogOut, href: '#' }
      ];
    }
  };

  // Stats data based on role
  const getStatsData = () => {
    if (userRole === 'Super Admin') {
      return [
        { title: 'Total Siswa', value: '1,250', icon: Users, color: '#3B82F6', trend: { value: '+12%', isPositive: true } },
        { title: 'Total Guru', value: '125', icon: Users, color: '#10B981', trend: { value: '+5%', isPositive: true } },
        { title: 'Unit Sekolah', value: '5', icon: BookOpen, color: '#F97316', trend: { value: '0%', isPositive: true } },
        { title: 'Pendaftar PPDB', value: '342', icon: Calendar, color: '#8B5CF6', trend: { value: '+25%', isPositive: true } }
      ];
    } else if (userRole === 'Admin Unit') {
      return [
        { title: 'Total Siswa', value: '450', icon: Users, color: accentColor, trend: { value: '+8%', isPositive: true } },
        { title: 'Total Guru', value: '45', icon: Users, color: '#10B981', trend: { value: '+2%', isPositive: true } },
        { title: 'Kelas Aktif', value: '15', icon: BookOpen, color: '#F97316', trend: { value: '0%', isPositive: true } },
        { title: 'Pendaftar PPDB', value: '87', icon: Calendar, color: '#8B5CF6', trend: { value: '+18%', isPositive: true } }
      ];
    } else if (userRole === 'Guru') {
      return [
        { title: 'Siswa Saya', value: '120', icon: Users, color: accentColor },
        { title: 'Kelas', value: '4', icon: BookOpen, color: '#10B981' },
        { title: 'Materi', value: '28', icon: FileText, color: '#F97316' },
        { title: 'Tugas Pending', value: '12', icon: Calendar, color: '#EF4444' }
      ];
    } else {
      return [
        { title: 'Tugas Aktif', value: '3', icon: FileText, color: '#EF4444' },
        { title: 'Nilai Rata-rata', value: '87.5', icon: Award, color: '#10B981' },
        { title: 'Kehadiran', value: '95%', icon: Users, color: accentColor },
        { title: 'Materi', value: '24', icon: BookOpen, color: '#F97316' }
      ];
    }
  };

  // Recent activities table
  const recentActivities = [
    { activity: 'User baru terdaftar', user: 'Ahmad Fauzi', time: '5 menit lalu', status: 'Success' },
    { activity: 'Berita dipublikasikan', user: 'Admin SDIT', time: '15 menit lalu', status: 'Success' },
    { activity: 'PPDB diterima', user: 'Siti Aisyah', time: '1 jam lalu', status: 'Pending' },
    { activity: 'Materi diupload', user: 'Guru Matematika', time: '2 jam lalu', status: 'Success' }
  ];

  const columns = [
    { header: 'Aktivitas', accessor: 'activity' },
    { header: 'User', accessor: 'user' },
    { header: 'Waktu', accessor: 'time' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs ${
          value === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={getMenuItems()}
        accentColor={accentColor}
        userRole={userRole}
        userName={userName}
      />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-base md:text-xl lg:text-2xl truncate">Dashboard {unitName ? `- ${unitName}` : ''}</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Selamat datang kembali, {userName}!</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                <span className="text-xs md:text-sm">👤</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 pl-16 lg:pl-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {getStatsData().map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3>Aktivitas Terbaru</h3>
                  <button className="text-sm" style={{ color: accentColor }}>Lihat Semua</button>
                </div>
                <Table columns={columns} data={recentActivities} accentColor={accentColor} />
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="card">
                <h4 className="mb-6">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-left flex items-center gap-3" style={{ backgroundColor: accentColor }}>
                    <Users className="w-5 h-5" />
                    <span>Tambah Siswa Baru</span>
                  </button>
                  <button className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                    <FileText className="w-5 h-5" />
                    <span>Buat Pengumuman</span>
                  </button>
                  <button className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                    <Calendar className="w-5 h-5" />
                    <span>Atur Jadwal</span>
                  </button>
                  <button className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                    <BookOpen className="w-5 h-5" />
                    <span>Upload Materi</span>
                  </button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="card mt-6">
                <h4 className="mb-4">Event Mendatang</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                      <span className="text-xs">DEC</span>
                      <span className="text-lg">28</span>
                    </div>
                    <div>
                      <p className="text-sm">Ujian Semester</p>
                      <p className="text-xs text-gray-500">08:00 - 12:00</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                      <span className="text-xs">JAN</span>
                      <span className="text-lg">05</span>
                    </div>
                    <div>
                      <p className="text-sm">Rapat Guru</p>
                      <p className="text-xs text-gray-500">10:00 - 12:00</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                      <span className="text-xs">JAN</span>
                      <span className="text-lg">15</span>
                    </div>
                    <div>
                      <p className="text-sm">Pembagian Rapor</p>
                      <p className="text-xs text-gray-500">08:00 - 15:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
