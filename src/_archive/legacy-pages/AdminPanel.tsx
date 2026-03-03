import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { StatsCard } from '../features/landing/components/StatsCard';
import { 
  Users, BookOpen, Calendar, Award, TrendingUp, FileText, Bell, Settings, LogOut, 
  Briefcase, DollarSign, Image as ImageIcon, Trophy, GraduationCap, ClipboardCheck,
  BarChart, Mail, Phone, MapPin, Download, Plus, Edit, Eye, Search, Filter, X, Save,
  School, Building, Megaphone, Library, UserCheck, ChevronRight, Clock, CheckCircle,
  AlertCircle, TrendingDown
} from 'lucide-react';
import { Table } from '../components/common/Table';

interface AdminPanelProps {
  userRole: 'Super Admin' | 'Admin Unit' | 'Guru' | 'Siswa';
  userName: string;
  unitName?: string;
  accentColor?: string;
  onNavigate?: (page: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  userRole,
  userName,
  unitName,
  accentColor = '#1E4AB8',
  onNavigate = () => {}
}) => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'units' | 'users' | 'content' | 'ppdb' | 'career' | 'students' | 'teachers' | 'academic' | 'finance' | 'library' | 'attendance' | 'classes' | 'materials' | 'assignments' | 'grades' | 'schedule' | 'profile'>('dashboard');

  // Menu items based on role
  const getMenuItems = () => {
    if (userRole === 'Super Admin') {
      return [
        { label: 'Dashboard', icon: TrendingUp, section: 'dashboard' },
        { label: 'Manajemen Unit', icon: Building, section: 'units' },
        { label: 'Manajemen User', icon: Users, section: 'users' },
        { 
          label: 'Manajemen Konten', 
          icon: FileText, 
          submenu: [
            { label: 'Berita & Artikel', onClick: () => onNavigate('admin-news') },
            { label: 'Galeri', onClick: () => onNavigate('admin-gallery') },
            { label: 'Prestasi', onClick: () => onNavigate('admin-achievement') },
            { label: 'Program', onClick: () => onNavigate('admin-programs') }
          ]
        },
        { label: 'PPDB', icon: Calendar, section: 'ppdb' },
        { label: 'Rekrutmen', icon: Briefcase, onClick: () => onNavigate('admin-career') },
        { label: 'Keuangan', icon: DollarSign, section: 'finance' },
        { label: 'Pengaturan', icon: Settings, href: '#' },
        { label: 'Logout', icon: LogOut, href: '#', onClick: () => onNavigate('login') }
      ];
    } else if (userRole === 'Admin Unit') {
      return [
        { label: 'Dashboard', icon: TrendingUp, section: 'dashboard' },
        { label: 'Manajemen Siswa', icon: Users, section: 'students' },
        { label: 'Manajemen Guru', icon: GraduationCap, section: 'teachers' },
        { 
          label: 'Akademik', 
          icon: BookOpen, 
          submenu: [
            { label: 'Kelas', section: 'classes' },
            { label: 'Mata Pelajaran', href: '#' },
            { label: 'Jadwal', section: 'schedule' }
          ]
        },
        { label: 'Absensi', icon: UserCheck, section: 'attendance' },
        { label: 'Keuangan', icon: DollarSign, section: 'finance' },
        { label: 'Perpustakaan', icon: Library, section: 'library' },
        { label: 'PPDB', icon: Calendar, section: 'ppdb' },
        { 
          label: 'Konten Website', 
          icon: FileText, 
          submenu: [
            { label: 'Berita', onClick: () => onNavigate('admin-news') },
            { label: 'Galeri', onClick: () => onNavigate('admin-gallery') },
            { label: 'Prestasi', onClick: () => onNavigate('admin-achievement') }
          ]
        },
        { label: 'Pengaturan', icon: Settings, href: '#' },
        { label: 'Logout', icon: LogOut, href: '#', onClick: () => onNavigate('login') }
      ];
    } else if (userRole === 'Guru') {
      return [
        { label: 'Dashboard', icon: TrendingUp, section: 'dashboard' },
        { label: 'Kelas Saya', icon: Users, section: 'classes' },
        { label: 'Materi', icon: BookOpen, section: 'materials' },
        { label: 'Tugas', icon: FileText, section: 'assignments' },
        { label: 'Nilai', icon: Award, section: 'grades' },
        { label: 'Absensi', icon: UserCheck, section: 'attendance' },
        { label: 'Jadwal', icon: Calendar, section: 'schedule' },
        { label: 'Profil', icon: Settings, section: 'profile' },
        { label: 'Logout', icon: LogOut, href: '#', onClick: () => onNavigate('login') }
      ];
    } else { // Siswa
      return [
        { label: 'Dashboard', icon: TrendingUp, section: 'dashboard' },
        { label: 'Materi', icon: BookOpen, section: 'materials' },
        { label: 'Tugas', icon: FileText, section: 'assignments', badge: '3' },
        { label: 'Nilai', icon: Award, section: 'grades' },
        { label: 'Absensi', icon: UserCheck, section: 'attendance' },
        { label: 'Jadwal', icon: Calendar, section: 'schedule' },
        { label: 'Profil', icon: Settings, section: 'profile' },
        { label: 'Logout', icon: LogOut, href: '#', onClick: () => onNavigate('login') }
      ];
    }
  };

  // Handle menu click
  const handleMenuClick = (item: any) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.section) {
      setActiveSection(item.section);
    }
  };

  // Stats data based on role
  const getStatsData = () => {
    if (userRole === 'Super Admin') {
      return [
        { title: 'Total Siswa', value: '1,250', icon: Users, color: '#3B82F6', trend: { value: '+12%', isPositive: true } },
        { title: 'Total Guru', value: '125', icon: GraduationCap, color: '#10B981', trend: { value: '+5%', isPositive: true } },
        { title: 'Unit Sekolah', value: '5', icon: Building, color: '#F97316', trend: { value: '0%', isPositive: true } },
        { title: 'Pendaftar PPDB', value: '342', icon: Calendar, color: '#8B5CF6', trend: { value: '+25%', isPositive: true } }
      ];
    } else if (userRole === 'Admin Unit') {
      return [
        { title: 'Total Siswa', value: '450', icon: Users, color: accentColor, trend: { value: '+8%', isPositive: true } },
        { title: 'Total Guru', value: '45', icon: GraduationCap, color: '#10B981', trend: { value: '+2%', isPositive: true } },
        { title: 'Kelas Aktif', value: '15', icon: BookOpen, color: '#F97316', trend: { value: '0%', isPositive: true } },
        { title: 'Pendaftar PPDB', value: '87', icon: Calendar, color: '#8B5CF6', trend: { value: '+18%', isPositive: true } }
      ];
    } else if (userRole === 'Guru') {
      return [
        { title: 'Siswa Saya', value: '120', icon: Users, color: accentColor },
        { title: 'Kelas', value: '4', icon: BookOpen, color: '#10B981' },
        { title: 'Materi', value: '28', icon: FileText, color: '#F97316' },
        { title: 'Tugas Pending', value: '12', icon: ClipboardCheck, color: '#EF4444' }
      ];
    } else {
      return [
        { title: 'Tugas Aktif', value: '3', icon: FileText, color: '#EF4444' },
        { title: 'Nilai Rata-rata', value: '87.5', icon: Award, color: '#10B981' },
        { title: 'Kehadiran', value: '95%', icon: UserCheck, color: accentColor },
        { title: 'Materi', value: '24', icon: BookOpen, color: '#F97316' }
      ];
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent userRole={userRole} accentColor={accentColor} />;
      case 'units':
        return <UnitsManagement accentColor={accentColor} />;
      case 'users':
        return <UsersManagement accentColor={accentColor} />;
      case 'ppdb':
        return <PPDBManagement accentColor={accentColor} />;
      case 'students':
        return <StudentsManagement accentColor={accentColor} onNavigate={onNavigate} />;
      case 'teachers':
        return <TeachersManagement accentColor={accentColor} />;
      case 'classes':
        return <ClassesManagement accentColor={accentColor} userRole={userRole} />;
      case 'finance':
        return <FinanceManagement accentColor={accentColor} />;
      case 'library':
        return <LibraryManagement accentColor={accentColor} />;
      case 'attendance':
        return <AttendanceManagement accentColor={accentColor} userRole={userRole} />;
      case 'materials':
        return <MaterialsManagement accentColor={accentColor} userRole={userRole} />;
      case 'assignments':
        return <AssignmentsManagement accentColor={accentColor} userRole={userRole} />;
      case 'grades':
        return <GradesManagement accentColor={accentColor} userRole={userRole} />;
      case 'schedule':
        return <ScheduleManagement accentColor={accentColor} userRole={userRole} />;
      case 'profile':
        return <ProfileManagement accentColor={accentColor} userRole={userRole} userName={userName} />;
      default:
        return <DashboardContent userRole={userRole} accentColor={accentColor} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={getMenuItems().map(item => ({
          ...item,
          href: item.href || '#',
          onClick: () => handleMenuClick(item)
        }))}
        accentColor={accentColor}
        userRole={userRole}
        userName={userName}
      />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0 pr-4">
              <h1 className="text-base md:text-xl lg:text-2xl truncate">
                {activeSection === 'dashboard' && `Dashboard ${unitName ? `- ${unitName}` : ''}`}
                {activeSection === 'units' && 'Manajemen Unit Sekolah'}
                {activeSection === 'users' && 'Manajemen User'}
                {activeSection === 'ppdb' && 'Manajemen PPDB'}
                {activeSection === 'students' && 'Manajemen Siswa'}
                {activeSection === 'teachers' && 'Manajemen Guru'}
                {activeSection === 'classes' && userRole === 'Guru' ? 'Kelas Saya' : 'Manajemen Kelas'}
                {activeSection === 'finance' && 'Manajemen Keuangan'}
                {activeSection === 'library' && 'Manajemen Perpustakaan'}
                {activeSection === 'attendance' && 'Manajemen Absensi'}
                {activeSection === 'materials' && 'Materi Pembelajaran'}
                {activeSection === 'assignments' && 'Manajemen Tugas'}
                {activeSection === 'grades' && 'Manajemen Nilai'}
                {activeSection === 'schedule' && 'Jadwal'}
                {activeSection === 'profile' && 'Profil Saya'}
              </h1>
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
        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {getStatsData().map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          )}
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent: React.FC<{ userRole: string; accentColor: string }> = ({ userRole, accentColor }) => {
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
    <div className="grid lg:grid-cols-3 gap-6">
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

      {/* Quick Actions & Events */}
      <div>
        <div className="card mb-6">
          <h4 className="mb-6">Quick Actions</h4>
          <div className="space-y-3">
            {userRole === 'Super Admin' && (
              <>
                <button className="w-full btn-primary text-left flex items-center gap-3" style={{ backgroundColor: accentColor }}>
                  <Building className="w-5 h-5" />
                  <span>Tambah Unit</span>
                </button>
                <button className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                  <Users className="w-5 h-5" />
                  <span>Tambah User</span>
                </button>
              </>
            )}
            {userRole === 'Admin Unit' && (
              <>
                <button className="w-full btn-primary text-left flex items-center gap-3" style={{ backgroundColor: accentColor }}>
                  <Users className="w-5 h-5" />
                  <span>Tambah Siswa</span>
                </button>
                <button className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                  <GraduationCap className="w-5 h-5" />
                  <span>Tambah Guru</span>
                </button>
              </>
            )}
            {userRole === 'Guru' && (
              <>
                <button className="w-full btn-primary text-left flex items-center gap-3" style={{ backgroundColor: accentColor }}>
                  <BookOpen className="w-5 h-5" />
                  <span>Upload Materi</span>
                </button>
                <button className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
                  <FileText className="w-5 h-5" />
                  <span>Buat Tugas</span>
                </button>
              </>
            )}
            <button className="w-full btn-outline text-left flex items-center gap-3" style={{ borderColor: accentColor, color: accentColor }}>
              <Calendar className="w-5 h-5" />
              <span>Lihat Jadwal</span>
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
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
  );
};

