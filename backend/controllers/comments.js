const sequelize = require('sequelize');
const Comment = require('../models/Comment');

// Fonction READ
exports.getCommentsByArticle = (req, res) => {
    Comment.findAll({ where: { article_id: req.params.article_id } })
        .then(comments => res.status(200).json({ comments }))
        .catch(error => res.status(500).json({ error }));
};

// Fonction CREATE
exports.newComment = (req, res) => {
    const comment = {
        author: req.body.author,
        content: req.body.content,
        article_id: req.body.article_id
    }

    Comment.create(comment)
        .then(() => res.status(201).json({ message: "Commentaire enregistré" }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error });
        });
};

// Fonction DELETE
exports.deleteComment = (req, res) => {
    Comment.destroy({ where: { id: req.body.id } })
        .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
        .catch(error => res.status(500).json({ error }));
};