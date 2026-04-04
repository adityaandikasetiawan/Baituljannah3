'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { BookOpen, Calendar, Bell, Award, TrendingUp, Clock, FileText, Users, CheckCircle, AlertCircle, ChevronRight, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Toaster } from 'sonner';

const STORAGE = {
  exkul: 'student_extracurricular',
  bk: 'student_bk_bookings',
  inbox: 'student_messages_inbox',
  outbox: 'student_messages_outbox'
};

const EXKUL_ACTIVITIES = [
  { id: 'basket', name: 'Basket', day: 'Rabu', time: '15:30', location: 'Lapangan', quota: 30 },
  { id: 'paskibra', name: 'Paskibra', day: 'Selasa', time: '15:30', location: 'Lapangan', quota: 40 },
  { id: 'tahfidz', name: 'Tahfidz', day: 'Kamis', time: '16:00', location: 'Masjid', quota: 50 },
  { id: 'englishclub', name: 'English Club', day: 'Senin', time: '15:30', location: 'R. Bahasa', quota: 25 }
];

const BK_COUNSELORS = [
  { id: 'bk-1', name: 'Ustadzah Siti', specialty: 'Akademik' },
  { id: 'bk-2', name: 'Ustadz Ahmad', specialty: 'Karir' },
  { id: 'bk-3', name: 'Ustadzah Fatimah', specialty: 'Kedisiplinan' }
];