// Units Management Component
const UnitsManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const units = [
    { id: 1, name: 'TKIT Baituljannah', level: 'TK Islam Terpadu', students: 120, teachers: 12, color: '#10B981', status: 'Aktif' },
    { id: 2, name: 'SDIT Baituljannah', level: 'SD Islam Terpadu', students: 450, teachers: 45, color: '#3B82F6', status: 'Aktif' },
    { id: 3, name: 'SMPIT Baituljannah', level: 'SMP Islam Terpadu', students: 320, teachers: 38, color: '#F97316', status: 'Aktif' },
    { id: 4, name: 'SMAIT Baituljannah', level: 'SMA Islam Terpadu', students: 280, teachers: 35, color: '#8B5CF6', status: 'Aktif' },
    { id: 5, name: 'SLBIT Baituljannah', level: 'SLB Islam Terpadu', students: 80, teachers: 15, color: '#06B6D4', status: 'Aktif' }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-gray-600">Kelola semua unit sekolah yang ada di Yayasan Baituljannah</p>
        </div>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Tambah Unit</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <div key={unit.id} className="card hover:shadow-strong transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${unit.color}20`, color: unit.color }}>
                <School className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                {unit.status}
              </span>
            </div>
            <h4 className="mb-1">{unit.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{unit.level}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-2xl" style={{ color: unit.color }}>{unit.students}</p>
                <p className="text-xs text-gray-500">Siswa</p>
              </div>
              <div>
                <p className="text-2xl" style={{ color: unit.color }}>{unit.teachers}</p>
                <p className="text-xs text-gray-500">Guru</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 btn-outline text-sm" style={{ borderColor: unit.color, color: unit.color }}>
                <Eye className="w-4 h-4" />
              </button>
              <button className="flex-1 btn-outline text-sm" style={{ borderColor: unit.color, color: unit.color }}>
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Users Management Component
const UsersManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('Semua');

  const users = [
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad.fauzi@baituljannah.sch.id', role: 'Admin Unit', unit: 'SDIT', status: 'Aktif', lastLogin: '2024-12-01 08:30' },
    { id: 2, name: 'Siti Aisyah', email: 'siti.aisyah@baituljannah.sch.id', role: 'Admin Unit', unit: 'SMAIT', status: 'Aktif', lastLogin: '2024-12-01 09:15' },
    { id: 3, name: 'Ustadz Muhammad', email: 'muhammad@baituljannah.sch.id', role: 'Guru', unit: 'SDIT', status: 'Aktif', lastLogin: '2024-12-01 07:45' },
    { id: 4, name: 'Ustadzah Fatimah', email: 'fatimah@baituljannah.sch.id', role: 'Guru', unit: 'SMPIT', status: 'Aktif', lastLogin: '2024-11-30 14:20' },
    { id: 5, name: 'Abdullah Rahman', email: 'abdullah@baituljannah.sch.id', role: 'Siswa', unit: 'SMAIT', status: 'Aktif', lastLogin: '2024-12-01 10:00' }
  ];

  const columns = [
    { header: 'Nama', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Unit', accessor: 'unit' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
          {value}
        </span>
      )
    },
    { header: 'Last Login', accessor: 'lastLogin' },
    {
      header: 'Aksi',
      accessor: 'id',
      cell: () => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari user..."
            className="input-field pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="input-field w-full md:w-48"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option>Semua Role</option>
          <option>Admin Unit</option>
          <option>Guru</option>
          <option>Siswa</option>
        </select>
        <button className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto whitespace-nowrap" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Tambah User</span>
        </button>
      </div>

      <div className="card">
        <Table columns={columns} data={users} accentColor={accentColor} />
      </div>
    </div>
  );
};

// PPDB Management Component
const PPDBManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  const stats = [
    { label: 'Total Pendaftar', value: '342', color: '#3B82F6', icon: Users },
    { label: 'Menunggu Verifikasi', value: '87', color: '#F59E0B', icon: Clock },
    { label: 'Diterima', value: '230', color: '#10B981', icon: CheckCircle },
    { label: 'Ditolak', value: '25', color: '#EF4444', icon: AlertCircle }
  ];

  const applicants = [
    { id: 1, name: 'Muhammad Rizki', unit: 'SDIT', birthDate: '2015-05-15', parent: 'Ahmad Fauzi', phone: '081234567890', date: '2024-11-25', status: 'pending' },
    { id: 2, name: 'Fatimah Zahra', unit: 'SMPIT', birthDate: '2012-08-20', parent: 'Abdullah Rahman', phone: '081234567891', date: '2024-11-26', status: 'pending' },
    { id: 3, name: 'Ali Hassan', unit: 'TKIT', birthDate: '2019-03-10', parent: 'Hassan Ibrahim', phone: '081234567892', date: '2024-11-27', status: 'accepted' }
  ];

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center gap-4 mb-6 border-b">
          <button
            className={`pb-3 px-4 transition-colors ${selectedTab === 'pending' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
            style={{ borderColor: selectedTab === 'pending' ? accentColor : 'transparent', color: selectedTab === 'pending' ? accentColor : undefined }}
            onClick={() => setSelectedTab('pending')}
          >
            Menunggu Verifikasi (87)
          </button>
          <button
            className={`pb-3 px-4 transition-colors ${selectedTab === 'accepted' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
            style={{ borderColor: selectedTab === 'accepted' ? accentColor : 'transparent', color: selectedTab === 'accepted' ? accentColor : undefined }}
            onClick={() => setSelectedTab('accepted')}
          >
            Diterima (230)
          </button>
          <button
            className={`pb-3 px-4 transition-colors ${selectedTab === 'rejected' ? 'border-b-2 font-medium' : 'text-gray-500'}`}
            style={{ borderColor: selectedTab === 'rejected' ? accentColor : 'transparent', color: selectedTab === 'rejected' ? accentColor : undefined }}
            onClick={() => setSelectedTab('rejected')}
          >
            Ditolak (25)
          </button>
        </div>

        <div className="space-y-4">
          {applicants
            .filter(a => a.status === selectedTab)
            .map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-soft transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                    <span>👤</span>
                  </div>
                  <div>
                    <h5>{applicant.name}</h5>
                    <p className="text-sm text-gray-600">{applicant.unit} • {applicant.birthDate}</p>
                    <p className="text-sm text-gray-500">{applicant.parent} • {applicant.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-outline text-sm" style={{ borderColor: '#10B981', color: '#10B981' }}>
                    Terima
                  </button>
                  <button className="btn-outline text-sm" style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                    Tolak
                  </button>
                  <button className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                    Detail
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Students Management Component (simplified - full version already exists in AdminStudents.tsx)
const StudentsManagement: React.FC<{ accentColor: string; onNavigate: (page: string) => void }> = ({ accentColor, onNavigate }) => {
  return (
    <div className="card">
      <p className="text-center text-gray-600 py-12">
        Halaman manajemen siswa lengkap sudah tersedia di <button onClick={() => onNavigate('admin-students')} className="underline" style={{ color: accentColor }}>AdminStudents.tsx</button>
      </p>
    </div>
  );
};

// Teachers Management Component
const TeachersManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const teachers = [
    { id: 1, nip: 'GT-2020-001', name: 'Ustadz Ahmad', subject: 'Matematika', unit: 'SDIT', classes: '4A, 4B, 4C', students: 90, status: 'Aktif' },
    { id: 2, nip: 'GT-2020-002', name: 'Ustadzah Fatimah', subject: 'Bahasa Arab', unit: 'SMPIT', classes: '7A, 7B', students: 60, status: 'Aktif' },
    { id: 3, nip: 'GT-2021-003', name: 'Ustadz Muhammad', subject: 'Fisika', unit: 'SMAIT', classes: '10A, 10B', students: 56, status: 'Aktif' }
  ];

  const columns = [
    { header: 'NIP', accessor: 'nip' },
    { header: 'Nama', accessor: 'name' },
    { header: 'Mata Pelajaran', accessor: 'subject' },
    { header: 'Unit', accessor: 'unit' },
    { header: 'Kelas', accessor: 'classes' },
    { header: 'Siswa', accessor: 'students' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
          {value}
        </span>
      )
    },
    {
      header: 'Aksi',
      accessor: 'id',
      cell: () => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari guru..."
            className="input-field pl-10"
          />
        </div>
        <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Tambah Guru</span>
        </button>
      </div>

      <div className="card">
        <Table columns={columns} data={teachers} accentColor={accentColor} />
      </div>
    </div>
  );
};

// Classes Management Component
const ClassesManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const classes = userRole === 'Guru' 
    ? [
        { id: 1, name: '4A', level: 'Kelas 4', students: 30, waliKelas: 'Ustadz Ahmad', subject: 'Matematika', schedule: 'Senin, Rabu, Jumat' },
        { id: 2, name: '4B', level: 'Kelas 4', students: 30, waliKelas: 'Ustadzah Siti', subject: 'Matematika', schedule: 'Selasa, Kamis' },
        { id: 3, name: '5A', level: 'Kelas 5', students: 28, waliKelas: 'Ustadzah Maryam', subject: 'Matematika', schedule: 'Rabu, Jumat' }
      ]
    : [
        { id: 1, name: '1A', level: 'Kelas 1', students: 30, waliKelas: 'Ustadzah Aisyah' },
        { id: 2, name: '1B', level: 'Kelas 1', students: 28, waliKelas: 'Ustadz Abdullah' },
        { id: 3, name: '2A', level: 'Kelas 2', students: 32, waliKelas: 'Ustadzah Fatimah' },
        { id: 4, name: '2B', level: 'Kelas 2', students: 30, waliKelas: 'Ustadz Muhammad' }
      ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kelas..."
            className="input-field pl-10"
          />
        </div>
        {userRole !== 'Guru' && (
          <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap" style={{ backgroundColor: accentColor }}>
            <Plus className="w-5 h-5" />
            <span>Tambah Kelas</span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="card hover:shadow-strong transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4>{cls.name}</h4>
                <p className="text-sm text-gray-600">{cls.level}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Jumlah Siswa</span>
                <span>{cls.students} siswa</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Wali Kelas</span>
                <span>{cls.waliKelas}</span>
              </div>
              {userRole === 'Guru' && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mata Pelajaran</span>
                    <span>{cls.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Jadwal</span>
                    <span className="text-xs">{cls.schedule}</span>
                  </div>
                </>
              )}
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Finance Management Component (simplified)
const FinanceManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const stats = [
    { label: 'Total Pemasukan', value: 'Rp 2.5M', trend: '+15%', color: '#10B981', icon: TrendingUp },
    { label: 'Tunggakan', value: 'Rp 450K', trend: '-5%', color: '#EF4444', icon: TrendingDown },
    { label: 'Siswa Lunas', value: '385', color: '#3B82F6', icon: CheckCircle },
    { label: 'Siswa Menunggak', value: '65', color: '#F59E0B', icon: Clock }
  ];

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl mb-1" style={{ color: stat.color }}>{stat.value}</p>
            {stat.trend && (
              <p className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend} dari bulan lalu
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <h4 className="mb-4">Pembayaran Terbaru</h4>
        <p className="text-center text-gray-500 py-12">
          Fitur manajemen keuangan lengkap tersedia di AdminFinance.tsx
        </p>
      </div>
    </div>
  );
};

// Library Management Component
const LibraryManagement: React.FC<{ accentColor: string }> = ({ accentColor }) => {
  const books = [
    { id: 1, title: 'Fiqih Sunnah', author: 'Sayyid Sabiq', category: 'Agama', stock: 15, borrowed: 5 },
    { id: 2, title: 'Tafsir Ibnu Katsir', author: 'Ibnu Katsir', category: 'Agama', stock: 10, borrowed: 3 },
    { id: 3, title: 'Matematika Kelas 5', author: 'Tim Penulis', category: 'Pelajaran', stock: 50, borrowed: 35 },
    { id: 4, title: 'Bahasa Indonesia', author: 'Tim Penulis', category: 'Pelajaran', stock: 50, borrowed: 28 }
  ];

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Total Buku</p>
          <p className="text-3xl" style={{ color: accentColor }}>1,250</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Dipinjam</p>
          <p className="text-3xl text-orange-500">385</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Tersedia</p>
          <p className="text-3xl text-green-500">865</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-2">Terlambat</p>
          <p className="text-3xl text-red-500">23</p>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h4>Daftar Buku</h4>
          <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap" style={{ backgroundColor: accentColor }}>
            <Plus className="w-5 h-5" />
            <span>Tambah Buku</span>
          </button>
        </div>

        <div className="space-y-3">
          {books.map((book) => (
            <div key={book.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-soft transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 rounded bg-gray-200 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h5>{book.title}</h5>
                  <p className="text-sm text-gray-600">{book.author} • {book.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Stok: {book.stock}</p>
                  <p className="text-sm text-orange-600">Dipinjam: {book.borrowed}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Attendance Management Component
const AttendanceManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const attendanceData = userRole === 'Siswa' 
    ? [
        { date: '2024-12-01', status: 'Hadir', subject: 'Matematika', teacher: 'Ustadz Ahmad' },
        { date: '2024-12-01', status: 'Hadir', subject: 'Bahasa Arab', teacher: 'Ustadzah Fatimah' },
        { date: '2024-12-01', status: 'Hadir', subject: 'Fisika', teacher: 'Ustadz Muhammad' }
      ]
    : [
        { id: 1, class: '4A', date: '2024-12-01', present: 28, sick: 2, absent: 0, total: 30 },
        { id: 2, class: '4B', date: '2024-12-01', present: 27, sick: 1, absent: 2, total: 30 },
        { id: 3, class: '5A', date: '2024-12-01', present: 26, sick: 2, absent: 0, total: 28 }
      ];

  if (userRole === 'Siswa') {
    return (
      <div>
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Kehadiran</p>
            <p className="text-3xl text-green-500">95%</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Hadir</p>
            <p className="text-3xl" style={{ color: accentColor }}>85 hari</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Sakit</p>
            <p className="text-3xl text-yellow-500">3 hari</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Izin</p>
            <p className="text-3xl text-orange-500">2 hari</p>
          </div>
        </div>

        <div className="card">
          <h4 className="mb-4">Riwayat Absensi</h4>
          <div className="space-y-2">
            {attendanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p>{item.subject}</p>
                  <p className="text-sm text-gray-600">{item.teacher}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {item.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <input type="date" className="input-field" defaultValue="2024-12-01" />
        <select className="input-field">
          <option>Semua Kelas</option>
          <option>4A</option>
          <option>4B</option>
          <option>5A</option>
        </select>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      <div className="card">
        <h4 className="mb-4">Absensi Hari Ini</h4>
        <div className="space-y-3">
          {attendanceData.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-xl">
              <div>
                <h5>Kelas {item.class}</h5>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl text-green-500">{item.present}</p>
                  <p className="text-xs text-gray-600">Hadir</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-yellow-500">{item.sick}</p>
                  <p className="text-xs text-gray-600">Sakit</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl text-red-500">{item.absent}</p>
                  <p className="text-xs text-gray-600">Alpa</p>
                </div>
                <button className="btn-outline" style={{ borderColor: accentColor, color: accentColor }}>
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Materials Management Component
const MaterialsManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const materials = [
    { id: 1, title: 'Materi Perkalian dan Pembagian', subject: 'Matematika', class: '4A', date: '2024-11-28', files: 3, views: 28 },
    { id: 2, title: 'Tata Bahasa Arab Dasar', subject: 'Bahasa Arab', class: '4A', date: '2024-11-25', files: 2, views: 25 },
    { id: 3, title: 'Sejarah Islam: Periode Madinah', subject: 'Sejarah Islam', class: '5A', date: '2024-11-22', files: 4, views: 24 }
  ];

  return (
    <div>
      {userRole === 'Guru' && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari materi..."
              className="input-field pl-10"
            />
          </div>
          <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
            <Plus className="w-5 h-5" />
            <span>Upload Materi</span>
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <div key={material.id} className="card hover:shadow-strong transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
              <BookOpen className="w-12 h-12" style={{ color: accentColor }} />
            </div>
            <h5 className="mb-2">{material.title}</h5>
            <p className="text-sm text-gray-600 mb-4">{material.subject} • Kelas {material.class}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{material.files} file</span>
              <span>{material.views} views</span>
              <span>{material.date}</span>
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              {userRole === 'Guru' ? 'Edit Materi' : 'Lihat Materi'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Assignments Management Component
const AssignmentsManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const assignments = userRole === 'Siswa'
    ? [
        { id: 1, title: 'Latihan Soal Perkalian', subject: 'Matematika', teacher: 'Ustadz Ahmad', deadline: '2024-12-05', status: 'Belum Dikumpulkan' },
        { id: 2, title: 'Essay Bahasa Arab', subject: 'Bahasa Arab', teacher: 'Ustadzah Fatimah', deadline: '2024-12-03', status: 'Terlambat' },
        { id: 3, title: 'Laporan Praktikum', subject: 'IPA', teacher: 'Ustadz Muhammad', deadline: '2024-12-10', status: 'Sudah Dikumpulkan' }
      ]
    : [
        { id: 1, title: 'Latihan Soal Perkalian', class: '4A, 4B', deadline: '2024-12-05', submitted: 45, total: 60 },
        { id: 2, title: 'Essay Matematika', class: '5A', deadline: '2024-12-03', submitted: 28, total: 28 },
        { id: 3, title: 'Tugas Kelompok', class: '4A', deadline: '2024-12-10', submitted: 20, total: 30 }
      ];

  if (userRole === 'Siswa') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card hover:shadow-strong transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                <FileText className="w-6 h-6" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs ${
                assignment.status === 'Sudah Dikumpulkan' ? 'bg-green-100 text-green-700' :
                assignment.status === 'Terlambat' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {assignment.status}
              </span>
            </div>
            <h5 className="mb-2">{assignment.title}</h5>
            <p className="text-sm text-gray-600 mb-1">{assignment.subject}</p>
            <p className="text-sm text-gray-600 mb-4">{assignment.teacher}</p>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-gray-500">Deadline:</span>
              <span className="text-red-600">{assignment.deadline}</span>
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              {assignment.status === 'Sudah Dikumpulkan' ? 'Lihat Detail' : 'Kerjakan'}
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 relative max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari tugas..."
            className="input-field pl-10"
          />
        </div>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Plus className="w-5 h-5" />
          <span>Buat Tugas</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="card hover:shadow-strong transition-shadow">
            <h5 className="mb-2">{assignment.title}</h5>
            <p className="text-sm text-gray-600 mb-4">Kelas {assignment.class}</p>
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-gray-500">Deadline:</span>
              <span className="text-red-600">{assignment.deadline}</span>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progres Pengumpulan</span>
                <span style={{ color: accentColor }}>{assignment.submitted}/{assignment.total}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all" 
                  style={{ 
                    width: `${(assignment.submitted / assignment.total) * 100}%`,
                    backgroundColor: accentColor 
                  }}
                ></div>
              </div>
            </div>
            <button className="w-full btn-primary" style={{ backgroundColor: accentColor }}>
              Lihat Pengumpulan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Grades Management Component
const GradesManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const grades = userRole === 'Siswa'
    ? [
        { subject: 'Matematika', uts: 85, uas: 88, tugas: 90, final: 87.5 },
        { subject: 'Bahasa Arab', uts: 82, uas: 85, tugas: 88, final: 85 },
        { subject: 'IPA', uts: 90, uas: 92, tugas: 95, final: 92 },
        { subject: 'IPS', uts: 78, uas: 80, tugas: 85, final: 81 }
      ]
    : [
        { id: 1, name: 'Muhammad Rizki', nis: '2024001', uts: 85, uas: 88, tugas: 90, final: 87.5 },
        { id: 2, name: 'Fatimah Zahra', nis: '2024002', uts: 90, uas: 92, tugas: 95, final: 92 },
        { id: 3, name: 'Ali Hassan', nis: '2024003', uts: 78, uas: 80, tugas: 85, final: 81 }
      ];

  if (userRole === 'Siswa') {
    return (
      <div>
        <div className="card mb-6">
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}20` }}>
              <Award className="w-12 h-12" style={{ color: accentColor }} />
            </div>
            <h3 className="mb-2">Nilai Rata-rata</h3>
            <p className="text-5xl mb-2" style={{ color: accentColor }}>87.5</p>
            <p className="text-gray-600">Semester Ganjil 2024/2025</p>
          </div>
        </div>

        <div className="card">
          <h4 className="mb-4">Rincian Nilai</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Mata Pelajaran</th>
                  <th className="text-center py-3 px-4">UTS</th>
                  <th className="text-center py-3 px-4">UAS</th>
                  <th className="text-center py-3 px-4">Tugas</th>
                  <th className="text-center py-3 px-4">Nilai Akhir</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{grade.subject}</td>
                    <td className="py-3 px-4 text-center">{grade.uts}</td>
                    <td className="py-3 px-4 text-center">{grade.uas}</td>
                    <td className="py-3 px-4 text-center">{grade.tugas}</td>
                    <td className="py-3 px-4 text-center" style={{ color: accentColor }}>{grade.final}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <select className="input-field">
          <option>Kelas 4A</option>
          <option>Kelas 4B</option>
          <option>Kelas 5A</option>
        </select>
        <select className="input-field">
          <option>Matematika</option>
          <option>Bahasa Arab</option>
          <option>IPA</option>
        </select>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">NIS</th>
                <th className="text-left py-3 px-4">Nama</th>
                <th className="text-center py-3 px-4">UTS</th>
                <th className="text-center py-3 px-4">UAS</th>
                <th className="text-center py-3 px-4">Tugas</th>
                <th className="text-center py-3 px-4">Nilai Akhir</th>
                <th className="text-center py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade: any) => (
                <tr key={grade.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{grade.nis}</td>
                  <td className="py-3 px-4">{grade.name}</td>
                  <td className="py-3 px-4 text-center">{grade.uts}</td>
                  <td className="py-3 px-4 text-center">{grade.uas}</td>
                  <td className="py-3 px-4 text-center">{grade.tugas}</td>
                  <td className="py-3 px-4 text-center" style={{ color: accentColor }}>{grade.final}</td>
                  <td className="py-3 px-4 text-center">
                    <button className="btn-outline text-sm" style={{ borderColor: accentColor, color: accentColor }}>
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Schedule Management Component
const ScheduleManagement: React.FC<{ accentColor: string; userRole: string }> = ({ accentColor, userRole }) => {
  const schedule = [
    { time: '07:00 - 07:45', monday: 'Matematika', tuesday: 'Bahasa Indonesia', wednesday: 'IPA', thursday: 'IPS', friday: 'Agama' },
    { time: '08:00 - 08:45', monday: 'Bahasa Arab', tuesday: 'Matematika', wednesday: 'Bahasa Indonesia', thursday: 'IPA', friday: 'IPS' },
    { time: '09:00 - 09:45', monday: 'IPA', tuesday: 'Bahasa Arab', wednesday: 'Matematika', thursday: 'Bahasa Indonesia', friday: 'Penjaskes' },
    { time: '10:00 - 10:45', monday: 'IPS', tuesday: 'IPA', wednesday: 'Bahasa Arab', thursday: 'Matematika', friday: 'Seni Budaya' }
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        {userRole !== 'Siswa' && (
          <select className="input-field">
            <option>Kelas 4A</option>
            <option>Kelas 4B</option>
            <option>Kelas 5A</option>
          </select>
        )}
        <select className="input-field">
          <option>Semester Ganjil 2024/2025</option>
          <option>Semester Genap 2024/2025</option>
        </select>
        <button className="btn-primary flex items-center gap-2" style={{ backgroundColor: accentColor }}>
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Waktu</th>
              <th className="text-center py-3 px-4">Senin</th>
              <th className="text-center py-3 px-4">Selasa</th>
              <th className="text-center py-3 px-4">Rabu</th>
              <th className="text-center py-3 px-4">Kamis</th>
              <th className="text-center py-3 px-4">Jumat</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-600">{slot.time}</td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.monday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.tuesday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.wednesday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.thursday}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: `${accentColor}10` }}>
                    {slot.friday}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Profile Management Component
const ProfileManagement: React.FC<{ accentColor: string; userRole: string; userName: string }> = ({ accentColor, userRole, userName }) => {
  return (
    <div className="max-w-4xl">
      <div className="card mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center text-4xl">
            👤
          </div>
          <div className="flex-1">
            <h3 className="mb-2">{userName}</h3>
            <p className="text-gray-600 mb-4">{userRole}</p>
            <button className="btn-outline" style={{ borderColor: accentColor, color: accentColor }}>
              Ubah Foto
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="mb-6">Informasi Pribadi</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-2 text-gray-600">Nama Lengkap</label>
            <input type="text" className="input-field" defaultValue={userName} />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Email</label>
            <input type="email" className="input-field" defaultValue="user@baituljannah.sch.id" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">No. Telepon</label>
            <input type="tel" className="input-field" defaultValue="081234567890" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Tanggal Lahir</label>
            <input type="date" className="input-field" defaultValue="1990-01-01" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 text-gray-600">Alamat</label>
            <textarea className="input-field" rows={3} defaultValue="Jl. Pendidikan No. 123, Jakarta"></textarea>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button className="btn-primary" style={{ backgroundColor: accentColor }}>
            Simpan Perubahan
          </button>
          <button className="btn-outline" style={{ borderColor: accentColor, color: accentColor }}>
            Batal
          </button>
        </div>
      </div>

      <div className="card mt-6">
        <h4 className="mb-6">Ubah Password</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-600">Password Lama</label>
            <input type="password" className="input-field" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Password Baru</label>
            <input type="password" className="input-field" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">Konfirmasi Password Baru</label>
            <input type="password" className="input-field" />
          </div>
        </div>
        <button className="btn-primary mt-6" style={{ backgroundColor: accentColor }}>
          Update Password
        </button>
      </div>
    </div>
  );
};

