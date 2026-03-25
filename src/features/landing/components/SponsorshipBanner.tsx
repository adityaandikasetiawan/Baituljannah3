import React from 'react';
import { Heart, Sparkles, ArrowRight, HandHeart, Trophy } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SponsorshipBannerProps {
  onNavigate?: (page: string) => void;
}

export const SponsorshipBanner: React.FC<SponsorshipBannerProps> = ({ onNavigate = () => {} }) => {
  // Sponsor logos - bisa diganti dengan logo sponsor asli
  const sponsors = [
    {
      name: 'Bank Syariah Indonesia',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop',
      category: 'Platinum'
    },
    {
      name: 'Pertamina',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
      category: 'Gold'
    },
    {
      name: 'Telkom Indonesia',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop',
      category: 'Gold'
    },
    {
      name: 'Bank Mandiri',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop',
      category: 'Silver'
    }
  ];

  // Duplicate sponsors for infinite scroll effect
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E4AB8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-[#1E4AB8] text-sm mb-6 shadow-soft">
            <HandHeart className="w-5 h-5" />
            <span>Partner & Sponsor</span>
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4">
            Didukung Oleh <span className="text-[#1E4AB8]">Partner Terpercaya</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Terima kasih kepada para sponsor dan partner yang telah mendukung visi misi pendidikan Yayasan Baituljannah
          </p>
        </div>

        {/* Infinite Scrolling Sponsors */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            <div className="sponsor-scroll flex gap-8 items-center">
              {duplicatedSponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 group"
                >
                  <div className="w-48 h-32 bg-white rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 flex items-center justify-center p-6 border border-gray-100 group-hover:border-[#1E4AB8]/30 group-hover:scale-105">
                    {/* Logo Placeholder - Replace with actual logos */}
                    <div className="text-center">
                      <div className="w-32 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-2 group-hover:from-[#1E4AB8]/20 group-hover:to-[#8B5CF6]/20 transition-all">
                        <span className="text-2xl">🏢</span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium truncate">{sponsor.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl shadow-strong p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center">
                <HandHeart className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#1E4AB8] mb-2">25+</p>
              <p className="text-gray-600">Partner Aktif</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#1E4AB8] mb-2">150+</p>
              <p className="text-gray-600">Siswa Terbantu</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#1E4AB8] mb-2">Rp 5M+</p>
              <p className="text-gray-600">Total Kontribusi</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#1E4AB8] mb-2">10 Tahun</p>
              <p className="text-gray-600">Kerjasama</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ingin menjadi partner atau sponsor Yayasan Baituljannah?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] text-white rounded-xl hover:shadow-strong transition-all flex items-center justify-center gap-2 group"
            >
              <HandHeart className="w-5 h-5" />
              <span>Hubungi Kami</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="px-8 py-4 border-2 border-[#1E4AB8] text-[#1E4AB8] rounded-xl hover:bg-[#1E4AB8] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span>Pelajari Program Partnership</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for infinite scroll animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .sponsor-scroll {
          animation: scroll 30s linear infinite;
        }

        .sponsor-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
