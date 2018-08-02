const User = require('../models/User');
const commonResponse = require('../utils/commonResponses');

module.exports = {
  register: async(req, res) => {
    try {
      const user = await User.findOne({email: req.body.email});
      if (user) {
        return res
          .status(400)
          .json({message: 'there is user that has same email!'})
      }
      const newUser = await User.create(req.body);
      newUser.setPassword(req.body.password)
      await newUser.save();
      if (newUser) {
        return res.json({message: 'Successfully registered new account'});
      }
      return res
        .status(400)
        .json({message: 'Can not make the account'})
    } catch (err) {
      commonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  delete: async(req, res) => {
    try {
      const user = await User.findOne({_id: req.body._id});
      if (!user) {
        return res
          .status(400)
          .json({message: 'can not find like this user'})
      }
      const deleteduser = await User.deleteOne({_id: req.body._id})
      if (deleteduser) {
        return res.json({message: 'Successfully deleted account'});
      }
      return res
        .status(400)
        .json({message: 'Can not delete the account'})
    } catch (err) {
      commonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  update: async(req, res) => {
    try {
      const user = await User.findOne({_id: req.body._id});
      if (!user) {
        return res
          .status(400)
          .json({message: 'can not find like this user'})
      }
      const data = Object.assign({}, req.body);
      delete data._id;

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;

      if (req.body.password) {
        user.setPassword(req.body.password)
      }
      await user.save();
      return res.json({message: 'Successfully updated account'});

    } catch (err) {
      commonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  all: async(req, res) => {
    try {
      const users = await User
        .find({})
        .sort({'createdAt': -1});
      return res.json({message: 'Successfully fetched users', users})

    } catch (err) {
      commonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  login: async(req, res) => {
    try {
      const user = await User.findOne({email: req.body.email})
      if (user) {
        if (user.isValidPassword(req.body.password)) {
          req.session.user = user;
          const data = user;
          delete data.passwordHash;
          return res.json({message: 'logged in with account', user: data})
        } else {
          return res
            .status(400)
            .json({message: 'The credential is incorrect'})
        }
      }
      return res.status(400).json({message: 'Wrong credentials'})
    } catch (err) {
      console.log(err);
      commonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  checkLogin: async(req, res) => {
    if (req.session.user) {
      return res.json({message: 'logged in status', username: req.session.user.username, isAdmin: req.session.user.isAdmin})
    }
    return res
      .status(400)
      .json({message: 'not logged in status'})
  }
}