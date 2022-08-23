const payment = require('../models/payment');

const addIn = (req, res) => {
    const { senderParty, isApproved, amount, paidDate, paymentMode, description, category } = req.body;
    return payment.newPayment({ paymentType : 'in', senderParty, receiverParty: req.user.email, isApproved, amount, paidDate, paymentMode, description, category }, (err, paymentData) => {
        return res.send({ status: (!err) });
    })
}

const addOut = (req, res) => {
    const { receiverParty, isApproved, amount, paidDate, paymentMode, description, category } = req.body;
    return payment.newPayment({ paymentType : 'out', senderParty: req.user.email, receiverParty, isApproved, amount, paidDate, paymentMode, description, category }, (err, paymentData) => {
        return res.send({ status: (!err) });
    })
}

const list = (req, res) => {
    return payment.find({ $or : [ { senderParty: req.user.email }, { receiverParty: req.user.email } ] }, (err, paymentList) => {
        return res.send({ status: (!err), paymentList });
    })
}

const updatePayment = (req, res) => { }

module.exports = { addIn, addOut, list, updatePayment }