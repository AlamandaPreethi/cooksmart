const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { getIntelligentImage } = require('../utils/imageMapper');

exports.getRecipes = async (req, res) => {
    try {
        const { ingredients, cuisine, prepTime, category, season, search } = req.query;
        let query = {};
        
        if (ingredients) {
            const ingredientsArray = ingredients.split(',').map(i => i.trim());
            query.ingredients = { $in: ingredientsArray.map(i => new RegExp(i, 'i')) };
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        if (cuisine) {
            query.cuisine = new RegExp(cuisine, 'i');
        }
        if (prepTime) {
            query.prepTime = { $lte: Number(prepTime) };
        }
        if (category) {
            query.category = category;
        }
        if (season && season.toLowerCase() !== 'all') {
            const capitalizedSeason = season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();
            query.season = { $in: [capitalizedSeason, 'All'] };
        }

        console.log("FINAL QUERY:", query);
        const recipes = await Recipe.find(query).sort({ createdAt: -1 });
        console.log(`[DEBUG] /api/recipes fetched ${recipes.length} recipes.`);
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.addRecipe = async (req, res) => {
    try {
        let { title, ingredients, instructions, cuisine, imageUrl, prepTime, cookTime, servings, calories, category, season } = req.body;
        
        // --- INTELLIGENT IMAGE ASSIGNMENT ---
        // If image is missing, generic, or not provided, use the mapper to find a high-quality relevant image.
        if (!imageUrl || imageUrl.includes('unsplash.com/photo-1546069901-ba9599a7e63c')) {
            imageUrl = getIntelligentImage(title, category || 'Food');
        }

        const newRecipeData = {
            title,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(i => i.trim()),
            instructions: Array.isArray(instructions) ? instructions : instructions.split('.').map(i => i.trim()).filter(i => i),
            cuisine,
            imageUrl,
            prepTime,
            cookTime,
            servings,
            calories,
            category,
            season,
            author: req.user ? req.user.id : null
        };

        const newRecipe = new Recipe(newRecipeData);
        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Recipe not found' });
        }
        res.status(500).send('Server error');
    }
};

exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ msg: 'Recipe not found' });
        }

        const alreadyReviewed = recipe.reviews.find(
            r => r.user.toString() === req.user.id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ msg: 'Recipe already reviewed' });
        }

        // Fetch user's name from DB since JWT only stores id
        const foundUser = await User.findById(req.user.id).select('name');

        const review = {
            name: foundUser?.name || 'Anonymous',
            rating: Number(rating),
            comment,
            user: req.user.id
        };

        recipe.reviews.push(review);
        recipe.numReviews = recipe.reviews.length;
        recipe.rating = recipe.reviews.reduce((acc, item) => item.rating + acc, 0) / recipe.reviews.length;

        await recipe.save();
        res.status(201).json({ msg: 'Review added' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRandomRecipe = async (req, res) => {
    try {
        const count = await Recipe.countDocuments();
        if (count === 0) return res.status(404).json({ msg: 'No recipes found' });
        const random = Math.floor(Math.random() * count);
        const recipe = await Recipe.findOne().skip(random);
        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
