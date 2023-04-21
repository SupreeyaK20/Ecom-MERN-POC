const express = require('express')
const inventoryController = require('../controllers/inventoryController')
const productController = require('../controllers/productController')
const validateToken = require('../middleware/verifyToken')
const upload = require('../middleware/uploadHandler')
const router = express.Router()

router.use(validateToken)
router.post('/', productController.addProduct)
router.get('/', productController.getProduct)
router.post('/quantity', inventoryController.updateInventory)

module.exports = router