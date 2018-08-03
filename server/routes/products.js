var express = require('express');
var router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation')({passError: true});

const controller = require('../controllers/ProductController');

const createSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
})
const updateSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
})
const deleteSchema = Joi.object({
  _id: Joi.string().required(),
})


router.post('/create', controller.create);
router.post('/update', controller.update);
router.post('/delete', validator.body(deleteSchema), controller.delete);
router.get('/all', controller.all);



module.exports = router;
