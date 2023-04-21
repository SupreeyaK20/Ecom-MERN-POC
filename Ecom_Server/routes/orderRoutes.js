const express = require('express')
const orderController = require('../controllers/orderController')
const validateToken = require('../middleware/verifyToken')
const router = express.Router()

router.use(validateToken)
router.post('/', orderController.placeOrder)
router.get('/',orderController.getOrderDetails)
router.post('/:orderId/rating', orderController.productRating)

module.exports = router