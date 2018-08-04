const Order = require('../models/Order');
const CommonResponse = require('../utils/commonResponses');

module.exports = {
  all: async (req, res) => {
    // try {
    //   const categories = await Order.find({});
    //   if (!categories) {
    //     return res.status(400).json({message: 'can not find categories'})
    //   }
    //   return res.json({
    //     categories,
    //     message: 'Succeefully fetched all the categories'
    //   })
    // } catch (err) {
    //   CommonResponse.sendSomethingWentWrong(req, res, err);
    // }
  },

  getMyHistory: async (req, res) => {
    
  }
  
}