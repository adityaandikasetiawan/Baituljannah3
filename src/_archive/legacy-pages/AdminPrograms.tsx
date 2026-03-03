import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Award, Plus, Edit, Trash2, Search, Filter, X, Check, Users, Clock, DollarSign, Target } from 'lucide-react';

interface AdminProgramsProps {
  onNavigate?: (page: string) => void;
}

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

export const AdminPrograms: React.FC<AdminProgramsProps> = ({ onNavigate = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate('admin-super') },
    { label: 'Berita', href: '#', onClick: () => onNavigate('admin-news') },
    { label: 'Galeri', href: '#', onClick: () => onNavigate('admin-gallery') },
    { label: 'Program', href: '#', onClick: () => {} },
    { label: 'Prestasi', href: '#', onClick: () => onNavigate('admin-achievement') }
  ];

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

  const handleDelete = (id: number) => {
    setProgramList(programList.filter(program => program.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' || name === 'enrolled' ? parseInt(value) || 0 : value
    });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...(formData.benefits || [''])];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...(formData.benefits || ['']), ''] });
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
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Admin Panel - Program"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Manajemen Program</h1>
              <p className="text-gray-600">Kelola semua program ekstrakurikuler dan unggulan</p>
            </div>
            <button
              onClick={handleCreate}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Program</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
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

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full py-2 bg-transparent outline-none"
              >
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan <strong>{filteredPrograms.length}</strong> dari <strong>{programList.length}</strong> program
          </div>
        </div>

        {/* Programs List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      program.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {program.status}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {program.category}
                    </span>
                  </div>
                  <h3 className="text-xl mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{program.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
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
              <div className="mb-4">
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

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(program)}
                  className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(program.id)}
                  className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">Tidak ada program yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">
                  {modalMode === 'create' ? 'Tambah Program Baru' : 'Edit Program'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Program *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  placeholder="Masukkan nama program"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  >
                    {categories.filter(c => c !== 'Semua').map(cat => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Unit *</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  >
                    {units.map(unit => (
                      <option key={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deskripsi *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  placeholder="Deskripsi program"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Durasi *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: 6 Bulan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Instruktur *</label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Nama instruktur"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kapasitas *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Terdaftar *</label>
                  <input
                    type="number"
                    name="enrolled"
                    value={formData.enrolled}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    min="0"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Biaya *</label>
                  <input
                    type="text"
                    name="fee"
                    value={formData.fee}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: Rp 500.000/bulan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Benefit Program</label>
                {(formData.benefits || ['']).map((benefit, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder={`Benefit ${index + 1}`}
                    />
                    {(formData.benefits?.length || 1) > 1 && (
                      <button
                        onClick={() => removeBenefit(index)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addBenefit}
                  className="text-sm text-[#1E4AB8] hover:underline"
                >
                  + Tambah Benefit
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2"
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
            <h3 className="text-xl text-center mb-2">Hapus Program?</h3>
            <p className="text-gray-600 text-center mb-6">
              Program yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

