// Importation du framework express
const express = require('express');
const morgan = require('morgan');
const mongoose = require('./database/database');
const User = require("./models/User");
const Sauces = require('./models/Sauces');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user');

//Configuration de express
const app = express();

// Permets de voir les couleurs: vert pour reussite, rouge pour erreur et jaune code erreur client.

app.use(morgan("dev"))

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

// Enregistre la route dans app , 
app.use("/api/auth/", userRoutes);

// app.post("/api/sauces", (req,res,next)=>{
// const sauces = new Sauces 
// })






//Exportaion du module express
module.exports = app;

