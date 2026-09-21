const express = require('express');
const router = express.Router();
const foodPartnerController = require('../controllers/food-partner.controller');
const authMiddleware = require('../middleware/auth.middleware')
// GET /api/foodpartner/:id
router.get('/:id',authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerByID);


module.exports = router;