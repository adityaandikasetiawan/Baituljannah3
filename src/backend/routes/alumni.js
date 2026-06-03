const express = require('express');
const router = express.Router();
const { getAlumniPublic, getAlumniManage, createAlumni, updateAlumni, deleteAlumni } = require('../controllers/alumniController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getAlumniPublic);
router.get('/manage', protect, authorize('admin'), getAlumniManage);
router.post('/', protect, authorize('admin'), createAlumni);
router.put('/:id', protect, authorize('admin'), updateAlumni);
router.delete('/:id', protect, authorize('admin'), deleteAlumni);

module.exports = router;
