const { Router } = require("express");
const { list, addIn, addOut, updatePayment } = require("../controllers/payment.controller");

const router = Router();

router.route('/').get(list);
router.route('/in').post(addIn);
router.route('/out').post(addOut);
router.route('/update').post(updatePayment);
module.exports = router;