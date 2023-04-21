const express = require('express')
const shippingController = require('../controllers/shippingController')
const validateToken = require('../middleware/verifyToken')
const router = express.Router()

router.use(validateToken)
router.post('/', shippingController.addShipping)

module.exports = router