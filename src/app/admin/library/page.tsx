'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { BookOpen, Plus, Search, Filter, Edit, Trash2, Eye, X, Check, Users, TrendingUp, Clock, Calendar, Download } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  category: string;
  stock: number;
  borrowed: number;
  available: number;
  cover: string;
  location: string;
}

interface BorrowingRecord {
  id: number;
  bookTitle: string;
  studentName: string;
  class: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'borrowed' | 'returned' | 'overdue';
}

export default function AdminLibraryPage() {
  const { menuItems } = useNavigationMenu('admin');
  const [selectedTab, setSelectedTab] = useState<'books' | 'borrowing' | 'statistics'>('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const accentColor = '#1E4AB8';

  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      isbn: '978-979-433-123-4',
      title: 'Tafsir Al-Misbah',
      author: 'M. Quraish Shihab',
      publisher: 'Lentera Hati',
      year: 2020,
      category: 'Keagamaan',
      stock: 15,
      borrowed: 8,
      available: 7,
      cover: 'https://images.unsplash.com/photo-1632217142144-f96b15d867a7',
      location: 'Rak A-1'
    },
    {
      id: 2,
      isbn: '978-602-036-456-7',
      title: 'Matematika Kelas XII',
      author: 'Tim Penulis',
      publisher: 'Erlangga',
      year: 2023,
      category: 'Pelajaran',
      stock: 40,
      borrowed: 32,
      available: 8,
      cover: 'https://images.unsplash.com/photo-1560785496-321917f24016',
      location: 'Rak B-3'
    },
    {
      id: 3,
      isbn: '978-623-123-789-0',
      title: 'The Art of Thinking Clearly',
      author: 'Rolf Dobelli',
      publisher: 'Gramedia',
      year: 2022,
      category: 'Pengembangan Diri',
      stock: 10,
      borrowed: 5,
      available: 5,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      location: 'Rak C-2'
    },
    {
      id: 4,
      isbn: '978-979-456-321-8',
      title: 'Fisika untuk SMA',
      author: 'Marthen Kanginan',
      publisher: 'Erlangga',
      year: 2023,
      category: 'Pelajaran',
      stock: 35,
      borrowed: 28,
      available: 7,
      cover: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
      location: 'Rak B-4'
    },
    {
      id: 5,
      isbn: '978-602-789-654-3',
      title: 'Sirah Nabawiyah',
      author: 'Syaikh Shafiyyurrahman Al-Mubarakfuri',
      publisher: 'Darul Haq',
      year: 2021,
      category: 'Keagamaan',
      stock: 20,
      borrowed: 12,
      available: 8,
      cover: 'https://images.unsplash.com/photo-1585779034823-7e9ac8faec70',
      location: 'Rak A-2'
    },
    {
      id: 6,
      isbn: '978-979-321-987-6',
      title: 'Ensiklopedia Sains',
      author: 'DK Publishing',
      publisher: 'Grasindo',
      year: 2022,
      category: 'Referensi',
      stock: 5,
      borrowed: 2,
      available: 3,
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
      location: 'Rak D-1'
    }
  ]);

  const borrowingRecords: BorrowingRecord[] = [
    {
      id: 1,
      bookTitle: 'Matematika Kelas XII',
      studentName: 'Muhammad Rizki',
      class: 'XII IPA 1',
      borrowDate: '2024-11-20',
      dueDate: '2024-12-04',
      returnDate: null,
      status: 'borrowed'
    },
    {
      id: 2,
      bookTitle: 'Fisika untuk SMA',
      studentName: 'Siti Aisyah',
      class: 'XII IPA 2',
      borrowDate: '2024-11-18',
      dueDate: '2024-12-02',
      returnDate: null,
      status: 'overdue'
    },
    {
      id: 3,
      bookTitle: 'Tafsir Al-Misbah',
      studentName: 'Ahmad Fauzi',
      class: 'XI IPA 1',
      borrowDate: '2024-11-25',
      dueDate: '2024-12-09',
      returnDate: null,
      status: 'borrowed'
    },
    {
      id: 4,
      bookTitle: 'The Art of Thinking Clearly',
      studentName: 'Fatimah Zahra',
      class: 'X IPA 1',
      borrowDate: '2024-11-10',
      dueDate: '2024-11-24',
      returnDate: '2024-11-23',
      status: 'returned'
    }
  ];

  const categories = ['Semua', 'Keagamaan', 'Pelajaran', 'Pengembangan Diri', 'Referensi', 'Fiksi', 'Non-Fiksi'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.isbn.includes(searchQuery);
    const matchesCategory = filterCategory === 'Semua' || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalBooks = books.reduce((sum, b) => sum + b.stock, 0);
  const totalBorrowed = books.reduce((sum, b) => sum + b.borrowed, 0);
  const totalAvailable = books.reduce((sum, b) => sum + b.available, 0);
  const overdueCount = borrowingRecords.filter(r => r.status === 'overdue').length;

  const stats = [
    {
      label: 'Total Buku',
      value: totalBooks,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      detail: `${books.length} judul`
    },
    {
      label: 'Sedang Dipinjam',
      value: totalBorrowed,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      detail: 'Buku dipinjam'
    },
    {
      label: 'Tersedia',
      value: totalAvailable,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      detail: 'Ready to borrow'
    },
    {
      label: 'Terlambat',
      value: overdueCount,
      icon: Clock,
      color: 'from-red-500 to-red-600',
      detail: 'Perlu follow-up'
    }
  ];

  const handleCreate = () => {
    setModalMode('create');
    setShowModal(true);
  };

  const handleView = (book: Book) => {
    setModalMode('view');
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        menuItems={menuItems} 
        siteName="Admin Panel" 
        userName="Admin Utama"
        userRole="Super Admin"
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Manajemen Perpustakaan</h1>
                <p className="text-gray-600">Kelola koleksi buku dan peminjaman</p>
              </div>
              <button
                onClick={handleCreate}
                className="btn-primary flex items-center gap-2 px-4 py-2 bg-[#1E4AB8] text-white rounded-lg hover:bg-[#1a3d9a] transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Tambah Buku</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-strong transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-2xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setSelectedTab('books')}
                  className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    selectedTab === 'books'
                      ? 'border-[#1E4AB8] text-[#1E4AB8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Koleksi Buku
                </button>
                <button
                  onClick={() => setSelectedTab('borrowing')}
                  className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    selectedTab === 'borrowing'
                      ? 'border-[#1E4AB8] text-[#1E4AB8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Peminjaman
                </button>
                <button
                  onClick={() => setSelectedTab('statistics')}
                  className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    selectedTab === 'statistics'
                      ? 'border-[#1E4AB8] text-[#1E4AB8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Statistik
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedTab === 'books' && (
                <>
                  {/* Filters */}
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Cari buku berdasarkan judul, penulis, atau ISBN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8]"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E4AB8]/20 focus:border-[#1E4AB8] appearance-none bg-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Books Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                      <div key={book.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[2/3] relative overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {book.category}
                          </span>
                          <h3 className="font-bold mt-2 mb-1 line-clamp-2">{book.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                          <p className="text-xs text-gray-500 mb-3">
                            {book.publisher} • {book.year} • ISBN: {book.isbn}
                          </p>
                          
                          <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
                            <div className="bg-gray-50 rounded-lg p-2">
                              <p className="text-gray-600">Stok</p>
                              <p className="font-medium">{book.stock}</p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-2">
                              <p className="text-gray-600">Dipinjam</p>
                              <p className="font-medium text-orange-600">{book.borrowed}</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-2">
                              <p className="text-gray-600">Tersedia</p>
                              <p className="font-medium text-green-600">{book.available}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleView(book)}
                              className="flex-1 py-2 bg-[#1E4AB8] text-white text-sm rounded-lg hover:bg-[#1a3d9a] transition-colors"
                            >
                              Detail
                            </button>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedTab === 'borrowing' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 rounded-l-xl">Buku</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Peminjam</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tgl Pinjam</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tenggat</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 rounded-r-xl">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {borrowingRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{record.bookTitle}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium">{record.studentName}</p>
                            <p className="text-xs text-gray-500">{record.class}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(record.borrowDate).toLocaleDateString('id-ID')}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(record.dueDate).toLocaleDateString('id-ID')}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 text-xs rounded-full ${
                              record.status === 'returned' ? 'bg-green-100 text-green-700' :
                              record.status === 'overdue' ? 'bg-red-100 text-red-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {record.status === 'returned' ? 'Kembali' :
                               record.status === 'overdue' ? 'Terlambat' : 'Dipinjam'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-[#1E4AB8] hover:text-[#1a3d9a] text-sm font-medium">
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedTab === 'statistics' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Buku Terpopuler</h3>
                    <div className="space-y-4">
                      {books.slice(0, 5).sort((a, b) => b.borrowed - a.borrowed).map((book, idx) => (
                        <div key={book.id} className="flex items-center gap-4">
                          <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full text-sm font-bold text-gray-500 shadow-sm">
                            {idx + 1}
                          </span>
                          <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden">
                            <ImageWithFallback src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-1">{book.title}</p>
                            <p className="text-xs text-gray-500">{book.author}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#1E4AB8]">{book.borrowed}</p>
                            <p className="text-xs text-gray-500">kali dipinjam</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Kategori Buku</h3>
                    <div className="space-y-4">
                      {categories.filter(c => c !== 'Semua').map((cat) => {
                        const count = books.filter(b => b.category === cat).length;
                        const total = books.length;
                        const percentage = (count / total) * 100;
                        const borrowed = books.filter(b => b.category === cat).reduce((sum, b) => sum + b.borrowed, 0);

                        return (
                          <div key={cat}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">{cat}</span>
                              <span className="text-sm text-gray-600">{borrowed}/{total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#1E4AB8] h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl my-8 overflow-y-auto max-h-[90vh]">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {modalMode === 'create' ? 'Tambah Buku Baru' : modalMode === 'edit' ? 'Edit Buku' : 'Detail Buku'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {modalMode === 'view' && selectedBook ? (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                      <ImageWithFallback
                        src={selectedBook.cover}
                        alt={selectedBook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {selectedBook.category}
                      </span>
                      <h3 className="text-2xl font-bold mt-2 mb-1">{selectedBook.title}</h3>
                      <p className="text-lg text-gray-600">{selectedBook.author}</p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 border-t border-b py-4">
                      <p><span className="font-medium">Penerbit:</span> {selectedBook.publisher}</p>
                      <p><span className="font-medium">Tahun Terbit:</span> {selectedBook.year}</p>
                      <p><span className="font-medium">ISBN:</span> {selectedBook.isbn}</p>
                      <p><span className="font-medium">Lokasi:</span> {selectedBook.location}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-medium">{selectedBook.stock}</p>
                        <p className="text-xs text-gray-600">Total Stok</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-medium text-orange-600">{selectedBook.borrowed}</p>
                        <p className="text-xs text-gray-600">Dipinjam</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-medium text-green-600">{selectedBook.available}</p>
                        <p className="text-xs text-gray-600">Tersedia</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-600">Form tambah/edit buku akan segera hadir.</p>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

