'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { BookOpen, Mail, MapPin, Phone, Shield, User, Users } from 'lucide-react';

export default function TeacherProfilePage() {
  const { menuItems } = useNavigationMenu('teacher');

  const teacherData = {
    nip: 'GT-2020-001',
    name: 'Ustadz Ahmad Fauzi',
    subject: 'Matematika',
    unit: 'SMAIT',
    email: 'ahmad.fauzi@baituljannah.sch.id',
    phone: '0812-3456-7890',
    address: 'Jl. Pendidikan Islam No. 123, Jakarta Selatan',
    joinedAt: '2020-07-01',
    homeroomClass: 'XII IPA 1',
    classes: ['XII IPA 1', 'XII IPA 2', 'XI IPA 1'],
  };

  const [profile, setProfile] = React.useState({
    name: teacherData.name,
    email: teacherData.email,
    phone: teacherData.phone,
    address: teacherData.address,
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        accentColor="#1E4AB8"
        userRole="Guru"
        userName={teacherData.name}
        panelTitle="Portal Guru"
        panelSubtitle={`${teacherData.unit} • ${teacherData.subject}`}
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
                  <h1 className="text-3xl mb-2">Profil Guru</h1>
                  <div className="flex flex-wrap items-center gap-3 text-white/90">
                    <span>NIP: {teacherData.nip}</span>
                    <span>•</span>
                    <span>{teacherData.subject}</span>
                    <span>•</span>
                    <span>{teacherData.unit}</span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-[#1E4AB8] rounded-xl hover:bg-white/90 transition-colors">
                Simpan Perubahan
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl mb-6">Informasi Pribadi</h2>
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
                    <label className="text-sm text-gray-600">NIP</label>
                    <input
                      value={teacherData.nip}
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
                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-600">Alamat</label>
                    <textarea
                      value={profile.address}
                      onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                      rows={3}
                      className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl mb-6">Ringkasan Mengajar</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-blue-50">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm">Mata Pelajaran</span>
                    </div>
                    <p className="text-lg">{teacherData.subject}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-purple-50">
                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">Kelas Diampu</span>
                    </div>
                    <p className="text-lg">{teacherData.classes.length}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-emerald-50">
                    <div className="flex items-center gap-2 text-emerald-700 mb-2">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm">Wali Kelas</span>
                    </div>
                    <p className="text-lg">{teacherData.homeroomClass}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {teacherData.classes.map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-full text-xs bg-gray-100 text-gray-700">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg mb-4">Kontak</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p>{teacherData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Telepon</p>
                      <p>{teacherData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Alamat</p>
                      <p>{teacherData.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg mb-4">Akun</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Bergabung Sejak</p>
                    <p className="text-base">{new Date(teacherData.joinedAt).toLocaleDateString('id-ID')}</p>
                  </div>
                  <button className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                    Ubah Password
                  </button>
                  <button className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left">
                    Preferensi Notifikasi
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

