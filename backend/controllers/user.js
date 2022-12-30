//Importation de bcrypt pour hash le mot de passe
const bcrypt = require("bcrypt");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
//Importation du model user
const User = require("../models/User");


exports.signup = (req, res, next) => {
    const cryptEmail = cryptoJs.HmacSHA256(req.body.email, `${process.env.KEY_SECRET}`).toString();
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: cryptEmail,
                password: hash,
            });
            user
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                res
                    .status(401)
                    .json({ message: "identifiant/mot de passe incorrect !" });
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (valid == null) {
                            res
                                .status(401)
                                .json({ message: "identifiant/mot de passe incorrect !" });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({
                                        user: user,
                                    },

                                    process.env.TOKEN, { expiresIn: "24h" }
                                ),
                            });
                        }
                    })

                .catch(() => res.status(500).json({ message: "erreur serveur !" }));
            }
        })
        .catch(() => res.status(500).json({ message: "erreur serveur ! " }));
};