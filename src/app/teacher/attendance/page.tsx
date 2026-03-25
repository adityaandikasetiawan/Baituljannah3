'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Calendar, CheckCircle, ClipboardCheck, Download, Filter, Search, Users, XCircle } from 'lucide-react';

type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';

export default function TeacherAttendancePage() {
  const { menuItems } = useNavigationMenu('teacher');

  const teacherData = {
    nip: 'GT-2020-001',
    name: 'Ustadz Ahmad Fauzi',
    subject: 'Matematika',
    unit: 'SMAIT',
    classes: ['XII IPA 1', 'XII IPA 2', 'XI IPA 1'],
  };

  const [selectedClass, setSelectedClass] = React.useState(teacherData.classes[0]);
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | AttendanceStatus>('all');

  const [rows, setRows] = React.useState<{ id: string; name: string; nis: string; status: AttendanceStatus; note?: string }[]>([
    { id: 'S-01', name: 'Muhammad Rizki', nis: '2023-1201', status: 'Hadir' },
    { id: 'S-02', name: 'Siti Aisyah', nis: '2023-1202', status: 'Hadir' },
    { id: 'S-03', name: 'Ahmad Fauzan', nis: '2023-1203', status: 'Izin', note: 'Kegiatan keluarga' },
    { id: 'S-04', name: 'Fatimah Zahra', nis: '2023-1204', status: 'Sakit', note: 'Demam' },
    { id: 'S-05', name: 'Rina Wati', nis: '2023-1205', status: 'Hadir' },
    { id: 'S-06', name: 'Budi Santoso', nis: '2023-1206', status: 'Alpha' },
  ]);

  const setStatus = (id: string, status: AttendanceStatus) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const filteredRows = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.nis.toLowerCase().includes(q);
    const matchesFilter = filter === 'all' ? true : r.status === filter;
    return matchesQuery && matchesFilter;
  });

  const summary = rows.reduce(
    (acc, r) => {
      acc[r.status] += 1;
      return acc;
    },
    { Hadir: 0, Sakit: 0, Izin: 0, Alpha: 0 } as Record<AttendanceStatus, number>
  );

  const statusStyles: Record<AttendanceStatus, { pill: string; btn: string }> = {
    Hadir: { pill: 'bg-green-50 text-green-700', btn: 'bg-green-100 text-green-800 hover:bg-green-200' },
    Sakit: { pill: 'bg-yellow-50 text-yellow-700', btn: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
    Izin: { pill: 'bg-blue-50 text-blue-700', btn: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
    Alpha: { pill: 'bg-red-50 text-red-700', btn: 'bg-red-100 text-red-800 hover:bg-red-200' },
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
                <h1 className="text-3xl mb-2">Absensi Siswa</h1>
                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  <span>NIP: {teacherData.nip}</span>
                  <span>•</span>
                  <span>{teacherData.subject}</span>
                  <span>•</span>
                  <span>{teacherData.unit}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-5 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export
                </button>
                <button className="px-5 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5" />
                  Simpan
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{summary.Hadir}</p>
              <p className="text-sm text-gray-600">Hadir</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{summary.Izin}</p>
              <p className="text-sm text-gray-600">Izin</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{summary.Sakit}</p>
              <p className="text-sm text-gray-600">Sakit</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{summary.Alpha}</p>
              <p className="text-sm text-gray-600">Alpha</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Kelas</p>
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
              <div>
                <p className="text-sm text-gray-600 mb-2">Tanggal</p>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Cari</p>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Nama atau NIS..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 inline-flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter:
              </span>
              {(['all', 'Hadir', 'Izin', 'Sakit', 'Alpha'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                    filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'Semua' : f}
                </button>
              ))}
              <span className="text-xs text-gray-500 ml-auto">
                Kelas: <span className="text-gray-700">{selectedClass}</span> • Tanggal:{' '}
                <span className="text-gray-700">{new Date(date).toLocaleDateString('id-ID')}</span>
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl mb-1">Daftar Siswa</h2>
              <p className="text-sm text-gray-600">Klik status untuk mengubah absensi.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">NIS</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Nama</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Catatan</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((r, idx) => (
                    <tr key={r.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-4 py-3 text-sm text-gray-700">{r.nis}</td>
                      <td className="px-4 py-3 text-sm font-medium">{r.name}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[r.status].pill}`}>{r.status}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.note ?? '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap gap-2">
                          {(['Hadir', 'Izin', 'Sakit', 'Alpha'] as AttendanceStatus[]).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setStatus(r.id, s)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                r.status === s ? statusStyles[s].btn : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredRows.length === 0 && (
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
      </main>
    </div>
  );
}

