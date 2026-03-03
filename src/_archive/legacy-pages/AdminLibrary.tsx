import React, { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { BookOpen, Plus, Search, Filter, Edit, Trash2, Eye, X, Check, Users, TrendingUp, Clock, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface AdminLibraryProps {
  onNavigate?: (page: string) => void;
}

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

export const AdminLibrary: React.FC<AdminLibraryProps> = ({ onNavigate = () => {} }) => {
  const [selectedTab, setSelectedTab] = useState<'books' | 'borrowing' | 'statistics'>('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const menuItems = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate('admin-super') },
    { label: 'Perpustakaan', href: '#', onClick: () => {} },
    { label: 'Akademik', href: '#', onClick: () => {} },
    { label: 'Siswa', href: '#', onClick: () => onNavigate('admin-students') }
  ];

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
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        siteName="Admin Panel - Perpustakaan"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Manajemen Perpustakaan</h1>
              <p className="text-gray-600">Kelola koleksi buku dan peminjaman</p>
            </div>
            <button
              onClick={handleCreate}
              className="btn-primary flex items-center gap-2"
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
                  <p className="text-2xl mb-1">{stat.value}</p>
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
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'books'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Koleksi Buku
              </button>
              <button
                onClick={() => setSelectedTab('borrowing')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'borrowing'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Peminjaman
              </button>
              <button
                onClick={() => setSelectedTab('statistics')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  selectedTab === 'statistics'
                    ? 'bg-[#1E4AB8] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Statistik
              </button>
            </div>
          </div>
        </div>

        {/* Filters (for books tab) */}
        {selectedTab === 'books' && (
          <div className="bg-white rounded-2xl p-6 shadow-soft mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari judul, penulis, atau ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                />
              </div>

              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full py-2 bg-transparent outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {selectedTab === 'books' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
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
                  <h3 className="font-medium mt-2 mb-1 line-clamp-2">{book.title}</h3>
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
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Detail</span>
                    </button>
                    <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm flex items-center justify-center gap-1">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'borrowing' && (
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Judul Buku</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Peminjam</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Kelas</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tgl Pinjam</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Jatuh Tempo</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Tgl Kembali</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowingRecords.map((record, idx) => (
                    <tr key={record.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-4 py-3 font-medium">{record.bookTitle}</td>
                      <td className="px-4 py-3">{record.studentName}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {record.class}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{new Date(record.borrowDate).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-3 text-sm">{new Date(record.dueDate).toLocaleDateString('id-ID')}</td>
                      <td className="px-4 py-3 text-sm">
                        {record.returnDate ? new Date(record.returnDate).toLocaleDateString('id-ID') : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          record.status === 'returned' ? 'bg-green-100 text-green-700' :
                          record.status === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {record.status === 'returned' ? 'Kembali' :
                           record.status === 'overdue' ? 'Terlambat' :
                           'Dipinjam'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {record.status !== 'returned' && (
                          <button className="px-3 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm">
                            Kembalikan
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'statistics' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg mb-4">Kategori Terpopuler</h3>
              <div className="space-y-3">
                {categories.filter(c => c !== 'Semua').map((cat, idx) => {
                  const catBooks = books.filter(b => b.category === cat);
                  const borrowed = catBooks.reduce((sum, b) => sum + b.borrowed, 0);
                  const total = catBooks.reduce((sum, b) => sum + b.stock, 0);
                  const percentage = total > 0 ? (borrowed / total) * 100 : 0;
                  
                  return (
                    <div key={idx}>
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

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg mb-4">Buku Terpopuler</h3>
              <div className="space-y-3">
                {books
                  .sort((a, b) => b.borrowed - a.borrowed)
                  .slice(0, 5)
                  .map((book, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-[#1E4AB8] text-white flex items-center justify-center font-medium">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{book.title}</p>
                        <p className="text-xs text-gray-600">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#1E4AB8]">{book.borrowed}</p>
                        <p className="text-xs text-gray-600">dipinjam</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">
                  {modalMode === 'create' ? 'Tambah Buku Baru' : modalMode === 'edit' ? 'Edit Buku' : 'Detail Buku'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {modalMode === 'view' && selectedBook ? (
                <div className="space-y-4">
                  <div className="flex gap-6">
                    <div className="w-48 h-64 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <ImageWithFallback
                        src={selectedBook.cover}
                        alt={selectedBook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl mb-2">{selectedBook.title}</h3>
                      <p className="text-gray-600 mb-4">{selectedBook.author}</p>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Penerbit:</span> {selectedBook.publisher}</p>
                        <p><span className="font-medium">Tahun:</span> {selectedBook.year}</p>
                        <p><span className="font-medium">ISBN:</span> {selectedBook.isbn}</p>
                        <p><span className="font-medium">Kategori:</span> {selectedBook.category}</p>
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
                </div>
              ) : (
                <p className="text-center text-gray-600">Form tambah/edit buku</p>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-[#1E4AB8] text-white rounded-xl hover:bg-[#1a3d9a] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

