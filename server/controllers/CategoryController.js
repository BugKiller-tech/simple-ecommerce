const Category = require('../models/Category');
const CommonResponse = require('../utils/commonResponses');

module.exports = {
  create: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      if (category) {
        return res.json({
          message: 'Successfully created the category'
        })
      } else {
        return res.status(400).json({
          message:'Can not create the category'
        })
      }
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  update: async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.body._id });
      if (!category) {
        return res.json({
          message: 'Can not find the category'
        })
      }
      const data = Object.assign({}, req.body);
      delete data._id;
      const updateCategory = await Category.updateOne({ _id: req.body._id }, data, { new: true });
      if (updateCategory) {
        return res.json({
          message: 'Successfully updated'
        })
      } else {
        return res.status(400).json({
          message: 'Can not update one'
        })
      }

    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },

  delete: async (req, res) => {
    try {
      const category = await Category.findOne({_id: req.body._id});
      if (!category) {
        return res.status(400).json({message: 'can not find category you requested to delete'})
      }
      const dCategory = await Category.deleteOne({_id: req.body._id})
      if (dCategory) {
        return res.json({message: 'Successfully deleted category'});
      }
      return res.status(400).json({message: 'Can not delete'})
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },
  all: async (req, res) => {
    try {
      const categories = await Category.find({});
      if (!categories) {
        return res.status(400).json({message: 'can not find categories'})
      }
      return res.json({
        categories,
        message: 'Succeefully fetched all the categories'
      })
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },
  
}