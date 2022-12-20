const express = require('express');
const router = express.Router();
//chemin vers controllers
const userControllers = require("../controllers/user")

router.post('/signup', userControllers.signup)
router.post('/login', userControllers.login)


module.exports = router;

