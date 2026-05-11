'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Award, Plus, Edit, Trash2, Search, Filter, Calendar, X, Upload, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Toaster, toast } from 'sonner';

type AchievementStatus = 'Published' | 'Draft';

type AchievementLevel = 'sekolah' | 'kecamatan' | 'kabupaten' | 'provinsi' | 'nasional' | 'internasional';

interface AchievementItem {
  id: number;
  school_unit_id: number | null;
  title: string;
  description: string;
  category: string;
  level: AchievementLevel;
  rank: string;
  student_name: string;
  teacher_name: string;
  achievement_date: string;
  image_url: string;
  certificate_url: string;
  status: AchievementStatus;
  created_at?: string;
}

const fromApiStatus = (status: string | null | undefined): AchievementStatus => {
  return status === 'draft' ? 'Draft' : 'Published';
};

const toApiStatus = (status: AchievementStatus): 'draft' | 'published' => {
  return status === 'Draft' ? 'draft' : 'published';
};

export default function AdminAchievementPage() {
  const router = useRouter();
  const { menuItems } = useNavigationMenu('admin');
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

  const userRoleLabel = lockedUnitCode ? `Admin ${lockedUnitCode}` : 'Super Admin';

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selected, setSelected] = useState<AchievementItem | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Semua' | AchievementStatus>('Semua');
  const [filterLevel, setFilterLevel] = useState<'Semua' | AchievementLevel>('Semua');

  const [items, setItems] = useState<AchievementItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [formData, setFormData] = useState({
    school_unit_id: '',
    title: '',
    description: '',
    category: '',
    level: 'sekolah' as AchievementLevel,
    rank: '',
    student_name: '',
    teacher_name: '',
    achievement_date: new Date().toISOString().split('T')[0],
    image_url: '',
    certificate_url: '',
    status: 'Draft' as AchievementStatus,
  });

  const levels: AchievementLevel[] = ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional'];

  const loadAchievements = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setItems([]);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '200');
      if (filterStatus !== 'Semua') params.set('status', toApiStatus(filterStatus));
      if (filterLevel !== 'Semua') params.set('level', filterLevel);
      const res = await fetch(`${apiBaseUrl}/achievements/manage?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat data prestasi');

      const rows = Array.isArray(json?.data) ? json.data : [];
      setItems(
        rows.map((row: any) => {
          const dateValue = row?.achievement_date || row?.created_at || new Date().toISOString();
          return {
            id: Number(row?.id),
            school_unit_id: row?.school_unit_id == null ? null : Number(row.school_unit_id),
            title: String(row?.title || ''),
            description: String(row?.description || ''),
            category: String(row?.category || ''),
            level: (String(row?.level || 'sekolah') as AchievementLevel) || 'sekolah',
            rank: String(row?.rank || ''),
            student_name: String(row?.student_name || ''),
            teacher_name: String(row?.teacher_name || ''),
            achievement_date: String(dateValue).split('T')[0],
            image_url: String(row?.image_url || ''),
            certificate_url: String(row?.certificate_url || ''),
            status: fromApiStatus(row?.status),
            created_at: row?.created_at ? String(row.created_at) : undefined,
          } satisfies AchievementItem;
        })
      );
    } catch (e: any) {
      toast.error(e?.message || 'Gagal memuat data prestasi');
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, filterLevel, filterStatus, getToken]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }
    loadAchievements();
  }, [getLoginPath, getToken, loadAchievements, router]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const filteredItems = items.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.student_name.toLowerCase().includes(q) ||
      item.teacher_name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const stats = useMemo(() => {
    const published = items.filter((i) => i.status === 'Published').length;
    const draft = items.filter((i) => i.status === 'Draft').length;
    return [
      { label: 'Total Prestasi', value: items.length },
      { label: 'Published', value: published },
      { label: 'Draft', value: draft },
    ];
  }, [items]);

  const openCreate = () => {
    setModalMode('create');
    setSelected(null);
    setFormData({
      school_unit_id: '',
      title: '',
      description: '',
      category: '',
      level: 'sekolah',
      rank: '',
      student_name: '',
      teacher_name: '',
      achievement_date: new Date().toISOString().split('T')[0],
      image_url: '',
      certificate_url: '',
      status: 'Draft',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setShowModal(true);
  };

  const openEdit = (item: AchievementItem) => {
    setModalMode('edit');
    setSelected(item);
    setFormData({
      school_unit_id: item.school_unit_id == null ? '' : String(item.school_unit_id),
      title: item.title,
      description: item.description,
      category: item.category,
      level: item.level,
      rank: item.rank,
      student_name: item.student_name,
      teacher_name: item.teacher_name,
      achievement_date: item.achievement_date,
      image_url: item.image_url,
      certificate_url: item.certificate_url,
      status: item.status,
    });
    setSelectedFile(null);
    setPreviewUrl(item.image_url || '');
    setShowModal(true);
  };

  const openView = (item: AchievementItem) => {
    setModalMode('view');
    setSelected(item);
    setShowModal(true);
  };

  const uploadImage = async (file: File) => {
    const token = getToken();
    if (!token) throw new Error('Token tidak ditemukan. Silakan login ulang.');
    const fd = new FormData();
    fd.append('image', file);
    const res = await fetch(`${apiBaseUrl}/achievements/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal upload gambar');
    const url = String(json?.data?.url || '');
    if (!url) throw new Error('Gagal upload gambar');
    return url;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    setIsLoading(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast.success('Gambar berhasil diupload');
    } catch (err: any) {
      toast.error(err?.message || 'Gagal upload gambar');
      setSelectedFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token) return toast.error('Token tidak ditemukan. Silakan login ulang.');

    const title = String(formData.title || '').trim();
    if (!title) return toast.error('Judul prestasi wajib diisi');
    if (!formData.level) return toast.error('Level wajib dipilih');

    setIsLoading(true);
    try {
      const payload: any = {
        title,
        description: formData.description ? String(formData.description).trim() : null,
        category: formData.category ? String(formData.category).trim() : null,
        level: formData.level,
        rank: formData.rank ? String(formData.rank).trim() : null,
        student_name: formData.student_name ? String(formData.student_name).trim() : null,
        teacher_name: formData.teacher_name ? String(formData.teacher_name).trim() : null,
        achievement_date: formData.achievement_date || null,
        image_url: formData.image_url ? String(formData.image_url).trim() : null,
        certificate_url: formData.certificate_url ? String(formData.certificate_url).trim() : null,
        status: toApiStatus(formData.status),
      };

      if (!lockedUnitCode && formData.school_unit_id) {
        payload.school_unit_id = Number(formData.school_unit_id);
      }

      const isEdit = modalMode === 'edit' && selected?.id;
      const endpoint = isEdit ? `${apiBaseUrl}/achievements/${selected!.id}` : `${apiBaseUrl}/achievements`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal menyimpan prestasi');

      toast.success(isEdit ? 'Prestasi berhasil diperbarui' : 'Prestasi berhasil dibuat');
      setShowModal(false);
      setSelected(null);
      setSelectedFile(null);
      setPreviewUrl('');
      await loadAchievements();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menyimpan prestasi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = getToken();
    if (!token) return toast.error('Token tidak ditemukan. Silakan login ulang.');
    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/achievements/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal menghapus prestasi');
      toast.success('Prestasi berhasil dihapus');
      setShowDeleteConfirm(null);
      await loadAchievements();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menghapus prestasi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Sidebar
        menuItems={menuItems}
        accentColor={accentColor}
        userRole={userRoleLabel}
        userName={getStoredUserName()}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Manajemen Prestasi</h1>
                <p className="text-gray-600">Kelola data prestasi siswa dan sekolah</p>
              </div>
              <button
                onClick={openCreate}
                className="btn-primary flex items-center gap-2 px-4 py-2 bg-[#1E4AB8] text-white rounded-lg hover:bg-[#1a3d9a] transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Tambah Prestasi</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="w-12 h-12 rounded-xl bg-[#1E4AB8]/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-[#1E4AB8]" />
                  </div>
                  <p className="text-2xl font-bold mb-1">{s.value}</p>
                  <p className="text-sm text-gray-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari judul / siswa / guru..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] appearance-none bg-white"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value as any)}
                  className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] appearance-none bg-white"
                >
                  <option value="Semua">Semua Level</option>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-strong transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                      {item.image_url ? (
                        <ImageWithFallback src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-7 h-7" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 truncate">{item.title}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium border ${
                            item.status === 'Published'
                              ? 'bg-green-50 text-green-700 border-green-100'
                              : 'bg-gray-50 text-gray-700 border-gray-200'
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {item.student_name ? `Siswa: ${item.student_name}` : 'Siswa: -'} {item.teacher_name ? `• Pembina: ${item.teacher_name}` : ''}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{item.achievement_date}</span>
                        </div>
                        {item.category ? (
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700">{item.category}</span>
                        ) : null}
                        {item.rank ? <span className="text-xs text-gray-600">Peringkat: {item.rank}</span> : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => openView(item)}
                      className="px-3 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(item.id)}
                      className="p-2 border border-gray-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {showDeleteConfirm === item.id ? (
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setShowDeleteConfirm(null)}
                      className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                      disabled={isLoading}
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
                      disabled={isLoading}
                    >
                      Hapus
                    </button>
                  </div>
                ) : null}
              </div>
            ))}

            {!isLoading && filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak ada data ditemukan</h3>
                <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      {showModal ? (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-strong w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold">
                  {modalMode === 'create' ? 'Tambah Prestasi' : modalMode === 'edit' ? 'Edit Prestasi' : 'Detail Prestasi'}
                </h2>
                <p className="text-sm text-gray-500">
                  {lockedUnitCode ? `Unit terkunci: ${lockedUnitCode}` : 'Pastikan data prestasi diisi dengan benar'}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-gray-50">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {modalMode === 'view' && selected ? (
                <div className="space-y-4">
                  {selected.image_url ? (
                    <ImageWithFallback
                      src={selected.image_url}
                      alt={selected.title}
                      className="w-full h-56 object-cover rounded-2xl bg-gray-100"
                    />
                  ) : null}
                  <div className="grid gap-2">
                    <div className="text-2xl font-bold">{selected.title}</div>
                    <div className="text-sm text-gray-600">{selected.description || '-'}</div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">{selected.level}</span>
                      <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-lg border border-gray-200">{selected.status}</span>
                      {selected.category ? (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg">{selected.category}</span>
                      ) : null}
                    </div>
                    <div className="text-sm text-gray-700 mt-2">
                      <div>Siswa: {selected.student_name || '-'}</div>
                      <div>Pembina: {selected.teacher_name || '-'}</div>
                      <div>Tanggal: {selected.achievement_date || '-'}</div>
                      <div>Peringkat: {selected.rank || '-'}</div>
                      <div>
                        Sertifikat:{' '}
                        {selected.certificate_url ? (
                          <a className="text-blue-600 hover:underline" href={selected.certificate_url} target="_blank" rel="noreferrer">
                            {selected.certificate_url}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {!lockedUnitCode ? (
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">School Unit ID (opsional untuk super admin)</label>
                      <input
                        value={formData.school_unit_id}
                        onChange={(e) => setFormData((p) => ({ ...p, school_unit_id: e.target.value }))}
                        type="number"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        placeholder="contoh: 3"
                        disabled={isLoading}
                      />
                    </div>
                  ) : null}

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">Judul</label>
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                      placeholder="Judul prestasi"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] min-h-24"
                      placeholder="Deskripsi prestasi (opsional)"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Level</label>
                      <select
                        value={formData.level}
                        onChange={(e) => setFormData((p) => ({ ...p, level: e.target.value as AchievementLevel }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] bg-white"
                        disabled={isLoading}
                      >
                        {levels.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as AchievementStatus }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] bg-white"
                        disabled={isLoading}
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Kategori</label>
                      <input
                        value={formData.category}
                        onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        placeholder="contoh: Akademik"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Peringkat</label>
                      <input
                        value={formData.rank}
                        onChange={(e) => setFormData((p) => ({ ...p, rank: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        placeholder="contoh: Juara 1"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Nama Siswa</label>
                      <input
                        value={formData.student_name}
                        onChange={(e) => setFormData((p) => ({ ...p, student_name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        placeholder="Nama siswa (opsional)"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Nama Pembina/Guru</label>
                      <input
                        value={formData.teacher_name}
                        onChange={(e) => setFormData((p) => ({ ...p, teacher_name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        placeholder="Nama guru (opsional)"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Tanggal Prestasi</label>
                      <input
                        type="date"
                        value={formData.achievement_date}
                        onChange={(e) => setFormData((p) => ({ ...p, achievement_date: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium text-gray-700">Link Sertifikat (opsional)</label>
                      <input
                        value={formData.certificate_url}
                        onChange={(e) => setFormData((p) => ({ ...p, certificate_url: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        placeholder="https://..."
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">Gambar</label>
                    <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                      <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                        <Upload className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Upload</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isLoading} />
                      </label>
                      <input
                        value={formData.image_url}
                        onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                        className="flex-1 w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                        placeholder="/uploads/achievement/xxx.jpg atau https://..."
                        disabled={isLoading}
                      />
                    </div>
                    {previewUrl || formData.image_url ? (
                      <div className="mt-2">
                        <ImageWithFallback
                          src={previewUrl || formData.image_url}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-2xl bg-gray-100"
                        />
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                disabled={isLoading}
              >
                Tutup
              </button>
              {modalMode !== 'view' ? (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors text-sm font-medium flex items-center gap-2"
                  disabled={isLoading}
                >
                  <span>Simpan</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
