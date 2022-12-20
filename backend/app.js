// Importation du framework express
const express = require('express');
const morgan = require('morgan')
const mongoose = require("./database/database");
const User = require("./models/User")
const bodyParser = require("body-parser");

//Configuration de express
const app = express();

// Permets de voir les couleurs: vert pour reussite, rouge pour erreur et jaune code erreur client.

app.use(morgan("dev"))

app.use(bodyParser)

//Exportaion du module express
module.exports = app;

