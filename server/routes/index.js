var express = require('express');
var router = express.Router();
const path = require('path')

var users = require('./users');
var categories = require('./categories');
var products = require('./products');

const checkAuth = require('../middlewares/checkAuth');



router.use('/api/user', users);
router.use('/api/categories', categories);
router.use('/api/products', products);

router.use(checkAuth)




/* GET home page. */
router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
});

module.exports = router;
