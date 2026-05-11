'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Trophy, Award, Medal, Filter, Search, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

type AchievementItem = {
  studentName: string;
  studentImage: string;
  achievement: string;
  competition: string;
  rank: string;
  category: string;
  accentColor: string;
  year: string;
};

function AchievementCard(props: Omit<AchievementItem, 'year'>) {
  return (
    <div className="group bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="h-2" style={{ backgroundColor: props.accentColor }} />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <Image src={props.studentImage} alt={props.studentName} fill sizes="56px" className="object-cover" unoptimized />
          </div>
          <div className="min-w-0">
            <p className="text-lg text-gray-900 truncate">{props.studentName}</p>
            <p className="text-sm text-gray-500 truncate">{props.category}</p>
          </div>
        </div>

        <p className="text-xl text-gray-900 mb-2 line-clamp-2">{props.achievement}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{props.competition}</p>

        <div className="flex items-center justify-between gap-3">
          <span
            className="px-3 py-1 rounded-full text-sm text-white"
            style={{ backgroundColor: props.accentColor }}
          >
            {props.rank}
          </span>
          <span className="text-sm text-gray-500">Baituljannah</span>
        </div>
      </div>
    </div>
  );
}

export default function AchievementPage() {
  const { menuItems, onNavigate } = useNavigationMenu();
  const [selectedYear, setSelectedYear] = useState('Semua');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const legacyAchievements = useMemo(
    () => [
      {
        studentName: 'M. Husein Haekal',
        studentImage: '/uploads/achievement/achievement_1769996411538_dig650xbr3b.webp',
        achievement: 'Peserta Olimpiade Terbaik',
        competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
        rank: 'JUARA 1',
        category: 'Cerdas Cermat'
      },
      {
        studentName: 'Zalika Tsabita Az - Zahra',
        studentImage: '/uploads/achievement/achievement_1770259138348_pcj36zz54xh.webp',
        achievement: 'Pencak Silat Tunggal',
        competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
        rank: 'JUARA 3',
        category: 'Olahraga'
      },
      {
        studentName: 'Dhoffa Adzellia Khaerani',
        studentImage: '/uploads/achievement/achievement_1770259163513_vakbjibn58j.webp',
        achievement: 'Pidato Bahasa Inggris',
        competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
        rank: 'JUARA 2',
        category: 'Bahasa'
      },
      {
        studentName: 'Ahmad Fadhil Rahman',
        studentImage: '/uploads/achievement/achievement_1770259176223_998ib4a3t76.webp',
        achievement: 'Matematika Olimpiade',
        competition: '"Kompetisi Sains Nasional 2025" Tingkat Nasional',
        rank: 'JUARA 1',
        category: 'Matematika'
      },
      {
        studentName: 'Aisha Zahra Putri',
        studentImage: '/uploads/achievement/achievement_1770259190080_iu7u3uoup9.webp',
        achievement: "Tahfidz Al-Qur'an",
        competition: '"Musabaqah Tilawatil Quran 2025" Tingkat Provinsi',
        rank: 'JUARA 1',
        category: 'Tahfidz'
      },
      {
        studentName: 'Muhammad Rizki Alfarizi',
        studentImage: '/uploads/achievement/achievement_1770259204289_7zh4ifi6pca.webp',
        achievement: 'Robotika',
        competition: '"Indonesia Robot Olympiad 2025" Tingkat Nasional',
        rank: 'JUARA 2',
        category: 'Sains'
      },
      {
        studentName: 'Siti Nurhaliza',
        studentImage: '/uploads/achievement/achievement_1770259218100_4znqxdhqfjq.webp',
        achievement: 'Juara Umum',
        competition: '"Lomba Cerdas Cermat 2025" Tingkat Kota',
        rank: 'JUARA 1',
        category: 'Akademik'
      },
      {
        studentName: 'Budi Santoso',
        studentImage: '/uploads/achievement/achievement_1770259234557_sdnixtxzwr.webp',
        achievement: 'Lari Marathon',
        competition: '"Pekan Olahraga Pelajar 2025" Tingkat Provinsi',
        rank: 'JUARA 2',
        category: 'Olahraga'
      },
      {
        studentName: 'Rina Wati',
        studentImage: '/uploads/achievement/achievement_1770601549377_5saxw8xrr2i.webp',
        achievement: 'Seni Lukis',
        competition: '"Festival Seni Siswa Nasional 2025"',
        rank: 'JUARA 1',
        category: 'Seni'
      },
      {
        studentName: 'Joko Susilo',
        studentImage: '/uploads/achievement/achievement_1770601631186_pq0yr3wit0b.webp',
        achievement: 'Pidato Bahasa Arab',
        competition: '"Musabaqah Bahasa Arab 2025" Tingkat Nasional',
        rank: 'JUARA 3',
        category: 'Bahasa'
      },
      {
        studentName: 'Dewi Sartika',
        studentImage: '/uploads/achievement/achievement_1770601645303_qumz9y74jk.webp',
        achievement: 'Olimpiade Biologi',
        competition: '"Olimpiade Sains Nasional 2025"',
        rank: 'JUARA 2',
        category: 'Sains'
      },
      {
        studentName: 'Andi Wijaya',
        studentImage: '/uploads/achievement/achievement_1770601668743_4hdkv8zve2a.webp',
        achievement: 'Karate',
        competition: '"Kejuaraan Karate Pelajar 2025" Tingkat Nasional',
        rank: 'JUARA 1',
        category: 'Olahraga'
      }
    ],
    []
  );

  const apiBaseUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
    return base.replace(/\/$/, '');
  }, []);

  const getAccentColor = useMemo(() => {
    return (category?: string, level?: string) => {
      const key = (category || level || '').toLowerCase();
      if (key.includes('olahraga')) return '#F97316';
      if (key.includes('tahfidz') || key.includes('agama')) return '#8B5CF6';
      if (key.includes('seni') || key.includes('budaya')) return '#10B981';
      if (key.includes('sains') || key.includes('biologi') || key.includes('kimia') || key.includes('fisika')) return '#3B82F6';
      if (key.includes('bahasa')) return '#14B8A6';
      if (key.includes('matematika')) return '#6366F1';
      return '#1E4AB8';
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiBaseUrl}/achievements?limit=200`).then(r => r.ok ? r.json() : null).catch(() => null);
        const rows = res?.success && Array.isArray(res.data) ? res.data : [];

        const mapped: AchievementItem[] = rows.map((row: any, index: number) => {
          const year = row.achievement_date ? String(new Date(row.achievement_date).getFullYear()) : String(new Date().getFullYear());
          const category = row.category || 'Lainnya';
          return {
            studentName: row.student_name || 'Siswa',
            studentImage: row.image_url || legacyAchievements[index % legacyAchievements.length]?.studentImage || '/uploads/logos/Yayasan.webp',
            achievement: row.title || '',
            competition: row.description || '',
            rank: row.rank || '',
            category,
            accentColor: getAccentColor(category, row.level),
            year
          };
        });

        const legacyMapped: AchievementItem[] = legacyAchievements.map(item => {
          const category = item.category || 'Lainnya';
          return {
            studentName: item.studentName,
            studentImage: item.studentImage,
            achievement: item.achievement,
            competition: item.competition,
            rank: item.rank,
            category,
            accentColor: getAccentColor(category, category),
            year: String(new Date().getFullYear())
          };
        });

        const combined = [...mapped];
        for (const legacy of legacyMapped) {
          if (combined.length >= Math.max(12, legacyMapped.length)) break;
          if (combined.some(item => item.studentImage === legacy.studentImage)) continue;
          combined.push(legacy);
        }

        if (!cancelled) setAchievements(combined);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, getAccentColor, legacyAchievements]);

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Prestasi Siswa' }
  ];

  const years = useMemo(() => {
    const set = new Set<string>();
    achievements.forEach(a => set.add(a.year));
    const list = Array.from(set).filter(Boolean).sort((a, b) => Number(b) - Number(a));
    return ['Semua', ...list];
  }, [achievements]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    achievements.forEach(a => {
      const key = a.category || 'Lainnya';
      counts.set(key, (counts.get(key) || 0) + 1);
    });

    const iconFor = (name: string) => {
      const lower = name.toLowerCase();
      if (lower.includes('olahraga')) return Medal;
      if (lower.includes('tahfidz') || lower.includes('agama')) return Star;
      if (lower.includes('seni') || lower.includes('budaya')) return Award;
      if (lower.includes('sains') || lower.includes('akademik') || lower.includes('olimpiade') || lower.includes('matematika')) return Trophy;
      return Star;
    };

    const items = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count, icon: iconFor(name) }));

    return [{ name: 'Semua', count: achievements.length, icon: Star }, ...items];
  }, [achievements]);

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
          <Breadcrumb items={breadcrumbItems} />
          
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
