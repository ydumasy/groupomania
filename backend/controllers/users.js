const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Création d'un nouvel utilisateur
exports.signup = (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.pseudo || !req.body.password) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pseudo: req.body.pseudo,
                password: hash
            };
            User.create(user)
                .then(user => {
                    res.status(201).json({
                        pseudo: user.pseudo,
                        token: jwt.sign({ userId: user.id }, 'Gq8SZFSVIehzomW9QSjRUZ7Vlc5ykogXJMebbe3M', { expiresIn: '24h' })
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error })
                });
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion de l'utilisateur à son compte
exports.login = (req, res) => {
    if (!req.body.pseudo || !req.body.password) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }
    
    User.findOne({ where: { pseudo: req.body.pseudo } })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(400).json("Mot de passe incorrect");
                        } else {
                            res.status(200).json({ 
                                pseudo: user.pseudo,
                                admin: user.admin,
                                token: jwt.sign({ userId: user.id }, 'Gq8SZFSVIehzomW9QSjRUZ7Vlc5ykogXJMebbe3M', { expiresIn: '24h' }) 
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                return res.status(401).json({ error: "Connexion refusée" });
            }
        })
        .catch(error => res.status(500).json({ error }))
};

// Suppression du compte
exports.deleteAccount = (req, res) => {
    User.destroy({ where: { pseudo: req.body.pseudo, password: req.body.password } })
        .then(user => {
            if (user) {
                res.status(200).json({ message: "Utilisateur supprimé de la base de données" });
            } else {
                res.status(401).json({ error: "Mot de passe erronné" });
            }
        })
        .catch(error => {
            console.log(req.body);
            res.status(400).json({ error })
        });
};