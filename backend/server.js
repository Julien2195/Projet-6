// Importation des packages http de node.js
const http = require("http");
//package dotenv
const dotenv= require("dotenv").config()
//chemin app
const app = require("./app");

const server = http.createServer(app)

app.set("port", process.env.PORT)

server.listen(process.env.PORT)

