const Order = require('../models/Order');

const stripeConfig = require('../config/stripeConfig');
const stripe = require("stripe")(stripeConfig.secretKey);

const CommonResponse = require('../utils/commonResponses');

module.exports = {
  charge: async (req, res) => {
    const products = req.body.buyProducts;
    let totalPrice = 0;
    let orderDesc = "";
    products.map(product => {
      totalPrice += product.price * product.count;      
      orderDesc += product.name + ' [ ' + product.count + ' ] ';
    })
    try {
      console.log('total money', totalPrice);
      console.log('description', orderDesc);
      let response = await stripe.charges.create({
        amount: totalPrice * 100,
        currency: "usd",
        description: orderDesc,
        source: req.body.tokenId
      });
      let { status, id } = response;

      Order.create({
        orderId: 'testtest',
        user: req.session.user._id,
        orders: req.body.buyProducts,
        paymentId: id,
      })
      

      return res.json({ message: status })

    } catch (err) {
      console.log(err);
      CommonResponse.sendSomethingWentWrong(req, res, err);
    }
  },
  
}