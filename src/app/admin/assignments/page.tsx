'use client';
import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { FileText, Search, Plus, Eye, CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  class: string;
  deadline: string;
  submitted: number;
  total: number;
  subject: string;
  status: 'Active' | 'Closed';
}

export default function AdminAssignmentsPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data based on AdminPanel.tsx
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: 'Latihan Soal Perkalian', class: '4A, 4B', deadline: '2024-12-05', submitted: 45, total: 60, subject: 'Matematika', status: 'Active' },
    { id: 2, title: 'Essay Matematika', class: '5A', deadline: '2024-12-03', submitted: 28, total: 28, subject: 'Matematika', status: 'Closed' },
    { id: 3, title: 'Tugas Kelompok', class: '4A', deadline: '2024-12-10', submitted: 20, total: 30, subject: 'IPA', status: 'Active' }
  ]);

  const filteredAssignments = assignments.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Manajemen Tugas</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola tugas dan latihan siswa</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tugas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-all shadow-lg shadow-[#1E4AB8]/20 font-medium w-full md:w-auto">
              <Plus className="w-5 h-5" />
              <span>Buat Tugas</span>
            </button>
          </div>

          {/* Assignments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{assignment.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    assignment.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-1 font-medium">{assignment.subject}</p>
                <p className="text-sm text-gray-500 mb-4">Kelas {assignment.class}</p>
                
                <div className="flex items-center justify-between text-sm mb-4 bg-gray-50 p-3 rounded-xl">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Deadline
                  </span>
                  <span className="text-red-600 font-medium">{assignment.deadline}</span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Progres Pengumpulan
                    </span>
                    <span className="text-[#1E4AB8] font-bold">{assignment.submitted}/{assignment.total}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 ease-out" 
                      style={{ 
                        width: `${(assignment.submitted / assignment.total) * 100}%`,
                        backgroundColor: '#1E4AB8' 
                      }}
                    ></div>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-colors font-medium text-sm shadow-lg shadow-[#1E4AB8]/20">
                  Lihat Pengumpulan
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

