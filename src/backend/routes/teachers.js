const express = require('express');
const router = express.Router();
const {
  getTeachersPublic,
  getTeachersManage,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teachersController');
const { protect, authorize } = require('../middleware/auth');

// Public
router.get('/', getTeachersPublic);

// Admin
router.get('/manage', protect, authorize('admin'), getTeachersManage);
router.post('/', protect, authorize('admin'), createTeacher);
router.put('/:id', protect, authorize('admin'), updateTeacher);
router.delete('/:id', protect, authorize('admin'), deleteTeacher);

module.exports = router;
