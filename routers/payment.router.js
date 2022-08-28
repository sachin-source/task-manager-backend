const { Router } = require("express");
const { list, addIn, addOut, updatePayment } = require("../controllers/payment.controller");

const router = Router();

router.route('/').get(list);
router.route('/:paymentId').put(updatePayment);
router.route('/in').post(addIn);
router.route('/out').post(addOut);
module.exports = router;