'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/layout/Navbar';
import { Footer } from '../../../components/layout/Footer';
import { getUnitConfig } from '../../../features/unit/unit-config';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Mail, Sparkles } from 'lucide-react';

export default function UnitKontakPage({ params }: { params: Promise<{ unit: string }> }) {
  const router = useRouter();
  const { unit: slug } = React.use(params);
  const config = getUnitConfig(slug);
  const apiBaseUrl = React.useMemo(() => {
    const base = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '');
    if (typeof window === 'undefined') return base;
    const hostname = window.location.hostname.toLowerCase();
    if (
      hostname === 'smaitbaituljannah.sch.id' ||
      hostname === 'www.smaitbaituljannah.sch.id' ||
      hostname === 'smpitbaituljannah.sch.id' ||
      hostname === 'www.smpitbaituljannah.sch.id'
    ) {
      return 'https://baituljannah.sch.id/api/v1';
    }
    return base;
  }, []);
  const [cmsContent, setCmsContent] = React.useState<any | null>(null);
  const isAsrama = slug === 'asrama';
  const staffMenuLabel = isAsrama ? 'Musyrif & Musyrifah' : 'Guru & Staff';
  const curriculumMenuLabel = isAsrama ? 'Program' : 'Kurikulum';

  const menuItems = [
    { label: 'Beranda', href: '#', onClick: () => router.push(`/${slug}`) },
    { label: 'Profil', href: '#', onClick: () => router.push(`/${slug}/profil`) },
    { label: curriculumMenuLabel, href: '#', onClick: () => router.push(`/${slug}/kurikulum`) },
    { label: staffMenuLabel, href: '#', onClick: () => router.push(`/${slug}/guru-staff`) },
    {
      label: 'Info',
      href: '#',
      submenu: [
        { label: 'Berita', href: '#', onClick: () => router.push(`/${slug}/berita`) },
        { label: 'Galeri', href: '#', onClick: () => router.push(`/${slug}/galeri`) },
      ],
    },
    { label: 'PPDB', href: '#', onClick: () => router.push(`/${slug}/ppdb`) },
    { label: 'Kontak', href: '#', onClick: () => router.push(`/${slug}/kontak`) }
  ];

  React.useEffect(() => {
    const unitCode = String(slug || '').trim().toUpperCase();
    if (!unitCode || unitCode === 'ASRAMA') {
      setCmsContent(null);
      return;
    }
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/unit-pages?unit_code=${encodeURIComponent(unitCode)}&page_key=kontak`, { signal: controller.signal })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.success) throw new Error(json?.message || 'Gagal memuat CMS');
        setCmsContent(json?.data?.content || null);
      })
      .catch(() => setCmsContent(null));
    return () => controller.abort();
  }, [apiBaseUrl, slug]);

  if (!config) return null;

  const heroImage = '/uploads/hero/hero_1769592571870_m7ehtcua18j.webp';

  const unitContacts: Record<
    string,
    { phone: string; email: string; whatsapp?: string; addressLines: string[]; hours: string[] }
  > = {
    tkit: {
      phone: '(0721) 273781',
      email: '-',
      addressLines: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
      hours: ['Senin - Jumat: 07:00 - 16:00'],
    },
    sdit: {
      phone: '(0721) 273781',
      email: '-',
      addressLines: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
      hours: ['Senin - Jumat: 07:00 - 16:00'],
    },
    smpit: {
      phone: '(0721) 273781',
      email: '-',
      addressLines: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
      hours: ['Senin - Jumat: 07:00 - 16:00'],
    },
    smait: {
      phone: '(0721) 273781',
      email: '-',
      addressLines: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
      hours: ['Senin - Jumat: 07:00 - 16:00'],
    },
    slbit: {
      phone: '(0721) 273781',
      email: '-',
      addressLines: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
      hours: ['Senin - Jumat: 07:00 - 16:00'],
    },
    asrama: {
      phone: '(0721) 273781',
      email: '-',
      addressLines: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
      hours: ['Senin - Jumat: 07:00 - 16:00'],
    },
  };

  const baseContact = unitContacts[slug] ?? {
    phone: '(0721) 273781',
    email: '-',
    addressLines: ['Jl. Pramuka No.43, Kemiling Permai', 'Kec. Kemiling, Kota Bandar Lampung, Lampung 35153'],
    hours: ['Senin - Jumat: 07:00 - 16:00'],
  };

  const c = (() => {
    if (!cmsContent || typeof cmsContent !== 'object') return baseContact;
    return {
      ...baseContact,
      ...cmsContent,
      addressLines: Array.isArray(cmsContent?.addressLines) ? cmsContent.addressLines : baseContact.addressLines,
      hours: Array.isArray(cmsContent?.hours) ? cmsContent.hours : baseContact.hours,
    };
  })();

  const whatsappHref = c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/[^\d]/g, '')}` : undefined;
  const phoneHref = c.phone.replace(/[^\d+]/g, '');
  const visitTipByUnit: Record<string, { title: string; desc: string }> = {
    tkit: {
      title: 'Tips kunjungan TK',
      desc: 'Datang di jam 08.00–10.00 agar Ayah/Bunda bisa melihat circle time, tahfidz, dan sentra bermain.',
    },
    sdit: {
      title: 'Tips kunjungan SD',
      desc: 'Datang di jam 07.00–09.00 untuk melihat pembiasaan pagi, halaqah, dan kegiatan kelas.',
    },
    smpit: {
      title: 'Tips kunjungan SMP',
      desc: 'Datang di jam 07.00–09.00 untuk melihat pembiasaan dan suasana pembelajaran.',
    },
    smait: {
      title: 'Tips kunjungan SMA',
      desc: 'Datang di jam 08.00–10.00 untuk konsultasi program, prestasi, dan fasilitas pendukung.',
    },
    slbit: {
      title: 'Tips kunjungan SLB',
      desc: 'Disarankan membuat janji terlebih dahulu agar tim pendampingan dapat menyiapkan sesi konsultasi.',
    },
    asrama: {
      title: 'Tips kunjungan Asrama',
      desc: 'Konfirmasi jadwal kunjungan dan perizinan terlebih dahulu agar layanan lebih optimal.',
    },
  };
  const visitTip = (() => {
    const base = visitTipByUnit[slug];
    if (!cmsContent || typeof cmsContent !== 'object') return base;
    const t = cmsContent?.visitTip;
    if (!t || typeof t !== 'object') return base;
    const title = typeof t.title === 'string' ? t.title : base?.title;
    const desc = typeof t.desc === 'string' ? t.desc : base?.desc;
    if (!title && !desc) return base;
    return { title: title || '', desc: desc || '' };
  })();

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        logo={config.icon}
        siteName={config.fullName}
        accentColor={config.accentColor}
        menuItems={menuItems}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={heroImage} alt={config.fullName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 opacity-60" style={{ backgroundColor: config.accentColor }} />
        </div>

        <div className="container-custom px-4 md:px-8 relative z-10 py-16 md:py-24">
          <button
            onClick={() => router.push(`/${slug}`)}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm mb-8"
          >
            <span>←</span> Kembali ke Beranda Unit
          </button>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Kontak</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">Hubungi {config.unitName}</h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              Admin unit siap membantu informasi program, jadwal, dan PPDB.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${phoneHref}`}
                className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-opacity-90 transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Telepon</span>
              </a>
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
              <button
                onClick={() => router.push(`/${slug}/ppdb`)}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Info PPDB</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 -pb-8 -mt-6 relative z-20">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <MapPin className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Alamat</p>
                  <p className="text-xs text-gray-500">Lokasi sekolah</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {c.addressLines.map((line: any) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <Phone className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Telepon</p>
                  <p className="text-xs text-gray-500">Admin unit</p>
                </div>
              </div>
              <a href={`tel:${c.phone}`} className="text-sm font-semibold" style={{ color: config.accentColor }}>
                {c.phone}
              </a>
              {c.whatsapp && (
                <div className="mt-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm inline-flex items-center gap-2 font-semibold"
                    style={{ color: config.accentColor }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat WhatsApp</span>
                  </a>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <Mail className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-xs text-gray-500">Respon di jam kerja</p>
                </div>
              </div>
              {c.email === '-' ? (
                <div className="text-sm font-semibold break-words" style={{ color: config.accentColor }}>
                  - (belum ada email khusus)
                </div>
              ) : (
                <a href={`mailto:${c.email}`} className="text-sm font-semibold break-words" style={{ color: config.accentColor }}>
                  {c.email}
                </a>
              )}
            </div>

            <div className="bg-white rounded-2xl p-7 shadow-soft border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.accentColor}18` }}>
                  <Clock className="w-6 h-6" style={{ color: config.accentColor }} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Jam Operasional</p>
                  <p className="text-xs text-gray-500">Waktu layanan</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {c.hours.map((line: any) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-5"
                  style={{ backgroundColor: `${config.accentColor}14`, color: config.accentColor }}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Peta Lokasi</span>
                </div>
                <h2 className="text-3xl mb-3">Kunjungi {config.unitName}</h2>
                <p className="text-gray-600 leading-relaxed">
                  Silakan datang untuk observasi dan konsultasi program. Disarankan membuat jadwal terlebih dahulu agar layanan lebih optimal.
                </p>
                {visitTip && (
                  <div className="mt-6 bg-gray-50 rounded-2xl p-6">
                    <p className="text-sm font-semibold mb-1">{visitTip.title}</p>
                    <p className="text-sm text-gray-600">{visitTip.desc}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden min-h-[320px]">
              <iframe
                src="https://www.google.com/maps?q=Jl.%20Pramuka%20No.43%2C%20Kemiling%20Permai%2C%20Kec.%20Kemiling%2C%20Kota%20Bandar%20Lampung%2C%20Lampung%2035153&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title={`${config.unitName} Location`}
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer logo={config.icon} siteName={config.fullName} accentColor={config.accentColor} onNavigate={(p)=>router.push(typeof p==='string'?`/${p}`:String(p))} />
    </div>
  );
}
