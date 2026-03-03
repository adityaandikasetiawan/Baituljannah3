import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GraduationCap, MapPin, Briefcase, Star, TrendingUp, Users, Trophy, Target, Building2, Globe, Mail, Linkedin, Instagram, Filter, Search, X, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface AlumniProps {
  onNavigate?: (page: string) => void;
}

export const Alumni: React.FC<AlumniProps> = ({ onNavigate = () => {} }) => {
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  const [filterYear, setFilterYear] = useState<string>('Semua');
  const [filterUniversity, setFilterUniversity] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => onNavigate('main') },
    {
      label: 'Tentang',
      href: '#',
      submenu: [
        { label: 'Visi & Misi', href: '#', onClick: () => onNavigate('vision-mission') },
        { label: 'Alumni', href: '#', onClick: () => onNavigate('alumni') },
        { label: 'Prestasi', href: '#', onClick: () => onNavigate('achievement') }
      ]
    },
    {
      label: 'Informasi',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => onNavigate('news') },
        { label: 'Galeri', href: '#', onClick: () => onNavigate('gallery') },
        { label: 'Event', href: '#', onClick: () => onNavigate('events') }
      ]
    },
    { label: 'PPDB', href: '#', onClick: () => onNavigate('admission') },
    { label: 'Kontak', href: '#', onClick: () => onNavigate('contact') }
  ];

  const alumniList = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      graduationYear: '2023',
      unit: 'SMAIT',
      university: 'Universitas Indonesia',
      faculty: 'Fakultas Kedokteran',
      major: 'Kedokteran',
      currentPosition: 'Mahasiswa Kedokteran',
      company: 'FK UI',
      achievement: 'Diterima dengan Beasiswa Penuh',
      image: 'https://images.unsplash.com/photo-1659080907111-7c726e435a28',
      story: 'Alhamdulillah, pendidikan di Baituljannah memberikan fondasi yang kuat tidak hanya dalam ilmu akademik, tetapi juga dalam karakter dan spiritualitas. Metode pembelajaran yang integratif mempersiapkan saya dengan baik untuk masuk ke FK UI.',
      tags: ['Beasiswa', 'SNBP', 'Juara Kelas'],
      linkedin: '#',
      email: 'ahmad.fauzi@ui.ac.id'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      graduationYear: '2022',
      unit: 'SMAIT',
      university: 'Universitas Gadjah Mada',
      faculty: 'Fakultas Hukum',
      major: 'Ilmu Hukum',
      currentPosition: 'Mahasiswa Hukum',
      company: 'FH UGM',
      achievement: 'Cum Laude, IPK 3.95',
      image: 'https://images.unsplash.com/photo-1757876506562-0b0087ab3dcd',
      story: 'Pembelajaran di Baituljannah membentuk karakter saya untuk selalu disiplin dan bertanggung jawab. Ini sangat membantu dalam perkuliahan di UGM yang menuntut kemandirian tinggi.',
      tags: ['Cum Laude', 'SNBP', 'Aktivis'],
      linkedin: '#',
      email: 'siti.nurhaliza@ugm.ac.id'
    },
    {
      id: 3,
      name: 'Muhammad Rizki',
      graduationYear: '2024',
      unit: 'SMAIT',
      university: 'Institut Teknologi Bandung',
      faculty: 'STEI',
      major: 'Teknik Informatika',
      currentPosition: 'Mahasiswa Teknik Informatika',
      company: 'ITB',
      achievement: 'Juara 1 Olimpiade Robotika Nasional',
      image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
      story: 'Program olimpiade dan robotika di Baituljannah sangat membantu saya meraih prestasi dan lolos SNBP ke ITB. Guru-guru yang supportive membuat proses belajar menjadi menyenangkan.',
      tags: ['SNBP', 'Olimpiade', 'Robotika'],
      linkedin: '#',
      email: 'm.rizki@itb.ac.id'
    },
    {
      id: 4,
      name: 'Fatimah Zahra',
      graduationYear: '2023',
      unit: 'SMAIT',
      university: 'Universitas Padjadjaran',
      faculty: 'Fakultas Psikologi',
      major: 'Psikologi',
      currentPosition: 'Asisten Dosen',
      company: 'UNPAD',
      achievement: 'Best Student Award 2024',
      image: 'https://images.unsplash.com/photo-1607147728331-ecf4ff0bd437',
      story: 'Baituljannah bukan hanya sekolah, tapi keluarga kedua. Program tahfidz dan character building sangat membantu saya menjadi pribadi yang lebih baik. Alhamdulillah sekarang bisa kuliah dengan beasiswa.',
      tags: ['Beasiswa', 'Best Student', 'Tahfidz'],
      linkedin: '#',
      email: 'fatimah.zahra@unpad.ac.id'
    },
    {
      id: 5,
      name: 'Abdullah Rahman',
      graduationYear: '2021',
      unit: 'SLBIT',
      university: 'Institut Pertanian Bogor',
      faculty: 'Fakultas Pertanian',
      major: 'Agribisnis',
      currentPosition: 'Startup Founder',
      company: 'AgroTech Indonesia',
      achievement: 'Entrepreneur Muda Berprestasi',
      image: 'https://images.unsplash.com/photo-1659080907111-7c726e435a28',
      story: 'Setelah lulus dari IPB, saya mendirikan startup agritech. Pendidikan entrepreneurship dan leadership di Baituljannah memberikan saya bekal yang sangat berharga.',
      tags: ['Entrepreneur', 'Lulusan Terbaik', 'Startup'],
      linkedin: '#',
      email: 'abdullah@agrotech.id'
    },
    {
      id: 6,
      name: 'Aisyah Putri',
      graduationYear: '2022',
      unit: 'SMAIT',
      university: 'Universitas Brawijaya',
      faculty: 'Fakultas Ekonomi',
      major: 'Akuntansi',
      currentPosition: 'Junior Auditor',
      company: 'Deloitte Indonesia',
      achievement: 'Lulus dengan Predikat Sangat Memuaskan',
      image: 'https://images.unsplash.com/photo-1757876506562-0b0087ab3dcd',
      story: 'Sistem pembelajaran di Baituljannah yang mengintegrasikan nilai-nilai Islam dengan akademik membuat saya siap menghadapi dunia kerja dengan integritas tinggi.',
      tags: ['Big 4', 'Fresh Graduate', 'Akuntansi'],
      linkedin: '#',
      email: 'aisyah.putri@deloitte.com'
    },
    {
      id: 7,
      name: 'Hasan Basri',
      graduationYear: '2023',
      unit: 'SMPIT',
      university: 'Universitas Airlangga',
      faculty: 'Fakultas Kedokteran',
      major: 'Pendidikan Dokter',
      currentPosition: 'Mahasiswa Kedokteran',
      company: 'FK UNAIR',
      achievement: 'Mahasiswa Berprestasi Tingkat Fakultas',
      image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
      story: 'Program tahfidz dan pembelajaran sains di Baituljannah memberikan keseimbangan antara spiritual dan intelektual. Ini membantu saya unggul di perkuliahan kedokteran.',
      tags: ['SNBP', 'Tahfidz 15 Juz', 'Mahasiswa Berprestasi'],
      linkedin: '#',
      email: 'hasan.basri@fk.unair.ac.id'
    },
    {
      id: 8,
      name: 'Maryam Azzahra',
      graduationYear: '2024',
      unit: 'SMAIT',
      university: 'Institut Teknologi Sepuluh Nopember',
      faculty: 'Fakultas Teknologi Industri',
      major: 'Teknik Kimia',
      currentPosition: 'Mahasiswa Teknik Kimia',
      company: 'ITS',
      achievement: 'Peraih Medali Perak OSN Kimia',
      image: 'https://images.unsplash.com/photo-1607147728331-ecf4ff0bd437',
      story: 'Pembinaan olimpiade sains di Baituljannah sangat intens dan berkualitas. Berkat itu, saya bisa meraih medali OSN dan diterima di ITS melalui jalur prestasi.',
      tags: ['OSN', 'Medali Perak', 'SNBP'],
      linkedin: '#',
      email: 'maryam.azzahra@its.ac.id'
    }
  ];

  const universities = [
    { name: 'UI', count: 25, color: 'from-blue-500 to-blue-600' },
    { name: 'UGM', count: 32, color: 'from-yellow-500 to-amber-600' },
    { name: 'IPB', count: 18, color: 'from-green-500 to-emerald-600' },
    { name: 'ITB', count: 22, color: 'from-cyan-500 to-blue-600' },
    { name: 'UB', count: 15, color: 'from-red-500 to-rose-600' },
    { name: 'UNPAD', count: 12, color: 'from-blue-600 to-indigo-700' },
    { name: 'UNDIP', count: 14, color: 'from-red-600 to-orange-600' },
    { name: 'UNAIR', count: 16, color: 'from-orange-500 to-amber-600' },
    { name: 'ITS', count: 11, color: 'from-purple-600 to-indigo-700' },
    { name: 'UNS', count: 9, color: 'from-teal-500 to-cyan-600' },
    { name: 'UNILA', count: 20, color: 'from-green-600 to-emerald-700' },
    { name: 'UIN', count: 24, color: 'from-emerald-600 to-green-700' }
  ];

  const stats = [
    { value: '250+', label: 'Total Alumni di Universitas', icon: GraduationCap },
    { value: '95%', label: 'Tingkat Kelulusan SNBP/SNBT', icon: TrendingUp },
    { value: '85%', label: 'Mendapat Beasiswa', icon: Award },
    { value: '20+', label: 'Universitas Tujuan', icon: Building2 }
  ];

  const filteredAlumni = alumniList.filter(alumni => {
    const yearMatch = filterYear === 'Semua' || alumni.graduationYear === filterYear;
    const uniMatch = filterUniversity === 'Semua' || alumni.university.includes(filterUniversity);
    const searchMatch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       alumni.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       alumni.major.toLowerCase().includes(searchQuery.toLowerCase());
    return yearMatch && uniMatch && searchMatch;
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
              <Trophy className="w-4 h-4" />
              <span>Alumni Success Stories</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
              They Made It!<br />
              <span className="text-yellow-300">Our Alumni Stories</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Kisah inspiratif alumni Baituljannah yang berhasil meraih mimpi mereka di universitas terkemuka
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

      {/* Universities Grid */}
      <section className="section-padding bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-4">
              <Building2 className="w-4 h-4" />
              <span>Universitas Tujuan</span>
            </div>
            <h2 className="mb-4">Alumni Kami Tersebar di Universitas Terkemuka</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Lebih dari 250 alumni berhasil melanjutkan pendidikan di berbagai universitas top
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {universities.map((uni, idx) => (
              <div key={idx} className="group text-center">
                <div className={`w-full aspect-square rounded-3xl bg-gradient-to-br ${uni.color} p-6 flex flex-col items-center justify-center shadow-strong hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                  <GraduationCap className="w-12 h-12 text-white mb-2" />
                  <p className="text-white text-2xl mb-1">{uni.name}</p>
                  <p className="text-white/90 text-sm">{uni.count} Alumni</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">
              <Users className="w-4 h-4" />
              <span>Profil Alumni</span>
            </div>
            <h2 className="mb-4">Kenali Alumni Kami</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan inspirasi dari perjalanan alumni Baituljannah
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
                  placeholder="Cari nama, universitas, atau jurusan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 outline-none transition-all"
                />
              </div>

              {/* Filter Year */}
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  <option>Semua Tahun</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>

              {/* Filter University */}
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-gray-200">
                <Building2 className="w-5 h-5 text-gray-500" />
                <select
                  value={filterUniversity}
                  onChange={(e) => setFilterUniversity(e.target.value)}
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  <option>Semua Univ</option>
                  <option>UI</option>
                  <option>UGM</option>
                  <option>ITB</option>
                  <option>IPB</option>
                  <option>UNPAD</option>
                </select>
              </div>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600">
              Menampilkan <strong>{filteredAlumni.length}</strong> dari <strong>{alumniList.length}</strong> alumni
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAlumni.map((alumni) => (
              <div 
                key={alumni.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedAlumni(alumni)}
              >
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#1E4AB8] rounded-full text-xs text-white">
                      {alumni.graduationYear}
                    </span>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg mb-1">{alumni.name}</h3>
                    <p className="text-white/90 text-sm">{alumni.university}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-[#1E4AB8]" />
                    <span className="text-sm text-gray-600">{alumni.major}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 line-clamp-1">{alumni.currentPosition}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {alumni.tags.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-2 bg-[#1E4AB8]/10 text-[#1E4AB8] rounded-xl text-sm hover:bg-[#1E4AB8]/20 transition-all">
                    Baca Kisah Lengkap
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAlumni.length === 0 && (
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

      {/* Alumni Detail Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl my-8">
            {/* Header */}
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <ImageWithFallback
                src={selectedAlumni.image}
                alt={selectedAlumni.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              <button
                onClick={() => setSelectedAlumni(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#1E4AB8] rounded-full text-xs text-white">
                    {selectedAlumni.unit}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                    Angkatan {selectedAlumni.graduationYear}
                  </span>
                </div>
                <h2 className="text-white text-3xl mb-2">{selectedAlumni.name}</h2>
                <p className="text-white/90 text-lg">{selectedAlumni.currentPosition} at {selectedAlumni.company}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left Column */}
                <div>
                  <h3 className="text-xl mb-4">Informasi Akademik</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Universitas</p>
                        <p className="font-medium">{selectedAlumni.university}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Fakultas & Jurusan</p>
                        <p className="font-medium">{selectedAlumni.faculty}</p>
                        <p className="text-sm text-gray-600">{selectedAlumni.major}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Prestasi</p>
                        <p className="font-medium">{selectedAlumni.achievement}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <h4 className="font-medium mb-3">Kontak</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${selectedAlumni.email}`} className="hover:text-[#1E4AB8]">
                        {selectedAlumni.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Linkedin className="w-4 h-4" />
                      <a href={selectedAlumni.linkedin} className="hover:text-[#1E4AB8]">
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-xl mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedAlumni.tags.map((tag: string, idx: number) => (
                      <span 
                        key={idx}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-medium mb-3">Current Position</h4>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-[#1E4AB8]/10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-[#1E4AB8]" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedAlumni.currentPosition}</p>
                      <p className="text-sm text-gray-600">{selectedAlumni.company}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl mb-3">Kisah Sukses</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <p className="text-gray-700 leading-relaxed italic">
                    "{selectedAlumni.story}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] text-white relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl mb-6">Jadilah Bagian dari Alumni Sukses Kami!</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan Baituljannah dan raih masa depan gemilang Anda
          </p>
          <button 
            onClick={() => onNavigate('admission')}
            className="btn-secondary"
          >
            Daftar Sekarang
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

