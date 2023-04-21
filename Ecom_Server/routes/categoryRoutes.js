const express = require('express')
const categoryController = require('../controllers/categoryController')
const validateToken = require('../middleware/verifyToken')
const router = express.Router()

router.post('/', categoryController.addCategory)
router.get('/', categoryController.getCategory)

module.exports = router