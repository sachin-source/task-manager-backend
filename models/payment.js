const { Schema } = require('mongoose');

const paymentSchema = new Schema({
  paymentType: { type: String, required : true, trim : true }, // in or out
  senderParty: { type: String, required : true, trim : true },
  receiverParty: { type: String, required : true, trim : true },
  isApproved: { type: Boolean, default : false },
  amount: { type: Number, default : 0 },
  paidDate : { type : Date, default : Date.now() },
  category : [{ type: String }],
  paymentMode : { type : String },
}, { timestamps : true })

module.exports = mongoose.model('payment', paymentSchema);