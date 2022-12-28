const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401).json({ message: "refusé" });
    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err) return res.sendStatus(403).json({ message: "refusé" });
        req.user = user;
        next();
    });
}
module.exports = authToken;