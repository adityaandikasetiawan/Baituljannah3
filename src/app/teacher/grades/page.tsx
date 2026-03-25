'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Award, BookOpen, Calendar, CheckCircle, ChevronRight, FileText, Search, Users } from 'lucide-react';

type GradeStatus = 'draft' | 'published';

export default function TeacherGradesPage() {
  const { menuItems } = useNavigationMenu('teacher');
  const [selectedClass, setSelectedClass] = React.useState('XII IPA 1');
  const [query, setQuery] = React.useState('');

  const teacherData = {
    nip: 'GT-2020-001',
    name: 'Ustadz Ahmad Fauzi',
    subject: 'Matematika',
    unit: 'SMAIT',
    classes: ['XII IPA 1', 'XII IPA 2', 'XI IPA 1'],
  };

  const assessments: {
    id: string;
    className: string;
    title: string;
    date: string;
    status: GradeStatus;
    submitted: number;
    total: number;
    average: number;
  }[] = [
    { id: 'A1', className: 'XII IPA 1', title: 'UTS Matematika', date: '2024-11-25', status: 'published', submitted: 32, total: 32, average: 86.8 },
    { id: 'A2', className: 'XII IPA 2', title: 'UTS Matematika', date: '2024-11-25', status: 'draft', submitted: 28, total: 30, average: 84.2 },
    { id: 'A3', className: 'XI IPA 1', title: 'Quiz Trigonometri', date: '2024-12-02', status: 'published', submitted: 34, total: 34, average: 88.4 },
    { id: 'A4', className: 'XII IPA 1', title: 'Tugas Integral', date: '2024-12-06', status: 'draft', submitted: 28, total: 32, average: 82.5 },
  ];

  const recentEntries: {
    student: string;
    className: string;
    assessment: string;
    score: number;
    date: string;
  }[] = [
    { student: 'Muhammad Rizki', className: 'XII IPA 1', assessment: 'UTS Matematika', score: 92, date: '2024-11-25' },
    { student: 'Siti Aisyah', className: 'XII IPA 1', assessment: 'UTS Matematika', score: 95, date: '2024-11-25' },
    { student: 'Ahmad Fauzi', className: 'XII IPA 2', assessment: 'UTS Matematika', score: 88, date: '2024-11-25' },
    { student: 'Fatimah Zahra', className: 'XII IPA 2', assessment: 'UTS Matematika', score: 90, date: '2024-11-25' },
    { student: 'Rina Wati', className: 'XI IPA 1', assessment: 'Quiz Trigonometri', score: 91, date: '2024-12-02' },
  ];

  const classAssessments = assessments.filter((a) => a.className === selectedClass);
  const filteredEntries = recentEntries.filter((e) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      e.student.toLowerCase().includes(q) ||
      e.className.toLowerCase().includes(q) ||
      e.assessment.toLowerCase().includes(q)
    );
  });

  const stats = [
    {
      label: 'Kelas Diampu',
      value: teacherData.classes.length.toString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      detail: 'Semester ini',
    },
    {
      label: 'Penilaian Aktif',
      value: assessments.filter((a) => a.status === 'draft').length.toString(),
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      detail: 'Masih draft',
    },
    {
      label: 'Dipublikasikan',
      value: assessments.filter((a) => a.status === 'published').length.toString(),
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      detail: 'Siap dilihat',
    },
    {
      label: 'Rata-rata Mapel',
      value: (
        Math.round((assessments.reduce((sum, a) => sum + a.average, 0) / assessments.length) * 10) / 10
      ).toString(),
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      detail: teacherData.subject,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 75) return 'text-yellow-700 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

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
          <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl mb-2">Nilai & Penilaian</h1>
                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  <span>NIP: {teacherData.nip}</span>
                  <span>•</span>
                  <span>{teacherData.subject}</span>
                  <span>•</span>
                  <span>{teacherData.unit}</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-all flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>Buat Penilaian</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl mb-1">{s.value}</p>
                  <p className="text-sm text-gray-600 mb-1">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Pilih Kelas</p>
                <div className="flex flex-wrap gap-2">
                  {teacherData.classes.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setSelectedClass(cls)}
                      className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                        selectedClass === cls ? 'bg-[#1E4AB8] text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-80">
                <p className="text-sm text-gray-600 mb-2">Cari (Siswa/Kelas/Penilaian)</p>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ketik nama siswa atau penilaian..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl flex items-center gap-2">
                    <FileText className="w-6 h-6 text-[#1E4AB8]" />
                    Penilaian Kelas {selectedClass}
                  </h2>
                  <button className="text-sm text-[#1E4AB8] hover:underline flex items-center gap-1">
                    Lihat Semua
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {classAssessments.map((a) => (
                    <div
                      key={a.id}
                      className="p-4 rounded-xl border border-gray-200 hover:border-[#1E4AB8]/30 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-medium mb-1 truncate">{a.title}</p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(a.date).toLocaleDateString('id-ID')}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="w-4 h-4 text-gray-400" />
                              {a.submitted}/{a.total}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                              <Award className="w-4 h-4 text-gray-400" />
                              Avg {a.average}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              a.status === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {a.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                          <button className="px-3 py-1 rounded-lg bg-[#1E4AB8] text-white text-xs hover:bg-[#1a3d9a] transition-colors">
                            Kelola
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {classAssessments.length === 0 && <p className="text-sm text-gray-600">Belum ada penilaian untuk kelas ini.</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-[#1E4AB8]" />
                  Entri Nilai Terbaru
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Siswa</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Kelas</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Penilaian</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Nilai</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEntries.map((e, idx) => (
                        <tr key={`${e.student}-${idx}`} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <td className="px-4 py-3 text-sm font-medium">{e.student}</td>
                          <td className="px-4 py-3 text-sm">{e.className}</td>
                          <td className="px-4 py-3 text-sm">{e.assessment}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(e.score)}`}>{e.score}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{new Date(e.date).toLocaleDateString('id-ID')}</td>
                        </tr>
                      ))}
                      {filteredEntries.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-600">
                            Tidak ada data yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1E4AB8]" />
                  Ringkasan Hari Ini
                </h2>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Penilaian Dibuat</p>
                    <p className="text-2xl text-gray-800">1</p>
                    <p className="text-xs text-gray-500">Draft: Tugas Integral</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Perlu Input Nilai</p>
                    <p className="text-2xl text-orange-600">8</p>
                    <p className="text-xs text-gray-500">Dari XII IPA 1</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg mb-4">Aksi Cepat</h2>
                <div className="space-y-2">
                  <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-left flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Input Nilai Massal
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Publish Nilai
                    </span>
                    <ChevronRight className="w-5 h-5" />
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

