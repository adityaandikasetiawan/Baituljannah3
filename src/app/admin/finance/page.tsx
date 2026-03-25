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
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<Payment | null>(null);

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

  const formatDate = (value: string | null) => {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const monthToNumber = (month: string) => {
    const m = month.toLowerCase();
    const map: Record<string, string> = {
      januari: '01',
      februari: '02',
      maret: '03',
      april: '04',
      mei: '05',
      juni: '06',
      juli: '07',
      agustus: '08',
      september: '09',
      oktober: '10',
      november: '11',
      desember: '12'
    };
    return map[m] ?? '00';
  };

  const buildInvoiceNumber = (payment: Payment) => {
    const mm = monthToNumber(payment.month);
    return `INV-${payment.year}-${mm}-${String(payment.id).padStart(3, '0')}`;
  };

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const openInvoiceWindow = (payment: Payment) => {
    const invoiceNumber = buildInvoiceNumber(payment);
    const issueDate = payment.status === 'paid' ? payment.paidDate : new Date().toISOString().slice(0, 10);
    const title = payment.status === 'paid' ? 'Kuitansi Pembayaran' : 'Invoice Tagihan';
    const statusLabel = payment.status === 'paid' ? 'LUNAS' : payment.status === 'pending' ? 'PENDING' : 'TERLAMBAT';
    const statusColor = payment.status === 'paid' ? '#16a34a' : payment.status === 'pending' ? '#f97316' : '#dc2626';

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(invoiceNumber)} - ${escapeHtml(title)}</title>
  <style>
    :root { --accent: #1E4AB8; --muted: #64748b; --border: #e2e8f0; }
    * { box-sizing: border-box; }
    body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; margin: 0; padding: 24px; color: #0f172a; background: #ffffff; }
    .wrap { max-width: 820px; margin: 0 auto; }
    .top { display: flex; justify-content: space-between; gap: 16px; border: 1px solid var(--border); border-radius: 16px; padding: 20px; }
    .brand h1 { font-size: 18px; margin: 0 0 6px; letter-spacing: 0.3px; }
    .brand p { margin: 0; color: var(--muted); font-size: 12px; }
    .meta { text-align: right; }
    .meta .label { color: var(--muted); font-size: 12px; margin: 0 0 4px; }
    .meta .value { margin: 0 0 10px; font-weight: 700; }
    .badge { display: inline-block; padding: 6px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid var(--border); color: ${statusColor}; }
    .section { margin-top: 18px; border: 1px solid var(--border); border-radius: 16px; padding: 20px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .kv { margin: 0; }
    .k { color: var(--muted); font-size: 12px; margin: 0 0 4px; }
    .v { margin: 0; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin-top: 14px; }
    th, td { border-bottom: 1px solid var(--border); padding: 10px 8px; text-align: left; font-size: 13px; }
    th { color: var(--muted); font-weight: 700; font-size: 12px; letter-spacing: 0.2px; }
    .right { text-align: right; }
    .total { display: flex; justify-content: flex-end; margin-top: 14px; }
    .totalbox { min-width: 300px; border: 1px solid var(--border); border-radius: 14px; padding: 14px; }
    .totalrow { display: flex; justify-content: space-between; margin: 6px 0; }
    .grand { font-weight: 800; font-size: 15px; }
    .foot { margin-top: 16px; color: var(--muted); font-size: 12px; }
    @media print {
      body { padding: 0; }
      .top, .section { border: none; border-radius: 0; padding: 0; }
      .wrap { max-width: none; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div class="brand">
        <h1>Yayasan Baituljannah</h1>
        <p>${escapeHtml(title)}</p>
      </div>
      <div class="meta">
        <p class="label">No. Dokumen</p>
        <p class="value">${escapeHtml(invoiceNumber)}</p>
        <span class="badge">${escapeHtml(statusLabel)}</span>
      </div>
    </div>

    <div class="section">
      <div class="grid">
        <div class="kv">
          <p class="k">Siswa</p>
          <p class="v">${escapeHtml(payment.studentName)}</p>
        </div>
        <div class="kv">
          <p class="k">NIS</p>
          <p class="v">${escapeHtml(payment.studentNis)}</p>
        </div>
        <div class="kv">
          <p class="k">Unit & Kelas</p>
          <p class="v">${escapeHtml(`${payment.unit} • ${payment.class}`)}</p>
        </div>
        <div class="kv">
          <p class="k">Tanggal</p>
          <p class="v">${escapeHtml(formatDate(issueDate))}</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th class="right">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SPP ${escapeHtml(payment.month)} ${escapeHtml(String(payment.year))}</td>
            <td class="right">${escapeHtml(formatCurrency(payment.amount))}</td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <div class="totalbox">
          <div class="totalrow grand">
            <div>Total</div>
            <div>${escapeHtml(formatCurrency(payment.amount))}</div>
          </div>
        </div>
      </div>

      <div class="grid" style="margin-top: 18px;">
        <div class="kv">
          <p class="k">Jatuh Tempo</p>
          <p class="v">${escapeHtml(formatDate(payment.dueDate))}</p>
        </div>
        <div class="kv">
          <p class="k">Metode Pembayaran</p>
          <p class="v">${escapeHtml(payment.paymentMethod ?? '-')}</p>
        </div>
      </div>

      <p class="foot">Dokumen ini dihasilkan oleh sistem. Silakan simpan sebagai PDF melalui fitur print browser.</p>
    </div>
  </div>
</body>
</html>`;

    const w = window.open('', '_blank', 'noopener,noreferrer');
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
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

  const handleOpenInvoice = (payment: Payment) => {
    setSelectedInvoicePayment(payment);
    setShowInvoiceModal(true);
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
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleOpenInvoice(payment)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Lihat Invoice"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openInvoiceWindow(payment)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Download / Print"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
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

      {showInvoiceModal && selectedInvoicePayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Invoice</h3>
                <p className="text-sm text-gray-500">
                  {buildInvoiceNumber(selectedInvoicePayment)} • {selectedInvoicePayment.studentName}
                </p>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">Siswa</div>
                  <div className="font-semibold text-gray-900">{selectedInvoicePayment.studentName}</div>
                  <div className="text-sm text-gray-600">NIS: {selectedInvoicePayment.studentNis}</div>
                  <div className="text-sm text-gray-600">{selectedInvoicePayment.unit} • {selectedInvoicePayment.class}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1">Item</div>
                  <div className="font-semibold text-gray-900">SPP {selectedInvoicePayment.month} {selectedInvoicePayment.year}</div>
                  <div className="text-sm text-gray-600">Jatuh tempo: {formatDate(selectedInvoicePayment.dueDate)}</div>
                  <div className="text-sm text-gray-600">Metode: {selectedInvoicePayment.paymentMethod || '-'}</div>
                </div>
              </div>

              <div className="flex items-center justify-between border border-gray-100 rounded-xl p-4">
                <div>
                  <div className="text-xs text-gray-500">Total</div>
                  <div className="text-xl font-bold text-gray-900">{formatCurrency(selectedInvoicePayment.amount)}</div>
                </div>
                <div>{getStatusBadge(selectedInvoicePayment.status)}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    openInvoiceWindow(selectedInvoicePayment);
                    setShowInvoiceModal(false);
                  }}
                  className="btn-primary flex-1 flex justify-center items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download / Print
                </button>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="btn-outline flex-1"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

