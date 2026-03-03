import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Trophy, Award, Medal, Image as ImageIcon, Calendar, User, Target, Save, X, Upload } from 'lucide-react';

interface AdminAchievementProps {
  onNavigate?: (page: string) => void;
}

interface AchievementItem {
  id: number;
  studentName: string;
  studentImage: string;
  achievement: string;
  competition: string;
  rank: string;
  category: string;
  accentColor: string;
  year: string;
  status: 'published' | 'draft';
}

export const AdminAchievement: React.FC<AdminAchievementProps> = ({ onNavigate = () => {} }) => {
  const [achievements, setAchievements] = useState<AchievementItem[]>([
    {
      id: 1,
      studentName: "M. Husein Haekal",
      studentImage: "/uploads/achievement/achievement_1769996411538_dig650xbr3b.webp",
      achievement: "Peserta Olimpiade Terbaik",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 1",
      category: "Cerdas Cermat",
      accentColor: "#1E4AB8",
      year: "2025",
      status: "published"
    },
    {
      id: 2,
      studentName: "Zalika Tsabita Az - Zahra",
      studentImage: "/uploads/achievement/achievement_1770259138348_pcj36zz54xh.webp",
      achievement: "Pencak Silat Tunggal",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 3",
      category: "Perwakilan • Tinggi 2 • Tinggi 1",
      accentColor: "#F97316",
      year: "2025",
      status: "published"
    },
    {
      id: 3,
      studentName: "Dhoffa Adzellia Khaerani",
      studentImage: "/uploads/achievement/achievement_1770259163513_vakbjibn58j.webp",
      achievement: "Pidato Bahasa Inggris",
      competition: '"SAHABAYA CUP 2025" Tingkat Perwakilan Lampung',
      rank: "JUARA 2",
      category: "Perwakilan • Tinggi 2 • Tinggi 3",
      accentColor: "#10B981",
      year: "2025",
      status: "published"
    },
    {
      id: 4,
      studentName: "M. Husein Haekal",
      studentImage: "/uploads/achievement/achievement_1770259176223_998ib4a3t76.webp",
      achievement: "Tahfidz Al-Qur'an",
      competition: '"Musabaqah Tilawatil Quran 2025" Tingkat Provinsi',
      rank: "JUARA 1",
      category: "Tahfidz 10 Juz",
      accentColor: "#10B981",
      year: "2025",
      status: "published"
    },
    {
      id: 5,
      studentName: "Aisha Zahra Putri",
      studentImage: "/uploads/achievement/achievement_1770259190080_iu7u3uoup9.webp",
      achievement: "Robotika",
      competition: '"Indonesia Robot Olympiad 2025" Tingkat Nasional',
      rank: "JUARA 2",
      category: "Line Follower",
      accentColor: "#F97316",
      year: "2025",
      status: "published"
    },
    {
      id: 6,
      studentName: "Muhammad Rizki Alfarizi",
      studentImage: "/uploads/achievement/achievement_1770259204289_7zh4ifi6pca.webp",
      achievement: "Matematika Olimpiade",
      competition: '"Kompetisi Sains Nasional 2025" Tingkat Nasional',
      rank: "JUARA 1",
      category: "Matematika • SMP",
      accentColor: "#8B5CF6",
      year: "2025",
      status: "published"
    },
    {
      id: 7,
      studentName: "Siti Nurhaliza",
      studentImage: "/uploads/achievement/achievement_1770259218100_4znqxdhqfjq.webp",
      achievement: "Kaligrafi Arab",
      competition: "Festival Seni Islam Tingkat Nasional 2024",
      rank: "JUARA 1",
      category: "Seni & Budaya",
      accentColor: "#F97316",
      year: "2024",
      status: "published"
    },
    {
      id: 8,
      studentName: "Budi Santoso",
      studentImage: "/uploads/achievement/achievement_1770259234557_sdnixtxzwr.webp",
      achievement: "Lari Marathon",
      competition: '"Pekan Olahraga Pelajar 2025" Tingkat Provinsi',
      rank: "JUARA 2",
      category: "Olahraga",
      accentColor: "#EF4444",
      year: "2025",
      status: "published"
    },
    {
      id: 9,
      studentName: "Rina Wati",
      studentImage: "/uploads/achievement/achievement_1770601549377_5saxw8xrr2i.webp",
      achievement: "Seni Lukis",
      competition: '"Festival Seni Siswa Nasional 2025"',
      rank: "JUARA 1",
      category: "Seni & Budaya",
      accentColor: "#8B5CF6",
      year: "2025",
      status: "published"
    },
    {
      id: 10,
      studentName: "Joko Susilo",
      studentImage: "/uploads/achievement/achievement_1770601631186_pq0yr3wit0b.webp",
      achievement: "Pidato Bahasa Arab",
      competition: '"Musabaqah Bahasa Arab 2025" Tingkat Nasional',
      rank: "JUARA 3",
      category: "Seni & Budaya",
      accentColor: "#10B981",
      year: "2025",
      status: "published"
    },
    {
      id: 11,
      studentName: "Dewi Sartika",
      studentImage: "/uploads/achievement/achievement_1770601645303_qumz9y74jk.webp",
      achievement: "Olimpiade Biologi",
      competition: '"Olimpiade Sains Nasional 2025"',
      rank: "JUARA 2",
      category: "Sains",
      accentColor: "#F59E0B",
      year: "2025",
      status: "published"
    },
    {
      id: 12,
      studentName: "Andi Wijaya",
      studentImage: "/uploads/achievement/achievement_1770601668743_4hdkv8zve2a.webp",
      achievement: "Karate",
      competition: '"Kejuaraan Karate Pelajar 2025" Tingkat Nasional',
      rank: "JUARA 1",
      category: "Olahraga",
      accentColor: "#DC2626",
      year: "2025",
      status: "published"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<AchievementItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [filterYear, setFilterYear] = useState('Semua');

  const categories = ['Semua', 'Olimpiade', 'Olahraga', 'Seni & Budaya', 'Tahfidz', 'Sains'];
  const years = ['Semua', '2025', '2024', '2023', '2022'];
  const ranks = ['JUARA 1', 'JUARA 2', 'JUARA 3', 'HARAPAN 1', 'HARAPAN 2'];
  const colors = [
    { name: 'Blue', value: '#1E4AB8' },
    { name: 'Green', value: '#10B981' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Teal', value: '#14B8A6' },
    { name: 'Red', value: '#EF4444' }
  ];

  const [formData, setFormData] = useState({
    studentName: '',
    studentImage: '',
    achievement: '',
    competition: '',
    rank: 'JUARA 1',
    category: 'Olimpiade',
    accentColor: '#1E4AB8',
    year: '2025',
    status: 'published' as 'published' | 'draft'
  });

  const handleOpenModal = (achievement?: AchievementItem) => {
    if (achievement) {
      setIsEditing(true);
      setCurrentAchievement(achievement);
      setFormData({
        studentName: achievement.studentName,
        studentImage: achievement.studentImage,
        achievement: achievement.achievement,
        competition: achievement.competition,
        rank: achievement.rank,
        category: achievement.category,
        accentColor: achievement.accentColor,
        year: achievement.year,
        status: achievement.status
      });
    } else {
      setIsEditing(false);
      setCurrentAchievement(null);
      setFormData({
        studentName: '',
        studentImage: '',
        achievement: '',
        competition: '',
        rank: 'JUARA 1',
        category: 'Olimpiade',
        accentColor: '#1E4AB8',
        year: '2025',
        status: 'published'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentAchievement(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentAchievement) {
      setAchievements(achievements.map(item => 
        item.id === currentAchievement.id 
          ? { ...formData, id: item.id }
          : item
      ));
    } else {
      const newAchievement: AchievementItem = {
        ...formData,
        id: Math.max(...achievements.map(a => a.id), 0) + 1
      };
      setAchievements([newAchievement, ...achievements]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) {
      setAchievements(achievements.filter(item => item.id !== id));
    }
  };

  const filteredAchievements = achievements.filter(item => {
    const matchSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.achievement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'Semua' || item.category === filterCategory;
    const matchYear = filterYear === 'Semua' || item.year === filterYear;
    return matchSearch && matchCategory && matchYear;
  });

  const stats = [
    { label: 'Total Prestasi', value: achievements.length, icon: Trophy, color: 'from-blue-500 to-cyan-600' },
    { label: 'Published', value: achievements.filter(a => a.status === 'published').length, icon: Award, color: 'from-green-500 to-emerald-600' },
    { label: 'Draft', value: achievements.filter(a => a.status === 'draft').length, icon: Medal, color: 'from-orange-500 to-amber-600' },
    { label: 'Tahun Ini', value: achievements.filter(a => a.year === '2025').length, icon: Calendar, color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-8 h-8" />
                <h1 className="text-3xl">Kelola Prestasi Siswa</h1>
              </div>
              <p className="text-white/90">Manajemen data prestasi dan penghargaan siswa</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="bg-white text-yellow-600 px-6 py-3 rounded-xl hover:bg-yellow-50 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Prestasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-16 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-strong">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama siswa atau prestasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-gray-600">
            Menampilkan <strong>{filteredAchievements.length}</strong> dari <strong>{achievements.length}</strong> prestasi
          </div>
        </div>

        {/* Achievement Table */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Siswa</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Prestasi</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Kompetisi</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Rank</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Tahun</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredAchievements.map((item, index) => (
                  <tr key={item.id} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.studentImage}
                          alt={item.studentName}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <span className="font-medium">{item.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{item.achievement}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.competition}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        item.rank.includes('1') ? 'bg-yellow-100 text-yellow-700' :
                        item.rank.includes('2') ? 'bg-gray-200 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {item.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{item.year}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        item.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Tidak ada prestasi ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6" />
                <h2 className="text-2xl">{isEditing ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}</h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Nama Siswa</span>
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Masukkan nama lengkap siswa"
                  required
                />
              </div>

              {/* Student Image URL */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>URL Foto Siswa</span>
                </label>
                <input
                  type="url"
                  value={formData.studentImage}
                  onChange={(e) => setFormData({ ...formData, studentImage: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
                {formData.studentImage && (
                  <img
                    src={formData.studentImage}
                    alt="Preview"
                    className="mt-2 w-24 h-24 rounded-xl object-cover"
                  />
                )}
              </div>

              {/* Achievement Title */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Judul Prestasi</span>
                </label>
                <input
                  type="text"
                  value={formData.achievement}
                  onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Contoh: Olimpiade Matematika Nasional"
                  required
                />
              </div>

              {/* Competition */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Nama Kompetisi & Tingkat</span>
                </label>
                <input
                  type="text"
                  value={formData.competition}
                  onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder='Contoh: "SAHABAYA CUP 2025" Tingkat Nasional'
                  required
                />
              </div>

              {/* Row: Rank + Category */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Peringkat</label>
                  <select
                    value={formData.rank}
                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  >
                    {ranks.map(rank => (
                      <option key={rank} value={rank}>{rank}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  >
                    {categories.filter(c => c !== 'Semua').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row: Year + Color */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Tahun</span>
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors"
                  >
                    {years.filter(y => y !== 'Semua').map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Warna Tema</label>
                  <div className="flex gap-2">
                    {colors.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, accentColor: color.value })}
                        className={`w-12 h-12 rounded-xl transition-all ${
                          formData.accentColor === color.value 
                            ? 'ring-4 ring-offset-2 ring-yellow-500 scale-110' 
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="published"
                      checked={formData.status === 'published'}
                      onChange={(e) => setFormData({ ...formData, status: 'published' })}
                      className="w-4 h-4 text-yellow-600"
                    />
                    <span>Published</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={formData.status === 'draft'}
                      onChange={(e) => setFormData({ ...formData, status: 'draft' })}
                      className="w-4 h-4 text-yellow-600"
                    />
                    <span>Draft</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl hover:from-yellow-600 hover:to-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{isEditing ? 'Update' : 'Simpan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
