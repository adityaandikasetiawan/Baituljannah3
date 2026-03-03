'use client';

import React, { useState } from 'react';
import { Navbar } from '../../../components/layout/Navbar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { DollarSign, Calendar, Download, CreditCard, CheckCircle, AlertCircle, Clock, Bell, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface Child {
  nis: string;
  name: string;
  class: string;
  unit: string;
  photo: string;
  sppPerMonth: number;
  totalPaid: number;
  totalPending: number;
  lastPayment: string;
}

interface Payment {
  id: number;
  childNis: string;
  month: string;
  year: number;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate: string | null;
}

export default function ParentFinancePage() {
  const { menuItems } = useNavigationMenu('parent');
  const [selectedChild, setSelectedChild] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);

  const parentData = {
    name: 'Bapak Ahmad Fauzi',
    email: 'ahmad.fauzi@email.com'
  };

  const children: Child[] = [
    {
      nis: '2024001',
      name: 'Muhammad Rizki Pratama',
      class: 'XII IPA 1',
      unit: 'SMAIT',
      photo: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
      sppPerMonth: 1500000,
      totalPaid: 7500000,
      totalPending: 3000000,
      lastPayment: '2024-11-08'
    },
    {
      nis: '2023045',
      name: 'Fatimah Azzahra',
      class: 'VIII B',
      unit: 'SMPIT',
      photo: 'https://images.unsplash.com/photo-1757876506562-0b0087ab3dcd',
      sppPerMonth: 1200000,
      totalPaid: 6000000,
      totalPending: 2400000,
      lastPayment: '2024-11-07'
    }
  ];

  const allPayments: Payment[] = [
    // Rizki's payments
    { id: 1, childNis: '2024001', month: 'Juli', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-07-10', paidDate: '2024-07-08' },
    { id: 2, childNis: '2024001', month: 'Agustus', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-08-10', paidDate: '2024-08-09' },
    { id: 3, childNis: '2024001', month: 'September', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-09-10', paidDate: '2024-09-07' },
    { id: 4, childNis: '2024001', month: 'Oktober', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-10-10', paidDate: '2024-10-10' },
    { id: 5, childNis: '2024001', month: 'November', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-11-10', paidDate: '2024-11-08' },
    { id: 6, childNis: '2024001', month: 'Desember', year: 2024, amount: 1500000, status: 'pending', dueDate: '2024-12-10', paidDate: null },
    { id: 7, childNis: '2024001', month: 'Januari', year: 2025, amount: 1500000, status: 'pending', dueDate: '2025-01-10', paidDate: null },
    // Fatimah's payments
    { id: 8, childNis: '2023045', month: 'Juli', year: 2024, amount: 1200000, status: 'paid', dueDate: '2024-07-10', paidDate: '2024-07-07' },
    { id: 9, childNis: '2023045', month: 'Agustus', year: 2024, amount: 1200000, status: 'paid', dueDate: '2024-08-10', paidDate: '2024-08-08' },
    { id: 10, childNis: '2023045', month: 'September', year: 2024, amount: 1200000, status: 'paid', dueDate: '2024-09-10', paidDate: '2024-09-06' },
    { id: 11, childNis: '2023045', month: 'Oktober', year: 2024, amount: 1200000, status: 'paid', dueDate: '2024-10-10', paidDate: '2024-10-09' },
    { id: 12, childNis: '2023045', month: 'November', year: 2024, amount: 1200000, status: 'paid', dueDate: '2024-11-10', paidDate: '2024-11-07' },
    { id: 13, childNis: '2023045', month: 'Desember', year: 2024, amount: 1200000, status: 'pending', dueDate: '2024-12-10', paidDate: null },
    { id: 14, childNis: '2023045', month: 'Januari', year: 2025, amount: 1200000, status: 'pending', dueDate: '2025-01-10', paidDate: null }
  ];

  const currentChild = children[selectedChild];
  const childPayments = allPayments.filter(p => p.childNis === currentChild.nis);
  const pendingPayments = childPayments.filter(p => p.status === 'pending');

  const totalAllPaid = children.reduce((sum, child) => sum + child.totalPaid, 0);
  const totalAllPending = children.reduce((sum, child) => sum + child.totalPending, 0);

  const stats = [
    {
      label: 'Total Terbayar (Semua Anak)',
      value: `Rp ${(totalAllPaid / 1000000).toFixed(1)}jt`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      detail: `${children.length} anak`
    },
    {
      label: 'Total Tagihan Pending',
      value: `Rp ${(totalAllPending / 1000000).toFixed(1)}jt`,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      detail: `${allPayments.filter(p => p.status === 'pending').length} tagihan`
    },
    {
      label: 'Pembayaran Terakhir',
      value: new Date(Math.max(...children.map(c => new Date(c.lastPayment).getTime()))).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      detail: 'Pembayaran terkini'
    },
    {
      label: 'Status Keseluruhan',
      value: totalAllPending === 0 ? 'Lunas' : 'Ada Tagihan',
      icon: totalAllPending === 0 ? CheckCircle : Bell,
      color: totalAllPending === 0 ? 'from-purple-500 to-purple-600' : 'from-red-500 to-red-600',
      detail: totalAllPending === 0 ? 'Semua lunas' : 'Perlu perhatian'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSelectPayment = (paymentId: number) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handlePaySelected = () => {
    if (selectedPayments.length > 0) {
      setShowPaymentModal(true);
    }
  };

  const totalSelectedAmount = selectedPayments.reduce((sum, id) => {
    const payment = childPayments.find(p => p.id === id);
    return sum + (payment?.amount || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Portal Orang Tua - Keuangan"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl mb-2">Manajemen Keuangan & SPP Anak</h1>
              <p className="text-white/90">{parentData.name} • {parentData.email}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>Export Rekap</span>
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

        {/* Child Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
          <h2 className="text-lg mb-4">Pilih Anak untuk Melihat Detail:</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {children.map((child, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedChild(idx)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedChild === idx
                    ? 'border-[#1E4AB8] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-soft">
                    <ImageWithFallback
                      src={child.photo}
                      alt={child.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{child.name}</h3>
                    <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                      <span>{child.unit}</span>
                      <span>•</span>
                      <span>{child.class}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Lunas: {formatCurrency(child.totalPaid)}
                      </span>
                      {child.totalPending > 0 && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                          Pending: {formatCurrency(child.totalPending)}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedChild === idx && (
                    <CheckCircle className="w-6 h-6 text-[#1E4AB8]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Payments */}
            {pendingPayments.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                    Tagihan yang Belum Dibayar
                  </h2>
                  {selectedPayments.length > 0 && (
                    <button
                      onClick={handlePaySelected}
                      className="px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Bayar {selectedPayments.length} Item</span>
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {pendingPayments.map((payment) => (
                    <div key={payment.id} className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-xl">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => handleSelectPayment(payment.id)}
                          className="mt-1 w-5 h-5 text-[#1E4AB8] rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium mb-1">SPP {payment.month} {payment.year}</h4>
                              <p className="text-sm text-gray-600">
                                Jatuh tempo: {new Date(payment.dueDate).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                            <p className="text-2xl text-[#1E4AB8]">{formatCurrency(payment.amount)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPayments.length > 0 && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total yang Dipilih:</span>
                      <span className="text-2xl text-[#1E4AB8]">{formatCurrency(totalSelectedAmount)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment History */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl mb-6">Riwayat Pembayaran</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Periode</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Jumlah</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Jatuh Tempo</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tanggal Bayar</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {childPayments.map((payment, idx) => (
                      <tr key={payment.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-4 py-3 text-sm">{payment.month} {payment.year}</td>
                        <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                        <td className="px-4 py-3 text-sm">{new Date(payment.dueDate).toLocaleDateString('id-ID')}</td>
                        <td className="px-4 py-3 text-sm">
                          {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('id-ID') : '-'}
                        </td>
                        <td className="px-4 py-3">
                          {payment.status === 'paid' ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1 w-fit">
                              <CheckCircle className="w-3 h-3" />
                              Lunas
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs flex items-center gap-1 w-fit">
                              <Clock className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {payment.status === 'paid' ? (
                            <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          ) : (
                            <button className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm">
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
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-8">
            {/* Child Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg mb-4">Ringkasan {currentChild.name.split(' ')[0]}</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">SPP Per Bulan</p>
                  <p className="text-2xl text-gray-800">{formatCurrency(currentChild.sppPerMonth)}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Terbayar</p>
                  <p className="text-2xl text-green-600">{formatCurrency(currentChild.totalPaid)}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Pending</p>
                  <p className="text-2xl text-orange-600">{formatCurrency(currentChild.totalPending)}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Pembayaran Terakhir</p>
                  <p className="font-medium">{new Date(currentChild.lastPayment).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            </div>

            {/* All Children Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg mb-4">Rekap Semua Anak</h2>
              <div className="space-y-4">
                {children.map((child, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={child.photo}
                          alt={child.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{child.name.split(' ')[0]}</p>
                        <p className="text-xs text-gray-600">{child.unit}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-600">Lunas</p>
                        <p className="font-medium text-green-600">{formatCurrency(child.totalPaid)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Pending</p>
                        <p className="font-medium text-orange-600">{formatCurrency(child.totalPending)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Rekap
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal would go here */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">Konfirmasi Pembayaran</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </button>
              </div>
            </div>
            <div className="p-6">
               <p className="text-center text-gray-500">Fitur pembayaran akan segera tersedia.</p>
               <div className="mt-6 flex justify-end">
                 <button 
                   onClick={() => setShowPaymentModal(false)}
                   className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors"
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

