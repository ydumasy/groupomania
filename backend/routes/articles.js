const express = require('express');
const articlesCtrl = require('../controllers/articles');

const router = express.Router();

router.get('/:author', articlesCtrl.getArticlesByAuthor);
router.post('/', articlesCtrl.createArticle);
router.delete('/', articlesCtrl.deleteArticle);

module.exports = router;