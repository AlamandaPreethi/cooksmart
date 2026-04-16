const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const findDishes = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const keywords = ['Chicken', 'Paneer', 'Mutton', 'Fish', 'Rice', 'Pasta'];
    
    console.log("Searching for specific keywords in titles...");
    for (let kw of keywords) {
        const found = await Recipe.find({ title: new RegExp(kw, 'i') });
        console.log(`${kw}: Found ${found.length} recipes.`);
        if (found.length > 0) {
            console.log(`  Titles: ${found.map(f => f.title).join(', ')}`);
            console.log(`  Categories: ${[...new Set(found.map(f => f.category))].join(', ')}`);
        }
    }
    
    process.exit();
};

findDishes();
