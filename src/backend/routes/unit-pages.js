const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const {
  getUnitPagePublic,
  getUnitPagesManage,
  upsertUnitPage,
  deleteUnitPage,
} = require('../controllers/unitPagesController');

router.get('/', getUnitPagePublic);
router.get('/manage', protect, authorize('admin'), getUnitPagesManage);
router.put('/:page_key', protect, authorize('admin'), upsertUnitPage);
router.delete('/:page_key', protect, authorize('admin'), deleteUnitPage);

module.exports = router;

