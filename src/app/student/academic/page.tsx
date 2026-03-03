'use client';

import React, { useState } from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { BookOpen, TrendingUp, Award, Calendar, FileText, Download, Target, Clock } from 'lucide-react';

export default function StudentAcademicPage() {
  const { menuItems } = useNavigationMenu('student');
  const [selectedTab, setSelectedTab] = useState<'grades' | 'schedule' | 'attendance' | 'assignments'>('grades');
  const [selectedSemester, setSelectedSemester] = useState('Genap 2024/2025');

  const studentData = {
    nis: '2024001',
    name: 'Muhammad Rizki Pratama',
    class: 'XII IPA 1',
    unit: 'SMAIT'
  };

  const subjects = [
    { 
      name: 'Matematika', 
      teacher: 'Ustadz Ahmad',
      uts: 85, 
      uas: 92, 
      tugas: 88, 
      kehadiran: 95,
      finalGrade: 89,
      letter: 'A',
      kkm: 75
    },
    { 
      name: 'Fisika', 
      teacher: 'Ustadzah Siti',
      uts: 82, 
      uas: 88, 
      tugas: 85, 
      kehadiran: 98,
      finalGrade: 86,
      letter: 'A-',
      kkm: 75
    },
    { 
      name: 'Kimia', 
      teacher: 'Ustadz Hasan',
      uts: 78, 
      uas: 85, 
      tugas: 82, 
      kehadiran: 92,
      finalGrade: 82,
      letter: 'B+',
      kkm: 75
    },
    { 
      name: 'Biologi', 
      teacher: 'Ustadzah Fatimah',
      uts: 88, 
      uas: 90, 
      tugas: 90, 
      kehadiran: 96,
      finalGrade: 90,
      letter: 'A',
      kkm: 75
    },
    { 
      name: 'Bahasa Inggris', 
      teacher: 'Mr. Rizki',
      uts: 90, 
      uas: 95, 
      tugas: 92, 
      kehadiran: 100,
      finalGrade: 93,
      letter: 'A',
      kkm: 75
    },
    { 
      name: 'Bahasa Indonesia', 
      teacher: 'Ustadzah Maryam',
      uts: 85, 
      uas: 88, 
      tugas: 87, 
      kehadiran: 94,
      finalGrade: 87,
      letter: 'A-',
      kkm: 75
    },
    { 
      name: 'Al-Quran Hadits', 
      teacher: 'Ustadz Abdullah',
      uts: 92, 
      uas: 95, 
      tugas: 94, 
      kehadiran: 100,
      finalGrade: 94,
      letter: 'A',
      kkm: 75
    },
    { 
      name: 'Akidah Akhlak', 
      teacher: 'Ustadz Ibrahim',
      uts: 88, 
      uas: 90, 
      tugas: 89, 
      kehadiran: 97,
      finalGrade: 89,
      letter: 'A',
      kkm: 75
    }
  ];

  const schedule = [
    { day: 'Senin', classes: [
      { time: '07:00-08:30', subject: 'Matematika', teacher: 'Ustadz Ahmad', room: 'XII IPA 1' },
      { time: '08:30-10:00', subject: 'Fisika', teacher: 'Ustadzah Siti', room: 'Lab Fisika' },
      { time: '10:15-11:45', subject: 'Kimia', teacher: 'Ustadz Hasan', room: 'Lab Kimia' },
      { time: '12:45-14:15', subject: 'Tahfidz', teacher: 'Ustadz Abdullah', room: 'Masjid' }
    ]},
    { day: 'Selasa', classes: [
      { time: '07:00-08:30', subject: 'Bahasa Inggris', teacher: 'Mr. Rizki', room: 'XII IPA 1' },
      { time: '08:30-10:00', subject: 'Biologi', teacher: 'Ustadzah Fatimah', room: 'Lab Bio' },
      { time: '10:15-11:45', subject: 'Al-Quran Hadits', teacher: 'Ustadz Abdullah', room: 'XII IPA 1' },
      { time: '12:45-14:15', subject: 'Olahraga', teacher: 'Ustadz Budi', room: 'Lapangan' }
    ]},
    { day: 'Rabu', classes: [
      { time: '07:00-08:30', subject: 'Matematika', teacher: 'Ustadz Ahmad', room: 'XII IPA 1' },
      { time: '08:30-10:00', subject: 'Bahasa Indonesia', teacher: 'Ustadzah Maryam', room: 'XII IPA 1' },
      { time: '10:15-11:45', subject: 'Fisika', teacher: 'Ustadzah Siti', room: 'XII IPA 1' },
      { time: '12:45-14:15', subject: 'Akidah Akhlak', teacher: 'Ustadz Ibrahim', room: 'XII IPA 1' }
    ]},
    { day: 'Kamis', classes: [
      { time: '07:00-08:30', subject: 'Kimia', teacher: 'Ustadz Hasan', room: 'XII IPA 1' },
      { time: '08:30-10:00', subject: 'Biologi', teacher: 'Ustadzah Fatimah', room: 'XII IPA 1' },
      { time: '10:15-11:45', subject: 'Sejarah Islam', teacher: 'Ustadz Umar', room: 'XII IPA 1' },
      { time: '12:45-14:15', subject: 'Tahfidz', teacher: 'Ustadz Abdullah', room: 'Masjid' }
    ]},
    { day: 'Jumat', classes: [
      { time: '07:00-08:00', subject: 'Kultum', teacher: 'Rotating', room: 'Masjid' },
      { time: '08:15-09:45', subject: 'Matematika', teacher: 'Ustadz Ahmad', room: 'XII IPA 1' },
      { time: '10:00-11:30', subject: 'Bahasa Inggris', teacher: 'Mr. Rizki', room: 'XII IPA 1' }
    ]}
  ];

  const attendance = [
    { month: 'Juli', hadir: 20, sakit: 1, izin: 0, alpha: 0, percentage: 95 },
    { month: 'Agustus', hadir: 22, sakit: 0, izin: 1, alpha: 0, percentage: 96 },
    { month: 'September', hadir: 21, sakit: 0, izin: 0, alpha: 0, percentage: 100 },
    { month: 'Oktober', hadir: 22, sakit: 1, izin: 0, alpha: 0, percentage: 96 },
    { month: 'November', hadir: 20, sakit: 0, izin: 1, alpha: 0, percentage: 95 }
  ];

  const assignments = [
    {
      subject: 'Matematika',
      title: 'Tugas Integral dan Diferensial',
      dueDate: '2024-12-10',
      status: 'submitted',
      score: 92,
      submittedDate: '2024-12-08'
    },
    {
      subject: 'Fisika',
      title: 'Laporan Praktikum Gerak Parabola',
      dueDate: '2024-12-10',
      status: 'pending',
      score: null,
      submittedDate: null
    },
    {
      subject: 'Kimia',
      title: 'Analisis Reaksi Kimia',
      dueDate: '2024-12-12',
      status: 'graded',
      score: 88,
      submittedDate: '2024-12-10'
    },
    {
      subject: 'Bahasa Inggris',
      title: 'Essay: My Future Career',
      dueDate: '2024-12-15',
      status: 'pending',
      score: null,
      submittedDate: null
    }
  ];

  const averageGrade = subjects.reduce((sum, s) => sum + s.finalGrade, 0) / subjects.length;
  const totalAttendance = attendance.reduce((sum, a) => sum + a.hadir, 0);
  const totalDays = attendance.reduce((sum, a) => sum + a.hadir + a.sakit + a.izin + a.alpha, 0);
  const attendancePercentage = Math.round((totalAttendance / totalDays) * 100);

  const stats = [
    {
      label: 'Rata-rata Nilai',
      value: averageGrade.toFixed(2),
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      detail: '8 mata pelajaran'
    },
    {
      label: 'Kehadiran',
      value: `${attendancePercentage}%`,
      icon: Target,
      color: 'from-green-500 to-green-600',
      detail: `${totalAttendance} dari ${totalDays} hari`
    },
    {
      label: 'Tugas Selesai',
      value: `${assignments.filter(a => a.status !== 'pending').length}/${assignments.length}`,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      detail: 'Semester ini'
    },
    {
      label: 'Ranking Kelas',
      value: '#3',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      detail: 'Dari 32 siswa'
    }
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Portal Siswa - Akademik"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl mb-2 font-bold">Data Akademik</h1>
              <p className="text-white/90">{studentData.name} • {studentData.class} • {studentData.unit}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select 
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-white border-0 outline-none focus:ring-2 focus:ring-white/30"
              >
                <option className="text-gray-800" value="Genap 2024/2025">Semester Genap 2024/2025</option>
                <option className="text-gray-800" value="Ganjil 2024/2025">Semester Ganjil 2024/2025</option>
                <option className="text-gray-800" value="Genap 2023/2024">Semester Genap 2023/2024</option>
              </select>
              <button className="px-6 py-2 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-all flex items-center gap-2 font-medium">
                <Download className="w-5 h-5" />
                <span>Download Rapor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl mb-1 font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setSelectedTab('grades')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedTab === 'grades'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Nilai & Rapor
              </button>
              <button
                onClick={() => setSelectedTab('schedule')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedTab === 'schedule'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Jadwal Pelajaran
              </button>
              <button
                onClick={() => setSelectedTab('attendance')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedTab === 'attendance'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Kehadiran
              </button>
              <button
                onClick={() => setSelectedTab('assignments')}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedTab === 'assignments'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Tugas & Penilaian
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Grades Tab */}
            {selectedTab === 'grades' && (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Mata Pelajaran</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Guru</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">UTS</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">UAS</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Tugas</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Kehadiran</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">KKM</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Nilai Akhir</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, idx) => (
                        <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="px-4 py-3 font-medium text-gray-800">{subject.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{subject.teacher}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{subject.uts}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{subject.uas}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{subject.tugas}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{subject.kehadiran}%</td>
                          <td className="px-4 py-3 text-center text-gray-500">{subject.kkm}</td>
                          <td className={`px-4 py-3 text-center font-bold text-lg ${getGradeColor(subject.finalGrade)}`}>
                            {subject.finalGrade}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              subject.letter.startsWith('A') ? 'bg-green-100 text-green-700' :
                              subject.letter.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {subject.letter}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                      <tr>
                        <td colSpan={7} className="px-4 py-3 font-bold text-gray-700">Rata-rata</td>
                        <td className="px-4 py-3 text-center font-bold text-lg text-[#1E4AB8]">
                          {averageGrade.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">A</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Performance Chart */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="text-lg mb-4 font-bold text-gray-800">Grafik Performa</h3>
                  <div className="space-y-3">
                    {subjects.map((subject, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                          <span className="text-sm text-gray-600">{subject.finalGrade}</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              subject.finalGrade >= 90 ? 'bg-green-500' :
                              subject.finalGrade >= 80 ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${subject.finalGrade}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {selectedTab === 'schedule' && (
              <div className="space-y-6">
                {schedule.map((day, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="bg-[#1E4AB8] text-white px-6 py-3">
                      <h3 className="font-bold">{day.day}</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {day.classes.map((cls, clsIdx) => (
                        <div key={clsIdx} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-center min-w-[80px]">
                                <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                                <p className="text-xs text-gray-600">{cls.time}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800 mb-1">{cls.subject}</h4>
                                <p className="text-sm text-gray-600">{cls.teacher}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{cls.room}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Attendance Tab */}
            {selectedTab === 'attendance' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <p className="text-sm text-gray-600 mb-1">Total Hadir</p>
                    <p className="text-3xl font-bold text-green-600">{totalAttendance}</p>
                    <p className="text-xs text-gray-500 mt-1">Hari</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <p className="text-sm text-gray-600 mb-1">Persentase Kehadiran</p>
                    <p className="text-3xl font-bold text-blue-600">{attendancePercentage}%</p>
                    <p className="text-xs text-gray-500 mt-1">Excellent!</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                    <p className="text-sm text-gray-600 mb-1">Total Sakit/Izin</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {attendance.reduce((sum, a) => sum + a.sakit + a.izin, 0)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hari</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Bulan</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Hadir</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Sakit</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Izin</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Alpha</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Persentase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((month, idx) => (
                        <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                          <td className="px-4 py-3 font-medium text-gray-800">{month.month}</td>
                          <td className="px-4 py-3 text-center text-green-600 font-medium">{month.hadir}</td>
                          <td className="px-4 py-3 text-center text-yellow-600">{month.sakit}</td>
                          <td className="px-4 py-3 text-center text-blue-600">{month.izin}</td>
                          <td className="px-4 py-3 text-center text-red-600">{month.alpha}</td>
                          <td className="px-4 py-3 text-center font-bold text-gray-800">{month.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Assignments Tab */}
            {selectedTab === 'assignments' && (
              <div className="space-y-4">
                {assignments.map((assignment, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] transition-colors bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">{assignment.subject}</span>
                          <span className="text-xs text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        <h4 className="font-bold text-gray-800">{assignment.title}</h4>
                        {assignment.submittedDate && (
                          <p className="text-xs text-green-600 mt-1">Submitted: {new Date(assignment.submittedDate).toLocaleDateString('id-ID')}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {assignment.score !== null ? (
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Nilai</p>
                            <span className="text-xl font-bold text-[#1E4AB8]">{assignment.score}</span>
                          </div>
                        ) : (
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Status</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              assignment.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {assignment.status === 'submitted' ? 'Diserahkan' : 'Belum Dinilai'}
                            </span>
                          </div>
                        )}
                        <button className="p-2 text-gray-400 hover:text-[#1E4AB8] hover:bg-blue-50 rounded-lg transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

