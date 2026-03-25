'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Users, ClipboardCheck, Calendar, Bell, TrendingUp, Clock, FileText, Award, Plus, Eye, Edit } from 'lucide-react';

export default function TeacherDashboardPage() {
  const { menuItems } = useNavigationMenu('teacher');

  const teacherData = {
    nip: 'GT-2020-001',
    name: 'Ustadz Ahmad Fauzi',
    subject: 'Matematika',
    classes: ['XII IPA 1', 'XII IPA 2', 'XI IPA 1'],
    unit: 'SMAIT'
  };

  const stats = [
    {
      label: 'Total Siswa',
      value: '96',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      detail: '3 kelas'
    },
    {
      label: 'Rata-rata Kelas',
      value: '86.5',
      icon: Award,
      color: 'from-green-500 to-green-600',
      detail: 'Nilai rata-rata'
    },
    {
      label: 'Kehadiran',
      value: '94%',
      icon: ClipboardCheck,
      color: 'from-purple-500 to-purple-600',
      detail: 'Bulan ini'
    },
    {
      label: 'Tugas Pending',
      value: '12',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      detail: 'Perlu dinilai'
    }
  ];

  const todaySchedule = [
    { time: '07:00-08:30', class: 'XII IPA 1', subject: 'Matematika', topic: 'Integral Tentu', room: 'Lab Komputer' },
    { time: '10:15-11:45', class: 'XII IPA 2', subject: 'Matematika', topic: 'Integral Tak Tentu', room: 'Ruang 12-2' },
    { time: '12:45-14:15', class: 'XI IPA 1', subject: 'Matematika', topic: 'Trigonometri', room: 'Ruang 11-1' }
  ];

  const recentGrades = [
    { studentName: 'Muhammad Rizki', class: 'XII IPA 1', assignment: 'UTS Matematika', score: 92, date: '2024-11-25' },
    { studentName: 'Siti Aisyah', class: 'XII IPA 1', assignment: 'UTS Matematika', score: 95, date: '2024-11-25' },
    { studentName: 'Ahmad Fauzi', class: 'XII IPA 2', assignment: 'UTS Matematika', score: 88, date: '2024-11-25' },
    { studentName: 'Fatimah Zahra', class: 'XII IPA 2', assignment: 'UTS Matematika', score: 90, date: '2024-11-25' }
  ];

  const pendingAssignments = [
    { 
      class: 'XII IPA 1', 
      title: 'Tugas Integral', 
      dueDate: '2024-12-10', 
      submitted: 28,
      total: 32,
      needGrading: 8
    },
    { 
      class: 'XII IPA 2', 
      title: 'Laporan Praktikum', 
      dueDate: '2024-12-12', 
      submitted: 25,
      total: 30,
      needGrading: 4
    },
    { 
      class: 'XI IPA 1', 
      title: 'Quiz Trigonometri', 
      dueDate: '2024-12-15', 
      submitted: 20,
      total: 34,
      needGrading: 0
    }
  ];

  const announcements = [
    {
      title: 'Rapat Guru - Evaluasi Semester',
      date: '2024-12-08',
      time: '14:00',
      location: 'Ruang Guru',
      urgent: true
    },
    {
      title: 'Deadline Input Nilai UTS',
      date: '2024-12-10',
      time: '17:00',
      location: 'Sistem Akademik',
      urgent: true
    },
    {
      title: 'Workshop Pembelajaran Digital',
      date: '2024-12-15',
      time: '09:00',
      location: 'Aula',
      urgent: false
    }
  ];

  const classPerformance = [
    { class: 'XII IPA 1', students: 32, average: 87.5, highest: 95, lowest: 75, attendance: 96 },
    { class: 'XII IPA 2', students: 30, average: 85.2, highest: 92, lowest: 72, attendance: 94 },
    { class: 'XI IPA 1', students: 34, average: 86.8, highest: 94, lowest: 78, attendance: 95 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        accentColor="#1E4AB8"
        userRole="Guru"
        userName={teacherData.name}
        panelTitle="Portal Guru"
        panelSubtitle={`${teacherData.unit} • ${teacherData.subject}`}
      />

      <main className="flex-1 p-6 md:p-8">
        <div className="container-custom">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl mb-2">Selamat Datang, {teacherData.name}! 👨‍🏫</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <span>NIP: {teacherData.nip}</span>
                <span>•</span>
                <span>Guru {teacherData.subject}</span>
                <span>•</span>
                <span>{teacherData.unit}</span>
                <span>•</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {teacherData.classes.length} Kelas Diampu
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
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
                  <div key={idx} className="p-4 bg-blue-50 border-l-4 border-[#1E4AB8] rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{schedule.time}</span>
                          <span className="px-2 py-0.5 bg-[#1E4AB8] text-white text-xs rounded-full">
                            {schedule.class}
                          </span>
                        </div>
                        <h3 className="font-medium mb-1">{schedule.subject} - {schedule.topic}</h3>
                        <p className="text-sm text-gray-600">📍 {schedule.room}</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Mulai Kelas
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Assignments */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#1E4AB8]" />
                  Tugas Menunggu Penilaian
                </h2>
                <button className="px-4 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Buat Tugas Baru</span>
                </button>
              </div>
              <div className="space-y-3">
                {pendingAssignments.map((assignment, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {assignment.class}
                          </span>
                          {assignment.needGrading > 0 && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                              {assignment.needGrading} perlu dinilai
                            </span>
                          )}
                        </div>
                        <h3 className="font-medium mb-1">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">
                          Deadline: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {assignment.submitted}/{assignment.total} siswa
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#1E4AB8]" />
                Performa Kelas
              </h2>
              <div className="space-y-4">
                {classPerformance.map((cls, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{cls.class}</h3>
                      <span className="text-sm text-gray-600">{cls.students} siswa</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Rata-rata</p>
                        <p className="text-lg font-medium text-[#1E4AB8]">{cls.average}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Tertinggi</p>
                        <p className="text-lg font-medium text-green-600">{cls.highest}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Terendah</p>
                        <p className="text-lg font-medium text-orange-600">{cls.lowest}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Kehadiran</p>
                        <p className="text-lg font-medium text-purple-600">{cls.attendance}%</p>
                      </div>
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
                {announcements.map((announcement, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      announcement.urgent 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {announcement.urgent && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium mb-1">{announcement.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(announcement.date).toLocaleDateString('id-ID')} • {announcement.time}
                      </p>
                      <p>📍 {announcement.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Grades */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg mb-4">Nilai Terbaru</h2>
              <div className="space-y-3">
                {recentGrades.map((grade, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{grade.studentName}</p>
                      <span className="text-lg font-medium text-[#1E4AB8]">{grade.score}</span>
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <span>{grade.class}</span>
                      <span>•</span>
                      <span>{grade.assignment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Input Nilai
                  </span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">12</span>
                </button>
                <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5" />
                    Input Absensi
                  </span>
                </button>
                <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Buat Tugas
                  </span>
                </button>
                <button className="w-full px-4 py-3 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Lihat Jadwal
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

