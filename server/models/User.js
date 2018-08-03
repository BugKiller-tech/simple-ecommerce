const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,

  isAdmin: {
    type: Boolean,
    default: false
  }
  
}, {timestamps: true});

schema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

schema.methods.setPassword = function (password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
  console.log(this);
}

module.exports = mongoose.model('User', schema);