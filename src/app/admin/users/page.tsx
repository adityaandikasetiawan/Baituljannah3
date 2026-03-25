'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Users, Plus, Edit, Search, X, Trash2, User, Mail, Copy, Link } from 'lucide-react';

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin Unit' | 'Guru' | 'Siswa';
  unit: string;
  status: 'Aktif' | 'Non-Aktif';
  lastLogin: string;
  phone?: string;
  image?: string;
  inviteToken?: string;
  inviteExpiresAt?: string;
  passwordSet?: boolean;
}

export default function AdminUsersPage() {
  const { menuItems } = useNavigationMenu('admin');
  const adminProfile = useMemo(() => ({ userName: 'Admin Utama', userRole: 'Super Admin' as const }), []);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('Semua');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [inviteCreated, setInviteCreated] = useState<{ email: string; link: string; expiresAt: string } | null>(null);

  // Mock Data
  const [userList, setUserList] = useState<UserItem[]>([
    { 
      id: 1, 
      name: 'Ahmad Fauzi', 
      email: 'ahmad.fauzi@baituljannah.sch.id', 
      role: 'Admin Unit', 
      unit: 'SDIT', 
      status: 'Aktif', 
      lastLogin: '2024-12-01 08:30',
      phone: '081234567890'
    },
    { 
      id: 2, 
      name: 'Siti Aisyah', 
      email: 'siti.aisyah@baituljannah.sch.id', 
      role: 'Admin Unit', 
      unit: 'SMAIT', 
      status: 'Aktif', 
      lastLogin: '2024-12-01 09:15',
      phone: '081234567891'
    },
    { 
      id: 3, 
      name: 'Ustadz Muhammad', 
      email: 'muhammad@baituljannah.sch.id', 
      role: 'Guru', 
      unit: 'SDIT', 
      status: 'Aktif', 
      lastLogin: '2024-12-01 07:45',
      phone: '081234567892'
    },
    { 
      id: 4, 
      name: 'Ustadzah Fatimah', 
      email: 'fatimah@baituljannah.sch.id', 
      role: 'Guru', 
      unit: 'SMPIT', 
      status: 'Aktif', 
      lastLogin: '2024-11-30 14:20',
      phone: '081234567893'
    },
    { 
      id: 5, 
      name: 'Abdullah Rahman', 
      email: 'abdullah@baituljannah.sch.id', 
      role: 'Siswa', 
      unit: 'SMAIT', 
      status: 'Aktif', 
      lastLogin: '2024-12-01 10:00',
      phone: '081234567894'
    }
  ]);

  const [formData, setFormData] = useState<Partial<UserItem>>({
    name: '',
    email: '',
    role: 'Siswa',
    unit: 'SDIT',
    status: 'Aktif',
    phone: ''
  });

  const filteredUsers = userList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'Semua' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  useEffect(() => {
    const raw = localStorage.getItem('baituljannah_password_set_emails_v1');
    if (!raw) return;
    const emails = JSON.parse(raw) as string[];
    if (!Array.isArray(emails) || emails.length === 0) return;

    setUserList((prev) =>
      prev.map((u) =>
        emails.includes(u.email)
          ? { ...u, status: 'Aktif', passwordSet: true, inviteToken: undefined, inviteExpiresAt: undefined }
          : u
      )
    );
  }, []);

  const encodeBase64Url = (input: string) => {
    const base64 = btoa(unescape(encodeURIComponent(input)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  };

  const buildInviteToken = (payload: {
    email: string;
    fullName: string;
    role: UserItem['role'];
    unit: string;
    exp: number;
    nonce: string;
  }) => {
    return encodeBase64Url(JSON.stringify(payload));
  };

  const buildInviteLink = (token: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/setup-password?token=${encodeURIComponent(token)}`;
  };

  const sendInviteEmail = (email: string, link: string) => {
    const subject = `Undangan Akun - Yayasan Baituljannah`;
    const body = `Assalamu'alaikum Wr. Wb.\n\nAkun Anda telah dibuat di Sistem Yayasan Baituljannah.\n\nSilakan atur password Anda melalui tautan berikut (berlaku 24 jam):\n${link}\n\nWassalamu'alaikum Wr. Wb.`;
    window.open(`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      email: '',
      role: 'Siswa',
      unit: 'SDIT',
      status: 'Aktif',
      phone: ''
    });
    setShowModal(true);
  };

  const handleEdit = (user: UserItem) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      setUserList(userList.filter(user => user.id !== showDeleteConfirm));
      setShowDeleteConfirm(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const exp = Date.now() + 24 * 60 * 60 * 1000;
      const token = buildInviteToken({
        email: formData.email || '',
        fullName: formData.name || '',
        role: formData.role as any,
        unit: formData.unit || 'SDIT',
        exp,
        nonce: crypto.randomUUID()
      });
      const link = buildInviteLink(token);

      const newUser: UserItem = {
        id: userList.length + 1,
        name: formData.name || '',
        email: formData.email || '',
        role: formData.role as any,
        unit: formData.unit || 'SDIT',
        status: 'Non-Aktif',
        lastLogin: 'Belum pernah login',
        phone: formData.phone,
        inviteToken: token,
        inviteExpiresAt: new Date(exp).toISOString(),
        passwordSet: false
      };
      setUserList([...userList, newUser]);
      setInviteCreated({ email: newUser.email, link, expiresAt: newUser.inviteExpiresAt! });
    } else if (selectedUser) {
      setUserList(userList.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } as UserItem : user
      ));
    }
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={menuItems}
        accentColor="#1E4AB8"
        userRole={adminProfile.userRole}
        userName={adminProfile.userName}
        panelTitle="Portal Admin"
        panelSubtitle="Manajemen Yayasan"
      />

      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4 md:p-6 pl-16 lg:pl-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">Manajemen User</h1>
              <p className="text-gray-500 text-xs md:text-sm truncate">Kelola data pengguna sistem Yayasan Baituljannah</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E4AB8]/10 flex items-center justify-center text-[#1E4AB8]">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 lg:p-8 pl-16 lg:pl-8">
          {/* Filters and Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari user berdasarkan nama atau email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] transition-all bg-white"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="Semua">Semua Role</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin Unit">Admin Unit</option>
              <option value="Guru">Guru</option>
              <option value="Siswa">Siswa</option>
            </select>
            <button
              onClick={handleCreate}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-all shadow-lg shadow-[#1E4AB8]/20 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah User</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Nama</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Role</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Unit</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Last Login</th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{user.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'Admin Unit' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'Guru' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{user.unit}</td>
                      <td className="py-4 px-6">
                        {user.passwordSet ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Aktif</span>
                        ) : user.inviteToken ? (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Invited</span>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {user.status}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">{user.lastLogin}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              if (!user.inviteToken) return;
                              sendInviteEmail(user.email, buildInviteLink(user.inviteToken));
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              user.inviteToken ? 'text-amber-700 hover:bg-amber-50' : 'text-gray-400 cursor-not-allowed'
                            }`}
                            title="Kirim Undangan"
                            disabled={!user.inviteToken}
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(user.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                Tidak ada user yang ditemukan
              </div>
            )}
          </div>
        </div>
      </main>

      {inviteCreated && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Undangan Berhasil Dibuat</h2>
              <button
                onClick={() => setInviteCreated(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <p className="text-sm text-amber-900 mb-1">Email</p>
                <p className="text-base text-amber-900">{inviteCreated.email}</p>
                <p className="text-xs text-amber-700 mt-2">
                  Tautan berlaku sampai {new Date(inviteCreated.expiresAt).toLocaleString('id-ID')}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Tautan Setup Password</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 break-all">
                    {inviteCreated.link}
                  </div>
                  <button
                    onClick={() => copyText(inviteCreated.link)}
                    className="px-4 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => sendInviteEmail(inviteCreated.email, inviteCreated.link)}
                  className="px-4 py-3 rounded-xl bg-[#1E4AB8] text-white hover:bg-[#1E4AB8]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Kirim via Email
                </button>
                <button
                  onClick={() => window.open(inviteCreated.link, '_blank')}
                  className="px-4 py-3 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Link className="w-5 h-5" />
                  Buka Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === 'create' ? 'Tambah User Baru' : 'Edit Data User'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {modalMode === 'create' ? (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-sm text-blue-900">
                    Password tidak diisi oleh admin. Sistem akan membuat tautan undangan agar user mengatur password sendiri.
                  </p>
                </div>
              ) : null}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="Contoh: Ahmad Fauzi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="email@sekolah.id"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin Unit">Admin Unit</option>
                    <option value="Guru">Guru</option>
                    <option value="Siswa">Siswa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Unit *</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  >
                    <option value="Yayasan">Yayasan</option>
                    <option value="TKIT">TKIT</option>
                    <option value="SDIT">SDIT</option>
                    <option value="SMPIT">SMPIT</option>
                    <option value="SMAIT">SMAIT</option>
                    <option value="SLBIT">SLBIT</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">No. Telepon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                    placeholder="0812..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1E4AB8]/90 transition-colors font-medium shadow-lg shadow-[#1E4AB8]/20"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Hapus User?</h3>
            <p className="text-gray-600 text-center mb-6">
              Data user yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

