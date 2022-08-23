const payment = require('../models/payment');

const addIn = (req, res) => {
    const { paymentType, senderParty, isApproved, amount, paidDate, paymentMode, description, category } = req.body;
    // payment.
}
const addOut = (req, res) => {}
const list = (req, res) => {}
const updatePayment = (req, res) => {}

module.exports = { addIn, addOut, list, updatePayment }