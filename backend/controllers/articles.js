const sequelize = require('sequelize');
const Article = require('../models/Article');

// Fonctions READ
exports.getLatestArticles = (req, res) => {
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

exports.getArticleById = (req, res) => {
    Article.findOne({ where: { id: req.params.id } })
        .then(article => res.status(200).json({ article }))
        .catch(error => res.status(500).json({ error }));
};

exports.getArticlesByDate = (req, res) => {
    Article.findAll({
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), req.params.date),
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(articles => res.status(200).json({ articles }))
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

exports.searchArticles = (req, res) => {
    Article.findAll({ 
        where: {
            [sequelize.Op.and]: [
                sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), req.params.date),
                { author: req.params.author }
            ]
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(articles => res.status(200).json({ articles }))
        .catch(error => res.status(500).json({ error }));
}

// Fonction CREATE
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
        .catch(error => res.status(400).json({ error }));
};

//Fonction UPDATE
exports.updateArticle = (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ error: "Aucun contenu" });
    }

    Article.update({ content: req.body.content }, {
        where: { id: req.body.id }
    })
        .then(() => res.status(200).json({ message: "Article modifié" }))
        .catch(error => res.status(500).json({ error }));
};

// Fonction DELETE
exports.deleteArticle = (req, res) => {
    Article.destroy({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: "Article supprimé" }))
        .catch(error => res.status(500).json({ error }));
};