const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const controllersSauces = require("../controllers/sauces");

router.post("/", multer, controllersSauces.createSauce);

// Affichage de toutes les sauces
router.get("/", controllersSauces.showSauces);

//Recupere la sauce par son id
router.get("/:id", controllersSauces.getSaucebyId);

//Modifie la sauce
router.put("/:id", multer, controllersSauces.modifySauces);

//Surprimer la sauce
router.delete("/:id", controllersSauces.deleteSauces);

module.exports = router;
