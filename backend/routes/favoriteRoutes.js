const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, favoriteController.addFavorite);
router.get('/', auth, favoriteController.getFavorites);
router.delete('/:recipeId', auth, favoriteController.deleteFavorite);

module.exports = router;
