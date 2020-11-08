const express = require('express');
const articlesCtrl = require('../controllers/articles');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, articlesCtrl.getLastArticles);
router.get('/:id', auth, articlesCtrl.getArticleById);
router.get('/date/:date', auth, articlesCtrl.getArticlesByDate);
router.get('/author/:author', auth, articlesCtrl.getArticlesByAuthor);
router.get('/:date/:author', articlesCtrl.searchArticles);
router.post('/', auth, articlesCtrl.createArticle);
router.delete('/', auth, articlesCtrl.deleteArticle);

module.exports = router;