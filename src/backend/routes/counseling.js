const express = require('express');
const { getCounselors, getBookings, createBooking, deleteBooking } = require('../controllers/counselingController');

const router = express.Router();

router.get('/counselors', getCounselors);
router.get('/bookings', getBookings);
router.post('/bookings', createBooking);
router.delete('/bookings/:id', deleteBooking);

module.exports = router;

