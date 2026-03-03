'use client';
import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Award, Download, Filter, Search, Edit, Eye, Trash2 } from 'lucide-react';

interface Grade {
  id: number;
  name: string;
  nis: string;
  uts: number;
  uas: number;
  tugas: number;
  final: number;
}

export default function AdminGradesPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [selectedClass, setSelectedClass] = useState('4A');
  const [selectedSubject, setSelectedSubject] = useState('Matematika');

  // Mock Data
  const grades: Grade[] = [
    { id: 1, name: 'Muhammad Rizki', nis: '2024001', uts: 85, uas: 88, tugas: 90, final: 87.5 },
    { id: 2, name: 'Fatimah Zahra', nis: '2024002', uts: 90, uas: 92, tugas: 95, final: 92 },
    { id: 3, name: 'Ali Hassan', nis: '2024003', uts: 78, uas: 80, tugas: 85, final: 81 },
    { id: 4, name: 'Siti Aminah', nis: '2024004', uts: 88, uas: 85, tugas: 92, final: 88.5 },
    { id: 5, name: 'Umar bin Khattab', nis: '2024005', uts: 92, uas: 95, tugas: 90, final: 93 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Manajemen Nilai</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola nilai siswa per mata pelajaran</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <Award className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          {/* Filters and Actions */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all bg-gray-50 min-w-[150px]"
                >
                  <option value="4A">Kelas 4A</option>
                  <option value="4B">Kelas 4B</option>
                  <option value="5A">Kelas 5A</option>
                </select>

                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all bg-gray-50 min-w-[200px]"
                >
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa Arab">Bahasa Arab</option>
                  <option value="IPA">IPA</option>
                  <option value="IPS">IPS</option>
                </select>
              </div>

              <button className="flex items-center justify-center gap-2 px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-all shadow-lg shadow-[#1E4AB8]/20 font-medium w-full md:w-auto">
                <Download className="w-5 h-5" />
                <span>Export Excel</span>
              </button>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1E4AB8] text-white">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold w-24">NIS</th>
                    <th className="py-4 px-6 text-left font-semibold">Nama Siswa</th>
                    <th className="py-4 px-6 text-center font-semibold w-24">UTS</th>
                    <th className="py-4 px-6 text-center font-semibold w-24">UAS</th>
                    <th className="py-4 px-6 text-center font-semibold w-24">Tugas</th>
                    <th className="py-4 px-6 text-center font-semibold w-32">Nilai Akhir</th>
                    <th className="py-4 px-6 text-center font-semibold w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {grades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-600 font-medium">{grade.nis}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">{grade.name}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block w-12 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">{grade.uts}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block w-12 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">{grade.uas}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block w-12 py-1 bg-gray-100 rounded-lg text-gray-700 font-medium">{grade.tugas}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block w-16 py-1 rounded-lg font-bold ${
                          grade.final >= 90 ? 'bg-green-100 text-green-700' :
                          grade.final >= 80 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {grade.final}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button className="p-2 text-[#1E4AB8] hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

