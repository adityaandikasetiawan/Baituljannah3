
'use client';

import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Award, BookOpen, Heart, Target, Building2, Shield, Sparkles, CheckCircle, Star, Zap } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function AboutPage() {
  const { menuItems, onNavigate } = useNavigationMenu();
  const [assetVersion, setAssetVersion] = React.useState('1');

  React.useEffect(() => {
    const buildId = (window as any)?.__NEXT_DATA__?.buildId;
    setAssetVersion(buildId || String(Date.now()));
  }, []);

  const withVersion = (src: string) => (src.includes('?') ? `${src}&v=${assetVersion}` : `${src}?v=${assetVersion}`);

  const breadcrumbItems = [
    { label: 'Beranda', onClick: () => onNavigate('main') },
    { label: 'Tentang Kami' }
  ];

  const values = [
    {
      icon: BookOpen,
      title: 'Pendidikan Berkualitas',
      description: 'Memberikan pendidikan Islam terpadu dengan standar nasional dan internasional yang unggul',
      color: '#3B82F6',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Heart,
      title: 'Kasih Sayang',
      description: 'Mendidik dengan penuh kasih sayang dan perhatian terhadap setiap individu siswa',
      color: '#EF4444',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      icon: Award,
      title: 'Prestasi Gemilang',
      description: 'Menghasilkan lulusan yang berprestasi dalam bidang akademik dan non-akademik',
      color: '#F59E0B',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: Shield,
      title: 'Karakter Islami',
      description: 'Membentuk karakter yang berakhlakul karimah berdasarkan Al-Quran dan As-Sunnah',
      color: '#10B981',
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  const facilities = [
    {
      title: 'Ruang Kelas Modern',
      description: 'Ruang kelas ber-AC dengan fasilitas multimedia dan kapasitas optimal untuk pembelajaran efektif',
      icon: Building2,
      color: '#3B82F6'
    },
    {
      title: 'Laboratorium Lengkap',
      description: 'Lab komputer, sains, dan bahasa dengan peralatan modern untuk praktikum siswa',
      icon: Zap,
      color: '#10B981'
    },
    {
      title: 'Kolam Renang',
      description: 'Kolam Renang yang mendukung kegiatan olahraga serta pengembangan prestasi siswa di bidang renang.',
      icon: BookOpen,
      color: '#8B5CF6'
    },
    {
      title: 'Masjid Megah',
      description: 'Masjid dengan kapasitas besar untuk ibadah berjamaah dan kegiatan keagamaan',
      icon: Heart,
      color: '#10B981'
    },
    {
      title: 'Lapangan Olahraga',
      description: 'Area olahraga lengkap termasuk lapangan futsal, basket, dan fasilitas olahraga lainnya',
      icon: Target,
      color: '#F97316'
    },
    {
      title: 'Kantin Sehat',
      description: 'Kantin dengan menu halal, bergizi, dan higienis untuk kebutuhan nutrisi siswa',
      icon: Star,
      color: '#F59E0B'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Baitul Jannah Islamic School"
        siteTagline="Sekolahnya Para Juara"
        menuItems={menuItems}
        accentColor="#1E4AB8"
      />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1E4AB8] via-[#2563eb] to-[#8B5CF6] text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="container-custom relative z-10">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
              <Building2 className="w-4 h-4" />
              <span>Profil Yayasan</span>
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Tentang Baituljannah</h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Yayasan pendidikan Islam terpadu yang berkomitmen mencetak generasi Qur'ani yang berakhlak mulia, cerdas, dan berprestasi
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Sejarah Kami</span>
              </div>
              <h2 className="text-4xl mb-6 text-gray-900">Perjalanan Yayasan Baituljannah</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-[#1E4AB8]">Yayasan Baituljannah</strong> didirikan pada tahun 2010 dengan visi menjadi lembaga pendidikan Islam terpadu yang unggul dan berkarakter. Berawal dari TKIT dengan 50 siswa, kini telah berkembang menjadi 5 unit pendidikan dengan lebih dari 2000 siswa.
                </p>
                <p>
                  Dalam perjalanannya, Baituljannah terus berinovasi mengembangkan metode pembelajaran yang mengintegrasikan kurikulum nasional dengan nilai-nilai Islam. Prestasi demi prestasi berhasil diraih oleh siswa-siswa kami di berbagai kompetisi tingkat lokal, nasional, hingga internasional.
                </p>
                <p>
                  Dengan dukungan tenaga pendidik profesional dan fasilitas modern, Baituljannah berkomitmen untuk terus memberikan pendidikan berkualitas yang melahirkan generasi Qur'ani yang siap menghadapi tantangan masa depan.
                </p>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <h3 className="text-xl mb-4 text-gray-900">Komitmen Kami</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pendidikan berkualitas dengan standar nasional dan internasional</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pembentukan karakter Islami yang kuat dan berakhlak mulia</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Fasilitas modern dan lingkungan belajar yang kondusif</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Prestasi akademik dan non-akademik yang membanggakan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                <ImageWithFallback
                  src={withVersion('/uploads/images/about_section/baituljnnah1.png')}
                  alt="Gedung Baituljannah"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl mb-2">Kampus Modern & Islami</h3>
                  <p className="text-white/90">Lingkungan belajar yang nyaman dan kondusif</p>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-strong max-w-xs">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl text-gray-900">200+</p>
                    <p className="text-sm text-gray-600">Prestasi Diraih</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Berbagai kompetisi tingkat nasional & internasional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 rounded-full text-sm mb-6">
              <Heart className="w-4 h-4" />
              <span>Nilai-Nilai Kami</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">Pilar Pendidikan Kami</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Empat pilar utama yang menjadi fondasi dalam setiap aspek pendidikan di Baituljannah
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                  
                  {/* Islamic Pattern */}
                  <div className="absolute inset-0 islamic-pattern opacity-5"></div>
                  
                  <div className="relative">
                    <div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm mb-6">
              <Building2 className="w-4 h-4" />
              <span>Fasilitas Lengkap</span>
            </div>
            <h2 className="text-4xl lg:text-5xl mb-4 text-gray-900">Fasilitas Modern</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Berbagai fasilitas penunjang pembelajaran yang modern dan lengkap untuk kenyamanan siswa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all duration-300"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: facility.color + '20' }}
                  >
                    <Icon className="w-7 h-7" style={{ color: facility.color }} />
                  </div>
                  <h3 className="text-lg mb-2 text-gray-900">{facility.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{facility.description}</p>
                </div>
              );
            })}
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={withVersion('/uploads/images/about_section/about1.webp')}
                alt="Pembelajaran di Kelas"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={withVersion('/uploads/images/about_section/baituljnnah3.jpeg')}
                alt="Lapangan Upacara Yang Luas"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] text-white">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Kolaborasi & Sponsorship</span>
          </div>
          <h3 className="text-2xl md:text-3xl mb-3">Dukung Program Pendidikan Kami</h3>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            Mari berkolaborasi untuk menghadirkan pendidikan terbaik bagi generasi Qur&apos;ani melalui program sponsorship dan kemitraan strategis.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-full bg-white text-[#1E4AB8] font-medium hover:bg-gray-100 transition-colors"
          >
            Hubungi Kami
          </button>
        </div>
      </section>

      <Footer 
        siteName="Baitul Jannah Islamic School"
        accentColor="#1E4AB8"
        onNavigate={onNavigate}
      />
    </div>
  );
}
