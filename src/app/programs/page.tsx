'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Users, Award, Globe, Heart, Star, Lightbulb, Target, Zap, ArrowRight, Sparkles, CheckCircle, Search } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function ProgramsPage() {
  const { onNavigate, menuItems } = useNavigationMenu();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Program Pendidikan' }
  ];

  const programs = [
    {
      icon: Heart,
      title: 'Islamic Studies',
      description:
        'Pembelajaran terpadu untuk membentuk akidah yang lurus, ibadah yang benar, dan akhlak mulia melalui Al-Qur’an, hadis, fiqih, sirah, dan pembiasaan harian.',
      category: 'Islamic Studies',
      features: ['Tahfidz & tahsin terstruktur', 'Adab & pembiasaan ibadah', 'Bahasa Arab dasar', 'Mentoring ruhiyah'],
      color: '#10B981',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description:
        'Pembelajaran akademik yang kuat, terukur, dan berorientasi prestasi melalui penguatan literasi-numerasi, penilaian berkala, dan pembinaan kompetisi.',
      category: 'Academic Excellence',
      features: ['Literasi & numerasi', 'Assessment berbasis capaian', 'Pembinaan olimpiade/kompetisi', 'Pembelajaran terarah & tuntas'],
      color: '#F97316',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    {
      icon: Lightbulb,
      title: 'Project Based Learning',
      description:
        'Pembelajaran berbasis proyek yang melatih riset, kreativitas, problem solving, dan presentasi melalui proyek lintas mata pelajaran yang relevan dengan dunia nyata.',
      category: 'Project Based Learning',
      features: ['Proyek lintas mapel', 'Riset sederhana & eksperimen', 'Kolaborasi tim', 'Pameran/presentasi karya'],
      color: '#6366F1',
      bgGradient: 'from-indigo-50 to-blue-50'
    },
    {
      icon: Users,
      title: 'Interpersonal Skill',
      description:
        'Penguatan soft skills untuk membangun komunikasi yang baik, kepemimpinan, empati, dan kemampuan bekerja sama dalam tim melalui pembiasaan dan aktivitas terarah.',
      category: 'Interpersonal Skill',
      features: ['Komunikasi efektif', 'Teamwork & kolaborasi', 'Leadership & tanggung jawab', 'Empati, disiplin, dan etika'],
      color: '#8B5CF6',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      icon: Target,
      title: 'Entrepreneur',
      description:
        'Pembelajaran kewirausahaan untuk menumbuhkan mental mandiri, kreatif, dan berani mencoba melalui proyek bisnis, market day, dan literasi finansial.',
      category: 'Entrepreneur',
      features: ['Market day & bazar siswa', 'Project bisnis sederhana', 'Financial literacy', 'Kreativitas produk & layanan'],
      color: '#F59E0B',
      bgGradient: 'from-amber-50 to-yellow-50'
    },
    {
      icon: Zap,
      title: 'ICT',
      description:
        'Penguatan literasi digital dan teknologi melalui pemanfaatan tools produktivitas, keamanan digital, dan pengenalan coding/robotik sesuai jenjang.',
      category: 'ICT',
      features: ['Digital literacy & safety', 'Produktivitas (tools belajar)', 'Coding dasar', 'Robotik/komputasi terapan'],
      color: '#3B82F6',
      bgGradient: 'from-blue-50 to-cyan-50'
    }
  ];

  const categories = [
    { name: 'Semua', icon: Star },
    { name: 'Islamic Studies', icon: Heart },
    { name: 'Academic Excellence', icon: Award },
    { name: 'Project Based Learning', icon: Lightbulb },
    { name: 'Interpersonal Skill', icon: Users },
    { name: 'Entrepreneur', icon: Target },
    { name: 'ICT', icon: Zap }
  ].map((c) => ({
    ...c,
    count: c.name === 'Semua' ? programs.length : programs.filter((p) => p.category === c.name).length,
  }));

  const filteredPrograms = selectedCategory === 'Semua' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar menuItems={menuItems} activePage="programs" onNavigate={onNavigate} />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Programs Background"
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-down">
                Six Aspects of Curriculum
              </h1>
              <p className="text-xl text-blue-100 mb-8 animate-fade-in-up">
                Enam aspek kurikulum untuk membentuk siswa yang unggul dalam iman, ilmu, keterampilan, dan teknologi.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white sticky top-0 z-20 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                      ${isSelected 
                        ? 'bg-blue-600 text-white shadow-lg scale-105' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-blue-600'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                    <span>{category.name}</span>
                    <span className={`
                      ml-2 px-2 py-0.5 rounded-full text-xs
                      ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}
                    `}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => {
                const Icon = program.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-6 ${program.bgGradient}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: program.color }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-gray-700 shadow-sm">
                          {program.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {program.description}
                      </p>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-3 mb-6">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full py-3 px-4 bg-gray-50 text-blue-600 rounded-xl font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white">
                        <span>Selengkapnya</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Tidak ada program ditemukan</h3>
                <p className="text-gray-500">Coba pilih kategori program yang lain.</p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Tertarik dengan Program Kami?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah bersama keluarga besar Baituljannah dan kembangkan potensi putra-putri Anda dengan pendidikan terbaik.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => onNavigate('admission')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Daftar Sekarang
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
              >
                Hubungi Kami
              </button>
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
