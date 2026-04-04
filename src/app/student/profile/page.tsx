'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { KeyRound, Mail, Phone, User, Users } from 'lucide-react';

export default function StudentProfilePage() {
  const { menuItems } = useNavigationMenu('student');

  const studentData = {
    nis: '2024001',
    name: 'Muhammad Rizki Pratama',
    class: 'XII IPA 1',
    unit: 'SMAIT',
    email: 'rizki@student.baituljannah.sch.id',
    phone: '0812-3456-7890',
  };

  const [profile, setProfile] = React.useState({
    name: studentData.name,
    email: studentData.email,
    phone: studentData.phone,
  });

  const [preferences, setPreferences] = React.useState({
    announcements: true,
    assignments: true,
    exams: true,
    language: 'id',
  });

  const [passwordForm, setPasswordForm] = React.useState({
    current: '',
    next: '',
    confirm: '',
  });

  const [saved, setSaved] = React.useState(false);
  const [passwordResult, setPasswordResult] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const saveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const changePassword = () => {
    const nextTrimmed = passwordForm.next.trim();
    if (!passwordForm.current.trim()) {
      setPasswordResult({ type: 'error', message: 'Password lama wajib diisi.' });
      return;
    }
    if (nextTrimmed.length < 8) {
      setPasswordResult({ type: 'error', message: 'Password baru minimal 8 karakter.' });
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordResult({ type: 'error', message: 'Konfirmasi password tidak sama.' });
      return;
    }
    setPasswordResult({ type: 'success', message: 'Password berhasil diperbarui (simulasi).' });
    setPasswordForm({ current: '', next: '', confirm: '' });
    setTimeout(() => setPasswordResult(null), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        accentColor="#1E4AB8"
        userRole="Siswa"
        userName={studentData.name}
        panelTitle="Portal Siswa"
        panelSubtitle={`${studentData.unit} • ${studentData.class}`}
      />

      <main className="flex-1 p-6 md:p-8">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl p-8 mb-8 text-white shadow-strong">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl mb-2">Profil Siswa</h1>
                  <div className="flex flex-wrap items-center gap-3 text-white/90">
                    <span>NIS: {studentData.nis}</span>
                    <span>•</span>
                    <span>{studentData.class}</span>
                    <span>•</span>
                    <span>{studentData.unit}</span>
                  </div>
                </div>
              </div>
              <button onClick={saveProfile} className="px-6 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-colors">
                Simpan Perubahan
              </button>
            </div>
            {saved ? (
              <div className="mt-4 bg-white/15 border border-white/20 rounded-2xl px-4 py-3 text-sm">
                Perubahan tersimpan (simulasi).
              </div>
            ) : null}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl mb-6">Informasi Akun</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Nama Lengkap</label>
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">NIS</label>
                    <input
                      value={studentData.nis}
                      disabled
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                      value={profile.email}
                      onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Nomor HP</label>
                    <input
                      value={profile.phone}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Kelas</label>
                    <input
                      value={studentData.class}
                      disabled
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Unit</label>
                    <input
                      value={studentData.unit}
                      disabled
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl mb-6">Preferensi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifikasi Pengumuman</p>
                      <p className="text-sm text-gray-600">Update info penting dari sekolah</p>
                    </div>
                    <button
                      onClick={() => setPreferences((p) => ({ ...p, announcements: !p.announcements }))}
                      className={`w-12 h-7 rounded-full transition-colors ${preferences.announcements ? 'bg-[#1E4AB8]' : 'bg-gray-300'}`}
                    >
                      <span className={`block w-6 h-6 bg-white rounded-full transition-transform ${preferences.announcements ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifikasi Tugas</p>
                      <p className="text-sm text-gray-600">Pengingat deadline tugas</p>
                    </div>
                    <button
                      onClick={() => setPreferences((p) => ({ ...p, assignments: !p.assignments }))}
                      className={`w-12 h-7 rounded-full transition-colors ${preferences.assignments ? 'bg-[#1E4AB8]' : 'bg-gray-300'}`}
                    >
                      <span className={`block w-6 h-6 bg-white rounded-full transition-transform ${preferences.assignments ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifikasi Ujian</p>
                      <p className="text-sm text-gray-600">Pengingat jadwal ujian</p>
                    </div>
                    <button
                      onClick={() => setPreferences((p) => ({ ...p, exams: !p.exams }))}
                      className={`w-12 h-7 rounded-full transition-colors ${preferences.exams ? 'bg-[#1E4AB8]' : 'bg-gray-300'}`}
                    >
                      <span className={`block w-6 h-6 bg-white rounded-full transition-transform ${preferences.exams ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-200">
                    <p className="font-medium mb-2">Bahasa</p>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences((p) => ({ ...p, language: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    >
                      <option value="id">Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl mb-6 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#1E4AB8]" />
                  Keamanan
                </h2>
                {passwordResult ? (
                  <div className={`mb-4 px-4 py-3 rounded-2xl text-sm border ${
                    passwordResult.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {passwordResult.message}
                  </div>
                ) : null}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600">Password Lama</label>
                    <input
                      type="password"
                      value={passwordForm.current}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Password Baru</label>
                    <input
                      type="password"
                      value={passwordForm.next}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, next: e.target.value }))}
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      value={passwordForm.confirm}
                      onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button onClick={changePassword} className="btn-primary">
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  Ringkasan
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p>{studentData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Telepon</p>
                      <p>{studentData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg mb-4">Aksi Cepat</h2>
                <div className="space-y-3">
                  <button onClick={() => saveProfile()} className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                    Simpan Perubahan
                  </button>
                  <button className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                    Kelola Notifikasi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

