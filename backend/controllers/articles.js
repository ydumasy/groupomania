const Article = require('../models/Article');

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
            res.status(400).json(error)
        });
};