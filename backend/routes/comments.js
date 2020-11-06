const express = require('express');
const commentsCtrl = require('../controllers/comments');

const router = express.Router();

router.get('/:article_id', commentsCtrl.getCommentsById);
router.post('/', commentsCtrl.newComment);
router.delete('/', commentsCtrl.deleteComment);

module.exports = router;