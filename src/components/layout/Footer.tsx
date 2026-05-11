import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Music2 } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  logo?: string;
  siteName: string;
  siteTagline?: string;
  accentColor?: string;
  onNavigate?: (page: string) => void;
  menuItems?: any;
}

export const Footer: React.FC<FooterProps> = ({ logo, siteName, siteTagline = 'Sekolahnya Para Juara', accentColor = '#1E4AB8', onNavigate = () => {} }) => {
  const resolvedLogoSrc = React.useMemo(() => {
    const input = logo?.trim();
    if (!input) return '/uploads/logos/Yayasan.webp';
    if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('data:') || input.startsWith('/')) {
      return input;
    }
    return `/uploads/logos/${input}`;
  }, [logo]);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container-custom px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <Image src={resolvedLogoSrc} alt={siteName} width={48} height={48} className="w-full h-full object-contain" unoptimized />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">{siteName}</h3>
                <p className="text-xs text-gray-400">{siteTagline}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Lembaga pendidikan Islam terpadu yang berkomitmen membentuk generasi Qur'ani, berakhlak mulia, dan berprestasi.
            </p>
            {/* Accreditation Badge */}
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center font-bold text-gray-900 text-xs">
                A
              </div>
              <div>
                <p className="text-xs text-white font-medium">Terakreditasi A</p>
                <p className="text-xs text-gray-400">BAN-S/M</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-left text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-white"></span>
                  Tentang Kami
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-left text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-white"></span>
                  Kurikulum
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-left text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-white"></span>
                  Berita
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-left text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-white"></span>
                  Galeri Foto
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('achievement')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-left text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-white"></span>
                  Prestasi
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-left text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-white"></span>
                  Karir
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admission')} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-left text-sm flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-white"></span>
                  PPDB
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Kontak Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">Jl. Pramuka No.43, Kemiling Permai, Kec. Kemiling, Kota Bandar Lampung, Lampung 35153</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div>
                  <a href="tel:0721273781" className="text-gray-400 hover:text-white text-sm block transition-colors">
                    (0721) 273781
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">- (belum ada email khusus)</span>
              </li>
            </ul>

            {/* Office Hours */}
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Jam Operasional:</p>
              <p className="text-sm text-white">Senin - Jumat: 07:00 - 16:00</p>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              <a 
                href="https://www.facebook.com/share/18b2DkbgrE/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1 shadow-lg"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/baituljannahislamicschool?igsh=MWdyOTl0MWJicm42YQ==" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1 shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com/@baituljannahislamicschool?si=7PCsnrV2_bPQGwY4" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1 shadow-lg"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@yayasanbaituljannah?_r=1&_t=ZS-95Iq1j6JXTL" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all transform hover:scale-110 hover:-translate-y-1 shadow-lg"
              >
                <Music2 className="w-5 h-5" />
              </a>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-3 font-medium">Subscribe Newsletter</p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all text-white placeholder-gray-500"
                />
                <button 
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-lg transform hover:-translate-y-0.5" 
                  style={{ backgroundColor: accentColor }}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Dapatkan berita dan update terbaru dari kami</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © 2025 Yayasan Baituljannah. All rights reserved. Made with ❤️ in Indonesia
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
