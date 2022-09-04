const express = require('express');
const { authenticate } = require('../services/comman');
const router = express.Router();

const userRoutes = require("./user.router");
const taskRoutes = require("./task.router");
const paymentRoutes = require("./payment.router");

/** GET /health-check - Check service health */


// mount user routes at /users
router.use('/user', userRoutes);
router.use('/task', authenticate, taskRoutes);
router.use('/payment', authenticate, paymentRoutes);
router.use('/auth/*', authenticate, (req, res) => {
    res.send(req.user)
})


router.get('/*', (req, res) =>
    res.send('OK')
);
module.exports = router;