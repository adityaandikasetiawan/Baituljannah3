import React from 'react';
import { notFound } from 'next/navigation';
import { UnitSchoolClient } from '../../features/unit/components/UnitSchoolClient';

const unitConfigs: Record<string, any> = {
  tkit: {
    unitName: 'TKIT',
    fullName: 'TKIT Baituljannah',
    accentColor: '#10B981',
    icon: '/uploads/logos/TK.webp',
    description: 'Pendidikan anak usia dini berbasis Islam dengan metode pembelajaran yang menyenangkan dan mengembangkan potensi anak secara optimal melalui pendekatan holistik.'
  },
  sdit: {
    unitName: 'SDIT',
    fullName: 'SDIT Baituljannah',
    accentColor: '#3B82F6',
    icon: '/uploads/logos/SD.webp',
    description: 'Sekolah Dasar Islam Terpadu dengan kurikulum nasional plus pendidikan agama Islam yang komprehensif untuk membentuk generasi Qur\'ani yang cerdas dan berakhlak mulia.'
  },
  smpit: {
    unitName: 'SMPIT',
    fullName: 'SMPIT Baituljannah',
    accentColor: '#F97316',
    icon: '/uploads/logos/SMP.webp',
    description: 'Sekolah Menengah Pertama Islam Terpadu yang mengintegrasikan ilmu pengetahuan dengan nilai-nilai Islam untuk membentuk remaja yang berkarakter dan berprestasi.'
  },
  smait: {
    unitName: 'SMAIT',
    fullName: 'SMAIT Baituljannah',
    accentColor: '#8B5CF6',
    icon: '/uploads/logos/SMA.webp',
    description: 'Sekolah Menengah Atas Islam Terpadu yang mempersiapkan siswa menjadi pemimpin masa depan yang berakhlak mulia, cerdas, dan siap menghadapi tantangan global.'
  },
  slbit: {
    unitName: 'SLBIT',
    fullName: 'SLBIT Baituljannah',
    accentColor: '#14B8A6',
    icon: '/uploads/logos/SLB.webp',
    description: 'Sekolah Luar Biasa Islam Terpadu yang memberikan pendidikan inklusif dengan perhatian khusus untuk setiap siswa berkebutuhan khusus dengan kasih sayang dan profesionalisme.'
  }
};

export function generateStaticParams() {
  return Object.keys(unitConfigs).map((unit) => ({
    unit: unit,
  }));
}

export default async function UnitPage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;
  const config = unitConfigs[unit];

  if (!config) {
    notFound();
  }

  return <UnitSchoolClient {...config} />;
}

