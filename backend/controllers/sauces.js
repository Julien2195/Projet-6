const Sauces = require("../models/Sauces");

exports.createSauce = //enregistre  les sauces dans la bdd
  router.post("/", (req, res, next) => {
    delete req.body._id;
    const sauces = new Sauces({
      ...req.body,
    });
    sauces
      .save()
      .then(() => res.status(201).json({ message: "Sauces enregistrée !" }))
      .catch((error) => res.status(400).json({ error }));
  });

exports.showSauces = //affiche les sauces dans la page d'accueil
  router.use("/", (req, res, next) => {
    Sauces.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  });

exports.getSaucebyId = //Recupere la sauce par son id
  router.get("/:id", (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => 404)
      .json({ error });
  });

exports.modifySauces = //Modifie la sauce
  router.put("/:id", (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body })
      .then(() => res.status(200).json({ message: "objet modifié !" }))
      .catch(() => res.status(400).json({ error }));
  });

exports.deleteSauces = //Surprimer la sauce
  router.delete("/:id", (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
      .catch((error) => res.status(400).json({ error }));
  });
