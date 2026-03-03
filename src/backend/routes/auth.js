const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginRules, registerRules, validate } = require('../middleware/validation');

// Public routes
router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/logout', protect, logout);

module.exports = router;
