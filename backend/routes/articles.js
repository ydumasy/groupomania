const express = require('express');
const articlesCtrl = require('../controllers/articles');

const router = express.Router();

router.post('/', articlesCtrl.createArticle);

module.exports = router;