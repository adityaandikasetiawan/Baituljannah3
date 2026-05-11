'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  CheckCircle, 
  GraduationCap, 
  Heart, 
  Users, 
  Coffee,
  ArrowRight,
  Upload,
  User,
  Mail,
  Phone,
  FileText,
  Linkedin,
  X
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { EmailService } from '../../components/common/EmailService';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  featured?: boolean;
}

// Mock Data Jobs
const jobs: Job[] = [
  {
    id: '1',
    title: 'Guru Matematika SMP',
    department: 'Akademik',
    location: 'Unit SMP',
    type: 'Full-time',
    salary: 'Kompetitif',
    description: 'Kami mencari guru Matematika yang berdedikasi untuk mengajar siswa SMP dengan metode pembelajaran yang inovatif dan menyenangkan.',
    requirements: [
      'S1 Pendidikan Matematika',
      'Pengalaman mengajar minimal 2 tahun',
      'Memahami kurikulum merdeka',
      'Mampu berbahasa Inggris (pasif)',
      'Berakhlak mulia dan bisa menjadi teladan'
    ],
    postedDate: '2 hari yang lalu',
    featured: true
  },
  {
    id: '2',
    title: 'Staf Administrasi',
    department: 'Tata Usaha',
    location: 'Kantor Pusat',
    type: 'Full-time',
    salary: 'UMR + Tunjangan',
    description: 'Bertanggung jawab atas pengelolaan administrasi sekolah, surat-menyurat, dan pengarsipan data siswa serta guru.',
    requirements: [
      'D3/S1 Administrasi Perkantoran/Manajemen',
      'Menguasai Microsoft Office',
      'Teliti dan rapi',
      'Mampu bekerja dalam tim',
      'Komunikatif'
    ],
    postedDate: '5 hari yang lalu'
  },
  {
    id: '3',
    title: 'Guru Tahfidz',
    department: 'Keagamaan',
    location: 'Semua Unit',
    type: 'Part-time',
    salary: 'Kompetitif',
    description: 'Membimbing siswa dalam menghafal Al-Qur\'an dengan metode yang efektif dan memantau perkembangan hafalan siswa.',
    requirements: [
      'Hafal minimal 5 Juz',
      'Memiliki sertifikat/sanad (diutamakan)',
      'Sabar dan menyukai dunia anak',
      'Mampu membaca Al-Qur\'an dengan tartil'
    ],
    postedDate: '1 minggu yang lalu',
    featured: true
  },
  {
    id: '4',
    title: 'IT Support',
    department: 'IT',
    location: 'Kantor Pusat',
    type: 'Full-time',
    salary: 'Kompetitif',
    description: 'Memastikan infrastruktur IT sekolah berjalan lancar, troubleshooting hardware/software, dan maintenance website.',
    requirements: [
      'S1 Teknik Informatika/Sistem Informasi',
      'Menguasai networking dasar',
      'Familiar dengan maintenance PC & Printer',
      'Mengerti dasar web development'
    ],
    postedDate: '2 minggu yang lalu'
  }
];

// Benefits Data
const benefits = [
  {
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    title: 'Kesehatan & Kesejahteraan',
    description: 'BPJS Kesehatan & Ketenagakerjaan, serta tunjangan kesehatan keluarga.'
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
    title: 'Pengembangan Diri',
    description: 'Pelatihan rutin, workshop, dan kesempatan studi lanjut.'
  },
  {
    icon: <Users className="w-6 h-6 text-green-500" />,
    title: 'Lingkungan Islami',
    description: 'Lingkungan kerja yang kondusif, religius, dan kekeluargaan.'
  },
  {
    icon: <Coffee className="w-6 h-6 text-amber-500" />,
    title: 'Fasilitas Lengkap',
    description: 'Makan siang, seragam, dan fasilitas olahraga.'
  }
];

