import React, { useState } from 'react';
import { MainPortal } from './legacy-pages/MainPortal';
import { UnitSchool } from './legacy-pages/UnitSchool';
import { AdminDashboard } from './legacy-pages/AdminDashboard';
import { AdminPanel } from './legacy-pages/AdminPanel';
import { ComponentLibrary } from './legacy-pages/ComponentLibrary';
import { DesignSystem } from './legacy-pages/DesignSystem';
import { About } from './legacy-pages/About';
import { VisionMission } from './legacy-pages/VisionMission';
import { News } from './legacy-pages/News';
import { Gallery } from './legacy-pages/Gallery';
import { Achievement } from './legacy-pages/Achievement';
import { Contact } from './legacy-pages/Contact';
import { Admission } from './legacy-pages/Admission';
import { Programs } from './legacy-pages/Programs';
import { Career } from './legacy-pages/Career';
import { Teachers } from './legacy-pages/Teachers';
import { Events } from './legacy-pages/Events';
import { Alumni } from './legacy-pages/Alumni';
import { Login } from './legacy-pages/Login';
import { AdminCareer } from './legacy-pages/AdminCareer';
import { AdminAchievement } from './legacy-pages/AdminAchievement';
import { AdminNews } from './legacy-pages/AdminNews';
import { AdminGallery } from './legacy-pages/AdminGallery';
import { AdminPrograms } from './legacy-pages/AdminPrograms';
import { AdminStudents } from './legacy-pages/AdminStudents';
import { StudentDashboard } from './legacy-pages/StudentDashboard';
import { ParentDashboard } from './legacy-pages/ParentDashboard';
import { StudentFinance } from './legacy-pages/StudentFinance';
import { ParentFinance } from './legacy-pages/ParentFinance';
import { AdminFinance } from './legacy-pages/AdminFinance';
import { StudentAcademic } from './legacy-pages/StudentAcademic';
import { TeacherDashboard } from './legacy-pages/TeacherDashboard';
import { AdminLibrary } from './legacy-pages/AdminLibrary';
import { AdminAttendance } from './legacy-pages/AdminAttendance';
import { AdminTKIT } from './legacy-pages/AdminTKIT';
import { AdminSDIT } from './legacy-pages/AdminSDIT';
import { AdminSMPIT } from './legacy-pages/AdminSMPIT';
import { AdminSMAIT } from './legacy-pages/AdminSMAIT';
import { AdminSLBIT } from './legacy-pages/AdminSLBIT';
import { Layout, School, GraduationCap, Building2, Package, Palette, FileText, Image, Mail, UserPlus, Award, Trophy } from 'lucide-react';

