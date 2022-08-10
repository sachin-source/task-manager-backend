const express = require('express')
const router = express.Router();

const authRoutes = require("./auth.router");
const taskRoutes = require("./task.router");

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);


// mount user routes at /users
router.use('/auth', authRoutes);
router.use('/task', taskRoutes);