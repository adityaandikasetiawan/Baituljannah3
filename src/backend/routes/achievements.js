const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAchievementsPublic,
  getAchievementsManage,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  uploadAchievementImage,
  handleUploadResponse
} = require('../controllers/achievementsController');

router.get('/', getAchievementsPublic);

router.get('/manage', protect, authorize('admin'), getAchievementsManage);
router.post('/', protect, authorize('admin'), createAchievement);
router.put('/:id', protect, authorize('admin'), updateAchievement);
router.delete('/:id', protect, authorize('admin'), deleteAchievement);

router.post('/upload', protect, authorize('admin'), uploadAchievementImage, handleUploadResponse);

module.exports = router;

