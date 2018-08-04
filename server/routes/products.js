var express = require('express');
var router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation')({passError: true});

const controller = require('../controllers/ProductController');

const checkAdmin = require('../middlewares/checkAdmin');

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

router.get('/all', controller.all);

router.use(checkAdmin);

router.post('/create', controller.create);
router.post('/update', controller.update);
router.post('/delete', validator.body(deleteSchema), controller.delete);



module.exports = router;
