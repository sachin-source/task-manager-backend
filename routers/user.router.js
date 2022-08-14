const express = require('express');
const router = express.Router();
const { authenticate } = require('../services/comman');

const userController = require("../controllers/user.controller")

router.route('/signup').post(userController.signUp);
router.route('/login').post(userController.login);
router.route('/setNotificationToken').post(authenticate,  userController.setNotificationToken);


module.exports = router;