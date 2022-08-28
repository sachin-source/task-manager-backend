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

const updatePayment = (req, res) => {
    const { senderParty, isApproved, amount, paidDate, paymentMode, description, category, } = req.body;
    const { paymentId } = req.params;
    return payment.findById(paymentId, (err, data) => {
        if (err) {
            return res.send({ status : false, message : "cannot find the payment with this paymentId" })
        }
        const findParams = { _id : paymentId, [data.paymentType == 'in' ? "receiverParty" : "senderParty"] : req.user.email};
        const updateParams = { isApproved, amount, paidDate, paymentMode, description, category, [data.paymentType != 'in' ? "receiverParty" : "senderParty"] : (data.paymentType != 'in' ? receiverParty : senderParty)}
        return payment.updateOne(findParams, { $set : updateParams }, { upsert : false }, (err, result) => {
            return res.send({ status : !(err) })
        })
    })
}

module.exports = { addIn, addOut, list, updatePayment }