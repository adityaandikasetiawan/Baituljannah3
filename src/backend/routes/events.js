const express = require('express');
const router = express.Router();
const {
  getEventsPublic,
  getEventsManage,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventsController');
const { protect, authorize } = require('../middleware/auth');

// Public
router.get('/', getEventsPublic);

// Admin
router.get('/manage', protect, authorize('admin'), getEventsManage);
router.post('/', protect, authorize('admin'), createEvent);
router.put('/:id', protect, authorize('admin'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

module.exports = router;
