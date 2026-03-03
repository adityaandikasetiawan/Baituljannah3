import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { FormInput } from '../components/common/FormInput';
import { FormSelect } from '../components/common/FormSelect';
import { CheckCircle, FileText, Calendar, Users, CreditCard, Award, Download, Upload } from 'lucide-react';

interface AdmissionProps {
  onNavigate?: (page: string) => void;
}

export const Admission: React.FC<AdmissionProps> = ({ onNavigate = () => {} }) => {
  const [selectedUnit, setSelectedUnit] = useState('');

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => onNavigate('main') },
    {
      label: 'Tentang',
      href: '#',
      submenu: [
        { label: 'Visi & Misi', href: '#', onClick: () => onNavigate('vision-mission') },
        { label: 'Kurikulum', href: '#', onClick: () => onNavigate('about') },
        { label: 'Fasilitas', href: '#', onClick: () => onNavigate('about') },
        { label: 'Kepengurusan', href: '#', onClick: () => onNavigate('about') }
      ]
    },
    {
      label: 'Profile',
      href: '#',
      submenu: [
        { label: 'Profil Yayasan', href: '#', onClick: () => onNavigate('about') },
        { label: 'Sejarah', href: '#', onClick: () => onNavigate('about') },
        { label: 'Struktur Organisasi', href: '#', onClick: () => onNavigate('about') },
        { label: 'Peluang Karir', href: '#', onClick: () => onNavigate('career') }
      ]
    },
    {
      label: 'Informasi',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => onNavigate('news') },
        { label: 'Galeri', href: '#', onClick: () => onNavigate('gallery') },
        { label: 'Program', href: '#', onClick: () => onNavigate('programs') }
      ]
    },
    {
      label: 'SPMB',
      href: '#',
      submenu: [
        { label: 'Pendaftaran', href: '#', onClick: () => onNavigate('admission') },
        { label: 'Jadwal & Alur', href: '#', onClick: () => onNavigate('admission') },
        { label: 'Biaya Pendidikan', href: '#', onClick: () => onNavigate('admission') }
      ]
    },
    { label: 'Kontak', href: '#', onClick: () => onNavigate('contact') }
  ];

  const breadcrumbItems = [
    { label: 'Beranda', href: '#' },
    { label: 'Pendaftaran Siswa Baru' }
  ];

  const timeline = [
    { phase: 'Pendaftaran Online', date: '1 Jan - 28 Feb 2024', status: 'active' },
    { phase: 'Tes Seleksi', date: '1 - 15 Mar 2024', status: 'upcoming' },
    { phase: 'Pengumuman', date: '20 Mar 2024', status: 'upcoming' },
    { phase: 'Daftar Ulang', date: '25 Mar - 5 Apr 2024', status: 'upcoming' }
  ];

  const requirements = [
    'Fotokopi Akta Kelahiran (2 lembar)',
    'Fotokopi Kartu Keluarga (2 lembar)',
    'Pas foto terbaru 3x4 (4 lembar)',
    'Surat keterangan sehat dari dokter',
    'Fotokopi raport semester terakhir (untuk jenjang SD ke atas)',
    'Surat rekomendasi dari sekolah sebelumnya (jika ada)'
  ];

  const steps = [
    {
      icon: FileText,
      title: 'Isi Formulir Online',
      description: 'Lengkapi formulir pendaftaran online dengan data yang benar'
    },
    {
      icon: Upload,
      title: 'Upload Dokumen',
      description: 'Upload semua dokumen persyaratan yang dibutuhkan'
    },
    {
      icon: CreditCard,
      title: 'Pembayaran',
      description: 'Lakukan pembayaran biaya pendaftaran'
    },
    {
      icon: Calendar,
      title: 'Tes Seleksi',
      description: 'Ikuti tes seleksi sesuai jadwal yang ditentukan'
    },
    {
      icon: CheckCircle,
      title: 'Pengumuman',
      description: 'Cek pengumuman hasil seleksi'
    },
    {
      icon: Award,
      title: 'Daftar Ulang',
      description: 'Lakukan daftar ulang untuk calon siswa yang diterima'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pendaftaran berhasil! Silakan cek email untuk informasi selanjutnya.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        menuItems={menuItems}
        accentColor="var(--color-primary)"
      />

      <div className="container-custom py-8">
        <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-16">
        <div className="container-custom text-center">
          <div className="inline-block bg-[var(--color-secondary)] text-gray-900 px-6 py-2 rounded-full mb-4">
            📚 Tahun Ajaran 2024/2025
          </div>
          <h1 className="text-white mb-4">Pendaftaran Siswa Baru</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Bergabunglah dengan keluarga besar Yayasan Baituljannah dan wujudkan masa depan gemilang bersama kami
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary bg-[var(--color-secondary)] text-gray-900 hover:bg-[var(--color-secondary-dark)]">
              Daftar Sekarang
            </button>
            <button className="btn-secondary border-white text-white hover:bg-white/10 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Brosur
            </button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container-custom">
          <div className="card bg-white shadow-strong">
            <h3 className="text-[var(--color-primary)] mb-6 text-center">Jadwal Pendaftaran</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {timeline.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    item.status === 'active' 
                      ? 'bg-[var(--color-primary)] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <h4 className="text-gray-900 mb-2">{item.phase}</h4>
                  <p className="text-sm text-gray-600">{item.date}</p>
                  {item.status === 'active' && (
                    <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Aktif
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-[var(--color-primary)] mb-4">Alur Pendaftaran</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ikuti langkah-langkah berikut untuk menyelesaikan proses pendaftaran
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="card hover:shadow-strong transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-primary)] mb-1">Langkah {index + 1}</div>
                    <h4 className="text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[var(--color-primary)] mb-6">Persyaratan Pendaftaran</h2>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>

              <div className="card bg-[var(--color-secondary)]/20 border-2 border-[var(--color-secondary)] mt-6">
                <h4 className="text-gray-900 mb-3">Catatan Penting</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Semua dokumen harus dalam kondisi baik dan terbaca dengan jelas</li>
                  <li>• Pendaftaran dapat dilakukan secara online atau datang langsung</li>
                  <li>• Untuk informasi lebih lanjut, hubungi bagian admisi</li>
                </ul>
              </div>
            </div>

            {/* Quick Registration Form */}
            <div className="card bg-white shadow-strong border border-gray-100">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl -mt-6 -mx-6 mb-6">
                <h3 className="text-white mb-2">Formulir Pendaftaran Cepat</h3>
                <p className="text-white/80 text-sm">Isi data dengan lengkap dan benar</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Nama Lengkap Calon Siswa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Nama Orang Tua/Wali <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Masukkan nama orang tua"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Unit Sekolah <span className="text-red-500">*</span>
                  </label>
                  <select 
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  >
                    <option value="">Pilih unit sekolah</option>
                    {units.map((unit) => (
                      <option key={unit.code} value={unit.code}>{unit.name}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Daftar Sekarang
                  </button>
                </div>

                <p className="text-gray-500 text-xs text-center pt-2">
                  Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-[var(--color-primary)] mb-4">Pertanyaan yang Sering Diajukan</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Kapan batas akhir pendaftaran?',
                a: 'Pendaftaran dibuka mulai 1 Januari hingga 28 Februari 2024 atau hingga kuota terpenuhi.'
              },
              {
                q: 'Apakah ada beasiswa yang tersedia?',
                a: 'Ya, kami menyediakan berbagai program beasiswa untuk siswa berprestasi dan kurang mampu. Info lengkap dapat ditanyakan saat pendaftaran.'
              },
              {
                q: 'Bagaimana sistem pembayaran biaya pendidikan?',
                a: 'Pembayaran dapat dilakukan secara cash atau cicilan. Detail skema pembayaran akan dijelaskan saat daftar ulang.'
              },
              {
                q: 'Apakah ada asrama untuk siswa?',
                a: 'Saat ini asrama tersedia untuk siswa SMAIT dan SMPIT. Fasilitas asrama dilengkapi dengan pembimbing dan pengawas 24 jam.'
              }
            ].map((faq, index) => (
              <div key={index} className="card">
                <h4 className="text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer siteName="Baitul Jannah Islamic School" accentColor="var(--color-primary)" onNavigate={onNavigate} />
    </div>
  );
};