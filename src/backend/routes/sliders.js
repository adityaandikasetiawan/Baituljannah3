const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getActiveSliders,
  getAllSliders,
  createSlider,
  updateSlider,
  deleteSlider,
  uploadSliderImage,
  handleUploadResponse
} = require('../controllers/slidersController');

router.get('/', getActiveSliders);

router.get('/manage', protect, authorize('admin'), getAllSliders);
router.post('/', protect, authorize('admin'), createSlider);
router.put('/:id', protect, authorize('admin'), updateSlider);
router.delete('/:id', protect, authorize('admin'), deleteSlider);

router.post('/upload', protect, authorize('admin'), uploadSliderImage, handleUploadResponse);

module.exports = router;

