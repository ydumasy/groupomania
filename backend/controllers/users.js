const User = require('../models/User');

// Création d'un nouvel utilisateur
exports.signup = (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.pseudo || !req.body.password) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: req.body.password
    };

    User.create(user)
        .then(() => res.status(201).json({ message: "Nouvel utilisateur créé" }))
        .catch(error => res.status(400).json({ error }));
};

// Connexion de l'utilisateur à son compte
exports.login = (req, res) => {
    if (!req.body.pseudo || !req.body.password) {
        return res.status(400).json({ error: "Tous les champs doivent être remplis" });
    }
    User.findOne({ where: { pseudo: req.body.pseudo, password: req.body.password } })
        .then(user => {
            if(user) {
                res.status(200).json({ message: "Authentification réussie" });
            } else {
                res.status(401).json({ error: "Connexion refusée" });
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