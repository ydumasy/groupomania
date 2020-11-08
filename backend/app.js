const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles')
const commentsRoutes = require('./routes/comments');

// Création de l'application Express
const app = express();

// Configuration des headers pour le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Utilisation de bodyParser pour extraire l'objet JSON de la réponse
app.use(bodyParser.json());

// Implémentations des routes
app.use('/api/users', usersRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;