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
        !(err) ? payment.aggregate([{ $match : { $or : [ { senderParty: req.user.email }, { receiverParty: req.user.email } ]}}, { $group : { _id : "$paymentType", sum : { $sum : "$amount" } } }], (err, data) => {
            return res.send({ status: (!err), paymentList, calculations : data });
        }) : res.send({ status: (!err), paymentList})
    })
}

const updateInPayment = (req, res) => {
    const { senderParty, isApproved, amount, paidDate, paymentMode, description, category, _id } = req.body;
    return payment.updateOne({ _id, receiverParty: req.user.email }, { $set : { senderParty, isApproved, amount, paidDate, paymentMode, description, category } }, { upsert : false }, (err, result) => {
        console.log(err, result);
        return res.send({ err, result})
    })
}

const updateOutPayment = (req, res) => {
    const { receiverParty, isApproved, amount, paidDate, paymentMode, description, category, _id } = req.body;
    return payment.updateOne({ _id, senderParty: req.user.email }, { $set : { receiverParty, isApproved, amount, paidDate, paymentMode, description, category } }, { upsert : false }, (err, result) => {
        console.log(err, result);
        return res.send({ err, result})
    })
}

module.exports = { addIn, addOut, list, updateInPayment, updateOutPayment }