const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Article.sync()
    .then(() => console.log("The table for the Article model is created"))
    .catch(error => console.log(error));

module.exports = Article;