const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

// Création du modèle 'Comment'
const Comment = sequelize.define('Comment', {
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Création de la table 'comments'
Comment.sync()
    .then(() => console.log("The table for the Comment model is created"))
    .catch(error => console.log(error));

module.exports = Comment;