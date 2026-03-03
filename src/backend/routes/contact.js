const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
  getStatistics
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const { contactRules, validate } = require('../middleware/validation');

// Public routes
router.post('/', contactRules, validate, submitContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin'), getAllMessages);
router.get('/statistics', protect, authorize('admin'), getStatistics);
router.get('/:id', protect, authorize('admin'), getMessageById);
router.put('/:id/status', protect, authorize('admin'), updateMessageStatus);
router.delete('/:id', protect, authorize('admin'), deleteMessage);

module.exports = router;
