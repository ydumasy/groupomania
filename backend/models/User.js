const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

// Création du modèle 'User'
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: 'VARBINARY(50)',
        allowNull: false,
        unique: true
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Création de la table 'users'
User.sync()
    .then(() => console.log("The table for the User model is created"))
    .catch(error => console.log(error));

module.exports = User;