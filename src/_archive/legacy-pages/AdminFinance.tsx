import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { DollarSign, TrendingUp, Users, Calendar, Search, Filter, Download, CheckCircle, Clock, XCircle, AlertCircle, Eye, Edit, Send, X, Check } from 'lucide-react';

interface AdminFinanceProps {
  onNavigate?: (page: string) => void;
}

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

export const AdminFinance: React.FC<AdminFinanceProps> = ({ onNavigate = () => {} }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'students' | 'transactions'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnit, setFilterUnit] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate('admin-super') },
    { label: 'Keuangan', href: '#', onClick: () => {} },
    { label: 'Siswa', href: '#', onClick: () => onNavigate('admin-students') },
    { label: 'Laporan', href: '#', onClick: () => {} }
  ];

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
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Lunas</span>;
      case 'current':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Lancar</span>;
      case 'overdue':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Menunggak</span>;
      default:
        return null;
    }
  };

  const handleViewDetail = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const overdueStudents = students.filter(s => s.status === 'overdue');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Admin Panel - Keuangan"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Manajemen Keuangan & SPP</h1>
              <p className="text-gray-600">Kelola pembayaran SPP seluruh siswa</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReminderModal(true)}
                className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>Kirim Pengingat ({overdueStudents.length})</span>
              </button>
              <button className="px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>Export Laporan</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{stat.detail}</p>
                    <span className={`text-xs flex items-center gap-1 ${
                      stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${stat.trend.startsWith('-') ? 'rotate-180' : ''}`} />
                      {stat.trend}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau NIS siswa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
              />
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterUnit}
                onChange={(e) => setFilterUnit(e.target.value)}
                className="w-full py-2 bg-transparent outline-none"
              >
                {units.map(unit => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
              <Users className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full py-2 bg-transparent outline-none"
              >
                {statuses.map(status => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan <strong>{filteredStudents.length}</strong> dari <strong>{students.length}</strong> siswa
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('overview')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'overview'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Ringkasan
              </button>
              <button
                onClick={() => setSelectedTab('students')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'students'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Per Siswa
              </button>
              <button
                onClick={() => setSelectedTab('transactions')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'transactions'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Transaksi
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Overdue Alert */}
                {overdueStudents.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-medium text-red-900 mb-2">
                          {overdueStudents.length} Siswa Memiliki Tunggakan
                        </h3>
                        <p className="text-sm text-red-700 mb-4">
                          Total tunggakan: {formatCurrency(totalOverdue)}
                        </p>
                        <button
                          onClick={() => setShowReminderModal(true)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Kirim Pengingat Massal
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Revenue Chart Placeholder */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-lg mb-4">Penerimaan Per Unit</h3>
                    <div className="space-y-3">
                      {['SMAIT', 'SMPIT', 'SDIT', 'TKIT', 'SLBIT'].map((unit, idx) => {
                        const unitTotal = students.filter(s => s.unit === unit).reduce((sum, s) => sum + s.totalPaid, 0);
                        const percentage = (unitTotal / totalRevenue) * 100;
                        return (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{unit}</span>
                              <span className="text-sm text-gray-600">{formatCurrency(unitTotal)}</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-2">
                              <div 
                                className="bg-[#1E4AB8] h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="text-lg mb-4">Status Pembayaran</h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Lunas</p>
                              <p className="font-medium">{students.filter(s => s.status === 'clear').length} siswa</p>
                            </div>
                          </div>
                          <p className="text-xl">{Math.round((students.filter(s => s.status === 'clear').length / students.length) * 100)}%</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Lancar</p>
                              <p className="font-medium">{students.filter(s => s.status === 'current').length} siswa</p>
                            </div>
                          </div>
                          <p className="text-xl">{Math.round((students.filter(s => s.status === 'current').length / students.length) * 100)}%</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                              <XCircle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Menunggak</p>
                              <p className="font-medium">{students.filter(s => s.status === 'overdue').length} siswa</p>
                            </div>
                          </div>
                          <p className="text-xl">{Math.round((students.filter(s => s.status === 'overdue').length / students.length) * 100)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {selectedTab === 'students' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">NIS</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Nama Siswa</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Kelas</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Unit</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Terbayar</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Pending</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tunggakan</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => (
                      <tr key={student.nis} className={`border-b border-gray-100 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-4 py-3 text-sm">{student.nis}</td>
                        <td className="px-4 py-3 text-sm font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-sm">{student.class}</td>
                        <td className="px-4 py-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {student.unit}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-green-600 font-medium">
                          {formatCurrency(student.totalPaid)}
                        </td>
                        <td className="px-4 py-3 text-sm text-orange-600 font-medium">
                          {formatCurrency(student.totalPending)}
                        </td>
                        <td className="px-4 py-3 text-sm text-red-600 font-medium">
                          {formatCurrency(student.totalOverdue)}
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(student.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewDetail(student)}
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Transactions Tab */}
            {selectedTab === 'transactions' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Transaksi Terbaru</h3>
                  <select className="px-4 py-2 border border-gray-200 rounded-xl outline-none">
                    <option>Semua Status</option>
                    <option>Lunas</option>
                    <option>Pending</option>
                    <option>Terlambat</option>
                  </select>
                </div>

                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div key={payment.id} className={`p-4 rounded-xl border-l-4 ${
                      payment.status === 'paid' ? 'bg-green-50 border-green-500' :
                      payment.status === 'pending' ? 'bg-orange-50 border-orange-500' :
                      'bg-red-50 border-red-500'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{payment.studentName}</h4>
                            <span className="px-2 py-0.5 bg-white rounded-full text-xs">{payment.unit}</span>
                            <span className="px-2 py-0.5 bg-white rounded-full text-xs">{payment.class}</span>
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-4">
                            <span>SPP {payment.month} {payment.year}</span>
                            <span>•</span>
                            <span>Jatuh tempo: {new Date(payment.dueDate).toLocaleDateString('id-ID')}</span>
                            {payment.paidDate && (
                              <>
                                <span>•</span>
                                <span>Dibayar: {new Date(payment.paidDate).toLocaleDateString('id-ID')}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl mb-2">{formatCurrency(payment.amount)}</p>
                          {payment.status === 'paid' ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              Lunas
                            </span>
                          ) : payment.status === 'pending' ? (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                              Pending
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                              Terlambat
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">Detail Pembayaran - {selectedStudent.name}</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Terbayar</p>
                  <p className="text-2xl text-green-600">{formatCurrency(selectedStudent.totalPaid)}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Pending</p>
                  <p className="text-2xl text-orange-600">{formatCurrency(selectedStudent.totalPending)}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Tunggakan</p>
                  <p className="text-2xl text-red-600">{formatCurrency(selectedStudent.totalOverdue)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Riwayat Pembayaran</h3>
                <div className="space-y-2">
                  {payments
                    .filter(p => p.studentNis === selectedStudent.nis)
                    .map(payment => (
                      <div key={payment.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{payment.month} {payment.year}</p>
                          <p className="text-xs text-gray-600">
                            {payment.paidDate 
                              ? `Dibayar: ${new Date(payment.paidDate).toLocaleDateString('id-ID')}`
                              : `Jatuh tempo: ${new Date(payment.dueDate).toLocaleDateString('id-ID')}`
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          {payment.status === 'paid' && (
                            <p className="text-xs text-green-600">Lunas</p>
                          )}
                          {payment.status === 'pending' && (
                            <p className="text-xs text-orange-600">Pending</p>
                          )}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">Kirim Pengingat Pembayaran</h2>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="font-medium mb-2">Akan mengirim pengingat ke:</p>
                <p className="text-sm text-gray-600">{overdueStudents.length} siswa dengan tunggakan</p>
                <p className="text-sm text-gray-600">Total tunggakan: {formatCurrency(totalOverdue)}</p>
              </div>

              <div className="space-y-3">
                {overdueStudents.map(student => (
                  <div key={student.nis} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.class} - {student.unit}</p>
                    </div>
                    <p className="font-medium text-red-600">{formatCurrency(student.totalOverdue)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowReminderModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                <span>Kirim Pengingat</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

