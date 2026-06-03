'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { FormInput } from '../../../components/common/FormInput';
import { FormSelect } from '../../../components/common/FormSelect';

type UnitSlug = 'smpit' | 'smait';

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, ' ').trim();

const buildAddress = (parts: Record<string, string>) => {
  const lines: string[] = [];
  const line1 = normalizeWhitespace(parts.alamat || '');
  if (line1) lines.push(line1);

  const rt = normalizeWhitespace(parts.rt || '');
  const rw = normalizeWhitespace(parts.rw || '');
  const desa = normalizeWhitespace(parts.desa || '');
  const kec = normalizeWhitespace(parts.kecamatan || '');
  const kab = normalizeWhitespace(parts.kab_kota || '');
  const prov = normalizeWhitespace(parts.provinsi || '');
  const kode = normalizeWhitespace(parts.kode_pos || '');

  const line2Parts: string[] = [];
  if (rt || rw) line2Parts.push(`RT/RW ${rt || '-'} / ${rw || '-'}`);
  if (desa) line2Parts.push(`Desa/Kel ${desa}`);
  if (kec) line2Parts.push(`Kec ${kec}`);
  if (kab) line2Parts.push(`Kab/Kota ${kab}`);
  if (prov) line2Parts.push(`Prov ${prov}`);
  if (kode) line2Parts.push(`Kode Pos ${kode}`);

  const line2 = normalizeWhitespace(line2Parts.join(', '));
  if (line2) lines.push(line2);

  return lines.join('\n');
};

const buildNotes = (form: Record<string, string>) => {
  const pairs: Array<[string, string]> = [
    ['NIS', form.nis],
    ['NISN', form.nisn],
    ['NIK', form.nik],
    ['No KK', form.no_kk],
    ['No Registrasi Akte', form.no_reg_akte],
    ['Anak ke', form.anak_ke],
    ['Dari bersaudara', form.dari_bersaudara],
    ['Status Anak', form.status_anak],
    ['Tinggi (cm)', form.tinggi_badan_cm],
    ['Berat (kg)', form.berat_badan_kg],
    ['Lingkar Kepala (cm)', form.lingkar_kepala_cm],
    ['Jarak (km)', form.jarak_km],
    ['Transportasi', form.transportasi],
    ['Waktu Tempuh', normalizeWhitespace([form.waktu_tempuh_jam && `${form.waktu_tempuh_jam} jam`, form.waktu_tempuh_menit && `${form.waktu_tempuh_menit} menit`].filter(Boolean).join(' '))],
    ['Berkebutuhan Khusus', form.berkebutuhan_khusus],
    ['Riwayat Penyakit', form.riwayat_penyakit],
    ['Penyakit Sedang', form.penyakit_sedang],
    ['Jenis Tinggal', form.jenis_tinggal],
    ['Golongan Darah', form.golongan_darah],
    ['Jurusan Diminati', form.jurusan_diminati],
    ['Riwayat Beasiswa', normalizeWhitespace([form.beasiswa_jenis, form.beasiswa_penyelenggara, form.beasiswa_tahun_mulai && `mulai ${form.beasiswa_tahun_mulai}`, form.beasiswa_tahun_selesai && `selesai ${form.beasiswa_tahun_selesai}`].filter(Boolean).join(' | '))],
    ['Prestasi', normalizeWhitespace([form.prestasi_tahun && `tahun ${form.prestasi_tahun}`, form.prestasi_lomba, form.prestasi_juara && `juara ${form.prestasi_juara}`, form.prestasi_jenis, form.prestasi_tingkat, form.hafalan && `hafalan ${form.hafalan}`].filter(Boolean).join(' | '))],
    ['Ukuran Seragam', form.ukuran_seragam],
    ['KPS', normalizeWhitespace([form.penerima_kps, form.no_kps && `No KPS ${form.no_kps}`].filter(Boolean).join(' | '))],
    ['Ayah', normalizeWhitespace([form.nama_ayah, form.pekerjaan_ayah, form.jabatan_ayah, form.pendidikan_ayah, form.penghasilan_ayah, form.no_hp_ayah].filter(Boolean).join(' | '))],
    ['Ibu', normalizeWhitespace([form.nama_ibu, form.pekerjaan_ibu, form.jabatan_ibu, form.pendidikan_ibu, form.penghasilan_ibu, form.no_hp_ibu].filter(Boolean).join(' | '))],
    ['Wali', normalizeWhitespace([form.nama_wali, form.pekerjaan_wali, form.pendidikan_wali, form.no_hp_wali].filter(Boolean).join(' | '))],
  ];

  return pairs
    .map(([k, v]) => [k, normalizeWhitespace(String(v || ''))] as const)
    .filter(([, v]) => Boolean(v))
    .map(([k, v]) => `${k}: ${v}`)
    .join(' | ');
};

