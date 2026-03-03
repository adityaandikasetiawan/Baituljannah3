const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery, getOne, insert } = require('../config/database');
const config = require('../config/config');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expire
  });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { username, email, password, full_name, role = 'siswa', phone } = req.body;

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
      `INSERT INTO users (username, email, password, full_name, role, phone, is_active, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 1, NOW())`,
      [username, email, hashedPassword, full_name, role, phone || null]
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
        full_name,
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

    // Get user with password
    const user = await getOne(
      'SELECT id, username, email, password, full_name, role, is_active FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Akun Anda tidak aktif. Silakan hubungi administrator'
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Update last login
    await executeQuery(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    delete user.password;

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: {
        user,
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
      'SELECT id, username, email, full_name, role, phone, avatar, created_at, last_login FROM users WHERE id = ?',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      data: user
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

    const fieldsToUpdate = {};
    if (full_name) fieldsToUpdate.full_name = full_name;
    if (phone) fieldsToUpdate.phone = phone;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diupdate'
      });
    }

    // Build update query
    const updateFields = Object.keys(fieldsToUpdate)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(fieldsToUpdate), req.user.id];

    await executeQuery(
      `UPDATE users SET ${updateFields}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // Get updated user
    const user = await getOne(
      'SELECT id, username, email, full_name, role, phone FROM users WHERE id = ?',
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      message: 'Profile berhasil diupdate',
      data: user
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
      'SELECT id, password FROM users WHERE id = ?',
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
      'UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?',
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
