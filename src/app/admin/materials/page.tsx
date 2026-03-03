'use client';
import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { BookOpen, Search, Plus, Eye, Edit, Trash2, FileText, Download } from 'lucide-react';

interface Material {
  id: number;
  title: string;
  subject: string;
  class: string;
  date: string;
  files: number;
  views: number;
  author: string;
}

export default function AdminMaterialsPage() {
  const { menuItems } = useNavigationMenu('admin'); // Assuming 'admin' role sees this, or we can adapt for 'teacher' later
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock Data
  const [materials, setMaterials] = useState<Material[]>([
    { id: 1, title: 'Materi Perkalian dan Pembagian', subject: 'Matematika', class: '4A', date: '2024-11-28', files: 3, views: 28, author: 'Ustadz Ahmad' },
    { id: 2, title: 'Tata Bahasa Arab Dasar', subject: 'Bahasa Arab', class: '4A', date: '2024-11-25', files: 2, views: 25, author: 'Ustadzah Fatimah' },
    { id: 3, title: 'Sejarah Islam: Periode Madinah', subject: 'Sejarah Islam', class: '5A', date: '2024-11-22', files: 4, views: 24, author: 'Ustadz Muhammad' }
  ]);

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Materi Pembelajaran</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola materi pembelajaran untuk siswa</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <BookOpen className="w-5 h-5" />
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
                placeholder="Cari materi..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-all shadow-lg shadow-[#1E4AB8]/20 font-medium w-full md:w-auto">
              <Plus className="w-5 h-5" />
              <span>Upload Materi</span>
            </button>
          </div>

          {/* Materials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-[#1E4AB8]" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{material.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">{material.subject}</span>
                    <span className="text-gray-400">•</span>
                    <span>Kelas {material.class}</span>
                  </p>
                  <p className="text-xs text-gray-500">Oleh: {material.author}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" /> {material.files} file
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {material.views}
                    </span>
                  </div>
                  <span className="text-xs">{material.date}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-4 border border-[#1E4AB8] text-[#1E4AB8] rounded-xl hover:bg-blue-50 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> Lihat
                  </button>
                  <button className="flex-1 py-2 px-4 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

