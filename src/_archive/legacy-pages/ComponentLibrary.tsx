import React, { useState } from 'react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Modal } from '../components/common/Modal';
import { Tabs } from '../components/common/Tabs';
import { Pagination } from '../components/common/Pagination';
import { Table } from '../components/common/Table';
import { FormInput } from '../components/common/FormInput';
import { FormSelect } from '../components/common/FormSelect';
import { FormTextarea } from '../components/common/FormTextarea';
import { StatsCard } from '../features/landing/components/StatsCard';
import { ProgramCard } from '../features/program/components/ProgramCard';
import { NewsCard } from '../features/news/components/NewsCard';
import { Users, BookOpen, Award, Calendar } from 'lucide-react';

export const ComponentLibrary: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: 'Components', href: '#' },
    { label: 'Library' }
  ];

  const tableData = [
    { name: 'Ahmad Fauzi', email: 'ahmad@example.com', role: 'Admin', status: 'Active' },
    { name: 'Siti Aisyah', email: 'siti@example.com', role: 'Guru', status: 'Active' },
    { name: 'Muhammad Rizki', email: 'rizki@example.com', role: 'Siswa', status: 'Active' }
  ];

  const tableColumns = [
    { header: 'Nama', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="mt-4 mb-2">Component Library</h1>
          <p className="text-gray-600">
            Comprehensive component library for Yayasan Baituljannah ecosystem
          </p>
        </div>

        {/* Buttons */}
        <section className="card mb-8">
          <h2 className="mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-outline">Outline Button</button>
            <button className="btn-primary" disabled>Disabled Button</button>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="mb-8">
          <h2 className="mb-6">Stats Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Siswa"
              value="1,250"
              icon={Users}
              color="#3B82F6"
              trend={{ value: '+12%', isPositive: true }}
            />
            <StatsCard
              title="Total Guru"
              icon={Users}
              value="125"
              color="#10B981"
              trend={{ value: '+5%', isPositive: true }}
            />
            <StatsCard
              title="Kelas Aktif"
              value="45"
              icon={BookOpen}
              color="#F97316"
            />
            <StatsCard
              title="Event Bulan Ini"
              value="12"
              icon={Calendar}
              color="#8B5CF6"
              trend={{ value: '-2%', isPositive: false }}
            />
          </div>
        </section>

        {/* Program Cards */}
        <section className="mb-8">
          <h2 className="mb-6">Program Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ProgramCard
              title="Tahfidz Al-Qur'an"
              description="Program menghafal Al-Qur'an dengan metode yang mudah dan menyenangkan."
              icon={BookOpen}
              color="#1E4AB8"
            />
            <ProgramCard
              title="Character Building"
              description="Pembentukan karakter Islami melalui pembiasaan akhlak mulia."
              icon={Users}
              color="#10B981"
            />
            <ProgramCard
              title="Prestasi Akademik"
              description="Pembelajaran berkualitas untuk meraih prestasi akademik terbaik."
              icon={Award}
              color="#F97316"
            />
          </div>
        </section>

        {/* News Cards */}
        <section className="mb-8">
          <h2 className="mb-6">News Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <NewsCard
              title="SMAIT Baituljannah Juara 1 Olimpiade Sains"
              excerpt="Tim siswa berhasil meraih juara 1 dalam Olimpiade Sains Nasional."
              date="20 Nov 2025"
              author="Admin"
              imageUrl="https://images.unsplash.com/photo-1629196753813-8b4827ddc7c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdWNjZXNzfGVufDF8fHx8MTc2NDIzOTczMXww&ixlib=rb-4.1.0&q=80&w=1080"
              category="Prestasi"
              categoryColor="#10B981"
            />
          </div>
        </section>

        {/* Forms */}
        <section className="card mb-8">
          <h2 className="mb-6">Form Components</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <FormInput
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                required
              />
              <FormInput
                label="Email"
                type="email"
                placeholder="email@example.com"
                required
              />
              <FormSelect
                label="Unit Sekolah"
                options={[
                  { value: 'tkit', label: 'TKIT Baituljannah' },
                  { value: 'sdit', label: 'SDIT Baituljannah' },
                  { value: 'smpit', label: 'SMPIT Baituljannah' },
                  { value: 'smait', label: 'SMAIT Baituljannah' }
                ]}
                required
              />
            </div>
            <div>
              <FormTextarea
                label="Alamat"
                placeholder="Masukkan alamat lengkap"
                rows={5}
                required
              />
              <FormInput
                label="Telepon"
                type="tel"
                placeholder="08123456789"
              />
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="card mb-8">
          <h2 className="mb-6">Table</h2>
          <Table columns={tableColumns} data={tableData} accentColor="#1E4AB8" />
        </section>

        {/* Tabs */}
        <section className="card mb-8">
          <h2 className="mb-6">Tabs</h2>
          <Tabs
            tabs={[
              {
                label: 'Tab 1',
                content: (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p>Content for Tab 1</p>
                  </div>
                )
              },
              {
                label: 'Tab 2',
                content: (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p>Content for Tab 2</p>
                  </div>
                )
              },
              {
                label: 'Tab 3',
                content: (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p>Content for Tab 3</p>
                  </div>
                )
              }
            ]}
            accentColor="#1E4AB8"
          />
        </section>

        {/* Pagination */}
        <section className="card mb-8">
          <h2 className="mb-6">Pagination</h2>
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
            accentColor="#1E4AB8"
          />
        </section>

        {/* Modal */}
        <section className="card mb-8">
          <h2 className="mb-6">Modal</h2>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Modal Title"
            footer={
              <>
                <button className="btn-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={() => setIsModalOpen(false)}>
                  Save
                </button>
              </>
            }
          >
            <p className="text-gray-600">
              This is a modal component. You can put any content here including forms,
              images, or other components.
            </p>
          </Modal>
        </section>

        {/* Color Palette */}
        <section className="card mb-8">
          <h2 className="mb-6">Color Palette</h2>
          
          <div className="mb-6">
            <h4 className="mb-3">Primary Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="h-20 rounded-xl bg-[var(--color-primary)] mb-2"></div>
                <p className="text-sm">Primary</p>
                <p className="text-xs text-gray-500">#1E4AB8</p>
              </div>
              <div>
                <div className="h-20 rounded-xl bg-[var(--color-secondary)] mb-2"></div>
                <p className="text-sm">Secondary</p>
                <p className="text-xs text-gray-500">#FFD166</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="mb-3">Unit Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <div className="h-20 rounded-xl bg-[var(--color-tkit)] mb-2"></div>
                <p className="text-sm">TKIT Green</p>
                <p className="text-xs text-gray-500">#10B981</p>
              </div>
              <div>
                <div className="h-20 rounded-xl bg-[var(--color-sdit)] mb-2"></div>
                <p className="text-sm">SDIT Blue</p>
                <p className="text-xs text-gray-500">#3B82F6</p>
              </div>
              <div>
                <div className="h-20 rounded-xl bg-[var(--color-smpit)] mb-2"></div>
                <p className="text-sm">SMPIT Orange</p>
                <p className="text-xs text-gray-500">#F97316</p>
              </div>
              <div>
                <div className="h-20 rounded-xl bg-[var(--color-smait)] mb-2"></div>
                <p className="text-sm">SMAIT Purple</p>
                <p className="text-xs text-gray-500">#8B5CF6</p>
              </div>
              <div>
                <div className="h-20 rounded-xl bg-[var(--color-slbit)] mb-2"></div>
                <p className="text-sm">SLBIT Turquoise</p>
                <p className="text-xs text-gray-500">#14B8A6</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3">Gray Scale</h4>
            <div className="grid grid-cols-5 gap-2">
              <div>
                <div className="h-16 rounded-xl bg-gray-100 mb-2"></div>
                <p className="text-xs">Gray 100</p>
              </div>
              <div>
                <div className="h-16 rounded-xl bg-gray-300 mb-2"></div>
                <p className="text-xs">Gray 300</p>
              </div>
              <div>
                <div className="h-16 rounded-xl bg-gray-500 mb-2"></div>
                <p className="text-xs text-white">Gray 500</p>
              </div>
              <div>
                <div className="h-16 rounded-xl bg-gray-700 mb-2"></div>
                <p className="text-xs text-white">Gray 700</p>
              </div>
              <div>
                <div className="h-16 rounded-xl bg-gray-900 mb-2"></div>
                <p className="text-xs text-white">Gray 900</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="card">
          <h2 className="mb-6">Typography</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Heading 1</p>
              <h1>The quick brown fox jumps</h1>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Heading 2</p>
              <h2>The quick brown fox jumps</h2>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Heading 3</p>
              <h3>The quick brown fox jumps</h3>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Heading 4</p>
              <h4>The quick brown fox jumps</h4>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Heading 5</p>
              <h5>The quick brown fox jumps</h5>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Body Text</p>
              <p>The quick brown fox jumps over the lazy dog. This is a sample paragraph text using Inter font family.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