export default function UnitPpdbPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slugRaw } = React.use(params);
  const slug = String(slugRaw || '').toLowerCase();
  const config = getUnitConfig(slug);

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noPendaftaran, setNoPendaftaran] = useState<string | null>(null);

  const isAsrama = slug === 'asrama';
  const staffMenuLabel = isAsrama ? 'Musyrif & Musyrifah' : 'Guru & Staff';
  const curriculumMenuLabel = isAsrama ? 'Program' : 'Kurikulum';

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => router.push(`/${slug}`) },
    { label: 'Profil', href: '#', onClick: () => router.push(`/${slug}/profil`) },
    { label: curriculumMenuLabel, href: '#', onClick: () => router.push(`/${slug}/kurikulum`) },
    { label: staffMenuLabel, href: '#', onClick: () => router.push(`/${slug}/guru-staff`) },
    {
      label: 'Info',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => router.push(`/${slug}/berita`) },
        { label: 'Galeri', href: '#', onClick: () => router.push(`/${slug}/galeri`) },
      ],
    },
    { label: 'PPDB', href: '#', onClick: () => router.push(`/${slug}/ppdb`) },
    { label: 'Kontak', href: '#', onClick: () => router.push(`/${slug}/kontak`) }
  ];

  const unitCode = useMemo(() => {
    const map: Record<string, string> = { smpit: 'SMPIT', smait: 'SMAIT' };
    return map[slug] || '';
  }, [slug]);

  const unitMeta = useMemo(() => {
    if (slug === 'smpit') {
      return {
        title: 'FORMULIR PENDAFTARAN PESERTA DIDIK',
        headerLines: [
          'YAYASAN BAITUL JANNAH',
          'SEKOLAH MENENGAH PERTAMA ISLAM TERPADU (SMP IT – BAITUL JANNAH)',
          'Jl. Pramuka No.43 Kemiling Raya Bandar Lampung',
          'Telp : 0721 – 8050145',
          'Kode Pos : 35153',
        ],
      };
    }
    if (slug === 'smait') {
      return {
        title: 'FORMULIR PENDAFTARAN PESERTA DIDIK BARU',
        headerLines: [
          'YAYASAN BAITUL JANNAH',
          'SEKOLAH MENENGAH ATAS ISLAM TERPADU BAITUL JANNAH',
          '(SMA IT BAITUL JANNAH)',
          'Jln. Pramuka No. 43 Kemiling Raya, Kota Bandar Lampung',
          'Kode Pos 35158',
        ],
      };
    }
    return null;
  }, [slug]);

  const [form, setForm] = useState<Record<string, string>>({
    no_formulir: '',

    nama_lengkap: '',
    jenis_kelamin: '',
    nis: '',
    nisn: '',
    nik: '',
    no_kk: '',
    no_reg_akte: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: 'Islam',
    anak_ke: '',
    dari_bersaudara: '',
    status_anak: '',
    alamat: '',
    rt: '',
    rw: '',
    desa: '',
    kecamatan: '',
    kab_kota: '',
    provinsi: '',
    kode_pos: '',
    diterima_kelas: '',
    diterima_tanggal: '',
    sekolah_asal_nama: '',
    sekolah_asal_alamat: '',
    sekolah_asal_telp: '',
    tinggi_badan_cm: '',
    berat_badan_kg: '',
    lingkar_kepala_cm: '',
    jarak_km: '',
    transportasi: '',
    waktu_tempuh_jam: '',
    waktu_tempuh_menit: '',
    berkebutuhan_khusus: '',
    riwayat_penyakit: '',
    penyakit_sedang: '',
    email_pribadi: '',
    no_telp_orangtua: '',
    no_hp_siswa: '',
    jenis_tinggal: '',
    golongan_darah: '',
    jurusan_diminati: '',

    penerima_kps: '',
    no_kps: '',

    beasiswa_jenis: '',
    beasiswa_penyelenggara: '',
    beasiswa_tahun_mulai: '',
    beasiswa_tahun_selesai: '',

    prestasi_tahun: '',
    prestasi_lomba: '',
    prestasi_juara: '',
    prestasi_jenis: '',
    prestasi_tingkat: '',
    hafalan: '',

    ukuran_seragam: '',

    nama_ayah: '',
    tempat_tgl_lahir_ayah: '',
    nik_ayah: '',
    pekerjaan_ayah: '',
    jabatan_ayah: '',
    pendidikan_ayah: '',
    penghasilan_ayah: '',
    no_hp_ayah: '',
    berkebutuhan_khusus_ayah: '',

    nama_ibu: '',
    tempat_tgl_lahir_ibu: '',
    nik_ibu: '',
    pekerjaan_ibu: '',
    jabatan_ibu: '',
    pendidikan_ibu: '',
    penghasilan_ibu: '',
    no_hp_ibu: '',
    berkebutuhan_khusus_ibu: '',

    nama_wali: '',
    tempat_tgl_lahir_wali: '',
    nik_wali: '',
    pekerjaan_wali: '',
    pendidikan_wali: '',
    penghasilan_wali: '',
    no_hp_wali: '',
    berkebutuhan_khusus_wali: '',
    alamat_wali: '',
    dusun_wali: '',
    desa_wali: '',
    kecamatan_wali: '',
    kab_kota_wali: '',
    provinsi_wali: '',
    kode_pos_wali: '',
  });

  const setField = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const isSupported = unitCode === 'SMPIT' || unitCode === 'SMAIT';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupported) return;
    if (!form.nama_lengkap.trim()) return toast.error('Nama lengkap wajib diisi.');
    if (!['L', 'P'].includes(form.jenis_kelamin)) return toast.error('Pilih jenis kelamin.');
    if (!form.tanggal_lahir) return toast.error('Tanggal lahir wajib diisi.');
    if (!form.no_telp_orangtua.trim()) return toast.error('No. Telp/HP orang tua wajib diisi.');
    if (!form.email_pribadi.trim()) return toast.error('Email wajib diisi.');
    if (!form.alamat.trim()) return toast.error('Alamat wajib diisi.');
    if (!form.nama_ayah.trim()) return toast.error('Nama ayah wajib diisi.');
    if (!form.nama_ibu.trim()) return toast.error('Nama ibu wajib diisi.');

    setIsSubmitting(true);
    setNoPendaftaran(null);
    try {
      const payload = {
        nama_lengkap: form.nama_lengkap.trim(),
        jenjang: unitCode,
        jenis_kelamin: form.jenis_kelamin as 'L' | 'P',
        tempat_lahir: form.tempat_lahir.trim() || null,
        tanggal_lahir: form.tanggal_lahir,
        nik: form.nik.trim() || null,
        nisn: form.nisn.trim() || null,
        agama: form.agama.trim() || 'Islam',
        alamat: buildAddress(form) || form.alamat.trim(),
        kota: form.kab_kota.trim() || null,
        provinsi: form.provinsi.trim() || null,
        kode_pos: form.kode_pos.trim() || null,
        nama_ayah: form.nama_ayah.trim(),
        pekerjaan_ayah: form.pekerjaan_ayah.trim() || null,
        no_hp_ayah: form.no_hp_ayah.trim() || null,
        nama_ibu: form.nama_ibu.trim(),
        pekerjaan_ibu: form.pekerjaan_ibu.trim() || null,
        no_hp_ibu: form.no_hp_ibu.trim() || null,
        no_telp: form.no_telp_orangtua.trim(),
        email: form.email_pribadi.trim(),
        asal_sekolah: form.sekolah_asal_nama.trim() || null,
        prestasi: normalizeWhitespace([form.prestasi_lomba, form.prestasi_juara && `Juara ${form.prestasi_juara}`, form.prestasi_tingkat].filter(Boolean).join(' | ')) || null,
        informasi_dari: buildNotes(form) || null,
        form_data: form,
      };

      const res = await fetch(`${apiBaseUrl}/ppdb/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        toast.error(json?.message || 'Gagal mengirim pendaftaran.');
        return;
      }

      const no = json?.data?.no_pendaftaran || json?.data?.registration?.no_pendaftaran || null;
      setNoPendaftaran(no);
      toast.success(no ? `Pendaftaran berhasil. No. pendaftaran: ${no}` : 'Pendaftaran berhasil.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error('Gagal terhubung ke server pendaftaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!config) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Navbar logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} menuItems={menuItems} />

      <div className="container-custom px-4 md:px-8 py-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-4" style={{ backgroundColor: `${config.accentColor}20`, color: config.accentColor }}>
              PPDB {unitCode || config.unitName}
            </div>
            <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">Formulir Pendaftaran</h1>
            <p className="text-gray-600 max-w-2xl">
              Isi data dengan lengkap dan benar. Setelah dikirim, nomor pendaftaran akan muncul di sini.
            </p>
            {noPendaftaran ? (
              <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl">
                <span>No. Pendaftaran:</span>
                <span className="font-semibold">{noPendaftaran}</span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Cetak
            </button>
            <button
              type="button"
              onClick={() => router.push(`/${slug}`)}
              className="px-4 py-2 rounded-xl text-white transition-colors"
              style={{ backgroundColor: config.accentColor }}
            >
              Kembali
            </button>
          </div>
        </div>

        {!isSupported ? (
          <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-gray-900 mb-2">Formulir belum tersedia</h3>
            <p className="text-gray-600">Saat ini formulir registrasi khusus tersedia untuk SMPIT dan SMAIT.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-center">
                {unitMeta?.headerLines?.map((l) => (
                  <div key={l} className="text-sm text-gray-700">{l}</div>
                ))}
                <div className="mt-4 text-lg text-gray-900">{unitMeta?.title}</div>
                <div className="mt-2 text-sm text-gray-600">
                  No. Pendaftaran: <span className="font-medium">{noPendaftaran || '—'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">A. Identitas Peserta Didik</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormInput label="Nama Lengkap Peserta Didik" required value={form.nama_lengkap} onChange={(e) => setField('nama_lengkap', e.target.value)} />
                <FormSelect
                  label="Jenis Kelamin"
                  required
                  value={form.jenis_kelamin}
                  onChange={(e) => setField('jenis_kelamin', e.target.value)}
                  options={[
                    { value: 'L', label: 'Laki-laki' },
                    { value: 'P', label: 'Perempuan' },
                  ]}
                />
                <FormInput label={unitCode === 'SMAIT' ? 'NIS' : 'Nomor Induk Siswa'} value={form.nis} onChange={(e) => setField('nis', e.target.value)} />
                <FormInput label={unitCode === 'SMAIT' ? 'NISN' : 'Nomor Induk Siswa Nasional'} value={form.nisn} onChange={(e) => setField('nisn', e.target.value)} />
                <FormInput label="NIK" value={form.nik} onChange={(e) => setField('nik', e.target.value)} />
                {unitCode === 'SMAIT' ? (
                  <>
                    <FormInput label="No. KK" value={form.no_kk} onChange={(e) => setField('no_kk', e.target.value)} />
                    <FormInput label="No. Registrasi Akte Kelahiran" value={form.no_reg_akte} onChange={(e) => setField('no_reg_akte', e.target.value)} />
                  </>
                ) : null}
                <FormInput label="Tempat Lahir" value={form.tempat_lahir} onChange={(e) => setField('tempat_lahir', e.target.value)} />
                <FormInput label="Tanggal Lahir" type="date" required value={form.tanggal_lahir} onChange={(e) => setField('tanggal_lahir', e.target.value)} />
                <FormInput label="Agama" disabled value="Islam" />
                <FormInput label="Anak Ke" value={form.anak_ke} onChange={(e) => setField('anak_ke', e.target.value)} />
                <FormInput label="Dari ... Bersaudara" value={form.dari_bersaudara} onChange={(e) => setField('dari_bersaudara', e.target.value)} />
                {unitCode === 'SMPIT' ? <FormInput label="Status Anak" value={form.status_anak} onChange={(e) => setField('status_anak', e.target.value)} /> : null}
                {unitCode === 'SMAIT' ? (
                  <FormSelect
                    label="Jurusan yang Diminati"
                    value={form.jurusan_diminati}
                    onChange={(e) => setField('jurusan_diminati', e.target.value)}
                    options={[
                      { value: 'IPA', label: 'IPA' },
                      { value: 'IPS', label: 'IPS' },
                    ]}
                  />
                ) : null}
              </div>

              <div className="mt-4">
                <label className="block text-sm mb-2 text-gray-700">
                  Alamat Peserta Didik <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={form.alamat}
                  onChange={(e) => setField('alamat', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all min-h-[96px]"
                  placeholder="Alamat lengkap"
                />
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <FormInput label="RT" value={form.rt} onChange={(e) => setField('rt', e.target.value)} />
                  <FormInput label="RW" value={form.rw} onChange={(e) => setField('rw', e.target.value)} />
                  <FormInput label="Desa/Kel" value={form.desa} onChange={(e) => setField('desa', e.target.value)} />
                  <FormInput label="Kecamatan" value={form.kecamatan} onChange={(e) => setField('kecamatan', e.target.value)} />
                  <FormInput label="Kab/Kota" value={form.kab_kota} onChange={(e) => setField('kab_kota', e.target.value)} />
                  <FormInput label="Provinsi" value={form.provinsi} onChange={(e) => setField('provinsi', e.target.value)} />
                  <FormInput label="Kode Pos" value={form.kode_pos} onChange={(e) => setField('kode_pos', e.target.value)} />
                </div>
              </div>

              {unitCode === 'SMPIT' ? (
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <FormInput label="Diterima di Kelas" value={form.diterima_kelas} onChange={(e) => setField('diterima_kelas', e.target.value)} />
                  <FormInput label="Diterima Pada Tanggal" value={form.diterima_tanggal} onChange={(e) => setField('diterima_tanggal', e.target.value)} />
                </div>
              ) : null}

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <FormInput label="Tinggi Badan (cm)" value={form.tinggi_badan_cm} onChange={(e) => setField('tinggi_badan_cm', e.target.value)} />
                <FormInput label="Berat Badan (kg)" value={form.berat_badan_kg} onChange={(e) => setField('berat_badan_kg', e.target.value)} />
                {unitCode === 'SMAIT' ? <FormInput label="Lingkar Kepala (cm)" value={form.lingkar_kepala_cm} onChange={(e) => setField('lingkar_kepala_cm', e.target.value)} /> : null}
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <FormInput label="Jarak Tempat Tinggal ke Sekolah (Km)" value={form.jarak_km} onChange={(e) => setField('jarak_km', e.target.value)} />
                <FormInput label="Waktu Tempuh (Jam)" value={form.waktu_tempuh_jam} onChange={(e) => setField('waktu_tempuh_jam', e.target.value)} />
                <FormInput label="Waktu Tempuh (Menit)" value={form.waktu_tempuh_menit} onChange={(e) => setField('waktu_tempuh_menit', e.target.value)} />
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <FormSelect
                  label="Alat Transportasi ke Sekolah"
                  value={form.transportasi}
                  onChange={(e) => setField('transportasi', e.target.value)}
                  options={[
                    { value: 'Mobil Pribadi', label: 'Mobil Pribadi' },
                    { value: 'Motor', label: 'Motor' },
                    { value: 'Abudemen', label: 'Abudemen' },
                    { value: 'Kendaraan Umum', label: 'Kendaraan Umum' },
                    { value: 'Jalan Kaki', label: 'Jalan Kaki' },
                  ]}
                />
                <FormSelect
                  label="Jenis Tempat Tinggal"
                  value={form.jenis_tinggal}
                  onChange={(e) => setField('jenis_tinggal', e.target.value)}
                  options={[
                    { value: 'Bersama Orang Tua', label: 'Bersama Orang Tua' },
                    { value: 'Panti Asuhan', label: 'Panti Asuhan' },
                    { value: 'Asrama', label: 'Asrama' },
                    { value: 'Kost', label: 'Kost' },
                    { value: 'Lain-Lain', label: 'Lain-Lain' },
                  ]}
                />
              </div>

              {unitCode === 'SMAIT' ? (
                <div className="mt-4 grid md:grid-cols-3 gap-4">
                  <FormSelect
                    label="Golongan Darah"
                    value={form.golongan_darah}
                    onChange={(e) => setField('golongan_darah', e.target.value)}
                    options={[
                      { value: 'A', label: 'A' },
                      { value: 'B', label: 'B' },
                      { value: 'AB', label: 'AB' },
                      { value: 'O', label: 'O' },
                    ]}
                  />
                  <FormSelect
                    label="Penerima KPS"
                    value={form.penerima_kps}
                    onChange={(e) => setField('penerima_kps', e.target.value)}
                    options={[
                      { value: 'Ya', label: 'Ya' },
                      { value: 'Tidak', label: 'Tidak' },
                    ]}
                  />
                  <FormInput label="No. KPS" value={form.no_kps} onChange={(e) => setField('no_kps', e.target.value)} />
                </div>
              ) : null}

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <FormInput label="Berkebutuhan Khusus" value={form.berkebutuhan_khusus} onChange={(e) => setField('berkebutuhan_khusus', e.target.value)} />
                <FormInput label="Riwayat Penyakit" value={form.riwayat_penyakit} onChange={(e) => setField('riwayat_penyakit', e.target.value)} />
                {unitCode === 'SMAIT' ? <FormInput label="Penyakit yang Sedang Diderita" value={form.penyakit_sedang} onChange={(e) => setField('penyakit_sedang', e.target.value)} /> : null}
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <FormInput label={unitCode === 'SMAIT' ? 'Email Pribadi Siswa' : 'Email Pribadi'} required value={form.email_pribadi} onChange={(e) => setField('email_pribadi', e.target.value)} />
                <FormInput label={unitCode === 'SMAIT' ? 'No. HP Siswa' : 'No. Telp / Hp Orang Tua'} value={unitCode === 'SMAIT' ? form.no_hp_siswa : form.no_telp_orangtua} onChange={(e) => setField(unitCode === 'SMAIT' ? 'no_hp_siswa' : 'no_telp_orangtua', e.target.value)} />
              </div>
              {unitCode === 'SMAIT' ? (
                <div className="mt-4">
                  <FormInput label="No. Telp / HP Orang Tua / Wali" required value={form.no_telp_orangtua} onChange={(e) => setField('no_telp_orangtua', e.target.value)} />
                </div>
              ) : null}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">Sekolah Asal</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormInput label="Nama Sekolah" value={form.sekolah_asal_nama} onChange={(e) => setField('sekolah_asal_nama', e.target.value)} />
                <FormInput label="Telepon Sekolah" value={form.sekolah_asal_telp} onChange={(e) => setField('sekolah_asal_telp', e.target.value)} />
              </div>
              <div className="mt-4">
                <label className="block text-sm mb-2 text-gray-700">Alamat Sekolah</label>
                <textarea
                  value={form.sekolah_asal_alamat}
                  onChange={(e) => setField('sekolah_asal_alamat', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all min-h-[88px]"
                  placeholder="Alamat sekolah asal"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">{unitCode === 'SMAIT' ? 'Riwayat Beasiswa & Prestasi' : 'C. Lain-Lain'}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelect
                  label="Ukuran Seragam"
                  value={form.ukuran_seragam}
                  onChange={(e) => setField('ukuran_seragam', e.target.value)}
                  options={[
                    { value: 'S', label: 'S' },
                    { value: 'M', label: 'M' },
                    { value: 'L', label: 'L' },
                    { value: 'XL', label: 'XL' },
                    { value: 'XXL', label: 'XXL' },
                  ]}
                />
                <FormSelect
                  label="Jenis Beasiswa"
                  value={form.beasiswa_jenis}
                  onChange={(e) => setField('beasiswa_jenis', e.target.value)}
                  options={[
                    { value: 'Prestasi', label: 'Prestasi' },
                    { value: 'Pendidikan', label: 'Pendidikan' },
                    { value: 'Unggulan', label: 'Unggulan' },
                    { value: 'Bantuan Siswa Miskin', label: 'Bantuan Siswa Miskin' },
                    { value: 'Lainnya', label: 'Lainnya' },
                  ]}
                />
                <FormInput label="Penyelenggara Beasiswa" value={form.beasiswa_penyelenggara} onChange={(e) => setField('beasiswa_penyelenggara', e.target.value)} />
                <FormInput label="Tahun Mulai" value={form.beasiswa_tahun_mulai} onChange={(e) => setField('beasiswa_tahun_mulai', e.target.value)} />
                <FormInput label="Tahun Selesai" value={form.beasiswa_tahun_selesai} onChange={(e) => setField('beasiswa_tahun_selesai', e.target.value)} />
              </div>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <FormInput label="Tahun Prestasi" value={form.prestasi_tahun} onChange={(e) => setField('prestasi_tahun', e.target.value)} />
                <FormInput label="Lomba" value={form.prestasi_lomba} onChange={(e) => setField('prestasi_lomba', e.target.value)} />
                <FormInput label="Juara Ke" value={form.prestasi_juara} onChange={(e) => setField('prestasi_juara', e.target.value)} />
                <FormSelect
                  label="Jenis"
                  value={form.prestasi_jenis}
                  onChange={(e) => setField('prestasi_jenis', e.target.value)}
                  options={[
                    { value: 'Olah raga', label: 'Olah raga' },
                    { value: 'Sains', label: 'Sains' },
                    { value: 'Lainnya', label: 'Lainnya' },
                  ]}
                />
                <FormSelect
                  label="Tingkat"
                  value={form.prestasi_tingkat}
                  onChange={(e) => setField('prestasi_tingkat', e.target.value)}
                  options={[
                    { value: 'Sekolah', label: 'Sekolah' },
                    { value: 'Kecamatan', label: 'Kecamatan' },
                    { value: 'Kab/Kota', label: 'Kab/Kota' },
                    { value: 'Provinsi', label: 'Provinsi' },
                    { value: 'Nasional', label: 'Nasional' },
                    { value: 'Internasional', label: 'Internasional' },
                  ]}
                />
                {unitCode === 'SMAIT' ? <FormInput label="Hafalan Al-Qur'an" value={form.hafalan} onChange={(e) => setField('hafalan', e.target.value)} /> : null}
              </div>
              {unitCode === 'SMPIT' ? (
                <div className="mt-4 text-xs text-gray-600">
                  Catatan: Penulisan menggunakan huruf kapital. Seluruh poin A, B, dan C wajib diisi dengan jelas dan benar.
                </div>
              ) : null}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4">B. Identitas Orang Tua / Wali</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <div className="text-gray-900 mb-4">Identitas Ayah</div>
                  <FormInput label="Nama Ayah Kandung" required value={form.nama_ayah} onChange={(e) => setField('nama_ayah', e.target.value)} />
                  <FormInput label="Tempat / Tanggal Lahir" value={form.tempat_tgl_lahir_ayah} onChange={(e) => setField('tempat_tgl_lahir_ayah', e.target.value)} />
                  {unitCode === 'SMAIT' ? <FormInput label="NIK" value={form.nik_ayah} onChange={(e) => setField('nik_ayah', e.target.value)} /> : null}
                  <FormInput label="Pekerjaan" value={form.pekerjaan_ayah} onChange={(e) => setField('pekerjaan_ayah', e.target.value)} />
                  {unitCode === 'SMPIT' ? (
                    <>
                      <FormInput label="Jabatan" value={form.jabatan_ayah} onChange={(e) => setField('jabatan_ayah', e.target.value)} />
                      <FormInput label="Pendidikan" value={form.pendidikan_ayah} onChange={(e) => setField('pendidikan_ayah', e.target.value)} />
                      <FormInput label="Penghasilan Bulanan" value={form.penghasilan_ayah} onChange={(e) => setField('penghasilan_ayah', e.target.value)} />
                      <FormInput label="No. Telp / HP" value={form.no_hp_ayah} onChange={(e) => setField('no_hp_ayah', e.target.value)} />
                    </>
                  ) : (
                    <>
                      <FormInput label="Pendidikan" value={form.pendidikan_ayah} onChange={(e) => setField('pendidikan_ayah', e.target.value)} />
                      <FormInput label="Penghasilan Bulanan" value={form.penghasilan_ayah} onChange={(e) => setField('penghasilan_ayah', e.target.value)} />
                      <FormInput label="No HP / Telp" value={form.no_hp_ayah} onChange={(e) => setField('no_hp_ayah', e.target.value)} />
                      <FormInput label="Berkebutuhan Khusus" value={form.berkebutuhan_khusus_ayah} onChange={(e) => setField('berkebutuhan_khusus_ayah', e.target.value)} />
                    </>
                  )}
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                  <div className="text-gray-900 mb-4">Identitas Ibu</div>
                  <FormInput label="Nama Ibu Kandung" required value={form.nama_ibu} onChange={(e) => setField('nama_ibu', e.target.value)} />
                  <FormInput label="Tempat / Tanggal Lahir" value={form.tempat_tgl_lahir_ibu} onChange={(e) => setField('tempat_tgl_lahir_ibu', e.target.value)} />
                  {unitCode === 'SMAIT' ? <FormInput label="NIK" value={form.nik_ibu} onChange={(e) => setField('nik_ibu', e.target.value)} /> : null}
                  <FormInput label="Pekerjaan" value={form.pekerjaan_ibu} onChange={(e) => setField('pekerjaan_ibu', e.target.value)} />
                  {unitCode === 'SMPIT' ? (
                    <>
                      <FormInput label="Jabatan" value={form.jabatan_ibu} onChange={(e) => setField('jabatan_ibu', e.target.value)} />
                      <FormInput label="Pendidikan" value={form.pendidikan_ibu} onChange={(e) => setField('pendidikan_ibu', e.target.value)} />
                      <FormInput label="Penghasilan Bulanan" value={form.penghasilan_ibu} onChange={(e) => setField('penghasilan_ibu', e.target.value)} />
                      <FormInput label="No. Telp / HP" value={form.no_hp_ibu} onChange={(e) => setField('no_hp_ibu', e.target.value)} />
                    </>
                  ) : (
                    <>
                      <FormInput label="Pendidikan" value={form.pendidikan_ibu} onChange={(e) => setField('pendidikan_ibu', e.target.value)} />
                      <FormInput label="Penghasilan Bulanan" value={form.penghasilan_ibu} onChange={(e) => setField('penghasilan_ibu', e.target.value)} />
                      <FormInput label="No HP / Telp" value={form.no_hp_ibu} onChange={(e) => setField('no_hp_ibu', e.target.value)} />
                      <FormInput label="Berkebutuhan Khusus" value={form.berkebutuhan_khusus_ibu} onChange={(e) => setField('berkebutuhan_khusus_ibu', e.target.value)} />
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <div className="text-gray-900 mb-4">Identitas Wali (Jika Ada)</div>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput label="Nama Wali" value={form.nama_wali} onChange={(e) => setField('nama_wali', e.target.value)} />
                  <FormInput label="Tempat / Tanggal Lahir" value={form.tempat_tgl_lahir_wali} onChange={(e) => setField('tempat_tgl_lahir_wali', e.target.value)} />
                  {unitCode === 'SMAIT' ? <FormInput label="NIK" value={form.nik_wali} onChange={(e) => setField('nik_wali', e.target.value)} /> : null}
                  <FormInput label="Pekerjaan" value={form.pekerjaan_wali} onChange={(e) => setField('pekerjaan_wali', e.target.value)} />
                  <FormInput label="Pendidikan" value={form.pendidikan_wali} onChange={(e) => setField('pendidikan_wali', e.target.value)} />
                  <FormInput label="Penghasilan Bulanan" value={form.penghasilan_wali} onChange={(e) => setField('penghasilan_wali', e.target.value)} />
                  <FormInput label="No. Telp / HP" value={form.no_hp_wali} onChange={(e) => setField('no_hp_wali', e.target.value)} />
                  <FormInput label="Berkebutuhan Khusus" value={form.berkebutuhan_khusus_wali} onChange={(e) => setField('berkebutuhan_khusus_wali', e.target.value)} />
                </div>
                <div className="mt-4">
                  <label className="block text-sm mb-2 text-gray-700">Alamat Wali</label>
                  <textarea
                    value={form.alamat_wali}
                    onChange={(e) => setField('alamat_wali', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all min-h-[88px]"
                    placeholder="Alamat wali"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <FormInput label="Dusun" value={form.dusun_wali} onChange={(e) => setField('dusun_wali', e.target.value)} />
                  <FormInput label="Desa" value={form.desa_wali} onChange={(e) => setField('desa_wali', e.target.value)} />
                  <FormInput label="Kecamatan" value={form.kecamatan_wali} onChange={(e) => setField('kecamatan_wali', e.target.value)} />
                  <FormInput label="Kab/Kota" value={form.kab_kota_wali} onChange={(e) => setField('kab_kota_wali', e.target.value)} />
                  <FormInput label="Provinsi" value={form.provinsi_wali} onChange={(e) => setField('provinsi_wali', e.target.value)} />
                  <FormInput label="Kode Pos" value={form.kode_pos_wali} onChange={(e) => setField('kode_pos_wali', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-white disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: config.accentColor }}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer siteName={config.fullName} accentColor={config.accentColor} onNavigate={() => {}} />
    </div>
  );
}
