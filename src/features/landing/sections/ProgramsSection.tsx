import React from 'react';
import { BookOpen } from 'lucide-react';

export function ProgramsSection() {
  const programs = [
    {
      title: 'Tahfidz Qur’an',
      description:
        'Program menghafal Al-Qur’an yang terstruktur dengan target capaian tiap jenjang.',
      icon: BookOpen,
    },
    {
      title: 'Kurikulum Terpadu',
      description:
        'Integrasi kurikulum nasional dan nilai-nilai Islam yang relevan dan kontekstual.',
      icon: BookOpen,
    },
    {
      title: 'Pembinaan Karakter',
      description:
        'Pembiasaan ibadah harian, adab, dan akhlak yang dikelola secara konsisten.',
      icon: BookOpen,
    },
    {
      title: 'Ekstrakurikuler',
      description:
        'Olahraga, seni, sains, dan berbagai klub untuk menumbuhkan potensi siswa.',
      icon: BookOpen,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Program Unggulan</span>
          </div>
          <h2 className="mb-4">Program Pendidikan Kami</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Berbagai program unggulan yang dirancang khusus untuk membentuk generasi Qurani yang cerdas dan berkarakter
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a href="/programs" className="btn-primary inline-flex items-center gap-2 group">
            <span>Lihat Semua Program</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

