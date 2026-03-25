'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { DollarSign, Calendar, Download, CreditCard, CheckCircle, AlertCircle, XCircle, Clock, FileText } from 'lucide-react';

interface PaymentItem {
  id: number;
  month: string;
  year: number;
  category: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string | null;
  invoiceNumber: string;
}

export default function StudentFinancePage() {
  const { menuItems } = useNavigationMenu('student');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'invoice'>('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);

  const studentData = {
    nis: '2024001',
    name: 'Muhammad Rizki Pratama',
    class: 'XII IPA 1',
    unit: 'SMAIT',
    tahunAjaran: '2024/2025'
  };

  const payments: PaymentItem[] = [
    {
      id: 1,
      month: 'Juli',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-07-10',
      paidDate: '2024-07-08',
      status: 'paid',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2024-07-001'
    },
    {
      id: 2,
      month: 'Agustus',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-08-10',
      paidDate: '2024-08-09',
      status: 'paid',
      paymentMethod: 'Virtual Account',
      invoiceNumber: 'INV-2024-08-001'
    },
    {
      id: 3,
      month: 'September',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-09-10',
      paidDate: '2024-09-07',
      status: 'paid',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2024-09-001'
    },
    {
      id: 4,
      month: 'Oktober',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-10-10',
      paidDate: '2024-10-10',
      status: 'paid',
      paymentMethod: 'E-Wallet',
      invoiceNumber: 'INV-2024-10-001'
    },
    {
      id: 5,
      month: 'November',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-11-10',
      paidDate: '2024-11-08',
      status: 'paid',
      paymentMethod: 'Transfer Bank',
      invoiceNumber: 'INV-2024-11-001'
    },
    {
      id: 6,
      month: 'Desember',
      year: 2024,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2024-12-10',
      paidDate: null,
      status: 'pending',
      paymentMethod: null,
      invoiceNumber: 'INV-2024-12-001'
    },
    {
      id: 7,
      month: 'Januari',
      year: 2025,
      category: 'SPP',
      amount: 1500000,
      dueDate: '2025-01-10',
      paidDate: null,
      status: 'pending',
      paymentMethod: null,
      invoiceNumber: 'INV-2025-01-001'
    }
  ];

  const additionalFees = [
    {
      id: 1,
      name: 'Kegiatan Study Tour',
      amount: 2500000,
      dueDate: '2024-12-15',
      status: 'pending' as const
    },
    {
      id: 2,
      name: 'Seragam Batik',
      amount: 350000,
      dueDate: '2024-12-20',
      status: 'pending' as const
    }
  ];

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: 'Total Terbayar',
      value: `Rp ${(totalPaid / 1000000).toFixed(1)}jt`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      detail: `${payments.filter(p => p.status === 'paid').length} bulan`
    },
    {
      label: 'Tagihan Pending',
      value: `Rp ${(totalPending / 1000000).toFixed(1)}jt`,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      detail: `${payments.filter(p => p.status === 'pending').length} bulan`
    },
    {
      label: 'Status',
      value: totalOverdue === 0 ? 'Lancar' : 'Tunggakan',
      icon: totalOverdue === 0 ? CheckCircle : AlertCircle,
      color: totalOverdue === 0 ? 'from-blue-500 to-blue-600' : 'from-red-500 to-red-600',
      detail: totalOverdue === 0 ? 'Tidak ada tunggakan' : `Rp ${(totalOverdue / 1000000).toFixed(1)}jt`
    },
    {
      label: 'Total SPP/Bulan',
      value: 'Rp 1,5jt',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      detail: 'SPP Bulanan'
    }
  ];

  const handlePayment = (payment: PaymentItem) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

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

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const openInvoiceWindow = (payment: PaymentItem) => {
    const title = payment.status === 'paid' ? 'Kuitansi Pembayaran' : 'Invoice Tagihan';
    const statusLabel = payment.status === 'paid' ? 'LUNAS' : payment.status === 'pending' ? 'PENDING' : 'TERLAMBAT';
    const statusColor = payment.status === 'paid' ? '#16a34a' : payment.status === 'pending' ? '#f97316' : '#dc2626';
    const issueDate = payment.status === 'paid' ? payment.paidDate : new Date().toISOString().slice(0, 10);

    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(payment.invoiceNumber)} - ${escapeHtml(title)}</title>
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
    @media print { body { padding: 0; } .top, .section { border: none; border-radius: 0; padding: 0; } .wrap { max-width: none; } }
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
        <p class="value">${escapeHtml(payment.invoiceNumber)}</p>
        <span class="badge">${escapeHtml(statusLabel)}</span>
      </div>
    </div>

    <div class="section">
      <div class="grid">
        <div>
          <p class="k">Siswa</p>
          <p class="v">${escapeHtml(studentData.name)}</p>
        </div>
        <div>
          <p class="k">NIS</p>
          <p class="v">${escapeHtml(studentData.nis)}</p>
        </div>
        <div>
          <p class="k">Unit & Kelas</p>
          <p class="v">${escapeHtml(`${studentData.unit} • ${studentData.class}`)}</p>
        </div>
        <div>
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
            <td>${escapeHtml(`${payment.category} ${payment.month} ${payment.year}`)}</td>
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
        <div>
          <p class="k">Jatuh Tempo</p>
          <p class="v">${escapeHtml(formatDate(payment.dueDate))}</p>
        </div>
        <div>
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
      case 'paid':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Lunas
        </span>;
      case 'pending':
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Belum Bayar
        </span>;
      case 'overdue':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Terlambat
        </span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        accentColor="#1E4AB8"
        userRole="Siswa"
        userName={studentData.name}
        panelTitle="Portal Siswa"
        panelSubtitle={`${studentData.unit} • ${studentData.class}`}
      />

      <main className="flex-1 p-6 md:p-8">
        <div className="container-custom">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl mb-2">Informasi Keuangan & SPP</h1>
              <div className="flex flex-wrap items-center gap-3 text-white/90">
                <span>{studentData.name}</span>
                <span>•</span>
                <span>{studentData.nis}</span>
                <span>•</span>
                <span>{studentData.class}</span>
                <span>•</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  TA {studentData.tahunAjaran}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>Download Rekap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft mb-8 overflow-hidden">
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
                Ringkasan Tagihan
              </button>
              <button
                onClick={() => setSelectedTab('history')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'history'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Riwayat Pembayaran
              </button>
              <button
                onClick={() => setSelectedTab('invoice')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'invoice'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Invoice & Kuitansi
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Pending Payments */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Tagihan yang Belum Dibayar
                  </h3>
                  <div className="space-y-3">
                    {payments.filter(p => p.status === 'pending' || p.status === 'overdue').map((payment) => (
                      <div key={payment.id} className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium mb-1">{payment.category} - {payment.month} {payment.year}</h4>
                            <p className="text-sm text-gray-600">Jatuh tempo: {new Date(payment.dueDate).toLocaleDateString('id-ID')}</p>
                          </div>
                          {getStatusBadge(payment.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl text-[#1E4AB8]">{formatCurrency(payment.amount)}</p>
                          <button
                            onClick={() => handlePayment(payment)}
                            className="px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>Bayar Sekarang</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Fees */}
                {additionalFees.length > 0 && (
                  <div>
                    <h3 className="text-lg mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Tagihan Lainnya
                    </h3>
                    <div className="space-y-3">
                      {additionalFees.map((fee) => (
                        <div key={fee.id} className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium mb-1">{fee.name}</h4>
                              <p className="text-sm text-gray-600">Jatuh tempo: {new Date(fee.dueDate).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl mb-2">{formatCurrency(fee.amount)}</p>
                              <button className="px-4 py-1 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm">
                                Bayar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <h3 className="text-lg mb-4">Ringkasan Pembayaran Tahun Ajaran {studentData.tahunAjaran}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Total SPP</p>
                      <p className="text-2xl text-gray-800">{formatCurrency(payments.length * 1500000)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Sudah Dibayar</p>
                      <p className="text-2xl text-green-600">{formatCurrency(totalPaid)}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Sisa Tagihan</p>
                      <p className="text-2xl text-orange-600">{formatCurrency(totalPending)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {selectedTab === 'history' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Riwayat Pembayaran Lengkap</h3>
                  <select className="px-4 py-2 border border-gray-200 rounded-xl outline-none">
                    <option>Semua Status</option>
                    <option>Lunas</option>
                    <option>Pending</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Periode</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Kategori</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Jumlah</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Jatuh Tempo</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tgl Bayar</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Metode</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, idx) => (
                        <tr key={payment.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <td className="px-4 py-3 text-sm">{payment.month} {payment.year}</td>
                          <td className="px-4 py-3 text-sm">{payment.category}</td>
                          <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="px-4 py-3 text-sm">{new Date(payment.dueDate).toLocaleDateString('id-ID')}</td>
                          <td className="px-4 py-3 text-sm">
                            {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('id-ID') : '-'}
                          </td>
                          <td className="px-4 py-3 text-sm">{payment.paymentMethod || '-'}</td>
                          <td className="px-4 py-3">{getStatusBadge(payment.status)}</td>
                          <td className="px-4 py-3">
                            {payment.status === 'paid' ? (
                              <button
                                onClick={() => openInvoiceWindow(payment)}
                                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePayment(payment)}
                                className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm"
                              >
                                Bayar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Invoice Tab */}
            {selectedTab === 'invoice' && (
              <div className="space-y-4">
                <h3 className="text-lg mb-4">Download Invoice & Kuitansi</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {payments.filter(p => p.status === 'paid').map((payment) => (
                    <div key={payment.id} className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium mb-1">{payment.month} {payment.year}</h4>
                          <p className="text-sm text-gray-600">No. Invoice: {payment.invoiceNumber}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          Lunas
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <p className="text-xl mb-1">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-gray-500">Dibayar: {payment.paidDate && new Date(payment.paidDate).toLocaleDateString('id-ID')}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openInvoiceWindow(payment)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Download / Print"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openInvoiceWindow(payment)}
                            className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Lihat / Print"
                          >
                            <FileText className="w-5 h-5" />
                          </button>
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
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Detail Pembayaran</h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Item Pembayaran</span>
                  <span className="font-medium">{selectedPayment.category} - {selectedPayment.month} {selectedPayment.year}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Nominal</span>
                  <span className="font-medium">{formatCurrency(selectedPayment.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jatuh Tempo</span>
                  <span className="font-medium text-orange-600">{new Date(selectedPayment.dueDate).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
              
              <h4 className="font-medium mb-3">Pilih Metode Pembayaran</h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] hover:bg-blue-50 transition-all text-left">
                  <div className="font-medium mb-1">Transfer Bank</div>
                  <div className="text-xs text-gray-500">BSI, Mandiri, BCA</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] hover:bg-blue-50 transition-all text-left">
                  <div className="font-medium mb-1">Virtual Account</div>
                  <div className="text-xs text-gray-500">Otomatis konfirmasi</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] hover:bg-blue-50 transition-all text-left">
                  <div className="font-medium mb-1">E-Wallet</div>
                  <div className="text-xs text-gray-500">GoPay, OVO, Dana</div>
                </button>
                <button className="p-4 border border-gray-200 rounded-xl hover:border-[#1E4AB8] hover:bg-blue-50 transition-all text-left">
                  <div className="font-medium mb-1">Minimarket</div>
                  <div className="text-xs text-gray-500">Indomaret, Alfamart</div>
                </button>
              </div>

              <button className="w-full py-3 bg-[#1E4AB8] text-white rounded-xl font-medium hover:bg-[#1a3d9a] transition-colors">
                Lanjut Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

