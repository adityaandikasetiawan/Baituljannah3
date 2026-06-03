'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BookOpen, GraduationCap, Award, Mail, Phone, Star, X, Search, Filter, Users, TrendingUp, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function TeachersPage() {
  const { onNavigate, menuItems } = useNavigationMenu();
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [filterUnit, setFilterUnit] = useState<string>('Semua');
  const [filterSubject, setFilterSubject] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [teachers, setTeachers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiBaseUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
    return base.replace(/\/$/, '');
  }, []);

  // Fallback data
  const fallbackTeachers = useMemo(() => [
    { id: 1, name: 'Ustadz Dr. Ahmad Fauzi, M.Pd.I', title: 'Kepala Sekolah SMAIT', unit: 'SMAIT', subject: 'Pendidikan Agama Islam', education: 'S3 Pendidikan Islam - UIN Jakarta', experience: '15 Tahun', specialization: ['Tahfidz', 'Fiqih', 'Akhlak'], achievements: ['Guru Berprestasi Tingkat Nasional 2023', 'Pembina Olimpiade Sains Islam', 'Penulis Buku "Pendidikan Karakter Islami"'], email: 'ahmad.fauzi@baituljannah.sch.id', phone: '+62 812-3456-7890', image: 'https://images.unsplash.com/photo-1621982400152-883d350ac611', bio: 'Berpengalaman 15 tahun dalam pendidikan Islam terpadu.', philosophy: 'Pendidikan adalah proses membentuk generasi yang berakhlak mulia, cerdas, dan berprestasi.', accentColor: '#8B5CF6' },
    { id: 2, name: 'Ustadzah Siti Aisyah, S.Pd', title: 'Guru Tahfidz', unit: 'SDIT', subject: 'Tahfidz Al-Quran', education: 'S1 Pendidikan Agama Islam', experience: '10 Tahun', specialization: ['Tahfidz', 'Tajwid', 'Qiroah'], achievements: ['Hafal 30 Juz Al-Quran', 'Juara 1 MTQ Tingkat Provinsi', 'Pembina Tahfidz Terbaik 2024'], email: 'siti.aisyah@baituljannah.sch.id', phone: '+62 813-4567-8901', image: 'https://images.unsplash.com/photo-1755050026084-49ae65b94882', bio: 'Hafidz 30 juz dengan pengalaman 10 tahun membimbing santri.', philosophy: 'Al-Quran adalah cahaya yang menerangi setiap langkah kehidupan.', accentColor: '#3B82F6' },
    { id: 3, name: 'Ustadz Muhammad Rizki, M.Pd', title: 'Guru Matematika', unit: 'SMPIT', subject: 'Matematika', education: 'S2 Pendidikan Matematika - UNJ', experience: '8 Tahun', specialization: ['Aljabar', 'Geometri', 'Statistika'], achievements: ['Pembina Olimpiade Matematika', 'Trainer UCMAS Nasional', 'Best Teacher Award 2023'], email: 'm.rizki@baituljannah.sch.id', phone: '+62 814-5678-9012', image: 'https://images.unsplash.com/flagged/photo-1559475555-b26777ed3ab4', bio: 'Spesialisasi dalam metode pembelajaran matematika yang menyenangkan.', philosophy: 'Matematika bukan hanya angka, tapi cara berpikir sistematis dan logis.', accentColor: '#F97316' },
  ], []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetch(`${apiBaseUrl}/teachers?limit=100`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null)
      .then(data => {
        if (cancelled) return;
        const rows = data?.success && Array.isArray(data.data) && data.data.length > 0 ? data.data : fallbackTeachers;
        setTeachers(rows);
        setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [apiBaseUrl, fallbackTeachers]);

  const stats = [
    { value: '80+', label: 'Guru Bersertifikat', icon: Award },
    { value: '12', label: 'Tahun Pengalaman Rata-rata', icon: TrendingUp },
    { value: '95%', label: 'Kepuasan Orang Tua', icon: Star },
    { value: '100%', label: 'Lulusan S1', icon: GraduationCap }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const unitMatch = filterUnit === 'Semua' || teacher.unit === filterUnit;
    const subjectMatch = filterSubject === 'Semua' || teacher.subject.includes(filterSubject);
    const searchMatch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       teacher.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return unitMatch && subjectMatch && searchMatch;
  });

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
              <Users className="w-4 h-4" />
              <span>Tim Pendidik Profesional</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
              Guru & Staff<br />
              <span className="text-yellow-300">Berkualitas & Berpengalaman</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Tim pendidik terbaik yang berdedikasi untuk mencetak generasi Qurani yang cerdas, berkarakter, dan berprestasi
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="section-padding bg-white relative -mt-16">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-white shadow-strong hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl mb-2 bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Temui Tim Kami</span>
            </div>
            <h2 className="mb-4">Profil Guru & Staff</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kenali lebih dekat para pendidik profesional kami yang siap membimbing putra-putri Anda
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama guru atau mata pelajaran..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 outline-none transition-all"
                />
              </div>

              {/* Filter Unit */}
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterUnit}
                  onChange={(e) => setFilterUnit(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  <option>Semua Unit</option>
                  <option>TKIT</option>
                  <option>SDIT</option>
                  <option>SMPIT</option>
                  <option>SMAIT</option>
                  <option>SLBIT</option>
                </select>
              </div>

              {/* Filter Subject */}
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200">
                <BookOpen className="w-5 h-5 text-gray-500" />
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  <option>Semua Mapel</option>
                  <option>Agama</option>
                  <option>Tahfidz</option>
                  <option>Matematika</option>
                  <option>Bahasa</option>
                  <option>IPA</option>
                  <option>PAUD</option>
                </select>
              </div>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600">
              Menampilkan <strong>{filteredTeachers.length}</strong> dari <strong>{teachers.length}</strong> guru
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <div 
                key={teacher.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedTeacher(teacher)}
              >
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Unit Badge */}
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs text-white backdrop-blur-sm"
                      style={{ backgroundColor: teacher.accentColor }}
                    >
                      {teacher.unit}
                    </span>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg mb-1">{teacher.name}</h3>
                    <p className="text-white/90 text-sm">{teacher.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4" style={{ color: teacher.accentColor }} />
                    <span className="text-sm text-gray-600">{teacher.subject}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{teacher.experience} Pengalaman</span>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacher.specialization.slice(0, 3).map((spec: string, idx: number) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <button 
                    className="w-full py-2 rounded-xl text-sm transition-all"
                    style={{ 
                      backgroundColor: `${teacher.accentColor}15`,
                      color: teacher.accentColor
                    }}
                  >
                    Lihat Profil Lengkap
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-600 mb-2">Tidak ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </section>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl my-8">
            {/* Header */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <ImageWithFallback
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <button
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <span 
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: selectedTeacher.accentColor }}
                  >
                    {selectedTeacher.unit}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                    {selectedTeacher.experience}
                  </span>
                </div>
                <h2 className="text-white text-3xl mb-2">{selectedTeacher.name}</h2>
                <p className="text-white/90 text-lg">{selectedTeacher.title}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Biografi Singkat
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedTeacher.bio}
                    </p>
                  </div>

                  {/* Philosophy */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Filosofi Mengajar
                    </h3>
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                      <p className="text-gray-700 italic">
                        "{selectedTeacher.philosophy}"
                      </p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Prestasi & Penghargaan
                    </h3>
                    <ul className="space-y-3">
                      {selectedTeacher.achievements.map((achievement: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Star className="w-3 h-3 text-purple-600" />
                          </div>
                          <span className="text-gray-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4">Informasi Kontak</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-700 font-medium truncate max-w-[180px]">
                            {selectedTeacher.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Telepon</p>
                          <p className="text-sm text-gray-700 font-medium">
                            {selectedTeacher.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4">Pendidikan</h3>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 font-medium">
                          {selectedTeacher.education}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Specialization Tags */}
                  <div>
                    <h3 className="text-lg font-bold mb-3">Spesialisasi</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTeacher.specialization.map((spec: string, idx: number) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer siteName="Baitul Jannah Islamic School" accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
}