export default function CareerPage() {
  const { onNavigate, menuItems } = useNavigationMenu();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [filter, setFilter] = useState({
    search: '',
    department: 'Semua',
    type: 'Semua'
  });
  const [showEmailService, setShowEmailService] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
    setApplicationStep(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setShowApplyModal(false);
      setShowEmailService(true);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        resume: null,
        coverLetter: ''
      });
    }, 1500);
  };

  // Filter Logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         job.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesDept = filter.department === 'Semua' || job.department === filter.department;
    const matchesType = filter.type === 'Semua' || job.type === filter.type;
    
    return matchesSearch && matchesDept && matchesType;
  });

  const departments = ['Semua', ...Array.from(new Set(jobs.map(j => j.department)))];
  const types = ['Semua', ...Array.from(new Set(jobs.map(j => j.type)))];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar 
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1E4AB8] to-[#50E3C2] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Bergabunglah Bersama Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            Jadilah bagian dari visi kami untuk mencetak generasi Islami yang cerdas, berkarakter, dan berprestasi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#1E4AB8] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Lihat Lowongan
            </button>
          </motion.div>
        </div>
      </div>

      {/* Jobs Section */}
      <div id="jobs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari posisi atau kata kunci..."
                    value={filter.search}
                    onChange={(e) => setFilter({...filter, search: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]"
                  />
                  <Briefcase className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
              </div>
              <select
                value={filter.department}
                onChange={(e) => setFilter({...filter, department: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={filter.type}
                onChange={(e) => setFilter({...filter, type: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job List */}
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#1E3A8A]">{job.title}</h3>
                        {job.featured && (
                          <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, idx) => (
                          <span key={idx} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 3 && (
                          <span className="text-gray-500 text-xs py-1">+{job.requirements.length - 3} lainnya</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 min-w-[120px]">
                      <span className="text-xs text-gray-500">Diposting {job.postedDate}</span>
                      <button
                        onClick={() => handleApply(job)}
                        className="w-full bg-[#1E4AB8] text-white px-6 py-2 rounded-lg hover:bg-[#153488] transition-colors flex items-center justify-center gap-2"
                      >
                        Lamar
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Tidak ada lowongan ditemukan</h3>
                <p className="text-gray-500">Coba ubah filter pencarian Anda</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1E3A8A] text-center mb-12">Kata Mereka Tentang Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl relative">
                <div className="text-[#1E4AB8] text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
                <p className="text-gray-600 mb-6 relative z-10 italic">
                  "Bekerja di Baitul Jannah memberikan pengalaman yang luar biasa. Lingkungannya sangat mendukung untuk berkembang, baik secara profesional maupun spiritual."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full bg-[url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')] bg-cover"></div>
                  <div>
                    <h4 className="font-bold text-[#1E3A8A]">Ahmad Fauzi</h4>
                    <p className="text-xs text-gray-500">Guru Matematika, 5 tahun</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer siteName="Baitul Jannah" onNavigate={onNavigate} />

      {/* Application Modal */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div>
                  <h3 className="text-xl font-bold text-[#1E3A8A]">Lamar Posisi</h3>
                  <p className="text-gray-600 text-sm">{selectedJob.title} - {selectedJob.location}</p>
                </div>
                <button 
                  onClick={() => setShowApplyModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-6 py-4 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-100 -z-10"></div>
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step <= applicationStep 
                          ? 'bg-[#1E4AB8] text-white' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step < applicationStep ? <CheckCircle className="w-5 h-5" /> : step}
                      </div>
                      <span className={`text-xs ${
                        step <= applicationStep ? 'text-[#1E4AB8] font-medium' : 'text-gray-400'
                      }`}>
                        {step === 1 ? 'Data Diri' : step === 2 ? 'Dokumen' : 'Review'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                <form onSubmit={handleSubmitApplication}>
                  {applicationStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="fullName"
                              required
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E4AB8] focus:border-transparent"
                            />
                            <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E4AB8] focus:border-transparent"
                            />
                            <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E4AB8] focus:border-transparent"
                            />
                            <Phone className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                          <div className="relative">
                            <input
                              type="url"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E4AB8] focus:border-transparent"
                            />
                            <Linkedin className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {applicationStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV/Resume</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#1E4AB8] transition-colors bg-gray-50">
                          <input
                            type="file"
                            id="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label htmlFor="resume" className="cursor-pointer">
                            <div className="w-12 h-12 bg-[#1E4AB8]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Upload className="w-6 h-6 text-[#1E4AB8]" />
                            </div>
                            <span className="text-[#1E4AB8] font-medium hover:underline">Klik untuk upload</span>
                            <span className="text-gray-500"> atau drag & drop</span>
                            <p className="text-xs text-gray-400 mt-2">PDF, DOC, DOCX (Max. 5MB)</p>
                          </label>
                          {formData.resume && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 py-2 px-4 rounded-lg inline-flex">
                              <CheckCircle className="w-4 h-4" />
                              {formData.resume.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                        <div className="relative">
                          <textarea
                            name="coverLetter"
                            rows={4}
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            placeholder="Ceritakan mengapa Anda cocok untuk posisi ini..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E4AB8] focus:border-transparent"
                          />
                          <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {applicationStep === 3 && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="font-semibold text-[#1E3A8A] mb-3">Ringkasan Lamaran</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Posisi</span>
                            <span className="font-medium">{selectedJob.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Nama</span>
                            <span className="font-medium">{formData.fullName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Resume</span>
                            <span className="font-medium">{formData.resume?.name || 'Belum diupload'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                        <div className="mt-0.5"><CheckCircle className="w-4 h-4" /></div>
                        <p>Dengan mengirimkan lamaran ini, saya menyatakan bahwa data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
                {applicationStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setApplicationStep(prev => prev - 1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                  >
                    Kembali
                  </button>
                ) : (
                  <div></div>
                )}
                
                {applicationStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setApplicationStep(prev => prev + 1)}
                    className="px-6 py-2 bg-[#1E4AB8] text-white rounded-lg hover:bg-[#153488] font-medium transition-colors flex items-center gap-2"
                  >
                    Lanjut
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitApplication}
                    className="px-8 py-2 bg-[#1E4AB8] text-white rounded-lg hover:bg-[#153488] font-medium transition-colors shadow-lg hover:shadow-xl"
                  >
                    Kirim Lamaran
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Service Notification */}
      {showEmailService && selectedJob && (
        <EmailService
          recipientEmail={formData.email}
          recipientName={formData.fullName}
          position={selectedJob.title}
          onClose={() => setShowEmailService(false)}
        />
      )}

      <Footer siteName="Baitul Jannah Islamic School" accentColor="#1E4AB8" onNavigate={onNavigate} />
    </div>
  );
}

