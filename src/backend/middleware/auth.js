const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { getOne } = require('../config/database');

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
      'SELECT id, username, email, role, full_name FROM users WHERE id = ? AND is_active = 1',
      [decoded.id]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan atau tidak aktif'
      });
    }

    // Attach user to request
    req.user = user;
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
