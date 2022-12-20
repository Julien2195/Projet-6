// Importation du framework express
const express = require('express');
const mongoose = require("./database/database");

const bodyParser = require("body-parser");

//Configuration de express
const app = express();

app.use(bodyParser)

//Exportaion du module express
module.exports = app;

