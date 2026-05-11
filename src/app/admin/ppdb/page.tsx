'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Calendar, Users, CheckCircle, AlertCircle, Clock, Search, Eye, Download, Printer, User, Phone, MapPin, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';

type PpdbStatus = 'pending' | 'verified' | 'accepted' | 'rejected' | 'enrolled';

interface PPDBRegistration {
  id: number;
  no_pendaftaran: string;
  nama_lengkap: string;
  jenjang: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  jenis_kelamin: 'L' | 'P' | string;
  alamat: string;
  no_telp: string;
  email: string;
  nama_ayah: string;
  nama_ibu: string;
  status: PpdbStatus;
  created_at: string;
  notes: string;
  form_json?: string;
  gender?: 'L' | 'P';
}

export default function AdminPPDBPage() {
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

  const [selectedTab, setSelectedTab] = useState<PpdbStatus>('pending');
  const [searchQuery, setSearchQuery] = useState('');
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
  const [filterUnit, setFilterUnit] = useState(lockedUnitCode || 'Semua');

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

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrations, setRegistrations] = useState<PPDBRegistration[]>([]);
  const [statsData, setStatsData] = useState<{
    total: number;
    byStatus: Array<{ status: string; count: number }>;
    recentRegistrations: number;
  }>({ total: 0, byStatus: [], recentRegistrations: 0 });
  const [selected, setSelected] = useState<PPDBRegistration | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailNotes, setDetailNotes] = useState('');
  const [detailStatus, setDetailStatus] = useState<PpdbStatus>('pending');

  const normalizeStatus = useCallback((status: any): PpdbStatus => {
    const s = String(status || '').toLowerCase();
    if (s === 'verified') return 'verified';
    if (s === 'accepted') return 'accepted';
    if (s === 'rejected') return 'rejected';
    if (s === 'enrolled') return 'enrolled';
    return 'pending';
  }, []);

  const toUiRegistration = useCallback((row: any): PPDBRegistration => {
    return {
      id: Number(row?.id),
      no_pendaftaran: String(row?.no_pendaftaran || row?.registration_number || ''),
      nama_lengkap: String(row?.nama_lengkap || row?.full_name || ''),
      jenjang: String(row?.jenjang || ''),
      tanggal_lahir: String(row?.tanggal_lahir || row?.birth_date || '').split('T')[0],
      tempat_lahir: String(row?.tempat_lahir || row?.birth_place || ''),
      jenis_kelamin: String(row?.jenis_kelamin || row?.gender || ''),
      alamat: String(row?.alamat || row?.address || ''),
      no_telp: String(row?.no_telp || row?.phone || ''),
      email: String(row?.email || ''),
      nama_ayah: String(row?.nama_ayah || row?.father_name || ''),
      nama_ibu: String(row?.nama_ibu || row?.mother_name || ''),
      status: normalizeStatus(row?.status),
      created_at: String(row?.created_at || ''),
      notes: String(row?.notes || ''),
      form_json: row?.form_json == null ? undefined : String(row.form_json || ''),
    };
  }, [normalizeStatus]);

  const selectedFormPairs = useMemo(() => {
    if (!selected?.form_json) return [];
    try {
      const parsed = JSON.parse(selected.form_json);
      if (!parsed || typeof parsed !== 'object') return [];
      const entries: Array<[string, string]> = [];
      for (const [k, v] of Object.entries(parsed)) {
        const val = String(v == null ? '' : v).trim();
        if (!val) continue;
        entries.push([k, val]);
      }
      return entries;
    } catch {
      return [];
    }
  }, [selected?.form_json]);

  const labelForKey = useCallback((key: string) => {
    const map: Record<string, string> = {
      no_formulir: 'No. Formulir',
      nama_lengkap: 'Nama Lengkap',
      jenis_kelamin: 'Jenis Kelamin',
      nis: 'NIS',
      nisn: 'NISN',
      nik: 'NIK',
      no_kk: 'No. KK',
      no_reg_akte: 'No. Registrasi Akte',
      tempat_lahir: 'Tempat Lahir',
      tanggal_lahir: 'Tanggal Lahir',
      agama: 'Agama',
      anak_ke: 'Anak Ke',
      dari_bersaudara: 'Dari ... Bersaudara',
      status_anak: 'Status Anak',
      alamat: 'Alamat',
      rt: 'RT',
      rw: 'RW',
      desa: 'Desa/Kel',
      kecamatan: 'Kecamatan',
      kab_kota: 'Kab/Kota',
      provinsi: 'Provinsi',
      kode_pos: 'Kode Pos',
      diterima_kelas: 'Diterima di Kelas',
      diterima_tanggal: 'Diterima Pada Tanggal',
      sekolah_asal_nama: 'Sekolah Asal',
      sekolah_asal_alamat: 'Alamat Sekolah Asal',
      sekolah_asal_telp: 'Telp Sekolah Asal',
      tinggi_badan_cm: 'Tinggi Badan (cm)',
      berat_badan_kg: 'Berat Badan (kg)',
      lingkar_kepala_cm: 'Lingkar Kepala (cm)',
      jarak_km: 'Jarak ke Sekolah (Km)',
      transportasi: 'Transportasi',
      waktu_tempuh_jam: 'Waktu Tempuh (Jam)',
      waktu_tempuh_menit: 'Waktu Tempuh (Menit)',
      berkebutuhan_khusus: 'Berkebutuhan Khusus',
      riwayat_penyakit: 'Riwayat Penyakit',
      penyakit_sedang: 'Penyakit Sedang',
      email_pribadi: 'Email Pribadi',
      no_telp_orangtua: 'No. Telp/HP Orang Tua',
      no_hp_siswa: 'No. HP Siswa',
      jenis_tinggal: 'Jenis Tinggal',
      golongan_darah: 'Golongan Darah',
      jurusan_diminati: 'Jurusan Diminati',
      penerima_kps: 'Penerima KPS',
      no_kps: 'No. KPS',
      beasiswa_jenis: 'Beasiswa (Jenis)',
      beasiswa_penyelenggara: 'Beasiswa (Penyelenggara)',
      beasiswa_tahun_mulai: 'Beasiswa (Tahun Mulai)',
      beasiswa_tahun_selesai: 'Beasiswa (Tahun Selesai)',
      prestasi_tahun: 'Prestasi (Tahun)',
      prestasi_lomba: 'Prestasi (Lomba)',
      prestasi_juara: 'Prestasi (Juara)',
      prestasi_jenis: 'Prestasi (Jenis)',
      prestasi_tingkat: 'Prestasi (Tingkat)',
      hafalan: 'Hafalan',
      ukuran_seragam: 'Ukuran Seragam',
      nama_ayah: 'Nama Ayah',
      tempat_tgl_lahir_ayah: 'Tempat/Tgl Lahir Ayah',
      nik_ayah: 'NIK Ayah',
      pekerjaan_ayah: 'Pekerjaan Ayah',
      jabatan_ayah: 'Jabatan Ayah',
      pendidikan_ayah: 'Pendidikan Ayah',
      penghasilan_ayah: 'Penghasilan Ayah',
      no_hp_ayah: 'No. HP Ayah',
      berkebutuhan_khusus_ayah: 'Berkebutuhan Khusus Ayah',
      nama_ibu: 'Nama Ibu',
      tempat_tgl_lahir_ibu: 'Tempat/Tgl Lahir Ibu',
      nik_ibu: 'NIK Ibu',
      pekerjaan_ibu: 'Pekerjaan Ibu',
      jabatan_ibu: 'Jabatan Ibu',
      pendidikan_ibu: 'Pendidikan Ibu',
      penghasilan_ibu: 'Penghasilan Ibu',
      no_hp_ibu: 'No. HP Ibu',
      berkebutuhan_khusus_ibu: 'Berkebutuhan Khusus Ibu',
      nama_wali: 'Nama Wali',
      tempat_tgl_lahir_wali: 'Tempat/Tgl Lahir Wali',
      nik_wali: 'NIK Wali',
      pekerjaan_wali: 'Pekerjaan Wali',
      pendidikan_wali: 'Pendidikan Wali',
      penghasilan_wali: 'Penghasilan Wali',
      no_hp_wali: 'No. HP Wali',
      berkebutuhan_khusus_wali: 'Berkebutuhan Khusus Wali',
      alamat_wali: 'Alamat Wali',
      dusun_wali: 'Dusun Wali',
      desa_wali: 'Desa/Kel Wali',
      kecamatan_wali: 'Kecamatan Wali',
      kab_kota_wali: 'Kab/Kota Wali',
      provinsi_wali: 'Provinsi Wali',
      kode_pos_wali: 'Kode Pos Wali',
    };
    return map[key] || key.replace(/_/g, ' ');
  }, []);

  const loadStatistics = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const params = new URLSearchParams();
      if (lockedUnitCode) params.set('jenjang', lockedUnitCode);
      const qs = params.toString();
      const res = await fetch(`${apiBaseUrl}/ppdb/statistics${qs ? `?${qs}` : ''}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat statistik PPDB');
      const data = json?.data || {};
      setStatsData({
        total: Number(data?.total || 0),
        byStatus: Array.isArray(data?.byStatus) ? data.byStatus : [],
        recentRegistrations: Number(data?.recentRegistrations || 0),
      });
    } catch (e: any) {
      toast.error(e?.message || 'Gagal memuat statistik PPDB');
    }
  }, [apiBaseUrl, getToken, lockedUnitCode]);

  const loadRegistrations = useCallback(
    async (opts?: { status?: PpdbStatus; search?: string; unit?: string }) => {
      const token = getToken();
      if (!token) return;
      setIsLoading(true);
      try {
        const status = opts?.status ?? 'pending';
        const search = opts?.search ?? '';
        const unit = opts?.unit ?? 'Semua';

        const params = new URLSearchParams();
        params.set('limit', '200');
        params.set('page', '1');
        params.set('status', status);
        if (search && search.trim()) params.set('search', search.trim());
        if (lockedUnitCode) params.set('jenjang', lockedUnitCode);
        else if (unit && unit !== 'Semua') params.set('jenjang', unit);

        const res = await fetch(`${apiBaseUrl}/ppdb/registrations?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat data pendaftaran');
        const rows = Array.isArray(json?.data) ? json.data : [];
        setRegistrations(rows.map(toUiRegistration));
      } catch (e: any) {
        toast.error(e?.message || 'Gagal memuat data pendaftaran');
        setRegistrations([]);
      } finally {
        setIsLoading(false);
      }
    },
    [apiBaseUrl, getToken, lockedUnitCode, toUiRegistration]
  );

  useEffect(() => {
    const token = getToken();
    const role = getCookie('role');
    if (!token || role !== 'admin') {
      try {
        localStorage.removeItem('baituljannah_token');
        localStorage.removeItem('baituljannah_user');
      } catch {}
      toast.error('Silakan login sebagai admin.');
      const hostname = window.location.hostname.toLowerCase();
      const isUnitSubdomain =
        hostname === 'smpitbaituljannah.sch.id' ||
        hostname === 'www.smpitbaituljannah.sch.id' ||
        hostname === 'smaitbaituljannah.sch.id' ||
        hostname === 'www.smaitbaituljannah.sch.id';
      const path = window.location.pathname || '';
      const unitMatch = path.match(/^\/(tkit|sdit|smpit|smait|slbit)\/admin(\/|$)/i);
      const loginPath = isUnitSubdomain ? '/login' : unitMatch?.[1] ? `/${unitMatch[1].toLowerCase()}/login` : '/login';
      router.replace(loginPath);
      return;
    }
    setIsAuthorized(true);
    loadStatistics();
  }, [getCookie, getToken, loadStatistics, router]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    const timer = setTimeout(() => {
      loadRegistrations({ status: selectedTab, search: searchQuery, unit: filterUnit });
    }, 300);
    return () => clearTimeout(timer);
  }, [filterUnit, getToken, loadRegistrations, searchQuery, selectedTab]);

  const countByStatus = useMemo(() => {
    const map = new Map<string, number>();
    for (const row of statsData.byStatus) {
      map.set(String(row?.status || '').toLowerCase(), Number(row?.count || 0));
    }
    return {
      pending: map.get('pending') || 0,
      verified: map.get('verified') || 0,
      accepted: map.get('accepted') || 0,
      rejected: map.get('rejected') || 0,
      enrolled: map.get('enrolled') || 0,
    };
  }, [statsData.byStatus]);

  const statCards = useMemo(() => {
    return [
      { label: 'Total Pendaftar', value: String(statsData.total), color: '#3B82F6', icon: Users, bg: 'bg-blue-50' },
      { label: '7 Hari Terakhir', value: String(statsData.recentRegistrations), color: '#F59E0B', icon: Clock, bg: 'bg-yellow-50' },
      { label: 'Diterima', value: String(countByStatus.accepted), color: '#10B981', icon: CheckCircle, bg: 'bg-green-50' },
      { label: 'Ditolak', value: String(countByStatus.rejected), color: '#EF4444', icon: AlertCircle, bg: 'bg-red-50' },
    ];
  }, [countByStatus.accepted, countByStatus.rejected, statsData.recentRegistrations, statsData.total]);

  const openDetail = (reg: PPDBRegistration) => {
    setSelected(reg);
    setDetailNotes(reg.notes || '');
    setDetailStatus(reg.status);
    setShowDetail(true);
  };

  const updateStatus = async (id: number, newStatus: PpdbStatus, catatan?: string) => {
    const token = getToken();
    if (!token) return toast.error('Token tidak ditemukan. Silakan login ulang.');
    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/ppdb/registrations/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, catatan: catatan || null }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal mengubah status');
      toast.success('Status pendaftaran berhasil diupdate');
      await Promise.all([
        loadRegistrations({ status: selectedTab, search: searchQuery, unit: filterUnit }),
        loadStatistics(),
      ]);
    } catch (e: any) {
      toast.error(e?.message || 'Gagal mengubah status');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Sidebar menuItems={menuItems} accentColor="#1E4AB8" userRole={userRoleLabel} userName={getStoredUserName()} />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Penerimaan Peserta Didik Baru (PPDB)</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola pendaftaran siswa baru Tahun Ajaran 2025/2026</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`} style={{ color: stat.color }}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
              {(['pending', 'verified', 'accepted', 'rejected', 'enrolled'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTab === tab 
                      ? 'bg-white text-[#1E4AB8] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'pending'
                    ? 'Pending'
                    : tab === 'verified'
                      ? 'Verifikasi'
                      : tab === 'accepted'
                        ? 'Diterima'
                        : tab === 'rejected'
                          ? 'Ditolak'
                          : 'Terdaftar'}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama siswa/ortu..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all bg-white"
                value={filterUnit}
                onChange={(e) => setFilterUnit(e.target.value)}
                disabled={Boolean(lockedUnitCode)}
              >
                {lockedUnitCode ? (
                  <option value={lockedUnitCode}>{lockedUnitCode}</option>
                ) : (
                  <>
                    <option value="Semua">Semua Unit</option>
                    <option value="TKIT">TKIT</option>
                    <option value="SDIT">SDIT</option>
                    <option value="SMPIT">SMPIT</option>
                    <option value="SMAIT">SMAIT</option>
                    <option value="SLBIT">SLBIT</option>
                  </>
                )}
              </select>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium">
                <Printer className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-medium">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {registrations.map((reg) => (
              <div key={reg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{reg.nama_lengkap}</h3>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium border border-blue-100">
                          {reg.jenjang}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {String(reg.jenis_kelamin).toUpperCase() === 'L' ? 'Laki-laki' : String(reg.jenis_kelamin).toUpperCase() === 'P' ? 'Perempuan' : '-'}
                        </span>
                        {reg.no_pendaftaran ? (
                          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                            {reg.no_pendaftaran}
                          </span>
                        ) : null}
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>Ortu: {reg.nama_ayah || reg.nama_ibu || '-'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{reg.no_telp || '-'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>Lahir: {reg.tanggal_lahir || '-'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="truncate max-w-[28rem]">{reg.alamat || '-'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:border-l lg:pl-6 border-gray-100">
                    <div className="text-sm text-gray-500">
                      <p>Tanggal Daftar</p>
                      <p className="font-medium text-gray-900">{String(reg.created_at || '').split('T')[0] || '-'}</p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {(reg.status === 'pending' || reg.status === 'verified') && (
                        <>
                          <button 
                            onClick={() => updateStatus(reg.id, 'accepted')}
                            className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
                            disabled={isLoading}
                          >
                            Terima
                          </button>
                          <button 
                            onClick={() => updateStatus(reg.id, 'rejected')}
                            className="flex-1 sm:flex-none px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors text-sm font-medium"
                            disabled={isLoading}
                          >
                            Tolak
                          </button>
                        </>
                      )}
                      
                      {!(reg.status === 'pending' || reg.status === 'verified') && (
                        <div className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                          reg.status === 'accepted' || reg.status === 'enrolled' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          {reg.status === 'accepted' || reg.status === 'enrolled' ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>{reg.status === 'enrolled' ? 'Terdaftar' : 'Diterima'}</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4" />
                              <span>Ditolak</span>
                            </>
                          )}
                        </div>
                      )}

                      <button
                        className="p-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                        title="Lihat Detail"
                        onClick={() => openDetail(reg)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!isLoading && registrations.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak ada data ditemukan</h3>
                <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {showDetail && selected ? (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-strong w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold">Detail Pendaftaran</h2>
                <p className="text-sm text-gray-500">{selected.no_pendaftaran || '-'}</p>
              </div>
              <button onClick={() => setShowDetail(false)} className="p-2 rounded-xl hover:bg-gray-50">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-500">Nama</div>
                  <div className="font-semibold text-gray-900">{selected.nama_lengkap}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-500">Jenjang</div>
                  <div className="font-semibold text-gray-900">{selected.jenjang || '-'}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-500">Tanggal Lahir</div>
                  <div className="font-semibold text-gray-900">{selected.tanggal_lahir || '-'}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-500">Kontak</div>
                  <div className="font-semibold text-gray-900">{selected.no_telp || '-'}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="text-sm text-gray-500 mb-1">Alamat</div>
                <div className="text-gray-900">{selected.alamat || '-'}</div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="text-sm text-gray-500 mb-3">Data Lengkap (Form)</div>
                {selectedFormPairs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedFormPairs.map(([k, v]) => (
                      <div key={k} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
                        <div className="text-xs text-gray-500 mb-1">{labelForKey(k)}</div>
                        <div className="text-sm text-gray-900 whitespace-pre-wrap break-words">{v}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    Data form lengkap belum tersedia. Pastikan database sudah punya kolom <span className="font-medium">form_json</span>.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={detailStatus}
                    onChange={(e) => setDetailStatus(e.target.value as PpdbStatus)}
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all bg-white"
                    disabled={isLoading}
                  >
                    <option value="pending">pending</option>
                    <option value="verified">verified</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                    <option value="enrolled">enrolled</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">Catatan (opsional)</label>
                  <input
                    value={detailNotes}
                    onChange={(e) => setDetailNotes(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                    placeholder="Catatan verifikasi/status"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-100">
              <button
                onClick={() => setShowDetail(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
                disabled={isLoading}
              >
                Tutup
              </button>
              <button
                onClick={async () => {
                  await updateStatus(selected.id, detailStatus, detailNotes);
                  setShowDetail(false);
                }}
                className="px-4 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors text-sm font-medium"
                disabled={isLoading}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
