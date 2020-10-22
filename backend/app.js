const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');

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

// Implémentations des routes);
app.get('/', (req, res) => {
    res.json({ message: "L'application Express fonctionne" });
});
app.use('/api/users', usersRoutes);

module.exports = app;