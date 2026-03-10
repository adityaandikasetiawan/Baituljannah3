
'use client';

import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';
import { units, UnitData } from '../../data/unit-data';
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react';

// Client Component for the content
function UnitPageContent({ unit }: { unit: UnitData }) {
  const { onNavigate, menuItems } = useNavigationMenu();

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        accentColor={unit.color}
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={unit.heroImage}
            alt={unit.fullName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" style={{ backgroundColor: `${unit.color}80` }}></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <img 
            src={unit.icon} 
            alt="Logo" 
            className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 drop-shadow-lg bg-white/10 rounded-full p-4 backdrop-blur-sm"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{unit.fullName}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 font-light">
            {unit.description}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-xl p-8 text-center transform hover:-translate-y-1 transition-transform">
              <h3 className="text-4xl font-bold mb-2" style={{ color: unit.color }}>{unit.stats.students}+</h3>
              <p className="text-gray-600 font-medium">Siswa Aktif</p>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-8 text-center transform hover:-translate-y-1 transition-transform">
              <h3 className="text-4xl font-bold mb-2" style={{ color: unit.color }}>{unit.stats.teachers}+</h3>
              <p className="text-gray-600 font-medium">Guru Dedikatif</p>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-8 text-center transform hover:-translate-y-1 transition-transform">
              <h3 className="text-4xl font-bold mb-2" style={{ color: unit.color }}>{unit.stats.graduates}+</h3>
              <p className="text-gray-600 font-medium">Alumni Sukses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Headmaster Message */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={unit.headmaster.image}
                  alt={unit.headmaster.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h4 className="text-white text-xl font-bold">{unit.headmaster.name}</h4>
                  <p className="text-white/80 text-sm">Kepala Sekolah</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <Quote className="w-16 h-16 mb-6 opacity-20" style={{ color: unit.color }} />
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Sambutan Kepala Sekolah</h2>
              <blockquote className="text-xl md:text-2xl text-gray-600 italic leading-relaxed mb-8">
                "{unit.headmaster.message}"
              </blockquote>
              <div className="flex gap-4">
                <button 
                  className="px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  style={{ backgroundColor: unit.color }}
                  onClick={() => onNavigate('contact')}
                >
                  Hubungi Kami
                </button>
                <button 
                  className="px-8 py-3 rounded-full bg-white border-2 font-semibold shadow-sm hover:bg-gray-50 transition-colors"
                  style={{ borderColor: unit.color, color: unit.color }}
                  onClick={() => onNavigate('programs')}
                >
                  Lihat Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-wider uppercase mb-2 block" style={{ color: unit.color }}>Program Unggulan</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Keunggulan {unit.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {unit.programs.map((program, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:text-white" style={{ backgroundColor: `${unit.color}20`, color: unit.color }}>
                  {React.createElement(program.icon, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#1E4AB8] transition-colors">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${unit.icon})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Fasilitas Penunjang</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Kami menyediakan fasilitas lengkap dan modern untuk mendukung proses pembelajaran yang efektif, nyaman, dan menyenangkan bagi seluruh siswa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {unit.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span className="font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {unit.gallery.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Fasilitas ${unit.name} ${index + 1}`} 
                    className={`rounded-2xl w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity ${
                      index === 1 ? 'translate-y-8' : index === 2 ? '-translate-y-8' : ''
                    }`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Siap Bergabung dengan {unit.name}?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Daftarkan putra-putri Anda sekarang dan jadilah bagian dari keluarga besar Baitul Jannah Islamic School.
          </p>
          <button
            onClick={() => onNavigate('admission')}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            style={{ backgroundColor: unit.color }}
          >
            Daftar Sekarang <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Main Page Component
export default function UnitPage({ params }: { params: Promise<{ unit: string }> }) {
  const { onNavigate, menuItems } = useNavigationMenu();
  const resolvedParams = React.use(params);
  const { unit: unitSlug } = resolvedParams;
  const unitData = units[unitSlug];

  if (!unitData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          siteName="Baitul Jannah Islamic School"
          siteTagline="Sekolahnya Para Juara"
          accentColor="#1E4AB8"
          menuItems={menuItems}
        />
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Halaman Tidak Ditemukan</h1>
            <p className="text-lg text-gray-600 mb-10">Unit pendidikan yang Anda cari tidak tersedia.</p>
            <button
              onClick={() => onNavigate('main')}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-[#1E4AB8]"
            >
              Kembali ke Beranda <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return <UnitPageContent unit={unitData} />;
}