type PageType = 
  | 'main' 
  | 'login'
  | 'tkit' 
  | 'sdit' 
  | 'smpit' 
  | 'smait' 
  | 'slbit'
  | 'admin-super'
  | 'admin-unit'
  | 'admin-tkit'
  | 'admin-sdit'
  | 'admin-smpit'
  | 'admin-smait'
  | 'admin-slbit'
  | 'admin-guru'
  | 'admin-siswa'
  | 'admin-career'
  | 'admin-achievement'
  | 'admin-news'
  | 'admin-gallery'
  | 'admin-programs'
  | 'admin-students'
  | 'admin-finance'
  | 'admin-library'
  | 'admin-attendance'
  | 'student-dashboard'
  | 'student-academic'
  | 'student-finance'
  | 'parent-dashboard'
  | 'parent-finance'
  | 'teacher-dashboard'
  | 'components'
  | 'design-system'
  | 'about'
  | 'vision-mission'
  | 'news'
  | 'gallery'
  | 'achievement'
  | 'contact'
  | 'admission'
  | 'programs'
  | 'career'
  | 'teachers'
  | 'events'
  | 'alumni';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('main');

  const unitConfigs = {
    tkit: {
      unitName: 'TKIT',
      fullName: 'TKIT Baituljannah',
      accentColor: '#10B981',
      icon: '🎨',
      description: 'Pendidikan anak usia dini berbasis Islam dengan metode pembelajaran yang menyenangkan dan mengembangkan potensi anak secara optimal melalui pendekatan holistik.'
    },
    sdit: {
      unitName: 'SDIT',
      fullName: 'SDIT Baituljannah',
      accentColor: '#3B82F6',
      icon: '📚',
      description: 'Sekolah Dasar Islam Terpadu dengan kurikulum nasional plus pendidikan agama Islam yang komprehensif untuk membentuk generasi Qur\'ani yang cerdas dan berakhlak mulia.'
    },
    smpit: {
      unitName: 'SMPIT',
      fullName: 'SMPIT Baituljannah',
      accentColor: '#F97316',
      icon: '🎓',
      description: 'Sekolah Menengah Pertama Islam Terpadu yang mengintegrasikan ilmu pengetahuan dengan nilai-nilai Islam untuk membentuk remaja yang berkarakter dan berprestasi.'
    },
    smait: {
      unitName: 'SMAIT',
      fullName: 'SMAIT Baituljannah',
      accentColor: '#8B5CF6',
      icon: '🏆',
      description: 'Sekolah Menengah Atas Islam Terpadu yang mempersiapkan siswa menjadi pemimpin masa depan yang berakhlak mulia, cerdas, dan siap menghadapi tantangan global.'
    },
    slbit: {
      unitName: 'SLBIT',
      fullName: 'SLBIT Baituljannah',
      accentColor: '#14B8A6',
      icon: '❤️',
      description: 'Sekolah Luar Biasa Islam Terpadu yang memberikan pendidikan inklusif dengan perhatian khusus untuk setiap siswa berkebutuhan khusus dengan kasih sayang dan profesionalisme.'
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPortal onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'login':
        return <Login onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'tkit':
      case 'sdit':
      case 'smpit':
      case 'smait':
      case 'slbit':
        return <UnitSchool {...unitConfigs[currentPage]} onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-super':
        return (
          <AdminDashboard
            userRole="Super Admin"
            userName="Admin Yayasan"
            accentColor="#1E4AB8"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-unit':
        return (
          <AdminDashboard
            userRole="Admin Unit"
            userName="Admin SDIT"
            unitName="SDIT Baituljannah"
            accentColor="#3B82F6"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-tkit':
        return (
          <AdminDashboard
            userRole="Admin Unit"
            userName="Admin TKIT"
            unitName="TKIT Baituljannah"
            accentColor="#10B981"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-sdit':
        return (
          <AdminDashboard
            userRole="Admin Unit"
            userName="Admin SDIT"
            unitName="SDIT Baituljannah"
            accentColor="#3B82F6"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-smpit':
        return (
          <AdminDashboard
            userRole="Admin Unit"
            userName="Admin SMPIT"
            unitName="SMPIT Baituljannah"
            accentColor="#F97316"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-smait':
        return (
          <AdminDashboard
            userRole="Admin Unit"
            userName="Admin SMAIT"
            unitName="SMAIT Baituljannah"
            accentColor="#8B5CF6"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-slbit':
        return (
          <AdminDashboard
            userRole="Admin Unit"
            userName="Admin SLBIT"
            unitName="SLBIT Baituljannah"
            accentColor="#14B8A6"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-guru':
        return (
          <AdminDashboard
            userRole="Guru"
            userName="Ustadz Ahmad"
            unitName="SDIT Baituljannah"
            accentColor="#3B82F6"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'admin-siswa':
        return (
          <AdminDashboard
            userRole="Siswa"
            userName="Muhammad Rizki"
            unitName="SDIT Baituljannah"
            accentColor="#3B82F6"
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'student-dashboard':
        return (
          <StudentDashboard
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'student-academic':
        return (
          <StudentAcademic
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'student-finance':
        return (
          <StudentFinance
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'parent-dashboard':
        return (
          <ParentDashboard
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'parent-finance':
        return (
          <ParentFinance
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'teacher-dashboard':
        return (
          <TeacherDashboard
            onNavigate={(page) => setCurrentPage(page as PageType)}
          />
        );
      
      case 'components':
        return <ComponentLibrary />;
      
      case 'design-system':
        return <DesignSystem />;
      
      case 'about':
        return <About onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'vision-mission':
        return <VisionMission onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'news':
        return <News onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'gallery':
        return <Gallery onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'achievement':
        return <Achievement onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'contact':
        return <Contact onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'career':
        return <Career onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-career':
        return <AdminCareer onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-achievement':
        return <AdminAchievement onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-news':
        return <AdminNews onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-gallery':
        return <AdminGallery onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-programs':
        return <AdminPrograms onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-students':
        return <AdminStudents onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-finance':
        return <AdminFinance onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-library':
        return <AdminLibrary onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admin-attendance':
        return <AdminAttendance onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'admission':
        return <Admission onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'programs':
        return <Programs onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'teachers':
        return <Teachers onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'events':
        return <Events onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      case 'alumni':
        return <Alumni onNavigate={(page) => setCurrentPage(page as PageType)} />;
      
      default:
        return <MainPortal onNavigate={(page) => setCurrentPage(page as PageType)} />;
    }
  };

  return (
    <div className="relative">
      {/* Navigation Menu - Fixed at top right, hidden on mobile */}
      <div className="hidden xl:block fixed top-4 right-4 z-50 max-h-[90vh] overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-strong p-4">
          <p className="text-xs text-gray-500 mb-3 px-2">Quick Navigation</p>
          
          {/* Main Portal */}
          <div className="mb-3">
            <button
              onClick={() => setCurrentPage('main')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'main'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Main Portal</span>
            </button>
          </div>

          {/* Unit Schools */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            <p className="text-xs text-gray-500 mb-2 px-2">Unit Sekolah</p>
            {Object.entries(unitConfigs).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key as PageType)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                  currentPage === key
                    ? 'text-white'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
                style={currentPage === key ? { backgroundColor: config.accentColor } : {}}
              >
                <School className="w-4 h-4" />
                <span>{config.unitName}</span>
              </button>
            ))}
          </div>

          {/* Component Library */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            <button
              onClick={() => setCurrentPage('components')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'components'
                  ? 'bg-teal-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Component Library</span>
            </button>
          </div>

          {/* Public Pages */}
          <div className="border-t border-gray-200 pt-3 mb-3">
            <p className="text-xs text-gray-500 mb-2 px-2">Halaman Publik</p>
            <button
              onClick={() => setCurrentPage('about')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'about'
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Tentang</span>
            </button>
            <button
              onClick={() => setCurrentPage('vision-mission')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'vision-mission'
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Visi & Misi</span>
            </button>
            <button
              onClick={() => setCurrentPage('programs')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'programs'
                  ? 'bg-violet-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Program</span>
            </button>
            <button
              onClick={() => setCurrentPage('news')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'news'
                  ? 'bg-rose-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Berita</span>
            </button>
            <button
              onClick={() => setCurrentPage('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'gallery'
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Galeri Foto</span>
            </button>
            <button
              onClick={() => setCurrentPage('achievement')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'achievement'
                  ? 'bg-yellow-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Prestasi</span>
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'contact'
                  ? 'bg-cyan-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Kontak</span>
            </button>
            <button
              onClick={() => setCurrentPage('admission')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admission'
                  ? 'bg-amber-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Pendaftaran</span>
            </button>
          </div>

          {/* Admin Panel */}
          <div className="border-t border-gray-200 pt-3">
            <p className="text-xs text-gray-500 mb-2 px-2">Admin Panel</p>
            <button
              onClick={() => setCurrentPage('admin-super')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-super'
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Super Admin</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-unit')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-unit'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Admin Unit</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-tkit')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-tkit'
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>TKIT</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-sdit')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-sdit'
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>SDIT</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-smpit')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-smpit'
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>SMPIT</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-smait')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-smait'
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>SMAIT</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-slbit')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-slbit'
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>SLBIT</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-guru')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-guru'
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Guru</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-siswa')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-siswa'
                  ? 'bg-orange-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Siswa</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-career')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm mb-1 transition-colors ${
                currentPage === 'admin-career'
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Rekrutmen</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-achievement')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-achievement'
                  ? 'bg-yellow-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Prestasi</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-news')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-news'
                  ? 'bg-rose-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Berita</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-gallery')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-gallery'
                  ? 'bg-pink-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Galeri Foto</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-programs')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-programs'
                  ? 'bg-violet-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Program</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-students')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-students'
                  ? 'bg-orange-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <School className="w-4 h-4" />
              <span>Siswa</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-finance')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-finance'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Keuangan</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-library')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-library'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Perpustakaan</span>
            </button>
            <button
              onClick={() => setCurrentPage('admin-attendance')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                currentPage === 'admin-attendance'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Kehadiran</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {renderPage()}
    </div>
  );
};

export default App;
