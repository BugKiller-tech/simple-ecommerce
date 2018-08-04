var express = require('express');
var router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation')({passError: true});

const controller = require('../controllers/CategoryController');

const checkAdmin = require('../middlewares/checkAdmin');


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


router.get('/all', controller.all);

router.use(checkAdmin);

router.post('/create', validator.body(createSchema), controller.create);
router.post('/update', validator.body(updateSchema), controller.update);
router.post('/delete', validator.body(deleteSchema), controller.delete);



module.exports = router;
