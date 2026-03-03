import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Calendar, Clock, MapPin, Users, Tag, ChevronLeft, ChevronRight, Download, Filter, X, Sparkles, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface EventsProps {
  onNavigate?: (page: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onNavigate = () => {} }) => {
  const [selectedMonth, setSelectedMonth] = useState(11); // December (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => onNavigate('main') },
    {
      label: 'Informasi',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => onNavigate('news') },
        { label: 'Event & Kalender', href: '#', onClick: () => onNavigate('events') },
        { label: 'Galeri', href: '#', onClick: () => onNavigate('gallery') },
        { label: 'Prestasi', href: '#', onClick: () => onNavigate('achievement') }
      ]
    },
    { label: 'Program', href: '#', onClick: () => onNavigate('programs') },
    { label: 'PPDB', href: '#', onClick: () => onNavigate('admission') },
    { label: 'Kontak', href: '#', onClick: () => onNavigate('contact') }
  ];

  const events = [
    {
      id: 1,
      title: 'Peringatan Maulid Nabi Muhammad SAW',
      date: '2024-12-15',
      time: '08:00 - 12:00 WIB',
      location: 'Aula Utama Baituljannah',
      category: 'Keagamaan',
      unit: 'Semua Unit',
      description: 'Peringatan Maulid Nabi dengan berbagai kegiatan seperti lomba tahfidz, ceramah, dan pentas seni Islami.',
      image: 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
      capacity: '500 Peserta',
      status: 'Mendatang',
      accentColor: '#10B981',
      agenda: [
        '08:00 - Pembukaan & Tilawah',
        '09:00 - Ceramah Sirah Nabawiyah',
        '10:00 - Lomba Tahfidz',
        '11:00 - Pentas Seni Islami',
        '12:00 - Penutupan'
      ]
    },
    {
      id: 2,
      title: 'Ujian Akhir Semester Ganjil',
      date: '2024-12-18',
      time: '07:30 - 12:00 WIB',
      location: 'Ruang Kelas Masing-masing',
      category: 'Akademik',
      unit: 'SDIT, SMPIT, SMAIT, SLBIT',
      description: 'Pelaksanaan Ujian Akhir Semester Ganjil Tahun Ajaran 2024/2025.',
      image: 'https://images.unsplash.com/photo-1660795468878-d9d8d75967b9',
      capacity: '1500 Siswa',
      status: 'Mendatang',
      accentColor: '#3B82F6',
      agenda: [
        '07:00 - Persiapan Ruang Ujian',
        '07:30 - Siswa Masuk Ruangan',
        '08:00 - Ujian Dimulai',
        '10:00 - Ujian Selesai',
        '10:15 - Siswa Keluar Tertib'
      ]
    },
    {
      id: 3,
      title: 'Liburan Semester Ganjil',
      date: '2024-12-23',
      time: 'All Day',
      location: '-',
      category: 'Libur',
      unit: 'Semua Unit',
      description: 'Libur semester ganjil untuk siswa. Kegiatan belajar mengajar akan dimulai kembali tanggal 6 Januari 2025.',
      image: 'https://images.unsplash.com/photo-1595566358869-ddd6f35a964c',
      capacity: '-',
      status: 'Mendatang',
      accentColor: '#F97316',
      agenda: [
        'Libur Semester Ganjil',
        'Kegiatan Mandiri Siswa',
        'Bimbingan Online (Opsional)'
      ]
    },
    {
      id: 4,
      title: 'Tahun Baru 2025',
      date: '2025-01-01',
      time: 'All Day',
      location: '-',
      category: 'Libur',
      unit: 'Semua Unit',
      description: 'Libur Nasional Tahun Baru 2025.',
      image: 'https://images.unsplash.com/photo-1759922378135-c68df8312190',
      capacity: '-',
      status: 'Mendatang',
      accentColor: '#8B5CF6',
      agenda: []
    },
    {
      id: 5,
      title: 'Mulai Semester Genap',
      date: '2025-01-06',
      time: '07:00 WIB',
      location: 'Sekolah',
      category: 'Akademik',
      unit: 'Semua Unit',
      description: 'Kegiatan belajar mengajar semester genap dimulai. Siswa diharapkan hadir tepat waktu.',
      image: 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
      capacity: '2000 Siswa',
      status: 'Mendatang',
      accentColor: '#3B82F6',
      agenda: [
        '07:00 - Apel Pagi',
        '07:30 - Masuk Kelas',
        '08:00 - KBM Dimulai',
        '12:00 - Istirahat & Sholat Dhuhur',
        '15:00 - Pulang'
      ]
    },
    {
      id: 6,
      title: 'Wisuda Tahfidz 10 Juz',
      date: '2025-01-20',
      time: '08:00 - 12:00 WIB',
      location: 'Aula Baituljannah',
      category: 'Keagamaan',
      unit: 'SDIT, SMPIT',
      description: 'Wisuda bagi siswa yang telah menyelesaikan hafalan 10 juz Al-Quran.',
      image: 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
      capacity: '200 Peserta',
      status: 'Mendatang',
      accentColor: '#10B981',
      agenda: [
        '08:00 - Registrasi & Persiapan',
        '09:00 - Pembukaan',
        '09:30 - Sambutan Kepala Sekolah',
        '10:00 - Penyerahan Sertifikat',
        '11:00 - Dokumentasi & Ramah Tamah',
        '12:00 - Selesai'
      ]
    },
    {
      id: 7,
      title: 'Olimpiade Sains Sekolah',
      date: '2025-02-10',
      time: '08:00 - 15:00 WIB',
      location: 'Lab & Ruang Kelas',
      category: 'Kompetisi',
      unit: 'SMPIT, SMAIT',
      description: 'Olimpiade Sains tingkat sekolah untuk persiapan OSN. Bidang: Matematika, Fisika, Biologi, Kimia.',
      image: 'https://images.unsplash.com/photo-1660795468878-d9d8d75967b9',
      capacity: '150 Peserta',
      status: 'Mendatang',
      accentColor: '#F97316',
      agenda: [
        '08:00 - Registrasi Peserta',
        '08:30 - Technical Meeting',
        '09:00 - Babak Penyisihan',
        '12:00 - Istirahat & Sholat',
        '13:00 - Babak Final',
        '15:00 - Pengumuman & Penyerahan Piala'
      ]
    },
    {
      id: 8,
      title: 'Parent Meeting Semester Genap',
      date: '2025-02-15',
      time: '09:00 - 12:00 WIB',
      location: 'Aula & Ruang Kelas',
      category: 'Rapat',
      unit: 'Semua Unit',
      description: 'Pertemuan orang tua dengan wali kelas untuk membahas perkembangan siswa semester genap.',
      image: 'https://images.unsplash.com/photo-1759922378135-c68df8312190',
      capacity: '1000 Orang Tua',
      status: 'Mendatang',
      accentColor: '#8B5CF6',
      agenda: [
        '09:00 - Registrasi',
        '09:30 - Sambutan Kepala Sekolah',
        '10:00 - Meeting dengan Wali Kelas',
        '11:30 - Konsultasi Individual',
        '12:00 - Selesai'
      ]
    }
  ];

  const categories = ['Semua', 'Akademik', 'Keagamaan', 'Kompetisi', 'Olahraga', 'Rapat', 'Libur'];

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const filteredEvents = events.filter(event => 
    filterCategory === 'Semua' || event.category === filterCategory
  );

  const upcomingEvents = events.filter(e => e.status === 'Mendatang').slice(0, 3);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems} 
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom relative z-10 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <CalendarIcon className="w-4 h-4" />
              <span>Agenda & Kegiatan</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
              Event & Kalender<br />
              <span className="text-yellow-300">Baituljannah</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Ikuti berbagai kegiatan dan event menarik di Baituljannah sepanjang tahun
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="section-padding bg-white relative -mt-16">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white shadow-strong hover:shadow-2xl transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl mb-2 bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] bg-clip-text text-transparent">
                {events.length}
              </div>
              <p className="text-gray-600 text-sm">Total Event</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-strong hover:shadow-2xl transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {events.filter(e => e.status === 'Mendatang').length}
              </div>
              <p className="text-gray-600 text-sm">Event Mendatang</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-strong hover:shadow-2xl transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Tag className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {categories.length - 1}
              </div>
              <p className="text-gray-600 text-sm">Kategori</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-strong hover:shadow-2xl transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                5
              </div>
              <p className="text-gray-600 text-sm">Unit Sekolah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Highlight */}
      <section className="section-padding bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm mb-4 shadow-soft">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700">Event Terdekat</span>
            </div>
            <h2 className="mb-4">Jangan Lewatkan!</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Event-event penting yang akan segera berlangsung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: event.accentColor }}
                    >
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm mb-1">{new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg mb-3 line-clamp-2">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & View Toggle */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                <Filter className="w-4 h-4" />
                <span>Filter Kategori</span>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
              >
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Calendar View
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            /* List View */
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 md:p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="grid md:grid-cols-[200px_1fr] gap-6">
                    <div className="relative h-48 md:h-auto rounded-2xl overflow-hidden">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span 
                          className="px-3 py-1 rounded-full text-xs text-white backdrop-blur-sm"
                          style={{ backgroundColor: event.accentColor }}
                        >
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl mb-2 group-hover:text-[#1E4AB8] transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${event.accentColor}20` }}
                          >
                            <Calendar className="w-5 h-5" style={{ color: event.accentColor }} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Tanggal</p>
                            <p className="font-medium">{new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${event.accentColor}20` }}
                          >
                            <Clock className="w-5 h-5" style={{ color: event.accentColor }} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Waktu</p>
                            <p className="font-medium">{event.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${event.accentColor}20` }}
                          >
                            <MapPin className="w-5 h-5" style={{ color: event.accentColor }} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Lokasi</p>
                            <p className="font-medium">{event.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${event.accentColor}20` }}
                          >
                            <Users className="w-5 h-5" style={{ color: event.accentColor }} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Unit</p>
                            <p className="font-medium">{event.unit}</p>
                          </div>
                        </div>
                      </div>

                      <button 
                        className="px-6 py-2 rounded-xl text-white transition-all"
                        style={{ backgroundColor: event.accentColor }}
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <Calendar className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                  <h3 className="text-xl text-gray-600 mb-2">Tidak ada event</h3>
                  <p className="text-gray-500">Coba ubah filter kategori</p>
                </div>
              )}
            </div>
          ) : (
            /* Calendar View */
            <div className="bg-white rounded-3xl p-8 shadow-strong">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl">{monthNames[selectedMonth]} {selectedYear}</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={previousMonth}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                  <div key={day} className="text-center font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for first week */}
                {Array.from({ length: getFirstDayOfMonth(selectedMonth, selectedYear) }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}

                {/* Days */}
                {Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayEvents = events.filter(e => e.date === dateStr);
                  const isToday = new Date().toDateString() === new Date(dateStr).toDateString();
                  
                  return (
                    <div 
                      key={day}
                      className={`aspect-square p-2 rounded-xl border transition-all cursor-pointer ${
                        isToday ? 'bg-[#1E4AB8] text-white border-[#1E4AB8]' : 'bg-gray-50 border-gray-200 hover:border-[#1E4AB8]'
                      }`}
                    >
                      <div className="text-sm mb-1">{day}</div>
                      {dayEvents.length > 0 && (
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event, idx) => (
                            <div 
                              key={idx}
                              className="w-full h-1 rounded-full"
                              style={{ backgroundColor: event.accentColor }}
                            ></div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs opacity-70">+{dayEvents.length - 2}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl my-8">
            {/* Header */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <ImageWithFallback
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs text-white mb-3"
                  style={{ backgroundColor: selectedEvent.accentColor }}
                >
                  {selectedEvent.category}
                </span>
                <h2 className="text-white text-3xl mb-2">{selectedEvent.title}</h2>
                <p className="text-white/90">{selectedEvent.description}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedEvent.accentColor}20` }}
                    >
                      <Calendar className="w-6 h-6" style={{ color: selectedEvent.accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal</p>
                      <p className="font-medium">{new Date(selectedEvent.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedEvent.accentColor}20` }}
                    >
                      <Clock className="w-6 h-6" style={{ color: selectedEvent.accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Waktu</p>
                      <p className="font-medium">{selectedEvent.time}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedEvent.accentColor}20` }}
                    >
                      <MapPin className="w-6 h-6" style={{ color: selectedEvent.accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lokasi</p>
                      <p className="font-medium">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedEvent.accentColor}20` }}
                    >
                      <Users className="w-6 h-6" style={{ color: selectedEvent.accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Unit</p>
                      <p className="font-medium">{selectedEvent.unit}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent.agenda.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl mb-4">Agenda Acara</h3>
                  <div className="space-y-3">
                    {selectedEvent.agenda.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${selectedEvent.accentColor}20` }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: selectedEvent.accentColor }}
                          ></div>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                <button 
                  className="flex-1 py-3 rounded-xl text-white transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: selectedEvent.accentColor }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Poster</span>
                </button>
                <button 
                  className="flex-1 py-3 border-2 rounded-xl transition-all hover:bg-gray-50"
                  style={{ borderColor: selectedEvent.accentColor, color: selectedEvent.accentColor }}
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl mb-6">Punya Usulan Event?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kami terbuka untuk saran dan usulan kegiatan yang bermanfaat untuk siswa
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="btn-secondary"
          >
            Hubungi Kami
          </button>
        </div>
      </section>

      <Footer 
        siteName="Baitul Jannah Islamic School"
        accentColor="#1E4AB8"
        onNavigate={onNavigate}
      />
    </div>
  );
};

