const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");
const { uuid } = require('uuidv4');
const User = require("../models/userModel");
require('dotenv').config();

// Inscription d'un nouveau utilisateur
exports.userRegister = (req, res) => {
    let newUser = req.body;

    if(newUser.password){

        bcrypt.hash(newUser.password, 10, (error, hash) => {
            if(error){
                res.status(401);
                console.log(error);
                res.json({message: "Impossible de crypter le mot de passe"});
            }
            else{
                db.sync().then(() => {
                    User.findOne({
                        where: {
                            email: newUser.email
                        }
                    }).then(existingUser => {
                        if(existingUser) {
                            res.json({message: "Utilisateur est déjà existant"});
                        }
                        else {
                            User.create({
                                id: uuid(),
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                email: newUser.email,
                                password: newUser.password,
                                connected: 0
                            }).then(result => {
                                res.status(200).json({message: "Utilisateur a été bien créé", user: result});
                                console.log(result);
                            }).catch((error) => {
                                res.status(401).json({message: "Rêquete invalide"});
                                console.log(error);
                            });
                        }
                    })
                 }).catch((error) => {
                    res.json({message: "Erreur serveur"});
                    console.error('Erreur serveur : ', error);
                 });
            }
        })
    }
    else{
        res.status(401);
        console.log(error);
        res.json({message: "Mot de passe est vide"});
    }
}

// Connexion d'utilisateur
exports.userLogin = (req, res) => {
    db.sync().then(() => {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if(error){
                    res.status(401);
                    console.log(error);
                    res.json({message: "Mot de passe incorrect"})
                }
                else{
                    let userData = {
                        id: user.id,
                        email: user.email,
                        password: user.password,
                        connected: 1
                    }

                    jwt.sign(userData, process.env.JWT_KEY, {expiresIn: "30 days"}, (error, token) => {
                        if(error){
                            res.status(500);
                            console.log(error);
                            res.json({message: "Impossible de générer le token"})
                        }
                        else{
                            User.update(
                                {
                                    connected: 1
                                },
                                {
                                    where: {
                                        id: user.id
                                    }
                                }
                            ).then((user) => {
                                res.status(200);
                                res.json({message: `Utilisateur connecté : ${user.email}`, token, user: userData});                            
                            })
                            .catch((error) => {
                                res.status(500);
                                console.log(error);
                                res.json({message: "Utilisateur non trouvé"});
                            });
                           
                        }
                    });
                }
            })
        })
        .catch((error) => {
            res.status(500);
            console.log(error);
            res.json({message: "Utilisateur non trouvé"});
        });
     }).catch((error) => {
        res.status(401).json({message: "Erreur serveur"});
        console.error('Erreur serveur : ', error);
     });
}

// Affichage les détails d'un utilisateur par id
exports.getUserById = (req, res) => {
    db.sync().then(() => {
        User.findOne({
            where: {
                id: req.params.id
            }
        }).then((user) => {
            res.status(200).json({user});
        })
        .catch((error) => {
            res.status(500);
            console.log(error);
            res.json({message: "Utilisateur non trouvé"});
        });
     }).catch((error) => {
        res.status(401).json({message: "Erreur serveur"});
        console.error('Erreur serveur : ', error);
     });
}

// Déconnexion d'utilisateur par id
exports.userLogout = (req, res) => {
    db.sync().then(() => {
        User.update(
            {
                connected: 0
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then((user) => {
            res.status(200).json({msg: 'Utilisateur a été bien déconnecté', user});
        })
        .catch((error) => {
            res.status(500);
            console.log(error);
            res.json({message: "Utilisateur non trouvé"});
        });
     }).catch((error) => {
        res.status(401).json({message: "Erreur serveur"});
        console.error('Erreur serveur : ', error);
     });
}