const express = require('express')
const router = express.Router();
const foodController = require('../controllers/food.controller')
const authMiddleware = require("../middleware/auth.middleware")

// POST /api/food/ [protected]
router.post('/',authMiddleware.authFoodPartnerMiddleware,foodController.createFood)


module.express = router