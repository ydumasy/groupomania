const Sequelize = require('sequelize');
require('dotenv').config();

// Configuration de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

module.exports = sequelize;