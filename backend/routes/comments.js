const express = require('express');
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:article_id', auth, commentsCtrl.getCommentsById);
router.post('/', auth, commentsCtrl.newComment);
router.delete('/', auth, commentsCtrl.deleteComment);

module.exports = router;