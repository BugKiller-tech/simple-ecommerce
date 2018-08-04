const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  orderId: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  orders: {
    type: [Schema.Types.Object]
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  paymentId: {  // this is the id from the stripe
    type: String
  }
}, {timestamps: true});



module.exports = mongoose.model('Order', schema);