const Favorite = require('../models/Favorite');

exports.addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const exists = await Favorite.findOne({ userId: req.user.id, recipeId });
        if (exists) return res.status(400).json({ msg: 'Recipe already in favorites' });

        const newFavorite = new Favorite({ userId: req.user.id, recipeId });
        const favorite = await newFavorite.save();
        res.json(favorite);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id }).populate('recipeId');
        // Filter out any favorites where the recipe has been deleted (null after populate)
        const validFavorites = favorites.filter(fav => fav.recipeId !== null);
        res.json(validFavorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const favorite = await Favorite.findOneAndDelete({ userId: req.user.id, recipeId });
        if (!favorite) return res.status(404).json({ msg: 'Favorite not found' });
        res.json({ msg: 'Favorite removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
