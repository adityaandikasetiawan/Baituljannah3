const express = require('express');
const { getCounselors, getBookings, createBooking, deleteBooking } = require('../controllers/counselingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/counselors', getCounselors);
router.get('/bookings', protect, authorize('admin', 'siswa'), getBookings);
router.post('/bookings', protect, authorize('admin', 'siswa'), createBooking);
router.delete('/bookings/:id', protect, authorize('admin', 'siswa'), deleteBooking);

module.exports = router;
