'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { BookOpen, Users, Plus, Edit, Eye, Search, Filter, X, Trash2, School, GraduationCap, Calendar } from 'lucide-react';

interface ClassItem {
  id: number;
  name: string;
  level: string;
  unit: string;
  students: number;
  capacity: number;
  homeroomTeacher: string;
  room: string;
  status: 'Aktif' | 'Non-Aktif';
  schedule?: string;
}

export default function AdminClassesPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnit, setFilterUnit] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Mock Data
  const [classes, setClasses] = useState<ClassItem[]>([
    { 
      id: 1, 
      name: '1A', 
      level: 'Kelas 1', 
      unit: 'SDIT', 
      students: 28, 
      capacity: 30,
      homeroomTeacher: 'Ustadzah Aisyah',
      room: 'R.101',
      status: 'Aktif',
      schedule: 'Senin-Jumat, 07:00-14:00'
    },
    { 
      id: 2, 
      name: '1B', 
      level: 'Kelas 1', 
      unit: 'SDIT', 
      students: 26, 
      capacity: 30,
      homeroomTeacher: 'Ustadz Abdullah',
      room: 'R.102',
      status: 'Aktif',
      schedule: 'Senin-Jumat, 07:00-14:00'
    },
    { 
      id: 3, 
      name: '7A', 
      level: 'Kelas 7', 
      unit: 'SMPIT', 
      students: 32, 
      capacity: 32,
      homeroomTeacher: 'Ustadzah Fatimah',
      room: 'R.201',
      status: 'Aktif',
      schedule: 'Senin-Jumat, 07:00-15:00'
    },
    { 
      id: 4, 
      name: '10 IPA 1', 
      level: 'Kelas 10', 
      unit: 'SMAIT', 
      students: 30, 
      capacity: 35,
      homeroomTeacher: 'Ustadz Muhammad',
      room: 'R.301',
      status: 'Aktif',
      schedule: 'Senin-Jumat, 07:00-15:30'
    }
  ]);

  const [formData, setFormData] = useState<Partial<ClassItem>>({
    name: '',
    level: '',
    unit: 'SDIT',
    students: 0,
    capacity: 30,
    homeroomTeacher: '',
    room: '',
    status: 'Aktif',
    schedule: ''
  });

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cls.homeroomTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = filterUnit === 'Semua' || cls.unit === filterUnit;
    return matchesSearch && matchesUnit;
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      level: '',
      unit: 'SDIT',
      students: 0,
      capacity: 30,
      homeroomTeacher: '',
      room: '',
      status: 'Aktif',
      schedule: ''
    });
    setShowModal(true);
  };

  const handleEdit = (cls: ClassItem) => {
    setModalMode('edit');
    setSelectedClass(cls);
    setFormData(cls);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      setClasses(classes.filter(c => c.id !== showDeleteConfirm));
      setShowDeleteConfirm(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newClass: ClassItem = {
        id: classes.length + 1,
        name: formData.name || '',
        level: formData.level || '',
        unit: formData.unit || 'SDIT',
        students: Number(formData.students) || 0,
        capacity: Number(formData.capacity) || 30,
        homeroomTeacher: formData.homeroomTeacher || '',
        room: formData.room || '',
        status: formData.status as any,
        schedule: formData.schedule
      };
      setClasses([...classes, newClass]);
    } else if (selectedClass) {
      setClasses(classes.map(c => 
        c.id === selectedClass.id ? { ...c, ...formData, students: Number(formData.students), capacity: Number(formData.capacity) } as ClassItem : c
      ));
    }
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Manajemen Kelas</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola data kelas dan wali kelas</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          {/* Filters and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari kelas atau wali kelas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all bg-white"
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
            >
              <option value="Semua">Semua Unit</option>
              <option value="TKIT">TKIT</option>
              <option value="SDIT">SDIT</option>
              <option value="SMPIT">SMPIT</option>
              <option value="SMAIT">SMAIT</option>
              <option value="SLBIT">SLBIT</option>
            </select>
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-all shadow-lg shadow-[#1E4AB8]/20 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Kelas</span>
            </button>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#1E4AB8]" />
                
                <div className="flex justify-between items-start mb-4 pl-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{cls.name}</h3>
                    <p className="text-sm text-gray-500">{cls.level}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-100">
                    {cls.unit}
                  </span>
                </div>

                <div className="space-y-3 pl-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{cls.homeroomTeacher}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <School className="w-4 h-4 text-gray-400" />
                    <span>Ruang {cls.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{cls.students} / {cls.capacity} Siswa</span>
                  </div>
                </div>

                <div className="mt-4 pl-3 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    cls.status === 'Aktif' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {cls.status}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(cls)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(cls.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak ada data ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === 'create' ? 'Tambah Kelas Baru' : 'Edit Data Kelas'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nama Kelas *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: 1A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Tingkat *</label>
                  <input
                    type="text"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: Kelas 1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Unit *</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                >
                  <option value="TKIT">TKIT</option>
                  <option value="SDIT">SDIT</option>
                  <option value="SMPIT">SMPIT</option>
                  <option value="SMAIT">SMAIT</option>
                  <option value="SLBIT">SLBIT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Wali Kelas *</label>
                <input
                  type="text"
                  name="homeroomTeacher"
                  value={formData.homeroomTeacher}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  placeholder="Nama Wali Kelas"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Ruangan</label>
                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="R.101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Kapasitas</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-colors font-medium shadow-lg shadow-[#1E4AB8]/20"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Hapus Kelas?</h3>
            <p className="text-gray-600 text-center mb-6">
              Data kelas yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

