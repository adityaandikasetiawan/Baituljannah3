'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Image as ImageIcon, Plus, Edit, Trash2, Search, Filter, Calendar, X, Check, Upload, Grid, List } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Toaster, toast } from 'sonner';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  unit: string;
  date: string;
  keterangan: string;
  image: string;
  status: 'Published' | 'Draft';
  uploadedByName: string;
  views: number;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const { menuItems } = useNavigationMenu('admin');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const accentColor = '#1E4AB8';

  const apiBaseUrl = useMemo(() => {
    const base = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '');
    if (typeof window === 'undefined') return base;
    const hostname = window.location.hostname.toLowerCase();
    if (
      hostname === 'smaitbaituljannah.sch.id' ||
      hostname === 'www.smaitbaituljannah.sch.id' ||
      hostname === 'smpitbaituljannah.sch.id' ||
      hostname === 'www.smpitbaituljannah.sch.id'
    ) {
      return 'https://baituljannah.sch.id/api/v1';
    }
    return base;
  }, []);

  const lockedUnitCode = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const hostname = window.location.hostname.toLowerCase();
    if (hostname === 'smpitbaituljannah.sch.id' || hostname === 'www.smpitbaituljannah.sch.id') return 'SMPIT';
    if (hostname === 'smaitbaituljannah.sch.id' || hostname === 'www.smaitbaituljannah.sch.id') return 'SMAIT';
    const path = window.location.pathname || '';
    const m = path.match(/^\/(tkit|sdit|smpit|smait|slbit)\/admin(\/|$)/i);
    if (!m?.[1]) return null;
    return String(m[1]).toUpperCase();
  }, []);

  const getCookie = useCallback((name: string) => {
    if (typeof document === 'undefined') return null;
    const cookieStr = document.cookie || '';
    const parts = cookieStr.split(';').map((p) => p.trim());
    const prefix = `${encodeURIComponent(name)}=`;
    for (const part of parts) {
      if (part.startsWith(prefix)) {
        return decodeURIComponent(part.slice(prefix.length));
      }
      if (part.startsWith(`${name}=`)) {
        return decodeURIComponent(part.slice(`${name}=`.length));
      }
    }
    return null;
  }, []);

  const getToken = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const lsToken = localStorage.getItem('baituljannah_token');
    if (lsToken) return lsToken;
    const cookieToken = getCookie('token');
    if (cookieToken) {
      localStorage.setItem('baituljannah_token', cookieToken);
      return cookieToken;
    }
    return null;
  }, [getCookie]);

  const getLoginPath = useCallback(() => {
    if (typeof window === 'undefined') return '/login';
    const hostname = window.location.hostname.toLowerCase();
    const isUnitSubdomain =
      hostname === 'smpitbaituljannah.sch.id' ||
      hostname === 'www.smpitbaituljannah.sch.id' ||
      hostname === 'smaitbaituljannah.sch.id' ||
      hostname === 'www.smaitbaituljannah.sch.id';
    if (isUnitSubdomain) return '/login';
    const path = window.location.pathname || '';
    const unitMatch = path.match(/^\/(tkit|sdit|smpit|smait|slbit)(\/|$)/i);
    if (unitMatch?.[1]) return `/${unitMatch[1].toLowerCase()}/login`;
    return '/login';
  }, []);

  const getStoredUserName = () => {
    if (typeof window === 'undefined') return 'Admin';
    try {
      const userStr = localStorage.getItem('baituljannah_user');
      const user = userStr ? JSON.parse(userStr) : null;
      return user?.full_name || user?.username || 'Admin';
    } catch {
      return 'Admin';
    }
  };

  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Kegiatan',
    unit: lockedUnitCode || 'Semua',
    date: new Date().toISOString().split('T')[0],
    keterangan: '',
    status: 'Draft' as 'Published' | 'Draft'
  });

  const categories = ['Semua', 'Akademik', 'Keagamaan', 'Olahraga', 'Kegiatan', 'Fasilitas', 'Prestasi', 'Lainnya'];

  const fromApiStatus = (status: string | null | undefined): 'Published' | 'Draft' => {
    if (status === 'published') return 'Published';
    return 'Draft';
  };

  const isAllowedImageFile = (file: File) => {
    const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
    if (file.type && allowedTypes.has(file.type)) return true;
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const allowedExt = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif']);
    return allowedExt.has(ext);
  };

  const toApiStatus = (status: 'Published' | 'Draft'): string => {
    return status === 'Published' ? 'published' : 'draft';
  };

  const loadGallery = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setGalleryList([]);
      return;
    }

    setIsLoading(true);
    try {
      const unitQuery = lockedUnitCode ? `&unit_code=${encodeURIComponent(lockedUnitCode)}` : '';
      const res = await fetch(`${apiBaseUrl}/gallery/manage?limit=200`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || 'Gagal memuat data galeri');
      }
      const rows = Array.isArray(json?.data) ? json.data : [];
      setGalleryList(
        rows.map((row: any) => {
          const dateValue = row?.event_date || row?.created_at || new Date().toISOString();
          return {
            id: Number(row?.id),
            title: String(row?.title || ''),
            category: String(row?.category || 'Lainnya'),
            unit: String(row?.unit_code || 'Semua'),
            date: String(dateValue).split('T')[0],
            keterangan: String(row?.keterangan || row?.description || ''),
            image: String(row?.image_url || ''),
            status: fromApiStatus(row?.status),
            uploadedByName: String(row?.uploaded_by_name || 'Admin'),
            views: Number(row?.views || 0),
          } satisfies GalleryItem;
        })
      );
    } catch (e: any) {
      toast.error(e?.message || 'Gagal memuat data galeri');
      setGalleryList([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, getToken, lockedUnitCode]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }
    loadGallery();
  }, [getLoginPath, getToken, loadGallery, router]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const filteredGallery = galleryList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      title: '',
      category: 'Kegiatan',
      unit: lockedUnitCode || 'Semua',
      date: new Date().toISOString().split('T')[0],
      keterangan: '',
      status: 'Draft'
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setShowModal(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setModalMode('edit');
    setSelectedImage(item);
    setFormData({
      title: item.title,
      category: item.category,
      unit: item.unit,
      date: item.date,
      keterangan: item.keterangan,
      status: item.status,
    });
    setSelectedFile(null);
    setPreviewUrl(item.image || '');
    setShowModal(true);
  };

  const handleView = (item: GalleryItem) => {
    setModalMode('view');
    setSelectedImage(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token) return toast.error('Token tidak ditemukan. Silakan login ulang.');

    const title = String(formData.title || '').trim();
    if (!title) return toast.error('Judul foto wajib diisi');
    if (modalMode === 'create' && !selectedFile) return toast.error('File gambar wajib diupload');

    if (selectedFile) {
      if (!isAllowedImageFile(selectedFile)) return toast.error('Format file tidak didukung. Gunakan JPG/PNG/WEBP/GIF.');
      if (selectedFile.size > 10 * 1024 * 1024) return toast.error('Ukuran file maksimal 10MB');
    }

    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('category', formData.category || 'Lainnya');
      fd.append('unit_code', lockedUnitCode || formData.unit || 'Semua');
      fd.append('event_date', formData.date || '');
      fd.append('status', toApiStatus(formData.status));
      fd.append('keterangan', formData.keterangan || '');
      if (selectedFile) fd.append('image', selectedFile);

      const url =
        modalMode === 'create'
          ? `${apiBaseUrl}/gallery`
          : `${apiBaseUrl}/gallery/${selectedImage?.id}`;

      const res = await fetch(url, {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal menyimpan galeri');

      toast.success(modalMode === 'create' ? 'Galeri berhasil dibuat' : 'Galeri berhasil diperbarui');
      setShowModal(false);
      setSelectedImage(null);
      setSelectedFile(null);
      setPreviewUrl('');
      await loadGallery();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menyimpan galeri');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = getToken();
    if (!token) return toast.error('Token tidak ditemukan. Silakan login ulang.');

    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal menghapus galeri');
      toast.success('Galeri berhasil dihapus');
      setShowDeleteConfirm(null);
      await loadGallery();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menghapus galeri');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isAllowedImageFile(file)) return toast.error('Format file tidak didukung. Gunakan JPG/PNG/WEBP/GIF.');
      if (file.size > 10 * 1024 * 1024) return toast.error('Ukuran file maksimal 10MB');
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const stats = [
    { label: 'Total Foto', value: galleryList.length, color: 'from-blue-500 to-blue-600' },
    { label: 'Kategori', value: categories.length - 1, color: 'from-green-500 to-green-600' },
    { label: 'Published', value: galleryList.filter((i) => i.status === 'Published').length, color: 'from-green-500 to-green-600' },
    { label: 'Bulan Ini', value: galleryList.filter(i => new Date(i.date).getMonth() === new Date().getMonth()).length, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Sidebar 
        menuItems={menuItems} 
        accentColor={accentColor}
        userName={getStoredUserName()}
        userRole="Super Admin"
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Manajemen Galeri</h1>
                <p className="text-gray-600">Kelola semua foto dan dokumentasi kegiatan sekolah</p>
              </div>
              <button
                onClick={handleCreate}
                className="btn-primary flex items-center gap-2 px-4 py-2 bg-[#1E4AB8] text-white rounded-lg hover:bg-[#1a3d9a] transition-colors"
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
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                />
              </div>

              {/* Filter Category */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] appearance-none bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-[#1E4AB8]' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-[#1E4AB8]' : 'text-gray-500 hover:text-gray-700'
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
                  className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 relative"
                  onClick={() => handleView(item)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-xs opacity-80">{new Date(item.date).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions Overlay */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{item.keterangan}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(item.date).toLocaleDateString('id-ID')}</span>
                            </div>
                            <span>Upload: {item.uploadedByName}</span>
                            <span>Views: {item.views}</span>
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
      </main>

      {/* Create/Edit/View Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {modalMode === 'create' ? 'Upload Foto Baru' : modalMode === 'edit' ? 'Edit Foto' : 'Detail Foto'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {modalMode === 'view' && selectedImage ? (
                <div className="space-y-6">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {selectedImage.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {selectedImage.unit}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{selectedImage.keterangan}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedImage.date).toLocaleDateString('id-ID')} • {selectedImage.uploadedByName}
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
                    </div>
                    {(previewUrl || (modalMode === 'edit' && selectedImage?.image)) && (
                      <div className="mt-4 rounded-2xl overflow-hidden">
                        <ImageWithFallback
                          src={previewUrl || selectedImage?.image || ''}
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
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 bg-white"
                      >
                        {categories.filter(c => c !== 'Semua').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Unit *</label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        disabled={Boolean(lockedUnitCode)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 bg-white"
                      >
                        {lockedUnitCode ? (
                          <option value={lockedUnitCode}>{lockedUnitCode}</option>
                        ) : (
                          <>
                            <option value="Semua">Semua</option>
                            <option value="TKIT">TKIT</option>
                            <option value="SDIT">SDIT</option>
                            <option value="SMPIT">SMPIT</option>
                            <option value="SMAIT">SMAIT</option>
                            <option value="SLBIT">SLBIT</option>
                            <option value="Yayasan">Yayasan</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tanggal Kegiatan</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 bg-white"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Keterangan</label>
                    <textarea
                      name="keterangan"
                      value={formData.keterangan}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder="Tambahkan keterangan untuk foto..."
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
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
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
            <h3 className="text-xl text-center font-bold mb-2">Hapus Foto?</h3>
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
}
