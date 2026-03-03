import React from 'react';
import { Palette, Type, Layout, Box } from 'lucide-react';

export const DesignSystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">Baituljannah Design System</h1>
          <p className="text-gray-600 text-lg">
            Comprehensive design system documentation for the Yayasan Baituljannah school ecosystem.
          </p>
        </div>

        {/* Overview */}
        <section className="card mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Layout className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="mb-2">Overview</h2>
              <p className="text-gray-600">
                This design system is created for a multi-domain school ecosystem under Yayasan Baituljannah, 
                featuring 5 school units (TKIT, SDIT, SMPIT, SMAIT, SLBIT), a main portal, and an admin panel. 
                Each unit maintains a unified visual system while having its own distinct accent color.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Main Portal</p>
              <p>baituljannah.sch.id</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">School Units</p>
              <p>5 separate domains</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Admin Panel</p>
              <p>admin.baituljannah.sch.id</p>
            </div>
          </div>
        </section>

        {/* Color System */}
        <section className="card mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">Color System</h2>
              <p className="text-gray-600">
                Our color palette is designed to be accessible, Islamic-friendly, and distinct for each school unit.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Primary Colors */}
            <div>
              <h4 className="mb-4">Primary & Secondary Colors</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--color-primary)] rounded-xl text-white">
                  <p className="text-sm opacity-80 mb-1">Primary Color</p>
                  <p className="text-xl mb-2">#1E4AB8</p>
                  <p className="text-sm opacity-90">Used for main portal, primary buttons, and key UI elements</p>
                </div>
                <div className="p-4 bg-[var(--color-secondary)] rounded-xl">
                  <p className="text-sm text-gray-700 mb-1">Secondary Color</p>
                  <p className="text-xl mb-2">#FFD166</p>
                  <p className="text-sm text-gray-700">Used for accents, highlights, and secondary actions</p>
                </div>
              </div>
            </div>

            {/* Unit Colors */}
            <div>
              <h4 className="mb-4">Unit Accent Colors</h4>
              <div className="grid md:grid-cols-5 gap-3">
                <div className="p-4 bg-[var(--color-tkit)] rounded-xl text-white text-center">
                  <p className="text-xs opacity-80 mb-1">TKIT</p>
                  <p className="text-sm">🎨 Green</p>
                  <p className="text-xs mt-2">#10B981</p>
                </div>
                <div className="p-4 bg-[var(--color-sdit)] rounded-xl text-white text-center">
                  <p className="text-xs opacity-80 mb-1">SDIT</p>
                  <p className="text-sm">📚 Blue</p>
                  <p className="text-xs mt-2">#3B82F6</p>
                </div>
                <div className="p-4 bg-[var(--color-smpit)] rounded-xl text-white text-center">
                  <p className="text-xs opacity-80 mb-1">SMPIT</p>
                  <p className="text-sm">🎓 Orange</p>
                  <p className="text-xs mt-2">#F97316</p>
                </div>
                <div className="p-4 bg-[var(--color-smait)] rounded-xl text-white text-center">
                  <p className="text-xs opacity-80 mb-1">SMAIT</p>
                  <p className="text-sm">🏆 Purple</p>
                  <p className="text-xs mt-2">#8B5CF6</p>
                </div>
                <div className="p-4 bg-[var(--color-slbit)] rounded-xl text-white text-center">
                  <p className="text-xs opacity-80 mb-1">SLBIT</p>
                  <p className="text-sm">❤️ Turquoise</p>
                  <p className="text-xs mt-2">#14B8A6</p>
                </div>
              </div>
            </div>

            {/* Neutral Colors */}
            <div>
              <h4 className="mb-4">Neutral Gray Scale</h4>
              <div className="grid grid-cols-9 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 900].map((shade) => (
                  <div key={shade}>
                    <div 
                      className={`h-16 rounded-lg mb-2 bg-gray-${shade} ${shade >= 500 ? 'border border-gray-300' : ''}`}
                    />
                    <p className="text-xs text-center">{shade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="card mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <Type className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">Typography</h2>
              <p className="text-gray-600">
                Clear, readable typography using Poppins for headings and Inter for body text.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Font Families */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-2">Headings</p>
                <p style={{ fontFamily: 'Poppins' }}>Poppins SemiBold (600)</p>
                <p className="text-sm text-gray-600 mt-2">Used for all heading levels (H1-H6)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-2">Body Text</p>
                <p style={{ fontFamily: 'Inter' }}>Inter Regular (400)</p>
                <p className="text-sm text-gray-600 mt-2">Used for paragraphs, labels, and UI text</p>
              </div>
            </div>

            {/* Type Scale */}
            <div>
              <h4 className="mb-4">Type Scale</h4>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Heading 1 - 2.5rem (40px)</p>
                  <h1>The quick brown fox jumps</h1>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Heading 2 - 2rem (32px)</p>
                  <h2>The quick brown fox jumps</h2>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Heading 3 - 1.75rem (28px)</p>
                  <h3>The quick brown fox jumps</h3>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Heading 4 - 1.5rem (24px)</p>
                  <h4>The quick brown fox jumps</h4>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl">
                  <p className="text-xs text-gray-500 mb-2">Body - 1rem (16px)</p>
                  <p>The quick brown fox jumps over the lazy dog. This is a sample paragraph text using Inter font family with regular weight and comfortable line height for optimal readability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="card mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Box className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">Spacing System</h2>
              <p className="text-gray-600">
                Consistent spacing using an 8px base unit for harmonious layouts.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-3">Base Unit: <strong>8px</strong></p>
              <div className="space-y-2">
                {[1, 2, 3, 4, 6, 8, 12, 16].map((multiplier) => (
                  <div key={multiplier} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-gray-600">{multiplier * 8}px</div>
                    <div 
                      className="h-8 bg-[var(--color-primary)] rounded"
                      style={{ width: `${multiplier * 8}px` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Elevation */}
        <section className="card mb-8">
          <h2 className="mb-6">Elevation & Shadows</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="h-32 rounded-xl bg-white shadow-soft flex items-center justify-center mb-3">
                <p className="text-sm text-gray-600">Soft</p>
              </div>
              <p className="text-xs text-gray-500">0 2px 8px rgba(0,0,0,0.08)</p>
            </div>
            <div>
              <div className="h-32 rounded-xl bg-white shadow-medium flex items-center justify-center mb-3">
                <p className="text-sm text-gray-600">Medium</p>
              </div>
              <p className="text-xs text-gray-500">0 4px 16px rgba(0,0,0,0.1)</p>
            </div>
            <div>
              <div className="h-32 rounded-xl bg-white shadow-strong flex items-center justify-center mb-3">
                <p className="text-sm text-gray-600">Strong</p>
              </div>
              <p className="text-xs text-gray-500">0 8px 24px rgba(0,0,0,0.12)</p>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="card">
          <h2 className="mb-6">Border Radius</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="h-24 bg-[var(--color-primary)] rounded-lg mb-3"></div>
              <p className="text-sm">Rounded-lg</p>
              <p className="text-xs text-gray-500">8px</p>
            </div>
            <div>
              <div className="h-24 bg-[var(--color-primary)] rounded-xl mb-3"></div>
              <p className="text-sm">Rounded-xl</p>
              <p className="text-xs text-gray-500">12px</p>
            </div>
            <div>
              <div className="h-24 bg-[var(--color-primary)] rounded-2xl mb-3"></div>
              <p className="text-sm">Rounded-2xl</p>
              <p className="text-xs text-gray-500">16px</p>
            </div>
            <div>
              <div className="h-24 bg-[var(--color-primary)] rounded-3xl mb-3"></div>
              <p className="text-sm">Rounded-3xl</p>
              <p className="text-xs text-gray-500">24px</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
