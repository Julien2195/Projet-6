const express = require("express");
const router = express.Router();
const password = require('../middleware/password');
//chemin vers controllers
const userControllers = require("../controllers/user");

router.post("/signup", password, userControllers.signup);
router.post("/login", userControllers.login);

module.exports = router;