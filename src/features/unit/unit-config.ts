export type UnitConfig = {
  unitName: string;
  fullName: string;
  accentColor: string;
  icon: string;
  description: string;
};

const unitConfigs: Record<string, UnitConfig> = {
  tkit: {
    unitName: 'TKIT',
    fullName: 'TKIT Baituljannah',
    accentColor: '#10B981',
    icon: '/uploads/logos/TK.webp',
    description:
      "Pendidikan anak usia dini berbasis Islam dengan metode pembelajaran yang menyenangkan dan holistik.",
  },
  sdit: {
    unitName: 'SDIT',
    fullName: 'SDIT Baituljannah',
    accentColor: '#3B82F6',
    icon: '/uploads/logos/SD.webp',
    description:
      "Sekolah Dasar Islam Terpadu dengan kurikulum nasional plus pendidikan agama Islam yang komprehensif.",
  },
  smpit: {
    unitName: 'SMPIT',
    fullName: 'SMPIT Baituljannah',
    accentColor: '#F97316',
    icon: '/uploads/logos/SMP.webp',
    description:
      "Sekolah Menengah Pertama Islam Terpadu yang mengintegrasikan ilmu pengetahuan dengan nilai-nilai Islam.",
  },
  smait: {
    unitName: 'SMAIT',
    fullName: 'SMAIT Baituljannah',
    accentColor: '#8B5CF6',
    icon: '/uploads/logos/SMA.webp',
    description:
      "Sekolah Menengah Atas Islam Terpadu yang mempersiapkan siswa menjadi pemimpin masa depan.",
  },
  slbit: {
    unitName: 'SLBIT',
    fullName: 'SLBIT Baituljannah',
    accentColor: '#14B8A6',
    icon: '/uploads/logos/SLB.webp',
    description:
      "Sekolah Luar Biasa Islam Terpadu yang memberikan pendidikan inklusif untuk kebutuhan khusus.",
  },
  asrama: {
    unitName: 'Asrama',
    fullName: 'Boarding School Baituljannah',
    accentColor: '#D4AF37',
    icon: '/uploads/logos/Asrama.webp',
    description:
      "Program asrama yang membentuk karakter mandiri, disiplin, dan religius dalam lingkungan yang kondusif.",
  },
};

export const getUnitConfig = (slug: string): UnitConfig | null => {
  return unitConfigs[slug] || null;
};

export const unitSlugs = Object.keys(unitConfigs);
