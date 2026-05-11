'use client';

import React, { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { FormInput } from '../../components/common/FormInput';
import { FormTextarea } from '../../components/common/FormTextarea';
import { FormSelect } from '../../components/common/FormSelect';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';
import Image from 'next/image';

export default function ContactPage() {
  const { onNavigate, menuItems } = useNavigationMenu();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    unit: '',
    message: ''
  });

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Kontak' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      details: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
      color: '#1E4AB8'
    },
    {
      icon: Phone,
      title: 'Telepon',
      details: ['(0721) 273781'],
      color: '#10B981'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['- (belum ada email khusus)'],
      color: '#F97316'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 07:00 - 16:00'],
      color: '#8B5CF6'
    }
  ];

  const units = [
    { name: 'TKIT Baituljannah', phone: '(0721) 273781', email: '-' },
    { name: 'SDIT Baituljannah', phone: '(0721) 273781', email: '-' },
    { name: 'SMPIT Baituljannah', phone: '(0721) 273781', email: '-' },
    { name: 'SMAIT Baituljannah', phone: '(0721) 273781', email: '-' },
    { name: 'SLBIT Baituljannah', phone: '(0721) 273781', email: '-' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      unit: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        menuItems={menuItems}
        accentColor="#1E4AB8"
      />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Contact Background"
              width={1}
              height={1}
              sizes="100vw"
              className="w-full h-full object-cover opacity-20"
              style={{ width: '100%', height: '100%' }}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-down">
                Hubungi Kami
              </h1>
              <p className="text-xl text-blue-100 mb-8 animate-fade-in-up">
                Kami siap membantu dan menjawab pertanyaan Anda seputar pendaftaran, program pendidikan, dan informasi lainnya.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb items={breadcrumbItems} onNavigate={onNavigate} />
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="pt-12 -pb-8 -mt-4 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-white p-6 rounded-2xl shadow-lg border-b-4 hover:transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                    style={{ 
                      borderColor: info.color,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${info.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: info.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="pt-10 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Kirim Pesan</h2>
                      <p className="text-gray-500 text-sm">Silakan isi formulir di bawah ini</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Nama Lengkap"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama Anda"
                        required
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contoh@email.com"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput
                        label="Nomor Telepon"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="081234567890"
                      />
                      <FormSelect
                        label="Tujuan Unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        options={[
                          { value: '', label: 'Pilih Unit (Opsional)' },
                          { value: 'yayasan', label: 'Yayasan' },
                          { value: 'tkit', label: 'TKIT Baituljannah' },
                          { value: 'sdit', label: 'SDIT Baituljannah' },
                          { value: 'smpit', label: 'SMPIT Baituljannah' },
                          { value: 'smait', label: 'SMAIT Baituljannah' },
                          { value: 'slbit', label: 'SLBIT Baituljannah' }
                        ]}
                      />
                    </div>

                    <FormInput
                      label="Subjek"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Judul pesan Anda"
                      required
                    />

                    <FormTextarea
                      label="Pesan"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tuliskan pesan Anda di sini..."
                      rows={5}
                      required
                    />

                    <button
                      type="submit"
                      className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Kirim Pesan</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Map & Unit Contacts */}
              <div className="lg:w-1/2 space-y-8">
                {/* Google Map */}
                <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-100 h-80 overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps?q=Jl.%20Pramuka%20No.43%2C%20Kemiling%20Permai%2C%20Kec.%20Kemiling%2C%20Kota%20Bandar%20Lampung%2C%20Lampung%2035153&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, borderRadius: '1rem' }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Baituljannah Location"
                  ></iframe>
                </div>

                {/* Unit Contacts List */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-2" />
                    Kontak Unit Sekolah
                  </h3>
                  <div className="space-y-4">
                    {units.map((unit, index) => (
                      <div key={index} className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-100">
                        <div className="flex-grow">
                          <h4 className="font-bold text-gray-800">{unit.name}</h4>
                          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {unit.phone}
                            </span>
                            <span className="flex items-center mt-1 sm:mt-0">
                              <Mail className="w-3 h-3 mr-1" />
                              {unit.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Temukan jawaban cepat untuk pertanyaan umum seputar Baituljannah
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { q: "Kapan pendaftaran siswa baru dibuka?", a: "Pendaftaran siswa baru biasanya dibuka mulai bulan Oktober untuk tahun ajaran berikutnya. Silakan cek halaman PPDB untuk informasi terbaru." },
                { q: "Apakah tersedia layanan antar-jemput siswa?", a: "Ya, kami menyediakan layanan antar-jemput siswa untuk area tertentu. Hubungi bagian tata usaha untuk informasi rute dan biaya." },
                { q: "Bagaimana dengan program beasiswa?", a: "Baituljannah menyediakan program beasiswa prestasi dan tahfidz. Informasi detail persyaratan dapat dilihat pada halaman Pendaftaran." },
                { q: "Apakah ada program ekstrakurikuler?", a: "Kami memiliki lebih dari 20 kegiatan ekstrakurikuler yang dapat dipilih siswa sesuai minat dan bakat mereka, mulai dari olahraga, seni, hingga sains." }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-800 mb-2">{faq.q}</h4>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer 
        siteName="Baitul Jannah Islamic School"
        accentColor="#1E4AB8"
        onNavigate={onNavigate}
      />
    </div>
  );
}
