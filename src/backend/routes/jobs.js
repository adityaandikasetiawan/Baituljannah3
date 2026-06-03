const express = require('express');
const router = express.Router();
const { getJobsPublic, getJobsManage, createJob, updateJob, deleteJob } = require('../controllers/jobsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getJobsPublic);
router.get('/manage', protect, authorize('admin'), getJobsManage);
router.post('/', protect, authorize('admin'), createJob);
router.put('/:id', protect, authorize('admin'), updateJob);
router.delete('/:id', protect, authorize('admin'), deleteJob);

module.exports = router;
