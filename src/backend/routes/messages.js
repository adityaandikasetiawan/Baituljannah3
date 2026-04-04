const express = require('express');
const { getAll, create, markRead, remove } = require('../controllers/messagesController');

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.put('/:id/read', markRead);
router.delete('/:id', remove);

module.exports = router;

