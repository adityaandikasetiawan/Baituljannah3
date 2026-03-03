'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Calendar, Users, CheckCircle, AlertCircle, Clock, Search, Filter, Eye, Download, Printer, User, Phone, MapPin } from 'lucide-react';

interface PPDBApplicant {
  id: number;
  name: string;
  unit: string;
  birthDate: string;
  parent: string;
  phone: string;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
  address?: string;
  gender?: 'L' | 'P';
}

export default function AdminPPDBPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [selectedTab, setSelectedTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnit, setFilterUnit] = useState('Semua');

  // Mock Data
  const [applicants, setApplicants] = useState<PPDBApplicant[]>([
    { 
      id: 1, 
      name: 'Muhammad Rizki', 
      unit: 'SDIT', 
      birthDate: '2015-05-15', 
      parent: 'Ahmad Fauzi', 
      phone: '081234567890', 
      date: '2024-11-25', 
      status: 'pending',
      address: 'Jl. Merpati No. 12',
      gender: 'L'
    },
    { 
      id: 2, 
      name: 'Fatimah Zahra', 
      unit: 'SMPIT', 
      birthDate: '2012-08-20', 
      parent: 'Abdullah Rahman', 
      phone: '081234567891', 
      date: '2024-11-26', 
      status: 'pending',
      address: 'Jl. Kutilang No. 5',
      gender: 'P'
    },
    { 
      id: 3, 
      name: 'Ali Hassan', 
      unit: 'TKIT', 
      birthDate: '2019-03-10', 
      parent: 'Hassan Ibrahim', 
      phone: '081234567892', 
      date: '2024-11-27', 
      status: 'accepted',
      address: 'Jl. Garuda No. 8',
      gender: 'L'
    },
    {
      id: 4,
      name: 'Aisyah Putri',
      unit: 'SMAIT',
      birthDate: '2009-01-15',
      parent: 'Budi Santoso',
      phone: '081234567893',
      date: '2024-11-28',
      status: 'rejected',
      address: 'Jl. Elang No. 10',
      gender: 'P'
    }
  ]);

  const stats = [
    { label: 'Total Pendaftar', value: applicants.length.toString(), color: '#3B82F6', icon: Users, bg: 'bg-blue-50' },
    { label: 'Menunggu Verifikasi', value: applicants.filter(a => a.status === 'pending').length.toString(), color: '#F59E0B', icon: Clock, bg: 'bg-yellow-50' },
    { label: 'Diterima', value: applicants.filter(a => a.status === 'accepted').length.toString(), color: '#10B981', icon: CheckCircle, bg: 'bg-green-50' },
    { label: 'Ditolak', value: applicants.filter(a => a.status === 'rejected').length.toString(), color: '#EF4444', icon: AlertCircle, bg: 'bg-red-50' }
  ];

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          applicant.parent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = filterUnit === 'Semua' || applicant.unit === filterUnit;
    const matchesTab = applicant.status === selectedTab;
    return matchesSearch && matchesUnit && matchesTab;
  });

  const handleStatusChange = (id: number, newStatus: 'pending' | 'accepted' | 'rejected') => {
    setApplicants(applicants.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Penerimaan Peserta Didik Baru (PPDB)</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola pendaftaran siswa baru Tahun Ajaran 2025/2026</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`} style={{ color: stat.color }}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
              {(['pending', 'accepted', 'rejected'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTab === tab 
                      ? 'bg-white text-[#1E4AB8] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'pending' ? 'Menunggu' : tab === 'accepted' ? 'Diterima' : 'Ditolak'}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama siswa/ortu..."
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
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium">
                <Printer className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Applicants List */}
          <div className="grid gap-4">
            {filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{applicant.name}</h3>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium border border-blue-100">
                          {applicant.unit}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {applicant.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </span>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>Ortu: {applicant.parent}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{applicant.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>Lahir: {applicant.birthDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{applicant.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:border-l lg:pl-6 border-gray-100">
                    <div className="text-sm text-gray-500">
                      <p>Tanggal Daftar</p>
                      <p className="font-medium text-gray-900">{applicant.date}</p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {applicant.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(applicant.id, 'accepted')}
                            className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Terima
                          </button>
                          <button 
                            onClick={() => handleStatusChange(applicant.id, 'rejected')}
                            className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                      
                      {applicant.status !== 'pending' && (
                        <div className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                          applicant.status === 'accepted' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {applicant.status === 'accepted' ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Diterima</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4" />
                              <span>Ditolak</span>
                            </>
                          )}
                        </div>
                      )}

                      <button className="p-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors" title="Lihat Detail">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredApplicants.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak ada data ditemukan</h3>
                <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

