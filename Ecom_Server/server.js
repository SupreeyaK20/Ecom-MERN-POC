const express = require("express")
const connectDb = require("./config/dbconnection")
const dotenv = require("dotenv").config()
const cors = require('cors')
const errorHandler = require("./middleware/errorHandler")
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const shippingRoutes = require('./routes/shippingRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()
app.use(cors())

//Connect database
connectDb()

// Define routes 
app.use(express.json())
app.use('/users', userRoutes)
app.use('/category', categoryRoutes)
app.use('/products', productRoutes)
app.use('/shipping', shippingRoutes)
app.use('/orders', orderRoutes)

// Error Handler middleware
app.use(errorHandler)

app.use('/images', express.static('public/images'));

const PORT = process.env.PORT || 9001
app.listen(PORT,()=>{
    console.log("Server Stared!!!!")
})