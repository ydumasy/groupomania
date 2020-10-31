const sequelize = require('sequelize');
const Article = require('../models/Article');

exports.getLastArticles = (req, res) => {
    Article.findAll({ 
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), {
            [sequelize.Op.between]: [
                sequelize.fn('SUBDATE', sequelize.fn('NOW'), 10),
                sequelize.fn('NOW')
            ]
        })
    })
        .then(articles => res.status(200).json({ articles }))
        .catch(error => res.status(400).json({ error }));
};

exports.getArticlesByAuthor = (req, res) => {
    Article.findAll({ where: { author: req.params.author } })
        .then(articles => {
            if (articles.length > 0) {
                res.status(200).json({ articles });
            } else {
                return res.status(400).json({ error: "Aucun article trouvé" })
            }     
        })
        .catch(error => res.status(500).json({ error }));
};

exports.createArticle = (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    const article = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
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
        .then(article => {
            if (article) {
                res.status(200).json({ message: "Article supprimé" });
            } else {
                return res.status(400).json({ error: "Aucun article trouvé" });
            }
        })
        .catch(error => res.status(500).json({ error }));
};