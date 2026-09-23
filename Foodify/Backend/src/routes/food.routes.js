const express = require('express')
const router = express.Router();
const foodController = require('../controllers/food.controller')
const authMiddleware = require("../middleware/auth.middleware")
const multer = require('multer')
const upload = multer({
    storage:multer.memoryStorage(),
})


// POST /api/food/ [protected]
router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);
// GET /api/food/ [protected]
router.get('/', authMiddleware.authUserMiddleware, foodController.GetFoodsItems)

router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood);

router.post('/save', authMiddleware.authUserMiddleware, foodController.SaveFood);
router.get('/save', authMiddleware.authUserMiddleware, foodController.GetSavedFoods);
module.exports = router