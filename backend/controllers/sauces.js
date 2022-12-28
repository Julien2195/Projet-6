const Sauces = require("../models/Sauces");
const fs = require("fs");
const path = require("path")
const { findOne } = require("../models/User");
//enregistre  les sauces dans la bdd
exports.createSauce = (req, res, next) => {
    let saucesObject = JSON.parse(req.body.sauce);
    console.log(saucesObject);
    saucesObject.likes = 0;
    saucesObject.dislikes = 0;
    saucesObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
    const sauces = new Sauces({
        ...saucesObject,
    });
    sauces
        .save()
        .then(() => res.status(201).json({ message: "Sauces enregistrée !" }))
        .catch((error) => res.status(400).json({ error }));
};

//affiche les sauces dans la page d'accueil
exports.showSauces = (req, res, next) => {
    Sauces.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

//Recupere la sauce par son id
exports.getSaucebyId = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

//Modifie la sauce
exports.modifySauces = async(req, res, next) => {
    const sauce = await Sauces.findOne({ _id: req.params.id })

    const fileName = path.basename(sauce.imageUrl);
    if (fileName != req.file.filename) {
        fs.unlinkSync("./images/" + fileName);
    }
    const saucesObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
    } : {...req.body };

    Sauces.updateOne({ _id: req.params.id }, {...saucesObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Surprimer la sauce
exports.deleteSauces = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
};

//Like et dislike
exports.likeSauces = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
            const userId = req.body.userId;
            const like = req.body.like;
            if (like === 1) {
                if (sauce.usersLiked.indexOf(userId) == -1) {
                    sauce.likes++;
                    sauce.usersLiked.push(userId);
                } else if (sauce.usersDisliked.indexOf(userId) > -1) {
                    sauce.dislikes--;
                    sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
                }
            } else if (like === 0) {
                if (sauce.usersLiked.indexOf(userId) > -1) {
                    sauce.likes--;
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
                } else if (sauce.usersDisliked.indexOf(userId) > -1) {
                    sauce.dislikes--;
                    sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
                }
            } else if (like === -1) {
                if (sauce.usersDisliked.indexOf(userId) == -1) {
                    sauce.dislikes++;
                    sauce.usersDisliked.push(userId);
                } else if (sauce.usersLiked.indexOf(userId) > -1) {
                    sauce.likes--;
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
                }
            }
            sauce.save();
            return res.status(200).json(sauce);
        })

    .catch((error) => res.status(404).json(error));
};