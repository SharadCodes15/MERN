const express = require("express");
const authController = require('../controllers/auth.controller')
const router = express.Router()


router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)

router.post('/foodpartner/register',authController.registerFoodPartner)
router.post('/foodpartner/login',authController.loginFoodPartner)
router.get('/foodpartner/logout',authController.logoutFoodPartner)
router.get('/foodpartner/:id',authController.getFoodPartner)

module.exports = router