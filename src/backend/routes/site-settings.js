const express = require('express');
const router = express.Router();
const { getSettings, getSettingsManage, updateSetting, bulkUpdateSettings } = require('../controllers/siteSettingsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getSettings);
router.get('/manage', protect, authorize('admin'), getSettingsManage);
router.put('/', protect, authorize('admin'), bulkUpdateSettings);
router.put('/:key', protect, authorize('admin'), updateSetting);

module.exports = router;
