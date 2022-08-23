const { Router } = require("express");
const { list } = require("../controllers/payment.controller");

const router = Router();

router.route('/').get(list);

module.exports = router;