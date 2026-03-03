'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { DollarSign, TrendingUp, Users, Calendar, Search, Filter, Download, CheckCircle, Clock, XCircle, AlertCircle, Eye, Edit, Send, X, Check } from 'lucide-react';

interface Student {
  nis: string;
  name: string;
  class: string;
  unit: string;
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  lastPayment: string | null;
  status: 'current' | 'overdue' | 'clear';
}

interface Payment {
  id: number;
  studentNis: string;
  studentName: string;
  class: string;
  unit: string;
  month: string;
  year: number;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate: string | null;
  paymentMethod: string | null;
}

export default function AdminFinancePage() {
  const { menuItems } = useNavigationMenu('admin');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'students' | 'transactions'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnit, setFilterUnit] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const students: Student[] = [
    {
      nis: '2024001',
      name: 'Muhammad Rizki Pratama',
      class: 'XII IPA 1',
      unit: 'SMAIT',
      totalPaid: 7500000,
      totalPending: 3000000,
      totalOverdue: 0,
      lastPayment: '2024-11-08',
      status: 'current'
    },
    {
      nis: '2024002',
      name: 'Siti Aisyah Putri',
      class: 'XI IPA 2',
      unit: 'SMAIT',
      totalPaid: 9000000,
      totalPending: 0,
      totalOverdue: 0,
      lastPayment: '2024-11-05',
      status: 'clear'
    },
    {
      nis: '2023045',
      name: 'Ahmad Fauzi',
      class: 'IX A',
      unit: 'SMPIT',
      totalPaid: 4800000,
      totalPending: 1200000,
      totalOverdue: 2400000,
      lastPayment: '2024-09-10',
      status: 'overdue'
    },
    {
      nis: '2023046',
      name: 'Fatimah Zahra',
      class: 'VIII B',
      unit: 'SMPIT',
      totalPaid: 6000000,
      totalPending: 2400000,
      totalOverdue: 0,
      lastPayment: '2024-11-07',
      status: 'current'
    },
    {
      nis: '2022078',
      name: 'Abdullah Rahman',
      class: 'VI A',
      unit: 'SDIT',
      totalPaid: 5000000,
      totalPending: 2000000,
      totalOverdue: 0,
      lastPayment: '2024-11-06',
      status: 'current'
    },
    {
      nis: '2022079',
      name: 'Maryam Azzahra',
      class: 'V B',
      unit: 'SDIT',
      totalPaid: 4500000,
      totalPending: 1000000,
      totalOverdue: 1000000,
      lastPayment: '2024-10-05',
      status: 'overdue'
    }
  ];

  const payments: Payment[] = [
    { id: 1, studentNis: '2024001', studentName: 'Muhammad Rizki Pratama', class: 'XII IPA 1', unit: 'SMAIT', month: 'November', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-11-10', paidDate: '2024-11-08', paymentMethod: 'Transfer Bank' },
    { id: 2, studentNis: '2024001', studentName: 'Muhammad Rizki Pratama', class: 'XII IPA 1', unit: 'SMAIT', month: 'Desember', year: 2024, amount: 1500000, status: 'pending', dueDate: '2024-12-10', paidDate: null, paymentMethod: null },
    { id: 3, studentNis: '2024002', studentName: 'Siti Aisyah Putri', class: 'XI IPA 2', unit: 'SMAIT', month: 'November', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-11-10', paidDate: '2024-11-05', paymentMethod: 'Virtual Account' },
    { id: 4, studentNis: '2023045', studentName: 'Ahmad Fauzi', class: 'IX A', unit: 'SMPIT', month: 'Oktober', year: 2024, amount: 1200000, status: 'overdue', dueDate: '2024-10-10', paidDate: null, paymentMethod: null },
    { id: 5, studentNis: '2023045', studentName: 'Ahmad Fauzi', class: 'IX A', unit: 'SMPIT', month: 'November', year: 2024, amount: 1200000, status: 'overdue', dueDate: '2024-11-10', paidDate: null, paymentMethod: null },
    { id: 6, studentNis: '2023046', studentName: 'Fatimah Zahra', class: 'VIII B', unit: 'SMPIT', month: 'November', year: 2024, amount: 1200000, status: 'paid', dueDate: '2024-11-10', paidDate: '2024-11-07', paymentMethod: 'E-Wallet' },
    { id: 7, studentNis: '2022078', studentName: 'Abdullah Rahman', class: 'VI A', unit: 'SDIT', month: 'November', year: 2024, amount: 1000000, status: 'paid', dueDate: '2024-11-10', paidDate: '2024-11-06', paymentMethod: 'Transfer Bank' },
    { id: 8, studentNis: '2022079', studentName: 'Maryam Azzahra', class: 'V B', unit: 'SDIT', month: 'Oktober', year: 2024, amount: 1000000, status: 'overdue', dueDate: '2024-10-10', paidDate: null, paymentMethod: null }
  ];

  const units = ['Semua', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT'];
  const statuses = ['Semua', 'Lunas', 'Pending', 'Terlambat'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.nis.includes(searchQuery);
    const matchesUnit = filterUnit === 'Semua' || student.unit === filterUnit;
    const matchesStatus = filterStatus === 'Semua' || 
                         (filterStatus === 'Lunas' && student.status === 'clear') ||
                         (filterStatus === 'Pending' && student.status === 'current') ||
                         (filterStatus === 'Terlambat' && student.status === 'overdue');
    return matchesSearch && matchesUnit && matchesStatus;
  });

  const totalRevenue = students.reduce((sum, s) => sum + s.totalPaid, 0);
  const totalPending = students.reduce((sum, s) => sum + s.totalPending, 0);
  const totalOverdue = students.reduce((sum, s) => sum + s.totalOverdue, 0);
  const paidThisMonth = payments.filter(p => p.status === 'paid' && p.month === 'November').length;

  const stats = [
    {
      label: 'Total Penerimaan',
      value: `Rp ${(totalRevenue / 1000000).toFixed(1)}jt`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      detail: 'Tahun ajaran ini',
      trend: '+12%'
    },
    {
      label: 'Tagihan Pending',
      value: `Rp ${(totalPending / 1000000).toFixed(1)}jt`,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      detail: `${payments.filter(p => p.status === 'pending').length} tagihan`,
      trend: '-5%'
    },
    {
      label: 'Tunggakan',
      value: `Rp ${(totalOverdue / 1000000).toFixed(1)}jt`,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      detail: `${students.filter(s => s.status === 'overdue').length} siswa`,
      trend: '-8%'
    },
    {
      label: 'Lunas Bulan Ini',
      value: `${paidThisMonth}`,
      icon: CheckCircle,
      color: 'from-blue-500 to-blue-600',
      detail: `Dari ${students.length} siswa`,
      trend: '+15%'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'clear':
      case 'paid':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Lunas</span>;
      case 'current':
      case 'pending':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Lancar</span>;
      case 'overdue':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Terlambat</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{status}</span>;
    }
  };

  const handleOpenDetail = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar 
        menuItems={menuItems} 
        siteName="Admin Panel" 
        accentColor="#1E4AB8" 
      />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Keuangan</h1>
              <p className="text-gray-600 mt-1">Monitoring pembayaran SPP dan keuangan siswa</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-outline flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Laporan
              </button>
              <button className="btn-primary flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Input Pembayaran
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={`flex items-center text-xs font-medium px-2 py-1 rounded-lg ${
                    stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${stat.trend.startsWith('-') ? 'rotate-180' : ''}`} />
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-2">{stat.detail}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100">
              <div className="flex">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                    selectedTab === 'overview' 
                      ? 'text-[#1E4AB8]' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                  {selectedTab === 'overview' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E4AB8]" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedTab('students')}
                  className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                    selectedTab === 'students' 
                      ? 'text-[#1E4AB8]' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Data Siswa
                  {selectedTab === 'students' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E4AB8]" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedTab('transactions')}
                  className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                    selectedTab === 'transactions' 
                      ? 'text-[#1E4AB8]' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Transaksi
                  {selectedTab === 'transactions' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E4AB8]" />
                  )}
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari siswa, NIS, atau kelas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] bg-white"
                />
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterUnit}
                    onChange={(e) => setFilterUnit(e.target.value)}
                    className="pl-10 pr-8 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] appearance-none bg-white cursor-pointer"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] appearance-none bg-white cursor-pointer"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Content Table */}
            <div className="overflow-x-auto">
              {selectedTab === 'students' ? (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Siswa</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Unit & Kelas</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total Dibayar</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tunggakan</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredStudents.map((student) => (
                      <tr key={student.nis} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">NIS: {student.nis}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{student.unit}</div>
                          <div className="text-sm text-gray-500">{student.class}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-green-600 font-medium">{formatCurrency(student.totalPaid)}</div>
                          <div className="text-xs text-gray-400">Terakhir: {student.lastPayment}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-red-600 font-medium">{formatCurrency(student.totalOverdue)}</div>
                          <div className="text-xs text-gray-400">Pending: {formatCurrency(student.totalPending)}</div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(student.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleOpenDetail(student)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : selectedTab === 'transactions' ? (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID & Tanggal</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Siswa</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Pembayaran</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Jumlah</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">#{payment.id}</div>
                          <div className="text-sm text-gray-500">{payment.paidDate || payment.dueDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{payment.studentName}</div>
                          <div className="text-sm text-gray-500">{payment.unit} - {payment.class}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">SPP {payment.month} {payment.year}</div>
                          <div className="text-sm text-gray-500">{payment.paymentMethod || '-'}</div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  <p>Overview chart visualization would go here</p>
                  <button 
                    onClick={() => setSelectedTab('students')}
                    className="mt-4 text-[#1E4AB8] hover:underline"
                  >
                    View Student Data
                  </button>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <div>Menampilkan 1-10 dari {selectedTab === 'students' ? filteredStudents.length : payments.length} data</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Student Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                <p className="text-gray-500">{selectedStudent.unit} - {selectedStudent.class}</p>
              </div>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Total Dibayar</div>
                  <div className="text-xl font-bold text-green-600">{formatCurrency(selectedStudent.totalPaid)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Total Tunggakan</div>
                  <div className="text-xl font-bold text-red-600">{formatCurrency(selectedStudent.totalOverdue)}</div>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-4">Riwayat Pembayaran</h3>
              <div className="space-y-3">
                {payments
                  .filter(p => p.studentNis === selectedStudent.nis)
                  .map(payment => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">SPP {payment.month} {payment.year}</div>
                        <div className="text-sm text-gray-500">{payment.paidDate || `Jatuh tempo: ${payment.dueDate}`}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setShowReminderModal(true)}
                  className="btn-outline flex-1 flex justify-center items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim Pengingat
                </button>
                <button className="btn-primary flex-1 flex justify-center items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Kirim Pengingat Pembayaran</h3>
              <p className="text-gray-500 mt-2">
                Kirim notifikasi tagihan ke orang tua siswa melalui WhatsApp dan Email?
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowReminderModal(false)}
                className="btn-outline flex-1"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  alert('Pengingat berhasil dikirim!');
                  setShowReminderModal(false);
                }}
                className="btn-primary flex-1"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

