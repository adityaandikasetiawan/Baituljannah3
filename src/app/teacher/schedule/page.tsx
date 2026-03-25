'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

type DayKey = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';

export default function TeacherSchedulePage() {
  const { menuItems } = useNavigationMenu('teacher');
  const [selectedDay, setSelectedDay] = React.useState<DayKey>('Senin');

  const teacherData = {
    nip: 'GT-2020-001',
    name: 'Ustadz Ahmad Fauzi',
    subject: 'Matematika',
    unit: 'SMAIT',
    classes: ['XII IPA 1', 'XII IPA 2', 'XI IPA 1'],
  };

  const scheduleByDay: Record<DayKey, { time: string; class: string; topic: string; room: string }[]> = {
    Senin: [
      { time: '07:00-08:30', class: 'XII IPA 1', topic: 'Integral Tentu', room: 'Lab Komputer' },
      { time: '10:15-11:45', class: 'XII IPA 2', topic: 'Integral Tak Tentu', room: 'Ruang 12-2' },
      { time: '12:45-14:15', class: 'XI IPA 1', topic: 'Trigonometri', room: 'Ruang 11-1' },
    ],
    Selasa: [
      { time: '07:00-08:30', class: 'XI IPA 1', topic: 'Limit Fungsi', room: 'Ruang 11-1' },
      { time: '10:15-11:45', class: 'XII IPA 1', topic: 'Turunan & Aplikasi', room: 'Ruang 12-1' },
    ],
    Rabu: [
      { time: '08:30-10:00', class: 'XII IPA 2', topic: 'Statistika', room: 'Ruang 12-2' },
      { time: '12:45-14:15', class: 'XII IPA 1', topic: 'Peluang', room: 'Ruang 12-1' },
    ],
    Kamis: [
      { time: '07:00-08:30', class: 'XI IPA 1', topic: 'Matriks', room: 'Ruang 11-1' },
      { time: '10:15-11:45', class: 'XII IPA 2', topic: 'Barisan & Deret', room: 'Ruang 12-2' },
    ],
    Jumat: [{ time: '07:00-08:00', class: 'XII IPA 1', topic: 'Remedial & Konsultasi', room: 'Ruang 12-1' }],
  };

  const days: DayKey[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  const selectedIndex = days.indexOf(selectedDay);

  const goPrevDay = () => setSelectedDay(days[Math.max(0, selectedIndex - 1)]);
  const goNextDay = () => setSelectedDay(days[Math.min(days.length - 1, selectedIndex + 1)]);

  const todayCount = scheduleByDay[selectedDay].length;
  const totalSessions = Object.values(scheduleByDay).reduce((sum, list) => sum + list.length, 0);

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
                <h1 className="text-3xl mb-2">Jadwal Mengajar</h1>
                <div className="flex flex-wrap items-center gap-3 text-white/90">
                  <span>NIP: {teacherData.nip}</span>
                  <span>•</span>
                  <span>{teacherData.subject}</span>
                  <span>•</span>
                  <span>{teacherData.unit}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-2xl p-2">
                <button
                  type="button"
                  onClick={goPrevDay}
                  disabled={selectedIndex === 0}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-4 py-2 rounded-xl bg-white/10 min-w-[120px] text-center">
                  <p className="text-xs text-white/80">Hari</p>
                  <p className="text-base">{selectedDay}</p>
                </div>
                <button
                  type="button"
                  onClick={goNextDay}
                  disabled={selectedIndex === days.length - 1}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{todayCount}</p>
              <p className="text-sm text-gray-600">Sesi Hari Ini</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{teacherData.classes.length}</p>
              <p className="text-sm text-gray-600">Kelas Diampu</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{totalSessions}</p>
              <p className="text-sm text-gray-600">Total Sesi/Minggu</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-2xl mb-1">{new Set(Object.values(scheduleByDay).flatMap((s) => s.map((x) => x.room))).size}</p>
              <p className="text-sm text-gray-600">Ruang Mengajar</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                      selectedDay === d ? 'bg-[#1E4AB8] text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {scheduleByDay[selectedDay].length === 0 ? (
                <div className="text-center py-14">
                  <p className="text-gray-600">Tidak ada jadwal pada hari ini.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scheduleByDay[selectedDay].map((s, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-gray-200 hover:border-[#1E4AB8]/30 hover:shadow-soft transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs">
                              <Clock className="w-3.5 h-3.5" />
                              {s.time}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                              {s.class}
                            </span>
                          </div>
                          <p className="text-lg font-medium mb-1">{teacherData.subject}</p>
                          <p className="text-sm text-gray-600">{s.topic}</p>
                          <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{s.room}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm">
                            Detail
                          </button>
                          <button className="px-4 py-2 rounded-xl bg-[#1E4AB8] text-white hover:bg-[#1a3d9a] transition-colors text-sm">
                            Mulai Kelas
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
      </main>
    </div>
  );
}

