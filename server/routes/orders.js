var express = require('express');
var router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation')({passError: true});

const controller = require('../controllers/OrderController');

const checkAdmin = require('../middlewares/checkAdmin');
const checkAuth = require('../middlewares/checkAuth');



router.use(checkAuth);
router.get('/getMyHistory', controller.getMyHistory);

router.use(checkAdmin);
router.get('/all', controller.all);



module.exports = router;
