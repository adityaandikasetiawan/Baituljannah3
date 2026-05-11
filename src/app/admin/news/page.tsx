'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { FileText, Plus, Edit, Trash2, Eye, Search, Filter, Calendar, Tag, X, Bell } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Toaster, toast } from 'sonner';

type NewsStatus = 'Published' | 'Draft' | 'Archived';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  unit: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  status: NewsStatus;
  views: number;
}

export default function AdminNewsPage() {
  const router = useRouter();
  const { menuItems } = useNavigationMenu('admin');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      if (part.startsWith(prefix)) return decodeURIComponent(part.slice(prefix.length));
      if (part.startsWith(`${name}=`)) return decodeURIComponent(part.slice(`${name}=`.length));
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

  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    category: 'Akademik',
    unit: lockedUnitCode || 'Semua',
    date: new Date().toISOString().split('T')[0],
    author: '',
    excerpt: '',
    content: '',
    image: '',
    status: 'Draft'
  });

  const categories = ['Semua', 'Akademik', 'Kegiatan', 'Prestasi', 'Pengumuman', 'Lainnya'];
  const units = ['Semua', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT'];
  const statuses = ['Semua', 'Published', 'Draft', 'Archived'];
  const accentColor = '#1E4AB8';

  const filteredNews = newsList.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || news.category === filterCategory;
    const matchesStatus = filterStatus === 'Semua' || news.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const fromApiStatus = (status: string | null | undefined): NewsStatus => {
    if (status === 'published') return 'Published';
    if (status === 'archived') return 'Archived';
    return 'Draft';
  };

  const toApiStatus = (status: NewsStatus): string => {
    if (status === 'Published') return 'published';
    if (status === 'Archived') return 'archived';
    return 'draft';
  };

  const toUiNewsItem = useCallback((row: any): NewsItem => {
    const content = String(row?.content || '');
    const excerpt = content.length > 160 ? `${content.slice(0, 160)}...` : content;
    const dateValue = row?.publish_date || row?.created_at || new Date().toISOString();
    return {
      id: Number(row?.id),
      title: String(row?.title || ''),
      category: String(row?.category || 'Lainnya'),
      unit: String(row?.unit_sekolah || 'Semua'),
      date: String(dateValue).split('T')[0],
      author: String(row?.author_name || 'Admin'),
      excerpt,
      content,
      image: String(row?.image_url || 'https://images.unsplash.com/photo-1644380644655-fcf91fa5c43b'),
      status: fromApiStatus(row?.status),
      views: Number(row?.views || 0),
    };
  }, []);

  const loadNews = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setNewsList([]);
      return;
    }

    setIsLoading(true);
    try {
      const unitQuery = lockedUnitCode ? `&unit_sekolah=${encodeURIComponent(lockedUnitCode)}` : '';
      const res = await fetch(`${apiBaseUrl}/news/manage?limit=200&sort=created_at&order=DESC${unitQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        const message = data?.message || 'Gagal memuat berita';
        toast.error(message);
        setNewsList([]);
        return;
      }

      const rows = Array.isArray(data.data) ? data.data : [];
      setNewsList(rows.map(toUiNewsItem));
    } catch {
      toast.error('Tidak bisa terhubung ke server');
      setNewsList([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, getToken, lockedUnitCode, toUiNewsItem]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }
    loadNews();
  }, [getLoginPath, getToken, loadNews, router]);

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      title: '',
      category: 'Akademik',
      unit: lockedUnitCode || 'Semua',
      date: new Date().toISOString().split('T')[0],
      author: getStoredUserName(),
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1644380644655-fcf91fa5c43b',
      status: 'Draft'
    });
    setShowModal(true);
  };

  const handleEdit = (news: NewsItem) => {
    setModalMode('edit');
    setSelectedNews(news);
    setFormData(news);
    setShowModal(true);
  };

  const handleView = (news: NewsItem) => {
    setModalMode('view');
    setSelectedNews(news);
    setFormData(news);
    setShowModal(true);
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token) {
      toast.error('Silakan login ulang (token tidak ditemukan)');
      return;
    }

    const payload = {
      title: String(formData.title || '').trim(),
      content: String(formData.content || ''),
      category: String(formData.category || 'Lainnya'),
      unit_sekolah: String(lockedUnitCode || formData.unit || 'Semua'),
      image_url: String(formData.image || ''),
      status: toApiStatus((formData.status as NewsStatus) || 'Draft'),
      publish_date: formData.date ? String(formData.date) : null,
    };

    if (!payload.title || !payload.content) {
      toast.error('Judul dan konten wajib diisi');
      return;
    }

    try {
      const isEdit = modalMode === 'edit' && selectedNews?.id;
      const endpoint = isEdit ? `${apiBaseUrl}/news/${selectedNews!.id}` : `${apiBaseUrl}/news`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        const message = data?.message || 'Gagal menyimpan berita';
        toast.error(message);
        return;
      }

      toast.success('Berita berhasil disimpan');
      setShowModal(false);
      setSelectedNews(null);
      await loadNews();
    } catch {
      toast.error('Tidak bisa terhubung ke server');
    }
  };

  const handleDelete = async (id: number) => {
    const token = getToken();
    if (!token) {
      toast.error('Silakan login ulang (token tidak ditemukan)');
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        const message = data?.message || 'Gagal menghapus berita';
        toast.error(message);
        return;
      }

      toast.success('Berita berhasil dihapus');
      setShowDeleteConfirm(null);
      await loadNews();
    } catch {
      toast.error('Tidak bisa terhubung ke server');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const stats = [
    { label: 'Total Berita', value: newsList.length, color: 'from-blue-500 to-blue-600' },
    { label: 'Published', value: newsList.filter(n => n.status === 'Published').length, color: 'from-green-500 to-green-600' },
    { label: 'Draft', value: newsList.filter(n => n.status === 'Draft').length, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Total Views', value: newsList.reduce((sum, n) => sum + n.views, 0).toLocaleString(), color: 'from-purple-500 to-purple-600' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Sidebar
        menuItems={menuItems}
        accentColor={accentColor}
        userRole="Super Admin"
        userName="Admin Utama"
      />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-base md:text-xl lg:text-2xl truncate">Manajemen Berita</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola semua berita dan pengumuman sekolah</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Bell className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                <span className="text-xs md:text-sm">👤</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 pl-16 lg:pl-6">
          {/* Header Actions */}
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={handleCreate}
              className="btn-primary flex items-center gap-2"
              style={{ backgroundColor: accentColor }}
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Berita</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari berita..."
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
                  className="w-full py-2 bg-transparent outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
                <Tag className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full py-2 bg-transparent outline-none"
                >
                  {statuses.map(status => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Menampilkan <strong>{filteredNews.length}</strong> dari <strong>{newsList.length}</strong> berita
            </div>
          </div>

          {/* News List */}
          <div className="space-y-4">
            {isLoading && (
              <div className="bg-white rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">Memuat berita...</p>
              </div>
            )}

            {filteredNews.map((news) => (
              <div key={news.id} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            news.status === 'Published'
                              ? 'bg-green-100 text-green-700'
                              : news.status === 'Archived'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {news.status}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {news.category}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {news.unit}
                          </span>
                        </div>
                        <h3 className="text-xl mb-2">{news.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(news.date).toLocaleDateString('id-ID')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{news.views} views</span>
                          </div>
                          <span>oleh {news.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleView(news)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title="Lihat"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(news)}
                      className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(news.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredNews.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">Tidak ada berita yang ditemukan</p>
              </div>
            )}
          </div>
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl my-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl">
                    {modalMode === 'create' ? 'Tambah Berita Baru' : modalMode === 'edit' ? 'Edit Berita' : 'Detail Berita'}
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
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl mb-2">{formData.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          formData.status === 'Published'
                            ? 'bg-green-100 text-green-700'
                            : formData.status === 'Archived'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {formData.status}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {formData.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {formData.unit}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {formData.date && new Date(formData.date).toLocaleDateString('id-ID')} • {formData.author}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{formData.content}</p>
                    </div>
                  </div>
                ) : (
                  /* Create/Edit Mode */
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Judul Berita *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="Masukkan judul berita"
                        required
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
                          disabled={Boolean(lockedUnitCode)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        >
                          {lockedUnitCode ? (
                            <option>{lockedUnitCode}</option>
                          ) : (
                            units.map(unit => (
                              <option key={unit}>{unit}</option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Ringkasan (Excerpt) *</label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="Ringkasan singkat berita..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Konten Berita *</label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={10}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="Tulis konten berita lengkap..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">URL Gambar *</label>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                          placeholder="https://..."
                          required
                        />
                      </div>
                      {formData.image && (
                        <div className="mt-4 h-40 w-full rounded-xl overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value="Published"
                            checked={formData.status === 'Published'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-[#1E4AB8]"
                          />
                          <span>Published</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value="Draft"
                            checked={formData.status === 'Draft'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-[#1E4AB8]"
                          />
                          <span>Draft</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value="Archived"
                            checked={formData.status === 'Archived'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-[#1E4AB8]"
                          />
                          <span>Archived</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Tutup
                </button>
                {modalMode !== 'view' && (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-xl bg-[#1E4AB8] text-white hover:bg-[#1E4AB8]/90 transition-colors"
                  >
                    Simpan
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Hapus Berita?</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
