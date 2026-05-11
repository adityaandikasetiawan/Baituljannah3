'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const AdminDashboardPage = dynamic(() => import('../../../admin/dashboard/page'), { ssr: false });
const AdminGalleryPage = dynamic(() => import('../../../admin/gallery/page'), { ssr: false });
const AdminNewsPage = dynamic(() => import('../../../admin/news/page'), { ssr: false });
const AdminAchievementPage = dynamic(() => import('../../../admin/achievement/page'), { ssr: false });
const AdminProgramsPage = dynamic(() => import('../../../admin/programs/page'), { ssr: false });
const AdminPpdbPage = dynamic(() => import('../../../admin/ppdb/page'), { ssr: false });
const AdminCmsPage = dynamic(() => import('../../../admin/cms/page'), { ssr: false });

export default function UnitAdminRouterPage({
  params,
}: {
  params: Promise<{ unit: string; path?: string[] }>;
}) {
  const router = useRouter();
  const { unit, path } = React.use(params);
  const unitSlug = String(unit || '').toLowerCase();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    const getCookie = (name: string) => {
      const cookieStr = document.cookie || '';
      const parts = cookieStr.split(';').map((p) => p.trim());
      const prefix = `${encodeURIComponent(name)}=`;
      for (const part of parts) {
        if (part.startsWith(prefix)) return decodeURIComponent(part.slice(prefix.length));
        if (part.startsWith(`${name}=`)) return decodeURIComponent(part.slice(`${name}=`.length));
      }
      return null;
    };

    const token = localStorage.getItem('baituljannah_token') || getCookie('token');
    const role = getCookie('role');
    const portal = getCookie('portal');
    if (!token || role !== 'admin' || portal !== unitSlug) {
      try {
        localStorage.removeItem('baituljannah_token');
        localStorage.removeItem('baituljannah_user');
      } catch {}
      const hostname = window.location.hostname.toLowerCase();
      const isUnitSubdomain =
        hostname === 'smpitbaituljannah.sch.id' ||
        hostname === 'www.smpitbaituljannah.sch.id' ||
        hostname === 'smaitbaituljannah.sch.id' ||
        hostname === 'www.smaitbaituljannah.sch.id';
      router.replace(isUnitSubdomain ? '/login' : `/${unitSlug}/login`);
      return;
    }
    setIsAuthorized(true);
  }, [router, unitSlug]);

  if (!isAuthorized) return null;

  const section = path?.[0] || 'dashboard';
  const allowedSections = new Set(['dashboard', 'news', 'gallery', 'achievement', 'programs', 'ppdb', 'cms']);
  if (!allowedSections.has(section)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-soft p-8 text-center max-w-md w-full">
          <h1 className="text-xl font-semibold mb-2">Akses dibatasi</h1>
          <p className="text-gray-600">Menu admin ini belum tersedia untuk unit.</p>
        </div>
      </div>
    );
  }

  if (section === 'dashboard') return <AdminDashboardPage />;
  if (section === 'gallery') return <AdminGalleryPage />;
  if (section === 'news') return <AdminNewsPage />;
  if (section === 'achievement') return <AdminAchievementPage />;
  if (section === 'programs') return <AdminProgramsPage />;
  if (section === 'ppdb') return <AdminPpdbPage />;
  if (section === 'cms') return <AdminCmsPage />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-soft p-8 text-center max-w-md w-full">
        <h1 className="text-xl font-semibold mb-2">Halaman tidak ditemukan</h1>
        <p className="text-gray-600">Menu admin ini belum tersedia untuk unit.</p>
      </div>
    </div>
  );
}
