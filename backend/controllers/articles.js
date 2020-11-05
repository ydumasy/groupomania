const sequelize = require('sequelize');
const Article = require('../models/Article');

exports.getLastArticles = (req, res) => {
    Article.findAll({ 
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), {
            [sequelize.Op.between]: [
                sequelize.fn('SUBDATE', sequelize.fn('NOW'), 10),
                sequelize.fn('NOW')
            ]
        }),
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(articles => res.status(200).json({ articles }))
        .catch(error => res.status(500).json({ error }));
};

exports.getArticleById = (req, res, next) => {
    Article.findOne({ where: { id: req.params.id } })
        .then(article => res.status(200).json({ article }))
        .catch(error => res.status(500).json({ error }));
};

exports.getArticlesByAuthor = (req, res) => {
    Article.findAll({ 
        where: { author: req.params.author },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(articles => res.status(200).json({ articles }))
        .catch(error => res.status(500).json({ error }));
};

exports.createArticle = (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    const article = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        sharedArticle_id: req.body.sharedArticleId ? req.body.sharedArticleId : null,
        sharedArticle_title: req.body.sharedArticleTitle ? req.body.sharedArticleTitle : null
    };

    Article.create(article)
        .then(() => res.status(201).json({ message: "Nouvel article créé" }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error })
        });
};

exports.deleteArticle = (req, res) => {
    Article.destroy({ where: { title: req.body.title, content: req.body.content, author: req.body.author } })
        .then(() => res.status(200).json({ message: "Article supprimé" }))
        .catch(error => res.status(500).json({ error }));
};