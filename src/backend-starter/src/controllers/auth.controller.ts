import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth';

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const users: any[] = await query(
      `SELECT u.*, up.full_name, up.phone, up.photo_url 
       FROM users u 
       LEFT JOIN user_profiles up ON u.id = up.user_id 
       WHERE u.email = ? AND u.status = 'active'
       LIMIT 1`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
    );

    // Update last login
    await query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    // Remove sensitive data
    delete user.password_hash;

    // Return response
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        refresh_token: refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          full_name: user.full_name,
          phone: user.phone,
          photo_url: user.photo_url
        }
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, full_name, phone } = req.body;

    // Validate input
    if (!username || !email || !password || !role || !full_name) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if user already exists
    const existingUsers: any[] = await query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const result: any = await query(
      `INSERT INTO users (username, email, password_hash, role, status, email_verified)
       VALUES (?, ?, ?, ?, 'active', FALSE)`,
      [username, email, passwordHash, role]
    );

    const userId = result.insertId;

    // Insert user profile
    await query(
      `INSERT INTO user_profiles (user_id, full_name, phone)
       VALUES (?, ?, ?)`,
      [userId, full_name, phone || null]
    );

    // Get created user
    const newUsers: any[] = await query(
      `SELECT u.id, u.username, u.email, u.role, up.full_name, up.phone
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`,
      [userId]
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: newUsers[0]
      }
    });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    const users: any[] = await query(
      `SELECT u.id, u.username, u.email, u.role, u.status,
              up.full_name, up.phone, up.address, up.city, up.province,
              up.birth_date, up.birth_place, up.gender, up.photo_url
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: users[0]
      }
    });
  } catch (error: any) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (req: AuthRequest, res: Response) => {
  try {
    // In a stateless JWT setup, logout is handled client-side by removing token
    // Optionally, you can blacklist the token in Redis or database

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error: any) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret'
    ) as any;

    // Get user
    const users: any[] = await query(
      'SELECT id, email, role FROM users WHERE id = ? AND status = "active"',
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    const user = users[0];

    // Generate new access token
    const newToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
    );

    res.json({
      success: true,
      data: {
        token: newToken,
        refresh_token: newRefreshToken
      }
    });
  } catch (error: any) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
