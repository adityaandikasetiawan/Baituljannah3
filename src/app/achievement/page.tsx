'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Trophy, Award, Medal, Filter, Search, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';
import { AchievementCard } from '../../features/achievement/components/AchievementCard';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function AchievementPage() {
  const { menuItems, onNavigate } = useNavigationMenu();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Prestasi Siswa' }
  ];

  const years = ['2025', '2024', '2023', '2022'];
  const categories = [
    { name: 'Semua', count: 24, icon: Star },
    { name: 'Olimpiade', count: 8, icon: Trophy },
    { name: 'Olahraga', count: 6, icon: Medal },
    { name: 'Seni & Budaya', count: 5, icon: Award },
    { name: 'Tahfidz', count: 3, icon: Star },
    { name: 'Sains', count: 2, icon: Trophy }
  ];

  const achievements = [
    {
      studentName: "M. Husein Haekal",
      studentImage: "/uploads/achievement/achievement_1769996411538_dig650xbr3b.webp",
      achievement: "Peserta Olimpiade Terbaik",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 1",
      category: "Olimpiade",
      accentColor: "#1E4AB8",
      year: "2025"
    },
    {
      studentName: "Zalika Tsabita Az - Zahra",
      studentImage: "/uploads/achievement/achievement_1770259138348_pcj36zz54xh.webp",
      achievement: "Pencak Silat Tunggal",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 3",
      category: "Olahraga",
      accentColor: "#F97316",
      year: "2025"
    },
    {
      studentName: "Dhoffa Adzellia Khaerani",
      studentImage: "/uploads/achievement/achievement_1770259163513_vakbjibn58j.webp",
      achievement: "Pidato Bahasa Inggris",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 2",
      category: "Seni & Budaya",
      accentColor: "#10B981",
      year: "2025"
    },
    {
      studentName: "Ahmad Fauzan",
      studentImage: "/uploads/achievement/achievement_1770259176223_998ib4a3t76.webp",
      achievement: "Tahfidz 30 Juz",
      competition: "Wisuda Tahfidz Nasional 2025",
      rank: "JUARA 1",
      category: "Tahfidz",
      accentColor: "#8B5CF6",
      year: "2025"
    },
    {
      studentName: "Siti Aisyah Ramadhani",
      studentImage: "/uploads/achievement/achievement_1770259190080_iu7u3uoup9.webp",
      achievement: "Matematika Tingkat Nasional",
      competition: "Olimpiade Sains Nasional (OSN) 2024",
      rank: "JUARA 1",
      category: "Sains",
      accentColor: "#3B82F6",
      year: "2024"
    },
    {
      studentName: "Muhammad Rizki",
      studentImage: "/uploads/achievement/achievement_1770259204289_7zh4ifi6pca.webp",
      achievement: "Renang Gaya Bebas 100m",
      competition: "POPDA Tingkat Provinsi 2024",
      rank: "JUARA 2",
      category: "Olahraga",
      accentColor: "#14B8A6",
      year: "2024"
    },
    {
      studentName: "Fatimah Az-Zahra",
      studentImage: "/uploads/achievement/achievement_1770259218100_4znqxdhqfjq.webp",
      achievement: "Kaligrafi Arab",
      competition: "Festival Seni Islam Tingkat Nasional 2024",
      rank: "JUARA 1",
      category: "Seni & Budaya",
      accentColor: "#F97316",
      year: "2024"
    },
    {
      studentName: "Budi Santoso",
      studentImage: "/uploads/achievement/achievement_1770259234557_sdnixtxzwr.webp",
      achievement: "Lari Marathon",
      competition: '"Pekan Olahraga Pelajar 2025" Tingkat Provinsi',
      rank: "JUARA 2",
      category: "Olahraga",
      accentColor: "#EF4444",
      year: "2025"
    },
    {
      studentName: "Rina Wati",
      studentImage: "/uploads/achievement/achievement_1770601549377_5saxw8xrr2i.webp",
      achievement: "Seni Lukis",
      competition: '"Festival Seni Siswa Nasional 2025"',
      rank: "JUARA 1",
      category: "Seni & Budaya",
      accentColor: "#8B5CF6",
      year: "2025"
    },
    {
      studentName: "Joko Susilo",
      studentImage: "/uploads/achievement/achievement_1770601631186_pq0yr3wit0b.webp",
      achievement: "Pidato Bahasa Arab",
      competition: '"Musabaqah Bahasa Arab 2025" Tingkat Nasional',
      rank: "JUARA 3",
      category: "Seni & Budaya",
      accentColor: "#10B981",
      year: "2025"
    },
    {
      studentName: "Dewi Sartika",
      studentImage: "/uploads/achievement/achievement_1770601645303_qumz9y74jk.webp",
      achievement: "Olimpiade Biologi",
      competition: '"Olimpiade Sains Nasional 2025"',
      rank: "JUARA 2",
      category: "Sains",
      accentColor: "#F59E0B",
      year: "2025"
    },
    {
      studentName: "Andi Wijaya",
      studentImage: "/uploads/achievement/achievement_1770601668743_4hdkv8zve2a.webp",
      achievement: "Karate",
      competition: '"Kejuaraan Karate Pelajar 2025" Tingkat Nasional',
      rank: "JUARA 1",
      category: "Olahraga",
      accentColor: "#DC2626",
      year: "2025"
    }
  ];

  const filteredAchievements = achievements.filter(item => {
    const matchYear = selectedYear === 'Semua' || item.year === selectedYear;
    const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.achievement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchYear && matchCategory && matchSearch;
  });

  // Stats untuk achievement
  const stats = [
    { label: 'Total Prestasi', value: achievements.length, icon: Trophy, color: 'from-yellow-500 to-amber-600' },
    { label: 'Juara 1', value: achievements.filter(a => a.rank.includes('1')).length, icon: Trophy, color: 'from-blue-500 to-cyan-600' },
    { label: 'Juara 2', value: achievements.filter(a => a.rank.includes('2')).length, icon: Award, color: 'from-purple-500 to-indigo-600' },
    { label: 'Juara 3', value: achievements.filter(a => a.rank.includes('3')).length, icon: Medal, color: 'from-orange-500 to-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} theme="dark" />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <Trophy className="w-4 h-4" />
              <span>Hall of Fame</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Prestasi Siswa</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Membanggakan prestasi gemilang para siswa Baituljannah di berbagai kompetisi tingkat lokal, nasional, dan internasional
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-md">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-soft sticky top-0 z-40 border-b">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama siswa atau prestasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#1E4AB8] transition-colors"
              />
            </div>

            {/* Year Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <button
                onClick={() => setSelectedYear('Semua')}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  selectedYear === 'Semua'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Semua Tahun</span>
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                    selectedYear === year
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === cat.name
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.name ? 'bg-white/30' : 'bg-gray-200'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-gray-600">
            Menampilkan <strong>{filteredAchievements.length}</strong> prestasi
          </div>
        </div>
      </section>

      {/* Achievement Cards Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredAchievements.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAchievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.studentImage || `${achievement.studentName}-${achievement.achievement}-${achievement.year}-${index}`}
                  studentName={achievement.studentName}
                  studentImage={achievement.studentImage}
                  achievement={achievement.achievement}
                  competition={achievement.competition}
                  rank={achievement.rank}
                  category={achievement.category}
                  accentColor={achievement.accentColor}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl text-gray-600 mb-2">Tidak ada prestasi ditemukan</h3>
              <p className="text-gray-500 mb-6">Coba ubah filter atau pencarian Anda</p>
              <button
                onClick={() => {
                  setSelectedYear('2025');
                  setSelectedCategory('Semua');
                  setSearchQuery('');
                }}
                className="btn-outline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>

        <div className="container-custom text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Bergabunglah Bersama Kami</span>
          </div>
          <h2 className="mb-6 text-4xl lg:text-5xl">Raih Prestasi Gemilangmu</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Daftarkan putra-putri Anda dan wujudkan potensi terbaiknya bersama Baituljannah
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('admission')} 
              className="btn-secondary flex items-center justify-center gap-2 group"
            >
              <span>Daftar PPDB 2025</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E4AB8] transition-all text-lg flex items-center justify-center gap-2"
            >
              <span>Hubungi Kami</span>
            </button>
          </div>
        </div>
      </section>

      <Footer siteName="Baitul Jannah Islamic School" accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
}

