'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Toaster, toast } from 'sonner';
import { FileText, Save, RefreshCcw } from 'lucide-react';

type PageKey = 'home' | 'profil' | 'kurikulum' | 'guru-staff' | 'kontak';
type Status = 'published' | 'draft';

const unitOptions = ['TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT'];

const defaultContentByPageKey: Record<PageKey, any> = {
  home: {
    heroSlides: [
      { image: '', badge: '', title: '', description: '' },
      { image: '', badge: '', title: '', description: '' },
      { image: '', badge: '', title: '', description: '' },
      { image: '', badge: '', title: '', description: '' },
    ],
    about: {
      badge: '',
      title: '',
      description: '',
      features: [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
      ],
    },
    programs: {
      badge: '',
      title: '',
      description: '',
      items: [
        { title: '', description: '' },
        { title: '', description: '' },
        { title: '', description: '' },
      ],
    },
    curriculum: {
      badge: '',
      title: '',
      description: '',
      nationalTitle: '',
      islamicTitle: '',
      nationalPoints: [],
      islamicPoints: [],
    },
    facilities: {
      badge: '',
      title: '',
      description: '',
      items: [
        { title: '', description: '', image: '' },
        { title: '', description: '', image: '' },
        { title: '', description: '', image: '' },
        { title: '', description: '', image: '' },
      ],
    },
  },
  profil: {
    badge: '',
    headline: '',
    intro: '',
    vision: '',
    missions: [],
    strengths: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    routineTitle: '',
    routine: [{ time: '', title: '', desc: '' }],
    facilitiesTitle: '',
    facilities: [],
  },
  kurikulum: {
    badge: '',
    headline: '',
    intro: '',
    approachTitle: '',
    approaches: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    ageGroupsTitle: '',
    ageGroups: [{ title: '', subtitle: '', items: [] }],
    learningAreasTitle: '',
    learningAreas: [{ title: '', description: '' }],
    islamicTitle: '',
    islamicPoints: [],
    nationalTitle: '',
    nationalPoints: [],
    routineTitle: '',
    routine: [{ time: '', title: '', desc: '' }],
    assessmentTitle: '',
    assessmentPoints: [],
    extrasTitle: '',
    extras: [{ title: '', description: '' }],
  },
  'guru-staff': {
    leaders: [{ name: '', role: '', focus: '', image: '' }],
    teachers: [{ name: '', role: '', highlight: '' }],
    values: [{ title: '', desc: '' }],
  },
  kontak: {
    phone: '',
    email: '',
    whatsapp: '',
    addressLines: [],
    hours: [],
    visitTip: { title: '', desc: '' },
  },
};

const safeJsonParse = (value: string) => {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
};

export default function AdminCmsPage() {
  const router = useRouter();
  const { menuItems } = useNavigationMenu('admin');
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

  const [unitCode, setUnitCode] = useState<string>(lockedUnitCode || 'SMPIT');
  const [pageKey, setPageKey] = useState<PageKey>('profil');
  const [status, setStatus] = useState<Status>('published');
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(defaultContentByPageKey.profil, null, 2));
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (lockedUnitCode) setUnitCode(lockedUnitCode);
  }, [lockedUnitCode]);

  const loadContent = useCallback(async () => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('unit_code', unitCode);
      params.set('page_key', pageKey);
      const res = await fetch(`${apiBaseUrl}/unit-pages/manage?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat konten CMS');

      const row = Array.isArray(json?.data) ? json.data[0] : null;
      if (!row?.content) {
        setStatus('published');
        setJsonText(JSON.stringify(defaultContentByPageKey[pageKey], null, 2));
        return;
      }

      setStatus(String(row.status || 'published') === 'draft' ? 'draft' : 'published');
      setJsonText(JSON.stringify(row.content, null, 2));
    } catch (e: any) {
      setStatus('published');
      setJsonText(JSON.stringify(defaultContentByPageKey[pageKey], null, 2));
      toast.error(e?.message || 'Gagal memuat konten CMS');
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, getLoginPath, getToken, pageKey, router, unitCode]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const saveContent = useCallback(async () => {
    const token = getToken();
    if (!token) {
      toast.error('Token tidak ditemukan. Silakan login ulang.');
      router.replace(getLoginPath());
      return;
    }

    const parsed = safeJsonParse(jsonText);
    if (!parsed) {
      toast.error('JSON tidak valid. Perbaiki format JSON terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/unit-pages/${encodeURIComponent(pageKey)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ unit_code: unitCode, status, content: parsed }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal menyimpan konten CMS');
      toast.success('Konten berhasil disimpan');
    } catch (e: any) {
      toast.error(e?.message || 'Gagal menyimpan konten CMS');
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, getLoginPath, getToken, jsonText, pageKey, router, status, unitCode]);

  const resetToDefault = useCallback(() => {
    setJsonText(JSON.stringify(defaultContentByPageKey[pageKey], null, 2));
    setStatus('published');
  }, [pageKey]);

  const pageHref = useMemo(() => {
    const slug = unitCode.toLowerCase();
    const map: Record<PageKey, string> = {
      home: `/${slug}`,
      profil: `/${slug}/profil`,
      kurikulum: `/${slug}/kurikulum`,
      'guru-staff': `/${slug}/guru-staff`,
      kontak: `/${slug}/kontak`,
    };
    return map[pageKey];
  }, [pageKey, unitCode]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster position="top-right" richColors />
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" userRole={userRoleLabel} userName={getStoredUserName()} />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">CMS Halaman Unit</h1>
              <p className="text-gray-600">
                Atur konten halaman unit (Home, Profil, Kurikulum, Guru & Staff, Kontak). Konten ini akan tampil di halaman publik unit.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetToDefault}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                disabled={isLoading}
              >
                <RefreshCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={saveContent}
                className="px-4 py-2 rounded-xl bg-[#1E4AB8] hover:bg-[#163b93] text-white flex items-center gap-2 disabled:opacity-60"
                disabled={isLoading}
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={unitCode}
                  onChange={(e) => setUnitCode(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                  disabled={Boolean(lockedUnitCode) || isLoading}
                >
                  {unitOptions.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                {lockedUnitCode && <p className="mt-2 text-xs text-gray-500">Unit terkunci: {lockedUnitCode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Halaman</label>
                <select
                  value={pageKey}
                  onChange={(e) => setPageKey(e.target.value as PageKey)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                  disabled={isLoading}
                >
                  <option value="home">Home / Beranda Unit</option>
                  <option value="profil">Profil</option>
                  <option value="kurikulum">Kurikulum</option>
                  <option value="guru-staff">Guru & Staff</option>
                  <option value="kontak">Kontak</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#1E4AB8]"
                  disabled={isLoading}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => window.open(pageHref, '_blank')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Lihat Halaman
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Editor Konten (JSON)</h2>
                <p className="text-sm text-gray-500">Edit JSON. Simpan untuk menerapkan perubahan.</p>
              </div>
              {isLoading && <span className="text-sm text-gray-500">Memuat...</span>}
            </div>
            <div className="p-6">
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full min-h-[520px] font-mono text-sm border border-gray-200 rounded-xl p-4 outline-none focus:border-[#1E4AB8]"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
