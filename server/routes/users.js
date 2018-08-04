var express = require('express');
var router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation')({passError: true});

const controller = require('../controllers/UserController');
const checkAdmin = require('../middlewares/checkAdmin');

const registerUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})
const deleteUserSchema = Joi.object({
  _id: Joi.string().required()
})
const updateUserSchema = Joi.object({
  _id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string()
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
})
router.post('/login', validator.body(loginSchema), controller.login);
router.post('/checkLogin', controller.checkLogin);
router.post('/register', validator.body(registerUserSchema), controller.register);

router.use(checkAdmin);

router.post('/update', validator.body(updateUserSchema), controller.update);
router.post('/delete', validator.body(deleteUserSchema), controller.delete);
router.get('/all', controller.all);




module.exports = router;
