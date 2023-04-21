const mongoose = require('mongoose')

const shippingSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String
    },
    phone : {
        type : Number,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    city:{
        status : String,
        email: String
    },
    state : {
        type : String,
        required: true
    },
    zipCode : {
        type : Number,
        required: true
    },
    country : {
        type : String,
        required: true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }     
})
const Shipping = mongoose.model('Shipping', shippingSchema)
module.exports = Shipping