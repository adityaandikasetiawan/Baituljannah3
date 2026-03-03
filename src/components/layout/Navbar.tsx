import React, { useEffect, useMemo, useState } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

interface MenuItem {
  label: string;
  labelEn?: string;
  href: string;
  icon?: string;
  onClick?: () => void;
  submenu?: { label: string; labelEn?: string; href: string; icon?: string; onClick?: () => void }[];
}

interface NavbarProps {
  logo?: string;
  siteName: string;
  siteTagline?: string;
  accentColor?: string;
  menuItems: MenuItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ logo, siteName, siteTagline = 'Islamic Education', accentColor = '#1E4AB8', menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [didLogoError, setDidLogoError] = useState(false);
  const [hoveringLabel, setHoveringLabel] = useState<string | null>(null);
  const openTimeoutRef = React.useRef<any>(null);
  const closeTimeoutRef = React.useRef<any>(null);

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

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const getLabel = (item: { label: string; labelEn?: string }) => {
    return language === 'en' && item.labelEn ? item.labelEn : item.label;
  };

  const openSubmenu = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (activeSubmenu !== label) {
      setActiveSubmenu(label);
    }
  };

  const scheduleCloseSubmenu = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200); // hover delay to prevent flicker
  };

  const handleMouseEnterItem = (label?: string) => {
    if (!label) return;
    setHoveringLabel(label);
    openSubmenu(label);
  };

  const handleMouseLeaveItem = () => {
    setHoveringLabel(null);
    scheduleCloseSubmenu();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Site Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              {didLogoError ? (
                <span className="text-xl md:text-2xl">🕌</span>
              ) : (
                <img
                  src={resolvedLogoSrc}
                  alt={siteName}
                  className="w-full h-full object-contain"
                  onError={() => setDidLogoError(true)}
                />
              )}
            </div>
            <div>
              <h1 className="text-base md:text-xl truncate max-w-[150px] md:max-w-none" style={{ color: accentColor }}>{siteName}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{siteTagline}</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => item.submenu && handleMouseEnterItem(item.label)}
                onMouseLeave={handleMouseLeaveItem}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-[var(--color-primary)] transition-colors py-2 text-sm font-medium"
                  onClick={item.onClick}
                >
                  {getLabel(item)}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </button>
                
                {item.submenu && activeSubmenu === item.label && (
                  <div
                    className="absolute top-full left-0 w-56 bg-white shadow-strong rounded-xl pt-2 opacity-100 transition-all"
                    onMouseEnter={() => openSubmenu(item.label)}
                    onMouseLeave={scheduleCloseSubmenu}
                  >
                    <div className="bg-white rounded-xl py-2">
                      {item.submenu.map((subitem, subindex) => (
                        <button
                          key={subindex}
                          onClick={() => {
                            subitem.onClick?.();
                            setActiveSubmenu(null);
                          }}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
                        >
                          {subitem.icon && <img src={subitem.icon} alt="" className="w-5 h-5 object-contain" />}
                          <span>{getLabel(subitem)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-[var(--color-primary)] transition-colors"
              title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'id' ? 'ID' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    if (!item.submenu) {
                      item.onClick?.();
                      setIsOpen(false);
                    } else {
                      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
                    }
                  }}
                  className="w-full text-left flex items-center justify-between py-2 px-4 text-gray-700 hover:text-[var(--color-primary)] transition-colors font-medium"
                >
                  {getLabel(item)}
                  {item.submenu && <ChevronDown className={`w-4 h-4 transition-transform ${activeSubmenu === item.label ? 'rotate-180' : ''}`} />}
                </button>
                {item.submenu && activeSubmenu === item.label && (
                  <div className="pl-8 space-y-1">
                    {item.submenu.map((subitem, subindex) => (
                      <button
                        key={subindex}
                        onClick={() => {
                          subitem.onClick?.();
                          setIsOpen(false);
                          setActiveSubmenu(null);
                        }}
                        className="w-full text-left flex items-center gap-3 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                      >
                        {subitem.icon && <img src={subitem.icon} alt="" className="w-5 h-5 object-contain" />}
                        <span>{getLabel(subitem)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[var(--color-primary)] transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'}
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
