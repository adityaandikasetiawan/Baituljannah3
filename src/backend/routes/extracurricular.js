const express = require('express');
const { getActivities, getRegistrations, register, unregister } = require('../controllers/extracurricularController');

const router = express.Router();

router.get('/activities', getActivities);
router.get('/registrations', getRegistrations);
router.post('/registrations', register);
router.delete('/registrations', unregister);

module.exports = router;

