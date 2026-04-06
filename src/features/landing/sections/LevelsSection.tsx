import React from 'react';
import { UnitCardCircular } from '../../unit/components/UnitCardCircular';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';

export function LevelsSection() {
  const { onNavigate } = useNavigationMenu();

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4">Jenjang Pendidikan</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Pilih jenjang pendidikan sesuai kebutuhan putra dan putri Anda
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          <UnitCardCircular
            name="PGIT - TKIT"
            icon="/uploads/logos/TK.webp"
            color="#10B981"
            onClick={() => onNavigate('tkit')}
          />
          <UnitCardCircular
            name="SDIT"
            icon="/uploads/logos/SD.webp"
            color="#3B82F6"
            onClick={() => onNavigate('sdit')}
          />
          <UnitCardCircular
            name="SMPIT"
            icon="/uploads/logos/SMP.webp"
            color="#F97316"
            onClick={() => onNavigate('smpit')}
          />
          <UnitCardCircular
            name="SMAIT"
            icon="/uploads/logos/SMA.webp"
            color="#8B5CF6"
            onClick={() => onNavigate('smait')}
          />
          <UnitCardCircular
            name="SLBIT"
            icon="/uploads/logos/SLB.webp"
            color="#14B8A6"
            onClick={() => onNavigate('slbit')}
          />
          <UnitCardCircular
            name="Asrama"
            icon="/uploads/logos/ASRAMA.webp"
            color="#D4AF37"
            onClick={() => onNavigate('asrama')}
            imageClassName="p-5"
            className="gap-0"
            titleClassName="-mt-4 mb-2"
          />
        </div>
      </div>
    </section>
  );
}
