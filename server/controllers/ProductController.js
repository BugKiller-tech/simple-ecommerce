const multer = require('multer');
const Joi = require('joi');

const Product = require('../models/Product');
const CommonResponse = require('../utils/commonResponses');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/products')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 10*1024*1024 // Max file size in bytes (10 MB)
  }
}).single('product')

// function hasRequiredFields(fields) {
//   console.log('~~~~~', fields);  
// }

upload.fileFilter = function (req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
      return cb(new Error('Only image files are allowed!'), false);
  }
  // console.log('file filter', req);
  // cb(null, hasRequiredFields(req.body))
}

module.exports = {
  create: async (req, res) => {
    upload(req, res, async function (uploadError) {
      if(uploadError) {
        console.log('FILE UPLOAD ERROR', uploadError);
        return res.status(400).send({
            message: 'Error during file upload',
        });
      }
      
      const schema = {
        _id: Joi.string(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),
        category: Joi.string().required(),
        imageUrl: Joi.any(),
      }
      const {error, value} = Joi.validate(req.body, schema);
      if(error){
        switch(error.details[0].context.key){
          case 'name':
          case 'description':
          case 'price':
          case 'category':
          case 'imageUrl':
            return res.status(400).json({
              message: error.details[0].message,
            })
            break;
          default:
            return res.status(400).json({ message: 'Something went wrong'})
            break;
        }
      }

      try {
        const data = Object.assign({}, req.body);
        console.log(req.file);
        if (req.file && req.file.filename)
          // data.imageUrl = req.protocol + '://' + req.get('host') + '/uploads/products/' + req.file.filename;
          data.imageUrl = req.protocol + '://' + process.env.HOST + '/uploads/products/' + req.file.filename;
        
        if (req.body._id) {  // edit mode
          const product = await Product.findOne({ _id: req.body._id })
          if (!product) {
            return req.status(400).json({ message: 'Can not find the product' })
          }
          delete data._id;
          await Product.findByIdAndUpdate(req.body._id, data);
          return res.json({
            message: 'Successfull updated'
          })

        } else {  // create mode
          
          const product = await Product.create(data);
          if (product) {
            return res.json({
              message: 'Successfully created the product'
            })
          } else {
            return res.status(400).json({
              message:'Can not create the product'
            })
          }
        }
      } catch (err) {
        CommonResponse.sendSomethingWentWrong(req, res, err);
      }


    })
  },

  update: async (req, res) => {
    try {
      const prodcut = await Product.findOne({ _id: req.body._id });
      if (!prodcut) {
        return res.json({
          message: 'Can not find the product'
        })
      }
      const data = Object.assign({}, req.body);
      delete data._id;
      const newProduct = await Product.updateOne({ _id: req.body._id }, data, { new: true });
      if (newProduct) {
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
      const product = await Product.findOne({_id: req.body._id});
      if (!product) {
        return res.status(400).json({message: 'can not find'})
      }
      const dProduct = await Product.deleteOne({_id: req.body._id})
      if (dCategory) {
        return res.json({message: 'Successfully deleted'});
      }
      return res.status(400).json({message: 'Can not delete'})
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },
  all: async (req, res) => {
    try {
      const products = await Product.find({}).sort({ updatedAt: -1 }).populate('category');
      if (!products) {
        return res.status(400).json({message: 'can not find products'})
      }
      return res.json({
        products,
        message: 'Succeefully fetched all the categories'
      })
    } catch (err) {
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },
  
}