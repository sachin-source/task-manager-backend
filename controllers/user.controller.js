const User = require('../models/user');
const config = require('../config');
const jwt = require('jsonwebtoken')

const login = (req, res) => {
    User.login(req.query, (err, same, userData) => {
        if( err || !same) {
            err && console.log("error at user login,\n req.query : " + JSON.stringify(req.query) + "\n error : " + JSON.stringify(err));
            return res.send({ auth : false, message : "Login failed, Please check your credentials."});
        } else {
            jwt.sign(userData.toJSON(), config.jwtSecretKey, { expiresIn: '16h' }, function(err, authToken) {
                return res.send({ auth : !Boolean(err), authToken, message : err ? "Error with your user data, please try again later" : "Logged in successfully."});
            });
        }
    })
};

const signUp = (req, res) => {
    User.signUp(req.query, (err, resp) => {
        res.send({
            status : !Boolean(err),
            message : Boolean(err) ? "Error signing up with this email and password. Please check them and try later" : "Signed up successfully!!!"
        });
    })
};

module.exports = { login, signUp }