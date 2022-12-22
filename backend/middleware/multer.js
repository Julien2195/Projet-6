//Multer gère l'envoie des fichiers dans les requettes http
const express = require("express");
const multer = require("multer");
//Dictionnaire MIME_TYPES 
const MIME_TYPES = {
    "image/png" : "ppg",
    "image/jpg" : "jpg",
    "image/jpeg" : "jpeg"
};
//Configuration de multer 
const storage = multer.diskStorage({
    destination: (req,file, callback) => {
        callback(null, "images")
    },
    filename : (req,file,callback)=>{
        //Remplace les espaces par des _ pour éviter les problèmes 
        const name = file.originalname.split(" ").join("_")
        const extention = MIME_TYPES[file.mimetype];
        //Permets de generer un nom aleatoire (Date.now) pour eviter les erreurs 
        callback(null, name + '_'+ Date.now()+ extention)
    }
})



// Exportation 
module.exports = multer({storage}).single("image");