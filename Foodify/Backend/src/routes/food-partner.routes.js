const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controllers/food-partner.controller');
const authMiddleware = require('../middleware/auth.middleware')
// POST /api/foodpartner/register
router.post('/register',authMiddleware.authUserMiddleware, foodPartnerController.registerFoodPartner);


module.exports = router;