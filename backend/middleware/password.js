const passwordValidator = require("password-validator");

passwordSchema = new passwordValidator();

passwordSchema
    .is()
    .min(8) // Taille minimum  8
    .is()
    .max(20) // Taille maximum 20
    .has()
    .uppercase(1) // Doit avoir une lettre majuscule
    .has()
    .lowercase() // Doit avoir des lettres minuscules
    .has()
    .digits(2) // Doit avoir 2 caractères
    .has()
    .not()
    .spaces() // Ne doit pas avoir d'espaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res
            .status(400)
            .json({
                error: `Le mot de passe n'est pas assez fort ! ${passwordSchema.validate(
          "Voir liste : ",
          { list: true }
        )}`,
            });
    }
};