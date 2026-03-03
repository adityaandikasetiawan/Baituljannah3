import React, { useEffect, useMemo, useState } from 'react';
import { LucideIcon, ChevronDown, Menu, X } from 'lucide-react';

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
  userRole: string;
  userName: string;
  logo?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  accentColor = '#1E4AB8',
  userRole,
  userName,
  logo
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [didLogoError, setDidLogoError] = useState(false);

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

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            {didLogoError ? (
              <span className="text-white text-lg">🕌</span>
            ) : (
              <img
                src={resolvedLogoSrc}
                alt="Baituljannah"
                className="w-full h-full object-contain p-1"
                onError={() => setDidLogoError(true)}
              />
            )}
          </div>
          <div>
            <h3 className="text-sm">Admin Panel</h3>
            <p className="text-xs text-gray-500">Baituljannah</p>
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
                    item.onClick();
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
