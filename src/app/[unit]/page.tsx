import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type UnitKey = 'tkit' | 'sdit' | 'smpit' | 'smait' | 'slbit' | 'asrama';

const unitSlugs: UnitKey[] = ['tkit', 'sdit', 'smpit', 'smait', 'slbit', 'asrama'];

const UNIT_CONFIG: Record<UnitKey, { fullName: string; icon: string }> = {
  tkit: { fullName: 'PGIT - TKIT', icon: '/uploads/logos/TK.webp' },
  sdit: { fullName: 'SDIT', icon: '/uploads/logos/SD.webp' },
  smpit: { fullName: 'SMPIT', icon: '/uploads/logos/SMP.webp' },
  smait: { fullName: 'SMAIT', icon: '/uploads/logos/SMA.webp' },
  slbit: { fullName: 'SLBIT', icon: '/uploads/logos/SLB.webp' },
  asrama: { fullName: 'Asrama', icon: '/uploads/logos/Asrama.webp' }
};

function getUnitConfig(unit: string) {
  return UNIT_CONFIG[unit as UnitKey];
}

function UnitSchoolClient(props: { fullName: string; icon: string; unitSlug: string }) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <img src={props.icon} alt={props.fullName} className="w-24 h-24 object-contain mb-6" />
      <h1 className="text-3xl md:text-5xl mb-3">{props.fullName}</h1>
      <p className="text-gray-600">Halaman profil untuk unit: {props.unitSlug.toUpperCase()}</p>
    </main>
  );
}

export function generateStaticParams() {
  return unitSlugs.map((unit) => ({
    unit: unit,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const { unit } = await params;
  const config = getUnitConfig(unit);
  if (!config) {
    return {};
  }
  return {
    title: `${config.fullName}`,
    icons: {
      icon: [{ url: config.icon }],
      apple: [{ url: config.icon }],
      shortcut: [{ url: config.icon }]
    }
  };
}

export default async function UnitPage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;
  const config = getUnitConfig(unit);

  if (!config) {
    notFound();
  }

  return <UnitSchoolClient {...config} unitSlug={unit} />;
}
