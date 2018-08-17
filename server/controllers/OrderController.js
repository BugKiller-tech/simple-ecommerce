const Order = require('../models/Order');
const CommonResponse = require('../utils/commonResponses');

module.exports = {
  all: async (req, res) => {
    try {
      const orders = await Order.find({}).sort({ createdAt: -1 }).limit(2000).populate('user');
      if (!orders) {
        return res.status(400).json({message: 'can not find categories'})
      }
      return res.json({
        orders,
        message: 'Succeefully fetched'
      })
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  getMyHistory: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.session.user._id }).sort({ createdAt: -1 }).limit(100).populate('user');
      if (!orders) {
        return res.status(400).json({message: 'can not find categories'})
      }
      return res.json({
        orders,
        message: 'Succeefully fetched'
      })
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }    
  },

  setAsDelivered: async (req, res) => {
    try {
      const order = await Order.findOne({ _id: req.body._id });
      if (!order) {
        return res.status(400).json({
          message: 'Can not find this order'
        })
      }
      await Order.findByIdAndUpdate(req.body._id, { delivered: true });
      return res.json({
        message: 'Successfully processed as delivered'
      })
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
    
  }
  
}