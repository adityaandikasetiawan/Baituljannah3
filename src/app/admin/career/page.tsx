'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { EmailService } from '../../../components/common/EmailService';
import { exportApplicationsToCSV, exportJobsToCSV } from '../../../utils/exportUtils';
import { Briefcase, Plus, Edit, Trash2, Eye, Users, TrendingUp, CheckCircle, XCircle, Search, Filter, Download, Mail, FileDown } from 'lucide-react';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';

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

export default function AdminCareerPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [emailRecipient, setEmailRecipient] = useState<{email: string; name: string; position: string} | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Mock Data
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      name: "Sarah Amalia",
      email: "sarah.amalia@email.com",
      phone: "081234567890",
      position: "Guru Matematika",
      unit: "SMA IT",
      education: "S1 Pendidikan Matematika",
      experience: "2 Tahun",
      appliedDate: "2024-03-10",
      status: "Pending"
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi.s@email.com",
      phone: "081234567891",
      position: "Staff IT",
      unit: "Yayasan",
      education: "S1 Teknik Informatika",
      experience: "3 Tahun",
      appliedDate: "2024-03-09",
      status: "Interview"
    },
    {
      id: 3,
      name: "Dewi Putri",
      email: "dewi.p@email.com",
      phone: "081234567892",
      position: "Guru Bahasa Inggris",
      unit: "SMP IT",
      education: "S1 Sastra Inggris",
      experience: "Fresh Graduate",
      appliedDate: "2024-03-08",
      status: "Reviewed"
    }
  ]);

  const [jobs, setJobs] = useState<JobPosting[]>([
    {
      id: 1,
      position: "Guru Matematika",
      unit: "SMA IT",
      type: "Full Time",
      location: "Bandar Lampung",
      status: "Active",
      applicants: 15,
      postedDate: "2024-03-01"
    },
    {
      id: 2,
      position: "Staff IT",
      unit: "Yayasan",
      type: "Full Time",
      location: "Bandar Lampung",
      status: "Active",
      applicants: 8,
      postedDate: "2024-03-05"
    },
    {
      id: 3,
      position: "Guru Bahasa Inggris",
      unit: "SMP IT",
      type: "Part Time",
      location: "Bandar Lampung",
      status: "Closed",
      applicants: 25,
      postedDate: "2024-02-15"
    }
  ]);

  const handleUpdateStatus = (id: number, newStatus: Application['status']) => {
    setApplications(apps => apps.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    if (selectedApplication?.id === id) {
      setSelectedApplication(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDeleteApplication = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pelamar ini?')) {
      setApplications(apps => apps.filter(app => app.id !== id));
      if (selectedApplication?.id === id) setSelectedApplication(null);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;

    if (action === 'delete') {
      if (window.confirm(`Hapus ${selectedIds.length} data terpilih?`)) {
        setApplications(apps => apps.filter(app => !selectedIds.includes(app.id)));
        setSelectedIds([]);
      }
    } else if (['Pending', 'Reviewed', 'Interview', 'Accepted', 'Rejected'].includes(action)) {
      setApplications(apps => apps.map(app => 
        selectedIds.includes(app.id) ? { ...app, status: action as Application['status'] } : app
      ));
      setSelectedIds([]);
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar 
        menuItems={menuItems} 
        siteName="Admin Panel" 
        accentColor="#1E4AB8" 
      />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Karir & Lowongan</h1>
              <p className="text-gray-600 mt-1">Kelola lowongan pekerjaan dan data pelamar</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => activeTab === 'applications' ? exportApplicationsToCSV(filteredApplications) : exportJobsToCSV(jobs)}
                className="btn-outline flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button 
                onClick={() => setShowJobForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Tambah Lowongan
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Total Lowongan</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{jobs.length}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                  <Users className="w-6 h-6" />
                </div>
                <span className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +24%
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Total Pelamar</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{applications.length}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="flex items-center text-gray-600 text-sm font-medium bg-gray-50 px-2 py-1 rounded-lg">
                  Aktif
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Lowongan Aktif</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {jobs.filter(j => j.status === 'Active').length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 rounded-xl text-green-600">
                  <Users className="w-6 h-6" />
                </div>
                <span className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-lg">
                  Bulan Ini
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">Interview</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {applications.filter(a => a.status === 'Interview').length}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`pb-4 px-4 font-medium transition-colors relative ${
                activeTab === 'jobs' 
                  ? 'text-[#1E4AB8]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lowongan Pekerjaan
              {activeTab === 'jobs' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E4AB8] rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`pb-4 px-4 font-medium transition-colors relative ${
                activeTab === 'applications' 
                  ? 'text-[#1E4AB8]' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Data Pelamar
              {activeTab === 'applications' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E4AB8] rounded-t-full" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Filters */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={activeTab === 'jobs' ? "Cari lowongan..." : "Cari pelamar..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                />
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                {activeTab === 'applications' && selectedIds.length > 0 && (
                  <select 
                    onChange={(e) => handleBulkAction(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                    defaultValue=""
                  >
                    <option value="" disabled>Aksi Massal ({selectedIds.length})</option>
                    <option value="Interview">Set Interview</option>
                    <option value="Accepted">Set Diterima</option>
                    <option value="Rejected">Set Ditolak</option>
                    <option value="delete">Hapus</option>
                  </select>
                )}
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] appearance-none bg-white"
                  >
                    <option value="Semua">Semua Status</option>
                    {activeTab === 'jobs' ? (
                      <>
                        <option value="Active">Aktif</option>
                        <option value="Closed">Ditutup</option>
                      </>
                    ) : (
                      <>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Direview</option>
                        <option value="Interview">Interview</option>
                        <option value="Accepted">Diterima</option>
                        <option value="Rejected">Ditolak</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {activeTab === 'applications' && (
                      <th className="px-6 py-4 w-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-[#1E4AB8] focus:ring-[#1E4AB8]"
                          checked={selectedIds.length === filteredApplications.length && filteredApplications.length > 0}
                          onChange={() => {
                            if (selectedIds.length === filteredApplications.length) {
                              setSelectedIds([]);
                            } else {
                              setSelectedIds(filteredApplications.map(app => app.id));
                            }
                          }}
                        />
                      </th>
                    )}
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      {activeTab === 'jobs' ? 'Posisi & Unit' : 'Pelamar'}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      {activeTab === 'jobs' ? 'Tipe & Lokasi' : 'Posisi Dilamar'}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      {activeTab === 'jobs' ? 'Pelamar' : 'Kualifikasi'}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      {activeTab === 'jobs' ? 'Tanggal' : 'Tanggal'}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeTab === 'jobs' ? (
                    jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{job.position}</div>
                          <div className="text-sm text-gray-500">{job.unit}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{job.type}</div>
                          <div className="text-sm text-gray-500">{job.location}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{job.applicants} Pelamar</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          Posting: {new Date(job.postedDate).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.status === 'Active' ? 'Aktif' : 'Ditutup'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-[#1E4AB8] focus:ring-[#1E4AB8]"
                            checked={selectedIds.includes(app.id)}
                            onChange={() => toggleSelection(app.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{app.name}</div>
                          <div className="text-sm text-gray-500">{app.email}</div>
                          <div className="text-xs text-gray-400">{app.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">{app.position}</div>
                          <div className="text-sm text-gray-500">{app.unit}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{app.education}</div>
                          <div className="text-xs text-gray-500">{app.experience}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(app.appliedDate).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                            app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            app.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                            app.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setSelectedApplication(app)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteApplication(app.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <div>Menampilkan 1-10 dari {activeTab === 'jobs' ? jobs.length : filteredApplications.length} data</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.name}</h2>
                <p className="text-gray-500">Pelamar untuk {selectedApplication.position}</p>
              </div>
              <button 
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Telepon</label>
                  <p className="text-gray-900">{selectedApplication.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Pendidikan</label>
                  <p className="text-gray-900">{selectedApplication.education}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Pengalaman</label>
                  <p className="text-gray-900">{selectedApplication.experience}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">Status Lamaran</label>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Reviewed', 'Interview', 'Accepted', 'Rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedApplication.id, status as Application['status'])}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedApplication.status === status
                          ? 'bg-[#1E4AB8] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setEmailRecipient({
                    email: selectedApplication.email,
                    name: selectedApplication.name,
                    position: selectedApplication.position
                  })}
                  className="btn-outline flex-1 flex justify-center items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Kirim Email
                </button>
                <button className="btn-outline flex-1 flex justify-center items-center gap-2">
                  <FileDown className="w-4 h-4" />
                  Download CV
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
}

