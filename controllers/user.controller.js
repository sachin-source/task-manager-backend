const User = require('../models/user');
const config = require('../config');
const jwt = require('jsonwebtoken')

const login = (req, res) => {
    User.login(req.body, (err, same, userData) => {
        if (err || !same) {
            err && console.log("error at user login,\n req.query : " + JSON.stringify(req.query) + "\n error : " + JSON.stringify(err));
            return res.send({ auth: false, message: "Login failed, Please check your credentials." });
        } else {
            jwt.sign(userData.toJSON(), config.jwtSecretKey, function (err, authToken) {
                return res.send({ auth: !Boolean(err), authToken, message: err ? "Error with your user data, please try again later" : "Logged in successfully." });
            });
        }
    })
};

const signUp = (req, res) => {
    User.signUp(req.body, (err, resp) => {
        res.send({
            status: !Boolean(err),
            message: Boolean(err) ? "Error signing up with this email and password. Please check them and try later" : "Signed up successfully!!!"
        });
    })
};

const setNotificationToken = (req, res) => {
    const email = req.user.email;
    const { notificationToken } = req.query
    User.findOne({ email }, (err, userData) => {
        console.log(userData)

        // if (!userData.notificationToken || !userData.notificationToken.includes(notificationToken)) {
        const existingTokens = userData.notificationToken || [];
        return User.updateOne({ email }, { $addToSet: { notificationToken: notificationToken } }, (err, updated) => {
            console.log(err, updated)
            return res.send({ status: !Boolean(err) })
        })
        // } else {
        //     return res.send({status : true})
        // }
    })
}

const removeNotificationToken = (req, res) => {
    const email = req.user.email;
    const { notificationToken } = req.query
    return User.updateOne({ email }, { $pull: { notificationToken: notificationToken } }, { safe: true, multi: true }, (err, updated) => {
        console.log(err, updated);
        return res.send({ status: !Boolean(err) });
    })
}

const listUsers = (req, res) => {
    User.list({ find: {} }, (err, list) => {
        if (err) {
            return res.send({ auth: false, message: "error listing the users" })
        } else {
            const users = list.filter(userdata => userdata.email != req.user.email);
            return res.send({ auth: true, users })
        }
    })
}

module.exports = { login, signUp, setNotificationToken, removeNotificationToken, listUsers }