const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

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

Comment.sync()
    .then(() => console.log("The table for the Comment model is created"))
    .catch(error => console.log(error));

module.exports = Comment;