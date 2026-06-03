import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import Image from 'next/image';

type MenuIcon = string | LucideIcon;

interface MenuItem {
  label: string;
  labelEn?: string;
  href: string;
  icon?: MenuIcon;
  onClick?: () => void;
  submenu?: { label: string; labelEn?: string; href: string; icon?: MenuIcon; onClick?: () => void }[];
}

interface NavbarProps {
  logo?: string;
  siteName?: string;
  siteTagline?: string;
  accentColor?: string;
  menuItems: MenuItem[];
  activePage?: string;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ logo, siteName = 'Baituljannah', siteTagline = 'Islamic Education', accentColor = '#1E4AB8', menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [didLogoError, setDidLogoError] = useState(false);
  const [hoveringLabel, setHoveringLabel] = useState<string | null>(null);
  const [taglineLetterSpacingPx, setTaglineLetterSpacingPx] = useState(0);
  const openTimeoutRef = React.useRef<any>(null);
  const closeTimeoutRef = React.useRef<any>(null);
  const siteNameRef = React.useRef<HTMLHeadingElement | null>(null);
  const siteTaglineRef = React.useRef<HTMLParagraphElement | null>(null);
  const displaySiteName = useMemo(() => {
    const input = String(siteName ?? '').trim();
    if (!input) return '';
    return input
      .split(/\s+/g)
      .map((word) => {
        const w = word.trim();
        if (!w) return '';
        const isAcronym = w.length <= 3 && w === w.toUpperCase();
        if (isAcronym) return w;
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      })
      .filter(Boolean)
      .join(' ');
  }, [siteName]);
  const displaySiteTagline = useMemo(() => String(siteTagline ?? '').toUpperCase(), [siteTagline]);

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

  useLayoutEffect(() => {
    const taglineEl = siteTaglineRef.current;
    const titleEl = siteNameRef.current;
    if (!taglineEl || !titleEl) return;

    const measureTextWidth = (text: string, style: CSSStyleDeclaration) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return 0;
      const font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.font = font;
      return ctx.measureText(text).width;
    };

    const recalc = () => {
      if (!siteTaglineRef.current || !siteNameRef.current) return;
      const titleWidth = siteNameRef.current.getBoundingClientRect().width;
      const computed = window.getComputedStyle(siteTaglineRef.current);
      const text = siteTaglineRef.current.textContent || '';
      const charCount = Array.from(text).length;
      const gaps = Math.max(1, charCount - 1);
      const naturalWidth = measureTextWidth(text, computed);
      const needed = titleWidth > naturalWidth ? (titleWidth - naturalWidth) / gaps : 0;
      const clamped = Math.max(0, Math.min(8, needed));
      setTaglineLetterSpacingPx(clamped);
    };

    recalc();
    window.addEventListener('resize', recalc);
    return () => {
      window.removeEventListener('resize', recalc);
    };
  }, [displaySiteName, displaySiteTagline]);

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

  const renderSubmenuIcon = (icon?: MenuIcon) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <Image src={icon} alt="" width={20} height={20} className="w-5 h-5 object-contain" unoptimized />;
    }
    const Icon = icon;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <nav className="bg-white sticky top-0 z-50" style={{ boxShadow: '0 1px 0 0 #e5e7eb' }}>
      {/* Garis emas bawah */}
      <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #b8960c 0%, #f5e27a 40%, #d4af37 70%, #8b6914 100%)' }} />
      <div className="container-custom px-4 md:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo and Site Name */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
              {didLogoError ? (
                <span className="text-2xl md:text-3xl">🕌</span>
              ) : (
                <Image
                  src={resolvedLogoSrc}
                  alt={displaySiteName}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                  unoptimized
                  onError={() => setDidLogoError(true)}
                />
              )}
            </div>
            <div>
              <h1
                ref={siteNameRef}
                className="text-lg md:text-2xl font-bold leading-tight truncate max-w-[180px] sm:max-w-none"
                style={{ color: accentColor }}
              >
                {displaySiteName}
              </h1>
              <p
                ref={siteTaglineRef}
                className="text-[10px] md:text-xs text-gray-400 hidden sm:block tracking-[0.2em] font-medium mt-0.5"
                style={{ letterSpacing: `${Math.max(taglineLetterSpacingPx, 3)}px` }}
              >
                {displaySiteTagline}
              </p>
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
                          {renderSubmenuIcon(subitem.icon)}
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
                        {renderSubmenuIcon(subitem.icon)}
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
