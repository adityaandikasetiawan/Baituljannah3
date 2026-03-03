const { body, validationResult } = require('express-validator');

// Handle validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Login validation rules
exports.loginRules = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email tidak valid')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password wajib diisi')
    .isLength({ min: 6 })
    .withMessage('Password minimal 6 karakter')
];

// Register validation rules
exports.registerRules = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username wajib diisi')
    .isLength({ min: 3, max: 50 })
    .withMessage('Username harus 3-50 karakter')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username hanya boleh mengandung huruf, angka, dan underscore'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email tidak valid')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password wajib diisi')
    .isLength({ min: 6 })
    .withMessage('Password minimal 6 karakter')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password harus mengandung huruf besar, huruf kecil, dan angka'),
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Nama lengkap wajib diisi')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nama lengkap harus 3-100 karakter'),
  body('role')
    .optional()
    .isIn(['admin', 'guru', 'siswa', 'ortu'])
    .withMessage('Role tidak valid')
];

// PPDB validation rules
exports.ppdbRules = [
  body('nama_lengkap')
    .trim()
    .notEmpty()
    .withMessage('Nama lengkap wajib diisi')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nama lengkap harus 3-100 karakter'),
  body('jenjang')
    .notEmpty()
    .withMessage('Jenjang pendidikan wajib dipilih')
    .isIn(['TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT'])
    .withMessage('Jenjang pendidikan tidak valid'),
  body('jenis_kelamin')
    .notEmpty()
    .withMessage('Jenis kelamin wajib dipilih')
    .isIn(['L', 'P'])
    .withMessage('Jenis kelamin tidak valid'),
  body('tanggal_lahir')
    .notEmpty()
    .withMessage('Tanggal lahir wajib diisi')
    .isDate()
    .withMessage('Format tanggal lahir tidak valid'),
  body('nama_ayah')
    .trim()
    .notEmpty()
    .withMessage('Nama ayah wajib diisi'),
  body('nama_ibu')
    .trim()
    .notEmpty()
    .withMessage('Nama ibu wajib diisi'),
  body('no_telp')
    .trim()
    .notEmpty()
    .withMessage('Nomor telepon wajib diisi')
    .matches(/^(\+62|62|0)[0-9]{9,13}$/)
    .withMessage('Format nomor telepon tidak valid'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email tidak valid')
    .normalizeEmail(),
  body('alamat')
    .trim()
    .notEmpty()
    .withMessage('Alamat wajib diisi')
];

// Contact form validation rules
exports.contactRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nama wajib diisi')
    .isLength({ min: 3, max: 100 })
    .withMessage('Nama harus 3-100 karakter'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email tidak valid')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Nomor telepon wajib diisi')
    .matches(/^(\+62|62|0)[0-9]{9,13}$/)
    .withMessage('Format nomor telepon tidak valid'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subjek wajib diisi')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subjek harus 5-200 karakter'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Pesan wajib diisi')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Pesan harus 10-1000 karakter')
];

// News validation rules
exports.newsRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Judul berita wajib diisi')
    .isLength({ min: 5, max: 200 })
    .withMessage('Judul harus 5-200 karakter'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Konten berita wajib diisi')
    .isLength({ min: 50 })
    .withMessage('Konten minimal 50 karakter'),
  body('category')
    .notEmpty()
    .withMessage('Kategori wajib dipilih')
    .isIn(['Akademik', 'Kegiatan', 'Prestasi', 'Pengumuman', 'Lainnya'])
    .withMessage('Kategori tidak valid'),
  body('unit_sekolah')
    .optional()
    .isIn(['TKIT', 'SDIT', 'SMPIT', 'SMAIT', 'SLBIT', 'Semua'])
    .withMessage('Unit sekolah tidak valid')
];
