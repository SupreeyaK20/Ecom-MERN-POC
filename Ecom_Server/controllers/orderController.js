const Shipping = require("../models/shippingModel")
const shippingPrice = require("../helper/calculateShippingPrice");
const Order = require("../models/orderModel");
const Rating = require("../models/ratingModel");

const orderController = {
    placeOrder : async ( req, res) =>{
        try{
        const { items, paymentMethod, shippingId} = req.body
        const user = req.user
        const shipping = await Shipping.findById(shippingId)
        if(!shipping){
            return res.status(400).json({ message: 'Invalid shipping address' });
        }

         // Calculate the shipping price
        const shippingPrices = shippingPrice.calculateShippingPrice(shipping,items)

        // Calculate the total price of the order
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0) + shippingPrices;
        console.log("totalPrice", totalPrice);
        
        const order = new Order({
            user: user.id,
            items,
            paymentMethod,
            taxPrice: 0,
            shippingPrice : shippingPrices,
            totalPrice,
            shipping: shipping._id,
            isPaid: true,
            isDelivered: true
        });
      
        const createdOrder = await order.save();
      
        res.status(201).json(createdOrder);
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: 'Server Error' });
        }

    },
    getOrderDetails : async (req, res) =>{
        try {
            const getOrderDetails = await Order.find({user:req.user.id}).populate('user', 'name email').populate('shipping', 'name email phone address')
            res.status(200).json(getOrderDetails)
        } catch (error) {
            res.status(500).json({message : 'Server Error'})
        }
        
    },
    productRating : async (req, res) => {
            const { rating, review } = req.body;
            const { orderId } = req.params;
            const userId = req.user.id;
          
            try {
              // Check if the order has been delivered
              const order = await Order.findById(orderId);
              if (!order) {
                return res.status(400).json({ msg: 'Order not found' });
              }
              if (!order.isDelivered) {
                return res.status(400).json({ msg: 'Order has not been delivered yet' });
              }
              
              // Check if the requested product is in the list
              const productIndex = order.items.findIndex((product) => product.product.toString() === req.body.product);
              if (productIndex === -1) {
                return res.status(400).json({ msg: 'You cannot rate this product' });
              }

              // Check if the user has already rated the order
              
              const userRating = await Rating.findOne({ user: userId, order: orderId });
              const isRated = order.items[productIndex].rated;

              if (userRating && isRated) {
                // If the user has already rated the product in this order
                return res.status(400).json({ msg: 'You have already rated this product in this order' });
              } else if (userRating && !isRated) {
                // If the user has rated the product in a previous order
                order.items[productIndex].rated = true;
                order.markModified('items');
                await order.save();
                return res.status(400).json({ msg: 'You have already rated this product in a previous order' });
              }else if (!userRating && isRated) {
                // If the user has rated the product in a previous order
                order.items[productIndex].rated = false;
                order.markModified('items');
                await order.save();
                return res.status(400).json({ msg: 'Please try again' });
              }
               else {
                // If the user has not rated the product yet
                const ratingData = {
                  user: userId,
                  order: orderId,
                  product: req.body.product,
                  rating: rating,
                  review: review
                };
                order.items[productIndex].rated = true;
                order.markModified('items');
                await order.save();
                await Rating.create(ratingData);
                return res.json({ msg: 'Rating and review added successfully' });
              }


            } catch (error) {
              console.error(error.message);
              res.status(500).send('Server Error');
            }
        }
      
}
module.exports = orderController