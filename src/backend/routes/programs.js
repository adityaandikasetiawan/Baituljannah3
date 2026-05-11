const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  getProgramsPublic,
  getProgramsManage,
  createProgram,
  updateProgram,
  deleteProgram,
  uploadProgramImage,
  handleUploadResponse
} = require('../controllers/programsController');

router.get('/', getProgramsPublic);
router.get('/manage', protect, authorize('admin'), getProgramsManage);

router.post('/', protect, authorize('admin'), createProgram);
router.put('/:id', protect, authorize('admin'), updateProgram);
router.delete('/:id', protect, authorize('admin'), deleteProgram);

router.post('/upload', protect, authorize('admin'), uploadProgramImage, handleUploadResponse);

module.exports = router;

