const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }  
}, {timestamps: true});



module.exports = mongoose.model('Product', schema);