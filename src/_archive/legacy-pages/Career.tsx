import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { EmailService } from '../components/EmailService';
import { Briefcase, Users, TrendingUp, Heart, Clock, MapPin, GraduationCap, Send, Filter, Play, Award, BookOpen, Globe, Sparkles, ArrowRight, CheckCircle, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface CareerProps {
  onNavigate?: (page: string) => void;
}

export const Career: React.FC<CareerProps> = ({ onNavigate = () => {} }) => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [filterUnit, setFilterUnit] = useState<string>('Semua');
  const [filterType, setFilterType] = useState<string>('Semua');
  const [showVideo, setShowVideo] = useState(false);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    unit: '',
    experience: '',
    education: '',
    message: '',
    cv: null as File | null
  });

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
        { label: 'Struktur Organisasi', href: '#', onClick: () => onNavigate('about') }
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
    { label: 'Karir', href: '#', onClick: () => onNavigate('career') },
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
    { label: 'Beranda', href: '#', onClick: () => onNavigate('main') },
    { label: 'Peluang Karir' }
  ];

  const stats = [
    { value: '15+', label: 'Tahun Berpengalaman', icon: Award },
    { value: '250+', label: 'Tenaga Pendidik', icon: Users },
    { value: '5', label: 'Unit Sekolah', icon: BookOpen },
    { value: '2000+', label: 'Siswa Aktif', icon: GraduationCap }
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Lingkungan Islami',
      description: 'Bekerja di lingkungan yang mendukung nilai-nilai Islam dengan suasana kekeluargaan',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Pengembangan Karir',
      description: 'Program pelatihan dan pengembangan profesional yang berkelanjutan',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Tim Solid',
      description: 'Bergabung dengan tim pendidik profesional yang berpengalaman dan berdedikasi',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Fasilitas Lengkap',
      description: 'Akses ke fasilitas pendidikan modern dan sarana kerja yang memadai',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Benefit Kompetitif',
      description: 'Gaji kompetitif, tunjangan kesehatan, dan benefit lainnya',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Work-Life Balance',
      description: 'Keseimbangan kehidupan kerja dan ibadah yang harmonis',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const testimonials = [
    {
      name: 'Ustadzah Fatimah',
      position: 'Guru SDIT',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      quote: 'Alhamdulillah, bekerja di Baituljannah memberikan kesempatan untuk berkembang secara profesional sambil menjalankan misi dakwah melalui pendidikan.'
    },
    {
      name: 'Ustadz Ahmad',
      position: 'Kepala SMPIT',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      quote: 'Lingkungan kerja yang Islami dan supportive membuat saya bisa memberikan yang terbaik untuk anak didik.'
    },
    {
      name: 'Ustadzah Aisyah',
      position: 'Guru TKIT',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      quote: 'Sistem pengembangan karir yang jelas dan benefit yang kompetitif membuat saya nyaman berkarir di sini.'
    }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Guru Bahasa Arab',
      unit: 'SMPIT',
      type: 'Full Time',
      location: 'Jakarta Selatan',
      salary: 'Rp 5.000.000 - Rp 7.000.000',
      description: 'Mengajar bahasa Arab untuk tingkat SMP dengan metode yang interaktif dan menyenangkan.',
      requirements: [
        'Pendidikan minimal S1 Pendidikan Bahasa Arab',
        'Menguasai bahasa Arab aktif dan pasif',
        'Berpengalaman mengajar minimal 2 tahun',
        'Memiliki kemampuan komunikasi yang baik',
        'Berkomitmen dengan nilai-nilai Islam'
      ],
      postedDate: '2 hari yang lalu',
      isNew: true,
      accentColor: '#F97316'
    },
    {
      id: 2,
      title: 'Guru Matematika',
      unit: 'SDIT',
      type: 'Full Time',
      location: 'Jakarta Selatan',
      salary: 'Rp 4.500.000 - Rp 6.500.000',
      description: 'Mengajar matematika untuk SD dengan pendekatan yang kreatif dan menyenangkan.',
      requirements: [
        'Pendidikan minimal S1 Pendidikan Matematika',
        'Menguasai metode pembelajaran aktif',
        'Sabar dan menyukai anak-anak',
        'Berpengalaman mengajar SD minimal 1 tahun',
        'Memahami kurikulum nasional dan kurikulum Islam'
      ],
      postedDate: '5 hari yang lalu',
      isNew: true,
      accentColor: '#3B82F6'
    },
    {
      id: 3,
      title: 'Guru Tahfidz',
      unit: 'SMAIT',
      type: 'Full Time',
      location: 'Jakarta Selatan',
      salary: 'Rp 5.500.000 - Rp 8.000.000',
      description: 'Membimbing siswa dalam menghafal Al-Quran dengan metode yang efektif.',
      requirements: [
        'Hafal minimal 15 juz Al-Quran',
        'Memiliki sanad tahfidz yang jelas',
        'Berpengalaman membimbing tahfidz minimal 3 tahun',
        'Memahami ilmu tajwid dengan baik',
        'Telaten dan sabar dalam membimbing'
      ],
      postedDate: '1 minggu yang lalu',
      isNew: false,
      accentColor: '#8B5CF6'
    },
    {
      id: 4,
      title: 'Guru PAUD',
      unit: 'TKIT',
      type: 'Full Time',
      location: 'Jakarta Selatan',
      salary: 'Rp 4.000.000 - Rp 6.000.000',
      description: 'Mendidik anak usia dini dengan metode bermain sambil belajar.',
      requirements: [
        'Pendidikan minimal S1 PAUD/PG-PAUD',
        'Menyukai anak-anak dan memiliki kesabaran tinggi',
        'Kreatif dalam merancang kegiatan pembelajaran',
        'Memahami perkembangan anak usia dini',
        'Berpengalaman di PAUD minimal 1 tahun'
      ],
      postedDate: '3 hari yang lalu',
      isNew: true,
      accentColor: '#10B981'
    },
    {
      id: 5,
      title: 'Staff IT',
      unit: 'Yayasan',
      type: 'Full Time',
      location: 'Jakarta Selatan',
      salary: 'Rp 5.000.000 - Rp 8.000.000',
      description: 'Mengelola infrastruktur IT dan sistem informasi akademik yayasan.',
      requirements: [
        'Pendidikan minimal S1 Teknik Informatika/Sistem Informasi',
        'Menguasai networking dan troubleshooting',
        'Berpengalaman mengelola sistem informasi sekolah',
        'Mampu bekerja dalam tim',
        'Memiliki sertifikasi IT adalah nilai plus'
      ],
      postedDate: '1 minggu yang lalu',
      isNew: false,
      accentColor: '#1E4AB8'
    },
    {
      id: 6,
      title: 'Guru Bahasa Inggris',
      unit: 'SLBIT',
      type: 'Full Time',
      location: 'Jakarta Selatan',
      salary: 'Rp 5.500.000 - Rp 8.500.000',
      description: 'Mengajar bahasa Inggris untuk tingkat SMA dengan fokus pada kemampuan komunikasi.',
      requirements: [
        'Pendidikan minimal S1 Pendidikan Bahasa Inggris',
        'TOEFL score minimal 550 atau IELTS 6.5',
        'Berpengalaman mengajar minimal 2 tahun',
        'Menguasai metode pembelajaran modern',
        'Mampu menggunakan teknologi pembelajaran'
      ],
      postedDate: '4 hari yang lalu',
      isNew: true,
      accentColor: '#14B8A6'
    }
  ];

  const faqs = [
    {
      question: 'Bagaimana proses rekrutmen di Baituljannah?',
      answer: 'Proses rekrutmen meliputi: 1) Seleksi administrasi, 2) Tes tulis, 3) Microteaching/praktik mengajar, 4) Wawancara, 5) Pengumuman.'
    },
    {
      question: 'Apakah ada pelatihan untuk guru baru?',
      answer: 'Ya, kami menyediakan program orientasi dan pelatihan berkelanjutan untuk semua guru baru agar dapat beradaptasi dengan sistem pembelajaran kami.'
    },
    {
      question: 'Berapa lama proses seleksi berlangsung?',
      answer: 'Proses seleksi biasanya memakan waktu 2-4 minggu sejak penutupan pendaftaran hingga pengumuman hasil akhir.'
    },
    {
      question: 'Apakah tersedia asuransi kesehatan?',
      answer: 'Ya, semua karyawan tetap mendapatkan fasilitas BPJS Kesehatan dan BPJS Ketenagakerjaan.'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const unitMatch = filterUnit === 'Semua' || job.unit === filterUnit;
    const typeMatch = filterType === 'Semua' || job.type === filterType;
    return unitMatch && typeMatch;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEmailConfirm(true);
    setSelectedJob(null);
    setApplicationStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      unit: '',
      experience: '',
      education: '',
      message: '',
      cv: null
    });
  };

  const nextStep = () => {
    if (applicationStep < 3) setApplicationStep(applicationStep + 1);
  };

  const prevStep = () => {
    if (applicationStep > 1) setApplicationStep(applicationStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems} 
      />

      {/* Hero Section - Enhanced */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white overflow-hidden">
        {/* Islamic Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="white"/>
                <circle cx="75" cy="25" r="2" fill="white"/>
                <circle cx="25" cy="75" r="2" fill="white"/>
                <circle cx="75" cy="75" r="2" fill="white"/>
                <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-300"></div>

        <div className="container-custom relative z-10 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8 text-white/80">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {item.onClick ? (
                  <button onClick={item.onClick} className="hover:text-white transition-colors">
                    {item.label}
                  </button>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Bergabung dengan Tim Terbaik</span>
              </div>
              <h1 className="text-5xl lg:text-6xl mb-6 leading-tight">
                Wujudkan Karir<br />
                <span className="text-yellow-300">Bermakna</span> Bersama Kami
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Jadilah bagian dari keluarga besar Baitul Jannah dan berkontribusi dalam mencetak generasi Qurani yang cerdas, berkarakter, dan berprestasi.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('job-openings')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary flex items-center gap-2 group"
                >
                  Lihat Lowongan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setShowVideo(true)}
                  className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[#1E4AB8] transition-all flex items-center gap-2 group"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Tonton Video
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Team Baituljannah"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg">
                    "Bersama membangun generasi Qurani yang unggul"
                  </p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl mb-2 bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">
              <Heart className="w-4 h-4" />
              <span>Kenapa Bergabung dengan Kami?</span>
            </div>
            <h2 className="mb-4">Benefit & Keunggulan</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami berkomitmen memberikan lingkungan kerja terbaik untuk pengembangan karir Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-4">
                <Users className="w-4 h-4" />
                <span>Budaya Kerja Kami</span>
              </div>
              <h2 className="mb-6">Lingkungan Kerja yang Inspiratif</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Di Baitul Jannah, kami menciptakan lingkungan kerja yang mendukung pertumbuhan profesional dan spiritual. Setiap hari adalah kesempatan untuk belajar, berbagi, dan berkontribusi untuk pendidikan Islam yang lebih baik.
              </p>
              <div className="space-y-4">
                {[
                  'Mentoring dari guru senior berpengalaman',
                  'Workshop dan pelatihan rutin',
                  'Komunitas pendidik yang supportive',
                  'Keseimbangan antara kerja dan ibadah'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-strong transform hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                    alt="Team Work"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-strong transform hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                    alt="Workshop"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-strong transform hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998"
                    alt="Meeting"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-strong transform hover:scale-105 transition-transform duration-300">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1522071901873-411886a10004"
                    alt="Collaboration"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm mb-4 shadow-soft">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700">Testimoni</span>
            </div>
            <h2 className="mb-4">Kata Mereka yang Telah Bergabung</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dengarkan pengalaman rekan-rekan kami yang telah menjadi bagian dari keluarga Baitul Jannah
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-100">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex gap-1 mt-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section - Enhanced */}
      <section id="job-openings" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm mb-4">
              <Briefcase className="w-4 h-4" />
              <span>Posisi Terbuka</span>
            </div>
            <h2 className="mb-4">Lowongan Tersedia</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Temukan posisi yang sesuai dengan keahlian dan passion Anda
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filterUnit}
                  onChange={(e) => setFilterUnit(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm cursor-pointer"
                >
                  <option>Semua Unit</option>
                  <option>TKIT</option>
                  <option>SDIT</option>
                  <option>SMPIT</option>
                  <option>SMAIT</option>
                  <option>SLBIT</option>
                  <option>Yayasan</option>
                </select>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <Clock className="w-5 h-5 text-gray-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm cursor-pointer"
                >
                  <option>Semua Tipe</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Menampilkan <strong>{filteredJobs.length}</strong> lowongan
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: job.accentColor }}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl group-hover:text-[#1E4AB8] transition-colors">
                          {job.title}
                        </h3>
                        {job.isNew && (
                          <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full animate-pulse">
                            BARU
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span 
                          className="px-3 py-1 rounded-full text-xs text-white"
                          style={{ backgroundColor: job.accentColor }}
                        >
                          {job.unit}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{job.postedDate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedJob(job.id);
                      setFormData({ ...formData, position: job.title, unit: job.unit });
                    }}
                    className="w-full btn-primary flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Lamar Sekarang</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-600 mb-2">Tidak ada lowongan yang sesuai</h3>
              <p className="text-gray-500">Coba ubah filter atau periksa kembali nanti</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm mb-4">
              <span>❓</span>
              <span>FAQ</span>
            </div>
            <h2 className="mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-gray-600">
              Temukan jawaban untuk pertanyaan umum seputar karir di Baitul Jannah
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <h4 className="text-lg pr-4">{faq.question}</h4>
                  <span className="text-[#1E4AB8] text-2xl group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl transform animate-scale-in">
            <div className="bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] p-6 flex items-center justify-between">
              <h3 className="text-white text-xl">Company Profile - Baitul Jannah</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Video simulasi akan ditampilkan di sini</p>
                <p className="text-sm text-gray-400 mt-2">
                  Integrasi dengan video player seperti YouTube atau Vimeo
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal - Enhanced with Steps */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl transform animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-2xl">Form Lamaran</h3>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setApplicationStep(1);
                  }}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Step Indicator */}
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex items-center gap-2 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        applicationStep >= step 
                          ? 'bg-white text-[#1E4AB8]' 
                          : 'bg-white/20 text-white'
                      }`}>
                        {applicationStep > step ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <span>{step}</span>
                        )}
                      </div>
                      {step < 3 && (
                        <div className={`h-1 flex-1 transition-all duration-300 ${
                          applicationStep > step ? 'bg-white' : 'bg-white/20'
                        }`}></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-white text-sm">
                <span className={applicationStep >= 1 ? 'opacity-100' : 'opacity-50'}>Data Diri</span>
                <span className={applicationStep >= 2 ? 'opacity-100' : 'opacity-50'}>Kualifikasi</span>
                <span className={applicationStep >= 3 ? 'opacity-100' : 'opacity-50'}>Dokumen</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {/* Step 1: Personal Data */}
              {applicationStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-lg mb-4">Informasi Pribadi</h4>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      placeholder="nama@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">No. Telepon/WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      placeholder="08xx-xxxx-xxxx"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Qualifications */}
              {applicationStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-lg mb-4">Kualifikasi</h4>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Posisi yang Dilamar *</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Unit Sekolah *</label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Pendidikan Terakhir *</label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Pilih pendidikan</option>
                      <option value="SMA/SMK">SMA/SMK</option>
                      <option value="D3">D3</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Pengalaman Mengajar *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Pilih pengalaman</option>
                      <option value="Fresh Graduate">Fresh Graduate</option>
                      <option value="< 1 tahun">{'< 1 tahun'}</option>
                      <option value="1-3 tahun">1-3 tahun</option>
                      <option value="3-5 tahun">3-5 tahun</option>
                      <option value="> 5 tahun">{"> 5 tahun"}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {applicationStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-lg mb-4">Dokumen & Motivasi</h4>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Upload CV (PDF) *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1E4AB8] transition-colors">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="hidden"
                        id="cv-upload"
                        required
                      />
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                          <Send className="w-8 h-8 text-[#1E4AB8]" />
                        </div>
                        {formData.cv ? (
                          <p className="text-[#1E4AB8]">{formData.cv.name}</p>
                        ) : (
                          <>
                            <p className="text-gray-600 mb-1">Klik untuk upload CV</p>
                            <p className="text-sm text-gray-400">PDF maksimal 2MB</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Motivasi & Pesan</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Ceritakan motivasi Anda bergabung dengan Baitul Jannah..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                {applicationStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Kembali
                  </button>
                )}
                {applicationStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 btn-primary"
                  >
                    Lanjutkan
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Kirim Lamaran
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Email Confirmation */}
      {showEmailConfirm && (
        <EmailService
          applicantName={formData.name}
          applicantEmail={formData.email}
          position={formData.position}
          onClose={() => setShowEmailConfirm(false)}
        />
      )}

      <Footer siteName="Baitul Jannah Islamic School" accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
};

