import React from 'react';
import { Star } from 'lucide-react';

export function WhyChooseUsSection() {
  const whyChooseUs = [
    {
      title: 'Kurikulum Terpadu',
      description:
        'Mengintegrasikan kurikulum nasional dengan nilai-nilai Islam untuk membentuk akhlak mulia.',
    },
    {
      title: 'Pembinaan Tahfidz',
      description:
        'Program tahfidz yang terstruktur untuk membiasakan interaksi harian dengan Al-Qur’an.',
    },
    {
      title: 'Guru Profesional',
      description:
        'Tenaga pendidik berpengalaman dan tersertifikasi dengan pendekatan belajar yang humanis.',
    },
    {
      title: 'Fasilitas Lengkap',
      description:
        'Sarana pembelajaran modern dan lingkungan yang aman serta nyaman.',
    },
    {
      title: 'Program Karakter',
      description:
        'Pembinaan karakter islami melalui berbagai kegiatan rutin dan pembiasaan.',
    },
    {
      title: 'Kegiatan Ekstrakurikuler',
      description:
        'Beragam pilihan ekstrakurikuler yang menunjang minat dan bakat siswa.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4AB8]/10 rounded-full text-[#1E4AB8] text-sm mb-6">
            <Star className="w-4 h-4" />
            <span>Keunggulan Kami</span>
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4">Mengapa Memilih Baituljannah?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pendidikan Islam terpadu dengan standar berkualitas tinggi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <div key={index} className="group">
              <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 h-full border border-gray-100 hover:border-[#1E4AB8]/20">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="w-8 h-8 text-white text-xl">★</span>
                </div>
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

