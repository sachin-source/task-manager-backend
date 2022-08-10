const express = require('express');
const { authenticate } = require('../services/comman');
const router = express.Router();

const authRoutes = require("./auth.router");
const taskRoutes = require("./task.router");

/** GET /health-check - Check service health */


// mount user routes at /users
router.use('/auth', authRoutes);
router.use('/task', authenticate, taskRoutes);

router.get('/*', authenticate, (req, res) =>
    res.send('OK' + JSON.stringify(req.user))
);
module.exports = router;