import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { EmailService } from '../components/EmailService';
import { exportApplicationsToCSV, exportJobsToCSV } from '../utils/exportUtils';
import { Briefcase, Plus, Edit, Trash2, Eye, Users, TrendingUp, CheckCircle, XCircle, Search, Filter, Download, Mail, FileDown } from 'lucide-react';

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  unit: string;
  education: string;
  experience: string;
  appliedDate: string;
  status: 'Pending' | 'Reviewed' | 'Interview' | 'Accepted' | 'Rejected';
}

interface JobPosting {
  id: number;
  position: string;
  unit: string;
  type: string;
  location: string;
  status: 'Active' | 'Closed';
  applicants: number;
  postedDate: string;
}

interface AdminCareerProps {
  onNavigate?: (page: string) => void;
}

export const AdminCareer: React.FC<AdminCareerProps> = ({ onNavigate = () => {} }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [emailRecipient, setEmailRecipient] = useState<{email: string; name: string; position: string} | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate('admin-super') }
  ];

  // Mock data - Job Postings
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: 1,
      position: 'Guru Bahasa Arab',
      unit: 'SDIT Baituljannah',
      type: 'Full Time',
      location: 'Bekasi',
      status: 'Active',
      applicants: 12,
      postedDate: '2024-01-15'
    },
    {
      id: 2,
      position: 'Guru Tahfidz',
      unit: 'SMPIT Baituljannah',
      type: 'Full Time',
      location: 'Bekasi',
      status: 'Active',
      applicants: 8,
      postedDate: '2024-01-10'
    },
    {
      id: 3,
      position: 'Guru Matematika',
      unit: 'SMAIT Baituljannah',
      type: 'Full Time',
      location: 'Bekasi',
      status: 'Active',
      applicants: 15,
      postedDate: '2024-01-20'
    },
    {
      id: 4,
      position: 'Staff Administrasi',
      unit: 'Yayasan Baituljannah',
      type: 'Full Time',
      location: 'Bekasi',
      status: 'Closed',
      applicants: 25,
      postedDate: '2023-12-01'
    }
  ]);

  // Mock data - Applications
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@email.com',
      phone: '081234567890',
      position: 'Guru Bahasa Arab',
      unit: 'SDIT Baituljannah',
      education: 'S1',
      experience: '2-5 tahun',
      appliedDate: '2024-01-25',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      email: 'siti.nur@email.com',
      phone: '081234567891',
      position: 'Guru Tahfidz',
      unit: 'SMPIT Baituljannah',
      education: 'S1',
      experience: '1-2 tahun',
      appliedDate: '2024-01-24',
      status: 'Reviewed'
    },
    {
      id: 3,
      name: 'Muhammad Rizki',
      email: 'm.rizki@email.com',
      phone: '081234567892',
      position: 'Guru Matematika',
      unit: 'SMAIT Baituljannah',
      education: 'S1',
      experience: '2-5 tahun',
      appliedDate: '2024-01-23',
      status: 'Interview'
    },
    {
      id: 4,
      name: 'Fatimah Az-Zahra',
      email: 'fatimah.az@email.com',
      phone: '081234567893',
      position: 'Guru Bahasa Arab',
      unit: 'SDIT Baituljannah',
      education: 'S1',
      experience: '> 5 tahun',
      appliedDate: '2024-01-22',
      status: 'Accepted'
    },
    {
      id: 5,
      name: 'Abdullah Yusuf',
      email: 'abdullah.y@email.com',
      phone: '081234567894',
      position: 'Staff Administrasi',
      unit: 'Yayasan Baituljannah',
      education: 'D3',
      experience: '< 1 tahun',
      appliedDate: '2024-01-21',
      status: 'Rejected'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Closed': return 'bg-gray-100 text-gray-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Reviewed': return 'bg-blue-100 text-blue-700';
      case 'Interview': return 'bg-purple-100 text-purple-700';
      case 'Accepted': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const updateApplicationStatus = (id: number, newStatus: Application['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const bulkUpdateStatus = (newStatus: Application['status']) => {
    if (selectedIds.length === 0) {
      alert('Pilih lamaran terlebih dahulu');
      return;
    }
    setApplications(applications.map(app => 
      selectedIds.includes(app.id) ? { ...app, status: newStatus } : app
    ));
    setSelectedIds([]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApplications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplications.map(app => app.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteJob = (id: number) => {
    if (confirm('Yakin ingin menghapus lowongan ini?')) {
      setJobPostings(jobPostings.filter(job => job.id !== id));
    }
  };

  const toggleJobStatus = (id: number) => {
    setJobPostings(jobPostings.map(job => 
      job.id === id ? { ...job, status: job.status === 'Active' ? 'Closed' : 'Active' } : job
    ));
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: 'Total Lowongan',
      value: jobPostings.filter(j => j.status === 'Active').length,
      total: jobPostings.length,
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Pelamar',
      value: applications.length,
      total: applications.length,
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Menunggu Review',
      value: applications.filter(a => a.status === 'Pending').length,
      total: applications.length,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Diterima',
      value: applications.filter(a => a.status === 'Accepted').length,
      total: applications.length,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar menuItems={menuItems} />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Manajemen Rekrutmen</h1>
          <p className="text-xl text-gray-600">Kelola lowongan dan lamaran kerja</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-soft hover:shadow-strong p-6 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${stat.color} text-white w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    {stat.icon}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${stat.color} text-white`}>
                    {stat.value}/{stat.total}
                  </div>
                </div>
                <p className="text-gray-600 mb-2 text-sm">{stat.title}</p>
                <p className="text-4xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                {stat.total > 0 && (
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
                      style={{ width: `${(stat.value / stat.total) * 100}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`relative px-8 py-5 font-medium transition-all duration-300 ${
                  activeTab === 'jobs'
                    ? 'text-[#1E4AB8]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Lowongan Pekerjaan
                </span>
                {activeTab === 'jobs' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] rounded-t-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`relative px-8 py-5 font-medium transition-all duration-300 ${
                  activeTab === 'applications'
                    ? 'text-[#1E4AB8]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Daftar Lamaran
                  {applications.filter(a => a.status === 'Pending').length > 0 && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2.5 py-1 rounded-full animate-pulse shadow-md">
                      {applications.filter(a => a.status === 'Pending').length}
                    </span>
                  )}
                </span>
                {activeTab === 'applications' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] rounded-t-full"></div>
                )}
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'jobs' ? (
              <div>
                {/* Job Postings Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl">Daftar Lowongan</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={() => exportJobsToCSV(jobPostings)}
                      className="btn-outline flex items-center gap-2"
                    >
                      <FileDown className="w-5 h-5" />
                      Export CSV
                    </button>
                    <button
                      onClick={() => setShowJobForm(!showJobForm)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Tambah Lowongan
                    </button>
                  </div>
                </div>

                {showJobForm && (
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl mb-4">Form Lowongan Baru</h3>
                    <form className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Posisi
                        </label>
                        <input type="text" className="input-field" placeholder="Contoh: Guru Bahasa Inggris" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Unit
                        </label>
                        <select className="input-field">
                          <option>TKIT Baituljannah</option>
                          <option>SDIT Baituljannah</option>
                          <option>SMPIT Baituljannah</option>
                          <option>SMAIT Baituljannah</option>
                          <option>SLBIT Baituljannah</option>
                          <option>Yayasan Baituljannah</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipe
                        </label>
                        <select className="input-field">
                          <option>Full Time</option>
                          <option>Part Time</option>
                          <option>Contract</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lokasi
                        </label>
                        <input type="text" className="input-field" placeholder="Bekasi" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Deskripsi
                        </label>
                        <textarea className="input-field" rows={4} placeholder="Deskripsi pekerjaan..."></textarea>
                      </div>
                      <div className="md:col-span-2 flex gap-3">
                        <button type="submit" className="btn-primary">Simpan Lowongan</button>
                        <button type="button" onClick={() => setShowJobForm(false)} className="btn-outline">Batal</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Job Postings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4">Posisi</th>
                        <th className="text-left py-4 px-4">Unit</th>
                        <th className="text-left py-4 px-4">Tipe</th>
                        <th className="text-left py-4 px-4">Pelamar</th>
                        <th className="text-left py-4 px-4">Status</th>
                        <th className="text-left py-4 px-4">Tanggal</th>
                        <th className="text-left py-4 px-4">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobPostings.map((job) => (
                        <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-[#1E4AB8]/10 p-2 rounded-lg">
                                <Briefcase className="w-5 h-5 text-[#1E4AB8]" />
                              </div>
                              <div>
                                <p className="font-medium">{job.position}</p>
                                <p className="text-sm text-gray-500">{job.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{job.unit}</td>
                          <td className="py-4 px-4 text-gray-600">{job.type}</td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-[#1E4AB8]">{job.applicants}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {new Date(job.postedDate).toLocaleDateString('id-ID', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleJobStatus(job.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title={job.status === 'Active' ? 'Tutup lowongan' : 'Buka lowongan'}
                              >
                                {job.status === 'Active' ? (
                                  <XCircle className="w-5 h-5 text-orange-600" />
                                ) : (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                )}
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-5 h-5 text-blue-600" />
                              </button>
                              <button
                                onClick={() => deleteJob(job.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Hapus"
                              >
                                <Trash2 className="w-5 h-5 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                {/* Applications Header */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl">Daftar Lamaran</h2>
                    <button
                      onClick={() => exportApplicationsToCSV(filteredApplications)}
                      className="btn-outline flex items-center gap-2"
                    >
                      <FileDown className="w-5 h-5" />
                      Export CSV
                    </button>
                  </div>
                  
                  {/* Search and Filter */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Cari berdasarkan nama, posisi, atau email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="input-field pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="input-field"
                      >
                        <option>Semua</option>
                        <option>Pending</option>
                        <option>Reviewed</option>
                        <option>Interview</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  {selectedIds.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">
                          <strong>{selectedIds.length}</strong> lamaran dipilih
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => bulkUpdateStatus('Reviewed')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            Tandai Reviewed
                          </button>
                          <button
                            onClick={() => bulkUpdateStatus('Interview')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                          >
                            Tandai Interview
                          </button>
                          <button
                            onClick={() => bulkUpdateStatus('Accepted')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                          >
                            Terima
                          </button>
                          <button
                            onClick={() => bulkUpdateStatus('Rejected')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                          >
                            Tolak
                          </button>
                          <button
                            onClick={() => setSelectedIds([])}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Applications Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.length === filteredApplications.length && filteredApplications.length > 0}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 text-[#1E4AB8] rounded"
                          />
                        </th>
                        <th className="text-left py-4 px-4">Pelamar</th>
                        <th className="text-left py-4 px-4">Posisi</th>
                        <th className="text-left py-4 px-4">Pendidikan</th>
                        <th className="text-left py-4 px-4">Pengalaman</th>
                        <th className="text-left py-4 px-4">Tanggal</th>
                        <th className="text-left py-4 px-4">Status</th>
                        <th className="text-left py-4 px-4">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(app.id)}
                              onChange={() => toggleSelect(app.id)}
                              className="w-4 h-4 text-[#1E4AB8] rounded"
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{app.name}</p>
                              <p className="text-sm text-gray-500">{app.email}</p>
                              <p className="text-sm text-gray-500">{app.phone}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-medium">{app.position}</p>
                            <p className="text-sm text-gray-500">{app.unit}</p>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{app.education}</td>
                          <td className="py-4 px-4 text-gray-600">{app.experience}</td>
                          <td className="py-4 px-4 text-gray-600">
                            {new Date(app.appliedDate).toLocaleDateString('id-ID', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value as Application['status'])}
                              className={`px-3 py-1 rounded-full text-sm border-0 ${getStatusColor(app.status)}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Interview">Interview</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedApplication(app)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Lihat Detail"
                              >
                                <Eye className="w-5 h-5 text-blue-600" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download CV">
                                <Download className="w-5 h-5 text-green-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl mb-1">{selectedApplication.name}</h3>
                  <p className="text-gray-600">{selectedApplication.position} - {selectedApplication.unit}</p>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Telepon</p>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pendidikan</p>
                  <p className="font-medium">{selectedApplication.education}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pengalaman</p>
                  <p className="font-medium">{selectedApplication.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tanggal Melamar</p>
                  <p className="font-medium">
                    {new Date(selectedApplication.appliedDate).toLocaleDateString('id-ID', { 
                      day: '2-digit', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Reviewed', 'Interview', 'Accepted', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        updateApplicationStatus(selectedApplication.id, status as Application['status']);
                        setSelectedApplication({ ...selectedApplication, status: status as Application['status'] });
                      }}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedApplication.status === status
                          ? 'bg-[#1E4AB8] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download CV
                </button>
                <button
                  onClick={() => {
                    setEmailRecipient({
                      email: selectedApplication.email,
                      name: selectedApplication.name,
                      position: selectedApplication.position
                    });
                    setSelectedApplication(null);
                  }}
                  className="btn-outline flex-1 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Kirim Email
                </button>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="btn-outline flex-1"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Service Modal */}
      {emailRecipient && (
        <EmailService
          recipientEmail={emailRecipient.email}
          recipientName={emailRecipient.name}
          position={emailRecipient.position}
          onClose={() => setEmailRecipient(null)}
        />
      )}
    </div>
  );
};

