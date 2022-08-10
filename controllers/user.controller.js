const User = require('../models/user');
const config = require('../config');
const jwt = require('jsonwebtoken')

const login = (req, res) => {
    User.login(req.query, (err, same, userData) => {
        if( err || !same) {
            err && console.log("error at user login,\n req.query : " + JSON.stringify(req.query) + "\n error : " + JSON.stringify(err));
            return res.send({ auth : false, message : "Login failed, Please check your credentials."});
        } else {
            jwt.sign(userData.toJSON(), config.jwtSecretKey, function(err, authToken) {
                return res.send({ auth : !Boolean(err), authToken, message : err ? "Error with your user data, please try again later" : "Logged in successfully."});
            });
        }
    })
};

const signUp = (req, res) => {
    User.signUp(req.query, (err, resp) => {
        res.send({err, resp});
    })
};

module.exports = { login, signUp }