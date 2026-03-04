import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { UnitSchoolClient } from '../../features/unit/components/UnitSchoolClient';
import { getUnitConfig, unitSlugs } from '../../features/unit/unit-config';

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
