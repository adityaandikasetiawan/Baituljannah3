const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  uploadGalleryImage,
  getGalleryPublic,
  getGalleryManage,
  createGallery,
  updateGallery,
  deleteGallery
} = require('../controllers/galleryController');

router.get('/', getGalleryPublic);
router.get('/manage', protect, authorize('admin'), getGalleryManage);

router.post('/', protect, authorize('admin'), uploadGalleryImage, createGallery);
router.put('/:id', protect, authorize('admin'), uploadGalleryImage, updateGallery);
router.delete('/:id', protect, authorize('admin'), deleteGallery);

module.exports = router;

