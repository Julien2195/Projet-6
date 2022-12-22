const Sauces = require("../models/Sauces");

//enregistre  les sauces dans la bdd
exports.createSauce = (req, res, next) => {
    let saucesObject = JSON.parse(req.body.sauce)
    console.log(saucesObject);
     saucesObject.likes = 0
     saucesObject.dislikes = 0
        saucesObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    const sauces = new Sauces({
      ...saucesObject,
    });
    sauces
      .save()
      .then(() => res.status(201).json({ message: "Sauces enregistrée !" }))
      .catch((error) => res.status(400).json({ error }));
  };

 //affiche les sauces dans la page d'accueil
exports.showSauces =(req, res, next) => {
    Sauces.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  };

//Recupere la sauce par son id
exports.getSaucebyId = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }))
  };

//Modifie la sauce
exports.modifySauces = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body })
      .then(() => res.status(200).json({ message: "objet modifié !" }))
      .catch(() => res.status(400).json({ error }));
  };

//Surprimer la sauce
exports.deleteSauces = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  };
