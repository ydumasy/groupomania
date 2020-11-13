const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const schema = new passwordValidator;

// Spécification des règles à respecter pour la création du mot de passe
schema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().not().symbols()

// Création d'un nouvel utilisateur
exports.signup = (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.pseudo || !req.body.password) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    if (emailValidator.validate(req.body.email)) {
        if(schema.validate(req.body.password)) {
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
                        .catch(error => res.status(400).json({ error }));
                    })
                .catch(error => res.status(500).json({ error }));
        } else {
            res.status(401).json({ error: "Le mot de passe doit contenir au minimum 8 caractères, comprendre au moins un caractère majuscule, un caractère minuscule et un chiffre et ne doit pas contenir d'espace ni de caractères spéciaux" });
        }
    } else {
        res.status(401).json({ error: "E-mail invalide" });
    }
};

// Connexion de l'utilisateur à son compte
exports.login = (req, res) => {
    if (!req.body.pseudo || !req.body.password) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }
    
    if (schema.validate(req.body.password)) {
        User.findOne({ where: { pseudo: req.body.pseudo } })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({ error: "Mot de passe incorrect" });
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
                    res.status(401).json({ error: "Connexion refusée" });
                }
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(401).json({ error: "Mot de passe incorrect" });
    }
};

// Suppression du compte
exports.deleteAccount = (req, res) => {
    User.findOne({ where: { pseudo: req.body.pseudo } })
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                    res.status(400).json({ error: "Mot de passe incorrect" });
                    } else {
                        User.destroy({ where: { pseudo: req.body.pseudo } })
                            .then(() => res.status(200).json({ message: "Utilisateur supprimé de la base de données" }))
                            .catch(error => res.status(500).json({ error }));
                    }
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};