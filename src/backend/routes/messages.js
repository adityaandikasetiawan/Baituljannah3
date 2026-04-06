const express = require('express');
const { getAll, create, markRead, remove } = require('../controllers/messagesController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('admin', 'siswa'), getAll);
router.post('/', protect, authorize('admin', 'siswa'), create);
router.put('/:id/read', protect, authorize('admin', 'siswa'), markRead);
router.delete('/:id', protect, authorize('admin', 'siswa'), remove);

module.exports = router;
