const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('./models/Recipe');

const checkDrinks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        const drinks = await Recipe.find({ category: 'Drink' });
        console.log(`Found ${drinks.length} drinks`);
        drinks.forEach(d => {
            console.log(`Title: ${d.title}, Category: ${d.category}, Season: ${d.season}`);
        });
        
        const allRecipesCount = await Recipe.countDocuments();
        console.log(`Total recipes in DB: ${allRecipesCount}`);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDrinks();
