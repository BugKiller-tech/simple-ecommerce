var express = require('express');
var router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation')({passError: true});

const controller = require('../controllers/CategoryController');

const createSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
})
const updateSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
})
const deleteSchema = Joi.object({
  _id: Joi.string().required(),
})


router.post('/create', validator.body(createSchema), controller.create);
router.post('/update', validator.body(updateSchema), controller.update);
router.post('/delete', validator.body(deleteSchema), controller.delete);
router.get('/all', controller.all);



module.exports = router;
