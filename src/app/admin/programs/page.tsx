'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { 
  Award, Plus, Edit, Trash2, Search, Filter, X, Check, 
  Users, Clock, DollarSign, Target 
} from 'lucide-react';

interface ProgramItem {
  id: number;
  title: string;
  category: string;
  unit: string;
  description: string;
  duration: string;
  capacity: number;
  enrolled: number;
  fee: string;
  instructor: string;
  status: 'Active' | 'Inactive';
  benefits: string[];
}

export default function AdminProgramsPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const [programList, setProgramList] = useState<ProgramItem[]>([
    {
      id: 1,
      title: 'Program Tahfidz 30 Juz',
      category: 'Keagamaan',
      unit: 'SMAIT',
      description: 'Program intensif menghafal Al-Quran 30 juz dengan bimbingan ustadz berpengalaman',
      duration: '3 Tahun',
      capacity: 30,
      enrolled: 25,
      fee: 'Gratis (Termasuk SPP)',
      instructor: 'Ustadz Ahmad',
      status: 'Active',
      benefits: ['Hafal 30 Juz Al-Quran', 'Sanad resmi', 'Sertifikat wisuda', 'Ijazah tahfidz']
    },
    {
      id: 2,
      title: 'Klub Olimpiade Sains',
      category: 'Akademik',
      unit: 'SMPIT',
      description: 'Pembinaan siswa berprestasi untuk mengikuti olimpiade sains tingkat nasional dan internasional',
      duration: '1 Tahun',
      capacity: 20,
      enrolled: 18,
      fee: 'Rp 500.000/bulan',
      instructor: 'Tim Olimpiade',
      status: 'Active',
      benefits: ['Pembinaan intensif', 'Try out rutin', 'Pelatihan dari ahli', 'Kesempatan ikut OSN']
    },
    {
      id: 3,
      title: 'English Club',
      category: 'Bahasa',
      unit: 'Semua Unit',
      description: 'Program pengembangan kemampuan bahasa Inggris melalui conversation dan activities',
      duration: '6 Bulan',
      capacity: 25,
      enrolled: 22,
      fee: 'Rp 300.000/bulan',
      instructor: 'Native Speaker',
      status: 'Active',
      benefits: ['Speaking practice', 'Grammar workshop', 'TOEFL preparation', 'Certificate']
    },
    {
      id: 4,
      title: 'Futsal Academy',
      category: 'Olahraga',
      unit: 'SMPIT',
      description: 'Pelatihan futsal profesional untuk siswa yang berminat mengembangkan bakat olahraga',
      duration: '1 Tahun',
      capacity: 16,
      enrolled: 16,
      fee: 'Rp 400.000/bulan',
      instructor: 'Coach Budi',
      status: 'Active',
      benefits: ['Latihan 2x seminggu', 'Turnamen rutin', 'Jersey & equipment', 'Pelatih berlisensi']
    },
    {
      id: 5,
      title: 'Robotika & Programming',
      category: 'Teknologi',
      unit: 'SMAIT',
      description: 'Program belajar robotika dan programming untuk siswa SMA',
      duration: '1 Tahun',
      capacity: 15,
      enrolled: 12,
      fee: 'Rp 600.000/bulan',
      instructor: 'Mr. Rizki',
      status: 'Active',
      benefits: ['Belajar coding', 'Project robotika', 'Kompetisi', 'Sertifikat']
    },
    {
      id: 6,
      title: 'Public Speaking & Leadership',
      category: 'Keterampilan',
      unit: 'SMAIT',
      description: 'Program pengembangan kemampuan berbicara di depan umum dan kepemimpinan',
      duration: '3 Bulan',
      capacity: 20,
      enrolled: 15,
      fee: 'Rp 350.000/bulan',
      instructor: 'Ustadzah Fatimah',
      status: 'Inactive',
      benefits: ['Public speaking skills', 'Leadership training', 'Presentation skills', 'Networking']
    }
  ]);

  const [formData, setFormData] = useState<Partial<ProgramItem>>({
    title: '',
    category: 'Akademik',
    unit: 'Semua Unit',
    description: '',
    duration: '',
    capacity: 0,
    enrolled: 0,
    fee: '',
    instructor: '',
    status: 'Active',
    benefits: ['']
  });

  const categories = ['Semua', 'Akademik', 'Keagamaan', 'Bahasa', 'Olahraga', 'Teknologi', 'Keterampilan', 'Seni'];
  const units = ['Semua Unit', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT'];

  const filteredPrograms = programList.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || program.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      title: '',
      category: 'Akademik',
      unit: 'Semua Unit',
      description: '',
      duration: '',
      capacity: 0,
      enrolled: 0,
      fee: '',
      instructor: '',
      status: 'Active',
      benefits: ['']
    });
    setShowModal(true);
  };

  const handleEdit = (program: ProgramItem) => {
    setModalMode('edit');
    setSelectedProgram(program);
    setFormData(program);
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newProgram: ProgramItem = {
        ...formData as ProgramItem,
        id: Math.max(...programList.map(p => p.id), 0) + 1
      };
      setProgramList([...programList, newProgram]);
    } else if (modalMode === 'edit' && selectedProgram) {
      setProgramList(programList.map(program => 
        program.id === selectedProgram.id ? { ...formData as ProgramItem, id: selectedProgram.id } : program
      ));
    }
    setShowModal(false);
    setSelectedProgram(null);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      setProgramList(programList.filter(p => p.id !== showDeleteConfirm));
      setShowDeleteConfirm(null);
    }
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...(formData.benefits || []), ''] });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...(formData.benefits || [])];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = (formData.benefits || ['']).filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBenefits.length > 0 ? newBenefits : [''] });
  };

  const stats = [
    { label: 'Total Program', value: programList.length, color: 'from-blue-500 to-blue-600', icon: Award },
    { label: 'Program Aktif', value: programList.filter(p => p.status === 'Active').length, color: 'from-green-500 to-green-600', icon: Target },
    { label: 'Total Peserta', value: programList.reduce((sum, p) => sum + p.enrolled, 0), color: 'from-purple-500 to-purple-600', icon: Users },
    { label: 'Kapasitas Tersisa', value: programList.reduce((sum, p) => sum + (p.capacity - p.enrolled), 0), color: 'from-orange-500 to-orange-600', icon: Users }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Manajemen Program</h1>
              <p className="text-gray-600">Kelola semua program ekstrakurikuler dan unggulan</p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-[#1E4AB8] text-white px-6 py-3 rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Program</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                />
              </div>

              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 bg-white">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full py-2 bg-transparent outline-none text-gray-600"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Program Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map(program => (
              <div key={program.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mb-2 inline-block ${
                      program.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {program.status}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                    <p className="text-sm text-[#1E4AB8] font-medium">{program.category}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#1E4AB8]" />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-600 text-sm line-clamp-2">{program.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{program.enrolled}/{program.capacity} peserta</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{program.fee}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{program.unit}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Kapasitas</span>
                      <span>{Math.round((program.enrolled / program.capacity) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#1E4AB8] h-2 rounded-full transition-all"
                        style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleEdit(program)}
                    className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(program.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">Tidak ada program yang ditemukan</p>
            </div>
          )}
        </div>
      </main>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl my-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === 'create' ? 'Tambah Program Baru' : 'Edit Program'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Form Content */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Program</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8]"
                    placeholder="Contoh: Program Tahfidz"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8] bg-white"
                    >
                      {categories.filter(c => c !== 'Semua').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8] bg-white"
                    >
                      {units.map(u => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8]"
                    placeholder="Deskripsi singkat program..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8]"
                      placeholder="Contoh: 1 Tahun"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biaya</label>
                    <input
                      type="text"
                      value={formData.fee}
                      onChange={(e) => setFormData({...formData, fee: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8]"
                      placeholder="Contoh: Gratis"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas</label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instruktur</label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8]"
                      placeholder="Nama instruktur"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8] bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Benefit Program</label>
                  <div className="space-y-2">
                    {formData.benefits?.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E4AB8]"
                          placeholder="Benefit program"
                        />
                        <button
                          onClick={() => removeBenefit(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addBenefit}
                      className="text-[#1E4AB8] text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Benefit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Check className="w-5 h-5" />
                <span>{modalMode === 'create' ? 'Tambah Program' : 'Simpan Perubahan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Hapus Program?</h3>
            <p className="text-gray-600 text-center mb-6">
              Program yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
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

