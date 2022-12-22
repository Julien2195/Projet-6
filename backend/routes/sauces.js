const express = require("express");
const router = express.Router();
const controllersSauces = require("../controllers/sauces");
router.post("/", controllersSauces.createSauce);

// Affichage de toutes les sauces
router.use("/", controllersSauces.showSauces);

//Recupere la sauce par son id
router.get("/:id", controllersSauces.getSaucebyId);

//Modifie la sauce
router.put("/:id", controllersSauces.modifySauces);

//Surprimer la sauce
router.delete("/:id", controllersSauces.deleteSauces);

module.exports = router;
