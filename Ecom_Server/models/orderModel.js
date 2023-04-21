const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    items:[
        {
            product:{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required: true
            },
            quantity:{
                type : Number,
                required: true
            },
            price:{
                type : Number,
                required: true
            },
            rated:{
                type : Boolean,
                required: true,
                default: false
            }
        }
    ],
    shipping:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Shipping',
        required: true
    },
    paymentMethod:{
        type : String,
        required: true
    },
    paymentResult:{
        id: String,
        status : String,
        email: String
    },
    taxPrice : {
        type : Number,
        required: true,
        default: 0.0
    },
    shippingPrice : {
        type : Number,
        required: true,
        default: 0.0
    },
    totalPrice : {
        type : Object,
        required: true,
        default: 0.0
    },
    isPaid : {
        type : Boolean,
        required: true,
        default: false
    },
    paidAt :{
        type : Date
    },
    isDelivered : {
        type : Boolean,
        required: true,
        default: false
    },
    paidDelivered :{
        type : Date
    }

},{
    timestamps: true
})
const Order = mongoose.model('Order', orderSchema)
module.exports = Order