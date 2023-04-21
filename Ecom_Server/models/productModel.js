const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        
    },
    description: {
        type: String
    },
    price: {
        type: Number,
       
    },
    brand : {
        type: String,
       
    },
    rating: {
        type : Number,
        min : 0,
        max : 5
    },
    inventory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
       
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },  
    images: [{
        type: String
    }]
},{timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product