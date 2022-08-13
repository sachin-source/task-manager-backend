const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
    const { token } = req.headers;
    return jwt.verify(token, config.jwtSecretKey, function (err, decoded) {
        if (err) {
            return res.status(400).send({ auth : false, message : "permission denied!"})
        } else {
            const { name, email, provider, role } = decoded;
            req.user = { name, email, provider, role };
            return next()
        }
    });
}

module.exports = { authenticate }