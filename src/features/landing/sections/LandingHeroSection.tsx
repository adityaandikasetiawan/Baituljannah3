import React from 'react';
import { HeroCarousel } from '../../landing/components/HeroCarousel';

export function LandingHeroSection() {
  const heroSlides = [
    {
      image: '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp',
      title: 'Yayasan Baituljannah',
      description: "Membentuk Generasi Qur'ani yang Cerdas, Berakhlak Mulia, dan Berprestasi Global",
      badge: '🕌 Pendidikan Islam Terpadu',
    },
    {
      image: '/uploads/hero/hero_1769592838236_ttv2yfpxyb.webp',
      title: 'Pendidikan Berkualitas',
      description: 'Mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Quran dan As-Sunnah',
      badge: '📚 Kurikulum Terpadu',
    },
    {
      image: '/uploads/hero/hero_1769592938397_uasnfj29w1q.webp',
      title: 'Prestasi Gemilang',
      description: 'Ratusan prestasi di tingkat lokal, nasional, dan internasional',
      badge: '🏆 Berprestasi',
    },
    {
      image: '/uploads/hero/hero_1769593124943_do23x9kv1ge.webp',
      title: 'Fasilitas Modern',
      description: 'Dilengkapi dengan fasilitas pembelajaran yang modern dan mendukung',
      badge: '🏫 Fasilitas Lengkap',
    },
    {
      image: '/uploads/hero/hero_1769593247476_0fgygpdcpabt.webp',
      title: 'Guru Profesional',
      description: 'Tenaga pendidik yang kompeten, berpengalaman, dan berdedikasi tinggi',
      badge: '👨‍🏫 Pendidik Berpengalaman',
    },
    {
      image: '/uploads/hero/hero_1769656548631_nnkh2yt4ix.webp',
      title: 'Lingkungan Islami',
      description: 'Membangun karakter dan akhlak mulia dalam suasana pembelajaran yang kondusif',
      badge: '🕋 Akhlak & Adab',
    },
  ];

  return (
    <HeroCarousel slides={heroSlides} />
  );
}
