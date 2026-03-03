'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { ClipboardCheck, Calendar, Users, TrendingDown, CheckCircle, XCircle, AlertCircle, Clock, Download, Filter, Search } from 'lucide-react';

interface Student {
  nis: string;
  name: string;
  class: string;
  hadir: number;
  sakit: number;
  izin: number;
  alpha: number;
  percentage: number;
}

export default function AdminAttendancePage() {
  const { menuItems } = useNavigationMenu('admin');
  const [selectedClass, setSelectedClass] = useState('XII IPA 1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const classes = ['XII IPA 1', 'XII IPA 2', 'XI IPA 1', 'XI IPA 2', 'X IPA 1', 'X IPA 2'];

  const students: Student[] = [
    { nis: '2024001', name: 'Muhammad Rizki Pratama', class: 'XII IPA 1', hadir: 105, sakit: 3, izin: 2, alpha: 0, percentage: 95 },
    { nis: '2024002', name: 'Siti Aisyah Putri', class: 'XII IPA 1', hadir: 108, sakit: 1, izin: 1, alpha: 0, percentage: 98 },
    { nis: '2024003', name: 'Ahmad Fauzi Rahman', class: 'XII IPA 1', hadir: 100, sakit: 5, izin: 3, alpha: 2, percentage: 91 },
    { nis: '2024004', name: 'Fatimah Azzahra', class: 'XII IPA 1', hadir: 107, sakit: 2, izin: 1, alpha: 0, percentage: 97 },
    { nis: '2024005', name: 'Abdullah Ibrahim', class: 'XII IPA 1', hadir: 103, sakit: 4, izin: 2, alpha: 1, percentage: 94 },
    { nis: '2024006', name: 'Maryam Khadijah', class: 'XII IPA 1', hadir: 109, sakit: 1, izin: 0, alpha: 0, percentage: 99 }
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nis.includes(searchQuery)
  );

  const totalStudents = students.length;
  const averageAttendance = Math.round(students.reduce((sum, s) => sum + s.percentage, 0) / students.length);
  const presentToday = students.filter(s => s.percentage > 90).length;
  const lowAttendance = students.filter(s => s.percentage < 85).length;

  const stats = [
    {
      label: 'Rata-rata Kehadiran',
      value: `${averageAttendance}%`,
      icon: TrendingDown,
      color: 'from-blue-500 to-blue-600',
      detail: 'Bulan ini'
    },
    {
      label: 'Hadir Hari Ini',
      value: `${presentToday}/${totalStudents}`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      detail: 'Siswa hadir'
    },
    {
      label: 'Kehadiran Rendah',
      value: lowAttendance,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      detail: 'Perlu perhatian'
    },
    {
      label: 'Total Siswa',
      value: totalStudents,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      detail: selectedClass
    }
  ];

  const monthlyStats = [
    { month: 'Juli', hadir: 94, sakit: 3, izin: 2, alpha: 1 },
    { month: 'Agustus', hadir: 95, sakit: 2, izin: 2, alpha: 1 },
    { month: 'September', hadir: 97, sakit: 2, izin: 1, alpha: 0 },
    { month: 'Oktober', hadir: 96, sakit: 2, izin: 1, alpha: 1 },
    { month: 'November', hadir: 95, sakit: 3, izin: 2, alpha: 0 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} siteName="Admin Panel" />
      <main className="flex-1 ml-64 p-8">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl mb-2">Manajemen Absensi</h1>
                <p className="text-gray-600">Kelola kehadiran siswa semua kelas</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-all flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span>Export Laporan</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full py-2 bg-transparent outline-none"
                >
                  {classes.map(cls => (
                    <option key={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full py-2 bg-transparent outline-none"
                >
                </input>
              </div>

              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama atau NIS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Attendance Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl mb-6">Daftar Kehadiran - {selectedClass}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">NIS</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Nama Siswa</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Hadir</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Sakit</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Izin</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Alpha</th>
                      <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">Persentase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => (
                      <tr key={student.nis} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-4 py-3 text-sm">{student.nis}</td>
                        <td className="px-4 py-3 font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-center text-green-600">{student.hadir}</td>
                        <td className="px-4 py-3 text-center text-yellow-600">{student.sakit}</td>
                        <td className="px-4 py-3 text-center text-blue-600">{student.izin}</td>
                        <td className="px-4 py-3 text-center text-red-600">{student.alpha}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  student.percentage >= 95 ? 'bg-green-500' :
                                  student.percentage >= 85 ? 'bg-blue-500' :
                                  'bg-orange-500'
                                }`}
                                style={{ width: `${student.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{student.percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - Statistics */}
            <div className="space-y-6">
              {/* Monthly Trend */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg mb-4">Tren Kehadiran Bulanan</h3>
                <div className="space-y-3">
                  {monthlyStats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{stat.month}</span>
                        <span className="text-sm text-gray-600">{stat.hadir}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#1E4AB8] h-2 rounded-full"
                          style={{ width: `${stat.hadir}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg mb-4">Status Kehadiran</h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium">Hadir</span>
                    </div>
                    <span className="text-2xl font-medium text-green-600">
                      {students.reduce((sum, s) => sum + s.hadir, 0)}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      </div>
                      <span className="font-medium">Sakit</span>
                    </div>
                    <span className="text-2xl font-medium text-yellow-600">
                      {students.reduce((sum, s) => sum + s.sakit, 0)}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium">Izin</span>
                    </div>
                    <span className="text-2xl font-medium text-blue-600">
                      {students.reduce((sum, s) => sum + s.izin, 0)}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="font-medium">Alpha</span>
                    </div>
                    <span className="text-2xl font-medium text-red-600">
                      {students.reduce((sum, s) => sum + s.alpha, 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Students Need Attention */}
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Perlu Perhatian
                </h3>
                <div className="space-y-2">
                  {students
                    .filter(s => s.percentage < 85)
                    .map((student, idx) => (
                      <div key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Kehadiran: {student.percentage}% • Alpha: {student.alpha}x
                        </p>
                      </div>
                    ))}
                  {students.filter(s => s.percentage < 85).length === 0 && (
                    <p className="text-sm text-gray-600 text-center py-4">
                      Semua siswa memiliki kehadiran baik ✓
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

