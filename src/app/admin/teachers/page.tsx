'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { GraduationCap, Plus, Edit, Eye, Search, Filter, X, Trash2, Mail, Phone, Calendar, BookOpen, User } from 'lucide-react';

interface TeacherItem {
  id: number;
  nip: string;
  name: string;
  subject: string;
  unit: string;
  classes: string;
  students: number;
  status: 'Aktif' | 'Non-Aktif';
  email?: string;
  phone?: string;
  education?: string;
}

export default function AdminTeachersPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnit, setFilterUnit] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Mock Data
  const [teachers, setTeachers] = useState<TeacherItem[]>([
    { 
      id: 1, 
      nip: 'GT-2020-001', 
      name: 'Ustadz Ahmad', 
      subject: 'Matematika', 
      unit: 'SDIT', 
      classes: '4A, 4B, 4C', 
      students: 90, 
      status: 'Aktif',
      email: 'ahmad@sekolah.id',
      phone: '081234567890',
      education: 'S1 Pendidikan Matematika'
    },
    { 
      id: 2, 
      nip: 'GT-2020-002', 
      name: 'Ustadzah Fatimah', 
      subject: 'Bahasa Arab', 
      unit: 'SMPIT', 
      classes: '7A, 7B', 
      students: 60, 
      status: 'Aktif',
      email: 'fatimah@sekolah.id',
      phone: '081234567891',
      education: 'S1 Sastra Arab'
    },
    { 
      id: 3, 
      nip: 'GT-2021-003', 
      name: 'Ustadz Muhammad', 
      subject: 'Fisika', 
      unit: 'SMAIT', 
      classes: '10A, 10B', 
      students: 56, 
      status: 'Aktif',
      email: 'muhammad@sekolah.id',
      phone: '081234567892',
      education: 'S1 Fisika'
    }
  ]);

  const [formData, setFormData] = useState<Partial<TeacherItem>>({
    nip: '',
    name: '',
    subject: '',
    unit: 'SDIT',
    classes: '',
    students: 0,
    status: 'Aktif',
    email: '',
    phone: '',
    education: ''
  });

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          teacher.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = filterUnit === 'Semua' || teacher.unit === filterUnit;
    return matchesSearch && matchesUnit;
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      nip: '',
      name: '',
      subject: '',
      unit: 'SDIT',
      classes: '',
      students: 0,
      status: 'Aktif',
      email: '',
      phone: '',
      education: ''
    });
    setShowModal(true);
  };

  const handleEdit = (teacher: TeacherItem) => {
    setModalMode('edit');
    setSelectedTeacher(teacher);
    setFormData(teacher);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      setTeachers(teachers.filter(t => t.id !== showDeleteConfirm));
      setShowDeleteConfirm(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newTeacher: TeacherItem = {
        id: teachers.length + 1,
        nip: formData.nip || '',
        name: formData.name || '',
        subject: formData.subject || '',
        unit: formData.unit || 'SDIT',
        classes: formData.classes || '',
        students: Number(formData.students) || 0,
        status: formData.status as any,
        email: formData.email,
        phone: formData.phone,
        education: formData.education
      };
      setTeachers([...teachers, newTeacher]);
    } else if (selectedTeacher) {
      setTeachers(teachers.map(t => 
        t.id === selectedTeacher.id ? { ...t, ...formData, students: Number(formData.students) } as TeacherItem : t
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
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Manajemen Guru</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola data tenaga pengajar di Yayasan Baituljannah</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <GraduationCap className="w-5 h-5" />
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
                placeholder="Cari guru berdasarkan nama, NIP, atau mapel..."
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
              <span>Tambah Guru</span>
            </button>
          </div>

          {/* Teachers Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">NIP</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Nama</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Mata Pelajaran</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Unit</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Kelas</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Siswa</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-mono text-sm text-gray-600">{teacher.nip}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{teacher.name}</p>
                            {teacher.email && <p className="text-xs text-gray-500">{teacher.email}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{teacher.subject}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium border border-blue-100">
                          {teacher.unit}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{teacher.classes}</td>
                      <td className="py-4 px-6 text-gray-600">{teacher.students}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          teacher.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(teacher)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(teacher.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredTeachers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                Tidak ada data guru yang ditemukan
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === 'create' ? 'Tambah Guru Baru' : 'Edit Data Guru'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">NIP *</label>
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Nomor Induk Pegawai"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Nama beserta gelar"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="email@sekolah.id"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">No. Telepon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="08..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Mata Pelajaran *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  />
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
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Kelas yang Diampu</label>
                  <input
                    type="text"
                    name="classes"
                    value={formData.classes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: 7A, 7B"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Pendidikan Terakhir</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: S1 Pendidikan..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
            <h3 className="text-xl font-bold text-center mb-2">Hapus Guru?</h3>
            <p className="text-gray-600 text-center mb-6">
              Data guru yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
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

