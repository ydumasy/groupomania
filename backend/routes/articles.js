const express = require('express');
const articlesCtrl = require('../controllers/articles');

const router = express.Router();

router.get('/', articlesCtrl.getLastArticles);
router.get('/:id', articlesCtrl.getArticleById);
router.get('/author/:author', articlesCtrl.getArticlesByAuthor);
router.post('/', articlesCtrl.createArticle);
router.delete('/', articlesCtrl.deleteArticle);

module.exports = router;