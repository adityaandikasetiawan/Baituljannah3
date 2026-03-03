const express = require('express');
const router = express.Router();
const {
  submitRegistration,
  checkRegistration,
  getAllRegistrations,
  updateRegistrationStatus,
  getStatistics
} = require('../controllers/ppdbController');
const { protect, authorize } = require('../middleware/auth');
const { ppdbRules, validate } = require('../middleware/validation');

// Public routes
router.post('/register', ppdbRules, validate, submitRegistration);
router.get('/check/:no_pendaftaran', checkRegistration);

// Protected routes (Admin only)
router.get('/registrations', protect, authorize('admin'), getAllRegistrations);
router.put('/registrations/:id/status', protect, authorize('admin'), updateRegistrationStatus);
router.get('/statistics', protect, authorize('admin'), getStatistics);

module.exports = router;
