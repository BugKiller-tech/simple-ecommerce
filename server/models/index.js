const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const dbConfig = require('../config/db');
const moment = require('moment');

const url = dbConfig.MONGODB_URL;

const User = require('./User');

module.exports = function() {
  console.log('Trying to connect to server now....');
  mongoose.connect(url)
  mongoose.connection.once('open', async () => {
    console.log('Connected to server.... :)');

  })
  
}