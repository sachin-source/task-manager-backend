const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  paymentType: { type: String, required : true, trim : true }, // in or out
  senderParty: { type: String, required : true, trim : true },
  receiverParty: { type: String, required : true, trim : true },
  isApproved: { type: Boolean, default : false },
  amount: { type: Number, default : 0 },
  paidDate : { type : Date, default : Date.now() },
  projectId : { type: String, required : true, trim : true },
  paymentMode : [{ type : String, trim : true }], // cash, bank transfer or cheque
  description : { type : String, trim : true }, 
  category : [{ type: String, trim : true }],
}, { timestamps : true });

paymentSchema.statics = {
  newPayment : function(options, callback) {
    const { paymentType, senderParty, receiverParty, isApproved, amount, paidDate, paymentMode, description, category, projectId } = options;
    const payment = new this({ paymentType, senderParty, receiverParty, isApproved, amount, paidDate, paymentMode, description, category, projectId });
    return payment.save((err, paymentData) => {
      // console.log(paymentData,options, err);
      return callback(err, paymentData)
    })
  },
}

module.exports = model('payment', paymentSchema);