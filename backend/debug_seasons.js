const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Recipe = require('./models/Recipe');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const drinks = await Recipe.find({ category: 'Drink' });
    const stats = {};
    drinks.forEach(d => {
        stats[d.season] = stats[d.season] || [];
        stats[d.season].push(d.title);
    });
    console.log("SEASONS:", JSON.stringify(stats, null, 2));
    process.exit();
});
