import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Users, Plus, Edit, Search, Filter, X, Check, GraduationCap, Mail, Phone, Calendar, MapPin, Award, BarChart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface AdminStudentsProps {
  onNavigate?: (page: string) => void;
}

interface Student {
  id: number;
  nis: string;
  name: string;
  gender: 'L' | 'P';
  class: string;
  unit: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
  status: 'Active' | 'Inactive';
  enrollmentDate: string;
  image: string;
  gpa: number;
  attendance: number;
}

export const AdminStudents: React.FC<AdminStudentsProps> = ({ onNavigate = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUnit, setFilterUnit] = useState('Semua');
  const [filterClass, setFilterClass] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate('admin-super') },
    { label: 'Siswa', href: '#', onClick: () => {} },
    { label: 'Guru', href: '#', onClick: () => onNavigate('teachers') },
    { label: 'Akademik', href: '#', onClick: () => {} },
    { label: 'Keuangan', href: '#', onClick: () => {} }
  ];

  const [studentList, setStudentList] = useState<Student[]>([
    {
      id: 1,
      nis: '2024001',
      name: 'Muhammad Rizki Pratama',
      gender: 'L',
      class: 'XII IPA 1',
      unit: 'SMAIT',
      birthDate: '2006-05-15',
      email: 'rizki@student.baituljannah.sch.id',
      phone: '081234567890',
      address: 'Jl. Pendidikan No. 123, Jakarta Selatan',
      parentName: 'Bapak Ahmad',
      parentPhone: '081234567891',
      status: 'Active',
      enrollmentDate: '2021-07-01',
      image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
      gpa: 3.85,
      attendance: 95
    },
    {
      id: 2,
      nis: '2024002',
      name: 'Siti Aisyah Putri',
      gender: 'P',
      class: 'XI IPA 2',
      unit: 'SMAIT',
      birthDate: '2007-03-20',
      email: 'aisyah@student.baituljannah.sch.id',
      phone: '081234567892',
      address: 'Jl. Melati No. 45, Jakarta Selatan',
      parentName: 'Ibu Fatimah',
      parentPhone: '081234567893',
      status: 'Active',
      enrollmentDate: '2022-07-01',
      image: 'https://images.unsplash.com/photo-1607147728331-ecf4ff0bd437',
      gpa: 3.92,
      attendance: 98
    },
    {
      id: 3,
      nis: '2023045',
      name: 'Ahmad Fauzi',
      gender: 'L',
      class: 'IX A',
      unit: 'SMPIT',
      birthDate: '2009-08-10',
      email: 'fauzi@student.baituljannah.sch.id',
      phone: '081234567894',
      address: 'Jl. Mawar No. 78, Jakarta Selatan',
      parentName: 'Bapak Hasan',
      parentPhone: '081234567895',
      status: 'Active',
      enrollmentDate: '2020-07-01',
      image: 'https://images.unsplash.com/photo-1659080907111-7c726e435a28',
      gpa: 3.75,
      attendance: 92
    },
    {
      id: 4,
      nis: '2023046',
      name: 'Fatimah Zahra',
      gender: 'P',
      class: 'VIII B',
      unit: 'SMPIT',
      birthDate: '2010-11-25',
      email: 'zahra@student.baituljannah.sch.id',
      phone: '081234567896',
      address: 'Jl. Anggrek No. 90, Jakarta Selatan',
      parentName: 'Ibu Maryam',
      parentPhone: '081234567897',
      status: 'Active',
      enrollmentDate: '2021-07-01',
      image: 'https://images.unsplash.com/photo-1757876506562-0b0087ab3dcd',
      gpa: 3.88,
      attendance: 96
    },
    {
      id: 5,
      nis: '2022078',
      name: 'Abdullah Rahman',
      gender: 'L',
      class: 'VI A',
      unit: 'SDIT',
      birthDate: '2012-02-14',
      email: 'abdullah@student.baituljannah.sch.id',
      phone: '081234567898',
      address: 'Jl. Kenanga No. 56, Jakarta Selatan',
      parentName: 'Bapak Ibrahim',
      parentPhone: '081234567899',
      status: 'Active',
      enrollmentDate: '2018-07-01',
      image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
      gpa: 3.70,
      attendance: 94
    },
    {
      id: 6,
      nis: '2022079',
      name: 'Maryam Azzahra',
      gender: 'P',
      class: 'V B',
      unit: 'SDIT',
      birthDate: '2013-06-30',
      email: 'maryam@student.baituljannah.sch.id',
      phone: '081234567800',
      address: 'Jl. Dahlia No. 32, Jakarta Selatan',
      parentName: 'Ibu Khadijah',
      parentPhone: '081234567801',
      status: 'Active',
      enrollmentDate: '2019-07-01',
      image: 'https://images.unsplash.com/photo-1607147728331-ecf4ff0bd437',
      gpa: 3.95,
      attendance: 99
    }
  ]);

  const [formData, setFormData] = useState<Partial<Student>>({
    nis: '',
    name: '',
    gender: 'L',
    class: '',
    unit: 'SMAIT',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    parentName: '',
    parentPhone: '',
    status: 'Active',
    enrollmentDate: new Date().toISOString().split('T')[0],
    image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
    gpa: 0,
    attendance: 0
  });

  const units = ['Semua', 'TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT'];
  const classes = ['Semua', 'XII IPA 1', 'XI IPA 2', 'IX A', 'VIII B', 'VI A', 'V B'];
  const statuses = ['Semua', 'Active', 'Inactive'];

  const filteredStudents = studentList.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.nis.includes(searchQuery);
    const matchesUnit = filterUnit === 'Semua' || student.unit === filterUnit;
    const matchesClass = filterClass === 'Semua' || student.class === filterClass;
    const matchesStatus = filterStatus === 'Semua' || student.status === filterStatus;
    return matchesSearch && matchesUnit && matchesClass && matchesStatus;
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      nis: '',
      name: '',
      gender: 'L',
      class: '',
      unit: 'SMAIT',
      birthDate: '',
      email: '',
      phone: '',
      address: '',
      parentName: '',
      parentPhone: '',
      status: 'Active',
      enrollmentDate: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b',
      gpa: 0,
      attendance: 0
    });
    setShowModal(true);
  };

  const handleEdit = (student: Student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleView = (student: Student) => {
    setModalMode('view');
    setSelectedStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newStudent: Student = {
        ...formData as Student,
        id: Math.max(...studentList.map(s => s.id), 0) + 1
      };
      setStudentList([...studentList, newStudent]);
    } else if (modalMode === 'edit' && selectedStudent) {
      setStudentList(studentList.map(student => 
        student.id === selectedStudent.id ? { ...formData as Student, id: selectedStudent.id } : student
      ));
    }
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'gpa' || name === 'attendance' ? parseFloat(value) || 0 : value
    });
  };

  const stats = [
    { label: 'Total Siswa', value: studentList.length, color: 'from-blue-500 to-blue-600', icon: Users },
    { label: 'Siswa Aktif', value: studentList.filter(s => s.status === 'Active').length, color: 'from-green-500 to-green-600', icon: Award },
    { label: 'Rata-rata IPK', value: (studentList.reduce((sum, s) => sum + s.gpa, 0) / studentList.length).toFixed(2), color: 'from-purple-500 to-purple-600', icon: BarChart },
    { label: 'Kehadiran Avg', value: `${Math.round(studentList.reduce((sum, s) => sum + s.attendance, 0) / studentList.length)}%`, color: 'from-orange-500 to-orange-600', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Admin Panel - Siswa"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Manajemen Siswa</h1>
              <p className="text-gray-600">Kelola data siswa dari semua unit sekolah</p>
            </div>
            <button
              onClick={handleCreate}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Siswa</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau NIS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
              />
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterUnit}
                onChange={(e) => setFilterUnit(e.target.value)}
                className="w-full py-2 bg-transparent outline-none"
              >
                {units.map(unit => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
              <GraduationCap className="w-5 h-5 text-gray-400" />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full py-2 bg-transparent outline-none"
              >
                {classes.map(cls => (
                  <option key={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
              <Award className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full py-2 bg-transparent outline-none"
              >
                {statuses.map(status => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan <strong>{filteredStudents.length}</strong> dari <strong>{studentList.length}</strong> siswa
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Siswa</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">NIS</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Kelas</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Unit</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">IPK</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Kehadiran</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, idx) => (
                  <tr key={student.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                          <ImageWithFallback
                            src={student.image}
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{student.nis}</td>
                    <td className="px-6 py-4 text-sm">{student.class}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {student.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{student.gpa.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-[60px]">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: `${student.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.attendance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        student.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(student)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Users className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">Tidak ada siswa yang ditemukan</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">
                  {modalMode === 'create' ? 'Tambah Siswa Baru' : modalMode === 'edit' ? 'Edit Data Siswa' : 'Detail Siswa'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {modalMode !== 'view' ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">NIS *</label>
                      <input
                        type="text"
                        name="nis"
                        value={formData.nis}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="202400XX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="Nama siswa"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Jenis Kelamin *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Unit *</label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      >
                        {units.filter(u => u !== 'Semua').map(unit => (
                          <option key={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Kelas *</label>
                      <input
                        type="text"
                        name="class"
                        value={formData.class}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="XII IPA 1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tanggal Lahir *</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tanggal Masuk *</label>
                      <input
                        type="date"
                        name="enrollmentDate"
                        value={formData.enrollmentDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="email@student.baituljannah.sch.id"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Telepon *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="081234567890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Alamat *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      placeholder="Alamat lengkap"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Orang Tua *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="Nama orang tua/wali"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Telepon Orang Tua *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="081234567890"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">IPK</label>
                      <input
                        type="number"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        max="4"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="3.50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Kehadiran (%)</label>
                      <input
                        type="number"
                        name="attendance"
                        value={formData.attendance}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                        placeholder="95"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Status *</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                /* View Mode */
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                      <ImageWithFallback
                        src={formData.image || ''}
                        alt={formData.name || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl mb-1">{formData.name}</h3>
                      <p className="text-gray-600">{formData.nis} • {formData.unit}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          formData.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {formData.status}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {formData.class}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Informasi Pribadi</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Lahir: {formData.birthDate && new Date(formData.birthDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{formData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{formData.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span className="text-gray-600">{formData.address}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Informasi Orang Tua</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{formData.parentName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{formData.parentPhone}</span>
                        </div>
                      </div>

                      <h4 className="font-medium mb-3 mt-6">Akademik</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <BarChart className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">IPK: <strong>{formData.gpa}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Kehadiran: <strong>{formData.attendance}%</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {modalMode === 'view' ? 'Tutup' : 'Batal'}
              </button>
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{modalMode === 'create' ? 'Tambah Siswa' : 'Simpan Perubahan'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

