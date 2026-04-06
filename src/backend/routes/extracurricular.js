const express = require('express');
const { getActivities, getRegistrations, register, unregister } = require('../controllers/extracurricularController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/activities', getActivities);
router.get('/registrations', protect, authorize('admin', 'siswa'), getRegistrations);
router.post('/registrations', protect, authorize('admin', 'siswa'), register);
router.delete('/registrations', protect, authorize('admin', 'siswa'), unregister);

module.exports = router;
