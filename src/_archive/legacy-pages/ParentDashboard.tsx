import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Users, BookOpen, DollarSign, MessageCircle, Calendar, Bell, Award, TrendingUp, CheckCircle, AlertCircle, Clock, Mail, Phone, ChevronRight, Download, Send } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ParentDashboardProps {
  onNavigate?: (page: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ onNavigate = () => {} }) => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const parentData = {
    name: 'Bapak Ahmad Fauzi',
    email: 'ahmad.fauzi@email.com',
    phone: '+62 812-3456-7890'
  };

  const children = [
    {
      nis: '2024001',
      name: 'Muhammad Rizki Pratama',
      class: 'XII IPA 1',
      unit: 'SMAIT',
      photo: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
      gpa: 3.85,
      attendance: 95,
      ranking: 3,
      waliKelas: 'Ustadz Ahmad',
      waliKelasPhone: '+62 813-4567-8901'
    },
    {
      nis: '2023045',
      name: 'Fatimah Azzahra',
      class: 'VIII B',
      unit: 'SMPIT',
      photo: 'https://images.unsplash.com/photo-1757876506562-0b0087ab3dcd',
      gpa: 3.92,
      attendance: 98,
      ranking: 2,
      waliKelas: 'Ustadzah Siti',
      waliKelasPhone: '+62 814-5678-9012'
    }
  ];

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => {} },
    { label: 'Akademik Anak', href: '#', onClick: () => {} },
    { label: 'Keuangan', href: '#', onClick: () => {} },
    { label: 'Komunikasi', href: '#', onClick: () => setShowMessageModal(true) },
    { label: 'Profile', href: '#', onClick: () => {} }
  ];

  const currentChild = children[selectedChild];

  const stats = [
    {
      label: 'IPK',
      value: currentChild.gpa.toFixed(2),
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      sublabel: 'Semester ini'
    },
    {
      label: 'Kehadiran',
      value: `${currentChild.attendance}%`,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      sublabel: 'Tahun ini'
    },
    {
      label: 'Ranking',
      value: `#${currentChild.ranking}`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      sublabel: 'Di kelasnya'
    },
    {
      label: 'Tunggakan',
      value: 'Lunas',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      sublabel: 'Status pembayaran'
    }
  ];

  const recentActivities = [
    {
      type: 'grade',
      subject: 'Matematika',
      description: 'Nilai ulangan: 92 (A)',
      date: '2024-11-25',
      icon: Award,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'attendance',
      description: 'Hadir tepat waktu',
      date: '2024-11-25',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'assignment',
      subject: 'Fisika',
      description: 'Tugas laporan praktikum dikumpulkan',
      date: '2024-11-24',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      type: 'payment',
      description: 'Pembayaran SPP Desember diterima',
      date: '2024-11-20',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'announcement',
      description: 'Pengumuman: UTS dimulai 15 Desember',
      date: '2024-11-18',
      icon: Bell,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Ujian Tengah Semester',
      date: '2024-12-15',
      time: '07:00 - 12:00',
      location: 'Ruang Kelas',
      type: 'Akademik'
    },
    {
      title: 'Parent-Teacher Meeting',
      date: '2024-12-20',
      time: '09:00 - 12:00',
      location: 'Aula',
      type: 'Rapat'
    },
    {
      title: 'Pembayaran SPP Januari',
      date: '2025-01-05',
      time: '-',
      location: 'Keuangan',
      type: 'Pembayaran'
    }
  ];

  const messages = [
    {
      from: 'Ustadz Ahmad (Wali Kelas)',
      subject: 'Perkembangan Akademik Rizki',
      preview: 'Assalamualaikum Bapak/Ibu, ingin melaporkan perkembangan Rizki semester ini...',
      date: '2024-11-25',
      unread: true
    },
    {
      from: 'Admin Keuangan',
      subject: 'Reminder Pembayaran SPP',
      preview: 'Pengingat pembayaran SPP bulan Desember...',
      date: '2024-11-20',
      unread: false
    },
    {
      from: 'Kepala Sekolah',
      subject: 'Undangan Parent Meeting',
      preview: 'Kami mengundang Bapak/Ibu untuk menghadiri parent meeting...',
      date: '2024-11-15',
      unread: false
    }
  ];

  const subjectPerformance = [
    { subject: 'Matematika', score: 92, trend: 'up', change: '+5' },
    { subject: 'Fisika', score: 88, trend: 'up', change: '+3' },
    { subject: 'Bahasa Inggris', score: 95, trend: 'stable', change: '0' },
    { subject: 'Kimia', score: 85, trend: 'down', change: '-2' },
    { subject: 'Biologi', score: 90, trend: 'up', change: '+4' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Portal Orang Tua - Baituljannah"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl mb-2">Selamat Datang, {parentData.name}! 👋</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {parentData.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {parentData.phone}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowMessageModal(true)}
              className="px-6 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hubungi Guru</span>
            </button>
          </div>
        </div>

        {/* Child Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
          <h2 className="text-lg mb-4">Pilih Anak:</h2>
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
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <span>{child.unit}</span>
                      <span>•</span>
                      <span>{child.class}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">NIS: {child.nis}</div>
                  </div>
                  {selectedChild === idx && (
                    <CheckCircle className="w-6 h-6 text-[#1E4AB8]" />
                  )}
                </div>
              </button>
            ))}
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
                <p className="text-xs text-gray-500">{stat.sublabel}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subject Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-[#1E4AB8]" />
                  Performa Akademik
                </h2>
                <button className="text-sm text-[#1E4AB8] hover:underline">
                  Lihat Detail
                </button>
              </div>
              <div className="space-y-4">
                {subjectPerformance.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.subject}</span>
                        <div className="flex items-center gap-2">
                          {item.trend === 'up' && (
                            <span className="text-green-600 text-sm flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {item.change}
                            </span>
                          )}
                          {item.trend === 'down' && (
                            <span className="text-red-600 text-sm flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 rotate-180" />
                              {item.change}
                            </span>
                          )}
                          <span className="text-2xl font-medium">{item.score}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.score >= 90 ? 'bg-green-500' :
                            item.score >= 80 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-[#1E4AB8]" />
                Aktivitas Terbaru
              </h2>
              <div className="space-y-3">
                {recentActivities.map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        {activity.subject && (
                          <p className="text-sm text-gray-500 mb-1">{activity.subject}</p>
                        )}
                        <p className="font-medium mb-1">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString('id-ID', { 
                            day: 'numeric', 
                            month: 'long', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-[#1E4AB8]" />
                  Pesan dari Sekolah
                </h2>
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="text-sm text-[#1E4AB8] hover:underline"
                >
                  Lihat Semua
                </button>
              </div>
              <div className="space-y-3">
                {messages.map((message, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      message.unread
                        ? 'bg-blue-50 border-blue-200 hover:border-blue-300'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-medium ${message.unread ? 'text-[#1E4AB8]' : ''}`}>
                        {message.from}
                      </h3>
                      {message.unread && (
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                          Baru
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-sm mb-1">{message.subject}</p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.preview}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Wali Kelas Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1E4AB8]" />
                Wali Kelas
              </h2>
              <div className="bg-white rounded-xl p-4">
                <h3 className="font-medium mb-3">{currentChild.waliKelas}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{currentChild.waliKelasPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Kelas {currentChild.class}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMessageModal(true)}
                  className="w-full mt-4 px-4 py-2 bg-[#1E4AB8] text-white rounded-lg hover:bg-[#1a3d9a] transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h2 className="text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#1E4AB8]" />
                Event Mendatang
              </h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        event.type === 'Akademik' ? 'bg-blue-100 text-blue-700' :
                        event.type === 'Rapat' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('id-ID')}</span>
                      </div>
                      {event.time !== '-' && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      )}
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
                    Download Rapor
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Bayar Tagihan
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors text-left flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Lihat Jadwal
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">Kirim Pesan ke Guru</h2>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kepada</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8]">
                  <option>{currentChild.waliKelas} (Wali Kelas)</option>
                  <option>Kepala Sekolah</option>
                  <option>Admin Keuangan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subjek</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8]"
                  placeholder="Subjek pesan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pesan</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8]"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Batal
              </button>
              <button className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                <span>Kirim Pesan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

