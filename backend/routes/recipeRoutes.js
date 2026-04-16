const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/authMiddleware');

router.get('/', recipeController.getRecipes);
router.get('/random', recipeController.getRandomRecipe);
router.get('/:id', recipeController.getRecipeById);
router.post('/', recipeController.addRecipe);
router.post('/:id/reviews', auth, recipeController.addReview);

module.exports = router;
