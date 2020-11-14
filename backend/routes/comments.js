const express = require('express');
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

// Utilisation d'un router
const router = express.Router();

// Création des routes commentaires
router.get('/:article_id', auth, commentsCtrl.getCommentsByArticle);
router.post('/', auth, commentsCtrl.newComment);
router.put('/', auth, commentsCtrl.updateComment);
router.delete('/', auth, commentsCtrl.deleteComment);

module.exports = router;