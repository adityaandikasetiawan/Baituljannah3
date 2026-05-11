import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LucideIcon, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';

interface MenuItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  submenu?: { label: string; href: string; onClick?: () => void; section?: string }[];
  badge?: string;
  section?: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  accentColor?: string;
  userRole?: string;
  userName?: string;
  siteName?: string;
  logo?: string;
  panelTitle?: string;
  panelSubtitle?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  accentColor = '#1E4AB8',
  userRole = 'Admin',
  userName = 'Admin',
  siteName,
  logo,
  panelTitle = siteName || 'Admin Panel',
  panelSubtitle = 'Baituljannah'
}) => {
  const router = useRouter();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [didLogoError, setDidLogoError] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const resolvedLogoSrc = useMemo(() => {
    const input = logo?.trim();
    if (!input) return '/uploads/logos/Yayasan.webp';
    if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('data:') || input.startsWith('/')) {
      return input;
    }
    return `/uploads/logos/${input}`;
  }, [logo]);

  useEffect(() => {
    setDidLogoError(false);
  }, [resolvedLogoSrc]);

  useEffect(() => {
    const pathname = window.location.pathname || '';
    const unitRoleMatch = pathname.match(/^\/(tkit|sdit|smpit|smait|slbit)\/(admin|teacher|student|parent)(\/|$)/i);
    const sectionMatch = pathname.match(/^\/(admin|teacher|student|parent)(\/|$)/i);
    const roleKey = (unitRoleMatch?.[2] || sectionMatch?.[1] || '').toLowerCase();
    const requiredRole =
      roleKey === 'admin' ? 'admin' : roleKey === 'teacher' ? 'teacher' : roleKey === 'student' ? 'student' : roleKey === 'parent' ? 'parent' : null;

    if (!requiredRole) {
      setIsAuthorized(true);
      return;
    }

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
    const role = (getCookie('role') || '').toLowerCase();
    if (!token || role !== requiredRole) {
      const hostname = window.location.hostname.toLowerCase();
      const isUnitSubdomain =
        hostname === 'smpitbaituljannah.sch.id' ||
        hostname === 'www.smpitbaituljannah.sch.id' ||
        hostname === 'smaitbaituljannah.sch.id' ||
        hostname === 'www.smaitbaituljannah.sch.id';
      const unitMatch = pathname.match(/^\/(tkit|sdit|smpit|smait|slbit)(\/|$)/i);
      const loginPath = isUnitSubdomain ? '/login' : unitMatch?.[1] ? `/${unitMatch[1].toLowerCase()}/login` : '/login';

      try {
        localStorage.removeItem('baituljannah_token');
        localStorage.removeItem('baituljannah_user');
      } catch {}

      const expires = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
      const base = `path=/; ${expires}; SameSite=Lax`;
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `role=; ${base}${secure}`;
      document.cookie = `token=; ${base}${secure}`;
      document.cookie = `role=; ${base}; Domain=.baituljannah.sch.id${secure}`;
      document.cookie = `token=; ${base}; Domain=.baituljannah.sch.id${secure}`;

      setIsAuthorized(false);
      router.replace(loginPath);
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  useEffect(() => {
    const shouldReload = (message: string) => {
      const msg = message.toLowerCase();
      return msg.includes('chunkloaderror') || msg.includes('failed to load chunk') || msg.includes('loading chunk');
    };

    const reloadOnce = () => {
      const key = `chunk-reload:${window.location.pathname}`;
      try {
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, '1');
      } catch {}
      window.location.reload();
    };

    const onError = (event: ErrorEvent) => {
      const name = String((event as any)?.error?.name || '');
      const msg = String((event as any)?.error?.message || event.message || '');
      if (name === 'ChunkLoadError' || shouldReload(msg)) reloadOnce();
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = (event as any)?.reason;
      const name = String(reason?.name || '');
      const msg = String(reason?.message || reason || '');
      if (name === 'ChunkLoadError' || shouldReload(msg)) reloadOnce();
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleLogout = () => {
    const hostname = window.location.hostname.toLowerCase();
    const isUnitSubdomain =
      hostname === 'smpitbaituljannah.sch.id' ||
      hostname === 'www.smpitbaituljannah.sch.id' ||
      hostname === 'smaitbaituljannah.sch.id' ||
      hostname === 'www.smaitbaituljannah.sch.id';
    const pathname = window.location.pathname || '';
    const unitMatch = pathname.match(/^\/(tkit|sdit|smpit|smait|slbit)(\/|$)/i);
    const loginPath = isUnitSubdomain ? '/login' : unitMatch?.[1] ? `/${unitMatch[1].toLowerCase()}/login` : '/login';

    try {
      localStorage.removeItem('baituljannah_token');
      localStorage.removeItem('baituljannah_user');
    } catch {}

    const expires = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    const base = `path=/; ${expires}; SameSite=Lax`;
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `role=; ${base}${secure}`;
    document.cookie = `token=; ${base}${secure}`;
    document.cookie = `role=; ${base}; Domain=.baituljannah.sch.id${secure}`;
    document.cookie = `token=; ${base}; Domain=.baituljannah.sch.id${secure}`;
    setIsMobileMenuOpen(false);
    router.replace(loginPath);
    router.refresh();
  };

  if (!isAuthorized) return null;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            {didLogoError ? (
              <span className="text-white text-lg">🕌</span>
            ) : (
              <Image
                src={resolvedLogoSrc}
                alt="Baituljannah"
                width={40}
                height={40}
                className="w-full h-full object-contain p-1"
                unoptimized
                onError={() => setDidLogoError(true)}
              />
            )}
          </div>
          <div>
            <h3 className="text-sm">{panelTitle}</h3>
            <p className="text-xs text-gray-500">{panelSubtitle}</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{userName}</p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openSubmenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openSubmenu === item.label && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.submenu.map((subitem, subindex) => (
                        <li key={subindex}>
                          <button
                            onClick={() => {
                              subitem.onClick?.();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {subitem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : item.onClick ? (
                <button
                  onClick={() => {
                    item.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        style={{ borderColor: accentColor }}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white h-screen sticky top-0 shadow-md flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 w-72 bg-white h-screen shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};
