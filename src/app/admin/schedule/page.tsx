'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Calendar, Download, Printer, Filter, Clock, BookOpen, User } from 'lucide-react';

interface ScheduleItem {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export default function AdminSchedulePage() {
  const { menuItems } = useNavigationMenu('admin');
  const [selectedClass, setSelectedClass] = useState('4A');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil 2024/2025');

  // Mock Data
  const schedule: ScheduleItem[] = [
    { time: '07:00 - 07:45', monday: 'Matematika', tuesday: 'Bahasa Indonesia', wednesday: 'IPA', thursday: 'IPS', friday: 'Agama' },
    { time: '07:45 - 08:30', monday: 'Matematika', tuesday: 'Bahasa Indonesia', wednesday: 'IPA', thursday: 'IPS', friday: 'Agama' },
    { time: '08:30 - 09:15', monday: 'Bahasa Arab', tuesday: 'Matematika', wednesday: 'Bahasa Indonesia', thursday: 'IPA', friday: 'Olahraga' },
    { time: '09:15 - 09:45', monday: 'ISTIRAHAT', tuesday: 'ISTIRAHAT', wednesday: 'ISTIRAHAT', thursday: 'ISTIRAHAT', friday: 'ISTIRAHAT' },
    { time: '09:45 - 10:30', monday: 'IPA', tuesday: 'Bahasa Arab', wednesday: 'Matematika', thursday: 'Bahasa Indonesia', friday: 'Seni Budaya' },
    { time: '10:30 - 11:15', monday: 'IPS', tuesday: 'IPA', wednesday: 'Bahasa Arab', thursday: 'Matematika', friday: 'Pramuka' }
  ];

  const classes = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Jadwal Pelajaran</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola jadwal pelajaran per kelas</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          {/* Filters and Actions */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 min-w-[200px]">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 font-medium"
                  >
                    {classes.map(cls => (
                      <option key={cls} value={cls}>Kelas {cls}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 min-w-[250px]">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 font-medium"
                  >
                    <option>Semester Ganjil 2024/2025</option>
                    <option>Semester Genap 2024/2025</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium">
                  <Printer className="w-5 h-5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-all font-medium shadow-lg shadow-[#1E4AB8]/20">
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-[#1E4AB8] text-white">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold w-32">Waktu</th>
                    <th className="py-4 px-6 text-center font-semibold w-1/5">Senin</th>
                    <th className="py-4 px-6 text-center font-semibold w-1/5">Selasa</th>
                    <th className="py-4 px-6 text-center font-semibold w-1/5">Rabu</th>
                    <th className="py-4 px-6 text-center font-semibold w-1/5">Kamis</th>
                    <th className="py-4 px-6 text-center font-semibold w-1/5">Jumat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schedule.map((slot, index) => (
                    <tr key={index} className={`hover:bg-gray-50/50 transition-colors ${
                      slot.monday === 'ISTIRAHAT' ? 'bg-gray-50' : ''
                    }`}>
                      <td className="py-4 px-6 font-medium text-gray-900 border-r border-gray-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {slot.time}
                        </div>
                      </td>
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                        <td key={day} className="py-4 px-6 text-center border-r border-gray-100 last:border-r-0">
                          {slot[day as keyof ScheduleItem] === 'ISTIRAHAT' ? (
                            <span className="text-gray-400 font-medium italic tracking-widest text-sm">ISTIRAHAT</span>
                          ) : (
                            <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
                              {slot[day as keyof ScheduleItem]}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#1E4AB8]" />
                Wali Kelas
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Ustadzah Aisyah S.Pd</p>
                  <p className="text-sm text-gray-500">NIP: 19850101 201001 2 001</p>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1E4AB8]" />
                Keterangan
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Durasi per jam pelajaran: 45 menit
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Istirahat pertama: 09:15 - 09:45
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Istirahat kedua (Sholat Dzuhur): 11:45 - 12:30
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

