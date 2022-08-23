const payment = require('../models/payment');

const addIn = (req, res) => {
    const { paymentType, senderParty, isApproved, amount, paidDate, paymentMode, description, category } = req.body;
    return payment.newPayment({ paymentType, senderParty, receiverParty: req.user.email, isApproved, amount, paidDate, paymentMode, description, category }, (err, paymentData) => {
        return res.send({ status: (!err) });
    })
}
const addOut = (req, res) => {
    const { paymentType, receiverParty, isApproved, amount, paidDate, paymentMode, description, category } = req.body;
    return payment.newPayment({ paymentType, senderParty: req.user.email, receiverParty, isApproved, amount, paidDate, paymentMode, description, category }, (err, paymentData) => {
        return res.send({ status: (!err) });
    })
}
const list = (req, res) => {
    return payment.find({ $or : [ {senderParty: req.user.email}, {receiverParty: req.user.email} ] }, (err, paymentData) => {
        return res.send({ status: (!err), paymentData });
    })
}
const updatePayment = (req, res) => { }

module.exports = { addIn, addOut, list, updatePayment }