export default function StudentDashboardPage() {
  const router = useRouter();
  const { menuItems, onNavigate } = useNavigationMenu('student');
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const isoAddDays = (days: number) => {
    const d = new Date(startOfDay);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };

  const daysUntil = (isoDate: string) => {
    const target = new Date(isoDate);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - startOfDay.getTime()) / (1000 * 60 * 60 * 24));
  };

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
      dueDate: isoAddDays(1),
      status: 'pending',
      priority: 'high',
      description: 'Kerjakan soal halaman 45-50'
    },
    {
      id: 2,
      subject: 'Fisika',
      title: 'Laporan Praktikum Gerak Parabola',
      dueDate: isoAddDays(1),
      status: 'pending',
      priority: 'high',
      description: 'Submit laporan praktikum minggu lalu'
    },
    {
      id: 3,
      subject: 'Bahasa Inggris',
      title: 'Essay: My Future Career',
      dueDate: isoAddDays(5),
      status: 'pending',
      priority: 'medium',
      description: 'Write 500 words essay'
    },
    {
      id: 4,
      subject: 'Kimia',
      title: 'Quiz Chapter 5',
      dueDate: isoAddDays(-1),
      status: 'submitted',
      priority: 'low',
      description: 'Online quiz'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Ujian Tengah Semester Genap',
      date: isoAddDays(7),
      category: 'Akademik',
      urgent: true,
      description: 'UTS akan dilaksanakan tanggal 15-20 Desember 2024'
    },
    {
      id: 2,
      title: 'Pengambilan Kartu Ujian',
      date: isoAddDays(3),
      category: 'Administrasi',
      urgent: true,
      description: 'Kartu ujian dapat diunduh dari Portal Siswa'
    },
    {
      id: 3,
      title: 'Libur Semester Ganjil',
      date: isoAddDays(20),
      category: 'Pengumuman',
      urgent: false,
      description: 'Libur semester: 23 Des - 5 Jan 2025'
    }
  ];

  const examSchedule = [
    { title: 'UTS Matematika', date: isoAddDays(7), location: 'Ruang Kelas', time: '07:30' },
    { title: 'UTS Fisika', date: isoAddDays(9), location: 'Lab Fisika', time: '10:15' }
  ];

  const reminderAssignments = assignments
    .filter((a) => a.status === 'pending')
    .map((a) => ({ ...a, daysLeft: daysUntil(a.dueDate) }))
    .filter((a) => a.daysLeft <= 3)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const reminderExams = examSchedule
    .map((e) => ({ ...e, daysLeft: daysUntil(e.date) }))
    .filter((e) => e.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const [registeredExkul, setRegisteredExkul] = useState<string[]>([]);
  const [bkBookings, setBkBookings] = useState<Array<{ id: string; counselorId: string; date: string; time: string }>>([]);
  const [inbox, setInbox] = useState<Array<{ id: string; from: string; subject: string; content: string; date: string; read: boolean }>>([]);
  const [outbox, setOutbox] = useState<Array<{ id: string; to: string; subject: string; content: string; date: string }>>([]);

  const loadStorage = React.useCallback(() => {
    try {
      const ex = JSON.parse(localStorage.getItem(STORAGE.exkul) || '[]');
      const bk = JSON.parse(localStorage.getItem(STORAGE.bk) || '[]');
      const ib = JSON.parse(localStorage.getItem(STORAGE.inbox) || '[]');
      const ob = JSON.parse(localStorage.getItem(STORAGE.outbox) || '[]');
      setRegisteredExkul(Array.isArray(ex) ? ex : []);
      setBkBookings(Array.isArray(bk) ? bk : []);
      setInbox(Array.isArray(ib) ? ib : []);
      setOutbox(Array.isArray(ob) ? ob : []);
    } catch {}
  }, [setBkBookings, setInbox, setOutbox, setRegisteredExkul]);

  const persistStorage = React.useCallback(() => {
    try {
      localStorage.setItem(STORAGE.exkul, JSON.stringify(registeredExkul));
      localStorage.setItem(STORAGE.bk, JSON.stringify(bkBookings));
      localStorage.setItem(STORAGE.inbox, JSON.stringify(inbox));
      localStorage.setItem(STORAGE.outbox, JSON.stringify(outbox));
    } catch {}
  }, [registeredExkul, bkBookings, inbox, outbox]);

  React.useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  React.useEffect(() => {
    persistStorage();
  }, [persistStorage]);

  const pendingAssignments = assignments
    .filter((a) => a.status === 'pending')
    .slice()
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const unreadCount = inbox.filter((m) => !m.read).length;
  const dueTodayCount = pendingAssignments.filter((a) => daysUntil(a.dueDate) === 0).length;

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
      label: 'Tugas Pending',
      value: `${pendingAssignments.length}`,
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      change: dueTodayCount > 0 ? `${dueTodayCount} deadline hari ini` : 'Tidak ada deadline hari ini',
      changeType: pendingAssignments.length > 0 ? 'warning' : 'neutral'
    },
    {
      label: 'Pesan Baru',
      value: `${unreadCount}`,
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
      change: unreadCount > 0 ? 'Perlu dibaca' : 'Tidak ada pesan baru',
      changeType: unreadCount > 0 ? 'warning' : 'neutral'
    }
  ];

  const bkBookingsPreview = bkBookings
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 2);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        accentColor="#1E4AB8"
        userRole="Siswa"
        userName={studentData.name}
        panelTitle="Portal Siswa"
        panelSubtitle={`${studentData.unit} • ${studentData.class}`}
      />

      <main className="flex-1 p-6 md:p-8">
        <div className="container-custom">
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
                {todaySchedule.slice(0, 3).map((schedule, idx) => (
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
                  onClick={() => router.push('/student/academic')}
                  className="text-sm text-[#1E4AB8] hover:underline flex items-center gap-1"
                >
                  Lihat Semua
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentGrades.slice(0, 3).map((grade, idx) => (
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
                <button
                  onClick={() => router.push('/student/academic')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E4AB8] hover:bg-blue-100 text-sm flex items-center gap-2"
                >
                  Buka Modul
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {pendingAssignments.length === 0 ? (
                  <div className="text-sm text-gray-600">Tidak ada tugas pending.</div>
                ) : null}
                {pendingAssignments.slice(0, 3).map((assignment) => (
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
                  </div>
                ))}
              </div>
            </div>
            {/* Extracurricular */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#1E4AB8]" />
                  Ekstrakurikuler
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Terdaftar: {registeredExkul.length}</span>
                  <button
                    onClick={() => onNavigate('student-extracurricular')}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E4AB8] hover:bg-blue-100 text-sm"
                  >
                    Buka Modul
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {registeredExkul.length === 0 ? (
                  <div className="text-sm text-gray-600">Belum ada ekskul diikuti. Gunakan tombol “Buka Modul” untuk mendaftar.</div>
                ) : (
                  registeredExkul.slice(0, 2).map((id) => {
                    const a = EXKUL_ACTIVITIES.find((x) => x.id === id);
                    if (!a) return null;
                    return (
                      <div key={id} className="p-3 border border-gray-200 rounded-xl">
                        <div className="font-medium text-gray-900">{a.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {a.day}, {a.time} • {a.location}
                        </div>
                      </div>
                    );
                  })
                )}
                {registeredExkul.length > 2 ? (
                  <div className="text-xs text-gray-500">+{registeredExkul.length - 2} ekskul lainnya</div>
                ) : null}
              </div>
            </div>

            {/* BK Counseling */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#1E4AB8]" />
                  Konseling BK
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Terbooking: {bkBookings.length}</span>
                  <button
                    onClick={() => onNavigate('student-counseling')}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E4AB8] hover:bg-blue-100 text-sm"
                  >
                    Buka Modul
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-3">Preview jadwal konseling kamu. Untuk booking/ubah jadwal, gunakan tombol “Buka Modul”.</div>
              {bkBookings.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-sm text-gray-700 mb-2">Jadwal Saya</h3>
                  <div className="space-y-2">
                    {bkBookingsPreview.map((b) => {
                      const c = BK_COUNSELORS.find((x) => x.id === b.counselorId);
                      return (
                        <div key={b.id} className="p-3 border border-gray-200 rounded-xl">
                          <div className="text-sm text-gray-700">
                            <div>{new Date(b.date).toLocaleDateString('id-ID')} • {b.time}</div>
                            <div className="text-gray-500">{c?.name} • {c?.specialty}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">Belum ada booking BK.</div>
              )}
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
                            announcement.category === 'Administrasi' ? 'bg-purple-100 text-purple-700' :
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

            {/* Reminders */}
            <div className="bg-yellow-50 rounded-2xl p-6 shadow-soft border border-yellow-100">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-6 h-6 text-yellow-700" />
                <h2 className="text-xl text-yellow-900">Pengingat</h2>
              </div>
              <div className="space-y-3">
                {reminderAssignments.length === 0 && reminderExams.length === 0 ? (
                  <div className="text-sm text-yellow-800">Tidak ada pengingat dalam 7 hari ke depan.</div>
                ) : null}
                {reminderAssignments.slice(0, 3).map((a) => (
                  <div key={`assignment-${a.id}`} className="bg-white/70 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-xs text-yellow-800 mb-1">Tugas • {a.subject}</div>
                        <div className="font-medium text-gray-900">{a.title}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          Deadline: {new Date(a.dueDate).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        a.daysLeft < 0 ? 'bg-red-100 text-red-700' : a.daysLeft === 0 ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {a.daysLeft < 0 ? `Terlambat ${Math.abs(a.daysLeft)} hari` : a.daysLeft === 0 ? 'Hari ini' : `H-${a.daysLeft}`}
                      </div>
                    </div>
                  </div>
                ))}
                {reminderExams.slice(0, 2).map((e, idx) => (
                  <div key={`exam-${idx}`} className="bg-white/70 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-xs text-yellow-800 mb-1">Ujian</div>
                        <div className="font-medium text-gray-900">{e.title}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {new Date(e.date).toLocaleDateString('id-ID')} • {e.time} • {e.location}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        e.daysLeft < 0 ? 'bg-red-100 text-red-700' : e.daysLeft === 0 ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {e.daysLeft < 0 ? `Lewat ${Math.abs(e.daysLeft)} hari` : e.daysLeft === 0 ? 'Hari ini' : `H-${e.daysLeft}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-[#1E4AB8]" />
                  <h2 className="text-xl">Pesan</h2>
                </div>
                <button
                  onClick={() => onNavigate('student-messages')}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1E4AB8] hover:bg-blue-100 text-sm"
                >
                  Buka Modul
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-gray-700 mb-2">Inbox</h3>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 mb-1">Belum dibaca: {inbox.filter((m) => !m.read).length}</div>
                    {inbox.slice(0, 2).map((m) => (
                      <div key={m.id} className={`p-3 rounded-xl border ${m.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="text-sm font-medium text-gray-900 truncate">{m.subject}</div>
                        <div className="text-xs text-gray-600">{m.from} • {new Date(m.date).toLocaleString('id-ID')}</div>
                      </div>
                    ))}
                    {inbox.length === 0 && <div className="text-sm text-gray-500">Tidak ada pesan</div>}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-gray-700 mb-2">Outbox</h3>
                  <div className="space-y-2">
                    {outbox.slice(0, 2).map((m) => (
                      <div key={m.id} className="p-3 rounded-xl border bg-gray-50 border-gray-200">
                        <div className="text-sm font-medium text-gray-900 truncate">{m.subject}</div>
                        <div className="text-xs text-gray-600">{m.to} • {new Date(m.date).toLocaleString('id-ID')}</div>
                      </div>
                    ))}
                    {outbox.length === 0 && <div className="text-sm text-gray-500">Belum ada pesan terkirim</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => router.push('/student/academic')}
                  className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Lihat Nilai Lengkap
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => router.push('/student/messages')}
                  className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Modul Pesan
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => router.push('/student/extracurricular')}
                  className="w-full px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Modul Ekskul
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => router.push('/student/counseling')}
                  className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Modul BK/Konseling
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/student/profile')}
                  className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Buka Profil
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
      <Toaster richColors />
    </div>
  );
}

