const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const controllersSauces = require("../controllers/sauces");

router.post("/", auth, multer, controllersSauces.createSauce);

// Affichage de toutes les sauces
router.get("/", auth, controllersSauces.showSauces);

//Recupere la sauce par son id
router.get("/:id", auth, controllersSauces.getSaucebyId);

//Modifie la sauce
router.put("/:id", auth, multer, controllersSauces.modifySauces);

//Surprimer la sauce
router.delete("/:id", auth, controllersSauces.deleteSauces);

//likes/dislikes
router.post("/:id/like", auth, controllersSauces.likeSauces);
module.exports = router;