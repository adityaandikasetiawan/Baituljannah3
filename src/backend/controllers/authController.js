const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery, getOne, insert } = require('../config/database');
const config = require('../config/config');

const normalizeRole = (role) => {
  if (!role) return 'siswa';
  const r = String(role).toLowerCase();
  if (['admin', 'super_admin', 'admin_unit'].includes(r)) return 'admin';
  if (['guru', 'teacher'].includes(r)) return 'guru';
  if (['ortu', 'orang_tua', 'parent'].includes(r)) return 'ortu';
  return 'siswa';
};

const toDbRole = (role) => {
  const r = String(role || '').toLowerCase();
  if (r === 'admin') return 'super_admin';
  if (r === 'ortu' || r === 'orang_tua' || r === 'parent') return 'orang_tua';
  if (r === 'guru' || r === 'teacher') return 'guru';
  return 'siswa';
};

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expire
  });
};

const portalSlugs = new Set(['main', 'tkit', 'sdit', 'smpit', 'smait', 'slbit']);
const schoolUnitIdByCodeCache = new Map();
const getSchoolUnitIdByCode = async (code) => {
  const key = String(code || '').trim().toLowerCase();
  if (!key) return null;
  if (schoolUnitIdByCodeCache.has(key)) return schoolUnitIdByCodeCache.get(key);
  const row = await getOne('SELECT id FROM school_units WHERE LOWER(code) = ? LIMIT 1', [key]);
  const id = row?.id == null ? null : Number(row.id);
  schoolUnitIdByCodeCache.set(key, id);
  return id;
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { username, email, password, full_name, phone } = req.body;
    const requestedRole = String(req.body?.role || '').toLowerCase();
    const role = requestedRole === 'ortu' ? 'ortu' : 'siswa';

    // Check if user already exists
    const existingUser = await getOne(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email atau username sudah terdaftar'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRounds);

    // Insert user
    const userId = await insert(
      `INSERT INTO users (username, email, password_hash, role, status, email_verified, created_at, updated_at) 
       VALUES (?, ?, ?, ?, 'active', 0, NOW(), NOW())`,
      [username, email, hashedPassword, toDbRole(role)]
    );

    await executeQuery(
      `INSERT INTO user_profiles (user_id, full_name, phone, created_at, updated_at)
       VALUES (?, ?, ?, NOW(), NOW())`,
      [userId, full_name || username, phone || null]
    );

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: {
        id: userId,
        username,
        email,
        full_name: full_name || username,
        role,
        token
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat registrasi',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifier = String(email || '').trim();
    const requestedPortal = String(req.body?.portal || '').trim().toLowerCase();
    const portal = portalSlugs.has(requestedPortal) ? requestedPortal : '';
    const allowDemoLogin = String(process.env.ALLOW_DEMO_LOGIN || '').toLowerCase() === 'true';
    const demoPassword = String(process.env.DEMO_PASSWORD || 'demo');

    const ensureDemoUser = async ({ demoEmail, username, fullName, role, schoolUnitId }) => {
      const existing = await getOne(
        `SELECT u.id
         FROM users u
         WHERE u.email = ? LIMIT 1`,
        [demoEmail]
      );
      if (existing?.id) return Number(existing.id);

      const hashedPassword = await bcrypt.hash(demoPassword, config.bcryptSaltRounds);
      const userId = await insert(
        `INSERT INTO users (username, email, password_hash, role, school_unit_id, status, email_verified, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'active', 1, NOW(), NOW())`,
        [username, demoEmail, hashedPassword, role, schoolUnitId == null ? null : Number(schoolUnitId)]
      );
      await executeQuery(
        `INSERT INTO user_profiles (user_id, full_name, phone, created_at, updated_at)
         VALUES (?, ?, NULL, NOW(), NOW())`,
        [userId, fullName]
      );
      return userId;
    };

    let bypassPasswordCheck = false;
    if (allowDemoLogin && String(password) === demoPassword) {
      if (identifier.toLowerCase() === 'admin@demo.com') {
        await ensureDemoUser({
          demoEmail: 'admin@demo.com',
          username: 'admin.demo',
          fullName: 'Admin Demo',
          role: 'super_admin',
          schoolUnitId: null
        });
      } else if (identifier.toLowerCase() === 'admin.smp@demo.com') {
        const smpitId = await getSchoolUnitIdByCode('smpit');
        await ensureDemoUser({
          demoEmail: 'admin.smp@demo.com',
          username: 'admin.smp.demo',
          fullName: 'Admin SMPIT Demo',
          role: 'admin_unit',
          schoolUnitId: smpitId
        });
      } else if (identifier.toLowerCase() === 'admin.sma@demo.com') {
        const smaitId = await getSchoolUnitIdByCode('smait');
        await ensureDemoUser({
          demoEmail: 'admin.sma@demo.com',
          username: 'admin.sma.demo',
          fullName: 'Admin SMAIT Demo',
          role: 'admin_unit',
          schoolUnitId: smaitId
        });
      } else if (identifier.toLowerCase() === 'teacher@demo.com') {
        await ensureDemoUser({
          demoEmail: 'teacher@demo.com',
          username: 'teacher.demo',
          fullName: 'Guru Demo',
          role: 'guru',
          schoolUnitId: null
        });
      } else if (identifier.toLowerCase() === 'parent@demo.com') {
        await ensureDemoUser({
          demoEmail: 'parent@demo.com',
          username: 'parent.demo',
          fullName: 'Orang Tua Demo',
          role: 'orang_tua',
          schoolUnitId: null
        });
      } else if (identifier === '2024001') {
        bypassPasswordCheck = true;
      }
    }

    // Get user with password
    const user = await getOne(
      `SELECT 
         u.id,
         u.username,
         u.email,
         u.password_hash AS password,
         u.role,
         u.school_unit_id,
         su.code AS school_unit_code,
         u.status,
         up.full_name,
         up.phone
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       LEFT JOIN students s ON s.user_id = u.id
       LEFT JOIN school_units su ON su.id = u.school_unit_id
       WHERE (u.email = ? OR u.username = ? OR s.nis = ? OR s.nisn = ?)`,
      [identifier, identifier, identifier, identifier]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Check if user is active
    if (String(user.status).toLowerCase() !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Akun Anda tidak aktif. Silakan hubungi administrator'
      });
    }

    // Check password
    const isPasswordMatch = bypassPasswordCheck ? true : await bcrypt.compare(String(password || ''), user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    const normalizedRole = normalizeRole(user.role);
    if (normalizedRole === 'admin' && portal) {
      if (portal === 'main') {
        if (user.school_unit_id != null) {
          return res.status(403).json({
            success: false,
            message: 'Akun admin ini tidak memiliki akses ke portal utama.'
          });
        }
      } else {
        const expectedSchoolUnitId = await getSchoolUnitIdByCode(portal);
        if (!expectedSchoolUnitId || Number(user.school_unit_id || 0) !== Number(expectedSchoolUnitId)) {
          return res.status(403).json({
            success: false,
            message: 'Akun admin ini tidak memiliki akses ke portal unit tersebut.'
          });
        }
      }
    }

    // Update last login
    await executeQuery(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate token
    const token = generateToken(user.id);

    const responseUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name || user.username,
      phone: user.phone || null,
      role: normalizedRole,
      role_raw: user.role,
      school_unit_id: user.school_unit_id == null ? null : Number(user.school_unit_id),
      school_unit_code: user.school_unit_code == null ? null : String(user.school_unit_code)
    };

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: {
        user: responseUser,
        token
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await getOne(
      `SELECT 
         u.id,
         u.username,
         u.email,
         COALESCE(up.full_name, u.username) AS full_name,
         up.phone,
         u.role,
         u.created_at,
         u.last_login
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      data: {
        ...user,
        role: normalizeRole(user.role),
        role_raw: user.role
      }
    });
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res) => {
  try {
    const { full_name, phone } = req.body;

    if (!full_name && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diupdate'
      });
    }

    const existing = await getOne('SELECT user_id FROM user_profiles WHERE user_id = ?', [req.user.id]);

    if (!existing) {
      await executeQuery(
        'INSERT INTO user_profiles (user_id, full_name, phone, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
        [req.user.id, full_name || req.user.username, phone || null]
      );
    } else {
      const nextFullName = full_name ? String(full_name) : null;
      const nextPhone = phone ? String(phone) : null;

      await executeQuery(
        `UPDATE user_profiles SET
           full_name = COALESCE(?, full_name),
           phone = COALESCE(?, phone),
           updated_at = NOW()
         WHERE user_id = ?`,
        [nextFullName, nextPhone, req.user.id]
      );
    }

    // Get updated user
    const user = await getOne(
      `SELECT 
         u.id,
         u.username,
         u.email,
         COALESCE(up.full_name, u.username) AS full_name,
         up.phone,
         u.role
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      message: 'Profile berhasil diupdate',
      data: {
        ...user,
        role: normalizeRole(user.role),
        role_raw: user.role
      }
    });
  } catch (error) {
    console.error('Update Details Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password lama dan password baru wajib diisi'
      });
    }

    // Get user with password
    const user = await getOne(
      'SELECT id, password_hash AS password FROM users WHERE id = ?',
      [req.user.id]
    );

    // Check current password
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Password lama salah'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, config.bcryptSaltRounds);

    // Update password
    await executeQuery(
      'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?',
      [hashedPassword, req.user.id]
    );

    // Generate new token
    const token = generateToken(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Password berhasil diupdate',
      data: { token }
    });
  } catch (error) {
    console.error('Update Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat update password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout berhasil',
    data: {}
  });
};
