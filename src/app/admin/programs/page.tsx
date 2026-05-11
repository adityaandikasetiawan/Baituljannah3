'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Award, Plus, Edit, Trash2, Search, Filter, X, Check, Upload } from 'lucide-react';
import { Toaster, toast } from 'sonner';

type ProgramStatus = 'active' | 'inactive';

interface ProgramItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  category: string | null;
  status: ProgramStatus;
  unit_code: string;
  created_at?: string;
  updated_at?: string;
}

export default function AdminProgramsPage() {
  const router = useRouter();
  const { menuItems } = useNavigationMenu('admin');
  const accentColor = '#1E4AB8';
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState<'Semua' | ProgramStatus>('Semua');
  const [filterUnitCode, setFilterUnitCode] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  useEffect(() => {
    if (!lockedUnitCode) return;
    setFilterUnitCode(lockedUnitCode);
  }, [lockedUnitCode]);

  const unitOptions = ['Semua', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT'];
  const categoryOptions = ['Semua', 'Akademik', 'Keagamaan', 'Bahasa', 'Olahraga', 'Teknologi', 'Keterampilan', 'Seni'];

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

  const [programList, setProgramList] = useState<ProgramItem[]>([]);
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

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    category: string;
    unit_code: string;
    status: ProgramStatus;
    icon: string;
    image_url: string;
    description: string;
  }>({
    title: '',
    slug: '',
    category: '',
    unit_code: lockedUnitCode || 'Semua',
    status: 'active',
    icon: '',
    image_url: '',
    description: '',
  });

  useEffect(() => {
    if (!lockedUnitCode) return;
    setFormData((prev) => ({ ...prev, unit_code: lockedUnitCode }));
  }, [lockedUnitCode]);

  const loadPrograms = useCallback(async () => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (filterCategory !== 'Semua') params.set('category', filterCategory);
      if (filterStatus !== 'Semua') params.set('status', filterStatus);
      if (lockedUnitCode) params.set('unit_code', lockedUnitCode);
      else if (filterUnitCode !== 'Semua') params.set('unit_code', filterUnitCode);

      const res = await fetch(`${apiBaseUrl}/programs/manage?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat program');
      setProgramList(Array.isArray(json?.data) ? json.data : []);
    } catch (e: any) {
      toast.error(e?.message || 'Gagal memuat program');
      setProgramList([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, filterCategory, filterStatus, filterUnitCode, getLoginPath, getToken, lockedUnitCode, router, searchQuery]);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  const openCreate = () => {
    setModalMode('create');
    setSelectedProgram(null);
    setFormData({
      title: '',
      slug: '',
      category: '',
      unit_code: lockedUnitCode || filterUnitCode || 'Semua',
      status: 'active',
      icon: '',
      image_url: '',
      description: '',
    });
    setShowModal(true);
  };

  const openEdit = (program: ProgramItem) => {
    setModalMode('edit');
    setSelectedProgram(program);
    setFormData({
      title: program.title || '',
      slug: program.slug || '',
      category: program.category || '',
      unit_code: program.unit_code || 'Semua',
      status: program.status || 'active',
      icon: program.icon || '',
      image_url: program.image_url || '',
      description: program.description || '',
    });
    setShowModal(true);
  };

  const saveProgram = async () => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || undefined,
      category: formData.category.trim() || undefined,
      unit_code: lockedUnitCode || formData.unit_code,
      status: formData.status,
      icon: formData.icon.trim() || undefined,
      image_url: formData.image_url.trim() || undefined,
      description: formData.description.trim() || undefined,
    };

    if (!payload.title) {
      toast.error('Title wajib diisi');
      return;
    }

    setIsLoading(true);
    try {
      const isEdit = modalMode === 'edit' && selectedProgram;
      const res = await fetch(isEdit ? `${apiBaseUrl}/programs/${selectedProgram.id}` : `${apiBaseUrl}/programs`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal menyimpan program');
      toast.success('Program berhasil disimpan');
      setShowModal(false);
      await loadPrograms();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menyimpan program');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async (id: number) => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/programs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal menghapus program');
      toast.success('Program berhasil dihapus');
      setShowDeleteConfirm(null);
      await loadPrograms();
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menghapus program');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch(`${apiBaseUrl}/programs/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal upload gambar');
      const url = String(json?.data?.url || '').trim();
      if (!url) throw new Error('Upload berhasil tapi URL kosong');
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast.success('Gambar berhasil diupload');
    } catch (e: any) {
      toast.error(e?.message || 'Gagal upload gambar');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Sidebar menuItems={menuItems} accentColor={accentColor} userRole={userRoleLabel} userName={getStoredUserName()} />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Program</h1>
              <p className="text-gray-600">CRUD Program untuk portal admin (terkunci per unit jika di subdomain).</p>
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="px-4 py-2 rounded-xl bg-[#1E4AB8] hover:bg-[#163b93] text-white flex items-center gap-2 disabled:opacity-60"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Tambah Program
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cari</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul/deskripsi..."
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                >
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                >
                  <option value="Semua">Semua</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Nonaktif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={filterUnitCode}
                  onChange={(e) => setFilterUnitCode(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                  disabled={Boolean(lockedUnitCode)}
                >
                  {lockedUnitCode ? (
                    <option value={lockedUnitCode}>{lockedUnitCode}</option>
                  ) : (
                    unitOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Daftar Program</span>
              </div>
              {isLoading ? <span className="text-sm text-gray-500">Memuat...</span> : null}
            </div>

            <div className="divide-y divide-gray-100">
              {programList.length === 0 ? (
                <div className="p-8 text-center text-gray-600">Belum ada program.</div>
              ) : (
                programList.map((p) => (
                  <div key={p.id} className="p-6 flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{p.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {p.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          {p.category || '-'}
                        </span>
                        <span>Unit: {p.unit_code || 'Semua'}</span>
                        <span className="text-gray-400">Slug: {p.slug}</span>
                      </div>
                      {p.description ? <p className="text-sm text-gray-600 mt-3">{p.description}</p> : null}
                      {p.image_url ? (
                        <a className="text-sm text-[#1E4AB8] hover:underline mt-2 inline-block" href={p.image_url} target="_blank">
                          Lihat gambar
                        </a>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(p.id)}
                        className="px-3 py-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-700 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-strong w-full max-w-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">{modalMode === 'create' ? 'Tambah Program' : 'Edit Program'}</h2>
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                      placeholder="Judul program"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug (opsional)</label>
                    <input
                      value={formData.slug}
                      onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                      placeholder="contoh: tahfidz-quran"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <input
                      value={formData.category}
                      onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                      placeholder="mis. Akademik"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={lockedUnitCode || formData.unit_code}
                      onChange={(e) => setFormData((p) => ({ ...p, unit_code: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                      disabled={Boolean(lockedUnitCode)}
                    >
                      {lockedUnitCode ? (
                        <option value={lockedUnitCode}>{lockedUnitCode}</option>
                      ) : (
                        unitOptions.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as ProgramStatus }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Nonaktif</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon (opsional)</label>
                    <input
                      value={formData.icon}
                      onChange={(e) => setFormData((p) => ({ ...p, icon: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                      placeholder="mis. BookOpen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <div className="flex gap-2">
                      <input
                        value={formData.image_url}
                        onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                        placeholder="/uploads/programs/..."
                      />
                      <label
                        className={`px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-2 cursor-pointer ${
                          isUploading ? 'opacity-60' : ''
                        }`}
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isUploading}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) uploadImage(f);
                            e.currentTarget.value = '';
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    className="w-full min-h-[140px] border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                    placeholder="Deskripsi program"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                  disabled={isLoading}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={saveProgram}
                  className="px-4 py-2 rounded-xl bg-[#1E4AB8] hover:bg-[#163b93] text-white flex items-center gap-2 disabled:opacity-60"
                  disabled={isLoading}
                >
                  <Check className="w-4 h-4" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirm != null && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-strong w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus program?</h3>
              <p className="text-gray-600 mb-6">Tindakan ini tidak bisa dibatalkan.</p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                  disabled={isLoading}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(showDeleteConfirm)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white disabled:opacity-60"
                  disabled={isLoading}
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
