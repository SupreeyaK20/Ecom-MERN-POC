const express = require('express');
const {check} = require('express-validator')
const userController = require('../controllers/userController');
const validateToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/', userController.getAllUsers)
router.post('/register', userController.register)
router.post('/login',  userController.login)
router.put('/:id', userController.updateUserData)
router.delete('/:id', validateToken, userController.deleteUser)
router.get('/:id', validateToken, userController.getUserById)

//LoggedIn User can update or view own data
router.get('/profile', validateToken, userController.profile)
router.patch('/updateprofile', validateToken, userController.updateProfile)

//Forgot password with email link
router.post('/forgot', userController.sendResetPasswordMail)
router.post('/reset/:token', validateToken, [
    check('password').trim().isLength({ min: 8}).withMessage('Password must be 8 characters long')
], 
userController.resetPassword)


module.exports = router
