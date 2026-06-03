'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Users, Award, Heart, Star, Lightbulb, Target, Zap, Sparkles, CheckCircle } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function ProgramsPage() {
  const { onNavigate, menuItems } = useNavigationMenu();
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Program Pendidikan' }
  ];

  const programs = [
    {
      icon: Heart,
      number: '01',
      title: 'Islamic Studies',
      subtitle: 'Fondasi Karakter & Spiritual',
      color: '#10B981',
      tagColor: 'bg-emerald-100 text-emerald-700',
      intro: 'Di Baitul Jannah, pendidikan agama tidak dikotakkan dalam mata pelajaran semata, melainkan menjadi ruh yang menghidupkan seluruh aktivitas sekolah sebagai pandangan hidup (way of life).',
      paragraphs: [
        'Setiap mata pelajaran, baik Sains maupun Matematika, senantiasa dikaitkan dengan kebesaran Allah SWT untuk melahirkan kekaguman spiritual. Kami berfokus pada pembentukan kebiasaan (habit) ibadah—seperti shalat berjamaah, tilawah Al-Qur\'an, dan adab harian—bukan sebagai paksaan, melainkan kebutuhan.',
        'Muara dari aspek ini adalah terbentuknya akhlakul karimah, di mana siswa tumbuh menjadi pribadi yang sopan dalam bertutur dan santun dalam berperilaku, mencerminkan kepribadian Rasulullah SAW.'
      ],
      features: ['Tahfidz & tahsin terstruktur', 'Adab & pembiasaan ibadah', 'Bahasa Arab dasar', 'Mentoring ruhiyah']
    },
    {
      icon: Award,
      number: '02',
      title: 'Academic Excellence',
      subtitle: 'Keunggulan Akademik',
      color: '#F97316',
      tagColor: 'bg-orange-100 text-orange-700',
      intro: 'Kami percaya bahwa seorang Muslim yang kuat adalah mereka yang juga cerdas secara intelektual, sehingga aspek ini difokuskan pada pengembangan kognitif tingkat tinggi (Higher Order Thinking Skills).',
      paragraphs: [
        'Melalui metode pembelajaran aktif dan inovatif, siswa tidak hanya duduk mendengarkan ceramah, tetapi diajak berdiskusi, menganalisis studi kasus, dan berargumen secara logis di dalam kelas yang berfungsi sebagai laboratorium gagasan.',
        'Kurikulum ini dirancang secara matang agar siswa memiliki kompetensi global dan mampu bersaing di level nasional maupun internasional tanpa kehilangan jati diri dan nilai-nilai keislamannya.'
      ],
      features: ['Literasi & numerasi', 'Assessment berbasis capaian', 'Pembinaan olimpiade/kompetisi', 'Pembelajaran terarah & tuntas']
    },
    {
      icon: Users,
      number: '03',
      title: 'Interpersonal Skill',
      subtitle: 'Kecerdasan Sosial',
      color: '#8B5CF6',
      tagColor: 'bg-purple-100 text-purple-700',
      intro: 'Menyadari bahwa pintar saja tidak cukup, aspek ini melatih siswa untuk menjadi manusia yang kreatif, empatik, dan siap menghadapi era kolaborasi.',
      paragraphs: [
        'Siswa dilatih berkomunikasi secara efektif, mulai dari menyampaikan gagasan dengan runtut hingga berani berbicara di depan umum (public speaking). Melalui organisasi sekolah dan tugas kelompok, kami memupuk bibit kepemimpinan yang melayani (servant leadership) sekaligus mengasah kecerdasan emosional mereka.',
        'Tujuannya adalah agar siswa mampu mengelola emosi diri, memahami perasaan orang lain, dan membangun lingkungan pergaulan yang positif serta minim konflik.'
      ],
      features: ['Komunikasi efektif', 'Teamwork & kolaborasi', 'Leadership & tanggung jawab', 'Empati, disiplin, dan etika']
    },
    {
      icon: Target,
      number: '04',
      title: 'Entrepreneur',
      subtitle: 'Jiwa Kewirausahaan',
      color: '#F59E0B',
      tagColor: 'bg-amber-100 text-amber-700',
      intro: 'Aspek Entrepreneur di sini tidak semata-mata berarti mengajarkan siswa berdagang, melainkan menanamkan mindset kemandirian, kreativitas, dan keberanian mengambil risiko yang terukur.',
      paragraphs: [
        'Kami melatih siswa untuk jeli melihat masalah di lingkungan sekitar sebagai peluang menciptakan solusi inovatif.',
        'Lebih dari itu, kurikulum ini menanamkan ketangguhan (resilience)—sikap pantang menyerah dan tahan banting—agar siswa tumbuh menjadi pribadi yang mandiri, tidak bergantung pada orang lain, dan proaktif menciptakan nilai tambah bagi lingkungannya.'
      ],
      features: ['Market day & bazar siswa', 'Project bisnis sederhana', 'Financial literacy', 'Kreativitas produk & layanan']
    },
    {
      icon: Lightbulb,
      number: '05',
      title: 'Project Based Learning',
      subtitle: 'Pembelajaran Berbasis Proyek',
      color: '#6366F1',
      tagColor: 'bg-indigo-100 text-indigo-700',
      intro: 'Teori di buku harus membumi, dan PJBL hadir sebagai jembatan antara pengetahuan di kepala dengan keterampilan tangan.',
      paragraphs: [
        'Siswa ditantang untuk mengerjakan proyek nyata yang mengintegrasikan berbagai mata pelajaran, seperti merancang pasar mini yang menggabungkan Matematika, Seni, dan Adab Jual Beli.',
        'Pendekatan ini memaksa siswa berpikir kritis (problem solving) dalam menghadapi tantangan konkret, sekaligus melatih kemampuan kolaborasi tim, pembagian peran, dan tanggung jawab demi mencapai kesuksesan bersama.'
      ],
      features: ['Proyek lintas mapel', 'Riset sederhana & eksperimen', 'Kolaborasi tim', 'Pameran/presentasi karya']
    },
    {
      icon: Zap,
      number: '06',
      title: 'ICT',
      subtitle: 'Literasi Digital',
      color: '#3B82F6',
      tagColor: 'bg-blue-100 text-blue-700',
      intro: 'Di era digital, kami menempatkan teknologi sebagai alat, bukan tujuan, mempersiapkan siswa agar menjadi "tuan" atas teknologi.',
      paragraphs: [
        'Fokus utamanya adalah literasi digital yang mendalam; siswa tidak hanya diajarkan mengoperasikan perangkat lunak dan keras terkini, tetapi juga cerdas memilah informasi serta memahami etika digital (netiquette).',
        'Kami mendorong penggunaan gadget dan internet sebagai sarana dakwah dan karya produktif, memastikan siswa siap menghadapi kebutuhan industri masa depan dengan tetap memegang teguh keamanan dan etika siber.'
      ],
      features: ['Digital literacy & safety', 'Produktivitas (tools belajar)', 'Coding dasar', 'Robotik/komputasi terapan']
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor="#1E4AB8"
        menuItems={menuItems}
        activePage="programs"
        onNavigate={onNavigate}
      />

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
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Panduan Implementasi & Filosofi</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                6 Aspects of Curriculum
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                Baitul Jannah Islamic School
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

        {/* Opening Statement */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Kurikulum di Baitul Jannah Islamic School tidak hanya dirancang untuk memenuhi standar nasional, 
              tetapi juga untuk menjawab tantangan zaman sekaligus menjaga kemurnian akidah.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Berdasarkan visi <span className="font-semibold text-gray-800">"Mempersiapkan Anak Menjadi Sholeh dan Unggul"</span>, 
              kami menerjemahkan proses pendidikan ke dalam enam pilar utama yang saling terintegrasi.
            </p>
          </div>
        </section>

        {/* Programs — Narasi Layout */}
        <section className="py-8 pb-20">
          <div className="max-w-3xl mx-auto px-4 space-y-20">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <article key={index} id={`program-${index}`}>
                  {/* Nomor & judul */}
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm mt-1"
                      style={{ backgroundColor: program.color }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
                        Aspek {program.number}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                        {program.title}
                      </h2>
                      <span className={`inline-block mt-1 text-xs font-medium px-3 py-1 rounded-full ${program.tagColor}`}>
                        {program.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Divider berwarna tipis */}
                  <div
                    className="h-px w-full mb-6 opacity-30"
                    style={{ backgroundColor: program.color }}
                  />

                  {/* Teks narasi */}
                  <p className="text-gray-700 text-base leading-relaxed font-medium mb-4">
                    {program.intro}
                  </p>
                  {program.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-gray-600 text-base leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}

                  {/* Poin-poin ringkas */}
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {program.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: program.color }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}

            {/* Penutup */}
            <div className="border-t border-gray-200 pt-12 text-center">
              <p className="text-gray-500 text-sm leading-relaxed italic max-w-2xl mx-auto">
                Keenam aspek ini tidak berjalan sendiri-sendiri, melainkan saling menopang satu sama lain 
                dalam keseharian siswa di Baitul Jannah Islamic School. Inilah komitmen kami untuk melahirkan 
                lulusan yang tidak hanya cerdas otaknya, tetapi juga bersih hatinya dan terampil tangannya.
              </p>
            </div>
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
