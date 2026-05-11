'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Building, Plus, Edit, Eye, School, Users, GraduationCap, X, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface UnitItem {
  id: number;
  name: string;
  level: string;
  students: number;
  teachers: number;
  color: string;
  icon?: string;
  status: 'Aktif' | 'Non-Aktif';
  description?: string;
  headmaster?: string;
}

export default function AdminUnitsPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUnit, setSelectedUnit] = useState<UnitItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Mock Data
  const [units, setUnits] = useState<UnitItem[]>([
    { 
      id: 1, 
      name: 'TKIT Baituljannah', 
      level: 'TK Islam Terpadu', 
      students: 120, 
      teachers: 12, 
      color: '#10B981', 
      icon: '/uploads/logos/TK.webp',
      status: 'Aktif',
      headmaster: 'Ibu Siti'
    },
    { 
      id: 2, 
      name: 'SDIT Baituljannah', 
      level: 'SD Islam Terpadu', 
      students: 450, 
      teachers: 45, 
      color: '#3B82F6', 
      icon: '/uploads/logos/SD.webp',
      status: 'Aktif',
      headmaster: 'Bapak Ahmad'
    },
    { 
      id: 3, 
      name: 'SMPIT Baituljannah', 
      level: 'SMP Islam Terpadu', 
      students: 320, 
      teachers: 38, 
      color: '#F97316', 
      icon: '/uploads/logos/SMP.webp',
      status: 'Aktif',
      headmaster: 'Bapak Budi'
    },
    { 
      id: 4, 
      name: 'SMAIT Baituljannah', 
      level: 'SMA Islam Terpadu', 
      students: 280, 
      teachers: 35, 
      color: '#8B5CF6', 
      icon: '/uploads/logos/SMA.webp',
      status: 'Aktif',
      headmaster: 'Bapak Cahyo'
    },
    { 
      id: 5, 
      name: 'SLBIT Baituljannah', 
      level: 'SLB Islam Terpadu', 
      students: 80, 
      teachers: 15, 
      color: '#06B6D4', 
      icon: '/uploads/logos/SLB.webp',
      status: 'Aktif',
      headmaster: 'Ibu Dewi'
    }
  ]);

  const [formData, setFormData] = useState<Partial<UnitItem>>({
    name: '',
    level: '',
    students: 0,
    teachers: 0,
    color: '#3B82F6',
    icon: '',
    status: 'Aktif',
    headmaster: ''
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      level: '',
      students: 0,
      teachers: 0,
      color: '#3B82F6',
      icon: '',
      status: 'Aktif',
      headmaster: ''
    });
    setShowModal(true);
  };

  const handleEdit = (unit: UnitItem) => {
    setModalMode('edit');
    setSelectedUnit(unit);
    setFormData(unit);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      setUnits(units.filter(unit => unit.id !== showDeleteConfirm));
      setShowDeleteConfirm(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newUnit: UnitItem = {
        id: units.length + 1,
        name: formData.name || '',
        level: formData.level || '',
        students: Number(formData.students) || 0,
        teachers: Number(formData.teachers) || 0,
        color: formData.color || '#3B82F6',
        icon: formData.icon,
        status: formData.status as any,
        headmaster: formData.headmaster
      };
      setUnits([...units, newUnit]);
    } else if (selectedUnit) {
      setUnits(units.map(unit => 
        unit.id === selectedUnit.id ? { ...unit, ...formData, students: Number(formData.students), teachers: Number(formData.teachers) } as UnitItem : unit
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
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Manajemen Unit Sekolah</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola data unit pendidikan di Yayasan Baituljannah</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <Building className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-gray-600">Daftar unit pendidikan yang aktif</p>
            </div>
            <button 
              onClick={handleCreate}
              className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-all shadow-lg shadow-[#1E4AB8]/20"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Unit</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <div key={unit.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden" style={{ backgroundColor: `${unit.color}20`, color: unit.color }}>
                    {unit.icon ? (
                      <Image src={unit.icon} alt={unit.name} fill sizes="48px" className="object-contain p-2" unoptimized />
                    ) : (
                      <School className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    unit.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {unit.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-1">{unit.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{unit.level}</p>
                
                {unit.headmaster && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Kepala Sekolah</p>
                    <p className="text-sm font-medium text-gray-800">{unit.headmaster}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <p className="text-2xl font-bold" style={{ color: unit.color }}>{unit.students}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                      <Users className="w-3 h-3" />
                      <span>Siswa</span>
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <p className="text-2xl font-bold" style={{ color: unit.color }}>{unit.teachers}</p>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>Guru</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(unit)}
                    className="flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                    style={{ borderColor: unit.color, color: unit.color }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(unit.id)}
                    className="px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === 'create' ? 'Tambah Unit Sekolah' : 'Edit Data Unit'}
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
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nama Unit *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: SDIT Baituljannah"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Jenjang *</label>
                  <input
                    type="text"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: SD Islam Terpadu"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Warna Tema</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <span className="text-sm text-gray-500">{formData.color}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Kepala Sekolah</label>
                  <input
                    type="text"
                    name="headmaster"
                    value={formData.headmaster}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Nama Kepala Sekolah"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Jumlah Siswa</label>
                  <input
                    type="number"
                    name="students"
                    value={formData.students}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Jumlah Guru</label>
                  <input
                    type="number"
                    name="teachers"
                    value={formData.teachers}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  />
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
            <h3 className="text-xl font-bold text-center mb-2">Hapus Unit?</h3>
            <p className="text-gray-600 text-center mb-6">
              Data unit yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
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
