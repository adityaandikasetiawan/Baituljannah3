import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { BookOpen, Calendar, DollarSign, Bell, Award, TrendingUp, Clock, FileText, Users, CheckCircle, AlertCircle, ChevronRight, Download } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface StudentDashboardProps {
  onNavigate?: (page: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate = () => {} }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'academic' | 'schedule' | 'assignments'>('overview');

  const studentData = {
    nis: '2024001',
    name: 'Muhammad Rizki Pratama',
    class: 'XII IPA 1',
    unit: 'SMAIT',
    semester: 'Genap 2024/2025',
    photo: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
    gpa: 3.85,
    attendance: 95,
    ranking: 3,
    totalStudents: 32
  };

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => {} },
    { label: 'Akademik', href: '#', onClick: () => onNavigate('student-academic') },
    { label: 'Keuangan', href: '#', onClick: () => onNavigate('student-finance') },
    { label: 'Tugas', href: '#', onClick: () => setSelectedTab('assignments') },
    { label: 'Profile', href: '#', onClick: () => {} }
  ];

  const stats = [
    {
      label: 'IPK Semester',
      value: studentData.gpa.toFixed(2),
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      change: '+0.15',
      changeType: 'positive'
    },
    {
      label: 'Kehadiran',
      value: `${studentData.attendance}%`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      change: '+2%',
      changeType: 'positive'
    },
    {
      label: 'Ranking Kelas',
      value: `${studentData.ranking}/${studentData.totalStudents}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      change: 'Top 10%',
      changeType: 'neutral'
    },
    {
      label: 'Tugas Pending',
      value: '3',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      change: '2 deadline hari ini',
      changeType: 'warning'
    }
  ];

  const recentGrades = [
    { subject: 'Matematika', score: 92, grade: 'A', date: '2024-11-25', teacher: 'Ustadz Ahmad' },
    { subject: 'Fisika', score: 88, grade: 'A-', date: '2024-11-23', teacher: 'Ustadzah Siti' },
    { subject: 'Bahasa Inggris', score: 95, grade: 'A', date: '2024-11-20', teacher: 'Mr. Rizki' },
    { subject: 'Kimia', score: 85, grade: 'B+', date: '2024-11-18', teacher: 'Ustadz Hasan' }
  ];

  const todaySchedule = [
    { time: '07:00 - 08:30', subject: 'Matematika', teacher: 'Ustadz Ahmad', room: 'XII IPA 1', status: 'completed' },
    { time: '08:30 - 10:00', subject: 'Fisika', teacher: 'Ustadzah Siti', room: 'Lab Fisika', status: 'completed' },
    { time: '10:15 - 11:45', subject: 'Bahasa Inggris', teacher: 'Mr. Rizki', room: 'XII IPA 1', status: 'ongoing' },
    { time: '12:45 - 14:15', subject: 'Kimia', teacher: 'Ustadz Hasan', room: 'Lab Kimia', status: 'upcoming' },
    { time: '14:15 - 15:45', subject: 'Tahfidz', teacher: 'Ustadz Abdullah', room: 'Masjid', status: 'upcoming' }
  ];

  const assignments = [
    {
      id: 1,
      subject: 'Matematika',
      title: 'Tugas Integral dan Diferensial',
      dueDate: '2024-12-10',
      status: 'pending',
      priority: 'high',
      description: 'Kerjakan soal halaman 45-50'
    },
    {
      id: 2,
      subject: 'Fisika',
      title: 'Laporan Praktikum Gerak Parabola',
      dueDate: '2024-12-10',
      status: 'pending',
      priority: 'high',
      description: 'Submit laporan praktikum minggu lalu'
    },
    {
      id: 3,
      subject: 'Bahasa Inggris',
      title: 'Essay: My Future Career',
      dueDate: '2024-12-15',
      status: 'pending',
      priority: 'medium',
      description: 'Write 500 words essay'
    },
    {
      id: 4,
      subject: 'Kimia',
      title: 'Quiz Chapter 5',
      dueDate: '2024-12-08',
      status: 'submitted',
      priority: 'low',
      description: 'Online quiz'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Ujian Tengah Semester Genap',
      date: '2024-12-05',
      category: 'Akademik',
      urgent: true,
      description: 'UTS akan dilaksanakan tanggal 15-20 Desember 2024'
    },
    {
      id: 2,
      title: 'Pembayaran SPP Bulan Desember',
      date: '2024-12-01',
      category: 'Keuangan',
      urgent: true,
      description: 'Harap segera melunasi SPP bulan Desember'
    },
    {
      id: 3,
      title: 'Libur Semester Ganjil',
      date: '2024-11-28',
      category: 'Pengumuman',
      urgent: false,
      description: 'Libur semester: 23 Des - 5 Jan 2025'
    }
  ];

  const achievements = [
    { title: 'Juara 1 OSN Matematika', date: '2024-11-15', type: 'Akademik' },
    { title: 'Siswa Teladan Semester 1', date: '2024-11-10', type: 'Prestasi' },
    { title: 'Perfect Attendance', date: '2024-11-01', type: 'Kehadiran' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Portal Siswa - Baituljannah"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header Profile */}
        <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-strong">
              <ImageWithFallback
                src={studentData.photo}
                alt={studentData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl mb-2">Selamat Datang, {studentData.name.split(' ')[0]}! 👋</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 justify-center md:justify-start">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {studentData.nis}
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {studentData.class}
                </span>
                <span>•</span>
                <span>{studentData.unit}</span>
                <span>•</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {studentData.semester}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <div className={`text-xs flex items-center gap-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'warning' ? 'text-orange-600' :
                  'text-gray-600'
                }`}>
                  {stat.changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                  {stat.changeType === 'warning' && <AlertCircle className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#1E4AB8]" />
                  Jadwal Hari Ini
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="space-y-3">
                {todaySchedule.map((schedule, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border-l-4 ${
                      schedule.status === 'completed' ? 'bg-gray-50 border-gray-300' :
                      schedule.status === 'ongoing' ? 'bg-blue-50 border-blue-500' :
                      'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{schedule.time}</span>
                          {schedule.status === 'ongoing' && (
                            <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full animate-pulse">
                              Sedang Berlangsung
                            </span>
                          )}
                        </div>
                        <h3 className={`font-medium mb-1 ${schedule.status === 'completed' ? 'text-gray-500' : ''}`}>
                          {schedule.subject}
                        </h3>
                        <div className="text-sm text-gray-600 flex items-center gap-3">
                          <span>{schedule.teacher}</span>
                          <span>•</span>
                          <span>{schedule.room}</span>
                        </div>
                      </div>
                      {schedule.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#1E4AB8]" />
                  Nilai Terbaru
                </h2>
                <button 
                  onClick={() => onNavigate('student-academic')}
                  className="text-sm text-[#1E4AB8] hover:underline flex items-center gap-1"
                >
                  Lihat Semua
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentGrades.map((grade, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{grade.subject}</h3>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          grade.score >= 90 ? 'bg-green-100 text-green-700' :
                          grade.score >= 80 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {grade.grade}
                        </span>
                        <span className="text-2xl font-medium">{grade.score}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-3">
                      <span>{grade.teacher}</span>
                      <span>•</span>
                      <span>{new Date(grade.date).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#1E4AB8]" />
                  Tugas & Deadline
                </h2>
                <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm outline-none">
                  <option>Semua Status</option>
                  <option>Pending</option>
                  <option>Submitted</option>
                </select>
              </div>
              <div className="space-y-3">
                {assignments.filter(a => a.status === 'pending').map((assignment) => (
                  <div 
                    key={assignment.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            assignment.priority === 'high' ? 'bg-red-100 text-red-700' :
                            assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {assignment.priority === 'high' ? 'Urgent' : 
                             assignment.priority === 'medium' ? 'Medium' : 'Low'}
                          </span>
                          <span className="text-xs text-gray-500">{assignment.subject}</span>
                        </div>
                        <h3 className="font-medium mb-1">{assignment.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 px-4 py-2 bg-[#1E4AB8] text-white rounded-lg hover:bg-[#1a3d9a] transition-colors text-sm">
                        Submit Tugas
                      </button>
                      <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Announcements */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-6 h-6 text-[#1E4AB8]" />
                <h2 className="text-xl">Pengumuman</h2>
              </div>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id}
                    className={`p-4 rounded-xl border ${
                      announcement.urgent 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {announcement.urgent && (
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className={`px-2 py-0.5 rounded-full ${
                            announcement.category === 'Akademik' ? 'bg-blue-100 text-blue-700' :
                            announcement.category === 'Keuangan' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {announcement.category}
                          </span>
                          <span>{new Date(announcement.date).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl">Prestasi Terbaru</h2>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{achievement.title}</h3>
                      <div className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-white rounded-full">{achievement.type}</span>
                        <span>{new Date(achievement.date).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => onNavigate('student-academic')}
                  className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Lihat Nilai Lengkap
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onNavigate('student-finance')}
                  className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cek Tagihan
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Rapor
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

