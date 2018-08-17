var express = require('express');
var router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation')({passError: true});
const controller = require('../controllers/ChargeController');

const checkAuth = require('../middlewares/checkAuth');

const createSchema = Joi.object({
  tokenId: Joi.string().required(),
})


router.use(checkAuth);
router.post('/charge', controller.charge);



module.exports = router;
