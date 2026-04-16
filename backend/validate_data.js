const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const validateData = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const recipes = await Recipe.find({});
    console.log("Total recipes:", recipes.length);
    
    const invalid = recipes.filter(r => !r.ingredients || !Array.isArray(r.ingredients));
    console.log("Recipes with missing/invalid ingredients:", invalid.length);
    if (invalid.length > 0) {
        console.log("Sample invalid:", JSON.stringify(invalid.slice(0, 3).map(r => r.title), null, 2));
    }

    const categories = [...new Set(recipes.map(r => r.category))];
    console.log("All categories encountered:", categories);
    
    process.exit();
};

validateData();
