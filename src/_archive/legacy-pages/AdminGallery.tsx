import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Image as ImageIcon, Plus, Edit, Trash2, Search, Filter, Calendar, X, Check, Upload, Grid, List, Download } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface AdminGalleryProps {
  onNavigate?: (page: string) => void;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  unit: string;
  date: string;
  photographer: string;
  description: string;
  image: string;
  downloads: number;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ onNavigate = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate('admin-super') },
    { label: 'Berita', href: '#', onClick: () => onNavigate('admin-news') },
    { label: 'Galeri', href: '#', onClick: () => {} },
    { label: 'Prestasi', href: '#', onClick: () => onNavigate('admin-achievement') },
    { label: 'Program', href: '#', onClick: () => onNavigate('admin-programs') }
  ];

  const [galleryList, setGalleryList] = useState<GalleryItem[]>([
    {
      id: 1,
      title: 'Upacara Bendera Senin Pagi',
      category: 'Kegiatan',
      unit: 'Semua Unit',
      date: '2024-12-02',
      photographer: 'Admin Yayasan',
      description: 'Upacara bendera rutin setiap hari Senin pagi di lapangan utama',
      image: 'https://images.unsplash.com/photo-1740493430383-a0bfff9550a5',
      downloads: 45
    },
    {
      id: 2,
      title: 'Pembelajaran di Kelas',
      category: 'Akademik',
      unit: 'SDIT',
      date: '2024-11-28',
      photographer: 'Admin SDIT',
      description: 'Suasana pembelajaran aktif di kelas 3 SDIT',
      image: 'https://images.unsplash.com/photo-1758270705799-12efda48d4f4',
      downloads: 32
    },
    {
      id: 3,
      title: 'Pertandingan Futsal Antar Kelas',
      category: 'Olahraga',
      unit: 'SMPIT',
      date: '2024-11-25',
      photographer: 'Admin SMPIT',
      description: 'Final pertandingan futsal antar kelas SMPIT',
      image: 'https://images.unsplash.com/photo-1759200135568-566eb9ecaa81',
      downloads: 67
    },
    {
      id: 4,
      title: 'Praktek Lab Sains',
      category: 'Akademik',
      unit: 'SMAIT',
      date: '2024-11-20',
      photographer: 'Admin SMAIT',
      description: 'Siswa sedang melakukan eksperimen di laboratorium sains',
      image: 'https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac',
      downloads: 28
    },
    {
      id: 5,
      title: 'Kegiatan Tahfidz',
      category: 'Keagamaan',
      unit: 'SDIT',
      date: '2024-11-15',
      photographer: 'Admin SDIT',
      description: 'Siswa sedang muroja\'ah hafalan bersama ustadz',
      image: 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
      downloads: 89
    },
    {
      id: 6,
      title: 'Perpustakaan Sekolah',
      category: 'Fasilitas',
      unit: 'Yayasan',
      date: '2024-11-10',
      photographer: 'Admin Yayasan',
      description: 'Perpustakaan modern dengan koleksi lengkap',
      image: 'https://images.unsplash.com/photo-1595315343110-9b445a960442',
      downloads: 51
    }
  ]);

  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Kegiatan',
    unit: 'Semua Unit',
    date: new Date().toISOString().split('T')[0],
    photographer: 'Admin Yayasan',
    description: '',
    image: ''
  });

  const categories = ['Semua', 'Akademik', 'Keagamaan', 'Olahraga', 'Kegiatan', 'Fasilitas', 'Prestasi'];
  const units = ['Semua Unit', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT', 'Yayasan'];

  const filteredGallery = galleryList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      title: '',
      category: 'Kegiatan',
      unit: 'Semua Unit',
      date: new Date().toISOString().split('T')[0],
      photographer: 'Admin Yayasan',
      description: '',
      image: 'https://images.unsplash.com/photo-1740493430383-a0bfff9550a5'
    });
    setShowModal(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setModalMode('edit');
    setSelectedImage(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleView = (item: GalleryItem) => {
    setModalMode('view');
    setSelectedImage(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newItem: GalleryItem = {
        ...formData as GalleryItem,
        id: Math.max(...galleryList.map(i => i.id), 0) + 1,
        downloads: 0
      };
      setGalleryList([newItem, ...galleryList]);
    } else if (modalMode === 'edit' && selectedImage) {
      setGalleryList(galleryList.map(item => 
        item.id === selectedImage.id ? { ...formData as GalleryItem, id: selectedImage.id, downloads: selectedImage.downloads } : item
      ));
    }
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleDelete = (id: number) => {
    setGalleryList(galleryList.filter(item => item.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(0), 500);
        }
      }, 200);
      
      // In real app, upload to server here
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Total Foto', value: galleryList.length, color: 'from-blue-500 to-blue-600' },
    { label: 'Kategori', value: categories.length - 1, color: 'from-green-500 to-green-600' },
    { label: 'Total Downloads', value: galleryList.reduce((sum, i) => sum + i.downloads, 0), color: 'from-purple-500 to-purple-600' },
    { label: 'Bulan Ini', value: galleryList.filter(i => new Date(i.date).getMonth() === new Date().getMonth()).length, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Admin Panel - Galeri"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Manajemen Galeri</h1>
              <p className="text-gray-600">Kelola semua foto dan dokumentasi kegiatan sekolah</p>
            </div>
            <button
              onClick={handleCreate}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Upload Foto</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari foto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full md:w-auto py-2 bg-transparent outline-none"
              >
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan <strong>{filteredGallery.length}</strong> dari <strong>{galleryList.length}</strong> foto
          </div>
        </div>

        {/* Gallery Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all cursor-pointer"
                onClick={() => handleView(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h4 className="text-white text-sm mb-1 line-clamp-2">{item.title}</h4>
                  <p className="text-white/80 text-xs">{item.category} • {item.unit}</p>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                  >
                    <Edit className="w-4 h-4 text-green-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(item.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-lg backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGallery.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                <div className="flex gap-6">
                  <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {item.category}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {item.unit}
                          </span>
                        </div>
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{item.downloads} downloads</span>
                          </div>
                          <span>Foto: {item.photographer}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleView(item)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(item.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredGallery.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">Tidak ada foto yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Create/Edit/View Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">
                  {modalMode === 'create' ? 'Upload Foto Baru' : modalMode === 'edit' ? 'Edit Foto' : 'Detail Foto'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {modalMode === 'view' ? (
                /* View Mode */
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={formData.image || ''}
                      alt={formData.title || ''}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl mb-2">{formData.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {formData.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {formData.unit}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{formData.description}</p>
                    <div className="text-sm text-gray-600">
                      {formData.date && new Date(formData.date).toLocaleDateString('id-ID')} • {formData.photographer}
                    </div>
                  </div>
                </div>
              ) : (
                /* Create/Edit Mode */
                <>
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Gambar *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#1E4AB8] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-[#1E4AB8]" />
                        </div>
                        <p className="text-gray-700 mb-1">Click to upload atau drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </label>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#1E4AB8] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
                        </div>
                      )}
                    </div>
                    {formData.image && (
                      <div className="mt-4 rounded-2xl overflow-hidden">
                        <ImageWithFallback
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Judul Foto *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder="Masukkan judul foto"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Kategori *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      >
                        {categories.filter(c => c !== 'Semua').map(cat => (
                          <option key={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Unit *</label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      >
                        {units.map(unit => (
                          <option key={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tanggal *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Deskripsi</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder="Deskripsi foto..."
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {modalMode === 'view' ? 'Tutup' : 'Batal'}
              </button>
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{modalMode === 'create' ? 'Upload Foto' : 'Simpan Perubahan'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl text-center mb-2">Hapus Foto?</h3>
            <p className="text-gray-600 text-center mb-6">
              Foto yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

