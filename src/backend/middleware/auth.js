const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { getOne } = require('../config/database');

const normalizeRole = (role) => {
  if (!role) return 'siswa';
  const r = String(role).toLowerCase();
  if (['admin', 'super_admin', 'admin_unit'].includes(r)) return 'admin';
  if (['guru', 'teacher'].includes(r)) return 'guru';
  if (['ortu', 'orang_tua', 'parent'].includes(r)) return 'ortu';
  return 'siswa';
};

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies (optional)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Tidak ada akses. Silakan login terlebih dahulu'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Get user from database
    const user = await getOne(
      `SELECT 
         u.id,
         u.username,
         u.email,
         u.role,
         u.school_unit_id,
         u.status,
         up.full_name
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE u.id = ?`,
      [decoded.id]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan atau tidak aktif'
      });
    }

    if (String(user.status).toLowerCase() !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan atau tidak aktif'
      });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name || user.username,
      role: normalizeRole(user.role),
      role_raw: user.role,
      school_unit_id: user.school_unit_id == null ? null : Number(user.school_unit_id)
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau sudah kadaluarsa'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} tidak memiliki akses ke resource ini`
      });
    }
    next();
  };
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Hanya admin yang dapat mengakses resource ini'
    });
  }
  next();
};

// Check if user owns the resource or is admin
exports.isOwnerOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (req.user.id !== resourceUserId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses ke resource ini'
      });
    }
    next();
  };
};
